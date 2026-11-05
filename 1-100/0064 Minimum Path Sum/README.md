---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 64. Minimum Path Sum

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-path-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0064` (`64`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` `grid` of non-negative integers, find a path from the top-left cell `(0, 0)` to the bottom-right cell `(m - 1, n - 1)` that **minimizes the sum** of all cell values visited along the path (including both endpoints), and return that minimum sum.

At each step, you may move only **down** or **right**.

---

## Examples

### Example 1

```text
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
```

### Example 2

```text
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `1 <= m, n <= 200`

- `0 <= grid[i][j] <= 200`

---

## Problem Understanding

- **Optimal Substructure on a DAG:** Because moves only go right or down, reaching cell `(i, j)` requires arriving from either `(i - 1, j)` or `(i, j - 1)`. To minimize total cost to `(i, j)`, we must take the cheaper of those two optimal prefix paths plus `grid[i][j]`.
- **Single-Way Borders:** Every cell in column `0` (`(i, 0)`) can only be entered from `(i - 1, 0)` directly above, and every cell in row `0` (`(0, j)`) can only be entered from `(0, j - 1)` directly to its left.
- **Integer Bounds:** With `m, n <= 200` and `0 <= grid[i][j] <= 200`, the longest path visits `m + n - 1 <= 399` cells, so the maximum possible path sum is `399 * 200 = 79,800`—well within standard 32-bit `int`.

---

## Approach

### Brute Force Approach

Enumerating all `C(m + n - 2, m - 1)` down/right paths recursively without memoization to find the smallest total sum takes `O(2^(m + n))` time. Alternatively, running Dijkstra's shortest-path algorithm works because cell weights are non-negative, but priority-queue operations add an unnecessary `O(log(m * n))` factor over direct topological DP on a grid.

### Optimized Approach

Use **Bottom-Up 2D Dynamic Programming**: initialize `f[0][0] = grid[0][0]`, prefill cumulative sums along column `0` and row `0`, then fill each interior cell as `f[i][j] = Math.min(f[i - 1][j], f[i][j - 1]) + grid[i][j]`, returning `f[m - 1][n - 1]`.

### Step-by-Step Thinking Process

1. Define `f[i][j]` as the minimum path sum from `(0, 0)` to `(i, j)`.
2. Set starting cell `f[0][0] = grid[0][0]`.
3. Initialize the left border (`j = 0`): for `i = 1..m-1`, the only incoming path is from above, so `f[i][0] = f[i - 1][0] + grid[i][0]`.
4. Initialize the top border (`i = 0`): for `j = 1..n-1`, the only incoming path is from the left, so `f[0][j] = f[0][j - 1] + grid[0][j]`.
5. Fill interior cells (`i = 1..m-1`, `j = 1..n-1`) using `f[i][j] = Math.min(f[i - 1][j], f[i][j - 1]) + grid[i][j]`, and return `f[m - 1][n - 1]`.

### Algorithm / Intuition

In `minPathSum(int[][] grid)`, separating the boundary prefix sums (`f[i][0]` and `f[0][j]`) into two dedicated 1D loops eliminates all boundary `if` branches from the hot inner `m x n` loop.

Inside the nested loop (`i >= 1, j >= 1`), both `f[i - 1][j]` (top neighbor) and `f[i][j - 1]` (left neighbor) are guaranteed valid and already computed, so `Math.min(f[i - 1][j], f[i][j - 1]) + grid[i][j]` cleanly computes the optimal path cost to `(i, j)`.

---

## Dry Run

**Input:**
```text
grid = [[1, 3, 1],
        [1, 5, 1],
        [4, 2, 1]]   (m = 3, n = 3)
```

1. **Origin & Borders:**
   - `f[0][0] = 1`
   - Column `0`: `f[1][0] = 1 + 1 = 2`, `f[2][0] = 2 + 4 = 6`
   - Row `0`: `f[0][1] = 1 + 3 = 4`, `f[0][2] = 4 + 1 = 5`
2. **Interior Cells (`1 <= i, j < 3`):**
   - `f[1][1] = min(f[0][1], f[1][0]) + grid[1][1] = min(4, 2) + 5 = 7`
   - `f[1][2] = min(f[0][2], f[1][1]) + grid[1][2] = min(5, 7) + 1 = 6`
   - `f[2][1] = min(f[1][1], f[2][0]) + grid[2][1] = min(7, 6) + 2 = 8`
   - `f[2][2] = min(f[1][2], f[2][1]) + grid[2][2] = min(6, 8) + 1 = 7`

**Completed DP Table `f`:**
```text
[[1, 4, 5],
 [2, 7, 6],
 [6, 8, 7]]
```
**Output:** `f[2][2] = 7` *(corresponding to `1 -> 3 -> 1 -> 1 -> 1`)*.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Every cell in the `m x n` grid is computed exactly once in `O(1)` time.
- **Space Complexity:** `O(m * n)` — Allocates the `m x n` integer table `f`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [64minimum-path-sum.java](./64minimum-path-sum.java) |

---

## Key Learnings

- Shortest-path problems on DAGs (like right/down grids) run in linear `O(V + E)` time via topological DP—even if weights were negative, unlike Dijkstra's algorithm!
- Pre-initializing row `0` and column `0` keeps the main 2D transition `Math.min(f[i - 1][j], f[i][j - 1]) + grid[i][j]` branch-free and easy to verify.
- If memory is tight, space can be reduced to `O(n)` using a 1D rolling row array (or `O(1)` if modifying `grid` in-place is permitted).
