---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Matrix
---

# 48. Rotate Image

**[View Problem on LeetCode](https://leetcode.com/problems/rotate-image/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0048` (`48`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `n x n` 2D integer array `matrix` representing an image. Rotate the image by **90 degrees clockwise**.

You must perform the rotation **in-place** by modifying `matrix` directly—allocating a second 2D matrix to copy values into is forbidden.

---

## Examples

### Example 1

```text
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

### Example 2

```text
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

---

## Constraints

- `n == matrix.length == matrix[i].length`

- `1 <= n <= 20`

- `-1000 <= matrix[i][j] <= 1000`

---

## Problem Understanding

- **Coordinate Transformation:** When an `n x n` grid rotates 90 degrees clockwise, row `0` becomes column `n - 1`, row `1` becomes column `n - 2`, and in general cell `(i, j)` moves to `(j, n - 1 - i)`.
- **In-Place Symmetry Decomposition:** Any 90-degree rotation equals the composition of two reflections across axes separated by 45 degrees:
  1. Flip vertically (swap row `i` with row `n - 1 - i`): `(i, j) -> (n - 1 - i, j)`.
  2. Transpose across the main diagonal (swap `(r, c)` with `(c, r)`): `(n - 1 - i, j) -> (j, n - 1 - i)`.
- **Half-Matrix Iteration:** Both reflection steps must swap each pair **once**—iterating only the top half (`i < n / 2`) for the vertical flip and strictly below the main diagonal (`j < i`) for the transpose—otherwise swapping twice cancels out back to the original matrix!

---

## Approach

### Brute Force Approach

If extra space were allowed, we would create `int[][] copy = new int[n][n]`, write `copy[j][n - 1 - i] = matrix[i][j]` for every `(i, j)`, and copy `copy` back into `matrix`. That takes `O(n^2)` auxiliary space, explicitly violating the problem's in-place requirement. Another in-place alternative rotates 4-element rings directly (`(i, j) -> (j, n-1-i) -> (n-1-i, n-1-j) -> (n-1-j, i)`), which also uses `O(1)` space but has trickier index bounds than two simple reflections.

### Optimized Approach

Perform **two in-place matrix reflections**: first flip the matrix upside-down by swapping rows `i` and `n - i - 1` for `0 <= i < n / 2`, then transpose the matrix across its main diagonal by swapping `matrix[i][j]` and `matrix[j][i]` for all `0 <= j < i < n`.

### Step-by-Step Thinking Process

1. Derive where `(i, j)` lands after a 90-degree clockwise turn: column `j` becomes the new row `j`, and row `i` from the top becomes column `n - 1 - i` from the left, giving `(j, n - 1 - i)`.
2. Notice that reversing the row order (`i -> n - 1 - i`) produces `(n - 1 - i, j)`, and swapping row and column indices afterward (`(r, c) -> (c, r)`) produces `(j, n - 1 - i)`—an exact match!
3. Implement the upside-down row flip: loop `i` from `0` to `(n >> 1) - 1` and `j` from `0` to `n - 1`, swapping `matrix[i][j]` with `matrix[n - i - 1][j]`.
4. Implement the main-diagonal transpose: loop `i` from `0` to `n - 1` and `j` from `0` to `i - 1` (the strict lower triangle), swapping `matrix[i][j]` with `matrix[j][i]`.

### Algorithm / Intuition

In `rotate(int[][] matrix)`:
1. **Vertical Flip (`i < n >> 1`):** `n >> 1` computes integer division `n / 2`. When `n` is odd, the middle row `n / 2` stays fixed, which is automatically skipped. For every column `j`, scalar `t` swaps `matrix[i][j]` and `matrix[n - i - 1][j]`.
2. **Transpose (`j < i`):** The outer loop visits every row `i`, and the inner loop visits columns `0 <= j < i` strictly below the main diagonal (`i == j` needs no swap). Scalar `t` swaps `matrix[i][j]` with its mirror `matrix[j][i]` across the main diagonal.

Each step touches roughly half the cells with simple, bug-free loop bounds and zero extra arrays.

---

## Dry Run

**Input:**
```text
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]   (n = 3, n >> 1 = 1)
```

1. **Step 1 — Vertical Flip (`i = 0`, `n - i - 1 = 2`, `j = 0..2`):**
   - Swap row `0` and row `2` element-by-element (`1 <-> 7`, `2 <-> 8`, `3 <-> 9`):
   ```text
   [[7, 8, 9],
    [4, 5, 6],
    [1, 2, 3]]
   ```

2. **Step 2 — Main-Diagonal Transpose (`0 <= j < i < 3`):**
   - `i = 0`: `j < 0` (no iterations).
   - `i = 1, j = 0`: swap `matrix[1][0]` (`4`) with `matrix[0][1]` (`8`).
   - `i = 2, j = 0`: swap `matrix[2][0]` (`1`) with `matrix[0][2]` (`9`).
   - `i = 2, j = 1`: swap `matrix[2][1]` (`2`) with `matrix[1][2]` (`6`).
   ```text
   [[7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]]
   ```

**Final `matrix`:** `[[7,4,1],[8,5,2],[9,6,3]]`

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Both the vertical flip (`~n^2 / 2` swaps) and the transpose (`n * (n - 1) / 2` swaps) perform a constant amount of work per matrix element.
- **Space Complexity:** `O(1)` — The matrix is rotated strictly in-place using only loop counters and a single temporary integer `t`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [48rotate-image.java](./48rotate-image.java) |

---

## Key Learnings

- Decomposing 2D grid rotations into simple reflections + transposes eliminates error-prone 4-way cyclic index math.
- Order matters for reflections: **Flip Upside-Down + Transpose** rotates 90 degrees **clockwise**, whereas **Transpose + Flip Upside-Down** (or Flip Left-Right + Transpose) rotates 90 degrees **counter-clockwise**.
- In matrix transposes, always restrict `j < i` (or `j > i`); iterating `j < n` swaps every off-diagonal pair twice and leaves the matrix unchanged.
