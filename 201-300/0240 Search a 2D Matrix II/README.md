---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Divide and Conquer
  - Matrix
---

# 240. Search a 2D Matrix II

**[View Problem on LeetCode](https://leetcode.com/problems/search-a-2d-matrix-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0240` (`240`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Divide and Conquer`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:

	
- Integers in each row are sorted in ascending from left to right.
	
- Integers in each column are sorted in ascending from top to bottom.

---

## Examples

### Example 1

```text
**Input:** matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
**Output:** true
```

### Example 2

```text
**Input:** matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
**Output:** false
```

 

**

---

## Constraints

**

	
- `m == matrix.length`
	
- `n == matrix[i].length`
	
- `1 <= n, m <= 300`
	
- `-10^9 <= matrix[i][j] <= 10^9`
	
- All the integers in each row are **sorted** in ascending order.
	
- All the integers in each column are **sorted** in ascending order.
	
- `-10^9 <= target <= 10^9`

---

## Problem Understanding

- Search for `target` in an `m x n` matrix where every row and every column is sorted in ascending order.

---

## Approach

### Optimized Approach (Bottom-Left Staircase Search)
1. Start at bottom-left corner `(i = m - 1, j = 0)`.
2. While `i >= 0 && j < n`:
   - If `matrix[i][j] == target`, return `true`.
   - If `matrix[i][j] > target`, eliminate row `i` (`--i`).
   - Otherwise eliminate column `j` (`++j`).
3. Return `false` if out of bounds.

---

## Complexity Analysis

- **Time Complexity:** $O(m + n)$ — Each step eliminates an entire row or column.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [240search-a-2d-matrix-ii.java](./240search-a-2d-matrix-ii.java) |

---

## Key Learnings

- Starting from the bottom-left (or top-right) corner gives opposite monotonicity directions (up = smaller, right = larger).
