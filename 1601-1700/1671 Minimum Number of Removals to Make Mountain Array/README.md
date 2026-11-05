---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Dynamic Programming
  - Greedy
---

# 1671. Minimum Number of Removals to Make Mountain Array

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1671` (`1671`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | JavaScript |

---

## Problem Description

An array `arr` of length `>= 3` is called a **mountain array** if there exists a peak index `i` strictly inside the array (`0 < i < arr.length - 1`) such that:
- Elements strictly increase up to the peak: `arr[0] < arr[1] < ... < arr[i]`
- Elements strictly decrease after the peak: `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given an integer array `nums` (guaranteed to contain at least one valid mountain subsequence), return the **minimum number of elements to remove** so that the remaining elements form a mountain array.

---

## Examples

### Example 1

```text
Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove any elements.
```

### Example 2

```text
Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].
```

---

## Constraints

- `3 <= nums.length <= 1000`

- `1 <= nums[i] <= 10^9`

- It is guaranteed that you can make a mountain array out of `nums`.

---

## Problem Understanding

- Minimizing the number of **removed** elements from an array of length `n` is equivalent to **maximizing the length of the kept mountain subsequence** (`n - maxMountainLength`).
- A mountain subsequence with peak at original index `i` consists of:
  1. A strictly increasing subsequence ending at `i` (length `left[i]`).
  2. A strictly decreasing subsequence starting at `i` (length `right[i]`).
  - Combined length = `left[i] + right[i] - 1` (subtracting `1` so `nums[i]` isn't double-counted).
- **Critical validity constraint:** Peak `i` cannot be the first or last element of the mountain! Both slopes must be non-empty, which means we **must require `left[i] > 1 && right[i] > 1`** before considering index `i` as a valid peak.

---

## Approach

### Brute Force Approach

Enumerating all `2^n` subsequences of `nums` and testing whether each is a mountain array takes `O(n * 2^n)` time, which is completely infeasible for `n <= 1000`.

### Optimized Approach

Use Dynamic Programming in `O(n^2)` time to precompute `left[i]` (Longest Increasing Subsequence ending at `i`) and `right[i]` (Longest Decreasing Subsequence starting at `i`) for every index. Then scan all indices `i` satisfying `left[i] > 1 && right[i] > 1` to find the maximum mountain length `ans = max(left[i] + right[i] - 1)`, and return `n - ans`.

### Step-by-Step Thinking Process

1. Reframe 'minimum removals' into `n - ans`, where `ans` is the longest valid mountain subsequence.
2. Initialize `left` and `right` arrays of length `n` filled with `1` (each element alone is a subsequence of length `1`).
3. Compute `left[i]` left-to-right (`i = 1 .. n - 1`): for every `j < i` with `nums[i] > nums[j]`, update `left[i] = Math.max(left[i], left[j] + 1)`.
4. Compute `right[i]` right-to-left (`i = n - 2 .. 0`): for every `j > i` with `nums[i] > nums[j]`, update `right[i] = Math.max(right[i], right[j] + 1)`.
5. Scan `i = 0 .. n - 1`: only when `left[i] > 1 && right[i] > 1` (ensuring at least one smaller element to the left and one smaller element to the right), update `ans = Math.max(ans, left[i] + right[i] - 1)`.
6. Return `n - ans`.

### Algorithm / Intuition

In `minimumMountainRemovals`, `left` is the classic `O(n^2)` LIS table and `right` is its mirror image (LIS computed backward from `n - 1` down to `0`). Checking `if (left[i] > 1 && right[i] > 1)` is essential: without it, a purely strictly increasing array segment would have `left[i] = k, right[i] = 1` and falsely claim a 'mountain' of length `k` with no descending right slope!

---

## Dry Run

Tracing Example 1 (`nums = [1, 3, 1]`, `n = 3`) and summarizing Example 2 (`[2, 1, 1, 5, 6, 2, 3, 1]`):

**Example 1 (`nums = [1, 3, 1]`):**
1. Initialize `left = [1, 1, 1]`, `right = [1, 1, 1]`.
2. **Forward LIS (`left`):**
   - `i = 1` (`3`): `3 > nums[0] (1)` -> `left[1] = 2`.
   - `i = 2` (`1`): neither `1 > 1` nor `1 > 3` -> `left[2] = 1`.
   - `left = [1, 2, 1]`.
3. **Backward LDS (`right`):**
   - `i = 1` (`3`): `3 > nums[2] (1)` -> `right[1] = 2`.
   - `i = 0` (`1`): neither `1 > 3` nor `1 > 1` -> `right[0] = 1`.
   - `right = [1, 2, 1]`.
4. **Peak scan:**
   - `i = 0`: `left[0] = 1` (skipped).
   - `i = 1`: `left[1] = 2 > 1` and `right[1] = 2 > 1` -> `ans = 2 + 2 - 1 = 3`.
   - `i = 2`: `right[2] = 1` (skipped).
5. Return `n - ans = 3 - 3 = 0`.

*(In Example 2, `nums = [2, 1, 1, 5, 6, 2, 3, 1]`, at peak `i = 4` (`nums[4] = 6`), `left[4] = 3` (`[1, 5, 6]`) and `right[4] = 3` (`[6, 3, 1]`), giving `ans = 3 + 3 - 1 = 5` and `8 - 5 = 3` removals.)*

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Both nested DP loops (`left` and `right`) examine `n * (n - 1) / 2` pairs, which is ~`5 * 10^5` operations for `n <= 1000`.
- **Space Complexity:** `O(n)` — Two DP arrays `left` and `right` of size `n` are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1671minimum-number-of-removals-to-make-mountain-array.js](./1671minimum-number-of-removals-to-make-mountain-array.js) |

---

## Key Learnings

- Converting 'minimum deletions to satisfy property P' into `n - (longest subsequence satisfying P)` is one of the most versatile DP transformations.
- Bidirectional LIS (`left[i]` ending at `i` + `right[i]` starting at `i`) cleanly decomposes bitonic/mountain subsequence problems around every candidate peak `i`.
- If `n` were up to `10^5`, both `left` and `right` could be computed in `O(n log n)` time using patience sorting + binary search.
