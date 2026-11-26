---
comments: true
difficulty: Medium
tags:
  - Array
  - Depth-First Search
  - Matrix
---

# 419. Battleships in a Board

**[View Problem on LeetCode](https://leetcode.com/problems/battleships-in-a-board/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0419` (`419`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` matrix `board` where each cell is part of a battleship `'X'` or empty `'.'`, return the number of the **battleships** on `board`.

**Battleships** can only be placed horizontally or vertically on `board`. In other words, they can only be made of the shape `1 x k` (`1` row, `k` columns) or `k x 1` (`k` rows, `1` column), where `k` can be of any size. At least one horizontal or vertical cell separates between two battleships (i.e., there are no adjacent battleships).

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2024/06/21/image.png)

```
Input: board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]
Output: 2
```

### Example 2

```
Input: board = [["."]]
Output: 0
```

 

**

---

## Constraints

**

	- `m == board.length`

	- `n == board[i].length`

	- `1 <= m, n <= 200`

	- `board[i][j]` is either `'.'` or `'X'`.

 

**Follow up:** Could you do it in one-pass, using only `O(1)` extra memory and without modifying the values `board`?

---

## Problem Understanding

- Count the number of battleships (`'X'`) on an `m x n` board where each battleship is placed strictly horizontally (`1 x k`) or vertically (`k x 1`) with at least one empty cell (`'.'`) separating any two ships.

---

## Approach

### Optimized Approach (Single-Pass Top-Left Head Counting)
1. Because battleships never touch orthogonally, every ship has a unique top-leftmost `'X'` cell whose immediate upper neighbor `(i - 1, j)` and immediate left neighbor `(i, j - 1)` are both not `'X'`.
2. Scan the grid once: skip `'.'` cells and skip any `'X'` cell that has `'X'` directly above or directly to its left.
3. Increment the answer only for each ship's top-left head cell, requiring zero board mutation and $O(1)$ extra space.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$ — single pass over all grid cells.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [419battleships-in-a-board.java](./419battleships-in-a-board.java) |

---

## Key Learnings

- Counting canonical representatives (the top-left cell of each connected component) eliminates the need for DFS/BFS visited sets when shapes are axis-aligned and non-adjacent.
