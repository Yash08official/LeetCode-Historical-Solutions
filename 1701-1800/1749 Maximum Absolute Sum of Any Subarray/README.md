---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 1749. Maximum Absolute Sum of Any Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1749` (`1749`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, the **absolute sum** of a contiguous subarray `nums[l..r]` is defined as `abs(nums[l] + nums[l + 1] + ... + nums[r])`.

Return the **maximum absolute sum** achievable by any contiguous subarray of `nums` (note that the subarray is allowed to be empty, in which case its sum is `0`).

---

## Examples

### Example 1

```text
Input: nums = [1,-3,2,3,-4]
Output: 5
Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.
```

### Example 2

```text
Input: nums = [2,-5,1,-4,3,-2]
Output: 8
Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-10^4 <= nums[i] <= 10^4`

---

## Problem Understanding

- **Absolute Value Dual Objective:** Maximizing `|S|` over all subarray sums `S` is equivalent to finding `max(max_subarray_sum, -min_subarray_sum)`.
- **Empty Subarray Allowed:** Since an empty subarray has sum `0`, the answer is guaranteed to be at least `0`.
- **Scale:** `nums.length` can be up to `10^5`, so an `O(n^2)` enumeration of all subarrays will time out; we need an `O(n)` algorithm.

---

## Approach

### Brute Force Approach

A brute-force solution checks every subarray `(l, r)` with `0 <= l <= r < n`, accumulates its sum, and updates the maximum of `Math.abs(sum)`. Even with running sums, iterating over all `n(n + 1) / 2` pairs takes `O(n^2)` time, which exceeds time limits for `n = 10^5`.

### Optimized Approach

Run Kadane's algorithm simultaneously for both the maximum subarray sum (`f`) and the minimum subarray sum (`g`) in a single linear pass, tracking the largest value among `f` and `Math.abs(g)`.

### Step-by-Step Thinking Process

1. Notice that `|S|` is maximized either when `S` is as large and positive as possible, or when `S` is as large in magnitude and negative as possible.
2. Let `f` denote the maximum subarray sum ending at the current element `x`, updated via `f = Math.max(f, 0) + x`.
3. Symmetrically, let `g` denote the minimum subarray sum ending at the current element `x`, updated via `g = Math.min(g, 0) + x`.
4. At each step, the largest absolute sum ending at `x` is `Math.max(f, Math.abs(g))` (since if `f < 0`, `g <= f < 0` so `|g| >= |f|`). Update `ans` accordingly.

### Algorithm / Intuition

Standard Kadane's algorithm drops a negative running sum when maximizing (`Math.max(f, 0) + x`) because a negative prefix only reduces future sums. By exact symmetry, to find the most negative subarray sum, we drop a positive running sum (`Math.min(g, 0) + x`) because a positive prefix only makes future sums less negative. Initializing `ans = 0` covers the empty subarray case, and updating `ans = Math.max(ans, Math.max(f, Math.abs(g)))` at each element `x` captures both positive and negative extremes in one pass.

---

## Dry Run

Using **Example 1**: `nums = [1, -3, 2, 3, -4]`

Initially: `f = 0`, `g = 0`, `ans = 0`.

| `x` | `f = Math.max(f, 0) + x` | `g = Math.min(g, 0) + x` | `Math.max(f, Math.abs(g))` | `ans` |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `0 + 1 = 1` | `0 + 1 = 1` | `max(1, 1) = 1` | `1` |
| `-3` | `1 + (-3) = -2` | `0 + (-3) = -3` | `max(-2, 3) = 3` | `3` |
| `2` | `0 + 2 = 2` | `-3 + 2 = -1` | `max(2, 1) = 2` | `3` |
| `3` | `2 + 3 = 5` | `-1 + 3 = 2` | `max(5, 2) = 5` | `5` |
| `-4` | `5 + (-4) = 1` | `0 + (-4) = -4` | `max(1, 4) = 4` | `5` |

Final return value: `5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We scan the array `nums` once with constant-time arithmetic per element.
- **Space Complexity:** `O(1)` — Only three `int` variables (`f`, `g`, and `ans`) are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1749maximum-absolute-sum-of-any-subarray.java](./1749maximum-absolute-sum-of-any-subarray.java) |

---

## Key Learnings

- Maximizing an absolute quantity `|S|` cleanly decomposes into maximizing `S` and minimizing `S` independently.
- Alternatively, viewing subarray sums as `prefix[r] - prefix[l]`, the maximum absolute subarray sum also equals `max(prefix) - min(prefix)` including `prefix[0] = 0`.
