---
comments: true
difficulty: Medium
tags:
  - Math
  - Dynamic Programming
  - Combinatorics
---

# 62. Unique Paths

**[View Problem on LeetCode](https://leetcode.com/problems/unique-paths/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0062` (`62`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Combinatorics` |
| **Solution Language** | JavaScript |

---

## Problem Description

A robot starts at the **top-left corner** `(0, 0)` of an `m x n` grid and wants to reach the **bottom-right corner** `(m - 1, n - 1)`. At each step, the robot may move only **one cell down** or **one cell right**.

Given `m` and `n`, return the total number of distinct paths the robot can take to reach the bottom-right corner.

---

## Examples

### Example 1

```text
Input: m = 3, n = 7
Output: 28
```

### Example 2

```text
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

---

## Constraints

- `1 <= m, n <= 100`

---

## Problem Understanding

- **Acyclic Movement:** Moving strictly right (`j + 1`) or down (`i + 1`) means the robot can never revisit a cell or form a cycle—the grid forms a Directed Acyclic Graph (DAG).
- **Additive Path Counting:** Any path arriving at `(i, j)` must have come directly from either `(i - 1, j)` (moving down) or `(i, j - 1)` (moving right). Because those two sets of paths differ in their last step, they are completely disjoint, so `paths(i, j) = paths(i - 1, j) + paths(i, j - 1)`.
- **Boundary Rows/Columns:** Cells in row `0` can only be reached by moving continuously right (`1` path each), and cells in column `0` can only be reached by moving continuously down (`1` path each).

---

## Approach

### Brute Force Approach

Exploring every path from `(0, 0)` to `(m - 1, n - 1)` via plain unmemoized recursion (`dfs(i + 1, j) + dfs(i, j + 1)`) recomputes interior grid cells exponentially many times—taking `O(2^(m + n))` calls, which times out well before `m, n = 100`.

### Optimized Approach

Use **Bottom-Up 2D Dynamic Programming**: allocate an `m x n` table `f` initialized to `0` with base case `f[0][0] = 1`, iterate row-by-row and column-by-column adding `f[i - 1][j]` (when `i > 0`) and `f[i][j - 1]` (when `j > 0`), and return `f[m - 1][n - 1]`.

### Step-by-Step Thinking Process

1. Define `f[i][j]` as the number of unique paths from `(0, 0)` to `(i, j)`.
2. Initialize `f` as an `m x n` 2D array of `0`s and set the starting cell `f[0][0] = 1`.
3. Traverse `i` from `0` to `m - 1` and `j` from `0` to `n - 1` in row-major order so both `f[i - 1][j]` and `f[i][j - 1]` are already finalized before `(i, j)` is reached.
4. Guard boundary lookups cleanly: add `f[i - 1][j]` if `i > 0`, and add `f[i][j - 1]` if `j > 0` (leaving `f[0][0]` untouched at `1` since neither `i > 0` nor `j > 0` holds at `(0, 0)`).
5. Return `f[m - 1][n - 1]`.

### Algorithm / Intuition

In `uniquePaths(m, n)`:
- `Array(m).fill(0).map(() => Array(n).fill(0))` creates `m` independent length-`n` zero-filled arrays (avoiding the classic JS bug `Array(m).fill(Array(n).fill(0))` where all rows alias the same array reference!).
- Seeding `f[0][0] = 1` and using `+=` inside `if (i > 0)` and `if (j > 0)` handles the first row, first column, and interior cells uniformly in a single nested loop without needing separate initialization loops for row `0` and column `0`.

---

## Dry Run

**Input:** `m = 3`, `n = 7`

Tracing the 2D table `f` row by row after `f[0][0] = 1`:

| Row \ Col | `0` | `1` | `2` | `3` | `4` | `5` | `6` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`i = 0`** | `1` | `1` | `1` | `1` | `1` | `1` | `1` |
| **`i = 1`** | `1` | `2` | `3` | `4` | `5` | `6` | `7` |
| **`i = 2`** | `1` | `3` | `6` | `10` | `15` | `21` | **`28`** |

- At `(2, 6)`: `f[2][6] = f[1][6] + f[2][5] = 7 + 21 = 28`.
- **Output:** `f[2][6] = 28`

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Each of the `m * n` grid cells is visited once with `O(1)` additions.
- **Space Complexity:** `O(m * n)` — The 2D DP array `f` stores `m * n` numbers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [62unique-paths.js](./62unique-paths.js) |

---

## Key Learnings

- In JavaScript, always initialize 2D DP grids using `.map(() => Array(n).fill(0))` so every row gets a distinct array instance.
- Using `f[0][0] = 1` with additive `+=` guards (`i > 0`, `j > 0`) unifies boundary initialization and general DP transitions into one loop.
- Notice the DP table values form Pascal's Triangle! Mathematically, any path makes `m - 1` Down moves and `n - 1` Right moves in some order, giving binomial coefficient `C(m + n - 2, m - 1)`, and DP space can also be rolled into a 1D `O(n)` array.
