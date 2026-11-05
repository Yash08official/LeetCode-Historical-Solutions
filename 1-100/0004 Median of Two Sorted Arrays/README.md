---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Divide and Conquer
---

# 4. Median of Two Sorted Arrays

**[View Problem on LeetCode](https://leetcode.com/problems/median-of-two-sorted-arrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0004` (`4`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Divide and Conquer` |
| **Solution Language** | Java |

---

## Problem Description

Given two individually sorted integer arrays `nums1` (of length `m`) and `nums2` (of length `n`), compute and return the **median** of all `m + n` elements combined.

If `m + n` is odd, the median is the single middle value; if `m + n` is even, the median is the average of the two middle values. Your algorithm must run in `O(log(m + n))` time.

---

## Examples

### Example 1

```text
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

### Example 2

```text
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

---

## Constraints

- `nums1.length == m`

- `nums2.length == n`

- `0 <= m <= 1000`

- `0 <= n <= 1000`

- `1 <= m + n <= 2000`

- `-10^6 <= nums1[i], nums2[i] <= 10^6`

---

## Problem Understanding

- **Unified parity trick:** For total length `L = m + n`, the `1`-indexed positions `(L + 1) / 2` and `(L + 2) / 2` (using integer division) pick the exact same middle element when `L` is odd (e.g., `L = 3` -> `2` and `2`), and the two middle elements when `L` is even (e.g., `L = 4` -> `2` and `3`). Averaging those two values handles both odd and even cases without branching.
- **Empty array edge cases:** Either `m` or `n` may be `0` (`1 <= m + n <= 2000`), so the search must gracefully handle one array being exhausted.
- **Value bounds:** Elements lie in `[-10^6, 10^6]`, so `1 << 30` (`1,073,741,824`) safely acts as `+infinity`.

---

## Approach

### Brute Force Approach

Merge `nums1` and `nums2` into a single sorted array of size `m + n` (just like the merge step of Merge Sort) and read the middle element(s). That takes `O(m + n)` time and `O(m + n)` space (or `O(1)` space with two pointers counting up to `(m + n) / 2`), which fails to meet the strict `O(log(m + n))` logarithmic requirement.

### Optimized Approach

Reduce median finding to a recursive Divide-and-Conquer search `f(i, j, k)` for the `k`-th smallest element across `nums1[i..]` and `nums2[j..]`, eliminating `k / 2` elements per recursive step.

### Step-by-Step Thinking Process

1. Express the median as `(a + b) / 2.0`, where `a` is the `((m + n + 1) / 2)`-th smallest element and `b` is the `((m + n + 2) / 2)`-th smallest element.
2. Design `f(i, j, k)` to find the `k`-th smallest element (`1`-indexed) in the suffixes `nums1[i..m-1]` and `nums2[j..n-1]`.
3. Handle base cases first: if `i >= m`, return `nums2[j + k - 1]`; if `j >= n`, return `nums1[i + k - 1]`; if `k == 1`, return `Math.min(nums1[i], nums2[j])`.
4. Otherwise, step `p = k / 2` elements into both suffixes (`x = nums1[i + p - 1]` and `y = nums2[j + p - 1]`, substituting sentinel `1 << 30` if out of bounds).
5. If `x < y`, `nums1[i .. i + p - 1]` cannot contain the `k`-th smallest element (at most `(p - 1) + (p - 1) = 2p - 2 < k` elements precede `x`), so discard those `p` elements and recurse as `f(i + p, j, k - p)`; symmetrically discard from `nums2` when `x >= y`.

### Algorithm / Intuition

In `4median-of-two-sorted-arrays.java`, `findMedianSortedArrays` caches `m`, `n`, `nums1`, and `nums2` in instance fields and calls `f(0, 0, (m + n + 1) / 2)` and `f(0, 0, (m + n + 2) / 2)`. Inside `f(int i, int j, int k)`, we look ahead by `p = k / 2` items in each active suffix. If an array has fewer than `p` remaining items (`i + p - 1 >= m`), assigning `1 << 30` forces the comparison `x < y` to discard `p` safe items from the *other* array (which must have at least `p` items left since `m - i + n - j >= k >= 2p`). Each call shrinks `k` to `k - k / 2`, halving `k` in logarithmic steps.

---

## Dry Run

**Input:** `nums1 = [1, 3]` (`m = 2`), `nums2 = [2]` (`n = 1`)

- Total length `m + n = 3`.
- `(m + n + 1) / 2 = 2` and `(m + n + 2) / 2 = 2`.

Tracing `f(0, 0, 2)`:
1. **Call 1:** `i = 0, j = 0, k = 2`. Not a base case. `p = 2 / 2 = 1`.
   - `x = nums1[0 + 1 - 1] = nums1[0] = 1`
   - `y = nums2[0 + 1 - 1] = nums2[0] = 2`
   - Since `x < y` (`1 < 2`), discard `nums1[0]` and recurse `f(1, 0, 1)`.
2. **Call 2:** `i = 1, j = 0, k = 1`. Base case `k == 1` triggers:
   - Returns `Math.min(nums1[1], nums2[0]) = Math.min(3, 2) = 2`.

Both `a = 2` and `b = 2`, so `(a + b) / 2.0 = 2.0`.

---

## Complexity Analysis

- **Time Complexity:** `O(log(m + n))` — Each recursive step reduces `k` by `k / 2` (initially `k ≈ (m + n) / 2`), performing at most `O(log(m + n))` constant-time calls.
- **Space Complexity:** `O(log(m + n))` — Recursion stack depth scales logarithmically with `k` (`O(log(m + n))` stack frames).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4median-of-two-sorted-arrays.java](./4median-of-two-sorted-arrays.java) |

---

## Key Learnings

- Computing both `(L + 1) / 2` and `(L + 2) / 2` unifies odd and even median formulas without conditional branches.
- Finding the `k`-th order statistic in two sorted arrays generalizes median finding and handles out-of-bounds suffixes cleanly using an `+infinity` sentinel (`1 << 30`).
- Discarding `k / 2` elements per comparison guarantees logarithmic convergence regardless of how unevenly `m` and `n` are sized.
