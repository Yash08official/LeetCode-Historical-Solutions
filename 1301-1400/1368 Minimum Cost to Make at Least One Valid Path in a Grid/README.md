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

# 1368. Minimum Cost to Make at Least One Valid Path in a Grid

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1368` (`1368`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Graph Theory`, `Heap (Priority Queue)`, `Matrix`, `Shortest Path`, `0-1 BFS`, `Dijkstra's Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` matrix `grid` where every cell contains a directional sign from `1` to `4`:
- `1`: move right `(i, j + 1)`
- `2`: move left `(i, j - 1)`
- `3`: move down `(i + 1, j)`
- `4`: move up `(i - 1, j)`

Starting at `(0, 0)`, a path is valid if following the signs leads to `(m - 1, n - 1)`. You may change the sign of any cell at most once for a `cost` of `1` per modified cell. Return the **minimum total cost** required to create a valid path from `(0, 0)` to `(m - 1, n - 1)`.

---

## Examples

### Example 1

```text
Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
Output: 3
Explanation: You will start at point (0, 0).
The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3)
The total cost = 3.
```

### Example 2

```text
Input: grid = [[1,1,3],[3,2,2],[1,1,4]]
Output: 0
Explanation: You can follow the path from (0, 0) to (2, 2).
```

### Example 3

```text
Input: grid = [[1,2],[4,3]]
Output: 1
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `1 <= m, n <= 100`

- `1 <= grid[i][j] <= 4`

---

## Problem Understanding

- Notice how the problem translates directly into a **shortest-path problem on a directed weighted graph**!
- From any cell `(i, j)`, moving to the neighbor matching `grid[i][j]` has edge weight **`0`** (keep the sign as-is), whereas moving to any of the other three neighbors has edge weight **`1`** (pay `1` to redirect `grid[i][j]`'s sign).
- Modifying a cell "one time only" never restricts a shortest simple path because a minimum-cost path never needs to visit the same cell twice.
- Since every edge weight is strictly `0` or `1`, **0-1 BFS** with a double-ended queue (`Deque`) finds the shortest path in optimal `O(m * n)` time—faster than Dijkstra's `O(m * n log(m * n))`!

---

## Approach

### Brute Force Approach

Exploring all simple paths with backtracking/DFS or running Bellman-Ford relaxes edges repeatedly in exponential or `O((m * n)^2)` time. Even standard Dijkstra's algorithm with a `PriorityQueue` incurs an extra `O(log(m * n))` heap factor on every push/pop.

### Optimized Approach

Run **0-1 BFS** from `(0, 0)` using an `ArrayDeque<int[]>` and a `boolean[][] vis` matrix: push `0`-cost moves (matching `grid[i][j] == k`) to the **front** of the deque (`offerFirst`) and `1`-cost moves to the **back** (`offer`), marking cells visited when popped.

### Step-by-Step Thinking Process

1. Align a 1-indexed direction array `dirs = {{0,0}, {0,1}, {0,-1}, {1,0}, {-1,0}}` so index `k` (`1..4`) matches the exact problem codes (`1`=right, `2`=left, `3`=down, `4`=up).
2. Push initial state `{0, 0, 0}` (`row = 0, col = 0, cost = 0`) into `ArrayDeque q`.
3. Maintain the 0-1 BFS deque invariant (all states in `q` are monotonically non-decreasing in `cost` `d`): when popping `{i, j, d}` from the front, if `i == m - 1 && j == n - 1`, `d` is guaranteed minimal—return `d`!
4. Check `if (vis[i][j]) continue;` and mark `vis[i][j] = true` **upon popping** (not upon pushing, because a cell first pushed at `d + 1` to the back might subsequently be reached at cost `d` and pushed to the front!).
5. For each direction `k = 1..4`, if neighbor `(x, y)` is inside the grid, call `q.offerFirst({x, y, d})` if `grid[i][j] == k`, else `q.offer({x, y, d + 1})`.

### Algorithm / Intuition

Why does 0-1 BFS maintain sorted order inside `Deque q` without a heap? At any moment, `q` contains states of at most two consecutive costs `[d, ..., d, d + 1, ..., d + 1]`. Popping from the front always yields minimum cost `d`. Expanding a `0`-weight edge creates a state of cost `d`, which `q.offerFirst` places at the **front** (before all `d` and `d + 1` items); expanding a `1`-weight edge creates cost `d + 1`, which `q.offer` places at the **back** (after all `d + 1` items). Thus `q` stays sorted in `O(1)` per edge! Marking `vis[i][j] = true` lazily when popped ensures each cell is settled at its true minimum cost.

---

## Dry Run

Tracing `grid = [[1,1,1,1], [2,2,2,2], [1,1,1,1], [2,2,2,2]]` (**Example 1**, `4 x 4`):

1. **Cost `d = 0` wave:**
   - Start `{0, 0, 0}`. Since row `0` has `1`s (right), `offerFirst` chains `(0,0) -> (0,1) -> (0,2) -> (0,3)` all at `d = 0`! Meanwhile, downward neighbors `(1,0), (1,1), (1,2), (1,3)` are pushed to the back at `d = 1`.
2. **Cost `d = 1` wave:**
   - Pop `{1, 0, 1}` .. `{1, 3, 1}`: row `1` has `2`s (left), so from `(1, 3)` `offerFirst` sweeps `(1,3) -> (1,2) -> (1,1) -> (1,0)` at `d = 1`, while pushing row `2` cells `(2, 0..3)` to the back at `d = 2`.
3. **Cost `d = 2` wave:**
   - Row `2` has `1`s (right), sweeping `(2,0) -> (2,1) -> (2,2) -> (2,3)` at `d = 2`, pushing row `3` cells `(3, 0..3)` to the back at `d = 3`.
4. **Cost `d = 3` wave:**
   - When `{3, 3, 3}` (reached from `(2, 3)` + cost `1`, or swept along row `3`) is popped at `i == 3 && j == 3`, returns `d = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Every cell `(i, j)` is marked `vis[i][j] = true` and expanded at most once, pushing at most `4` entries into the deque (`<= 4 * m * n` `O(1)` deque operations total).
- **Space Complexity:** `O(m * n)` — Both `vis[m][n]` and `Deque q` hold at most `O(m * n)` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1368minimum-cost-to-make-at-least-one-valid-path-in-a-grid.java](./1368minimum-cost-to-make-at-least-one-valid-path-in-a-grid.java) |

---

## Key Learnings

- Whenever graph edge weights are restricted to `{0, 1}`, **0-1 BFS** (`offerFirst` for `0`, `offerLast` for `1`) shaves off Dijkstra's `log V` factor to achieve optimal `O(V + E)` runtime.
- In 0-1 BFS (just like Dijkstra), **never** mark `vis[x][y] = true` when pushing a `1`-cost edge—mark `vis[i][j] = true` when **popping** from the front so a later `0`-cost shortcut can win.
- Padding `dirs` with a dummy `{0, 0}` at index `0` maps 1-based direction codes `1..4` cleanly without `- 1` index offsets.
