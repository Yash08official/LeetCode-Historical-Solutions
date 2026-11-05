---
comments: true
difficulty: Medium
tags:
  - Array
  - Matrix
  - Prefix Sum
---

# 2017. Grid Game

**[View Problem on LeetCode](https://leetcode.com/problems/grid-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2017` (`2017`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Matrix`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Two robots play a game on a **0-indexed** `2 x n` grid of positive integers, where `grid[r][c]` is the point value at cell `(r, c)`. Both robots start at `(0, 0)`, must finish at `(1, n - 1)`, and can only step **right** or **down**.

1. **First robot** travels from `(0, 0)` to `(1, n - 1)` and sets every cell along its path to `0`.
2. **Second robot** then travels from `(0, 0)` to `(1, n - 1)` and collects the sum of remaining points along its path.

The first robot plays to **minimize** the second robot's score, while the second robot plays to **maximize** its own score. Assuming optimal play from both robots, return the points collected by the **second** robot.

---

## Examples

### Example 1

```text
Input: grid = [[2,5,4],[1,5,1]]
Output: 4
Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
The cells visited by the first robot are set to 0.
The second robot will collect 0 + 0 + 4 + 0 = 4 points.
```

### Example 2

```text
Input: grid = [[3,3,1],[8,5,2]]
Output: 4
Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
The cells visited by the first robot are set to 0.
The second robot will collect 0 + 3 + 1 + 0 = 4 points.
```

### Example 3

```text
Input: grid = [[1,3,1,15],[1,3,3,1]]
Output: 7
Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
The cells visited by the first robot are set to 0.
The second robot will collect 0 + 1 + 3 + 3 + 0 = 7 points.
```

---

## Constraints

- `grid.length == 2`

- `n == grid[r].length`

- `1 <= n <= 5 * 10^4`

- `1 <= grid[r][c] <= 10^5`

---

## Problem Understanding

- **Critical Mistake to Avoid:** Robot 1 is **NOT** trying to maximize its own points! Example 3 (`[[1,3,1,15],[1,3,3,1]]`) proves that greedily maximizing Robot 1's sum leaves a huge path open for Robot 2.
- Because the grid only has **2 rows** and robots can only move **right** or **down**, any valid path from `(0, 0)` to `(1, n - 1)` is completely determined by the **single column `j` (`0 <= j < n`) where the robot steps down** from row `0` to row `1`!
- When Robot 1 steps down at column `j`, it zeroes out `grid[0][0..j]` and `grid[1][j..n-1]`. The remaining non-zero cells form **two completely separate regions**:
  - Top-right suffix: `grid[0][j + 1 .. n - 1]` (sum `s1`)
  - Bottom-left prefix: `grid[1][0 .. j - 1]` (sum `s2`)
- Once Robot 2 steps down at column `0`, it gets all of `s2` (and `0` from `s1`); if Robot 2 stays on row `0` until column `n - 1`, it gets all of `s1` (and `0` from `s2`); stepping down anywhere in between gets strictly less than or equal to one of those extremes! Thus Robot 2's optimal score for a given `j` is simply `max(s1, s2)`!

---

## Approach

### Brute Force Approach

Trying all `n` turn-down columns `j` for Robot 1 and, for each `j`, simulating all `n` turn-down columns `k` for Robot 2 by summing `2n` cells takes `O(n^3)` (or `O(n^2)` with prefix sums), which times out for `n = 5 * 10^4` (`2.5 * 10^9` operations).

### Optimized Approach

Maintain running `long` sums `s1` (initially the sum of all `grid[0]`) and `s2` (initially `0`). Sweep Robot 1's turn-down column `j` from `0` to `n - 1`: subtract `grid[0][j]` from `s1`, update `ans = Math.min(ans, Math.max(s1, s2))`, and add `grid[1][j]` to `s2` for the next column.

### Step-by-Step Thinking Process

1. Use `long` for all sums (`s1`, `s2`, `ans = Long.MAX_VALUE`) because `5 * 10^4 * 10^5 = 5 * 10^9` overflows 32-bit `int`.
2. Precompute `s1` as the total sum of row `0`; initialize `s2 = 0`.
3. Iterate `j` from `0` to `n - 1`, representing Robot 1 turning down at column `j`.
4. At column `j`, `grid[0][j]` becomes zeroed out by Robot 1, so update `s1 -= grid[0][j]` first (`s1` is now `sum(grid[0][j+1..n-1])`, while `s2` is `sum(grid[1][0..j-1])`).
5. Robot 2 collects `Math.max(s1, s2)`, so Robot 1 updates `ans = Math.min(ans, Math.max(s1, s2))`, and then `s2 += grid[1][j]` prepares `s2` for `j + 1`.

### Algorithm / Intuition

In `gridGame`, `s1` and `s2` act as sliding suffix/prefix accumulators in `O(1)` space without needing extra prefix-sum arrays. Before testing turn-down column `j`, `s2` holds `grid[1][0] + ... + grid[1][j - 1]`. Subtracting `grid[0][j]` from `s1` leaves `grid[0][j + 1] + ... + grid[0][n - 1]` in `s1`. Thus `Math.max(s1, s2)` is the exact best score Robot 2 can force if Robot 1 drops down at column `j`. Taking `Math.min` across all `0 <= j < n` solves the minimax game in a single linear scan.

---

## Dry Run

Tracing Example 1: `grid = [[2, 5, 4], [1, 5, 1]]` (`n = 3`, initial `s1 = 2 + 5 + 4 = 11`, `s2 = 0`, `ans = Long.MAX_VALUE`):

| `j` (Robot 1 drops at `j`) | `s1 -= grid[0][j]` (Top-Right left) | `s2` (Bottom-Left left) | Robot 2 Best `max(s1, s2)` | `ans` After `min` | `s2 += grid[1][j]` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `11 - 2 = 9` | `0` | `max(9, 0) = 9` | `9` | `0 + 1 = 1` |
| `1` | `9 - 5 = 4` | `1` | `max(4, 1) = 4` | `4` | `1 + 5 = 6` |
| `2` | `4 - 4 = 0` | `6` | `max(0, 6) = 6` | `4` | `6 + 1 = 7` |

Returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — One pass over `grid[0]` to sum `s1` plus one pass of length `n` sweeping column `j`.
- **Space Complexity:** `O(1)` — Uses only scalar `long` variables (`ans`, `s1`, `s2`) without allocating prefix arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2017grid-game.java](./2017grid-game.java) |

---

## Key Learnings

- In minimax games, **never confuse 'minimizing the opponent's score' with 'maximizing your own score'**—always write down the exact payoff function of the second player!
- On a `2 x n` right/down grid, every path has a **single vertical transition**, reducing an apparent DP problem into a 1D split-point sweep with running prefix/suffix sums.
