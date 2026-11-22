---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Sorting
  - Heap (Priority Queue)
  - Matrix
---

# 378. Kth Smallest Element in a Sorted Matrix

**[View Problem on LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0378` (`378`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Sorting`, `Heap (Priority Queue)`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `n x n` `matrix` where each of the rows and columns is sorted in ascending order, return *the* `k^th` *smallest element in the matrix*.

Note that it is the `k^th` smallest element **in the sorted order**, not the `k^th` **distinct** element.

You must find a solution with a memory complexity better than `O(n^2)`.

---

## Examples

### Example 1

```text
**Input:** matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
**Output:** 13
**Explanation:** The elements in the matrix are [1,5,9,10,11,12,13,**13**,15], and the 8th smallest number is 13
```

### Example 2

```text
**Input:** matrix = [[-5]], k = 1
**Output:** -5
```

 

**

---

## Constraints

**

	
- `n == matrix.length == matrix[i].length`
	
- `1 <= n <= 300`
	
- `-10^9 <= matrix[i][j] <= 10^9`
	
- All the rows and columns of `matrix` are **guaranteed** to be sorted in **non-decreasing order**.
	
- `1 <= k <= n^2`

 

**Follow up:**

	
- Could you solve the problem with a constant memory (i.e., `O(1)` memory complexity)?
	
- Could you solve the problem in `O(n)` time complexity? The solution may be too advanced for an interview but you may find reading this paper fun.

---

## Problem Understanding

- Find the `k`-th smallest element in an `n x n` matrix where every row and column is sorted ascending.

---

## Approach

### Optimized Approach (Binary Search on Value + Bottom-Left Staircase Count)
1. Binary search value range `[matrix[0][0], matrix[n - 1][n - 1]]`.
2. Helper `check(mid)` counts elements `<= mid` in $O(n)$ starting from bottom-left `(n - 1, 0)`: if `matrix[i][j] <= mid`, add `i + 1` and step right; else step up.
3. Return the smallest `mid` whose count is `>= k`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log(\max - \min))$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [378kth-smallest-element-in-a-sorted-matrix.java](./378kth-smallest-element-in-a-sorted-matrix.java) |

---

## Key Learnings

- Value-space binary search paired with an $O(n)$ staircase counter beats $O(k \log n)$ heap merging for large `k`.
