---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
  - Topological Sort
  - Memoization
  - Matrix
  - Directed Acyclic Graph
---

# 329. Longest Increasing Path in a Matrix

**[View Problem on LeetCode](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0329` (`329`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Depth-First Search`, `Breadth-First Search`, `Graph Theory`, `Topological Sort`, `Memoization`, `Matrix`, `Directed Acyclic Graph` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` integer `matrix`, return the length (number of cells) of the **longest strictly increasing path** in the grid.

From any cell `(i, j)`, you may step up, down, left, or right to an in-bounds neighbor `(x, y)` only if `matrix[x][y] > matrix[i][j]`. Diagonal moves and boundary wrap-around are not allowed.

---

## Examples

### Example 1

```text
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
```

### Example 2

```text
Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
```

### Example 3

```text
Input: matrix = [[1]]
Output: 1
```

---

## Constraints

- `m == matrix.length`

- `n == matrix[i].length`

- `1 <= m, n <= 200`

- `0 <= matrix[i][j] <= 2^31 - 1`

---

## Problem Understanding

- Every valid move strictly increases the cell value (`matrix[x][y] > matrix[i][j]`). Because numbers cannot increase around a loop back to where they started, **cycles are impossible**!
- Consequently, the grid cells and valid moves form an implicit **Directed Acyclic Graph (DAG)**, where we want the longest path in a DAG.
- Longest path in a DAG exhibits clean optimal substructure without needing a `visited` cycle-detection array—only a memoization table `f[i][j]`.

---

## Approach

### Brute Force Approach

Running unmemoized DFS from every cell `(i, j)` recomputes overlapping subpaths repeatedly (for example, on an ascending snake or checkerboard gradient), exploding to `O(4^(m * n))` exponential time.

### Optimized Approach

Run top-down Depth-First Search with memoization (`int[][] f = new int[m][n]`), where `dfs(i, j)` computes and caches the maximum strictly increasing path length starting at cell `(i, j)`.

### Step-by-Step Thinking Process

1. Store dimensions `m = matrix.length`, `n = matrix[0].length`, and allocate cache `f = new int[m][n]` (initialized to `0`, meaning uncomputed since every valid path has length `>= 1`).
2. Iterate over every cell `(i, j)` and take `ans = Math.max(ans, dfs(i, j))`.
3. Inside `dfs(i, j)`, if `f[i][j] != 0`, return the cached value `f[i][j]` immediately.
4. Explore all 4 cardinal neighbors `(x, y)` using compressed direction array `dirs = {-1, 0, 1, 0, -1}`. Whenever `(x, y)` is in-bounds and `matrix[x][y] > matrix[i][j]`, set `f[i][j] = Math.max(f[i][j], dfs(x, y))`.
5. Increment and return `++f[i][j]` to account for cell `(i, j)` itself.

### Algorithm / Intuition

Because every cell has path length at least `1`, `0` in `f[i][j]` unambiguously indicates 'not yet computed'. During `dfs(i, j)`, `f[i][j]` temporarily accumulates the maximum length among strictly larger neighbors (`0` if `(i, j)` is a local peak with no larger neighbor), and `return ++f[i][j]` both adds `1` for `(i, j)` and finalizes the memo entry in one concise expression.

---

## Dry Run

Tracing **Example 1** (`matrix = [[9,9,4],[6,6,8],[2,1,1]]`):

- `dfs(0, 0)` (`val = 9`): no neighbor `> 9` -> `f[0][0] = 1`.
- `dfs(0, 1)` (`val = 9`): `f[0][1] = 1`.
- `dfs(0, 2)` (`val = 4`): larger neighbors `(0,1)=9` (`f=1`) and `(1,2)=8`: `dfs(1,2)` has no neighbor `> 8` (`f[1][2] = 1`), so `f[0][2] = 2` (`4 -> 9` or `4 -> 8`).
- `dfs(1, 0)` (`val = 6`): larger neighbor `(0,0)=9` (`f=1`) -> `f[1][0] = 2` (`6 -> 9`).
- `dfs(2, 0)` (`val = 2`): larger neighbor `(1,0)=6` (`f=2` cached!) -> `f[2][0] = 3` (`2 -> 6 -> 9`).
- `dfs(2, 1)` (`val = 1`): larger neighbors `(2,0)=2` (`f=3` cached!) and `(1,1)=6` (`f=2`) -> `f[2][1] = max(3, 2) + 1 = 4` (`1 -> 2 -> 6 -> 9`).
- Global max `ans = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Each of the `m * n` grid cells is evaluated once (subsequent visits return in `O(1)` from `f`), checking at most 4 neighbors per cell.
- **Space Complexity:** `O(m * n)` — Memoization table `f` takes `m * n` ints, and recursion stack depth is at most `m * n` if a path snakes through the entire grid.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [329longest-increasing-path-in-a-matrix.java](./329longest-increasing-path-in-a-matrix.java) |

---

## Key Learnings

- Strict monotonicity (`matrix[x][y] > matrix[i][j]`) turns an undirected grid into a DAG, eliminating cycles and making DFS + memoization linear in grid size.
- The 5-element array `{-1, 0, 1, 0, -1}` encodes all 4 cardinal `(dx, dy)` pairs as `(dirs[k], dirs[k + 1])` for `k = 0..3`.
