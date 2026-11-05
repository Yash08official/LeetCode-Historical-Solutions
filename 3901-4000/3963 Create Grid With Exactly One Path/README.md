---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 3963. Create Grid With Exactly One Path

**[View Problem on LeetCode](https://leetcode.com/problems/create-grid-with-exactly-one-path/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3963` (`3963`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | Java |

---

## Problem Description

You are given two integers `m` and `n`, representing the dimensions of a grid.

Your task is to construct **any** `m x n` grid consisting only of the characters `'.'` (representing a free, traversable cell) and `'#'` (representing an obstacle cell) such that:
- The top-left cell `(0, 0)` and bottom-right cell `(m - 1, n - 1)` are free cells.
- A **valid path** is a sequence of adjacent free cells moving only **right** `(i, j) -> (i, j + 1)` or **down** `(i, j) -> (i + 1, j)`.
- There is **exactly one valid path** from `(0, 0)` to `(m - 1, n - 1)`.

Return the grid as an array of `m` strings of length `n`.

---

## Examples

### Example 1

**Input:** `m = 2, n = 3`

**Output:** `["..#","#.."]`

**Explanation:**

The only valid path is: `(0,0) → (0,1) → (1,1) → (1,2)`

### Example 2

**Input:** `m = 3, n = 3`

**Output:** `["..#","#..","##."]`

**Explanation:**

The only valid path is: `(0,0) → (0,1) → (1,1) → (1,2) → (2,2)`

### Example 3

**Input:** `m = 1, n = 4`

**Output:** `["...."]`

**Explanation:**

The only valid path is: `(0,0) → (0,1) → (0,2) → (0,3)`

---

## Constraints

- `1 <= m, n <= 25`

---

## Problem Understanding

Key observations and requirements:
1. **Allowed Movements**: Paths can only move strictly Right or strictly Down.
2. **Exactly One Path**: There must be no alternative routes, branches, or detours.
3. **Constructive Flexibility**: Any valid grid meeting the condition is accepted.
4. **Boundary Construction**:
   - A canonical deterministic construction is to create an "L-shaped" corridor:
     - Make every cell in row 0 free (`grid[0][j] = '.'`).
     - Make every cell in column `n - 1` free (`grid[i][n - 1] = '.'`).
     - Fill all other cells with obstacles (`'#'`).
   - Along row 0, any move down enters an obstacle (`'#'`) except at column `n - 1`.
   - Thus, from `(0, 0)`, the path is forced to travel right all the way to `(0, n - 1)`, and from there, forced to travel down along column `n - 1` to `(m - 1, n - 1)`.
   - This creates uniquely **one** path.

---

## Approach

### Brute Force Approach

A brute-force generator would try generating random binary grids of size `m x n`, running a path counting DP (`dp[i][j] = dp[i-1][j] + dp[i][j-1]`) on each grid, and checking if the number of paths is 1.
With up to `2^(25 * 25) = 2^625` possible grids, random searching or brute-force enumeration is completely infeasible and unnecessary when a direct `O(m * n)` construction exists.

### Optimized Approach

The implemented solution constructs the grid **deterministically**:
1. Initialize an `m x n` 2D character array `grid` filled entirely with obstacle characters `'#'`.
2. Set all cells in the first row to free: `grid[0][j] = '.'` for all `0 <= j < n`.
3. Set all cells in the last column to free: `grid[i][n - 1] = '.'` for all `0 <= i < m`.
4. Convert each row into a `String` and return the resulting array `result` of size `m`.

### Step-by-Step Thinking Process

1. The problem requires constructing any grid with exactly 1 valid path from `(0, 0)` to `(m - 1, n - 1)`.
2. To guarantee exactly 1 path, eliminate all branching points.
3. Consider the simplest path: go all the way right along row 0, then go all the way down along column `n - 1`.
4. If all other cells in rows `1` to `m - 1` and columns `0` to `n - 2` are obstacles (`'#'`), no branch can ever form.
5. From `(0, j)` for `j < n - 1`, the cell below `(1, j)` is `'#'`, so the only valid move is Right.
6. From `(i, n - 1)` for `i < m - 1`, moving right is out of bounds, so the only valid move is Down.
7. This L-shaped corridor guarantees exactly one valid path for all `1 <= m, n <= 25`.

### Algorithm / Intuition

In `Solution.createGrid`:
- `grid` is allocated as `char[m][n]` and populated with `'#'`.
- Overwriting row 0 with `'.'` creates the horizontal segment `(0, 0) -> (0, 1) -> ... -> (0, n - 1)`.
- Overwriting column `n - 1` with `'.'` creates the vertical segment `(0, n - 1) -> (1, n - 1) -> ... -> (m - 1, n - 1)`.
- Note that `(0, n - 1)` is shared between row 0 and column `n - 1`, properly connecting the two segments.
- Because all other cells are `'#'`, no path can diverge from this single trajectory.
- Finally, `new String(grid[i])` converts each row to a string.

---

## Dry Run

Consider `m = 2, n = 3`:

1. **Step 1 (Fill obstacles)**:
   ```
   # # #
   # # #
   ```
2. **Step 2 (Free first row)**:
   ```
   . . .
   # # #
   ```
3. **Step 3 (Free last column)**:
   - `grid[0][2] = '.'` (already '.')
   - `grid[1][2] = '.'`
   ```
   . . .
   # # .
   ```
4. **Step 4 (Verify Path)**:
   - At `(0, 0)`: down is `'#'`, right is `'.'`. Forced move: `(0, 1)`.
   - At `(0, 1)`: down is `'#'`, right is `'.'`. Forced move: `(0, 2)`.
   - At `(0, 2)`: right is out of bounds, down is `'.'`. Forced move: `(1, 2)`.
   - At `(1, 2)`: destination reached!
   - Exactly 1 valid path: `(0, 0) -> (0, 1) -> (0, 2) -> (1, 2)`.
5. Return `["...", "##."]`. Matches requirements.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Initializing the grid with `'#'` takes `O(m * n)`, carving row 0 takes `O(n)`, carving column `n - 1` takes `O(m)`, and creating strings takes `O(m * n)`.
- **Space Complexity:** `O(m * n)` — The character array `grid` and output string array `result` occupy `O(m * n)` auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3963create-grid-with-exactly-one-path.java](./3963create-grid-with-exactly-one-path.java) |

---

## Key Learnings

- In grid path construction problems, L-shaped corridors (all right then all down, or all down then all right) trivially eliminate branching.
- Obstacle placement can tightly constrain movement to a single deterministic chain of transitions.
- Recognizing constructive freedom avoids over-engineering: any valid pattern satisfying the constraints is acceptable.
