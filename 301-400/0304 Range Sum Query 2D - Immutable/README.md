---
comments: true
difficulty: Medium
tags:
  - Array
  - Design
  - Matrix
  - Prefix Sum
---

# 304. Range Sum Query 2D - Immutable

**[View Problem on LeetCode](https://leetcode.com/problems/range-sum-query-2d-immutable/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0304` (`304`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Design`, `Matrix`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given a 2D matrix `matrix`, handle multiple queries of the following type:

	
- Calculate the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

Implement the `NumMatrix` class:

	
- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix `matrix`.
	
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

You must design an algorithm where `sumRegion` works on `O(1)` time complexity.

---

## Examples

### Example 1

```text
**Input**
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
**Output**
[null, 8, 11, 12]

**Explanation**
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)
```

 

**

---

## Constraints

**

	
- `m == matrix.length`
	
- `n == matrix[i].length`
	
- `1 <= m, n <= 200`
	
- `-10^4 <= matrix[i][j] <= 10^4`
	
- `0 <= row1 <= row2 < m`
	
- `0 <= col1 <= col2 < n`
	
- At most `10^4` calls will be made to `sumRegion`.

---

## Problem Understanding

- Support $O(1)$ rectangular submatrix sum queries `sumRegion(row1, col1, row2, col2)` over an immutable 2D matrix.

---

## Approach

### Optimized Approach (2D Prefix Sum Inclusion-Exclusion)
1. Precompute `s[i + 1][j + 1] = s[i + 1][j] + s[i][j + 1] - s[i][j] + matrix[i][j]`.
2. Answer each rectangle query via `s[row2 + 1][col2 + 1] - s[row2 + 1][col1] - s[row1][col2 + 1] + s[row1][col1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$ preprocessing, $O(1)$ per query.\n- **Space Complexity:** $O(m \cdot n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [304range-sum-query-2d-immutable.java](./304range-sum-query-2d-immutable.java) |

---

## Key Learnings

- 2D inclusion-exclusion extends 1D prefix sums to arbitrary rectangular queries in constant time.
