---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Matrix
---

# 1975. Maximum Matrix Sum

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-matrix-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1975` (`1975`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `n x n` integer grid `matrix`. You may perform the following operation as many times as you like:

- Pick any **two orthogonally adjacent** cells (sharing a common edge) and multiply **both** values by `-1`.

Return the **maximum possible sum** of all elements in `matrix` achievable after zero or more operations.

---

## Examples

### Example 1

```text
Input: matrix = [[1,-1],[-1,1]]
Output: 4
Explanation: We can follow the following steps to reach sum equals 4:
- Multiply the 2 elements in the first row by -1.
- Multiply the 2 elements in the first column by -1.
```

### Example 2

```text
Input: matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
Output: 16
Explanation: We can follow the following step to reach sum equals 16:
- Multiply the 2 last elements in the second row by -1.
```

---

## Constraints

- `n == matrix.length == matrix[i].length`

- `2 <= n <= 250`

- `-10^5 <= matrix[i][j] <= 10^5`

---

## Problem Understanding

- Flipping the signs of two cells simultaneously has three possibilities:
  1. Both negative (`-a, -b -> +a, +b`): negative count decreases by `2`.
  2. Both positive (`+a, +b -> -a, -b`): negative count increases by `2`.
  3. One negative, one positive (`-a, +b -> +a, -b`): negative count stays unchanged, **moving** the negative sign to the neighbor!
- **Crucial Invariant:** Because the grid is connected, we can walk any negative sign along a path of adjacent cells to **any cell in the matrix** without disturbing intermediate cells, and whenever two negative signs become adjacent, one operation eliminates **both**!
- Consequently:
  - If the initial count of negative numbers `cnt` is **even**, or if the matrix contains at least one **`0`** (which can absorb a single leftover `-` sign since `-0 = 0`), **every cell** can become `>= 0`!
  - If `cnt` is **odd** and no `0` exists, **exactly one** cell must remain negative—so we greedily park that single `-` sign on the cell with the **smallest absolute value** across the entire matrix!

---

## Approach

### Brute Force Approach

Searching over sequences of adjacent sign-flip operations on an `n x n` matrix (`n <= 250`, up to `62,500` cells) has `2^(n^2 - 1)` reachable sign configurations, making any graph/state-space search completely intractable.

### Optimized Approach

Make a single pass over `matrix` to compute `s` (sum of `Math.abs(v)` for all cells), `cnt` (count of strictly negative cells `v < 0`), and `mi` (minimum `Math.abs(v)` across all cells). Return `s` if `cnt % 2 == 0 || mi == 0`, and `s - 2 * mi` otherwise.

### Step-by-Step Thinking Process

1. Analyze how the operation affects the parity of negative elements: flipping two numbers changes the count of negatives by `-2`, `0`, or `+2`, so parity (`cnt % 2`) is invariant among non-zero cells.
2. Observe that if `0` is present (`mi == 0`), flipping `0` and an adjacent negative turns `-x, 0` into `+x, 0`, breaking parity and letting us eliminate even the last negative.
3. Track `long s = 0` (64-bit to prevent overflow since `250 * 250 * 10^5 = 6.25 * 10^9 > Integer.MAX_VALUE`), `cnt` (number of `v < 0`), and `mi` (minimum `|v|`).
4. If `cnt % 2 == 0 || mi == 0`, return `s`.
5. Otherwise, one element of magnitude `mi` must be `-mi` instead of `+mi`. Since `+mi` was already included in `s`, return `s - mi * 2`.

### Algorithm / Intuition

In `maxMatrixSum`, nested enhanced-for loops visit every integer `v` in `matrix`. We optimistically add `Math.abs(v)` to `long s` as if every cell will end up positive, update `mi = Math.min(mi, Math.abs(v))`, and increment `cnt` whenever `v < 0`. Note that if `0` appears anywhere in `matrix`, `mi` becomes `0` (so `s - mi * 2` would equal `s` anyway, and `mi == 0` explicitly returns `s`). When `cnt` is odd and `mi > 0`, flipping our best candidate from `+mi` to `-mi` reduces the optimistic sum `s` by `mi - (-mi) = 2 * mi`, so `s - mi * 2` gives the exact maximum sum.

---

## Dry Run

Tracing Example 1 (`matrix = [[1, -1], [-1, 1]]`) and Example 2 (`matrix = [[1, 2, 3], [-1, -2, -3], [1, 2, 3]]`):

| Example | Matrix Values | Sum of `|v|` (`s`) | Negatives (`cnt`) | Min `|v|` (`mi`) | Branch & Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Example 1 | `1, -1, -1, 1` | `1 + 1 + 1 + 1 = 4` | `2` (even) | `1` | `cnt % 2 == 0` -> returns `4` |
| Example 2 | `1,2,3, -1,-2,-3, 1,2,3` | `18` | `3` (odd) | `1` | `cnt` odd & `mi = 1` -> `18 - 1 * 2 = 16` |

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Visits each of the `n * n` elements in `matrix` exactly once with `O(1)` arithmetic per element.
- **Space Complexity:** `O(1)` — Uses only three scalar variables (`s`, `cnt`, `mi`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1975maximum-matrix-sum.java](./1975maximum-matrix-sum.java) |

---

## Key Learnings

- Whenever an operation modifies pairs of adjacent elements on a connected graph/grid, look for a **parity invariant**—local moves can transport states globally across any path!
- Watch out for integer overflow: `250 * 250 * 10^5 = 6.25 * 10^9` overflows 32-bit `int`, so `s` must be declared as `long`.
- When adjusting an 'all-positive' sum `s` because one value `mi` must be negated, remember to subtract `2 * mi`, not `mi`!
