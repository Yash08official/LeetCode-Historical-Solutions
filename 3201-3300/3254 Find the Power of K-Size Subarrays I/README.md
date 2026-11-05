---
comments: true
difficulty: Medium
tags:
  - Array
  - Sliding Window
---

# 3254. Find the Power of K-Size Subarrays I

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-power-of-k-size-subarrays-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3254` (`3254`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of integers `nums` of length `n` and a positive integer `k`.

The **power** of an array is defined as:
- Its maximum element if all of its elements are consecutive and sorted in ascending order (that is, `nums[i] == nums[i - 1] + 1` for all adjacent pairs).
- `-1` otherwise.

You need to find the power of each contiguous subarray of size `k` in `nums`.

Return an integer array `results` of length `n - k + 1` where `results[i]` is the power of the subarray `nums[i..(i + k - 1)]`.

---

## Examples

### Example 1

**Input:** `nums = [1,2,3,4,3,2,5], k = 3`

**Output:** [3,4,-1,-1,-1]

**Explanation:**

There are 5 subarrays of `nums` of size 3:

- `[1, 2, 3]` with the maximum element 3.

- `[2, 3, 4]` with the maximum element 4.

- `[3, 4, 3]` whose elements are **not** consecutive.

- `[4, 3, 2]` whose elements are **not** sorted.

- `[3, 2, 5]` whose elements are **not** consecutive.

### Example 2

**Input:** `nums = [2,2,2,2,2], k = 4`

**Output:** `[-1,-1]`

### Example 3

**Input:** `nums = [3,2,3,2,3,2], k = 2`

**Output:** `[-1,3,-1,3,-1]`

---

## Constraints

- `1 <= n == nums.length <= 500`

- `1 <= nums[i] <= 10^5`

- `1 <= k <= n`

---

## Problem Understanding

- **Consecutive Ascending Criterion:** A subarray of size `k` has a power only if every element is strictly 1 greater than its preceding element (`nums[j] == nums[j - 1] + 1`).
- **Maximum Value:** In any consecutive ascending subarray, the maximum value is always the rightmost element (`nums[i + k - 1]`).
- **Subarray Evaluation:** Instead of rechecking all `k - 1` adjacent pairs for every window, we can track the length of the consecutive ascending run ending at each index.
- If the run length ending at index `i` is at least `k`, then the window `nums[i - k + 1 .. i]` is strictly consecutive and ascending, so its power is `nums[i]`; otherwise, its power is `-1`.

---

## Approach

### Brute Force Approach

For each of the `n - k + 1` starting indices `i`, check whether `nums[j] == nums[j - 1] + 1` holds for all `j` from `i + 1` to `i + k - 1`. If any pair violates the condition, set the power to `-1`; if all pairs satisfy it, set the power to `nums[i + k - 1]`. This takes `O((n - k + 1) * k) = O(n * k)` time.

### Optimized Approach

We precompute an array `f` of size `n` initialized to 1, where `f[i]` represents the length of the consecutive ascending run ending at index `i`. We iterate `i` from 1 to `n - 1`: if `nums[i] == nums[i - 1] + 1`, we set `f[i] = f[i - 1] + 1`. Then, for each window of length `k` ending at `i` (from `i = k - 1` to `n - 1`), if `f[i] >= k`, the window is valid and its power is `nums[i]`; otherwise, it is `-1`. This resolves all queries in `O(n)` time.

### Step-by-Step Thinking Process

1. A subarray `nums[i - k + 1 .. i]` of length `k` is consecutive and ascending if and only if the consecutive run ending at `i` has length at least `k`.
2. Let `f[i]` be the length of the consecutive ascending streak ending at index `i`.
3. Transition: if `nums[i] == nums[i - 1] + 1`, then `f[i] = f[i - 1] + 1`; otherwise `f[i] = 1`.
4. For each window ending at index `i >= k - 1`: if `f[i] >= k`, power is `nums[i]`; else power is `-1`.
5. Store the results in an array `ans` of size `n - k + 1`.

### Algorithm / Intuition

In `Solution.resultsArray`: array `f` of size `n` is allocated and filled with 1s via `Arrays.fill(f, 1)`. In the first pass from index 1 to `n - 1`, we update `f[i] = f[i - 1] + 1` whenever `nums[i] == nums[i - 1] + 1`. This dynamic programming precomputation gives the length of the valid consecutive run ending at each index. In the second pass, we allocate `ans` of size `n - k + 1` and loop from `i = k - 1` to `n - 1`: if `f[i] >= k`, all `k` elements in the subarray ending at `i` are consecutive, so `ans[i - k + 1] = nums[i]`; otherwise, `ans[i - k + 1] = -1`.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [1, 2, 3, 4, 3, 2, 5]`, `k = 3`, `n = 7`

- **Pass 1: Compute `f`:**
  - `f[0] = 1`
  - `nums[1] = 2 == nums[0] + 1` -> `f[1] = 2`
  - `nums[2] = 3 == nums[1] + 1` -> `f[2] = 3`
  - `nums[3] = 4 == nums[2] + 1` -> `f[3] = 4`
  - `nums[4] = 3 != nums[3] + 1` -> `f[4] = 1`
  - `nums[5] = 2 != nums[4] + 1` -> `f[5] = 1`
  - `nums[6] = 5 != nums[5] + 1` -> `f[6] = 1`
  - `f = [1, 2, 3, 4, 1, 1, 1]`

- **Pass 2: Populate `ans` (windows of size 3):**
  - `i = 2`: `f[2] = 3 >= 3` -> `ans[0] = nums[2] = 3`
  - `i = 3`: `f[3] = 4 >= 3` -> `ans[1] = nums[3] = 4`
  - `i = 4`: `f[4] = 1 < 3` -> `ans[2] = -1`
  - `i = 5`: `f[5] = 1 < 3` -> `ans[3] = -1`
  - `i = 6`: `f[6] = 1 < 3` -> `ans[4] = -1`

- **Result:** `ans = [3, 4, -1, -1, -1]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Two linear sweeps of length `n`: the first pass computes the consecutive run lengths in `f`, and the second pass fills `ans` in `O(1)` per window.
- **Space Complexity:** `O(n)` — An auxiliary array `f` of length `n` stores the streak lengths (excluding the output array `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3254find-the-power-of-k-size-subarrays-i.java](./3254find-the-power-of-k-size-subarrays-i.java) |

---

## Key Learnings

- Consecutive sequence properties across fixed windows can be verified in `O(1)` time per window by tracking prefix run lengths.
- Because an ascending consecutive subarray is strictly ordered, its maximum element is trivially its rightmost boundary element.
