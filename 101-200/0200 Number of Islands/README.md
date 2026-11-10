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

# 200. Number of Islands

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-islands/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0200` (`200`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

---

## Examples

### Example 1

```text
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

### Example 2

```text
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

---

## Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`.

---

## Problem Understanding

- We must count connected components of `'1'`s connected 4-directionally (up, down, left, right).
- When a `'1'` is found, increment the island count and sink the entire connected landmass to `'0'` to prevent re-visitation.

---

## Approach

### Optimized Approach (Iterative DFS with Explicit Stack & In-Place Grid Sinking)

1. Maintain directions array `dirs = {-1, 0, 1, 0, -1}`.
2. Iterate through each cell `(i, j)` in the `m x n` grid:
   - If `grid[i][j] == '1'`:
     - Increment `ans++`.
     - Sink the initial cell: `grid[i][j] = '0'`.
     - Push `[i, j]` onto an explicit stack `Deque<int[]> stk`.
     - While stack is not empty:
       - Pop `[a, b]`.
       - For each of the 4 neighbors:
         - If neighbor `(x, y)` is valid and `grid[x][y] == '1'`:
           - Sink: `grid[x][y] = '0'`.
           - Push `[x, y]` onto stack.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(M \times N)$ — Every cell is visited at most twice (once in outer loops, once during stack traversal).
- **Space Complexity:** $O(M \times N)$ worst case for the stack when the entire grid is land.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [200number-of-islands.java](./200number-of-islands.java) |

---

## Key Learnings

- Sinking cells immediately (`grid[x][y] = '0'`) before pushing onto the stack prevents duplicate node additions and keeps memory bounded.
- Using an explicit `ArrayDeque` stack avoids `StackOverflowError` on large grids.
