---
comments: true
difficulty: Medium
tags:
  - Dynamic Programming
---

# 790. Domino and Tromino Tiling

**[View Problem on LeetCode](https://leetcode.com/problems/domino-and-tromino-tiling/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0790` (`790`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You have an unlimited supply of `2 x 1` domino tiles and L-shaped 3-cell tromino tiles (both rotatable). Given an integer `n`, compute the number of distinct ways to completely tile a `2 x n` board.

Return the count **modulo `10^9 + 7`**. Two tilings are considered distinct if there exists any pair of 4-directionally adjacent cells covered by a single tile in one tiling but by different tiles in the other.

---

## Examples

### Example 1

```text
Input: n = 3
Output: 5
Explanation: The five different ways are shown above.
```

### Example 2

```text
Input: n = 1
Output: 1
```

---

## Constraints

- `1 <= n <= 1000`

---

## Problem Understanding

- Sweeping across the `2 x n` board column by column from `1` to `n`, suppose columns `1 .. i - 1` are already completely covered. Column `i` itself has `2` cells (top and bottom), giving `2^2 = 4` possible coverage states in column `i`.
- Tracking all `4` profile states of column `i` makes every domino or tromino placement a clean local transition from column `i - 1` to column `i`.
- Since counts grow exponentially, intermediate additions must use `long` and take `% (10^9 + 7)` at every step.

---

## Approach

### Brute Force Approach

Backtracking cell-by-cell to place dominoes and trominoes in all orientations without memoizing column profiles explores exponentially many tilings (`O(2^n)` or worse), timing out long before `n = 1000`.

### Optimized Approach

Use **profile Dynamic Programming** across columns `1 .. n` with a 4-element state array `f` representing the four coverage bitmasks of the current column (`both covered`, `top only`, `bottom only`, `neither covered`), rolling states forward in `O(1)` space.

### Step-by-Step Thinking Process

1. Assume columns `1 .. i - 1` are completely tiled, and classify partial tilings up to column `i` into 4 coverage states: `f[0]` (both cells covered), `f[1]` (only top cell covered), `f[2]` (only bottom cell covered), and `f[3]` (neither cell covered).
2. For `g[0]` (column `i` fully covered): transition from `f[0]` via a vertical domino in column `i`, from `f[1]` or `f[2]` via an L-tromino filling column `i - 1`'s gap plus both cells of column `i`, or from `f[3]` via two horizontal dominoes spanning columns `i - 1` and `i` (`g[0] = f[0] + f[1] + f[2] + f[3]`).
3. For `g[1]` (only top cell of column `i` covered): place a horizontal top domino from `f[2]`, or place an L-tromino covering column `i - 1` plus the top of column `i` from `f[3]` (`g[1] = f[2] + f[3]`).
4. By vertical symmetry, `g[2] = f[1] + f[3]` (only bottom cell of column `i` covered), and `g[3] = f[0]` (leave column `i` completely empty when columns `1 .. i - 1` are fully covered).
5. Advance `f = g` across `i = 1 .. n` modulo `10^9 + 7`, then return `f[0]`.

### Algorithm / Intuition

In `numTilings(int n)`:
- Base state before column `1` (`i = 0`) is `f = {1, 0, 0, 0}`, representing `1` way to have a completely tiled `2 x 0` board with nothing protruding.
- On each iteration `i = 1 .. n`, a fresh `long[4]` array `g` computes the exact 4 profile counts for column `i` modulo `10^9 + 7`:
  - `g[0] = (f[0] + f[1] + f[2] + f[3]) % mod`
  - `g[1] = (f[2] + f[3]) % mod`
  - `g[2] = (f[1] + f[3]) % mod`
  - `g[3] = f[0]`
- After `n` columns, `f[0]` holds the exact number of tilings where columns `1 .. n` are completely covered with zero overhang.

---

## Dry Run

Trace on **Example 1**: `n = 3`.

| Step `i` | `f[0]` (Full) | `f[1]` (Top) | `f[2]` (Bottom) | `f[3]` (Empty) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Init (`0`) | `1` | `0` | `0` | `0` | Empty `2 x 0` board |
| `1` | `1` | `0` | `0` | `1` | `1` vertical domino (`f[0]=1`), or leave col 1 empty (`f[3]=1`) |
| `2` | `2` | `1` | `1` | `1` | `g[0]=1+0+0+1=2`; trominoes create `g[1]=1, g[2]=1` |
| `3` | `5` | `2` | `2` | `2` | `g[0]=2+1+1+1=5` complete `2 x 3` tilings |

Returns `(int) f[0] = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Runs `n` iterations, performing a fixed number of additions and modulo operations per column.
- **Space Complexity:** `O(1)` — Uses only constant-size 4-element `long` arrays (`f` and `g`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [790domino-and-tromino-tiling.java](./790domino-and-tromino-tiling.java) |

---

## Key Learnings

- Broken-profile (column bitmask) DP eliminates error-prone ad-hoc recurrence algebra by explicitly modeling each column's `2^R` boundary states.
- Using `long[]` prevents signed 32-bit overflow when summing four values up to `10^9 + 6` before taking `% mod`.
