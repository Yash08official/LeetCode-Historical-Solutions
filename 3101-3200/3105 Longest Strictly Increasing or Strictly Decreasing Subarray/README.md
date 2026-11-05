---
comments: true
difficulty: Easy
tags:
  - Array
---

# 3105. Longest Strictly Increasing or Strictly Decreasing Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3105` (`3105`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

We are given an array of integers `nums`. We need to determine the length of the longest subarray that is either strictly increasing or strictly decreasing.

A subarray is strictly increasing if each element is strictly greater than its preceding element (`nums[k] > nums[k - 1]`). Similarly, it is strictly decreasing if each element is strictly smaller than its preceding element (`nums[k] < nums[k - 1]`).

---

## Examples

### Example 1

**Input:** `nums = [1,4,3,3,2]`

**Output:** `2`

**Explanation:**

The strictly increasing subarrays of `nums` are `[1]`, `[2]`, `[3]`, `[3]`, `[4]`, and `[1,4]`.

The strictly decreasing subarrays of `nums` are `[1]`, `[2]`, `[3]`, `[3]`, `[4]`, `[3,2]`, and `[4,3]`.

Hence, we return `2`.

### Example 2

**Input:** `nums = [3,3,3,3]`

**Output:** `1`

**Explanation:**

The strictly increasing subarrays of `nums` are `[3]`, `[3]`, `[3]`, and `[3]`.

The strictly decreasing subarrays of `nums` are `[3]`, `[3]`, `[3]`, and `[3]`.

Hence, we return `1`.

### Example 3

**Input:** `nums = [3,2,1]`

**Output:** `3`

**Explanation:**

The strictly increasing subarrays of `nums` are `[3]`, `[2]`, and `[1]`.

The strictly decreasing subarrays of `nums` are `[3]`, `[2]`, `[1]`, `[3,2]`, `[2,1]`, and `[3,2,1]`.

Hence, we return `3`.

---

## Constraints

- `1 <= nums.length <= 50`

- `1 <= nums[i] <= 50`

---

## Problem Understanding

Key observations and base cases:
- A single element by itself is trivially both strictly increasing and strictly decreasing, so the minimum answer is always at least 1.
- Equal adjacent elements (`nums[k] == nums[k - 1]`) break both strict monotonicity conditions, resetting the streak length back to 1.
- Subarrays are contiguous blocks of elements.
- We can evaluate the longest strictly increasing subarray in one pass, and the longest strictly decreasing subarray in a second pass (or concurrently in one pass), taking the maximum length found.

---

## Approach

### Brute Force Approach

A brute-force method would check all `O(n^2)` subarrays: for each pair `(i, j)`, verify whether the subarray `nums[i..j]` is strictly increasing or strictly decreasing. This takes `O(n^3)` without optimization or `O(n^2)` with early breaking, which is unnecessary when a simple linear pass suffices.

### Optimized Approach

We track the maximum length in `ans`, initialized to 1.
- In the first pass, we maintain a running length `t = 1`. For each index `i` from 1 to `nums.length - 1`, if `nums[i - 1] < nums[i]`, we increment `t` and update `ans = Math.max(ans, t)`; otherwise, we reset `t = 1`.
- In the second pass, we similarly maintain `t = 1`. For each index `i` from 1 to `nums.length - 1`, if `nums[i - 1] > nums[i]`, we increment `t` and update `ans = Math.max(ans, t)`; otherwise, we reset `t = 1`.
- We return `ans`.

### Step-by-Step Thinking Process

1. Any single element has length 1.
2. If `nums[i] > nums[i - 1]`, the strictly increasing subarray extends by 1; otherwise, a new increasing subarray begins at `nums[i]` with length 1.
3. Similarly, if `nums[i] < nums[i - 1]`, the strictly decreasing subarray extends by 1; otherwise, it resets to 1.
4. Performing two clean linear loops keeps the logic simple, readable, and decoupled.
5. The maximum length reached by either streak is our final answer.

### Algorithm / Intuition

The algorithm tracks streak lengths linearly:
1. Initialize `ans = 1`.
2. Loop 1 (increasing streak): for `i = 1` to `nums.length - 1` with running counter `t = 1`:
   - If `nums[i - 1] < nums[i]`, set `ans = Math.max(ans, ++t)`.
   - Else, reset `t = 1`.
3. Loop 2 (decreasing streak): for `i = 1` to `nums.length - 1` with running counter `t = 1`:
   - If `nums[i - 1] > nums[i]`, set `ans = Math.max(ans, ++t)`.
   - Else, reset `t = 1`.
4. Return `ans`.

---

## Dry Run

Trace on Example 1: `nums = [1, 4, 3, 3, 2]` (`n = 5`)

- Start with `ans = 1`.
- Pass 1 (strictly increasing):
  - `i = 1`: `nums[0] (1) < nums[1] (4)` -> `t` becomes 2, `ans = max(1, 2) = 2`.
  - `i = 2`: `nums[1] (4) < nums[2] (3)` is false -> `t = 1`.
  - `i = 3`: `nums[2] (3) < nums[3] (3)` is false -> `t = 1`.
  - `i = 4`: `nums[3] (3) < nums[4] (2)` is false -> `t = 1`.
- Pass 2 (strictly decreasing):
  - `i = 1`: `nums[0] (1) > nums[1] (4)` is false -> `t = 1`.
  - `i = 2`: `nums[1] (4) > nums[2] (3)` -> `t` becomes 2, `ans = max(2, 2) = 2`.
  - `i = 3`: `nums[2] (3) > nums[3] (3)` is false -> `t = 1`.
  - `i = 4`: `nums[3] (3) > nums[4] (2)` -> `t` becomes 2, `ans = max(2, 2) = 2`.
- Final `ans = 2`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n) — Two sequential linear passes through the array of length n.
- **Space Complexity:** O(1) auxiliary space — Only primitive integer counters (`ans`, `i`, `t`) are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3105longest-strictly-increasing-or-strictly-decreasing-subarray.java](./3105longest-strictly-increasing-or-strictly-decreasing-subarray.java) |

---

## Key Learnings

- Contiguous monotonicity streaks can be maintained with a simple accumulator variable reset on comparison failure.
- Strict monotonicity requires strict inequality (`<` and `>`), correctly treating equal elements as streak breakers.
- Splitting increasing and decreasing checks into two independent passes avoids complex branching inside a single loop.
