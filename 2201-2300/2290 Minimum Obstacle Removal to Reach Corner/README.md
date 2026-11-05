---
comments: true
difficulty: Hard
tags:
  - Array
  - Breadth-First Search
  - Graph Theory
  - Heap (Priority Queue)
  - Matrix
  - Shortest Path
  - 0-1 BFS
  - Dijkstra's Algorithm
---

# 2290. Minimum Obstacle Removal to Reach Corner

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2290` (`2290`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Graph Theory`, `Heap (Priority Queue)`, `Matrix`, `Shortest Path`, `0-1 BFS`, `Dijkstra's Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed 2D integer array `grid` of size `m x n`. Each cell has one of two values:
- `0` represents an empty cell.
- `1` represents an obstacle that can be removed.

You start at the top-left corner `(0, 0)` and want to reach the bottom-right corner `(m - 1, n - 1)`. You can move up, down, left, or right to an adjacent cell.

Return the minimum number of obstacles you need to remove to travel from `(0, 0)` to `(m - 1, n - 1)`. Both starting cell `(0, 0)` and destination `(m - 1, n - 1)` are guaranteed to be empty (`0`).

---

## Examples

### Example 1

```text
Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.
```

### Example 2

```text
Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
Output: 0
Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `1 <= m, n <= 10^5`

- `2 <= m * n <= 10^5`

- `grid[i][j]` is either `0` **or** `1`.

- `grid[0][0] == grid[m - 1][n - 1] == 0`

---

## Problem Understanding

Key observations and constraints:
- Grid dimensions satisfy `1 <= m, n <= 10^5` with total cells `2 <= m * n <= 10^5`.
- Moving into an empty cell (`0`) incurs an obstacle removal cost of `0`.
- Moving into an obstacle cell (`1`) incurs an obstacle removal cost of `1`.
- This is a shortest-path problem on a grid graph where every directed edge has a weight of either `0` or `1`.
- Standard Dijkstra's algorithm solves this in `O(V log V + E) = O(m * n * log(m * n))`. However, because edge weights are strictly in `{0, 1}`, 0-1 BFS using a double-ended queue (`Deque`) can achieve optimal `O(m * n)` time.

---

## Approach

### Brute Force Approach

A plain BFS cannot find the shortest path when edge weights are not uniform (weights are 0 or 1), as the first time a cell is reached may not be with the minimum cost. Exploring all simple paths using DFS or unpruned backtracking would take exponential time `O(4^{m * n})` and overflow the call stack.

### Optimized Approach

Use 0-1 Breadth-First Search (0-1 BFS) with a `Deque<int[]>`. Maintain a visited array `boolean[][] vis`. Enqueue starting position `(0, 0)` with cost `0`. When popping a state `(i, j, k)`:
- If `(i, j) == (m - 1, n - 1)`, return `k` immediately.
- If already visited, continue; otherwise mark as visited.
- For each of the 4 adjacent neighbors `(x, y)`:
  - If `grid[x][y] == 0`, push to the FRONT of the deque (`q.offerFirst`) with the same cost `k`.
  - If `grid[x][y] == 1`, push to the BACK of the deque (`q.offerLast`) with cost `k + 1`.
This ensures that states are dequeued in monotonically non-decreasing order of cost, guaranteeing minimum removals.

### Step-by-Step Thinking Process

1. Recognize this as a single-source shortest path problem on a graph with non-negative edge weights.
2. Notice edge weights are binary: `weight = 0` for empty cell, `weight = 1` for obstacle.
3. For graphs with edge weights in `{0, 1}`, 0-1 BFS using a deque avoids the `log(V)` priority queue overhead.
4. Zero-cost moves are offered at the front of the deque to be processed before higher-cost moves, maintaining deque order.
5. One-cost moves are offered at the back of the deque.
6. Mark cells visited upon removal from the queue to ensure each cell is expanded at its minimum cost.

### Algorithm / Intuition

In `Solution.minimumObstacles`, an `ArrayDeque<int[]>` `q` is initialized with `{0, 0, 0}` representing `(row, col, obstacles_removed)`. The direction array `dirs = {-1, 0, 1, 0, -1}` facilitates moving in 4 cardinal directions. A boolean matrix `vis[m][n]` tracks finalized cells.

Inside the `while (true)` loop, the front element `p = q.poll()` is extracted. If `i == m - 1 && j == n - 1`, we have reached the destination with minimal removals, so `return k`. If `vis[i][j]` is true, we discard the stale entry. Otherwise, we mark `vis[i][j] = true` and check all 4 neighbors `(x, y)` within grid boundaries. If `grid[x][y] == 0`, we call `q.offerFirst(new int[]{x, y, k})` so zero-cost traversal is explored immediately. If `grid[x][y] == 1`, we call `q.offerLast(new int[]{x, y, k + 1})`.

---

## Dry Run

Consider `grid = [[0,1,1],[1,1,0],[1,1,0]]` with dimensions `3 x 3`:
- Initial state: `q = [[0, 0, 0]]`, `vis` all false.
- Pop `[0, 0, 0]`. Mark `vis[0][0] = true`.
  - Neighbor `(0, 1)` has `grid=1`: `offerLast([0, 1, 1])`.
  - Neighbor `(1, 0)` has `grid=1`: `offerLast([1, 0, 1])`.
  - `q = [[0, 1, 1], [1, 0, 1]]`.
- Pop `[0, 1, 1]`. Mark `vis[0][1] = true`.
  - Neighbor `(0, 2)` has `grid=1`: `offerLast([0, 2, 2])`.
  - Neighbor `(1, 1)` has `grid=1`: `offerLast([1, 1, 2])`.
  - `q = [[1, 0, 1], [0, 2, 2], [1, 1, 2]]`.
- Pop `[1, 0, 1]`. Mark `vis[1][0] = true`.
  - Neighbor `(2, 0)` has `grid=1`: `offerLast([2, 0, 2])`.
- Subsequent processing reaches `(1, 2)` (empty, cost 2) and pushes `(2, 2)` (empty, cost 2) via `offerFirst`.
- When `[2, 2, 2]` is popped, `i == 2 && j == 2` evaluates to True, immediately returning `k = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — In 0-1 BFS, each cell is processed at most once when popped from the deque, and each transition takes `O(1)` time. Total time is strictly linear in the number of cells.
- **Space Complexity:** `O(m * n)` — Required for the boolean `vis` matrix of size `m x n` and the `Deque` which stores at most `O(m * n)` elements at any time.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2290minimum-obstacle-removal-to-reach-corner.java](./2290minimum-obstacle-removal-to-reach-corner.java) |

---

## Key Learnings

- 0-1 BFS is the optimal shortest-path algorithm when all edge weights belong to `{0, 1}`, reducing `O(E log V)` Dijkstra to `O(V + E)`.
- Pushing 0-weight edges to the front and 1-weight edges to the back preserves non-decreasing distance ordering in the deque.
- Lazy visited checks (`if (vis[i][j]) continue; vis[i][j] = true;`) handle multiple pushed paths cleanly.
