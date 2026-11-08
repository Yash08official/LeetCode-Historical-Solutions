---
comments: true
difficulty: Easy
tags:
  - Array
  - Greedy
  - Matrix
---

# 3402. Minimum Operations to Make Columns Strictly Increasing

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-operations-to-make-columns-strictly-increasing/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3402` |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Greedy`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` matrix `grid` consisting of non-negative integers.

In one operation, you can increment the value of any `grid[i][j]` by `1`.

Return the **minimum** number of operations needed to make all columns of `grid` **strictly increasing**.

---

## Examples

### Example 1

```text
Input: grid = [[3,2],[1,3],[3,4],[0,1]]
Output: 15
Explanation:
- To make column 0 strictly increasing:
  - grid[1][0] becomes 4 (3 operations).
  - grid[2][0] becomes 5 (2 operations).
  - grid[3][0] becomes 6 (6 operations).
- To make column 1 strictly increasing:
  - grid[2][1] becomes 4 (1 operation).
  - grid[3][1] becomes 5 (4 operations).
Total operations: 3 + 2 + 6 + 1 + 4 = 15.
```

### Example 2

```text
Input: grid = [[3,2,1],[2,1,0],[1,2,3]]
Output: 12
```

---

## Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `0 <= grid[i][j] <= 50`

---

## Problem Understanding

- Each column can be processed completely independently of the others.
- Within a column $j$, for each row $i > 0$, the value must satisfy $grid[i][j] > grid[i - 1][j]$.
- To minimize increments, each entry $grid[i][j]$ should be set to $\max(grid[i][j], grid[i - 1][j] + 1)$.

---

## Approach

### Optimized Approach (Column-Wise Greedy Scan)

1. Initialize `ans = 0`.
2. For each column $j$ from $0$ to $n - 1$:
   - Maintain `pre = -1` (or the adjusted value of the previous row).
   - For each row $i$ from $0$ to $m - 1$:
     - If `cur > pre`, no operations needed; update `pre = cur`.
     - Else (`cur <= pre`), we must increment `cur` to `pre + 1`. Increment `pre` by $1$ and accumulate the operations needed: `ans += pre - cur`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(m 	imes n)$ — Single pass visiting each cell in the $m 	imes n$ matrix once.
- **Space Complexity:** $O(1)$ — Only scalar tracking variables with zero extra heap allocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3402minimum-operations-to-make-columns-strictly-increasing.java](./3402minimum-operations-to-make-columns-strictly-increasing.java) |

---

## Key Learnings

- Decoupling column constraints simplifies 2D matrix problems into independent 1D monotonic sequence problems.
- Greedily choosing the smallest strictly greater value ($pre + 1$) is guaranteed to minimize operations.
