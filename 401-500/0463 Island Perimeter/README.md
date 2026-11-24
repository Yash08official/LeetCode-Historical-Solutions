---
comments: true
difficulty: Easy
tags:
  - Array
  - Depth-First Search
  - Breadth-First Search
  - Matrix
---

# 463. Island Perimeter

**[View Problem on LeetCode](https://leetcode.com/problems/island-perimeter/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0463` (`463`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given `row x col` `grid` representing a map where `grid[i][j] = 1` represents land and `grid[i][j] = 0` represents water.

Grid cells are connected **horizontally/vertically** (not diagonally). The `grid` is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

---

## Examples

### Example 1

```text
**Input:** grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
**Output:** 16
**Explanation:** The perimeter is the 16 yellow stripes in the image above.
```

### Example 2

```text
**Input:** grid = [[1]]
**Output:** 4
```

### Example 3

```text
**Input:** grid = [[1,0]]
**Output:** 4
```

 

**

---

## Constraints

**

	
- `row == grid.length`
	
- `col == grid[i].length`
	
- `1 <= row, col <= 100`
	
- `grid[i][j]` is `0` or `1`.
	
- There is exactly one island in `grid`.

---

## Problem Understanding

- Compute the perimeter of the single island (`1`s) in a binary grid.

---

## Approach

### Optimized Approach (Edge Addition + Shared-Border Subtraction)
1. For every land cell `(i, j)`, add `4` to `ans`.
2. Subtract `2` for each shared internal edge with a bottom neighbor `(i + 1, j)` or right neighbor `(i, j + 1)`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [463island-perimeter.java](./463island-perimeter.java) |

---

## Key Learnings

- Checking only down and right neighbors counts every shared internal edge exactly once without double subtraction.
