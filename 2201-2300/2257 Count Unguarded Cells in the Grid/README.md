---
comments: true
difficulty: Medium
tags:
  - Array
  - Matrix
  - Simulation
---

# 2257. Count Unguarded Cells in the Grid

**[View Problem on LeetCode](https://leetcode.com/problems/count-unguarded-cells-in-the-grid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2257` (`2257`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Matrix`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given grid dimensions `m` and `n` for a **0-indexed** `m x n` grid, along with two 2D arrays `guards` and `walls` listing the coordinates `[row, col]` of every guard and every wall (all positions are distinct).

Each guard watches every cell along the four cardinal directions (north, east, south, west) from their cell, stopping immediately upon hitting the grid boundary, a wall, or **another guard**. An unoccupied cell is **guarded** if at least one guard can see it.

Return the number of **unoccupied** cells that are **not** guarded.

---

## Examples

### Example 1

```text
Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7
Explanation: The guarded and unguarded cells are shown in red and green respectively in the above diagram.
There are a total of 7 unguarded cells, so we return 7.
```

### Example 2

```text
Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4
Explanation: The unguarded cells are shown in green in the above diagram.
There are a total of 4 unguarded cells, so we return 4.
```

---

## Constraints

- `1 <= m, n <= 10^5`

- `2 <= m * n <= 10^5`

- `1 <= guards.length, walls.length <= 5 * 10^4`

- `2 <= guards.length + walls.length <= m * n`

- `guards[i].length == walls[j].length == 2`

- `0 <= row_i, row_j < m`

- `0 <= col_i, col_j < n`

- All the positions in `guards` and `walls` are **unique**.

---

## Problem Understanding

- **Three Distinct Cell States:**
  - `0`: Empty and currently unguarded.
  - `1`: Empty and guarded (seen by at least one guard).
  - `2`: Occupied by a **guard** or a **wall** (both block vision and neither counts as an unoccupied cell).
- **Why Treating Guards as Obstacles (`2`) Prevents `O(m * n * G)` Blowup:** Because a guard blocks the line of sight of any collinear guard behind them, within any contiguous horizontal or vertical strip of empty cells between `2`s, **at most two guards** can ever cast rays across it (one at each end of the strip)! Thus, sweeping rays from every guard until hitting a `2` visits each empty cell at most **4 times total** (once per cardinal direction), guaranteeing linear `O(m * n)` time!

---

## Approach

### Brute Force Approach

For each empty cell `(r, c)`, scanning outward in all 4 directions to look for a guard before hitting a wall—or letting guards scan right *through* other guards—either repeats work or risks `O(m * n * (m + n))` (`~10^{10}` operations when `m = 1, n = 10^5` with `5 * 10^4` guards!).

### Optimized Approach

Represent the grid as `int[][] g = new int[m][n]`, mark all `guards` and `walls` as `2` (obstacles), cast rays in all 4 cardinal directions from each guard while `g[nx][ny] < 2` (marking seen cells as `1`), and finally count remaining `0` cells.

### Step-by-Step Thinking Process

1. Allocate `int[][] g = new int[m][n]` (default `0` = unoccupied & unguarded).
2. Mark every cell in `guards` and every cell in `walls` with `g[r][c] = 2`.
3. Use compact direction array `int[] dirs = {-1, 0, 1, 0, -1}` so `(dirs[k], dirs[k + 1])` for `k = 0..3` yields North `(-1, 0)`, East `(0, 1)`, South `(1, 0)`, and West `(0, -1)`.
4. For each guard, march along each of the 4 directions as long as the next cell `(x + a, y + b)` is in bounds and satisfies `g[x + a][y + b] < 2`, marking `g[x][y] = 1`.
5. Scan `g` and count how many cells still equal `0`.

### Algorithm / Intuition

Notice the condition `g[x + a][y + b] < 2` inside the `while` loop:
- Why `< 2` instead of `== 0`? Because a horizontal ray (`1`s) and a vertical ray must be allowed to **cross** each other! If a vertical ray stopped at a cell already marked `1` by a horizontal ray, cells beyond the intersection would be missed.
- Why is `< 2` still fast when two guards are in the *same* row? Because both guards themselves have `g[r][c] == 2`! As soon as Guard A's ray reaches Guard B's cell, `g[x + a][y + b] < 2` is `false`, so Guard A's ray stops right before Guard B rather than re-scanning past Guard B.

---

## Dry Run

Trace on **Example 1**: `m = 4, n = 6`, `guards = [[0,0],[1,1],[2,3]]`, `walls = [[0,1],[2,2],[1,4]]`.

1. **Mark `guards` and `walls` as `2`:**
   `(0,0)=2, (1,1)=2, (2,3)=2` and `(0,1)=2, (2,2)=2, (1,4)=2`.
2. **Cast rays from each guard:**
   - Guard `(0,0)`: East blocked by `(0,1)=2`; South marks `(1,0), (2,0), (3,0) = 1`.
   - Guard `(1,1)`: North blocked by `(0,1)=2`; East marks `(1,2), (1,3) = 1` (stops at `(1,4)=2`); South marks `(2,1), (3,1) = 1`; West marks `(1,0) = 1`.
   - Guard `(2,3)`: North marks `(1,3), (0,3) = 1`; East marks `(2,4), (2,5) = 1`; South marks `(3,3) = 1`; West blocked by `(2,2)=2`.
3. **Final Grid `g`:**
   - Row `0`: `[2, 2, 0, 1, 0, 0]` -> `3` zeros
   - Row `1`: `[1, 2, 1, 1, 2, 0]` -> `1` zero
   - Row `2`: `[1, 1, 2, 2, 1, 1]` -> `0` zeros
   - Row `3`: `[1, 1, 0, 1, 0, 0]` -> `3` zeros
4. **Count `v == 0`:** `3 + 1 + 0 + 3 = 7`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Marking obstacles takes `O(G + W)`, each empty cell is traversed at most once from each of the 4 cardinal directions (`<= 4 * m * n` steps total because guards block collinear guards), and the final count scans `m * n` cells.
- **Space Complexity:** `O(m * n)` — The 2D array `g` stores `m * n` integers (up to `10^5` per problem constraints).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2257count-unguarded-cells-in-the-grid.java](./2257count-unguarded-cells-in-the-grid.java) |

---

## Key Learnings

- Be careful with ray-crossing bugs in grid visibility problems: rays must pass through `1` (already-lit empty cells) so perpendicular rays can intersect, while stopping at `2` (guards and walls).
- Because guards themselves act as blockers (`2`), naive ray-casting from every guard amortizes to `O(m * n)` total work—each empty cell can see at most one nearest guard in each of the 4 directions!
