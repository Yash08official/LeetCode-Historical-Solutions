---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Graph Theory
---

# 547. Number of Provinces

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-provinces/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0547` (`547`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

You are given `n` cities represented by an `n x n` symmetric binary matrix `isConnected`. Each entry `isConnected[i][j]` is `1` if city `i` and city `j` share a direct road, and `0` otherwise (with every city trivially connected to itself, so `isConnected[i][i] == 1`).

Connectivity between cities is transitive: if city `a` connects directly to city `b`, and city `b` connects directly to city `c`, then `a` and `c` are indirectly connected. A **province** is defined as a maximal group of cities that are directly or indirectly connected to one another, with no connections to any cities outside the group.

Your task is to compute and return the total number of provinces.

---

## Examples

### Example 1

```text
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
```

### Example 2

```text
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
```

---

## Constraints

- `1 <= n <= 200`

- `n == isConnected.length`

- `n == isConnected[i].length`

- `isConnected[i][j]` is `1` or `0`.

- `isConnected[i][i] == 1`

- `isConnected[i][j] == isConnected[j][i]`

---

## Problem Understanding

- **Graph Formulation:** The `n` cities correspond to vertices `0` through `n - 1` in an undirected graph, and `isConnected` is its adjacency matrix.
- **Connected Components:** A "province" is simply a connected component of this undirected graph. Counting provinces reduces to counting how many connected components exist.
- **Symmetry & Self-Loops:** Since `isConnected[i][j] == isConnected[j][i]`, edges are undirected. Diagonal entries `isConnected[i][i] == 1` do not merge distinct cities, and isolated cities each form their own province of size `1`.

---

## Approach

### Brute Force Approach

A naive approach without tracking visited vertices globally might repeatedly run reachability searches between every pair of cities `(i, j)` to group connected pairs, or repeatedly scan the matrix to merge sets manually without a proper traversal or Union-Find structure, taking `O(n^3)` time (for example, computing transitive closure via Floyd-Warshall in `O(n^3)` time and `O(n^2)` space before counting components).

### Optimized Approach

Treat `isConnected` as an adjacency matrix and perform **Depth-First Search (DFS)** using a boolean `vis` array to mark all cities in each connected component, incrementing the province counter whenever an unvisited city initiates a new traversal.

### Step-by-Step Thinking Process

1. Recognize that each province corresponds to one connected component in an undirected graph of `n` nodes.
2. Maintain a boolean array `vis` of length `n` so we never explore the same city more than once.
3. Iterate through every city `i` from `0` to `n - 1`. If `vis[i]` is `false`, city `i` belongs to a newly discovered province.
4. Launch a recursive `dfs(i)` that marks `vis[i] = true` and scans row `g[i]` for any unvisited neighbor `j` where `g[i][j] == 1`, recursively visiting all reachable cities in that province.
5. Increment the province count `ans` after starting each top-level DFS, and return `ans` once all cities are checked.

### Algorithm / Intuition

In the solution, `g` stores a reference to `isConnected` and `vis` is a `boolean[n]` array initialized to `false`. The outer loop in `findCircleNum` checks each city index `i` from `0` to `n - 1`. Whenever `!vis[i]` holds, we have encountered a city not reachable from any previously explored province.

Calling `dfs(i)` marks `vis[i] = true` and inspects all potential neighbors `j` (`0 <= j < g.length`). Whenever `!vis[j] && g[i][j] == 1`, `dfs(j)` is invoked recursively, flooding through every direct and indirect connection in the current component. Once `dfs(i)` finishes, every city in that province has `vis` set to `true`, and `++ans` records one complete province.

---

## Dry Run

Tracing `isConnected = [[1,1,0],[1,1,0],[0,0,1]]` (`n = 3`):

- **Initialization:** `vis = [false, false, false]`, `ans = 0`.
- **`i = 0`:** `!vis[0]` is `true` -> call `dfs(0)`:
  - `vis[0] = true` (`vis = [true, false, false]`).
  - `j = 0`: `vis[0]` is already `true` (skip).
  - `j = 1`: `!vis[1] && g[0][1] == 1` -> call `dfs(1)`:
    - `vis[1] = true` (`vis = [true, true, false]`).
    - Scans `j = 0, 1, 2`: `vis[0]` and `vis[1]` are `true`, `g[1][2] == 0` -> `dfs(1)` returns.
  - `j = 2`: `g[0][2] == 0` (skip) -> `dfs(0)` returns.
  - Increment `ans` to `1`.
- **`i = 1`:** `vis[1]` is `true` -> skip.
- **`i = 2`:** `!vis[2]` is `true` -> call `dfs(2)`:
  - `vis[2] = true` (`vis = [true, true, true]`).
  - Scans `j = 0, 1, 2`: `g[2][0] == 0`, `g[2][1] == 0`, `vis[2]` is `true` -> `dfs(2)` returns.
  - Increment `ans` to `2`.
- **Return:** `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Each of the `n` cities is visited by `dfs` exactly once, and each `dfs(i)` call scans all `n` entries of row `g[i]` in the adjacency matrix.
- **Space Complexity:** `O(n)` — The `vis` array uses `O(n)` space, and the recursion stack in `dfs` reaches at most `O(n)` depth in a path-like component (`g` only aliases the input matrix).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [547number-of-provinces.java](./547number-of-provinces.java) |

---

## Key Learnings

- Counting groups with transitive relationships directly maps to counting connected components in an undirected graph.
- When the input graph is already given as an `n x n` adjacency matrix, `O(n^2)` time is optimal because reading the matrix itself requires inspecting up to `n^2` entries.
- DFS, BFS, and Disjoint Set Union (Union-Find) all solve this in `O(n^2)` time on an adjacency matrix, with DFS offering a concise `O(n)`-space implementation.
