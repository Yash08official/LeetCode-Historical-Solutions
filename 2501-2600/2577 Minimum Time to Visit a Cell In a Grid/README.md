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
---

# 2577. Minimum Time to Visit a Cell In a Grid

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-time-to-visit-a-cell-in-a-grid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2577` (`2577`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Graph Theory`, `Heap (Priority Queue)`, `Matrix`, `Shortest Path` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` matrix `grid` of non-negative integers where `grid[row][col]` represents the minimum time required to visit cell `(row, col)`.

You start at cell `(0, 0)` at time `t = 0`. Each second, you must move to any 4-directionally adjacent cell (up, down, left, right).

You can only visit a cell `(row, col)` at time `t` if `t >= grid[row][col]`. You are allowed to revisit previously visited cells (for example, stepping back and forth between two adjacent cells to burn time).

Return the minimum time required to reach the bottom-right cell `(m - 1, n - 1)`. If it is impossible to reach it, return `-1`.

---

## Examples

### Example 1

```text
Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
Output: 7
Explanation: One of the paths that we can take is the following:
- at t = 0, we are on the cell (0,0).
- at t = 1, we move to the cell (0,1). It is possible because grid[0][1] <= 1.
- at t = 2, we move to the cell (1,1). It is possible because grid[1][1] <= 2.
- at t = 3, we move to the cell (1,2). It is possible because grid[1][2] <= 3.
- at t = 4, we move to the cell (1,1). It is possible because grid[1][1] <= 4.
- at t = 5, we move to the cell (1,2). It is possible because grid[1][2] <= 5.
- at t = 6, we move to the cell (1,3). It is possible because grid[1][3] <= 6.
- at t = 7, we move to the cell (2,3). It is possible because grid[2][3] <= 7.
The final time is 7. It can be shown that it is the minimum time possible.
```

### Example 2

```text
Input: grid = [[0,2,4],[3,2,1],[1,0,4]]
Output: -1
Explanation: There is no path from the top left to the bottom-right cell.
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `2 <= m, n <= 1000`

- `4 <= m * n <= 10^5`

- `0 <= grid[i][j] <= 10^5`

- `grid[0][0] == 0`

.spoilerbutton {display:block; border:dashed; padding: 0px 0px; margin:10px 0px; font-size:150%; font-weight: bold; color:#000000; background-color:cyan; outline:0;
}
.spoiler {overflow:hidden;}
.spoiler > div {-webkit-transition: all 0s ease;-moz-transition: margin 0s ease;-o-transition: all 0s ease;transition: margin 0s ease;}
.spoilerbutton[value="Show Message"] + .spoiler > div {margin-top:-500%;}
.spoilerbutton[value="Hide Message"] + .spoiler {padding:5px;}

---

## Problem Understanding

Every step takes exactly 1 second. If we are adjacent to a cell whose requirement is `grid[x][y] > t + 1`, we cannot enter it yet. However, if we can move to at least one neighbor, we can oscillate back and forth between our current cell and that neighbor to pass time. Crucially, each round-trip takes exactly 2 seconds, which preserves the parity of time! Therefore, if we need to wait until `grid[x][y]`, we can only arrive at a time $\ge grid[x][y]$ that has the same parity as the nominal arrival time `t + 1`. The only way movement is completely impossible is if we cannot even make the very first move from `(0, 0)` (i.e., both `grid[0][1] > 1` and `grid[1][0] > 1`).

---

## Approach

### Brute Force Approach

A naive BFS attempting to track states as `(row, col, time)` would face an infinite or unbounded state space because time strictly increases and we can ping-pong endlessly. Without recognizing the 2-second parity rule, a naive search will loop endlessly or trigger Out of Memory / Time Limit Exceeded.

### Optimized Approach

Use Dijkstra's algorithm. First check the trap condition: if both `grid[0][1] > 1` and `grid[1][0] > 1`, return `-1` immediately. Otherwise, maintain a `dist[m][n]` table initialized to infinity and a min-priority queue storing `{time, r, c}`. When moving from `(i, j)` at time `t` to neighbor `(x, y)`: - The earliest step is `nt = t + 1`. - If `nt < grid[x][y]`, we must wait. The required time becomes `grid[x][y] + (grid[x][y] - nt) % 2` to match parity. - If `nt < dist[x][y]`, update `dist[x][y] = nt` and push `{nt, x, y}` to the queue. The first time the destination `(m - 1, n - 1)` is polled from the priority queue, return its arrival time.

### Step-by-Step Thinking Process

1. Can we always wait? Yes, by stepping back and forth between two cells. Each back-and-forth takes 2 steps.
2. Parity invariant: moving to an adjacent cell flips time parity ($t \to t + 1$). Waiting in place via ping-pong adds multiples of 2, so the parity of the arrival time at `(x, y)` is fixed to $(t + 1) \pmod 2$.
3. If `grid[x][y] <= t + 1`, arrival time is simply `t + 1`.
4. If `grid[x][y] > t + 1`, the earliest time we can enter `(x, y)` is `grid[x][y]` if $(grid[x][y] - (t + 1))$ is even, or `grid[x][y] + 1` if it is odd.
5. Formally: `nt = grid[x][y] + (grid[x][y] - nt) % 2`.
6. Because edge weights (effective transition times) are non-negative and we seek the minimum time path, Dijkstra's algorithm finds the shortest path optimally.

### Algorithm / Intuition

The initial check `grid[0][1] > 1 && grid[1][0] > 1` handles the only unsolvable case: being trapped at `(0, 0)` with no valid move at $t = 1$. We initialize `dist` with `1 << 30` (effectively $\infty$) and insert `{0, 0, 0}` into a min-priority queue `pq`. At each step, we poll the node with the minimum current arrival time `p = {t, i, j}`. If `i == m - 1 && j == n - 1`, we immediately return `p[0]` because Dijkstra guarantees that the first time a node is popped, its distance is minimal. For each of the 4 neighbors `(x, y)`, we compute the valid arrival time `nt`, accounting for parity if `nt < grid[x][y]`. If `nt < dist[x][y]`, we relax the distance and push `{nt, x, y}` into `pq`.

---

## Dry Run

Trace with Example 1: `grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]`.
- `m = 3, n = 4`. Check `grid[0][1] = 1 <= 1` -> start is not trapped.
- Start: `dist[0][0] = 0`, `pq = [[0, 0, 0]]`.
- Poll `[0, 0, 0]`. Neighbors:
  - `(0, 1)`: `nt = 0 + 1 = 1 >= grid[0][1] (1)`. `dist[0][1] = 1`, push `[1, 0, 1]`.
  - `(1, 0)`: `nt = 1 < grid[1][0] (5)`. Parity diff: `(5 - 1) % 2 = 0`. Adjusted `nt = 5 + 0 = 5`. `dist[1][0] = 5`, push `[5, 1, 0]`.
- Poll `[1, 0, 1]`. Neighbors include:
  - `(1, 1)`: `nt = 1 + 1 = 2 >= grid[1][1] (1)`. `dist[1][1] = 2`, push `[2, 1, 1]`.
  - `(0, 2)`: `nt = 2 < grid[0][2] (3)`. Parity diff: `(3 - 2) % 2 = 1`. Adjusted `nt = 3 + 1 = 4`. Push `[4, 0, 2]`.
- Dijkstra continues expanding cells by minimum time.
- Destination `(2, 3)` is eventually reached and popped at time 7.
Return `7`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n log(m * n))` — There are `m * n` cells. In Dijkstra's algorithm, each cell is added to the priority queue at most 4 times (once per neighbor direction). Heap operations take `O(log(m * n))` time. Total time is `O(m * n log(m * n))`.
- **Space Complexity:** `O(m * n)` — The `dist` matrix requires `O(m * n)` space and the priority queue `pq` stores at most `O(m * n)` states.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2577minimum-time-to-visit-a-cell-in-a-grid.java](./2577minimum-time-to-visit-a-cell-in-a-grid.java) |

---

## Key Learnings

- When forced to waste time in a grid, moving back and forth between two cells takes 2 time units, fixing the parity of the arrival time.
- Parity adjustment formula: `target + (target - current) % 2` guarantees the smallest valid arrival time $\ge target$ matching the required step parity.
- Dijkstra's algorithm handles dynamic arrival times cleanly as long as the transition cost is non-decreasing.
