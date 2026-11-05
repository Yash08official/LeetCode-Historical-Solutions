---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 3665. Twisted Mirror Path Count

**[View Problem on LeetCode](https://leetcode.com/problems/twisted-mirror-path-count/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3665` (`3665`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | C++ |

---

## Problem Description

You are given an `m x n` binary grid `grid` where:
- `grid[i][j] == 0` represents an empty cell, and
- `grid[i][j] == 1` represents a mirror.

A robot starts at the top-left corner `(0, 0)` and aims to reach the bottom-right corner `(m - 1, n - 1)`. The robot can move only **right** or **down**.

However, if the robot attempts to move into a cell containing a mirror, it is **reflected** before entering that cell:
- Moving **right** into a mirror turns the robot **down**, entering the cell directly below the mirror.
- Moving **down** into a mirror turns the robot **right**, entering the cell directly to the right of the mirror.

If a reflection leads into another mirror cell, the robot reflects again according to the direction of entry. If reflection moves the robot outside the grid boundaries, that path is invalid.

Return the total number of unique valid paths from `(0, 0)` to `(m - 1, n - 1)`, **modulo `10^9 + 7`**.

---

## Examples

### Example 1

**Input:** `grid = [[0,1,0],[0,0,1],[1,0,0]]`

**Output:** `5`

**Explanation:**

			Number
			Full Path

			1
			(0, 0) → (0, 1) [M] → (1, 1) → (1, 2) [M] → (2, 2)

			2
			(0, 0) → (0, 1) [M] → (1, 1) → (2, 1) → (2, 2)

			3
			(0, 0) → (1, 0) → (1, 1) → (1, 2) [M] → (2, 2)

			4
			(0, 0) → (1, 0) → (1, 1) → (2, 1) → (2, 2)

			5
			(0, 0) → (1, 0) → (2, 0) [M] → (2, 1) → (2, 2)

- `[M]` indicates the robot attempted to enter a mirror cell and instead reflected.

### Example 2

**Input:** `grid = [[0,0],[0,0]]`

**Output:** `2`

**Explanation:**

			Number
			Full Path

			1
			(0, 0) → (0, 1) → (1, 1)

			2
			(0, 0) → (1, 0) → (1, 1)

### Example 3

**Input:** `grid =`[[0,1,1],[1,1,0]]

**Output:** 1

**Explanation:**

			Number
			Full Path

			1
			(0, 0) → (0, 1) [M] → (1, 1) [M] → (1, 2)

`(0, 0) → (1, 0) [M] → (1, 1) [M] → (2, 1)` goes out of bounds, so it is invalid.

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `2 <= m, n <= 500`

- `grid[i][j]` is either `0` or `1`.

- `grid[0][0] == grid[m - 1][n - 1] == 0`

---

## Problem Understanding

Key observations and path rules:
1. **Empty Cells (`0`)**: When arriving at an empty cell `(r, c)`, the robot can depart either right or down. Incoming paths from the left (moving right) and from above (moving down) both combine freely.
2. **Mirror Cells (`1`)**: A mirror cell cannot be stopped in. Attempting to enter from the left (direction: right) redirects the trajectory downwards; attempting to enter from above (direction: down) redirects the trajectory rightwards.
   - Effectively, at cell `(r, c)`, if it is a mirror, the incoming vertical momentum turns horizontal, and the incoming horizontal momentum turns vertical!
   - This corresponds to swapping the directional state counts: downward becomes rightward, rightward becomes downward.
3. **Boundary Conditions**: Start is at `(0, 0)` and end is at `(m - 1, n - 1)`. Constraints guarantee `grid[0][0] == grid[m - 1][n - 1] == 0`.
4. **Modulo Arithmetic**: All additions must be performed modulo `10^9 + 7`.

---

## Approach

### Brute Force Approach

A naive brute-force DFS would explore every step: from the current position, branch right or down. If the target cell is a mirror, simulate the chain of reflections until landing on an empty cell or going out of bounds.
Since the grid has dimensions up to `500 x 500`, the number of possible paths can be as large as `binom(1000, 500) approx 10^299`, leading to exponential time `O(2^(m + n))` and an immediate Time Limit Exceeded error.

### Optimized Approach

The implemented solution uses **space-optimized Dynamic Programming** tracking directional flow:
1. **Directional Flow Representation**:
   - For each column, maintain a pair of path counts `(down_paths, right_paths)`.
   - `dp[c + 1].first` represents paths entering column `c` vertically (moving down).
   - `dp[c + 1].second` represents paths entering column `c` horizontally (moving right).
2. **State Transitions**:
   - For an **empty cell** (`grid[r][c] == 0`):
     - The total paths entering this cell is the sum of paths from above (`dp[c + 1].second`) and paths from the left (`dp[c].first`).
     - Once at an empty cell, the robot can freely leave either down or right. Hence, both outgoing components become `(down_in + right_in) % MOD`.
   - For a **mirror cell** (`grid[r][c] == 1`):
     - An incoming horizontal move is deflected downward, and an incoming vertical move is deflected rightward.
     - Thus, the counts simply swap without combining: `dp[c + 1] = pair(dp[c + 1].second, dp[c].first)`.
3. **Space Optimization**:
   - The grid can be transposed if `m > n` so that the DP vector only needs size `min(m, n) + 1`, reducing auxiliary memory to `O(min(m, n))`.

### Step-by-Step Thinking Process

1. Analyze the deflection mechanics: a mirror cell at `(r, c)` intercepts a move entering from the left and redirects it down to `(r + 1, c)`. Similarly, a move entering from above is redirected right to `(r, c + 1)`.
2. Notice that a mirror acts as a permutation (swap) of directional paths passing through that grid coordinate.
3. An empty cell acts as a junction: paths arriving from the top and left merge into a common sum, and that sum can then propagate independently rightward and downward.
4. Formulate DP states: maintain the number of paths arriving vertically and horizontally for each position.
5. Compress 2D table into a 1D vector of pairs `dp[c + 1]` of size `min(m, n) + 1` by updating row-by-row (or column-by-column after transposing if necessary).

### Algorithm / Intuition

In `Solution`:
- `dp` is a vector of `pair<int, int>` of length `min(m, n) + 1`.
- Base state: `dp[1] = pair(1, 1)` represents the single starting path at `(0, 0)` available to exit either right or down.
- For each cell `(r, c)`:
  - `dp[c + 1].second` carries paths arriving from above (the previous row at column `c`).
  - `dp[c].first` carries paths arriving from the left (the current row at column `c - 1`).
  - If `get(r, c) == 1` (mirror): the paths swap:
    `dp[c + 1] = pair(dp[c + 1].second, dp[c].first)`.
  - If `get(r, c) == 0` (empty):
    the sum `total = (dp[c + 1].second + dp[c].first) % MOD` feeds both outgoing directions:
    `dp[c + 1] = pair(total, total)`.
- At the bottom-right corner, `dp.back().first` gives the total valid paths reaching the destination.

---

## Dry Run

Consider `grid = [[0, 1, 0], [0, 0, 1], [1, 0, 0]]`, `m = 3, n = 3`:

- Initialize `dp` of size 4: `dp[1] = (1, 1)`, all others `(0, 0)`.
- **Row 0**:
  - `c = 0` (`grid[0][0] = 0`): sum = `dp[1].second (1) + dp[0].first (0) = 1`. `dp[1] = (1, 1)`.
  - `c = 1` (`grid[0][1] = 1`, mirror): swaps incoming. `dp[2] = (dp[2].second (0), dp[1].first (1)) = (0, 1)`.
  - `c = 2` (`grid[0][2] = 0`): sum = `dp[3].second (0) + dp[2].first (0) = 0`. `dp[3] = (0, 0)`.
  - End of Row 0: `dp = [(0,0), (1, 1), (0, 1), (0, 0)]`.

- **Row 1**:
  - `c = 0` (`grid[1][0] = 0`): sum = `dp[1].second (1) + dp[0].first (0) = 1`. `dp[1] = (1, 1)`.
  - `c = 1` (`grid[1][1] = 0`): sum = `dp[2].second (1) + dp[1].first (1) = 2`. `dp[2] = (2, 2)`.
  - `c = 2` (`grid[1][2] = 1`, mirror): swaps incoming. `dp[3] = (dp[3].second (0), dp[2].first (2)) = (0, 2)`.
  - End of Row 1: `dp = [(0,0), (1, 1), (2, 2), (0, 2)]`.

- **Row 2**:
  - `c = 0` (`grid[2][0] = 1`, mirror): `dp[1] = (dp[1].second (1), dp[0].first (0)) = (1, 0)`.
  - `c = 1` (`grid[2][1] = 0`): sum = `dp[2].second (2) + dp[1].first (1) = 3`. `dp[2] = (3, 3)`.
  - `c = 2` (`grid[2][2] = 0`): sum = `dp[3].second (2) + dp[2].first (3) = 5`. `dp[3] = (5, 5)`.
- Final answer: `dp[3].first = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — We visit each of the `m * n` cells in the grid exactly once, performing `O(1)` arithmetic and pair assignment operations per cell.
- **Space Complexity:** `O(min(m, n))` — By orienting the iteration along the smaller dimension, the 1D DP vector maintains only `min(m, n) + 1` pairs of integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **C++** | [3665twisted-mirror-path-count.cpp](./3665twisted-mirror-path-count.cpp) |

---

## Key Learnings

- Mirrors that deflect perpendicular paths act as directional state swappers rather than simple blockers.
- Breaking grid path DP into explicit directional components (vertical vs. horizontal arrivals) allows tracking momentum and reflections cleanly.
- Grid transposition based on comparing dimensions (`m` vs `n`) provides a simple, universal way to optimize space to `O(min(m, n))` without duplicating logic.
