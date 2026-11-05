---
comments: true
difficulty: Easy
tags:
  - Array
  - Matrix
  - Simulation
---

# 2022. Convert 1D Array Into 2D Array

**[View Problem on LeetCode](https://leetcode.com/problems/convert-1d-array-into-2d-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2022` (`2022`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Matrix`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a **0-indexed** 1D integer array `original` and target dimensions `m` (rows) and `n` (columns), reshape `original` into an `m x n` 2D array in row-major order:

- Indices `0 .. n - 1` form row `0`,
- Indices `n .. 2n - 1` form row `1`, and so forth.

If `original` cannot fill an `m x n` matrix using **all** its elements with none left over, return an empty array `[]`.

---

## Examples

### Example 1

```text
Input: original = [1,2,3,4], m = 2, n = 2
Output: [[1,2],[3,4]]
Explanation: The constructed 2D array should contain 2 rows and 2 columns.
The first group of n=2 elements in original, [1,2], becomes the first row in the constructed 2D array.
The second group of n=2 elements in original, [3,4], becomes the second row in the constructed 2D array.
```

### Example 2

```text
Input: original = [1,2,3], m = 1, n = 3
Output: [[1,2,3]]
Explanation: The constructed 2D array should contain 1 row and 3 columns.
Put all three elements in original into the first row of the constructed 2D array.
```

### Example 3

```text
Input: original = [1,2], m = 1, n = 1
Output: []
Explanation: There are 2 elements in original.
It is impossible to fit 2 elements in a 1x1 2D array, so return an empty 2D array.
```

---

## Constraints

- `1 <= original.length <= 5 * 10^4`

- `1 <= original[i] <= 10^5`

- `1 <= m, n <= 4 * 10^4`

---

## Problem Understanding

- Reshaping is possible **if and only if** `m * n === original.length`.
- In row-major layout, cell `(i, j)` (`0 <= i < m`, `0 <= j < n`) corresponds directly to 1D index `i * n + j` in `original`.

---

## Approach

### Brute Force Approach

Slicing `original` repeatedly with `original.slice(i * n, (i + 1) * n)` or shifting elements off a copy of `original` works, though repeated `shift()` would degrade to `O((m * n)^2)`. Checking dimensions upfront and indexing directly is clean and allocation-minimal.

### Optimized Approach

First check `if (m * n !== original.length) return [];`. Otherwise allocate `ans` with `m` rows and `n` columns, mapping each entry directly via `ans[i][j] = original[i * n + j]`.

### Step-by-Step Thinking Process

1. Validate element count immediately: if `m * n !== original.length`, return `[]` in `O(1)` time without allocating any rows.
2. Pre-allocate the outer array `ans = new Array(m)`.
3. For each row `i` from `0` to `m - 1`, allocate `ans[i] = new Array(n)`.
4. For each column `j` from `0` to `n - 1`, copy `original[i * n + j]` into `ans[i][j]`.
5. Return `ans`.

### Algorithm / Intuition

In `construct2DArray`, the dimension guard `m * n !== original.length` handles all impossible shapes immediately (note that in JavaScript, `4 * 10^4 * 4 * 10^4 = 1.6 * 10^9` is well within `Number.MAX_SAFE_INTEGER = 9 * 10^15`). Each prior row consumes `n` elements of `original`, so row `i` starts at offset `i * n`, and column `j` within row `i` sits at exact 1D index `i * n + j`.

---

## Dry Run

Tracing Example 1: `original = [1, 2, 3, 4]`, `m = 2`, `n = 2`:

- Check: `m * n = 2 * 2 = 4 === original.length` (valid).

| `i` | `j` | 1D Index `i * n + j` | `original[i * n + j]` | Assignment |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `0` | `0 * 2 + 0 = 0` | `1` | `ans[0][0] = 1` |
| `0` | `1` | `0 * 2 + 1 = 1` | `2` | `ans[0][1] = 2` |
| `1` | `0` | `1 * 2 + 0 = 2` | `3` | `ans[1][0] = 3` |
| `1` | `1` | `1 * 2 + 1 = 3` | `4` | `ans[1][1] = 4` |

Returns `[[1, 2], [3, 4]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` when `m * n === original.length` (and `O(1)` when dimensions mismatch) — Visits each of the `m * n` elements once.
- **Space Complexity:** `O(1)` auxiliary space (`O(m * n)` total space for the returned 2D array `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2022convert-1d-array-into-2d-array.js](./2022convert-1d-array-into-2d-array.js) |

---

## Key Learnings

- Memorize the standard 1D <-> 2D row-major bijection for an `m x n` grid: `index = r * n + c`, and inversely `r = Math.floor(index / n)`, `c = index % n`.
- Always validate `m * n === length` **before** allocating row buffers so invalid inputs fail fast in `O(1)` time and memory.
