---
comments: true
difficulty: Hard
tags:
  - Array
  - Backtracking
  - Algorithm X
---

# 51. N-Queens

**[View Problem on LeetCode](https://leetcode.com/problems/n-queens/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0051` (`51`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Backtracking`, `Algorithm X` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, solve the **n-queens puzzle**: place `n` chess queens on an `n x n` board so that no two queens attack each other along any row, column, or diagonal.

Return **all distinct valid board configurations** in any order. Represent each configuration as a list of `n` strings of length `n`, using `'Q'` for a queen and `'.'` for an empty square.

---

## Examples

### Example 1

```text
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
```

### Example 2

```text
Input: n = 1
Output: [["Q"]]
```

---

## Constraints

- `1 <= n <= 9`

---

## Problem Understanding

- **One Queen Per Row:** Since two queens in the same row immediately attack each other and `n` queens must occupy `n` rows, every valid board places **exactly one** queen in each row `0, 1, ..., n - 1`.
- **Diagonal Invariants:**
  - All squares on the same anti-diagonal (`/` direction, top-right to bottom-left) share the same sum `i + j` (ranging from `0` to `2n - 2`).
  - All squares on the same main diagonal (`\` direction, top-left to bottom-right) share the same difference `i - j`—shifted by `+n` as `n - i + j` so indices stay non-negative in `[1, 2n - 1]`.
- **Small Constraint (`1 <= n <= 9`):** Backtracking with `O(1)` conflict arrays explores the valid search space very rapidly (`9` queens has only `352` valid solutions).

---

## Approach

### Brute Force Approach

A naive combinatorial search tries choosing any `n` squares out of the `n^2` board cells (`C(n^2, n)` combinations—over `1.9 * 10^11` for `n = 9`) and checks pairwise queen attacks. Even if restricted to one queen per row (`n^n` states), scanning the board upward along columns and diagonals in `O(n)` at every candidate cell adds avoidable overhead compared to `O(1)` direct-indexed lookup arrays.

### Optimized Approach

Use **row-by-row DFS Backtracking with `O(1)` conflict-tracking arrays**: place one queen in row `i` at a time, testing column `col[j]`, anti-diagonal `dg[i + j]`, and main diagonal `udg[n - i + j]` in constant time before recursing to row `i + 1`.

### Step-by-Step Thinking Process

1. Fix one queen per row by making recursive level `i` correspond to choosing a column `j` in row `i`.
2. Initialize an `n x n` string grid `g` filled with `"."` so board updates during backtracking are simple `O(1)` cell assignments.
3. Track occupied lines using three integer flag arrays: `col` of size `n`, `dg` of size `2n` (`n << 1`), and `udg` of size `2n` (`n << 1`).
4. At cell `(i, j)`, since each flag is `0` (free) or `1` (occupied), `col[j] + dg[i + j] + udg[n - i + j] == 0` concisely confirms all three lines are free.
5. When `i == n`, all `n` rows have conflict-free queens; join each row `g[j]` with `String.join("", g[j])` and save the board to `ans`.

### Algorithm / Intuition

In `solveNQueens(int n)`:
- `col = new int[n]`, `dg = new int[n << 1]`, and `udg = new int[n << 1]` allocate `O(n)` line-occupancy tables.
- `g = new String[n][n]` is pre-filled row-by-row with `"."`.
- Inside `dfs(int i)`:
  - **Base Case (`i == n`):** Every row `0..n-1` has a safely placed queen. A snapshot `List<String> t` is built by joining each row `g[j]` into a string of length `n` and added to `ans`.
  - **Recursive Step:** Loops column `j` from `0` to `n - 1`. If `col[j] + dg[i + j] + udg[n - i + j] == 0`, sets `g[i][j] = "Q"`, marks all three flags as `1`, calls `dfs(i + 1)`, and restores the flags to `0` and `g[i][j] = "."` upon return.

---

## Dry Run

**Input:** `n = 4`

Tracing `dfs(0)` on a `4 x 4` board:
- **Try `i = 0, j = 0` (`Q` at `(0, 0)`):**
  - `dfs(1)`: `j = 0, 1` conflict; tries `j = 2` (`(1, 2)`) -> `dfs(2)`: all columns `0..3` conflict! Backtracks.
  - `dfs(1)`: tries `j = 3` (`(1, 3)`) -> `dfs(2)` tries `j = 1` (`(2, 1)`) -> `dfs(3)`: all columns `0..3` conflict! Backtracks `(0, 0)` completely.
- **Try `i = 0, j = 1` (`Q` at `(0, 1)`):**
  - `dfs(1)` picks `j = 3` (`(1, 3)`) -> `dfs(2)` picks `j = 0` (`(2, 0)`) -> `dfs(3)` picks `j = 2` (`(3, 2)`).
  - `dfs(4)` reached! Adds Board 1: **`[".Q..", "...Q", "Q...", "..Q."]`**.
- **Try `i = 0, j = 2` (`Q` at `(0, 2)`):**
  - Symmetrically places queens at `(0, 2)`, `(1, 0)`, `(2, 3)`, `(3, 1)`.
  - `dfs(4)` reached! Adds Board 2: **`["..Q.", "Q...", "...Q", ".Q.."]`**.
- **Try `i = 0, j = 3`:** All branches dead-end and backtrack.

**Output:** `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`

---

## Complexity Analysis

- **Time Complexity:** `O(n!)` — Row `0` branches at most `n` ways, row `1` at most `n - 1` ways, row `2` at most `n - 2` ways (tightened further by diagonal pruning), with `O(1)` conflict checks per candidate and `O(n^2)` string building only at valid leaf solutions.
- **Space Complexity:** `O(n^2)` auxiliary space — The working board `String[][] g` uses `O(n^2)` memory, while the recursion call stack and conflict arrays (`col`, `dg`, `udg`) use `O(n)` space (excluding the output list `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [51n-queens.java](./51n-queens.java) |

---

## Key Learnings

- Encoding diagonals with linear invariants (`i + j` and `n - i + j`) turns 2D ray-casting checks into `O(1)` array lookups.
- Constraining search structure upfront (1 queen per row via recursion parameter `i`) collapses the raw search space from `C(n^2, n)` to at most `n!` before diagonal pruning even begins.
- Since `col[j]`, `dg[...]`, and `udg[...]` only hold `0` or `1`, summing them (`== 0`) is an idiomatic equivalent to chaining three boolean checks.
