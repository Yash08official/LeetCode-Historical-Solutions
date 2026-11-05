---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 174. Dungeon Game

**[View Problem on LeetCode](https://leetcode.com/problems/dungeon-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0174` (`174`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

A dungeon is represented as an `m x n` 2D grid of integers. A knight starts in the top-left room `(0, 0)` with some positive initial health and must reach the princess in the bottom-right room `(m - 1, n - 1)` by moving **only rightward or downward**.

Entering room `(i, j)` adds `dungeon[i][j]` to the knight's current health (negative values inflict damage, `0` leaves health unchanged, and positive values heal). If the knight's health ever drops to **`0` or below** at any room—including `(0, 0)` or `(m - 1, n - 1)`—the knight dies immediately. Return the **minimum positive initial health** required to rescue the princess.

---

## Examples

### Example 1

```text
Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7
Explanation: The initial health of the knight must be at least 7 if he follows the optimal path: RIGHT-> RIGHT -> DOWN -> DOWN.
```

### Example 2

```text
Input: dungeon = [[0]]
Output: 1
```

---

## Constraints

- `m == dungeon.length`

- `n == dungeon[i].length`

- `1 <= m, n <= 200`

- `-1000 <= dungeon[i][j] <= 1000`

---

## Problem Understanding

- **Why Top-Down Forward DP Fails:** Moving forward from `(0, 0)`, maximizing current health is **not** equivalent to minimizing initial health—a path with lower current health might have suffered a smaller early dip, whereas a path with huge healing orbs at the end does not save a knight who already died at `(0, 1)`!
- **Backward Optimal Substructure:** Working **backward** from `(m - 1, n - 1)` to `(0, 0)` eliminates history dependence: at room `(i, j)`, we only care about the minimum health `dp[i][j]` needed *right before entering* `(i, j)` to survive from `(i, j)` to the end.
- **Strict Positivity Floor (`>= 1`):** Even if a room contains a massive healing orb (e.g., `+30`) that covers all future damage, the knight must still arrive at `(i, j)` alive with **at least `1` HP** (`dp[i][j] >= 1`).

---

## Approach

### Brute Force Approach

Exploring all `(m + n - 2 choose m - 1)` right/down paths from `(0, 0)` to `(m - 1, n - 1)` via DFS while tracking running health and minimum prefix health takes exponential `O(2^{m + n})` time, which is infeasible for `200 x 200` grids.

### Optimized Approach

Use **Bottom-Up 2D Dynamic Programming** iterating backward from `(m - 1, n - 1)` to `(0, 0)` on a padded `(m + 1) x (n + 1)` table `dp`, where `dp[i][j] = Math.max(1, Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j])`.

### Step-by-Step Thinking Process

1. Define `dp[i][j]` as the minimum health required upon arriving at cell `(i, j)` (before applying `dungeon[i][j]`) to reach `(m - 1, n - 1)` alive.
2. To survive leaving `(i, j)`, the knight picks the easier next step: `needNext = Math.min(dp[i + 1][j], dp[i][j + 1])`.
3. After entering `(i, j)` with health `H`, the knight's health becomes `H + dungeon[i][j]`, which must be both `>= 1` (survive `(i, j)`) and `>= needNext` (survive the rest of the journey). Rearranging gives `H >= Math.max(1, needNext - dungeon[i][j])`.
4. Allocate `dp` of size `(m + 1) x (n + 1)` filled with infinity (`1 << 30`) so out-of-bounds right/bottom borders are ignored by `Math.min`.
5. Seed the two virtual cells adjacent to the princess—`dp[m][n - 1] = 1` and `dp[m - 1][n] = 1`—so `(m - 1, n - 1)` naturally computes `Math.max(1, 1 - dungeon[m - 1][n - 1])` without special-case `if` branches!

### Algorithm / Intuition

Padding `dp` to `(m + 1) x (n + 1)` with sentinel value `1 << 30` (`1,073,741,824`, large enough to exceed maximum possible damage `400 * 1000` without overflowing when subtracting `-1000`) makes the inner transition completely uniform. Setting `dp[m][n - 1] = dp[m - 1][n] = 1` tells the princess's cell `(m - 1, n - 1)` that the knight needs at least `1` HP remaining *after* surviving `(m - 1, n - 1)`. Clamping every state with `Math.max(1, ...)` prevents surplus future healing from artificially reducing earlier health requirements—because future healing cannot resurrect a knight who died earlier!

---

## Dry Run

Trace on **Example 1**: `dungeon = [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]` (`m = 3, n = 3`)

Virtual borders start at `1 << 30` except `dp[3][2] = 1` and `dp[2][3] = 1`.

- **Row `i = 2` (right to left):**
  - `(2, 2)` (`-5`): `max(1, min(1, 1) - (-5)) = 6`
  - `(2, 1)` (`30`): `max(1, min(inf, 6) - 30) = max(1, -24) = 1`
  - `(2, 0)` (`10`): `max(1, min(inf, 1) - 10) = max(1, -9) = 1`
- **Row `i = 1` (right to left):**
  - `(1, 2)` (`1`): `max(1, min(6, inf) - 1) = 5`
  - `(1, 1)` (`-10`): `max(1, min(1, 5) - (-10)) = 11`
  - `(1, 0)` (`-5`): `max(1, min(1, 11) - (-5)) = 6`
- **Row `i = 0` (right to left):**
  - `(0, 2)` (`3`): `max(1, min(5, inf) - 3) = 2`
  - `(0, 1)` (`-3`): `max(1, min(11, 2) - (-3)) = 5`
  - `(0, 0)` (`-2`): `max(1, min(6, 5) - (-2)) = 7`

Return `dp[0][0] = 7`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Initializing and filling the `(m + 1) x (n + 1)` DP table visits each grid cell once in `O(1)` time.
- **Space Complexity:** `O(m * n)` — The 2D integer array `dp[m + 1][n + 1]` uses `(m + 1) * (n + 1)` integers (reducible to `O(n)` with a 1D rolling array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [174dungeon-game.java](./174dungeon-game.java) |

---

## Key Learnings

- When forward paths depend on two conflicting metrics (current sum AND minimum prefix dip), try reversing the DP direction from destination back to source.
- Setting virtual exit sentinels `dp[m][n - 1] = dp[m - 1][n] = 1` around an infinity-padded DP table eliminates all boundary `if/else` clutter.
- Choose infinity constants carefully (`1 << 30` instead of `Integer.MAX_VALUE`) so subtracting negative numbers (`- (-1000)`) cannot cause signed integer overflow.
