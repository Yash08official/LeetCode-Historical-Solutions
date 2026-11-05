---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Breadth-First Search
  - Knapsack Problem
  - Complete Knapsack
---

# 322. Coin Change

**[View Problem on LeetCode](https://leetcode.com/problems/coin-change/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0322` (`322`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Breadth-First Search`, `Knapsack Problem`, `Complete Knapsack` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `coins` of distinct coin denominations and a target integer `amount`. Assuming an unlimited supply of each denomination, return the **minimum number of coins** required to sum exactly to `amount`, or `-1` if no combination of coins can produce `amount`.

---

## Examples

### Example 1

```text
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

### Example 2

```text
Input: coins = [2], amount = 3
Output: -1
```

### Example 3

```text
Input: coins = [1], amount = 0
Output: 0
```

---

## Constraints

- `1 <= coins.length <= 12`

- `1 <= coins[i] <= 2^31 - 1`

- `0 <= amount <= 10^4`

---

## Problem Understanding

- Greedy selection (repeatedly picking the largest coin `<= remaining`) fails on general coin systems—for instance, `coins = [1, 3, 4]` and `amount = 6` greedily picks `4 + 1 + 1` (`3` coins) instead of `3 + 3` (`2` coins).
- Because each denomination can be used arbitrarily many times, this is the classic **Unbounded (Complete) Knapsack** optimization problem.
- `amount = 0` requires `0` coins, while unreachable amounts must be distinguished cleanly and mapped to `-1`.

---

## Approach

### Brute Force Approach

Recursively trying every coin count `0 .. amount / coins[i]` for each denomination explores up to `O(amount^m)` combinations without memoization, timing out rapidly when `amount` reaches `10^4`.

### Optimized Approach

Use bottom-up 2D Complete Knapsack Dynamic Programming with table `f[m + 1][n + 1]`, where `f[i][j]` is the minimum coins needed to form sum `j` using only the first `i` coin types, initialized to sentinel `inf = 1 << 30` with `f[0][0] = 0`.

### Step-by-Step Thinking Process

1. Set `m = coins.length`, `n = amount`, and sentinel `inf = 1 << 30` (large enough to exceed `amount <= 10^4`, yet small enough that `inf + 1` never overflows signed 32-bit `int`).
2. Allocate `int[][] f = new int[m + 1][n + 1]`, fill all rows with `inf`, and set base case `f[0][0] = 0` (`0` coins make sum `0`).
3. For each coin index `i` from `1` to `m` (denomination `c = coins[i - 1]`) and each target sum `j` from `0` to `n`:
4. First copy `f[i][j] = f[i - 1][j]` (skipping coin `i`). Then, if `j >= coins[i - 1]`, transition from the **same row** `i`: `f[i][j] = Math.min(f[i][j], f[i][j - coins[i - 1]] + 1)` so coin `i` can be reused multiple times.
5. Return `-1` if `f[m][n] >= inf`, otherwise return `f[m][n]`.

### Algorithm / Intuition

In 0/1 Knapsack (each item used at most once), picking item `i` looks up `f[i - 1][j - c]`. In **Complete Knapsack** (infinite copies), picking at least one copy of coin `i` leaves remaining sum `j - c` where coin `i` is *still* eligible to be used again—so the transition reads from the **current row** `f[i][j - c] + 1` as `j` increases from `0` to `n`!

---

## Dry Run

Tracing **Example 1** (`coins = [1, 2, 5]`, `amount = 11`):

- Row `0`: `f[0] = [0, inf, inf, ..., inf]`.
- Row `1` (`coin = 1`): `f[1][j] = j` for `j = 0..11` -> `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]`.
- Row `2` (`coin = 2`): updates `j >= 2` using `f[2][j - 2] + 1` -> `[0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6]`.
- Row `3` (`coin = 5`): copies `f[2]` for `j < 5`, then:
  - `f[3][5] = min(3, f[3][0] + 1) = 1`
  - `f[3][6] = min(3, f[3][1] + 1) = 2`
  - `f[3][10] = min(5, f[3][5] + 1) = 2`
  - `f[3][11] = min(6, f[3][6] + 1) = min(6, 2 + 1) = 3`.
- `f[3][11] = 3 < inf` -> returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * amount)` — Two nested loops fill `m * (amount + 1)` states (where `m = coins.length`) in `O(1)` time per state.
- **Space Complexity:** `O(m * amount)` — The 2D DP array `f` allocates `(m + 1) * (amount + 1)` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [322coin-change.java](./322coin-change.java) |

---

## Key Learnings

- Using `inf = 1 << 30` instead of `Integer.MAX_VALUE` safely prevents integer wraparound on expressions like `f[i][j - c] + 1`.
- Reading from `f[i][j - c]` (current row) instead of `f[i - 1][j - c]` (previous row) is the exact distinction between unbounded and 0/1 knapsack.
- Because `f[i][j]` only reads `f[i - 1][j]` and `f[i][j - c]`, this 2D table can also be compressed into a single 1D array `int[amount + 1]` in `O(amount)` space.
