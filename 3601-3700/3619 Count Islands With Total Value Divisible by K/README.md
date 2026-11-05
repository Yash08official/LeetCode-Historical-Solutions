---
comments: true
difficulty: Medium
tags:
  - Array
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Matrix
---

# 3619. Count Islands With Total Value Divisible by K

**[View Problem on LeetCode](https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3619` (`3619`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` integer matrix `grid` and a positive integer `k`.

An **island** is defined as a maximal group of positive integers (representing land) that are connected **4-directionally** (horizontally or vertically). Cells with a value of `0` represent water.

The **total value** of an island is defined as the sum of the values of all cells comprising that island.

Return the total number of islands whose total value is **divisible by `k`** (i.e., `total_value % k == 0`).

---

## Examples

### Example 1

**Input:** `grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]], k = 5`

**Output:** `2`

**Explanation:**

The grid contains four islands. The islands highlighted in blue have a total value that is divisible by 5, while the islands highlighted in red do not.

### Example 2

**Input:** `grid = [[3,0,3,0], [0,3,0,3], [3,0,3,0]], k = 3`

**Output:** `6`

**Explanation:**

The grid contains six islands, each with a total value that is divisible by 3.

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `1 <= m, n <= 1000`

- `1 <= m * n <= 10^5`

- `0 <= grid[i][j] <= 10^6`

- `1 <= k <= 10^6`

---

## Problem Understanding

Key observations and requirements:
1. **Connectivity**: Islands are defined by 4-directional adjacency (up, down, left, right). Diagonal adjacencies do not connect cells.
2. **Land Cells**: Only cells with `grid[i][j] > 0` belong to an island. Cells with `grid[i][j] == 0` are water.
3. **Divisibility Condition**: For each connected component of positive numbers, compute `sum` of cell values. If `sum % k == 0`, increment the island counter.
4. **Sum Magnitude**: Since each cell can be up to `10^6` and `m * n <= 10^5`, the total sum of an island can reach `10^11`, which exceeds standard 32-bit signed integer limits. Using a 64-bit `long` for `sum` is essential to prevent integer overflow.

---

## Approach

### Brute Force Approach

A basic approach traverses the grid cell-by-cell. Whenever an unvisited land cell is found, perform a standard recursive DFS or BFS to traverse the component, sum the values, mark cells as visited using a boolean array `visited[m][n]`, and check `sum % k == 0`.
The recursive DFS risk is call stack overflow when an island forms a snake of length up to `10^5` in deep recursion. The optimal iterative approach avoids call stack overflow and can modify `grid` in-place without needing extra `visited` memory.

### Optimized Approach

The implemented solution uses an **iterative Depth-First Search with an explicit array stack**:
1. Iterate through each cell `(i, j)` in the grid.
2. If `grid[i][j] == 0`, skip it.
3. If `grid[i][j] > 0`, we have discovered a new unvisited island:
   - Initialize `sum = 0` as a 64-bit `long`.
   - Push the 1D encoded coordinate `i * n + j` onto an explicit integer array `stack`.
   - Add `grid[i][j]` to `sum` and mark it visited immediately by setting `grid[i][j] = 0`.
   - Pop coordinates from `stack`, explore all 4 orthogonal neighbors `(nr, nc)`. For each neighbor that is within bounds and has `grid[nr][nc] != 0`:
     - Accumulate `grid[nr][nc]` into `sum`.
     - In-place mark `grid[nr][nc] = 0` to prevent duplicate visits.
     - Push `nr * n + nc` onto `stack`.
4. Once the stack is empty, the entire connected island has been traversed. If `sum % k == 0`, increment `count`.
5. Return the total `count` after scanning all cells.

### Step-by-Step Thinking Process

1. Identify this as a standard connected components problem on an implicit grid graph with an aggregation rule (summing cell values) and a divisibility filter.
2. Recognize that `grid[i][j] <= 10^6` and component size up to `10^5` means the component sum can exceed `2^31 - 1`, requiring a `long` accumulator to prevent overflow.
3. Choose an iterative stack over recursive DFS to guarantee safety against Java `StackOverflowError` on large snake-like inputs up to `10^5` cells.
4. Encode 2D grid coordinates `(r, c)` into a single integer `r * n + c` to store them efficiently in a flat 1D `int[] stack`.
5. Mark cells visited immediately upon pushing them to the stack by resetting `grid[nr][nc] = 0`, ensuring each cell is pushed exactly once.

### Algorithm / Intuition

In `Solution.countIslands`:
- `dr = {-1, 1, 0, 0}` and `dc = {0, 0, -1, 1}` define the 4-directional neighbor offsets.
- `stack` is allocated once with size `m * n`, avoiding repetitive heap allocations or `java.util.Stack` overhead.
- As the outer loops scan `(i, j)`, hitting any `grid[i][j] != 0` anchors a new island.
- In-place zeroing (`grid[nr][nc] = 0`) serves as the visited flag, avoiding the memory overhead of a separate `boolean[][] visited` matrix.
- `pos / n` extracts row index `r`, and `pos % n` extracts column index `c`.
- Checking `sum % k == 0` evaluates whether the island meets the target divisibility criteria.

---

## Dry Run

Consider `grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]]`, `k = 5`:

- `(0, 1)`: `grid[0][1] = 2 > 0`. Start Island 1:
  - Push `(0, 1)`, set `grid[0][1] = 0`, `sum = 2`.
  - Pop `(0, 1)`:
    - Down neighbor `(1, 1)` has value 5: `sum = 2 + 5 = 7`, set `grid[1][1] = 0`, push `(1, 1)`.
    - Right neighbor `(0, 2)` has value 1: `sum = 7 + 1 = 8`, set `grid[0][2] = 0`, push `(0, 2)`.
  - Process `(0, 2)`: no unvisited neighbors.
  - Process `(1, 1)`: no unvisited positive neighbors.
  - Island 1 sum = 8. `8 % 5 = 3 != 0`. `count` remains 0.

- `(1, 4)`: `grid[1][4] = 5 > 0`. Start Island 2:
  - Push `(1, 4)`, set `grid[1][4] = 0`, `sum = 5`.
  - Pop `(1, 4)`: all neighbors are 0.
  - Island 2 sum = 5. `5 % 5 == 0`. `count` becomes 1.

- `(2, 2)`: `grid[2][2] = 1 > 0`. Start Island 3:
  - Traverses `(2, 2) [1]`, `(3, 2) [4]`, `(3, 1) [1]`, `(3, 3) [7]`, `(4, 1) [2]`.
  - `sum = 1 + 4 + 1 + 7 + 2 = 15`.
  - `15 % 5 == 0`. `count` becomes 2.

- `(4, 4)`: `grid[4][4] = 8 > 0`. Start Island 4:
  - Single cell `(4, 4)`. `sum = 8`.
  - `8 % 5 = 3 != 0`. `count` remains 2.

- Final returned count = 2.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Every cell in the grid is visited by the outer loops once, and each land cell is pushed and popped from the stack exactly once because it is set to `0` upon discovery.
- **Space Complexity:** `O(m * n)` — The preallocated `stack` array holds up to `m * n` integers in the worst case (when the entire grid is a single connected landmass).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3619count-islands-with-total-value-divisible-by-k.java](./3619count-islands-with-total-value-divisible-by-k.java) |

---

## Key Learnings

- In connected component searches on grids with deep paths, preallocating a flat 1D primitive array `stack` avoids both recursion stack overflows and object allocation overhead.
- Coordinate flattening (`r * n + c`) provides an efficient, allocation-free way to push 2D grid coordinates onto a single primitive stack.
- When cell values and grid sizes can produce large sums (`10^6 * 10^5 = 10^11`), using 64-bit integer accumulators (`long`) is required to avoid silent arithmetic overflow.
