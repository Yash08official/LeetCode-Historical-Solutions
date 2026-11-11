---
comments: true
difficulty: Hard
tags:
  - Array
  - Math
  - Bit Manipulation
  - Matrix
---

# 782. Transform to Chessboard

**[View Problem on LeetCode](https://leetcode.com/problems/transform-to-chessboard/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0782` (`782`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Math`, `Bit Manipulation`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an n x n binary grid board. In each move, you can swap any two rows with each other, or any two columns with each other.

Return the minimum number of moves to transform the board into a chessboard board. If the task is impossible, return -1.

A chessboard board is a board where no 0&#39;s and no 1&#39;s are 4-directionally adjacent.

 
Example 1:


Input: board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
Output: 2
Explanation: One potential sequence of moves is shown.
The first move swaps the first and second column.
The second move swaps the second and third row.


Example 2:


Input: board = [[0,1],[1,0]]
Output: 0
Explanation: Also note that the board with 0 in the top left corner, is also a valid chessboard.


Example 3:


Input: board = [[1,0],[1,0]]
Output: -1
Explanation: No matter what sequence of moves you make, you cannot end with a valid chessboard.


 
Constraints:


	n == board.length
	n == board[i].length
	2 <= n <= 30
	board[i][j] is either 0 or 1.

---

## Problem Understanding

- A valid chessboard has only 2 distinct row patterns and 2 distinct column patterns, which must be exact bitwise inverses of each other.
- Furthermore, the count of 1s and 0s in every row and column must be balanced ($|count(1) - count(0)| \le 1$).
- Row swaps and column swaps are completely independent.

---

## Approach

### Optimized Approach (Bitmask Matching and Parity Analysis)

1. Compute bitmasks for row 0 and column 0, and their bitwise complements `revRowMask`, `revColMask`.
2. Verify that every row matches either `rowMask` or `revRowMask`, and every column matches either `colMask` or `revColMask`.
3. Compute minimum swaps `f(mask, cnt)` for rows and columns:
   - Check balance of 1-bits and pattern frequencies.
   - Count mismatches against standard alternating patterns (`0xAAAAAAAA` and `0x55555555`).
4. Return $t1 + t2$ or `-1` if impossible.

---

## Dry Run

Rows and columns must form two inverse bitmasks in equal (or $\pm 1$) proportions.
Matching against alternating masks identifies the minimal swap operations needed.

---

## Complexity Analysis

- **Time Complexity:** $O(N^2)$ to validate grid and bitmasks.
- **Space Complexity:** $O(1)$ auxiliary space beyond bitmask variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [782transform-to-chessboard.java](./782transform-to-chessboard.java) |

---

## Key Learnings

- Matrix row/column swap operations do not alter the set of distinct row/column configurations.
- Decomposing 2D grid transformations into independent 1D bitmask matching simplifies complex invariants.
