---
comments: true
difficulty: Medium
tags:
  - Array
  - Matrix
  - Simulation
---

# 289. Game of Life

**[View Problem on LeetCode](https://leetcode.com/problems/game-of-life/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0289` (`289`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Matrix`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an `m x n` grid of cells, where each cell has an initial state: live (represented by a `1`) or dead (represented by a `0`). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

	
- Any live cell with fewer than two live neighbors dies as if caused by under-population.
	
- Any live cell with two or three live neighbors lives on to the next generation.
	
- Any live cell with more than three live neighbors dies, as if by over-population.
	
- Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the `m x n` grid `board`. In this process, births and deaths occur **simultaneously**.

Given the current state of the `board`, **update** the `board` to reflect its next state.

**Note** that you do not need to return anything.

---

## Examples

### Example 1

```text
**Input:** board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
**Output:** [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

### Example 2

```text
**Input:** board = [[1,1],[1,0]]
**Output:** [[1,1],[1,1]]
```

 

**

---

## Constraints

**

	
- `m == board.length`
	
- `n == board[i].length`
	
- `1 <= m, n <= 25`
	
- `board[i][j]` is `0` or `1`.

 

**Follow up:**

	
- Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.
	
- In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?

---

## Problem Understanding

- Compute the next state of Conway's Game of Life **in-place** without allocating a second board.

---

## Approach

### Optimized Approach (In-Place Multi-State Encoding)
1. Pass 1: For each cell `(i, j)`, count live neighbors (`board[x][y] > 0`, initialized with `-board[i][j]` to exclude itself).
   - Live cell (`1`) that dies -> mark as `2` (still `> 0`, so neighbors still see it as originally alive).
   - Dead cell (`0`) that becomes alive -> mark as `-1` (still `<= 0`, so neighbors still see it as originally dead).
2. Pass 2: Decode `2 -> 0` and `-1 -> 1`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$ — Constant 8-neighbor check per cell.
- **Space Complexity:** $O(1)$ — In-place state encoding.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [289game-of-life.java](./289game-of-life.java) |

---

## Key Learnings

- Encoding transition states using sign (`> 0` = originally live, `<= 0` = originally dead) preserves original board semantics during in-place updates.
