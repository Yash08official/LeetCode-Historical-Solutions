---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 63. Unique Paths II

**[View Problem on LeetCode](https://leetcode.com/problems/unique-paths-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0063` (`63`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

A robot starts at the top-left corner `(0, 0)` of an `m x n` binary grid `obstacleGrid` and wants to reach the bottom-right corner `(m - 1, n - 1)`, moving only **down** or **right** at each step.

Empty squares are marked `0` and obstacles are marked `1`. No valid path may step onto or pass through an obstacle square. Return the number of unique obstacle-free paths from `(0, 0)` to `(m - 1, n - 1)`.

---

## Examples

### Example 1

```text
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```

### Example 2

```text
Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
```

---

## Constraints

- `m == obstacleGrid.length`

- `n == obstacleGrid[i].length`

- `1 <= m, n <= 100`

- `obstacleGrid[i][j]` is `0` or `1`.

---

## Problem Understanding

- **Start or End Blocked:** Unlike *62. Unique Paths*, either the starting cell `(0, 0)` or the destination cell `(m - 1, n - 1)` itself may contain an obstacle (`1`), in which case the answer is `0`.
- **Obstacles Break Combinatorial Formulas:** Because obstacles can sit anywhere in the grid, simple binomial formulas no longer apply directly, making Dynamic Programming the natural tool.
- **Order of Base Cases:** Checking `obstacleGrid[i][j] == 1` **before** checking `i == m - 1 && j == n - 1` is critical—otherwise an obstacle sitting right on the destination cell `(m - 1, n - 1)` would falsely return `1`!

---

## Approach

### Brute Force Approach

Unmemoized DFS from `(0, 0)` explores both `dfs(i + 1, j)` and `dfs(i, j + 1)` at every free cell. On a sparse obstacle grid (such as an all-`0` `100 x 100` grid), overlapping subproblems explode exponentially to `O(2^(m + n))` calls.

### Optimized Approach

Use **Top-Down Dynamic Programming (DFS with Memoization)**: define `dfs(i, j)` as the number of obstacle-free paths from `(i, j)` to `(m - 1, n - 1)`, immediately returning `0` if `(i, j)` is out of bounds or blocked, returning `1` at `(m - 1, n - 1)`, and caching `dfs(i + 1, j) + dfs(i, j + 1)` inside `Integer[][] f`.

### Step-by-Step Thinking Process

1. Store grid dimensions `m`, `n` and allocate `Integer[][] f = new Integer[m][n]` so `null` marks uncomputed cells and cached counts (including `0`s for dead-end pockets) are never recomputed.
2. In `dfs(i, j)`, check invalid states first: if `i >= m || j >= n || obstacleGrid[i][j] == 1`, zero paths can pass through `(i, j)`, so return `0`.
3. Next check destination: since `(i, j)` is now guaranteed within bounds and obstacle-free, if `i == m - 1 && j == n - 1`, return `1`.
4. If `f[i][j] == null`, recursively sum down paths (`dfs(i + 1, j)`) and right paths (`dfs(i, j + 1)`) and memoize the sum in `f[i][j]`.
5. Return `dfs(0, 0)`.

### Algorithm / Intuition

In `uniquePathsWithObstacles`:
- `Integer[][] f` leverages Java's nullable wrapper type to distinguish an unvisited cell (`null`) from a visited cell that leads only into obstacles (`0`). If we used `int[][]` with `0` meaning unvisited, dead-end regions trapped behind obstacles would be re-explored repeatedly in exponential time!
- Putting `obstacleGrid[i][j] == 1` in the very first `if` guard cleanly handles blocked start `(0, 0)`, blocked finish `(m - 1, n - 1)`, and interior walls with one unified check.

---

## Dry Run

**Input:**
```text
obstacleGrid = [[0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]]   (m = 3, n = 3)
```

Tracing `dfs(0, 0)`:
- **Blocked center `(1, 1)`:** Any call to `dfs(1, 1)` immediately hits `obstacleGrid[1][1] == 1` and returns `0`.
- **Bottom/Right edges leading to `(2, 2)`:**
  - `dfs(2, 2)` -> destination reached -> returns `1`.
  - `dfs(1, 2)` -> `dfs(2, 2) + dfs(1, 3)` = `1 + 0 = 1` (`f[1][2] = 1`).
  - `dfs(0, 2)` -> `dfs(1, 2) + dfs(0, 3)` = `1 + 0 = 1` (`f[0][2] = 1`).
  - `dfs(2, 1)` -> `dfs(3, 1) + dfs(2, 2)` = `0 + 1 = 1` (`f[2][1] = 1`).
  - `dfs(2, 0)` -> `dfs(3, 0) + dfs(2, 1)` = `0 + 1 = 1` (`f[2][0] = 1`).
- **Near-origin cells:**
  - `dfs(0, 1)` -> `dfs(1, 1) + dfs(0, 2)` = `0 + 1 = 1` (`f[0][1] = 1`).
  - `dfs(1, 0)` -> `dfs(2, 0) + dfs(1, 1)` = `1 + 0 = 1` (`f[1][0] = 1`).
  - `dfs(0, 0)` -> `dfs(1, 0) + dfs(0, 1)` = `1 + 1 = 2` (`f[0][0] = 2`).

**Output:** `2`

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Each cell `(i, j)` in the `m x n` grid is evaluated at most once and cached in `f[i][j]`, with `O(1)` work per state.
- **Space Complexity:** `O(m * n)` — The memoization matrix `Integer[][] f` occupies `O(m * n)` space, and the recursion stack uses at most `O(m + n)` frames.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [63unique-paths-ii.java](./63unique-paths-ii.java) |

---

## Key Learnings

- In top-down counting DP where `0` is a legitimate computed answer (e.g., dead-end states blocked by obstacles), never use `0` in an `int[][]` as your "unvisited" sentinel—use `Integer[][]` (`null`) or `int[][]` initialized to `-1`.
- Always order invalid/obstacle guards *before* target-reached base cases so degenerate inputs like `obstacleGrid = [[1]]` return `0` instead of `1`.
- Top-down memoization naturally skips unreachable pockets situated behind walls without needing special first-row/first-column obstacle propagation loops.
