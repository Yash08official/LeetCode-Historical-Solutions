---
comments: true
difficulty: Medium
tags:
  - Array
  - Matrix
  - Simulation
---

# 59. Spiral Matrix II

**[View Problem on LeetCode](https://leetcode.com/problems/spiral-matrix-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0059` (`59`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Matrix`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given a positive integer `n`, generate an `n x n` `matrix` filled with elements from `1` to `n^2` in spiral order.

---

## Examples

### Example 1

```text
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
```

### Example 2

```text
Input: n = 1
Output: [[1]]
```

---

## Constraints

- `1 <= n <= 20`

---

## Problem Understanding

- Generate an $n 	imes n$ matrix populated with integers $1$ through $n^2$ in clockwise spiral order.
- Turn clockwise whenever hitting matrix boundaries or an already-filled cell (`ans[x][y] != 0`).

---

## Approach

### Optimized Approach (Direction Vector Simulation)

1. Initialize `ans = new int[n][n]`.
2. Use direction array `dirs = {0, 1, 0, -1, 0}` for right, down, left, and up moves.
3. Start at `(i, j) = (0, 0)` with direction index `k = 0`.
4. Loop value `v` from `1` to $n^2$:
   - Set `ans[i][j] = v`.
   - Calculate next cell `(x, y) = (i + dirs[k], j + dirs[k + 1])`.
   - If `(x, y)` is out of bounds or `ans[x][y] != 0`, rotate direction: `k = (k + 1) % 4`.
   - Move: `i += dirs[k]`, `j += dirs[k + 1]`.
5. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ — Exactly fills $n^2$ cells.
- **Space Complexity:** $O(1)$ — Auxiliary space beyond the returned $n 	imes n$ matrix is $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [59spiral-matrix-ii.java](./59spiral-matrix-ii.java) |

---

## Key Learnings

- Using the matrix itself to detect visited cells (`ans[x][y] != 0`) eliminates the need for a separate visited array.
