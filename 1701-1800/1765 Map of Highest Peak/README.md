---
comments: true
difficulty: Medium
tags:
  - Array
  - Breadth-First Search
  - Matrix
---

# 1765. Map of Highest Peak

**[View Problem on LeetCode](https://leetcode.com/problems/map-of-highest-peak/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1765` (`1765`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` binary matrix `isWater` representing a grid of land (`0`) and water (`1`) cells. At least one water cell exists in the grid.

Assign a non-negative integer height to every cell subject to two rules:
1. Every **water** cell must have height `0`.
2. Any two **orthogonally adjacent** cells (sharing a north, south, east, or west edge) may differ in height by **at most `1`**.

Among all valid height assignments, choose one that **maximizes** the highest peak in the matrix, and return the resulting `m x n` height matrix.

---

## Examples

### Example 1

```text
Input: isWater = [[0,1],[0,0]]
Output: [[1,0],[2,1]]
Explanation: The image shows the assigned heights of each cell.
The blue cell is the water cell, and the green cells are the land cells.
```

### Example 2

```text
Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
Output: [[1,1,0],[0,1,1],[1,2,2]]
Explanation: A height of 2 is the maximum possible height of any assignment.
Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.
```

---

## Constraints

- `m == isWater.length`

- `n == isWater[i].length`

- `1 <= m, n <= 1000`

- `isWater[i][j]` is `0` or `1`.

- There is at least **one** water cell.

**Note:** This question is the same as 542: https://leetcode.com/problems/01-matrix/

---

## Problem Understanding

- **Shortest-Path Upper Bound:** Because every water cell is fixed at height `0` and each step to a neighbor can increase height by at most `1`, a cell's height can never exceed its shortest Manhattan distance to the nearest water cell.
- **Simultaneous Tightness:** Setting every cell's height to its exact shortest distance to the nearest water cell satisfies `|dist(u) - dist(v)| <= 1` for every pair of adjacent cells `(u, v)` by the triangle inequality, thereby maximizing every single cell's height at once!
- **Grid Size:** With `m, n <= 1000` (`m * n <= 10^6`), we need a linear `O(m * n)` Multi-Source Breadth-First Search.

---

## Approach

### Brute Force Approach

Running a separate BFS from every land cell to find its nearest water cell would take `O((m * n)^2)` time in the worst case (e.g., `10^6` land cells and `1` water cell -> `10^{12}` operations), resulting in Time Limit Exceeded.

### Optimized Approach

Perform a **Multi-Source BFS** starting simultaneously from all water cells (initialized to `0` in `ans`), expanding layer by layer to unvisited land cells (marked `-1` in `ans`) and assigning `ans[x][y] = ans[i][j] + 1`.

### Step-by-Step Thinking Process

1. Create the output matrix `ans` of size `m x n` and an `ArrayDeque<int[]> q`.
2. Initialize `ans[i][j] = isWater[i][j] - 1`: water cells (`1`) become `0` and are pushed into `q` as level-0 sources; land cells (`0`) become `-1`, doubling as an 'unvisited' sentinel without needing a separate `visited` boolean matrix.
3. Use the compact 5-element direction array `dirs = {-1, 0, 1, 0, -1}` where `(dirs[k], dirs[k + 1])` enumerates up, right, down, and left.
4. Pop `(i, j)` from `q`; for each in-bounds neighbor `(x, y)` with `ans[x][y] == -1`, set `ans[x][y] = ans[i][j] + 1` and enqueue `(x, y)`.

### Algorithm / Intuition

Because BFS explores cells in non-decreasing order of distance from the initial queue sources, the very first time a land cell `(x, y)` (currently `-1`) is reached from `(i, j)`, `ans[i][j] + 1` is guaranteed to be its shortest Manhattan distance to any water cell. Immediately setting `ans[x][y]` to a non-negative integer prevents `(x, y)` from ever being enqueued again. Using `isWater[i][j] - 1` neatly converts `{1 -> 0, 0 -> -1}` in a single arithmetic expression.

---

## Dry Run

Using **Example 1**: `isWater = [[0, 1], [0, 0]]`

1. **Initialization (`ans[i][j] = isWater[i][j] - 1`):**
   - `ans = [[-1, 0], [-1, -1]]`
   - `q = [(0, 1)]` (water cell at height `0`)
2. **Pop `(0, 1)` (`ans[0][1] = 0`):**
   - Neighbor `(0, 0)` has `ans == -1` -> set `ans[0][0] = 1`, enqueue `(0, 0)`.
   - Neighbor `(1, 1)` has `ans == -1` -> set `ans[1][1] = 1`, enqueue `(1, 1)`.
3. **Pop `(0, 0)` (`ans[0][0] = 1`):**
   - Neighbor `(1, 0)` has `ans == -1` -> set `ans[1][0] = 2`, enqueue `(1, 0)`.
4. **Pop `(1, 1)` and `(1, 0)`:** No remaining neighbors have `-1`.

Final `ans`: `[[1, 0], [2, 1]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Every cell is initialized once, enqueued once, and dequeued once, checking at most `4` neighbors per cell.
- **Space Complexity:** `O(m * n)` — The BFS queue `q` (and output matrix `ans`) holds up to `m * n` cell coordinates in the worst case.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1765map-of-highest-peak.java](./1765map-of-highest-peak.java) |

---

## Key Learnings

- Multi-Source BFS computes shortest distances from a set of source nodes to all other nodes on an unweighted grid in `O(V + E)` = `O(m * n)` time.
- Reusing `ans[x][y] == -1` as the unvisited marker saves allocating a separate `boolean[m][n]` visited array.
- By the triangle inequality, shortest-path distances automatically satisfy Lipschitz continuity (`|h(u) - h(v)| <= 1`) while achieving the theoretical upper bound at every cell simultaneously.
