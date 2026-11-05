---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Greedy
  - Sorting
---

# 435. Non-overlapping Intervals

**[View Problem on LeetCode](https://leetcode.com/problems/non-overlapping-intervals/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0435` (`435`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Greedy`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of intervals you must remove** so that all remaining intervals are mutually non-overlapping.

Intervals that merely touch at an endpoint (such as `[1, 2]` and `[2, 3]`) do **not** overlap.

---

## Examples

### Example 1

```text
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
```

### Example 2

```text
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
```

### Example 3

```text
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
```

---

## Constraints

- `1 <= intervals.length <= 10^5`

- `intervals[i].length == 2`

- `-5 * 10^4 <= start_i < end_i <= 5 * 10^4`

---

## Problem Understanding

Removing the minimum number of intervals from `n` total intervals is mathematically equivalent to **keeping the maximum number of mutually non-overlapping intervals** (`minRemoved = n - maxKept`), which is the classic **Interval Scheduling Maximization** problem!

Key greedy insight:
- Among any overlapping choices, keeping the interval that **finishes earliest** (`end_i` smallest) leaves the widest possible timeline `[end_i, +infinity)` free for subsequent intervals.
- Touching endpoints (`intervals[i][0] === t`) are valid non-overlaps, so the compatibility check is `>= t`.

---

## Approach

### Brute Force Approach

Sorting intervals and running Longest-Non-Overlapping-Chain Dynamic Programming (`dp[i] = 1 + max(dp[j])` for earlier compatible `j`) takes `O(n^2)` time (or `O(n log n)` with binary search + `O(n)` extra DP table), whereas pure greedy selection needs no DP array at all.

### Optimized Approach

Sort `intervals` in ascending order of their **end times** (`a[1] - b[1]`). Track the end time `t` of the last kept interval (initialized to `intervals[0][1]`) and scan the rest: if `intervals[i][0] >= t`, keep the interval and advance `t = intervals[i][1]`; otherwise, discard it (`++ans`).

### Step-by-Step Thinking Process

1. Sort `intervals` by ascending end coordinate: `intervals.sort((a, b) => a[1] - b[1])`.
2. Greedily keep the first interval (which has the earliest end time overall) by setting `t = intervals[0][1]` and removal counter `ans = 0`.
3. Iterate `i` from `1` to `intervals.length - 1`.
4. If `intervals[i][0] >= t`, `intervals[i]` does not overlap the last kept interval, so keep it and update `t = intervals[i][1]`.
5. Otherwise (`intervals[i][0] < t`), `intervals[i]` overlaps `t` (and since `intervals[i][1] >= t`, discarding `intervals[i]` is always at least as good as discarding the kept one!), so increment `++ans`.
6. Return `ans`.

### Algorithm / Intuition

Why is sorting by **end time** (`a[1] - b[1]`) better than sorting by start time? Consider `[1, 10]`, `[2, 3]`, `[3, 4]`: `[1, 10]` starts earliest, yet keeping `[1, 10]` blocks both `[2, 3]` and `[3, 4]`! Sorting by end time orders them `[2, 3], [3, 4], [1, 10]`, immediately keeping `[2, 3]` and `[3, 4]` while discarding the long spanning interval `[1, 10]`.

---

## Dry Run

Tracing `eraseOverlapIntervals([[1,2], [2,3], [3,4], [1,3]])` (**Example 1**):

1. **Sort by end time `a[1] - b[1]`:** `[[1,2], [2,3], [1,3], [3,4]]` (note `[2,3]` and `[1,3]` share end `3`; either tie-break order yields the same answer).
2. **Initialize:** `t = 2` (from `[1,2]`), `ans = 0`.

| `i` | `intervals[i]` | Check `start >= t` | Action | `t` | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `[2, 3]` | `2 >= 2` (True) | Keep, update `t = 3` | `3` | `0` |
| `2` | `[1, 3]` | `1 >= 3` (False) | Overlap! Remove (`++ans`) | `3` | `1` |
| `3` | `[3, 4]` | `3 >= 3` (True) | Keep, update `t = 4` | `4` | `1` |

Returns `ans = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting `n` intervals dominates the subsequent `O(n)` single-pass scan.
- **Space Complexity:** `O(log n)` to `O(n)` depending on the JS engine's Timsort implementation (`O(1)` extra variables `t`, `ans`, `i` in user code).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [435non-overlapping-intervals.js](./435non-overlapping-intervals.js) |

---

## Key Learnings

- Minimizing interval removals is dual to maximizing compatible intervals: sort by earliest finish time (`a[1] - b[1]`), never earliest start time alone.
- Pay close attention to boundary wording: "touching at a point is non-overlapping" translates to `intervals[i][0] >= t` rather than `> t`.
- Notice that even when two intervals tie on end time (like `[2, 3]` and `[1, 3]` after `t = 2`), if `[1, 3]` came first (`1 < 2`), it would be rejected (`++ans`) leaving `t = 2`, allowing `[2, 3]` (`2 >= 2`) to be kept—so no secondary tie-breaker is needed!
