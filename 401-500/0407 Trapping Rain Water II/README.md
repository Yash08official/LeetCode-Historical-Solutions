---
comments: true
difficulty: Hard
tags:
  - Array
  - Breadth-First Search
  - Heap (Priority Queue)
  - Matrix
---

# 407. Trapping Rain Water II

**[View Problem on LeetCode](https://leetcode.com/problems/trapping-rain-water-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0407` (`407`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Heap (Priority Queue)`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` matrix `heightMap` of non-negative integers representing the elevation of each `1 x 1` cell in a 2D terrain grid, compute and return the total volume of rainwater trapped across the terrain after heavy rain.

---

## Examples

### Example 1

```text
Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks.
We have two small ponds 1 and 3 units trapped.
The total volume of water trapped is 4.
```

### Example 2

```text
Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10
```

---

## Constraints

- `m == heightMap.length`

- `n == heightMap[i].length`

- `1 <= m, n <= 200`

- `0 <= heightMap[i][j] <= 2 * 10^4`

---

## Problem Understanding

In 1D Trapping Rain Water, water at index `i` is bounded only by `maxLeft` and `maxRight`. In **2D**, water can escape along *any* winding 4-directional path to the outer boundary of the grid!

Key insight (The "Leaky Bucket" Principle):
- No cell on the outer perimeter (`i == 0`, `i == m - 1`, `j == 0`, or `j == n - 1`) can trap water.
- Together, the outer perimeter cells form a retaining wall around the interior, and water always spills over the **lowest** point of that wall first!
- If the lowest boundary cell has effective water-wall height `h`, any unvisited interior neighbor `(x, y)` next to it cannot possibly drain lower than `h` (since every other boundary path out is `>= h`!). Thus `(x, y)` traps `max(0, h - heightMap[x][y])` water and joins the boundary wall with effective height `max(h, heightMap[x][y])`.

---

## Approach

### Brute Force Approach

For each cell `(i, j)`, running a separate Dijkstra / minimax-path search to find the minimum maximum-elevation path to the grid border takes `O(m * n * log(m * n))` *per cell*, resulting in `O((m * n)^2 log(m * n))` time—way too slow for a `200 x 200` (`40,000`-cell) grid.

### Optimized Approach

Run a **Multi-Source Min-Heap Flood-Fill (Dijkstra from the Border Inward)** using `PriorityQueue<int[]> pq` ordered by effective boundary height `a[0] - b[0]`. Seed all border cells into `pq`, then repeatedly pop the lowest boundary cell `p` and relax its unvisited 4-neighbors.

### Step-by-Step Thinking Process

1. Track visited cells with `boolean[][] vis = new boolean[m][n]` and create min-heap `pq` storing `{effectiveHeight, row, col}` sorted ascending by `effectiveHeight`.
2. Push every border cell (`i == 0 || i == m - 1 || j == 0 || j == n - 1`) into `pq` with `heightMap[i][j]` and mark `vis[i][j] = true`.
3. Initialize `ans = 0` and compact direction array `dirs = {-1, 0, 1, 0, -1}`.
4. While `pq` is non-empty, poll the lowest wall cell `p = [h, r, c]` and inspect its 4 neighbors `(x, y)`.
5. For each in-bounds unvisited neighbor `(x, y)`: add `Math.max(0, p[0] - heightMap[x][y])` to `ans`, mark `vis[x][y] = true`, and push `{Math.max(p[0], heightMap[x][y]), x, y}` into `pq`.
6. Return `ans` once all cells have been processed.

### Algorithm / Intuition

Think of raising the sea level outside the island gradually, or shrinking the island's perimeter ring inward one weakest link at a time.

When `p = pq.poll()` pops the globally minimum height `p[0]` on the current frontier, we know with 100% certainty that no path from an unvisited neighbor `(x, y)` to the outside world has a bottleneck lower than `p[0]`. If `heightMap[x][y] < p[0]`, water fills `(x, y)` right up to level `p[0]`, contributing `p[0] - heightMap[x][y]` units of trapped water and turning `(x, y)` itself into a water-filled barrier of height `p[0]` for deeper neighbors!

---

## Dry Run

Tracing **Example 1** (`3 x 6` grid): `[[1,4,3,1,3,2], [3,2,1,3,2,4], [2,3,3,2,3,1]]`

1. **Seed border:** All 14 border cells enter `pq`; only `(1,1)=2`, `(1,2)=1`, `(1,3)=3`, `(1,4)=2` are unvisited.
2. **Pop height `1`s** (`(0,0), (0,3), (2,5)`):
   - `(0,3)` (`h=1`) visits interior neighbor `(1,3)` (`height=3`): `ans += max(0, 1 - 3) = 0`, marks `vis[1][3]`, pushes `{3, 1, 3}`.
3. **Pop height `2`s** (`(0,5), (2,0), (2,3)`):
   - All interior neighbors they touch (like `(1,3)`) are already visited.
4. **Pop height `3`s** (`(0,2), (0,4), (1,0), (2,1), (2,2), (2,4), (1,3)`):
   - `(0,2)` (or `(1,3)` / `(2,2)`) visits `(1,2)` (`height=1`): `ans += 3 - 1 = 2` (`ans = 2`), pushes `{3, 1, 2}`.
   - `(1,0)` (or `(1,2)` / `(2,1)`) visits `(1,1)` (`height=2`): `ans += 3 - 2 = 1` (`ans = 3`), pushes `{3, 1, 1}`.
   - `(0,4)` (or `(1,3)` / `(2,4)`) visits `(1,4)` (`height=2`): `ans += 3 - 2 = 1` (`ans = 4`), pushes `{3, 1, 4}`.
5. Remaining heap entries pop with no unvisited neighbors. Returns `ans = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n log(m * n))` — Each of the `m * n` cells is pushed to and popped from `pq` exactly once, costing `O(log(m * n))` per heap operation.
- **Space Complexity:** `O(m * n)` — `vis` and `pq` hold up to `m * n` entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [407trapping-rain-water-ii.java](./407trapping-rain-water-ii.java) |

---

## Key Learnings

- 2D Trapping Rain Water generalizes two-pointer 1D inward contraction by replacing the `left`/`right` pointers with a min-heap over the entire boundary ring.
- Pushing `Math.max(p[0], heightMap[x][y])` propagates the water surface height seamlessly across multi-cell interior basins.
- The 5-element array `dirs = {-1, 0, 1, 0, -1}` encodes all four cardinal offsets `(dirs[k], dirs[k + 1])` concisely.
