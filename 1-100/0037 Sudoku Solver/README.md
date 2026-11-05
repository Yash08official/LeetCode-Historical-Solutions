---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Backtracking
  - Matrix
  - Algorithm X
  - Dancing Links
---

# 37. Sudoku Solver

**[View Problem on LeetCode](https://leetcode.com/problems/sudoku-solver/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0037` (`37`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Backtracking`, `Matrix`, `Algorithm X`, `Dancing Links` |
| **Solution Language** | Java |

---

## Problem Description

Write a program to solve a `9 x 9` Sudoku puzzle **in-place** by filling every empty cell (`'.'`) with a digit from `'1'` to `'9'` such that:

1. Every row contains each digit `1–9` exactly once.
2. Every column contains each digit `1–9` exactly once.
3. Each of the nine `3 x 3` sub-boxes contains each digit `1–9` exactly once.

It is guaranteed that the given input board has a unique valid solution.

---

## Examples

### Example 1

```text
Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:
```

---

## Constraints

- `board.length == 9`

- `board[i].length == 9`

- `board[i][j]` is a digit or `'.'`.

- It is **guaranteed** that the input board has only one solution.

---

## Problem Understanding

- **Exact constraint satisfaction:** Every empty cell has at most 9 candidate digits (`'1'..'9'`), restricted immediately by digits already present in its row, column, and `3 x 3` block.
- **Pre-indexing empty cells:** Collecting all `'.'` coordinates into a list `t` upfront avoids rescanning the `9 x 9` grid at every recursive step to look for the next empty slot.
- **Stopping on first solution:** Once all `t.size()` empty cells are filled, we must halt further search without overwriting the solved digits stored in `board`.

---

## Approach

### Brute Force Approach

Trying all `9^E` digit assignments across `E` empty cells and checking board validity only at the end (or scanning 27 peers linearly on every placement instead of `O(1)` lookup tables) wastes massive time exploring dead-end configurations.

### Optimized Approach

The implemented Java solution uses **constraint-tracked DFS backtracking** (`dfs(k)`). An initial scan records pre-filled digits in `row[9][9]`, `col[9][9]`, and `block[3][3][9]`, and packs each empty cell's flattened index `i * 9 + j` into `List<Integer> t`. `dfs(k)` decodes `(i, j)` for the `k`-th empty cell, tries digits `v = 0..8` that satisfy `!row[i][v] && !col[j][v] && !block[i / 3][j / 3][v]`, recurses to `dfs(k + 1)`, and exits immediately once `ok` becomes `true`.

### Step-by-Step Thinking Process

1. Maintain state tables `row[9][9]`, `col[9][9]`, `block[3][3][9]`, flattened empty-cell list `t`, and completion flag `boolean ok`.
2. Scan `board`: if `board[i][j] == '.'`, add `i * 9 + j` to `t`; otherwise set `v = board[i][j] - '1'` and mark `row[i][v] = col[j][v] = block[i / 3][j / 3][v] = true`.
3. Call `dfs(0)`. Base case: when `k == t.size()`, every empty cell has been validly filled—set `ok = true` and return.
4. Decode `i = t.get(k) / 9` and `j = t.get(k) % 9`. Loop candidate digit `v` from `0` to `8`: if `v` is unused in `row[i]`, `col[j]`, and `block[i / 3][j / 3]`, mark all three `true`, write `board[i][j] = (char) (v + '1')`, call `dfs(k + 1)`, and unmark the three booleans `false`.
5. Check `if (ok) return;` right after each recursive attempt so the solved `board[i][j]` characters remain intact as the call stack unwinds.

### Algorithm / Intuition

Notice two subtle, clever details in `solution_code`: first, encoding empty coordinates as a single integer `i * 9 + j` in `t` avoids allocating `int[]` pairs and decodes in `O(1)` via `/ 9` and `% 9`. Second, inside `dfs(k)`, `board[i][j]` is overwritten on each valid trial `(char) (v + '1')` without needing to reset `board[i][j] = '.'` on backtrack, because boolean tables `row`, `col`, and `block` (not `board`!) govern constraint checks, and checking `if (ok) return;` immediately preserves the winning assignment across all `t.size()` cells!

---

## Dry Run

Tracing the start of Example 1:

1. **Initialization:** Pre-filled digits mark `row`, `col`, and `block` (e.g. row `0` has `'5'`, `'3'`, `'7'`, so `row[0]` marks indices `4, 2, 6`). `t` collects all `51` empty cells starting with `t.get(0) = 2` (`(0, 2)`), `t.get(1) = 3` (`(0, 3)`), etc.
2. **`dfs(0)` at `(0, 2)` (`block[0][0]`):**
   - `v = 0` (`'1'`): `col[2]` free, `row[0]` free, `block[0][0]` free -> places `'1'` at `board[0][2]`, calls `dfs(1)`.
   - Downstream conflicts force `dfs(1)` to backtrack (`ok` remains `false`), unmarking `v = 0`.
   - `v = 1` (`'2'`): placed at `board[0][2]`, `dfs(1)` eventually backtracks.
   - `v = 2` (`'3'`): skipped (`row[0][2]` is `true`).
   - `v = 3` (`'4'`): free in `row[0]`, `col[2]`, `block[0][0]` -> places `'4'` at `board[0][2]`, recurses down to `k == 51` where `ok = true` is set, and every frame hits `if (ok) return;`, leaving `board[0][2] = '4'` and the entire solved grid in place.

---

## Complexity Analysis

- **Time Complexity:** `O(9^E)` worst-case bound (where `E <= 81` is the number of empty cells in `t`), though `O(1)` row/column/block pruning eliminates the vast majority of branches in practice.
- **Space Complexity:** `O(1)` — Bounded by the fixed `9 x 9` grid: `row`, `col`, and `block` hold `243` booleans, and `t` plus the `dfs` recursion stack have depth `E <= 81`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [37sudoku-solver.java](./37sudoku-solver.java) |

---

## Key Learnings

- Pre-collecting empty cell indices `i * 9 + j` in `t` turns 2D grid traversal during recursion into a clean 1D index `dfs(k)`.
- Driving validity checks purely from `row`, `col`, and `block` boolean arrays makes candidate testing `O(1)` instead of `O(27)`.
- When modifying an array in-place to hold the final answer, checking a global `if (ok) return;` flag before trying the next candidate prevents backtracking from erasing the solution.
