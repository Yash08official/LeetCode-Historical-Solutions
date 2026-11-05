---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
---

# 154. Find Minimum in Rotated Sorted Array II

**[View Problem on LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0154` (`154`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

An originally non-decreasing sorted integer array of length `n` has been rotated right between `1` and `n` times. Unlike the distinct-elements version of this problem, `nums` **may contain duplicate values**.

Given the rotated array `nums`, find and return its **minimum element** while minimizing the number of comparison steps.

---

## Examples

### Example 1

```text
Input: nums = [1,3,5]
Output: 1
```

### Example 2

```text
Input: nums = [2,2,2,0,1]
Output: 0
```

---

## Constraints

- `n == nums.length`

- `1 <= n <= 5000`

- `-5000 <= nums[i] <= 5000`

- `nums` is sorted and rotated between `1` and `n` times.

---

## Follow-up Questions

This problem is similar to Find Minimum in Rotated Sorted Array, but `nums` may contain **duplicates**. Would this affect the runtime complexity? How and why?

Yes, duplicates degrade the **worst-case** runtime complexity from `O(log n)` to **`O(n)`**. When `nums[mid] == nums[r]` (for example, `nums = [1, 1, 1, 0, 1]` vs. `nums = [1, 0, 1, 1, 1]`), a single comparison reveals zero information about which side of `mid` hides the `0`, forcing the algorithm to shrink the search boundary by `1` (`r--`) instead of halving it.

---

## Problem Understanding

- **Two Non-Decreasing Segments:** Rotating a sorted array splits it into a left sorted plateau (`>= nums[0]`) followed by a right sorted plateau (`<= nums[0]`), where the first element of the right plateau is the global minimum (unless rotated `n` times, where the whole array is non-decreasing).
- **Why Compare Against `nums[r]`:** Comparing `nums[mid]` with the right boundary `nums[r]` distinguishes whether `mid` sits in the higher left half (`nums[mid] > nums[r]`) or the lower right half (`nums[mid] < nums[r]`).
- **Ambiguity on Duplicates (`nums[mid] == nums[r]`):** When `nums[mid] == nums[r]`, the minimum could lie to the left of `mid` (e.g., `[2, 0, 2, 2, 2]`) OR to the right of `mid` (e.g., `[2, 2, 2, 0, 2]`). However, since `mid < r` and `nums[mid] == nums[r]`, discarding index `r` (`r--`) never loses the sole copy of the minimum!

---

## Approach

### Brute Force Approach

Scanning all `n` elements linearly from index `0` to `n - 1` and tracking the smallest value always takes `O(n)` comparisons, failing to exploit sortedness when duplicates are sparse or absent.

### Optimized Approach

Use **Modified Binary Search** with pointers `l` and `r`, comparing `nums[mid]` against `nums[r]`: jump `l = mid + 1` when `nums[mid] > nums[r]`, jump `r = mid` when `nums[mid] < nums[r]`, and safely shrink `r--` when `nums[mid] == nums[r]`.

### Step-by-Step Thinking Process

1. Maintain search interval `[l, r]` initialized to `[0, nums.length - 1]` with the invariant that the minimum element always resides within `nums[l..r]`.
2. Compute `mid = (l + r) >> 1`. Because `l < r`, we always have `l <= mid < r`.
3. Case 1 (`nums[mid] > nums[r]`): `mid` is strictly in the rotated upper prefix, so the minimum must be strictly right of `mid` -> set `l = mid + 1`.
4. Case 2 (`nums[mid] < nums[r]`): `nums[mid..r]` is non-decreasing, so `mid` could be the minimum itself, while indices `> mid` cannot beat `nums[mid]` -> set `r = mid`.
5. Case 3 (`nums[mid] == nums[r]`): Which half holds the drop is ambiguous, so decrement `r--`. Even if `nums[r]` was the minimum, `nums[mid]` (`mid < r`) still holds that exact same value inside `[l, r - 1]`.

### Algorithm / Intuition

In `findMin(int[] nums)`, `while (l < r)` narrows `[l, r]` until `l == r` points to a minimum element. Using `(l + r) >> 1` floors `mid` toward `l`, ensuring `mid < r` whenever `l < r`. That strict inequality `mid < r` is what makes `r--` 100% safe when `nums[mid] == nums[r]`: index `mid` remains inside the updated range `[l, r - 1]`, acting as a backup witness of the value we just dropped at `r`.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 3, 5]` (`l = 0, r = 2`)

1. **Iteration 1 (`l = 0, r = 2`):**
   - `mid = (0 + 2) >> 1 = 1` (`nums[1] = 3`, `nums[2] = 5`).
   - `nums[mid] < nums[r]` (`3 < 5`) -> `else` branch sets `r = mid = 1`.
2. **Iteration 2 (`l = 0, r = 1`):**
   - `mid = (0 + 1) >> 1 = 0` (`nums[0] = 1`, `nums[1] = 3`).
   - `nums[mid] < nums[r]` (`1 < 3`) -> `else` branch sets `r = mid = 0`.
3. Loop `l < r` (`0 < 0`) terminates. Return `nums[0] = 1`.

*(Quick check on duplicate case `nums = [2, 2, 2, 0, 1]`: `l=0, r=4, mid=2` -> `2 > 1` sets `l=3`; then `l=3, r=4, mid=3` -> `0 < 1` sets `r=3`; returns `nums[3] = 0`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(log n)` average / best case, `O(n)` worst case — Halving `[l, r]` takes `O(log n)` steps when elements are mostly distinct, but all-identical inputs like `[1, 1, 1, 1, 1]` trigger `r--` every iteration (`n - 1` steps).
- **Space Complexity:** `O(1)` — Only three integer variables (`l`, `r`, `mid`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [154find-minimum-in-rotated-sorted-array-ii.java](./154find-minimum-in-rotated-sorted-array-ii.java) |

---

## Key Learnings

- Comparing `nums[mid]` with `nums[r]` (instead of `nums[l]`) works seamlessly on unrotated sorted arrays because `nums[mid] < nums[r]` immediately pulls `r` leftward toward index `0`.
- Because `mid = (l + r) >> 1 < r` whenever `l < r`, dropping `r` (`r--`) on `nums[mid] == nums[r]` never discards the last copy of `nums[r]`.
- Information-theoretically, no algorithm can beat `Omega(n)` in the worst case with arbitrary duplicates: hiding a single `0` anywhere inside `n - 1` copies of `1` requires inspecting all `n` positions in the worst case.
