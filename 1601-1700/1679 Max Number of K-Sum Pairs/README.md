---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Two Pointers
  - Sorting
---

# 1679. Max Number of K-Sum Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/max-number-of-k-sum-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1679` (`1679`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and a target integer `k`, in one operation you may choose any two elements from `nums` that sum to `k` and remove both from the array. Return the maximum number of such operations you can perform.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,4], k = 5
Output: 2
Explanation: Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.
```

### Example 2

```text
Input: nums = [3,1,3,4,3], k = 6
Output: 1
Explanation: Starting with nums = [3,1,3,4,3]:
- Remove the first two 3's, then nums = [1,4,3]
There are no more pairs that sum up to 6, hence a total of 1 operation.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

- `1 <= k <= 10^9`

---

## Problem Understanding

- Each element at a given array index can be used in **at most one** pair.
- Order of elements in `nums` has no bearing on whether two numbers sum to `k` (`a + b == k`).
- Once `nums` is sorted in non-decreasing order, pairing the smallest available number `nums[l]` with the largest available number `nums[r]` gives a deterministic comparison against `k`:
  - If `nums[l] + nums[r] > k`, `nums[r]` is too large even when paired with the smallest remaining element `nums[l]`, so `nums[r]` can **never** be part of any valid pair — discard `r` (`--r`).
  - If `nums[l] + nums[r] < k`, `nums[l]` is too small even when paired with the largest remaining element `nums[r]`, so discard `l` (`++l`).
  - If `nums[l] + nums[r] == k`, greedily pairing `l` and `r` (`++ans; ++l; --r;`) is always optimal.

---

## Approach

### Brute Force Approach

Scanning all remaining elements to find a complement `k - nums[i]` and marking used elements with a boolean array takes `O(n^2)` time in the worst case, timing out for `n <= 10^5`.

### Optimized Approach

Sort `nums` ascending with `Arrays.sort(nums)` and use opposite-end two pointers (`l = 0`, `r = nums.length - 1`). Compare `s = nums[l] + nums[r]` to `k` in a `while (l < r)` loop, incrementing `ans` and moving both pointers inward on a match, or eliminating the impossible boundary pointer otherwise.

### Step-by-Step Thinking Process

1. Sort `nums` in ascending order so monotonic two-pointer elimination applies.
2. Place left pointer `l = 0` and right pointer `r = nums.length - 1`, and initialize `ans = 0`.
3. While `l < r` (ensuring two distinct indices are picked), compute `s = nums[l] + nums[r]`.
4. If `s == k`, count the pair (`++ans`) and consume both elements (`++l; --r;`).
5. Else if `s > k`, decrement `r`; else (`s < k`), increment `l`.
6. Return `ans`.

### Algorithm / Intuition

In `maxOperations`, sorting clusters duplicates side-by-side and arranges values monotonically. Note that `nums[l] + nums[r]` cannot overflow a 32-bit signed `int` here? Wait — let's check! Since `1 <= nums[i] <= 10^9`, `nums[l] + nums[r]` is at most `2 * 10^9`, which is strictly less than `Integer.MAX_VALUE` (`2,147,483,647`), so `int s = nums[l] + nums[r]` is completely safe from 32-bit signed integer overflow!

---

## Dry Run

Tracing Example 1 (`nums = [1, 2, 3, 4], k = 5`) and Example 2 (`nums = [3, 1, 3, 4, 3], k = 6`):

**Example 1 (`nums = [1, 2, 3, 4], k = 5`):**
1. `Arrays.sort(nums)` -> `[1, 2, 3, 4]`. `l = 0, r = 3, ans = 0`.
2. `l = 0 < r = 3`: `s = 1 + 4 = 5 == 5` -> `ans = 1`, `l = 1`, `r = 2`.
3. `l = 1 < r = 2`: `s = 2 + 3 = 5 == 5` -> `ans = 2`, `l = 2`, `r = 1`.
4. `l = 2 < r = 1` is false -> loop terminates, returns `2`.

**Example 2 (`nums = [3, 1, 3, 4, 3], k = 6`):**
1. Sorted: `[1, 3, 3, 3, 4]`, `l = 0, r = 4, ans = 0`.
2. `l = 0, r = 4`: `s = 1 + 4 = 5 < 6` -> `++l` (`l = 1`).
3. `l = 1, r = 4`: `s = 3 + 4 = 7 > 6` -> `--r` (`r = 3`).
4. `l = 1, r = 3`: `s = 3 + 3 = 6 == 6` -> `ans = 1, l = 2, r = 2` -> stops, returns `1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — `Arrays.sort(nums)` takes `O(n log n)` time, followed by a single `O(n)` two-pointer pass.
- **Space Complexity:** `O(log n)` — Sorting a primitive `int[]` in Java uses Dual-Pivot Quicksort, requiring `O(log n)` call stack space and no heap allocations.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1679max-number-of-k-sum-pairs.java](./1679max-number-of-k-sum-pairs.java) |

---

## Key Learnings

- Sorting + opposite two pointers solves disjoint pair-sum counting in `O(n log n)` time with near-zero extra memory, avoiding `HashMap` boxing overhead (`Integer` objects) in Java.
- An alternative `O(n)` time, `O(n)` space solution uses a frequency `HashMap` to match each `x` with an available `k - x` on the fly.
- Always verify overflow bounds when adding two `int` values: `10^9 + 10^9 = 2 * 10^9 < 2^31 - 1` (`2.147 * 10^9`), so `int s` is safe here.
