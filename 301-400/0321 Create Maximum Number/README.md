---
comments: true
difficulty: Hard
tags:
  - Array
  - Two Pointers
  - Stack
  - Greedy
  - Monotonic Stack
---

# 321. Create Maximum Number

**[View Problem on LeetCode](https://leetcode.com/problems/create-maximum-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0321` (`321`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Two Pointers`, `Stack`, `Greedy`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integer arrays `nums1` (length `m`) and `nums2` (length `n`), each containing digits `0`–`9`, along with an integer `k` (`1 <= k <= m + n`).

Construct the lexicographically largest array of `k` digits by selecting digits from `nums1` and `nums2` while **preserving the relative order** of digits chosen from each individual array. Return the resulting `k`-digit array.

---

## Examples

### Example 1

```text
Input: nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
Output: [9,8,6,5,3]
```

### Example 2

```text
Input: nums1 = [6,7], nums2 = [6,0,4], k = 5
Output: [6,7,6,0,4]
```

### Example 3

```text
Input: nums1 = [3,9], nums2 = [8,9], k = 3
Output: [9,8,9]
```

---

## Constraints

- `m == nums1.length`

- `n == nums2.length`

- `1 <= m, n <= 500`

- `0 <= nums1[i], nums2[i] <= 9`

- `1 <= k <= m + n`

- `nums1` and `nums2` do not have leading zeros.

---

## Problem Understanding

- If we choose `x` digits from `nums1` and `k - x` digits from `nums2`, both `0 <= x <= m` and `0 <= k - x <= n` must hold, restricting `x` to `[max(0, k - n), min(k, m)]`.
- For a fixed `x`, maximizing the merged `k`-digit number requires independently picking the lexicographically largest subsequence of length `x` from `nums1` and length `k - x` from `nums2`, and then merging them greedily.
- Merging two digit arrays is trickier than standard merge sort: when `arr1[i] == arr2[j]`, we cannot pick arbitrarily—we must look ahead and advance whichever array has the **lexicographically larger remaining suffix**.

---

## Approach

### Brute Force Approach

Recursively exploring every interleaving of subsequences from `nums1` and `nums2` of combined length `k` searches `O(2^(m + n))` combinations (or `O(m * n * k)` of full-array string DP states), which is far too slow and memory-heavy for `m, n <= 500`.

### Optimized Approach

Enumerate every valid split `x` (`max(0, k - n) <= x <= min(k, m)`), extract the maximum subsequence `arr1 = f(nums1, x)` and `arr2 = f(nums2, k - x)` using a monotonic decreasing stack, merge them via suffix-aware `compare`, and retain the lexicographically largest candidate `ans`.

### Step-by-Step Thinking Process

1. Compute valid split bounds `l = Math.max(0, k - n)` and `r = Math.min(k, m)` for the count `x` of digits taken from `nums1`.
2. Implement `f(nums, len)` with an array-backed monotonic stack `stk` of capacity `len` and a deletion budget `remain = nums.length - len`: pop smaller elements (`stk[top] < x`) while `remain > 0`, push `x` if `top + 1 < len`, or else discard `x` (`--remain`).
3. Implement `compare(nums1, nums2, i, j)` to compare suffixes `nums1[i..]` vs `nums2[j..]` lexicographically, breaking ties by recursing to `(i + 1, j + 1)` and treating a longer suffix as larger if one runs out first.
4. Implement `merge(arr1, arr2)` to pick `arr1[i++]` whenever `compare(arr1, arr2, i, j)` is `true`, and `arr2[j++]` otherwise.
5. Across all splits `x = l..r`, update `ans = arr` whenever `compare(arr, ans, 0, 0)` is `true`.

### Algorithm / Intuition

Decomposing the problem into three clean subroutines makes it manageable:
1. **1D Max Subsequence (`f`)**: To maximize leading digits, a monotonic stack greedily drops smaller preceding digits whenever a larger digit arrives and enough remaining elements (`remain > 0`) exist to still fill `k` slots.
2. **Suffix-Aware Merge (`merge` + `compare`)**: Consider `[6, 7]` and `[6, 0, 4]`. At index `0`, both start with `6`. Looking ahead via `compare` reveals `[6, 7] > [6, 0, 4]`, so consuming `6` from `[6, 7]` immediately exposes `7` next, yielding `[6, 7, 6, 0, 4]` instead of `[6, 6, 7, 0, 4]`.

---

## Dry Run

Tracing **Example 1** (`nums1 = [3, 4, 6, 5]`, `nums2 = [9, 1, 2, 5, 8, 3]`, `k = 5`):

- `m = 4, n = 6` -> `l = max(0, 5 - 6) = 0`, `r = min(5, 4) = 4`.
- `x = 0`: `arr1 = []`, `arr2 = [9, 2, 5, 8, 3]` -> `arr = [9, 2, 5, 8, 3]`.
- `x = 1`: `arr1 = [6]`, `arr2 = [9, 5, 8, 3]` -> `merge` gives `[9, 6, 5, 8, 3]`.
- `x = 2`: `arr1 = [6, 5]`, `arr2 = [9, 8, 3]` -> `merge` gives **`[9, 8, 6, 5, 3]`** (new best `ans`).
- `x = 3`: `arr1 = [4, 6, 5]`, `arr2 = [9, 8]` -> `merge` gives `[9, 8, 4, 6, 5]` (`< ans`).
- `x = 4`: `arr1 = [3, 4, 6, 5]`, `arr2 = [9]` -> `merge` gives `[9, 3, 4, 6, 5]` (`< ans`).
- Returns `[9, 8, 6, 5, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(k * (m + n + k^2))` — There are at most `k + 1` splits; each split runs `f` in `O(m + n)` time and `merge` in `O(k^2)` worst-case time (up to `k` suffix comparisons of length `O(k)`).
- **Space Complexity:** `O(k)` — Temporary arrays `stk`, `arr1`, `arr2`, `arr`, and recursion depth in `compare` each use `O(k)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [321create-maximum-number.java](./321create-maximum-number.java) |

---

## Key Learnings

- Enumerating split sizes `x` decouples a two-array constraint into independent single-array monotonic-stack subproblems.
- When greedily merging two sequences for lexicographical maximum, tie-breaking equal elements **must** compare full remaining suffixes rather than picking an arbitrary side.
