---
comments: true
difficulty: Easy
tags:
  - Array
  - Prefix Sum
---

# 1732. Find the Highest Altitude

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-highest-altitude/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1732` (`1732`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

A biker goes on a road trip across `n + 1` sequential points numbered `0` through `n`, starting at point `0` with an initial altitude of `0`.

You are given an integer array `gain` of length `n`, where `gain[i]` represents the net change in altitude when traveling from point `i` to point `i + 1` (`0 <= i < n`). Return the **highest altitude** reached at any point along the trip (including the starting point).

---

## Examples

### Example 1

```text
Input: gain = [-5,1,5,0,-7]
Output: 1
Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.
```

### Example 2

```text
Input: gain = [-4,-3,-2,-1,4,3,2]
Output: 0
Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.
```

---

## Constraints

- `n == gain.length`

- `1 <= n <= 100`

- `-100 <= gain[i] <= 100`

---

## Problem Understanding

- **Initial Point Matters:** The trip has `n + 1` points, and point `0` has altitude `0`. Even if every net gain is negative, the maximum altitude cannot be less than `0`.
- **Prefix Sum Structure:** The altitude at point `k` (`1 <= k <= n`) equals the prefix sum `gain[0] + gain[1] + ... + gain[k - 1]`.
- **Small Bounds:** With `1 <= n <= 100` and `-100 <= gain[i] <= 100`, altitudes stay strictly within `[-10000, 10000]`, well inside standard number limits.

---

## Approach

### Brute Force Approach

A naive approach constructs an explicit array `altitudes` of length `n + 1` with `altitudes[0] = 0`, computes the sum `gain[0] + ... + gain[i - 1]` from scratch for every point `i` using nested loops in `O(n^2)` time (or `O(n)` space with a prefix array), and finally scans `altitudes` to find the maximum element.

### Optimized Approach

Maintain the running altitude `h` and maximum altitude `ans` (both initialized to `0`) in a single pass over `gain`, updating both in `O(1)` extra space.

### Step-by-Step Thinking Process

1. Recognize that the altitude at each point `i + 1` is simply the previous point's altitude plus `gain[i]`.
2. Initialize both the current altitude `h` and the best altitude `ans` to `0` to account for starting point `0`.
3. Iterate through each value `v` in `gain`, adding `v` to `h` and updating `ans = Math.max(ans, h)`.
4. Return `ans` once all `n` segments have been processed.

### Algorithm / Intuition

We do not need to store all `n + 1` altitudes at once because each step only depends on the immediately preceding altitude. In `largestAltitude`, `h` tracks the running prefix sum (`h += v`), while `ans` starts at `0` (representing point `0`) and records the peak value seen so far via `Math.max(ans, h)`.

---

## Dry Run

Using **Example 1**: `gain = [-5, 1, 5, 0, -7]`

Initially: `h = 0`, `ans = 0`.

| Step | `v` (`gain[i]`) | `h` (`h + v`) | `ans` (`Math.max(ans, h)`) |
| :--- | :--- | :--- | :--- |
| Start | — | `0` | `0` |
| 1 | `-5` | `-5` | `0` |
| 2 | `1` | `-4` | `0` |
| 3 | `5` | `1` | `1` |
| 4 | `0` | `1` | `1` |
| 5 | `-7` | `-6` | `1` |

Final return value: `1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate over the `n` elements of `gain` exactly once, doing `O(1)` arithmetic per element.
- **Space Complexity:** `O(1)` — Only two scalar variables (`ans` and `h`) are used regardless of input size.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1732find-the-highest-altitude.js](./1732find-the-highest-altitude.js) |

---

## Key Learnings

- When only the running maximum of prefix sums is needed, fold the prefix sum array into a single scalar accumulator for `O(1)` space.
- Initializing the maximum `ans` to `0` automatically handles the base case where all subsequent altitudes are negative.
