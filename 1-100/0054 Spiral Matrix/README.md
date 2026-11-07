---
comments: true
difficulty: Medium
tags:
  - Array
  - Matrix
  - Simulation
---

# 54. Spiral Matrix

**[View Problem on LeetCode](https://leetcode.com/problems/spiral-matrix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0054` (`54`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Matrix`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` `matrix`, return *all elements of the* `matrix` *in spiral order*.

---

## Examples

### Example 1

```text
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

### Example 2

```text
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

---

## Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

---

## Problem Understanding

- We need to traverse an $m 	imes n$ 2D matrix in clockwise spiral order: right, down, left, up, and repeat inward until all $m 	imes n$ cells are visited.
- A visited cell or matrix boundary triggers a 90-degree clockwise turn.

---

## Approach

### Optimized Approach (Direction Vectors with Visited Tracking)

1. Use direction offsets `dirs = {0, 1, 0, -1, 0}` representing right `(0, 1)`, down `(1, 0)`, left `(0, -1)`, and up `(-1, 0)`.
2. Maintain a `vis[m][n]` boolean array to mark visited cells.
3. Start at `(i, j) = (0, 0)` with direction index `k = 0`.
4. Loop for exactly $m 	imes n$ iterations:
   - Append `matrix[i][j]` to `ans` and mark `vis[i][j] = true`.
   - Calculate candidate next position `(x, y) = (i + dirs[k], j + dirs[k + 1])`.
   - If `(x, y)` is out of bounds or already visited, increment direction `k = (k + 1) % 4`.
   - Advance position: `i += dirs[k]`, `j += dirs[k + 1]`.
5. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(m 	imes n)$ — Each of the $m 	imes n$ elements is visited and processed exactly once.
- **Space Complexity:** $O(m 	imes n)$ — Visited boolean matrix of dimensions $m 	imes n$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [54spiral-matrix.java](./54spiral-matrix.java) |

---

## Key Learnings

- Direction vectors `dirs = {0, 1, 0, -1, 0}` enable compact 4-directional transitions using `dirs[k]` and `dirs[k + 1]`.
- Counting down total remaining steps ($m 	imes n$) provides a clean termination condition.
