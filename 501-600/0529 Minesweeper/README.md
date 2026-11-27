---
comments: true
difficulty: Medium
tags:
  - Array
  - Depth-First Search
  - Breadth-First Search
  - Matrix
---

# 529. Minesweeper

**[View Problem on LeetCode](https://leetcode.com/problems/minesweeper/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0529` (`529`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Let's play the minesweeper game (Wikipedia, online game)!

You are given an `m x n` char matrix `board` representing the game board where:

	- `'M'` represents an unrevealed mine,

	- `'E'` represents an unrevealed empty square,

	- `'B'` represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),

	- digit (`'1'` to `'8'`) represents how many mines are adjacent to this revealed square, and

	- `'X'` represents a revealed mine.

You are also given an integer array `click` where `click = [clickr, clickc]` represents the next click position among all the unrevealed squares (`'M'` or `'E'`).

Return *the board after revealing this position according to the following rules*:

	- If a mine `'M'` is revealed, then the game is over. You should change it to `'X'`.

	- If an empty square `'E'` with no adjacent mines is revealed, then change it to a revealed blank `'B'` and all of its adjacent unrevealed squares should be revealed recursively.

	- If an empty square `'E'` with at least one adjacent mine is revealed, then change it to a digit (`'1'` to `'8'`) representing the number of adjacent mines.

	- Return the board when no more squares will be revealed.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2023/08/09/untitled.jpeg)

```
Input: board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]
Output: [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2023/08/09/untitled-2.jpeg)

```
Input: board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]
Output: [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
```

 

**

---

## Constraints

**

	- `m == board.length`

	- `n == board[i].length`

	- `1 <= m, n <= 50`

	- `board[i][j]` is either `'M'`, `'E'`, `'B'`, or a digit from `'1'` to `'8'`.

	- `click.length == 2`

	- `0 <= clickr < m`

	- `0 <= clickc < n`

	- `board[clickr][clickc]` is either `'M'` or `'E'`.

---

## Problem Understanding

- Simulate one click on a Minesweeper board (`'M'`, `'E'`, `'B'`, `'1'..'8'`, `'X'`), revealing mines, numbered boundary cells, or flood-filling `'B'` empty regions across 8 neighbors.

---

## Approach

### Optimized Approach (8-Directional DFS Flood Fill)
1. If the clicked cell is `'M'`, change it to `'X'` and return immediately.
2. Otherwise run `dfs(i, j)`: count adjacent `'M'` cells across all 8 neighbors.
3. If `cnt > 0`, mark `board[i][j] = (char) ('0' + cnt)` and stop expanding from `(i, j)`.
4. If `cnt == 0`, mark `board[i][j] = 'B'` and recursively visit every unrevealed empty `'E'` 8-neighbor.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$ worst case — each `'E'` cell is visited and relabeled at most once.
- **Space Complexity:** $O(m \cdot n)$ worst-case DFS recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [529minesweeper.java](./529minesweeper.java) |

---

## Key Learnings

- Setting `board[i][j] = 'B'` before recursing onto `'E'` neighbors acts as an in-place visited marker and prevents infinite recursion.
