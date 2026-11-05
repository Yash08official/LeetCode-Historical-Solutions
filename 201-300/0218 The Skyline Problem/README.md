---
comments: true
difficulty: Hard
tags:
  - Array
  - Divide and Conquer
  - Binary Indexed Tree
  - Segment Tree
  - Sweep Line
  - Sorting
  - Heap (Priority Queue)
  - Ordered Set
---

# 218. The Skyline Problem

**[View Problem on LeetCode](https://leetcode.com/problems/the-skyline-problem/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0218` (`218`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Divide and Conquer`, `Binary Indexed Tree`, `Segment Tree`, `Sweep Line`, `Sorting`, `Heap (Priority Queue)`, `Ordered Set` |
| **Solution Language** | C++ |

---

## Problem Description

You are given an array `buildings` where `buildings[i] = [left_i, right_i, height_i]` describes the rectangular silhouette of the `i`-th building resting on flat ground (`y = 0`), sorted in non-decreasing order of `left_i`.

Return the **skyline** formed collectively by all buildings as a list of key points `[[x_1, y_1], [x_2, y_2], ...]` sorted by `x`-coordinate. Each key point marks the left endpoint of a horizontal skyline segment, with the final point having height `0` where the rightmost building ends. Consecutive horizontal segments of identical height must be merged into a single key point.

---

## Examples

### Example 1

```text
Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
Explanation:
Figure A shows the buildings of the input.
Figure B shows the skyline formed by those buildings. The red points in figure B represent the key points in the output list.
```

### Example 2

```text
Input: buildings = [[0,2,3],[2,5,3]]
Output: [[0,3],[5,0]]
```

---

## Constraints

- `1 <= buildings.length <= 10^4`

- `0 <= left_i < right_i <= 2^31 - 1`

- `1 <= height_i <= 2^31 - 1`

- `buildings` is sorted by `left_i` in non-decreasing order.

---

## Problem Understanding

Observe where the skyline's height can possibly change: **only at the left edge `left_i` or right edge `right_i` of some building**! At any critical x-coordinate `line`, a building `i` covers the interval immediately to the right of `line` (`[line, line + epsilon)`) if and only if `left_i <= line < right_i` (note the strict `< right_i`, because a building ending at `line` no longer contributes height past `line`). The skyline height at `line` is simply the maximum `height_i` among all active buildings covering `line`, or `0` if none are active.

---

## Approach

### Brute Force Approach

Collect all `2n` critical x-coordinates (`left_i` and `right_i`), sort them, and for each coordinate `line`, scan all `n` buildings to find the maximum `height_i` satisfying `left_i <= line < right_i`. Scanning `n` buildings across `2n` coordinates takes `O(n^2)` time, which can reach `2 * 10^8` operations for `n = 10^4`.

### Optimized Approach

Use a vertical **Sweep Line** across all sorted critical x-coordinates (`lines`) paired with a **Max-Heap** (`priority_queue<pair<int, int>> pq`) storing `{height, right_x}` of active buildings, lazily popping expired buildings whose `right_x <= line`.

### Step-by-Step Thinking Process

1. Extract every `v[0]` (`left_i`) and `v[1]` (`right_i`) into `lines` and sort `lines` in non-decreasing order to obtain all candidate x-coordinates where the contour could change.
2. Maintain a pointer `city = 0` into `buildings` (which is already sorted by `left_i`) and a max-heap `pq` of `{height, right_x}` ordered by `height` descending.
3. Sweep each coordinate `line` in `lines`: push buildings starting at or before `line` (`buildings[city][0] <= line && buildings[city][1] > line`) into `pq` and advance `city`.
4. Lazily pop from `pq` while the tallest building on top has already ended at or before `line` (`pq.top().second <= line`).
5. Read current skyline height `high = pq.empty() ? 0 : pq.top().first`. If `skys` already ends with height `high`, skip it (`continue`) to avoid consecutive equal-height segments (and gracefully ignore duplicate x-coordinates in `lines`); otherwise append `{line, high}`.

### Algorithm / Intuition

Let's look closely at two subtle invariants in `getSkyline`:
1. **Why `buildings[city][0] <= line && buildings[city][1] > line` never gets stuck:** Because `lines` contains `v[0]` for every building in sorted order and `v[0] < v[1]` is guaranteed by problem constraints, `line` is guaranteed to visit `buildings[city][0]` before any larger coordinate. At `line == buildings[city][0]`, `buildings[city][1] > line` is always true, so every building is pushed into `pq` and `city` increments past it right on schedule!
2. **Lazy heap eviction:** A shorter building buried inside `pq` might expire (`right_x <= line`) while a taller building is still active above it. We do not need to remove buried expired buildings immediately — we only `pop()` expired pairs once they bubble up to `pq.top()`!

---

## Dry Run

Tracing Example 1: `buildings = [[2,9,10], [3,7,15], [5,12,12], [15,20,10], [19,24,8]]`
Sorted `lines = [2, 3, 5, 7, 9, 12, 15, 19, 20, 24]`:

| `line` | Newly Pushed `(h, r)` | Popped `(r <= line)` | `pq.top()` -> `high` | Emitted to `skys`? |
| :--- | :--- | :--- | :--- | :--- |
| `2` | `(10, 9)` | — | `10` | **`[2, 10]`** |
| `3` | `(15, 7)` | — | `15` | **`[3, 15]`** |
| `5` | `(12, 12)` | — | `15` | Skipped (`15 == 15`) |
| `7` | — | `(15, 7)` | `12` | **`[7, 12]`** |
| `9` | — | *(buried `(10,9)` stays)* | `12` | Skipped (`12 == 12`) |
| `12` | — | `(12, 12)`, `(10, 9)` | `0` (empty) | **`[12, 0]`** |
| `15` | `(10, 20)` | — | `10` | **`[15, 10]`** |
| `19` | `(8, 24)` | — | `10` | Skipped (`10 == 10`) |
| `20` | — | `(10, 20)` | `8` | **`[20, 8]`** |
| `24` | — | `(8, 24)` | `0` (empty) | **`[24, 0]`** |

Output `skys`: `[[2,10], [3,15], [7,12], [12,0], [15,10], [20,8], [24,0]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting `2n` critical coordinates takes `O(n log n)`, and each of the `n` buildings is pushed into and popped from `pq` at most once (`O(log n)` per heap operation).
- **Space Complexity:** `O(n)` — `lines` stores `2n` integers and `pq` holds at most `n` `{height, right_x}` pairs simultaneously.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **C++** | [218the-skyline-problem.cpp](./218the-skyline-problem.cpp) |

---

## Key Learnings

- Discretizing continuous geometry into critical event coordinates (`left_i` and `right_i`) reduces an infinite x-axis up to `2^31 - 1` down to at most `2n` sweep-line stops.
- Lazy deletion in a `priority_queue` avoids needing an `O(log n)` arbitrary-element erase (like `std::multiset`): stale intervals only matter when they reach `pq.top()`.
- Checking `skys.back()[1] == high` cleanly handles both merging adjacent equal-height roofs and deduplicating repeated coordinates in `lines`.
