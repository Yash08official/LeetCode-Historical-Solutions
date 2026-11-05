---
comments: true
difficulty: Medium
tags:
  - Array
  - Breadth-First Search
  - Matrix
---

# 1926. Nearest Exit from Entrance in Maze

**[View Problem on LeetCode](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1926` (`1926`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Matrix` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a **0-indexed** `m x n` character grid `maze`, where `'.'` marks an open walkway and `'+'` marks an impassable wall. You start at a given open cell `entrance = [entrance_row, entrance_col]`.

On each turn, you can step one cell **up**, **down**, **left**, or **right** into an open cell (`'.'`) that lies within the grid bounds. Your objective is to reach any **exit** in as few steps as possible. An exit is any open cell (`'.'`) located along the outer border of the grid (first row, last row, first column, or last column), **excluding** the starting `entrance` cell itself.

Return the minimum number of steps needed to reach the nearest exit, or `-1` if no exit can be reached.

---

## Examples

### Example 1

```text
Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
Output: 1
Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
Initially, you are at the entrance cell [1,2].
- You can reach [1,0] by moving 2 steps left.
- You can reach [0,2] by moving 1 step up.
It is impossible to reach [2,3] from the entrance.
Thus, the nearest exit is [0,2], which is 1 step away.
```

### Example 2

```text
Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
Output: 2
Explanation: There is 1 exit in this maze at [1,2].
[1,0] does not count as an exit since it is the entrance cell.
Initially, you are at the entrance cell [1,0].
- You can reach [1,2] by moving 2 steps right.
Thus, the nearest exit is [1,2], which is 2 steps away.
```

### Example 3

```text
Input: maze = [[".","+"]], entrance = [0,0]
Output: -1
Explanation: There are no exits in this maze.
```

---

## Constraints

- `maze.length == m`

- `maze[i].length == n`

- `1 <= m, n <= 100`

- `maze[i][j]` is either `'.'` or `'+'`.

- `entrance.length == 2`

- `0 <= entrance_row < m`

- `0 <= entrance_col < n`

- `entrance` will always be an empty cell.

---

## Problem Understanding

- Because every valid step has an identical cost of `1`, finding the minimum number of steps from `entrance` to any valid border cell is an **unweighted shortest-path** problem on a 2D grid.
- The starting `entrance` might itself lie on the grid border (as in Example 2), so we must never treat `entrance` as an exit.
- Grid dimensions are small (`1 <= m, n <= 100`), meaning there are at most `10,000` cells in total.

---

## Approach

### Brute Force Approach

A naive Depth-First Search (DFS) with backtracking could explore every possible non-repeating path from `entrance` to all reachable border cells and track the minimum path length. Because DFS does not explore paths in order of length, it cannot stop at the first border cell it reaches and may explore an exponential number of meandering paths (`O(4^(m * n))` in the worst case), causing Time Limit Exceeded even on modest grids.

### Optimized Approach

Use **level-order Breadth-First Search (BFS)** starting from `entrance`. By expanding outward layer by layer (1 step away, 2 steps away, and so on) and marking visited cells as walls (`'+'`) in-place immediately when enqueued, the very first valid border cell encountered is guaranteed to be the nearest exit.

### Step-by-Step Thinking Process

1. Recognize that shortest path in an unweighted grid calls for Breadth-First Search (BFS), where each BFS layer corresponds to one additional step.
2. Initialize a queue `q` with `entrance` and overwrite `maze[entrance[0]][entrance[1]]` with `'+'` right away so we neither revisit `entrance` nor mistake it for an exit.
3. Encode the four cardinal moves compactly using the 5-element array `dirs = [-1, 0, 1, 0, -1]`, where consecutive pairs `(dirs[l], dirs[l + 1])` represent up, right, down, and left.
4. For each BFS wave, increment step counter `ans` and process only the cells currently in `q`. When a neighbor `(x, y)` is in-bounds and open (`'.'`), check if it sits on the grid boundary (`x === 0 || x === m - 1 || y === 0 || y === n - 1`); if so, return `ans` immediately.
5. Otherwise, enqueue `[x, y]` and mark `maze[x][y] = '+'` before processing other cells in the same wave to prevent duplicate queue insertions.

### Algorithm / Intuition

The function `nearestExit` maintains a queue `q` initialized to `[entrance]` and mutates `maze` in-place by setting visited cells to `'+'`, avoiding a separate `visited` matrix. In each iteration of `while (q.length > 0)`, `ans` is incremented to represent the step count for neighbors discovered during this wave. The loop `for (let k = q.length - 1; k >= 0; --k)` snapshots the current frontier size and dequeues cells via `q.shift()`. For each cell `(i, j)`, `dirs` generates the four neighbors `(x, y)`. Whenever `(x, y)` is inside `[0, m) x [0, n)` and equals `'.'`, the border check triggers an immediate `return ans` if `(x, y)` lies on an edge; otherwise `[x, y]` is pushed to `q` and marked `'+'`. If `q` empties without reaching a border cell, `-1` is returned.

---

## Dry Run

Tracing `maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]]` (`m = 3, n = 4`), `entrance = [1, 2]`:

| Step / Event | `ans` | Dequeued `p = [i, j]` | Valid Open Neighbors `[x, y]` | Border Check & Queue Update |
| :--- | :--- | :--- | :--- | :--- |
| Init | `0` | — | — | `q = [[1, 2]]`, `maze[1][2] = '+'` |
| Wave 1 (`k = 0`) | `1` | `[1, 2]` | `l = 0`: `x = 0, y = 2` (`maze[0][2] === '.'`) | `x === 0` is on the top border -> **returns `1`** immediately! |

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` cells visited — Each cell is enqueued and marked `'+'` at most once, examining 4 neighbors per cell. (Note: in JavaScript, `q.shift()` takes `O(|q|)` per dequeue on a standard array, which adds up to `O((m * n)^2)` in the absolute worst case; using a read-index pointer achieves strict `O(m * n)`).
- **Space Complexity:** `O(m * n)` — In the worst case, the BFS frontier queue `q` holds `O(m * n)` coordinates, while visited tracking uses `O(1)` extra space by modifying `maze` in-place.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1926nearest-exit-from-entrance-in-maze.js](./1926nearest-exit-from-entrance-in-maze.js) |

---

## Key Learnings

- Marking cells visited **at enqueue time** (`maze[x][y] = '+'`) rather than dequeue time is critical in grid BFS; otherwise, multiple cells in the same wave can enqueue the same neighbor repeatedly and cause Memory/Time Limit Exceeded.
- Checking the exit condition when generating neighbors saves a full BFS wave compared to checking upon dequeue, and marking `entrance` as `'+'` upfront cleanly handles the rule that `entrance` cannot count as an exit.
- The 5-element array `[-1, 0, 1, 0, -1]` is a clean idiom for generating all four 4-directional offsets `(dirs[l], dirs[l + 1])` without two separate delta arrays.
