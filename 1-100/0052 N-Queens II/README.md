---
comments: true
difficulty: Hard
tags:
  - Backtracking
  - Algorithm X
---

# 52. N-Queens II

**[View Problem on LeetCode](https://leetcode.com/problems/n-queens-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0052` (`52`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Backtracking`, `Algorithm X` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return the **total number of distinct solutions** to the **n-queens puzzle**—the number of ways to place `n` non-attacking queens on an `n x n` chessboard.

---

## Examples

### Example 1

```text
Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
```

### Example 2

```text
Input: n = 1
Output: 1
```

---

## Constraints

- `1 <= n <= 9`

---

## Problem Understanding

- **Count Only, No Board Output:** Unlike *51. N-Queens*, we only return an integer count. We do **not** need to maintain or serialize a 2D chessboard grid `g`, saving both memory and leaf-node string construction time.
- **Fixed Upper Bound (`1 <= n <= 9`):** Because `n <= 9`, `j < 10` and both `i + j` and `i - j + n` are strictly less than `20`, allowing pre-sized boolean arrays.
- **Line Attack Math:** Two cells `(i1, j1)` and `(i2, j2)` share an anti-diagonal iff `i1 + j1 == i2 + j2`, and share a main diagonal iff `i1 - j1 == i2 - j2` (shifted by `+n` to keep array indices `>= 1`).

---

## Approach

### Brute Force Approach

Generating full `List<List<String>>` board representations (as in Problem 51) just to return `.size()`, or testing all `n^n` row placements by scanning previously placed queens in `O(n)` per placement, wastes memory and CPU cycles on work that the integer return type never requires.

### Optimized Approach

Use **boardless DFS Backtracking with boolean bitset arrays**: place queens row-by-row (`i = 0..n-1`), checking `cols[j]`, `dg[i + j]`, and `udg[i - j + n]` in `O(1)` time, and simply increment an integer counter `++ans` whenever `i == n`.

### Step-by-Step Thinking Process

1. Drop the 2D board grid completely: the conflict state of previously placed queens is 100% captured by which columns, diagonals, and anti-diagonals are occupied.
2. Leverage constraint `n <= 9` to allocate compact `boolean[]` arrays: `cols = new boolean[10]`, `dg = new boolean[20]`, and `udg = new boolean[20]`.
3. In `dfs(i)`, if `i == n`, all `n` queens are validly placed—increment `++ans` in `O(1)` time and return.
4. Otherwise, iterate column `j` from `0` to `n - 1`, compute `a = i + j` and `b = i - j + n`, skip if `cols[j] || dg[a] || udg[b]`, otherwise mark `true`, recurse `dfs(i + 1)`, and reset to `false`.

### Algorithm / Intuition

In `totalNQueens(int n)`:
- Instance fields `cols`, `dg`, and `udg` track occupied columns, `/` anti-diagonals (`a = i + j`), and `\` main diagonals (`b = i - j + n`).
- Notice that for `0 <= i, j < n <= 9`, `a` lies in `[0, 16]` and `b` lies in `[1, 17]`, both safely inside length `20`.
- Each valid leaf (`i == n`) executes a single `++ans` instruction instead of `O(n^2)` string concatenations, making the recursion extremely lightweight.

---

## Dry Run

**Input:** `n = 4` (`ans = 0`)

1. `dfs(0)` tries `j = 0` (`cols[0]=T, dg[0]=T, udg[4]=T`):
   - `dfs(1)`: `j = 0` (`cols[0]`), `j = 1` (`udg[4]`) skipped; tries `j = 2` -> `dfs(2)` finds all `j = 0..3` blocked; tries `j = 3` -> `dfs(2)` picks `j = 1` -> `dfs(3)` finds all `j = 0..3` blocked. Backtracks `j = 0`.
2. `dfs(0)` tries `j = 1` (`cols[1]=T, dg[1]=T, udg[3]=T`):
   - `dfs(1)` picks `j = 3` -> `dfs(2)` picks `j = 0` -> `dfs(3)` picks `j = 2` -> `dfs(4)` hits `i == n`, **`ans` becomes `1`**!
3. `dfs(0)` tries `j = 2` (`cols[2]=T, dg[2]=T, udg[2]=T`):
   - `dfs(1)` picks `j = 0` -> `dfs(2)` picks `j = 3` -> `dfs(3)` picks `j = 1` -> `dfs(4)` hits `i == n`, **`ans` becomes `2`**!
4. `dfs(0)` tries `j = 3`: all branches blocked and backtrack.

**Output:** `2`

---

## Complexity Analysis

- **Time Complexity:** `O(n!)` — At row `0` there are `n` column choices, at row `1` at most `n - 1`, at row `2` at most `n - 2`, and diagonal constraints prune most remaining branches early, with `O(1)` work per node.
- **Space Complexity:** `O(n)` — Recursion stack depth reaches `n` frames, and the boolean lookup arrays (`cols`, `dg`, `udg`) scale linearly with maximum board size (`O(1)` fixed size for `n <= 9`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [52n-queens-ii.java](./52n-queens-ii.java) |

---

## Key Learnings

- When a counting problem asks only for the *number* of valid configurations rather than the configurations themselves, strip away candidate construction (`String[][]`) and maintain only the minimal constraint state.
- Both `n - i + j` (Problem 51) and `i - j + n` (Problem 52) map main diagonals bijectively into `[1, 2n - 1]`; either orientation works as long as it is used consistently.
- For even tighter constant factors, the three `boolean[]` arrays can be packed into three 32-bit integer bitmasks since `2n < 32`.
