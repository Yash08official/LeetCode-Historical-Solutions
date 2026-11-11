---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 741. Cherry Pickup

**[View Problem on LeetCode](https://leetcode.com/problems/cherry-pickup/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0741` (`741`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an n x n grid representing a field of cherries, each cell is one of three possible integers.


	0 means the cell is empty, so you can pass through,
	1 means the cell contains a cherry that you can pick up and pass through, or
	-1 means the cell contains a thorn that blocks your way.


Return the maximum number of cherries you can collect by following the rules below:


	Starting at the position (0, 0) and reaching (n - 1, n - 1) by moving right or down through valid path cells (cells with value 0 or 1).
	After reaching (n - 1, n - 1), returning to (0, 0) by moving left or up through valid path cells.
	When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell 0.
	If there is no valid path between (0, 0) and (n - 1, n - 1), then no cherries can be collected.


 
Example 1:


Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
Output: 5
Explanation: The player started at (0, 0) and went down, down, right right to reach (2, 2).
4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
Then, the player went left, up, up, left to return home, picking up one more cherry.
The total number of cherries picked up is 5, and this is the maximum possible.


Example 2:


Input: grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
Output: 0


 
Constraints:


	n == grid.length
	n == grid[i].length
	1 <= n <= 50
	grid[i][j] is -1, 0, or 1.
	grid[0][0] != -1
	grid[n - 1][n - 1] != -1

---

## Problem Understanding

- We travel from $(0,0)$ to $(n-1, n-1)$ moving right/down, then return from $(n-1, n-1)$ to $(0,0)$ moving left/up.
- Walking back is mathematically equivalent to **two people walking simultaneously** from $(0,0)$ to $(n-1, n-1)$.
- After step $k$, both people have traversed $k = i_1 + j_1 = i_2 + j_2$ steps.
- If both people land on the same cell $(i_1 = i_2)$, the cherry is counted only once.

---

## Approach

### Optimized Approach (Synchronous Dual-Agent Dynamic Programming)

1. Define 3D DP `f[k][i1][i2]` as the maximum cherries collected when both agents have taken $k$ steps and are at row indices $i_1$ and $i_2$.
2. Derive columns $j_1 = k - i_1$ and $j_2 = k - i_2$.
3. For each step $k$ from 1 to $2n - 2$:
   - For all valid rows $i_1, i_2 \in [0, n-1]$:
     - Check boundary and obstacle conditions (`grid == -1`).
     - Calculate cherry gain: $t = grid[i_1][j_1] + (i_1 \ne i_2 ? grid[i_2][j_2] : 0)$.
     - Transition from the 4 predecessor state pairs $(x_1, x_2)$ where $x_1 \in \{i_1-1, i_1\}$ and $x_2 \in \{i_2-1, i_2\}$.
4. Final answer is $\max(0, f[2n - 2][n - 1][n - 1])$.

---

## Dry Run

In a 3x3 grid:
Both start at $(0,0)$ with $grid[0][0]$.
At each step $k$, four movement combinations (Down-Down, Down-Right, Right-Down, Right-Right) are evaluated.
Optimal path ensures neither hits obstacles (`-1`) while maximizing shared cherry collection.

---

## Complexity Analysis

- **Time Complexity:** $O(n^3)$ — Total states $O(n)$ steps $\times n$ rows $\times n$ rows with $O(1)$ transitions.
- **Space Complexity:** $O(n^3)$ (or $O(n^2)$ rolling layer space).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [741cherry-pickup.java](./741cherry-pickup.java) |

---

## Key Learnings

- Round-trip grid traversal with non-reusable pickups is best solved by modeling two simultaneous forward paths.
- Synchronizing steps $k = i_1 + j_1 = i_2 + j_2$ reduces the state space from 4 dimensions $(i_1, j_1, i_2, j_2)$ to 3 dimensions $(k, i_1, i_2)$.
