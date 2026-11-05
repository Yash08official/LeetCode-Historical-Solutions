---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Matrix
---

# 2661. First Completely Painted Row or Column

**[View Problem on LeetCode](https://leetcode.com/problems/first-completely-painted-row-or-column/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2661` (`2661`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** integer array `arr` and an `m x n` integer matrix `mat`. Both `arr` and `mat` contain all the integers in the range `[1, m * n]` without duplicates.

Starting from index `0`, iterate through `arr` and paint the cell in `mat` containing the value `arr[k]`.

Return the **smallest index** `k` in `arr` at which either an entire row or an entire column of `mat` becomes completely painted.

---

## Examples

### Example 1

```text
Input: arr = [1,3,4,2], mat = [[1,4],[2,3]]
Output: 2
Explanation: The moves are shown in order, and both the first row and second column of the matrix become fully painted at arr[2].
```

### Example 2

```text
Input: arr = [2,8,7,4,1,3,5,6,9], mat = [[3,2,5],[1,4,6],[8,7,9]]
Output: 3
Explanation: The second column becomes fully painted at arr[3].
```

---

## Constraints

- `m == mat.length`

- `n = mat[i].length`

- `arr.length == m * n`

- `1 <= m, n <= 10^5`

- `1 <= m * n <= 10^5`

- `1 <= arr[i], mat[r][c] <= m * n`

- All the integers of `arr` are **unique**.

- All the integers of `mat` are **unique**.

---

## Problem Understanding

Key rules and definitions:
- `mat` has `m` rows and `n` columns, containing integers `1` through `m * n`.
- A row is completely painted when all `n` of its cells are painted.
- A column is completely painted when all `m` of its cells are painted.
- As we process `arr[k]` in order, we need to quickly identify the row `i` and column `j` of `arr[k]`, increment the painted count for row `i` and column `j`, and check if either reached its capacity (`row[i] == n` or `col[j] == m`).

---

## Approach

### Brute Force Approach

A naive approach would paint cells one by one, and after painting each cell, scan all `m` rows and all `n` columns to check if any row or column is fully painted.

Scanning the matrix takes `O(m * n)` time per step. Over up to `m * n` steps, this would result in `O((m * n)^2)` time, which easily times out for `m * n <= 10^5`.

### Optimized Approach

The optimal approach precomputes the coordinates of each number in `mat` using a hash map or direct lookup table `idx: value -> [row, col]` in `O(m * n)` time.

We maintain two frequency arrays: `row[i]` (count of painted cells in row `i`, capacity `n`) and `col[j]` (count of painted cells in column `j`, capacity `m`).

Iterating through `arr` at step `k`:
1. Lookup `[i, j] = idx.get(arr[k])` in `O(1)`.
2. Increment `row[i]` and `col[j]`.
3. If `row[i] == n` or `col[j] == m`, return `k` immediately.

### Step-by-Step Thinking Process

1. We need to detect when any row has `n` painted cells or any column has `m` painted cells.
2. Instead of searching the matrix to find where `arr[k]` is located, preprocess `mat` into a hash map mapping each value to its `(row, col)` coordinate.
3. Maintain an array `row` of size `m` and an array `col` of size `n` to count painted cells.
4. For each `k` from 0 upwards:
  - Retrieve `(i, j)` for `arr[k]`.
  - Increment `row[i]` and `col[j]`.
  - If `row[i] == n` (row is complete) or `col[j] == m` (column is complete), return `k`.
5. This achieves an overall linear time complexity `O(m * n)`.

### Algorithm / Intuition

The algorithm combines constant-time inverted index lookup with prefix counting:

1. `idx` map: Loops over `mat` to map each integer `mat[i][j]` to `new int[] {i, j}`.
2. `row` array of size `m`: Tracks how many cells in row `i` have been painted so far.
3. `col` array of size `n`: Tracks how many cells in column `j` have been painted so far.
4. Main loop: Reads `arr[k]`, fetches coordinates `(i, j)`, and increments `row[i]` and `col[j]`.
5. Completion check: Because row `i` has length `n`, it is complete when `row[i] == n`. Because column `j` has height `m`, it is complete when `col[j] == m`.
6. Returns the first `k` that triggers either condition.

---

## Dry Run

Trace for `arr = [1, 3, 4, 2]`, `mat = [[1, 4], [2, 3]]` (`m = 2`, `n = 2`):

- Preprocess coordinates into `idx`:
  - `1 -> [0, 0]`
  - `4 -> [0, 1]`
  - `2 -> [1, 0]`
  - `3 -> [1, 1]`
- Initialize: `row = [0, 0]`, `col = [0, 0]`.
- **k = 0:** `arr[0] = 1` -> coords `[0, 0]`.
  - `++row[0]` -> `row = [1, 0]`.
  - `++col[0]` -> `col = [1, 0]`.
  - Neither `row[0] == 2` nor `col[0] == 2` is true.
- **k = 1:** `arr[1] = 3` -> coords `[1, 1]`.
  - `++row[1]` -> `row = [1, 1]`.
  - `++col[1]` -> `col = [1, 1]`.
  - Neither `row[1] == 2` nor `col[1] == 2` is true.
- **k = 2:** `arr[2] = 4` -> coords `[0, 1]`.
  - `++row[0]` -> `row = [2, 1]`.
  - `++col[1]` -> `col = [1, 2]`.
  - `row[0] == 2` (`n = 2`) is true! Row 0 is completely painted.
  - (Also `col[1] == 2` (`m = 2`) is true, column 1 is painted).
- **Return:** `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Preprocessing `mat` into the hash map takes `O(m * n)` time. The loop over `arr` runs at most `m * n` times, doing `O(1)` hash map lookups and array updates per step.
- **Space Complexity:** `O(m * n)` — The hash map `idx` stores `m * n` entries mapping integers to their coordinates, plus `O(m + n)` space for the `row` and `col` counting arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2661first-completely-painted-row-or-column.java](./2661first-completely-painted-row-or-column.java) |

---

## Key Learnings

- Inverting matrix coordinates into a lookup table transforms cell search from `O(m * n)` to `O(1)`.
- Tracking line completions via 1D tally arrays (`row[i]` and `col[j]`) avoids scanning rows/columns repeatedly.
- Early termination guarantees the answer is returned the exact moment a line completes.
