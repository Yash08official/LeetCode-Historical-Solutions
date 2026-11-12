---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
---

# 1001. Grid Illumination

**[View Problem on LeetCode](https://leetcode.com/problems/grid-illumination/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1001` |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | Java |

---

## Problem Description

There is a 2D grid of size `n x n` where the grid cells are initially dark. You are given an array of lamp positions `lamps` where `lamps[i] = [row_i, col_i]`. A lamp at `[row, col]` illuminates its cell and all cells in the same row, column, and two diagonals.

You are also given an array `queries` where `queries[j] = [row_j, col_j]`. For the `j`-th query:
1. Determine whether `[row_j, col_j]` is illuminated (1 if illuminated, 0 otherwise).
2. Turn off all lamps in the 8-directionally adjacent cells and the query cell itself ($3 	imes 3$ subgrid).

Return an array `ans` where `ans[j]` is the answer to the `j`-th query.

---

## Problem Understanding

- With $n \le 10^9$, an explicit 2D grid matrix cannot be instantiated.
- A cell `(r, c)` is illuminated if there is at least one active lamp in:
  - Row `r`
  - Column `c`
  - Main diagonal `r - c`
  - Anti-diagonal `r + c`
- Lamp turn-offs affect only a constant $3 	imes 3$ neighborhood around each query.
- Hash maps track lamp counts across rows, columns, and diagonals.

---

## Approach

### Hash Table Coordinate Decomposition

1. **State Tracking:**
   - `Set<Long> s`: Stores active lamp coordinates encoded as `r * n + c` to handle duplicates and test existence.
   - `Map<Integer, Integer> row`: Count of active lamps on row `r`.
   - `Map<Integer, Integer> col`: Count of active lamps on column `c`.
   - `Map<Integer, Integer> diag1`: Count of active lamps on diagonal `r - c`.
   - `Map<Integer, Integer> diag2`: Count of active lamps on anti-diagonal `r + c`.
2. **Lamp Insertion:** For each unique lamp, increment the corresponding row, column, and diagonal counts.
3. **Query Processing:**
   - If `row[i] > 0`, `col[j] > 0`, `diag1[i - j] > 0`, or `diag2[i + j] > 0`, set `ans[k] = 1`.
   - Check all 9 cells in range $[i-1 \dots i+1] 	imes [j-1 \dots j+1]$.
   - If an active lamp exists at $(x, y)$, remove it and decrement its row, column, and diagonal frequency counts.
4. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(L + Q)$ where $L$ is the number of lamps and $Q$ is the number of queries. Each query checks 9 neighbors in $O(1)$ hash map operations.
- **Space Complexity:** $O(L)$ to store active lamps and frequency counts.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1001grid-illumination.java](./1001grid-illumination.java) |

---

## Key Learnings

- High-dimensional grid lighting problems can be decomposed into independent 1D coordinate lines ($r$, $c$, $r-c$, $r+c$).
- Hash tables reduce sparse $O(N^2)$ space requirements to $O(	ext{lamps})$.
