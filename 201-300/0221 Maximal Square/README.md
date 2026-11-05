---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 221. Maximal Square

**[View Problem on LeetCode](https://leetcode.com/problems/maximal-square/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0221` (`221`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` binary grid `matrix` filled with characters `'0'` and `'1'`, find the largest square submatrix composed entirely of `'1'`s and return its **area** (side length squared).

---

## Examples

### Example 1

```text
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
```

### Example 2

```text
Input: matrix = [["0","1"],["1","0"]]
Output: 1
```

### Example 3

```text
Input: matrix = [["0"]]
Output: 0
```

---

## Constraints

- `m == matrix.length`

- `n == matrix[i].length`

- `1 <= m, n <= 300`

- `matrix[i][j]` is `'0'` or `'1'`.

---

## Problem Understanding

Notice that the problem asks for the **area** (`side * side`), whereas growing squares step-by-step naturally tracks **side length**. A cell `(i, j)` containing `'0'` cannot serve as the bottom-right corner of any all-`'1'` square (side length `0`). A cell `(i, j)` containing `'1'` can form a square of side `k` ending at `(i, j)` if and only if its top neighbor `(i - 1, j)`, left neighbor `(i, j - 1)`, and top-left diagonal neighbor `(i - 1, j - 1)` can each serve as bottom-right corners of all-`'1'` squares of side at least `k - 1`.

---

## Approach

### Brute Force Approach

For every cell `(i, j)` containing `'1'`, try expanding the square side length `k = 1, 2, ...` downward and rightward, scanning the newly added bottom row and right column for `'0'`s at each step. Checking every candidate square across an `m x n` grid of all `'1'`s takes `O((m * n) * min(m, n)^2)` (or `O(m * n * min(m, n))` incremental border checks), which is far slower than reusing overlap information.

### Optimized Approach

Use bottom-up 2D Dynamic Programming with a 1-padded `(m + 1) x (n + 1)` table `dp`, where `dp[i + 1][j + 1]` stores the maximum side length of an all-`'1'` square whose bottom-right corner is `matrix[i][j]`, tracking the maximum side `mx` and returning `mx * mx`.

### Step-by-Step Thinking Process

1. Define `dp[i + 1][j + 1]` as the largest side length of an all-`'1'` square ending at cell `(i, j)`.
2. Allocate `new int[m + 1][n + 1]` so row `0` and column `0` act as zero-filled boundary padding, eliminating `i == 0` and `j == 0` out-of-bounds checks.
3. When `matrix[i][j] == '1'`, compute `dp[i + 1][j + 1] = Math.min(Math.min(dp[i][j + 1], dp[i + 1][j]), dp[i][j]) + 1`.
4. Update `mx = Math.max(mx, dp[i + 1][j + 1])` at every `'1'` cell.
5. Return the area `mx * mx` after scanning the grid.

### Algorithm / Intuition

Why is the recurrence governed by the **minimum** of all three neighbors (`dp[i][j + 1]` top, `dp[i + 1][j]` left, and `dp[i][j]` top-left)?

Geometrically, a square of side `s` anchored at `(i, j)` is the union of cell `(i, j)` plus three overlapping `(s - 1) x (s - 1)` squares anchored at `(i - 1, j)`, `(i, j - 1)`, and `(i - 1, j - 1)`. Those three sub-squares together cover every single cell of the `s x s` region except `(i, j)` itself! If any one of the three neighbors is limited to a smaller side length by a nearby `'0'`, that same `'0'` blocks `(i, j)` from forming a larger square — so the bottleneck (`Math.min`) determines the exact maximum side length.

---

## Dry Run

Tracing Example 1 (`4 x 5` `matrix`). Below is the computed `dp[1..4][1..5]` table of side lengths:

```text
Input matrix:          Computed dp[1..4][1..5]:
1 0 1 0 0              1 0 1 0 0
1 0 1 1 1              1 0 1 1 1
1 1 1 1 1              1 1 1 2 2
1 0 0 1 0              1 0 0 1 0
```

Key transitions where `mx` reaches `2`:
- At `(i = 2, j = 3)` (`matrix[2][3] == '1'`): top `dp[2][4] = 1`, left `dp[3][3] = 1`, top-left `dp[2][3] = 1` -> `min(1, 1, 1) + 1 = 2`, updating `mx = 2`.
- At `(i = 2, j = 4)` (`matrix[2][4] == '1'`): top `dp[2][5] = 1`, left `dp[3][4] = 2`, top-left `dp[2][4] = 1` -> `min(1, 2, 1) + 1 = 2` (`mx` stays `2`).
- Returns `mx * mx = 2 * 2 = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Each cell of the `m x n` matrix is visited once with `O(1)` arithmetic operations.
- **Space Complexity:** `O(m * n)` — The 2D table `dp` allocates `(m + 1) * (n + 1)` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [221maximal-square.java](./221maximal-square.java) |

---

## Key Learnings

- The `min(top, left, topLeft) + 1` DP pattern applies both to finding the largest square (`max` of side lengths) and counting all square submatrices of `'1'`s (`sum` of side lengths, LeetCode 1277).
- Padding a 2D DP grid to `(m + 1) x (n + 1)` removes special-case initialization loops for the first row and first column.
- Always double-check whether a geometry DP asks for **side length**, **perimeter**, or **area** (`mx * mx`) before returning.
