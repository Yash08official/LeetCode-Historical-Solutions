---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Matrix
---

# 74. Search a 2D Matrix

**[View Problem on LeetCode](https://leetcode.com/problems/search-a-2d-matrix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0074` (`74`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` integer matrix `matrix` with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return `true` *if* `target` *is in* `matrix` *or* `false` *otherwise*.

You must write a solution in `O(log(m * n))` time complexity.

---

## Examples

### Example 1

```text
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

### Example 2

```text
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

---

## Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

---

## Problem Understanding

- The entire $m 	imes n$ matrix is strictly sorted in row-major order.
- It can be viewed as a flattened 1D sorted array of length $m 	imes n$.
- Index mapping: 1D index $mid$ maps to 2D matrix cell $(mid / n, mid \pmod n)$.

---

## Approach

### Optimized Approach (Virtual 1D Binary Search)

1. Set `left = 0`, `right = m * n - 1`.
2. While `left < right`:
   - `mid = (left + right) >> 1`.
   - Calculate coordinates: `x = mid / n`, `y = mid % n`.
   - If `matrix[x][y] >= target`, set `right = mid`.
   - Else set `left = mid + 1`.
3. Return `matrix[left / n][left % n] == target`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log(m \cdot n))$ — Standard binary search over $m \cdot n$ virtual elements.
- **Space Complexity:** $O(1)$ — Only pointer arithmetic with zero auxiliary data structures.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [74search-a-2d-matrix.java](./74search-a-2d-matrix.java) |

---

## Key Learnings

- Virtual coordinate mapping $(mid / n, mid \pmod n)$ enables direct 1D binary search over row-major sorted 2D matrices without flattening memory.
