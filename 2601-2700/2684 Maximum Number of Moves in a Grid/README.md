---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 2684. Maximum Number of Moves in a Grid

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2684` (`2684`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a **0-indexed** `m x n` matrix `grid` consisting of positive integers.

You can start at **any cell** in the first column (`col = 0`). From a cell `(row, col)`, you can move to any of the three cells in the adjacent next column: `(row - 1, col + 1)`, `(row, col + 1)`, or `(row + 1, col + 1)`, provided that:
- The destination cell is within the grid boundaries (`0 <= destination_row < m`).
- The value in the destination cell is **strictly greater** than the value in the current cell: `grid[destination_row][col + 1] > grid[row][col]`.

Return the **maximum number of moves** you can perform.

---

## Examples

### Example 1

```text
Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
Output: 3
Explanation: We can start at the cell (0, 0) and make the following moves:
- (0, 0) -> (0, 1).
- (0, 1) -> (1, 2).
- (1, 2) -> (2, 3).
It can be shown that it is the maximum number of moves that can be made.
```

### Example 2

```text
Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
Output: 0
Explanation: Starting from any cell in the first column we cannot perform any moves.
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `2 <= m, n <= 1000`

- `4 <= m * n <= 10^5`

- `1 <= grid[i][j] <= 10^6`

---

## Problem Understanding

Key properties and constraints:
- Any move increases the column index by exactly 1 (`col -> col + 1`).
- From column `j`, we can only reach column `j + 1`.
- Hence, the number of moves made is simply the maximum column index reached.
- The maximum possible number of moves is `n - 1` (reaching the last column).
- We can track the set of reachable row indices at column `j`. If we can transition to at least one row in column `j + 1`, we advance the move count.

---

## Approach

### Brute Force Approach

A naive recursive DFS starting from every cell `(i, 0)` without memoization would explore overlapping subproblems repeatedly.

Because each cell has 3 possible branch destinations, unmemoized DFS exhibits exponential time complexity `O(m * 3^n)`, quickly causing a Time Limit Exceeded on matrices with `n` up to `1000`.

### Optimized Approach

The implemented solution uses column-by-column BFS (breadth-first layer traversal) tracking reachable row indices using a JavaScript `Set` `q`.

1. Initialize `q` with all row indices `0` to `m - 1` for column `0`.
2. For each column `j` from `0` to `n - 2`:
   - Initialize an empty set `t` for reachable rows in column `j + 1`.
   - For each reachable row `i` in `q`, test rows `k \in [i - 1, i + 1]` in column `j + 1`.
   - If `0 <= k < m` and `grid[i][j] < grid[k][j + 1]`, add `k` to `t`.
   - If `t.size === 0`, no moves into column `j + 1` are possible; return `j`.
   - Otherwise, update `q = t`.
3. If the loop completes through all columns, return `n - 1`.

### Step-by-Step Thinking Process

1. We want to find the furthest column index we can reach from column 0.
2. All moves strictly progress from column `j` to column `j + 1`.
3. Instead of exploring cell-by-cell paths, track the *set of reachable rows* in the current column.
4. Initially at column 0, all rows `0` through `m - 1` are valid starting points: `q = Set([0, 1, ..., m - 1])`.
5. For column `j`: create a new set `t`. For each `i` in `q`, check rows `k \in {i - 1, i, i + 1}` at `j + 1`. If `grid[k][j + 1] > grid[i][j]`, add `k` to `t`.
6. If `t` is empty, we cannot make any move to column `j + 1`, so the maximum moves made is `j`.
7. If we reach the final column `n - 1`, the answer is `n - 1`.

### Algorithm / Intuition

The algorithm represents a level-by-level BFS across columns:

1. `q` represents the frontier of reachable rows at column `j`.
2. For each `i \in q`, we check up to 3 candidate destination rows in column `j + 1`: `k \in {i - 1, i, i + 1}`.
3. Using a `Set` `t` automatically deduplicates row indices so no row in column `j + 1` is processed multiple times.
4. If `t.size === 0`, the frontier has collapsed; we can make no further moves and return `j`.
5. If the frontier survives until `j = n - 1`, we traversed all columns from `0` to `n - 1`, returning `n - 1` moves.

---

## Dry Run

Trace for `grid = [[2, 4, 3, 5], [5, 4, 9, 3], [3, 4, 2, 11], [10, 9, 13, 15]]` (`m = 4, n = 4`):

- Initial: `q = {0, 1, 2, 3}` at column `j = 0`.
- **j = 0 -> test column 1:**
  - From `(0, 0)=2`: can move to `(0, 1)=4` (4 > 2), `(1, 1)=4` (4 > 2). `t.add(0), t.add(1)`.
  - From `(2, 0)=3`: can move to `(1, 1)=4`, `(2, 1)=4`, `(3, 1)=9`. `t.add(2), t.add(3)`.
  - `t = {0, 1, 2, 3}`. `t.size > 0`. `q = t`.
- **j = 1 -> test column 2:**
  - From `(1, 1)=4`: can move to `(1, 2)=9` (9 > 4).
  - From `(2, 1)=4`: can move to `(1, 2)=9`.
  - From `(3, 1)=9`: can move to `(3, 2)=13` (13 > 9).
  - `t = {1, 3}`. `q = t`.
- **j = 2 -> test column 3:**
  - From `(1, 2)=9`: neighbor `(2, 3)=11 > 9`.
  - From `(3, 2)=13`: neighbor `(3, 3)=15 > 13`.
  - `t = {2, 3}`. `q = t`.
- Loop ends (`j = n - 2 = 2`).
- Reached column `n - 1 = 3`.
- **Return:** `n - 1 = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — In each of the `n - 1` columns, at most `m` rows are in `q`. For each row, exactly 3 neighbor rows in column `j + 1` are checked. Total operations are bounded by `3 * m * n`.
- **Space Complexity:** `O(m)` — The sets `q` and `t` hold at most `m` distinct row indices for the current and next column frontier.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2684maximum-number-of-moves-in-a-grid.js](./2684maximum-number-of-moves-in-a-grid.js) |

---

## Key Learnings

- When transitions are strictly monotonic in one dimension (here, columns `j -> j + 1`), a frontier BFS avoids allocating a full 2D DP table.
- Deduplicating reachable states with a `Set` at each column prevents redundant path branching.
- Early termination occurs naturally the moment the frontier set becomes empty.
