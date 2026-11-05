---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Matrix
---

# 36. Valid Sudoku

**[View Problem on LeetCode](https://leetcode.com/problems/valid-sudoku/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0036` (`36`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Determine whether a partially filled `9 x 9` Sudoku grid `board` is currently valid based **only** on its filled cells (`'1'` through `'9'`, with `'.'` representing empty cells):

1. No row may contain the same digit `1–9` more than once.
2. No column may contain the same digit `1–9` more than once.
3. None of the nine `3 x 3` sub-boxes may contain the same digit `1–9` more than once.

Note that a valid partially filled board does not have to be completely solvable.

---

## Examples

### Example 1

```text
Input: board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
```

### Example 2

```text
Input: board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
```

---

## Constraints

- `board.length == 9`

- `board[i].length == 9`

- `board[i][j]` is a digit `1-9` or `'.'`.

---

## Problem Understanding

- **Validation vs. solving:** We only check whether any already-placed digit violates row, column, or `3 x 3` sub-box uniqueness; we do not fill `'.'` cells.
- **Sub-box coordinate mapping:** Dividing row `i` (`0..8`) and column `j` (`0..8`) by `3` using integer division maps each cell `(i, j)` to sub-box row `i / 3` (`0..2`) and sub-box column `j / 3` (`0..2`), which flattens into a unique sub-box index `k = (i / 3) * 3 + (j / 3)` in `0..8`.

---

## Approach

### Brute Force Approach

A repetitive baseline runs three separate passes—first validating all 9 rows, then all 9 columns, then iterating over all 9 `3 x 3` sub-boxes with `HashSet<Character>` instances. While still bounded on a `9 x 9` grid, it traverses the board three times and incurs boxing/hashing overhead.

### Optimized Approach

The implemented Java solution validates the entire board in a **single `9 x 9` pass** using three flat `9 x 9` boolean lookup tables: `row[9][9]`, `col[9][9]`, and `sub[9][9]`. Each digit `c` maps to `num = c - '0' - 1` (`0..8`), and if `row[i][num]`, `col[j][num]`, or `sub[k][num]` is already `true`, it returns `false` immediately.

### Step-by-Step Thinking Process

1. Allocate `boolean[][] row = new boolean[9][9]`, `col = new boolean[9][9]`, and `sub = new boolean[9][9]` to record seen digits in `O(1)` array indexing.
2. Loop over every cell `(i, j)` for `0 <= i < 9` and `0 <= j < 9`. Skip empty cells (`if (c == '.') continue;`).
3. Convert character `'1'..'9'` into `0`-based index `num = c - '0' - 1`, and compute `3 x 3` box index `k = i / 3 * 3 + j / 3`.
4. If `row[i][num] || col[j][num] || sub[k][num]` is already `true`, a duplicate exists—return `false`.
5. Mark `row[i][num] = col[j][num] = sub[k][num] = true`. If all 81 cells pass without conflict, return `true`.

### Algorithm / Intuition

Because the character set is fixed to `'1'..'9'`, direct boolean array indexing (`c - '0' - 1`) replaces `HashSet` objects with contiguous stack-friendly `boolean[9][9]` arrays. The formula `k = i / 3 * 3 + j / 3` numbers the nine `3 x 3` boxes in row-major order (`0, 1, 2` across the top band; `3, 4, 5` across the middle band; `6, 7, 8` across the bottom band), allowing row, column, and box checks to happen simultaneously on a single visit to `board[i][j]`.

---

## Dry Run

Tracing Example 1 vs. Example 2 on the top-left `3 x 3` sub-box (`k = 0`):

- **Example 1:**
  - `(0, 0) = '5'` -> `num = 4, k = 0`: marks `row[0][4]`, `col[0][4]`, `sub[0][4] = true`.
  - `(0, 1) = '3'` -> `num = 2, k = 0`: marks `row[0][2]`, `col[1][2]`, `sub[0][2] = true`.
  - ... `(2, 1) = '9'`, `(2, 2) = '8'` -> `num = 7, k = 0`: marks `row[2][7]`, `col[2][7]`, `sub[0][7] = true`.
  - All 81 cells have no conflict -> returns `true`.
- **Example 2 (where `board[0][0]` is `'8'`):**
  - `(0, 0) = '8'` -> `num = 7, k = 0`: marks `row[0][7]`, `col[0][7]`, `sub[0][7] = true`.
  - Later at `(2, 2) = '8'` -> `num = 7, k = 0`: `sub[0][7]` is already `true`! Immediately returns `false`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Inspects at most `9 * 9 = 81` cells with `O(1)` array lookups per cell (or `O(N^2)` if generalized to an `N x N` Sudoku grid).
- **Space Complexity:** `O(1)` — Uses three fixed `9 x 9` boolean arrays (`243` booleans total).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [36valid-sudoku.java](./36valid-sudoku.java) |

---

## Key Learnings

- The integer-division expression `(i / 3) * 3 + (j / 3)` is the standard formula for mapping 2D Sudoku coordinates `(i, j)` to a `0..8` `3 x 3` box ID.
- Fixed-size boolean tables (`boolean[9][9]`) or 9-bit integer bitmasks (`int[9]`) are significantly faster and lighter than `Set<Character>` arrays for fixed-alphabet grid validation.
