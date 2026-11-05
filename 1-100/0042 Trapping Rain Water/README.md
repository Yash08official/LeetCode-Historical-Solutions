---
comments: true
difficulty: Hard
tags:
  - Array
  - Two Pointers
  - Dynamic Programming
  - Stack
  - Monotonic Stack
---

# 42. Trapping Rain Water

**[View Problem on LeetCode](https://leetcode.com/problems/trapping-rain-water/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0042` (`42`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Two Pointers`, `Dynamic Programming`, `Stack`, `Monotonic Stack` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an array `height` of `n` non-negative integers representing an elevation map, where each bar has a horizontal width of `1` and vertical height `height[i]`.

Compute and return the total volume (in square units) of rainwater that stays trapped between the bars after it rains.

---

## Examples

### Example 1

```text
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

### Example 2

```text
Input: height = [4,2,0,3,2,5]
Output: 9
```

---

## Constraints

- `n == height.length`

- `1 <= n <= 2 * 10^4`

- `0 <= height[i] <= 10^5`

---

## Problem Understanding

- **Column-Wise Water Level:** Water above any single index `i` is held up by the tallest bar to its left (inclusive) and the tallest bar to its right (inclusive). Specifically, water at index `i` rises to `min(maxLeft[i], maxRight[i])`.
- **Trapped Amount at Index `i`:** Since the solid bar at index `i` occupies `height[i]` units of height, the water standing above index `i` equals `min(left[i], right[i]) - height[i]`. Including `height[i]` itself in `left[i]` and `right[i]` guarantees `min(left[i], right[i]) >= height[i]`, so this difference is never negative.
- **Boundary Bars:** Neither index `0` nor index `n - 1` can trap water above itself (`min(left[0], right[0]) - height[0] = height[0] - height[0] = 0`).

---

## Approach

### Brute Force Approach

For every bar `i` from `0` to `n - 1`, we could scan all indices `0..i` to find the maximum height on the left and scan all indices `i..n-1` to find the maximum height on the right, then add `min(leftMax, rightMax) - height[i]`. Repeating these linear scans for each of the `n` indices results in `O(n^2)` time complexity, which becomes slow for `n = 2 * 10^4`.

### Optimized Approach

Use **Dynamic Programming (prefix and suffix maximum arrays)**: precompute `left[i]` (the tallest bar in `height[0..i]`) and `right[i]` (the tallest bar in `height[i..n-1]`) in a single sweep, then sum `Math.min(left[i], right[i]) - height[i]` across all `n` indices in a second linear pass.

### Step-by-Step Thinking Process

1. Decompose the global 2D water-trapping geometry into `n` independent 1-unit-wide vertical columns: how much water sits directly above bar `i`?
2. Realize that water above `i` spills over whichever side has the lower peak wall, so the water surface at `i` is `Math.min(max(height[0..i]), max(height[i..n-1]))`.
3. Notice that scanning left and right from scratch for every `i` repeats overlapping prefix/suffix queries: `left[i]` is simply `Math.max(left[i - 1], height[i])`, and `right[j]` is `Math.max(right[j + 1], height[j])`.
4. Populate both `left` and `right` arrays in one loop from `i = 1` to `n - 1` (indexing `i` forward for `left` and `n - i - 1` backward for `right`).
5. Accumulate `Math.min(left[i], right[i]) - height[i]` into `ans` for every index `i` and return `ans`.

### Algorithm / Intuition

In `trap(height)`, the code allocates two arrays `left` and `right` of length `n = height.length`. It seeds the base cases `left[0] = height[0]` and `right[n - 1] = height[n - 1]`.

A single loop `for (let i = 1; i < n; ++i)` fills both arrays simultaneously:
- Forward prefix max: `left[i] = Math.max(left[i - 1], height[i])`.
- Backward suffix max: `right[n - i - 1] = Math.max(right[n - i], height[n - i - 1])`.

Once every index knows the highest wall on both sides (including itself), a second loop `for (let i = 0; i < n; ++i)` adds `Math.min(left[i], right[i]) - height[i]` to `ans` and returns the total.

---

## Dry Run

**Input:** `height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]` (`n = 12`)

1. **Precomputed Arrays:**
   - `left  = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]`
   - `right = [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]`

2. **Accumulation Pass (`Math.min(left[i], right[i]) - height[i]`):**

| `i` | `height[i]` | `left[i]` | `right[i]` | `min(L, R) - height[i]` | Running `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `0` | `0` | `3` | `0 - 0 = 0` | `0` |
| `1` | `1` | `1` | `3` | `1 - 1 = 0` | `0` |
| `2` | `0` | `1` | `3` | `1 - 0 = 1` | `1` |
| `3` | `2` | `2` | `3` | `2 - 2 = 0` | `1` |
| `4` | `1` | `2` | `3` | `2 - 1 = 1` | `2` |
| `5` | `0` | `2` | `3` | `2 - 0 = 2` | `4` |
| `6` | `1` | `2` | `3` | `2 - 1 = 1` | `5` |
| `7` | `3` | `3` | `3` | `3 - 3 = 0` | `5` |
| `8` | `2` | `3` | `2` | `2 - 2 = 0` | `5` |
| `9` | `1` | `3` | `2` | `2 - 1 = 1` | `6` |
| `10` | `2` | `3` | `2` | `2 - 2 = 0` | `6` |
| `11` | `1` | `3` | `1` | `1 - 1 = 0` | `6` |

**Output:** `6`

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We perform one pass of `n - 1` iterations to fill `left` and `right`, followed by one pass of `n` iterations to sum trapped water.
- **Space Complexity:** `O(n)` — Two auxiliary arrays `left` and `right`, each of length `n`, are allocated to store prefix and suffix maximum heights.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [42trapping-rain-water.js](./42trapping-rain-water.js) |

---

## Key Learnings

- Including `height[i]` inside both `left[i]` and `right[i]` eliminates negative clamp checks (`Math.max(0, ...)`), because `Math.min(left[i], right[i])` is guaranteed to be at least `height[i]`.
- Repeated left/right range-maximum queries around every index are a classic signal for prefix/suffix precomputation (`O(n^2) -> O(n)`).
- If memory is constrained further, this exact `min(leftMax, rightMax)` relation can be compressed to `O(1)` space using two inward-moving pointers because whichever side currently has the smaller running maximum immediately determines that pointer's water level.
