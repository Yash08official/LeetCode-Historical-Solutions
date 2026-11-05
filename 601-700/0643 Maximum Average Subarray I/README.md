---
comments: true
difficulty: Easy
tags:
  - Array
  - Sliding Window
---

# 643. Maximum Average Subarray I

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-average-subarray-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0643` (`643`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Sliding Window` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `nums` of length `n` and an integer `k` (`1 <= k <= n`). Find a **contiguous subarray of exact length `k`** that has the maximum arithmetic average, and return that maximum average value (answers within `10^-5` of the true value are accepted).

---

## Examples

### Example 1

```text
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
```

### Example 2

```text
Input: nums = [5], k = 1
Output: 5.00000
```

---

## Constraints

- `n == nums.length`

- `1 <= k <= n <= 10^5`

- `-10^4 <= nums[i] <= 10^4`

---

## Problem Understanding

- **Fixed Subarray Length:** Every candidate subarray has exact length `k` (`nums[i - k + 1 .. i]`).
- **Overlapping Sums:** Two consecutive windows of length `k` share `k - 1` elements: `nums[1 .. k]` differs from `nums[0 .. k - 1]` only by dropping `nums[0]` and adding `nums[k]`.
- **Negative Values:** Elements in `nums` can be negative (down to `-10^4`), so `maxAvg` must be initialized from the first valid window `sum / k`, **never** `0`!

---

## Approach

### Brute Force Approach

Computing the sum of each of the `n - k + 1` subarrays of length `k` from scratch with nested loops takes `O((n - k + 1) * k)` time, which degrades to `O(n^2)` when `k = n / 2` (~`2.5 * 10^9` operations for `n = 10^5`).

### Optimized Approach

Use a **Fixed-Size Sliding Window** of length `k`: compute the initial window's `sum`, initialize `maxAvg = sum / k`, and slide across `nums` updating `sum = sum - nums[i - k] + nums[i]` in `O(1)` per step.

### Step-by-Step Thinking Process

1. Accumulate `sum` over the first `k` elements (`i = 0` to `k - 1`).
2. Initialize `maxAvg = sum / k` using this first valid window.
3. Iterate `i` from `k` to `nums.length - 1`.
4. Update the rolling sum by subtracting the element leaving on the left (`nums[i - k]`) and adding the element entering on the right (`nums[i]`).
5. Update `maxAvg = Math.max(maxAvg, sum / k)` at each step and return `maxAvg`.

### Algorithm / Intuition

In `findMaxAverage`, `sum` always holds the exact sum of the current `k`-element window ending at index `i`. Advancing the window from `[i - k .. i - 1]` to `[i - k + 1 .. i]` requires just one subtraction (`- nums[i - k]`) and one addition (`+ nums[i]`). Initializing `maxAvg` from the first window (`sum / k`) ensures correctness even when all numbers in `nums` are negative.

---

## Dry Run

Tracing Example 1: `nums = [1, 12, -5, -6, 50, 3]`, `k = 4`:

- **Initial window `[0..3]` (`[1, 12, -5, -6]`):** `sum = 2`, `maxAvg = 2 / 4 = 0.5`.
- **`i = 4` (window `[12, -5, -6, 50]`):**
  - `sum = 2 - nums[0] + nums[4] = 2 - 1 + 50 = 51`.
  - `sum / 4 = 12.75` -> `maxAvg = Math.max(0.5, 12.75) = 12.75`.
- **`i = 5` (window `[-5, -6, 50, 3]`):**
  - `sum = 51 - nums[1] + nums[5] = 51 - 12 + 3 = 42`.
  - `sum / 4 = 10.5` -> `maxAvg = Math.max(12.75, 10.5) = 12.75`.
- **Return:** `12.75`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Visits each element of `nums` once (`k` iterations in the first loop plus `n - k` iterations in the second loop).
- **Space Complexity:** `O(1)` — Uses only scalar variables `sum`, `maxAvg`, and `i`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [643maximum-average-subarray-i.js](./643maximum-average-subarray-i.js) |

---

## Key Learnings

- Always initialize running maxima (`maxAvg` or `maxSum`) from the first valid window or `-Infinity`, never `0`, when array values can be negative.
- Since `k > 0` is constant, maximizing `sum / k` is equivalent to tracking `maxSum` with integer additions/comparisons and dividing `maxSum / k` once at the very end (a neat micro-optimization that avoids `n - k` floating-point divisions).
- Fixed-size sliding windows turn `O(n * k)` subarray scans into strict `O(n)` single-pass algorithms.
