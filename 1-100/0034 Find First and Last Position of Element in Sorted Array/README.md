---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 34. Find First and Last Position of Element in Sorted Array

**[View Problem on LeetCode](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0034` (`34`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` sorted in non-decreasing order and a value `target`, return a two-element array `[first, last]` containing the starting and ending `0`-based indices of `target` in `nums`.

If `target` does not appear in `nums`, return `[-1, -1]`. Your algorithm must run in `O(log n)` time.

---

## Examples

### Example 1

```text
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

### Example 2

```text
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

### Example 3

```text
Input: nums = [], target = 0
Output: [-1,-1]
```

---

## Constraints

- `0 <= nums.length <= 10^5`

- `-10^9 <= nums[i] <= 10^9`

- `nums` is a non-decreasing array.

- `-10^9 <= target <= 10^9`

---

## Problem Understanding

- **Lower-bound reduction:** In an integer array sorted in non-decreasing order, the first occurrence of `target` is the smallest index `l` with `nums[l] >= target`, and the index immediately *after* the last occurrence of `target` is the smallest index `r` with `nums[r] >= target + 1`!
- **Missing target detection:** If `target` is absent from `nums` (including when `nums` is empty), every element `< target` lies before `l` and every element `>= target` is actually `>= target + 1`, so `l` and `r` converge to the exact same index (`l == r`).
- **Overflow safety:** Because `-10^9 <= target <= 10^9`, computing `target + 1` stays well inside Java's 32-bit `int` max (`2,147,483,647`).

---

## Approach

### Brute Force Approach

Scanning from the left to find the first `target` and from the right to find the last `target` (or finding one `target` via binary search and expanding outward linearly) degrades to `O(n)` time when all elements in `nums` equal `target`.

### Optimized Approach

The implemented Java solution writes **one reusable lower-bound binary search helper `search(nums, x)`** over the half-open interval `[0, nums.length)`. `searchRange` calls `l = search(nums, target)` and `r = search(nums, target + 1)`, returning `{-1, -1}` if `l == r` or `{l, r - 1}` otherwise.

### Step-by-Step Thinking Process

1. Define `search(int[] nums, int x)` to return the first index in `[0 .. nums.length]` where `nums[idx] >= x` (returning `nums.length` if all elements are `< x`).
2. Inside `search`, maintain `left = 0, right = nums.length` and `mid = (left + right) >>> 1`; if `nums[mid] >= x`, narrow `right = mid`, else advance `left = mid + 1`.
3. Call `int l = search(nums, target)` to find where `target` begins.
4. Call `int r = search(nums, target + 1)` to find where numbers strictly greater than `target` begin.
5. If `l == r`, zero copies of `target` exist between `l` and `r`, so return `new int[] {-1, -1}`; otherwise return `new int[] {l, r - 1}`.

### Algorithm / Intuition

Writing two separate binary searches (one biased left for `first`, one biased right for `last`) is notorious for off-by-one bugs with ceiling division `(left + right + 1) / 2`. Reducing `upper_bound(target)` to `lower_bound(target + 1)` lets a single bug-free 10-line `search(nums, x)` handle both endpoints, empty arrays (`nums = []` gives `l = 0, r = 0 -> [-1, -1]`), and out-of-range targets effortlessly. Notice also `(left + right) >>> 1`, Java's unsigned right-shift operator, which safely computes the midpoint without overflow.

---

## Dry Run

Tracing Example 1: `nums = [5, 7, 7, 8, 8, 10]`, `target = 8`

1. **First call `l = search(nums, 8)`** (`left = 0, right = 6`):
   - `mid = 3` (`nums[3] = 8 >= 8`) -> `right = 3`.
   - `mid = 1` (`nums[1] = 7 < 8`) -> `left = 2`.
   - `mid = 2` (`nums[2] = 7 < 8`) -> `left = 3`.
   - Loop ends (`left == right == 3`) -> `l = 3`.
2. **Second call `r = search(nums, 9)`** (`left = 0, right = 6`):
   - `mid = 3` (`nums[3] = 8 < 9`) -> `left = 4`.
   - `mid = 5` (`nums[5] = 10 >= 9`) -> `right = 5`.
   - `mid = 4` (`nums[4] = 8 < 9`) -> `left = 5`.
   - Loop ends (`left == right == 5`) -> `r = 5`.
3. Check `l == r` (`3 == 5` is `false`) -> return `{3, 5 - 1}` = `[3, 4]`.

---

## Complexity Analysis

- **Time Complexity:** `O(log n)` — Executes two binary searches on `nums`, each taking `O(log n)` comparisons.
- **Space Complexity:** `O(1)` — Allocates only the 2-element return array and scalar pointers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [34find-first-and-last-position-of-element-in-sorted-array.java](./34find-first-and-last-position-of-element-in-sorted-array.java) |

---

## Key Learnings

- For integer arrays, the last index of `target` equals `lowerBound(target + 1) - 1` whenever `lowerBound(target) < lowerBound(target + 1)` (just watch out if `target` could equal `Integer.MAX_VALUE`, which constraints here forbid).
- Using a half-open range `[0, nums.length)` naturally handles empty arrays (`left = 0, right = 0`) without explicit `nums.length == 0` guards.
- Java's unsigned shift `(left + right) >>> 1` is an idiomatic, overflow-safe equivalent to `left + (right - left) / 2`.
