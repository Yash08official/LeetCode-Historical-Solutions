---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Matrix
---

# 73. Set Matrix Zeroes

**[View Problem on LeetCode](https://leetcode.com/problems/set-matrix-zeroes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0073` (`73`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.

You must do it in place.

---

## Examples

### Example 1

```text
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

### Example 2

```text
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

---

## Constraints

- `m == matrix.length`
- `n == matrix[0].length`
- `1 <= m, n <= 200`
- `-2^31 <= matrix[i][j] <= 2^31 - 1`

---

## Problem Understanding

- Modifying elements to `0` immediately during traversal would cause false cascades where newly zeroed cells trigger additional rows/columns to be zeroed.
- Thus, rows and columns that originally contain zeros must be recorded before updating values.

---

## Approach

### Optimized Approach (Row and Column Marker Arrays)

1. Create boolean arrays `row[m]` and `col[n]`.
2. First pass: iterate over all `(i, j)`. If `matrix[i][j] == 0`, mark `row[i] = true` and `col[j] = true`.
3. Second pass: iterate over all `(i, j)`. If `row[i] || col[j]`, set `matrix[i][j] = 0`.

---

## Complexity Analysis

- **Time Complexity:** $O(m 	imes n)$ — Two passes over the $m 	imes n$ matrix.
- **Space Complexity:** $O(m + n)$ — Boolean arrays `row` of size $m$ and `col` of size $n$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [73set-matrix-zeroes.java](./73set-matrix-zeroes.java) |

---

## Key Learnings

- Decoupling state detection from in-place mutation prevents destructive cascade overwrites.
