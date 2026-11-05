---
comments: true
difficulty: Medium
tags:
  - Array
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Matrix
  - Counting
---

# 1267. Count Servers that Communicate

**[View Problem on LeetCode](https://leetcode.com/problems/count-servers-that-communicate/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1267` (`1267`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Matrix`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` binary matrix `grid` representing a server center layout, where `1` indicates the presence of a server in that cell and `0` indicates an empty cell.

Two distinct servers can communicate with each other if they are located in the **same row** or the **same column**. Your task is to count and return the total number of servers that can communicate with **at least one** other server.

---

## Examples

### Example 1

```text
Input: grid = [[1,0],[0,1]]
Output: 0
Explanation: No servers can communicate with others.
```

### Example 2

```text
Input: grid = [[1,0],[1,1]]
Output: 3
Explanation: All three servers can communicate with at least one other server.
```

### Example 3

```text
Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
Output: 4
Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `1 <= m <= 250`

- `1 <= n <= 250`

- `grid[i][j] == 0 or 1`

---

## Problem Understanding

- A server at `(i, j)` (`grid[i][j] == 1`) is isolated if and only if it is the **only** server in row `i` AND the **only** server in column `j`.
- Conversely, a server communicates with another server whenever the total number of servers in row `i` is greater than `1`, OR the total number of servers in column `j` is greater than `1`.
- Even though the problem tags mention graph traversal (`DFS`, `BFS`, `Union-Find`), direct degree/frequency counting per row and column completely characterizes connectivity for individual servers without building an explicit graph.
- Since `1 <= m, n <= 250`, at most `62,500` cells exist, so linear scans over the grid are very fast.

---

## Approach

### Brute Force Approach

For every cell `(i, j)` containing a server (`grid[i][j] == 1`), scan all `n` cells in row `i` and all `m` cells in column `j` to check whether another `1` exists at a different position. Performing an `O(m + n)` scan for up to `m * n` servers results in `O(m * n * (m + n))` time complexity, repeatedly scanning the same rows and columns.

### Optimized Approach

Use a two-pass counting strategy with two auxiliary frequency arrays—`row` of length `m` and `col` of length `n`—to precompute how many servers sit in each row and column in `O(m * n)` time, then count every server whose row count or column count exceeds `1`.

### Step-by-Step Thinking Process

1. Observe that whether a server at `(i, j)` can communicate depends solely on whether row `i` has at least `2` servers or column `j` has at least `2` servers.
2. Instead of rescanning row `i` and column `j` for every server, accumulate row and column server totals in a single pass.
3. Create `row[m]` and `col[n]` initialized to `0`, and increment `row[i]` and `col[j]` whenever `grid[i][j] == 1`.
4. Perform a second pass over the grid: for each cell with `grid[i][j] == 1`, check `row[i] > 1 || col[j] > 1` and increment the answer if true.

### Algorithm / Intuition

In `countServers`, `row[i]` stores the total number of servers in row `i`, and `col[j]` stores the total number of servers in column `j`. Because the server at `(i, j)` contributes `1` to both `row[i]` and `col[j]`, having `row[i] > 1` guarantees at least one other server shares row `i`, and having `col[j] > 1` guarantees at least one other server shares column `j`. Using logical OR (`row[i] > 1 || col[j] > 1`) ensures each communicating server is counted exactly once in `ans`, even if it communicates along both its row and its column.

---

## Dry Run

Tracing `grid = [[1, 0], [0, 1]]` (`m = 2`, `n = 2`) from **Example 1**:

**Pass 1 — Count servers per row and column:**
- `(i = 0, j = 0)`: `grid[0][0] == 1` -> `row = [1, 0]`, `col = [1, 0]`
- `(i = 0, j = 1)`: `grid[0][1] == 0` -> unchanged
- `(i = 1, j = 0)`: `grid[1][0] == 0` -> unchanged
- `(i = 1, j = 1)`: `grid[1][1] == 1` -> `row = [1, 1]`, `col = [1, 1]`

**Pass 2 — Count communicating servers (`ans = 0`):**
- `(i = 0, j = 0)`: `grid[0][0] == 1`, check `row[0] > 1 || col[0] > 1` (`1 > 1 || 1 > 1` is `false`) -> `ans = 0`
- `(i = 1, j = 1)`: `grid[1][1] == 1`, check `row[1] > 1 || col[1] > 1` (`1 > 1 || 1 > 1` is `false`) -> `ans = 0`

Return `ans = 0`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — We traverse the `m x n` matrix twice, doing `O(1)` work per cell.
- **Space Complexity:** `O(m + n)` — The `row` and `col` integer arrays require `m` and `n` elements respectively.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1267count-servers-that-communicate.java](./1267count-servers-that-communicate.java) |

---

## Key Learnings

- Before reaching for DFS, BFS, or Union-Find on grid connectivity problems, check if the condition asks for component counts or simply non-isolated nodes (`degree >= 1`).
- Precomputing row and column marginals (`row[i]`, `col[j]`) reduces repeated `O(m + n)` line scans to `O(1)` lookups.
- Using `row[i] > 1 || col[j] > 1` naturally avoids double-counting a server that shares both a row and a column with other servers.
