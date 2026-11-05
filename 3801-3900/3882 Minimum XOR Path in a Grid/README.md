---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Bit Manipulation
  - Matrix
---

# 3882. Minimum XOR Path in a Grid

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-xor-path-in-a-grid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3882` (`3882`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Bit Manipulation`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 2D integer array `grid` of size `m x n`.

You start at the top-left cell `(0, 0)` and wish to reach the bottom-right cell `(m - 1, n - 1)`. At each step, you may move only **right** or **down**.

The **cost** of a path is defined as the **bitwise XOR** of all cell values visited along the path, including the starting cell `(0, 0)` and destination cell `(m - 1, n - 1)`.

Return the **minimum possible XOR value** among all valid paths from `(0, 0)` to `(m - 1, n - 1)`.

---

## Examples

### Example 1

**Input:** `grid = [[1,2],[3,4]]`

**Output:** `6`

**Explanation:**

There are two valid paths:

- `(0, 0) → (0, 1) → (1, 1)` with XOR: `1 XOR 2 XOR 4 = 7`

- `(0, 0) → (1, 0) → (1, 1)` with XOR: `1 XOR 3 XOR 4 = 6`

The minimum XOR value among all valid paths is 6.

### Example 2

**Input:** `grid = [[6,7],[5,8]]`

**Output:** `9`

**Explanation:**

There are two valid paths:

- `(0, 0) → (0, 1) → (1, 1)` with XOR: `6 XOR 7 XOR 8 = 9`

- `(0, 0) → (1, 0) → (1, 1)` with XOR: `6 XOR 5 XOR 8 = 11`

The minimum XOR value among all valid paths is 9.

### Example 3

**Input:** `grid = [[2,7,5]]`

**Output:** `0`

**Explanation:**

There is only one valid path:

- `(0, 0) → (0, 1) → (0, 2)` with XOR: `2 XOR 7 XOR 5 = 0`

The XOR value of this path is 0, which is the minimum possible.

---

## Constraints

- `1 <= m == grid.length <= 1000`

- `1 <= n == grid[i].length <= 1000`

- `m * n <= 1000`

- `0 <= grid[i][j] <= 1023​`

---

## Problem Understanding

Key observations and constraints:
1. **XOR Is Non-Monotonic**: Unlike addition where edge weights are positive and costs grow monotonically, bitwise XOR does not satisfy optimal substructure directly (a path with a larger intermediate XOR might yield a smaller final XOR after another XOR operation).
2. **Small Value Domain**:
   - `grid[i][j] <= 1023`, meaning values fit within 10 bits (`2^10 = 1024`).
   - The bitwise XOR of any combination of numbers `<= 1023` is strictly bounded by `< 1024` (or `< 2048` depending on power-of-two rounding).
3. **Small Grid Area**:
   - `m * n <= 1000`.
   - Because both the grid size and the reachable XOR values are small, we can track **all reachable XOR values** at every cell `(i, j)` using dynamic programming.

---

## Approach

### Brute Force Approach

A naive brute-force approach would use recursion or DFS to explore all paths from `(0, 0)` to `(m - 1, n - 1)`.
The number of distinct paths in an `m x n` grid is `binom(m + n - 2, m - 1)`. For grids where `m = 500, n = 2`, paths are few, but for balanced grids like `32 x 32` (`m * n approx 1000`), the number of paths is `binom(62, 31) approx 4.65 * 10^17`, making exhaustive search impossible.

### Optimized Approach

The implemented solution uses **3D Boolean Reachability Dynamic Programming**:
1. **Determine XOR Bound (`mx`)**:
   - Find the maximum value in `grid`, and compute `mx` as the smallest power of 2 strictly greater than the maximum value (`1 << (Integer.SIZE - Integer.numberOfLeadingZeros(max_val))`). If maximum value is `<= 1023`, `mx <= 1024`.
2. **DP State**:
   - Define `boolean[][][] f = new boolean[m][n][mx]`.
   - `f[i][j][k] == true` indicates that there is a valid path from `(0, 0)` to `(i, j)` whose cumulative XOR sum equals `k`.
3. **Base Case**:
   - `f[0][0][grid[0][0]] = true`.
4. **Transitions**:
   - For each cell `(i, j)` with value `x = grid[i][j]`:
   - For each `k` in `[0, mx)`:
     - If coming from top (`i > 0`) and `f[i - 1][j][k ^ x] == true`, set `f[i][j][k] = true`.
     - If coming from left (`j > 0`) and `f[i][j - 1][k ^ x] == true`, set `f[i][j][k] = true`.
5. **Answer Retrieval**:
   - Scan `k` from 0 upwards; the first `k` for which `f[m - 1][n - 1][k] == true` is the minimum achievable XOR path value.

### Step-by-Step Thinking Process

1. XOR lacks the greedy/Dijkstra property because `A ^ B` can be smaller than `A`.
2. Observe the constraints: `m * n <= 1000` and `grid[i][j] <= 1023`. The range of possible XOR sums is small (`[0, 1024)`).
3. Formulate a state `f[i][j][k]` = can we reach `(i, j)` with XOR sum `k`?
4. If `(i, j)` has value `x`, reaching XOR sum `k` requires arriving at `(i-1, j)` or `(i, j-1)` with XOR sum `k ^ x`.
5. Iterate over all cells and all states `k`, then scan `k = 0, 1, 2, ...` at `(m - 1, n - 1)` to return the smallest reachable value.

### Algorithm / Intuition

In `Solution.minCost`:
- `Integer.numberOfLeadingZeros(mx)` calculates the bit width of the largest element, rounding up to the next power of 2 via `1 << (...)`.
- The 3D array `f` holds reachability flags.
- Since XOR is its own inverse, `k = prev ^ x` is equivalent to `prev = k ^ x`. Therefore, checking `f[i - 1][j][k ^ x]` directly verifies whether the previous cell could have reached `prev` to produce `k` at the current cell.
- The final loop `for (int k = 0;; k++)` tests candidate XOR costs in strictly increasing order, guaranteeing the minimum cost is returned as soon as a `true` state is found.

---

## Dry Run

Consider `grid = [[1, 2], [3, 4]]`, `m = 2, n = 2`:

1. **Max element**: `4`. `Integer.numberOfLeadingZeros(4)` is 29. `mx = 1 << (32 - 29) = 1 << 3 = 8`.
2. **DP table size**: `f[2][2][8]`.
3. **Base case**:
   - `f[0][0][grid[0][0]] = f[0][0][1] = true`.
4. **Transitions**:
   - `(0, 1)`: `x = 2`. From left `(0, 0)`:
     - `k = 1 ^ 2 = 3`: `f[0][0][3 ^ 2] = f[0][0][1] == true` -> `f[0][1][3] = true`.
   - `(1, 0)`: `x = 3`. From top `(0, 0)`:
     - `k = 1 ^ 3 = 2`: `f[0][0][2 ^ 3] = f[0][0][1] == true` -> `f[1][0][2] = true`.
   - `(1, 1)`: `x = 4`:
     - From top `(0, 1)`: reachable XOR was 3 -> new XOR = `3 ^ 4 = 7`. `f[1][1][7] = true`.
     - From left `(1, 0)`: reachable XOR was 2 -> new XOR = `2 ^ 4 = 6`. `f[1][1][6] = true`.
5. **Answer query at `(1, 1)`**:
   - Check `k = 0`: false.
   - Check `k = 1 .. 5`: false.
   - Check `k = 6`: `f[1][1][6] == true`!
   - Return `6`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n * mx)` — There are `m * n` cells and `mx` states per cell. Since `m * n <= 1000` and `mx <= 1024` (or at most `2048`), the total number of operations is `~10^6`, executing in under 20 milliseconds.
- **Space Complexity:** `O(m * n * mx)` — The 3D boolean array `f` takes `1000 * 1024` bytes, which is `~1 MB` of memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3882minimum-xor-path-in-a-grid.java](./3882minimum-xor-path-in-a-grid.java) |

---

## Key Learnings

- When path costs are non-monotonic (e.g. XOR, GCD), convert the optimization problem into a reachability DP by promoting the cost dimension into the DP state.
- Bitwise XOR is self-inverting: `A ^ B = C` implies `A = C ^ B`, allowing straightforward transition lookups.
- Bounded value domains (`x < 2^B`) ensure state dimensions remain compact and computationally tractable.
