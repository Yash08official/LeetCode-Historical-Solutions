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

# 130. Surrounded Regions

**[View Problem on LeetCode](https://leetcode.com/problems/surrounded-regions/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0130` (`130`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` matrix `board` containing **letters** `'X'` and `'O'`, **capture regions** that are **surrounded**:

	
- **Connect**: A cell is connected to adjacent cells horizontally or vertically.
	
- **Region**: To form a region **connect every** `'O'` cell.
	
- **Surround**: A region is surrounded if none of the `'O'` cells in that region are on the edge of the board. Such regions are **completely enclosed **by `'X'` cells.

To capture a **surrounded region**, replace all `'O'`s with `'X'`s **in-place** within the original board. You do not need to return anything.

---

## Examples

### Example 1

**Input:** board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

**Output:** [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

**Explanation:**

In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.

### Example 2

**Input:** board = [["X"]]

**Output:** [["X"]]

 

**

---

## Constraints

**

	
- `m == board.length`
	
- `n == board[i].length`
	
- `1 <= m, n <= 200`
	
- `board[i][j]` is `'X'` or `'O'`.

---

## Problem Understanding

- The problem requires capturing all `'O'` regions completely surrounded by `'X'`.
- Any `'O'` connected (horizontally or vertically) to the grid border cannot be captured.
- Therefore, any `'O'` that is part of a component reaching any boundary cell must remain `'O'`; all other `'O'` cells must be converted to `'X'`.

---

## Approach

### Optimized Approach (Disjoint Set Union / Union-Find)

1. Introduce a virtual dummy node representing the border component (index `m * n`).
2. Initialize a Disjoint Set Union (DSU) structure of size `m * n + 1`, where each cell $(i, j)$ corresponds to 1D index $i 	imes n + j$.
3. Traverse the grid:
   - For any `'O'` on the four boundary edges, union its index with the dummy node `m * n`.
   - For internal `'O'` cells, union with neighboring `'O'` cells in the 4 cardinal directions.
4. Second pass over the grid:
   - For every `'O'` cell, check if its root parent equals the dummy node root.
   - If not connected to the dummy node, flip the cell to `'X'`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n \cdot lpha(m \cdot n))$ — Nearly linear across all grid cells using path compression in DSU.
- **Space Complexity:** $O(m \cdot n)$ — For the parent array `p` in the DSU structure.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [130surrounded-regions.java](./130surrounded-regions.java) |

---

## Key Learnings

- Boundary connectivity problems can be modeled elegantly using a virtual dummy node in Union-Find.
- Cells not connected to the border dummy node are safely identified as completely surrounded.
