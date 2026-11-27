---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Breadth-First Search
  - Matrix
---

# 542. 01 Matrix

**[View Problem on LeetCode](https://leetcode.com/problems/01-matrix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0542` (`542`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Breadth-First Search`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` binary matrix `mat`, return *the distance of the nearest *`0`* for each cell*.

The distance between two cells sharing a common edge is `1`.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2021/04/24/01-1-grid.jpg)

```
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2021/04/24/01-2-grid.jpg)

```
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
```

 

**

---

## Constraints

**

	- `m == mat.length`

	- `n == mat[i].length`

	- `1 <= m, n <= 10^4`

	- `1 <= m * n <= 10^4`

	- `mat[i][j]` is either `0` or `1`.

	- There is at least one `0` in `mat`.

 

**Note:** This question is the same as 1765: https://leetcode.com/problems/map-of-highest-peak/

---

## Problem Understanding

- Compute the shortest 4-directional distance from every cell in a binary `m x n` matrix `mat` to the nearest `0`.

---

## Approach

### Optimized Approach (Multi-Source Breadth-First Search)
1. Initialize output matrix `ans` to `-1` (unvisited), and enqueue every cell `(i, j)` where `mat[i][j] == 0` with `ans[i][j] = 0`.
2. Run a single simultaneous multi-source BFS expanding 4-directionally via `dirs = {-1, 0, 1, 0, -1}`.
3. Whenever an unvisited neighbor `(x, y)` (`ans[x][y] == -1`) is reached from `(i, j)`, set `ans[x][y] = ans[i][j] + 1` and enqueue `(x, y)`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$ — each cell enters the BFS queue at most once.
- **Space Complexity:** $O(m \cdot n)$ for the queue and `ans` matrix.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [54201-matrix.java](./54201-matrix.java) |

---

## Key Learnings

- Starting BFS simultaneously from all target `0` cells computes shortest distance to *any* `0` in one linear pass rather than running BFS per `1` cell.
