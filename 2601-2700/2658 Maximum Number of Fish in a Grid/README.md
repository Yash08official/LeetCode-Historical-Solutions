---
comments: true
difficulty: Medium
tags:
  - Array
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Matrix
---

# 2658. Maximum Number of Fish in a Grid

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-number-of-fish-in-a-grid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2658` (`2658`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` 2D grid where each cell `(r, c)` is either:
- **Land** if `grid[r][c] == 0`
- **Water** containing `grid[r][c]` fish if `grid[r][c] > 0`

A fisher can start at **any** water cell and move to any adjacent water cell (up, down, left, right). When entering a water cell, the fisher collects all the fish in that cell. The fisher can continue moving to adjacent water cells as long as there is an unvisited water cell available.

Return the **maximum** number of fish the fisher can collect from starting at any valid water cell.

---

## Examples

### Example 1

```text
Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
Output: 7
Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.
```

### Example 2

```text
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
Output: 1
Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish.
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `1 <= m, n <= 10`

- `0 <= grid[i][j] <= 10`

---

## Problem Understanding

The grid forms an undirected graph where connected water cells represent connected components.

Key properties:
- Starting at any water cell allows the fisher to explore and collect fish from all reachable water cells in that connected component.
- Cells are 4-directionally adjacent (up, down, left, right).
- Land cells (`0`) block movement.
- The problem reduces to finding the connected component of water cells with the maximum total sum of fish.

---

## Approach

### Brute Force Approach

A naive approach might perform an exhaustive search without marking visited cells, repeatedly backtracking or traversing already visited paths, leading to infinite loops or exponential time complexity `O(4^(m*n))`.

Alternatively, tracking visited cells with a separate `boolean[][] vis` matrix works but uses extra space. The optimal in-place mutation approach zeroes out visited cells directly.

### Optimized Approach

The solution uses Depth-First Search (DFS) to explore and sum each connected component:

Iterate through every cell `(i, j)`. If `grid[i][j] > 0`, run `dfs(i, j)` to accumulate all fish in that component, and update `ans = Math.max(ans, componentFish)`.

Inside `dfs(i, j)`:
1. Store `cnt = grid[i][j]` and set `grid[i][j] = 0` (marking it as visited in-place).
2. For each of the 4 neighbors `(x, y)` using direction vector `dirs = {-1, 0, 1, 0, -1}`, if `grid[x][y] > 0`, recursively add `dfs(x, y)` to `cnt`.
3. Return `cnt`.

### Step-by-Step Thinking Process

1. We need to find the connected component of positive numbers with the maximum sum.
2. Loop through all cells `(i, j)` of the `m x n` grid.
3. If `grid[i][j] > 0`, we found an unvisited water cell belonging to a water component.
4. Use DFS to visit all reachable adjacent water cells in 4 directions.
5. To prevent visiting the same cell multiple times or cycling infinitely, set `grid[i][j] = 0` immediately upon visiting.
6. Sum the fish collected across the entire component and update the global maximum `ans`.

### Algorithm / Intuition

The algorithm models connected component discovery via flood-fill DFS:

1. `findMaxFish` iterates through every `(i, j)` in the grid.
2. If `grid[i][j] > 0`, `dfs(i, j)` is triggered.
3. Inside `dfs(i, j)`, `cnt` starts with `grid[i][j]`, and `grid[i][j] = 0` zeroes out the cell, acting as an in-place visited set.
4. The 4-directional loop `dirs = {-1, 0, 1, 0, -1}` checks neighbors `(i - 1, j)`, `(i, j + 1)`, `(i + 1, j)`, and `(i, j - 1)`.
5. If a neighbor is in bounds and has `grid[x][y] > 0`, DFS recursively adds its fish.
6. Once the component is fully explored, `dfs` returns the component's total fish count, and `ans = Math.max(ans, dfs(i, j))` records the peak.

---

## Dry Run

Trace for `grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]`:

- Cell `(0, 1)` has value 2: trigger `dfs(0, 1)`.
  - `(0, 1)` has 2 fish, set to 0.
  - Adjacent to `(0, 2)` (fish = 1) -> `dfs(0, 2)`.
  - `(0, 2)` set to 0. No more water neighbors.
  - Total for this component: `2 + 1 = 3`. `ans = 3`.
- Cell `(1, 0)` has value 4: trigger `dfs(1, 0)`.
  - `(1, 0)` has 4 fish, set to 0.
  - Adjacent to `(2, 0)` (fish = 1) -> `dfs(2, 0)`.
  - `(2, 0)` set to 0. Total: `4 + 1 = 5`. `ans = max(3, 5) = 5`.
- Cell `(1, 3)` has value 3: trigger `dfs(1, 3)`.
  - `(1, 3)` has 3 fish, set to 0.
  - Adjacent to `(2, 3)` (fish = 4) -> `dfs(2, 3)`.
  - `(2, 3)` set to 0. Total: `3 + 4 = 7`. `ans = max(5, 7) = 7`.
- Cell `(3, 1)` has value 3: trigger `dfs(3, 1)`.
  - `(3, 1)` has 3 fish, set to 0.
  - Adjacent to `(3, 2)` (fish = 2) -> `dfs(3, 2)`.
  - `(3, 2)` set to 0. Total: `3 + 2 = 5`. `ans = max(7, 5) = 7`.
- **Final answer:** `7`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Where `m` is the number of rows and `n` is the number of columns. Every cell in the grid is visited at most once during DFS because visited water cells are immediately changed to `0`.
- **Space Complexity:** `O(m * n)` — In the worst case where all cells are water, the DFS recursion call stack can reach a depth of `m * n`. No additional data structures are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2658maximum-number-of-fish-in-a-grid.java](./2658maximum-number-of-fish-in-a-grid.java) |

---

## Key Learnings

- Connected component problems on grids map directly to graph traversal (DFS / BFS).
- Zeroing out visited cells in-place (`grid[i][j] = 0`) eliminates the need for an external visited array.
- Direction vectors `dirs = {-1, 0, 1, 0, -1}` provide a compact way to iterate through 4 cardinal neighbors.
