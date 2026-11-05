---
comments: true
difficulty: Medium
tags:
  - Array
  - Breadth-First Search
  - Graph Theory
---

# 3243. Shortest Distance After Road Addition Queries I

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3243` (`3243`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer `n` representing the number of cities, numbered from `0` to `n - 1`. Initially, there is a unidirectional road from city `i` to city `i + 1` for all `0 <= i < n - 1`.

You are also given a 2D integer array `queries`, where `queries[i] = [u_i, v_i]` represents adding a new unidirectional road from city `u_i` to city `v_i`.

After adding the road for each query, find the length of the shortest path from city `0` to city `n - 1`.

Return an array `answer` where `answer[i]` is the shortest path length after processing the first `i + 1` queries.

---

## Examples

### Example 1

**Input:** `n = 5, queries = [[2,4],[0,2],[0,4]]`

**Output:** `[3,2,1]`

**Explanation:**

After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.

After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.

After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

### Example 2

**Input:** `n = 4, queries = [[0,3],[0,2]]`

**Output:** `[1,1]`

**Explanation:**

After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.

After the addition of the road from 0 to 2, the length of the shortest path remains 1.

---

## Constraints

- `3 <= n <= 500`

- `1 <= queries.length <= 500`

- `queries[i].length == 2`

- `0 <= queries[i][0] < queries[i][1] < n`

- `1 < queries[i][1] - queries[i][0]`

- There are no repeated roads among the queries.

---

## Problem Understanding

- **Unweighted Directed Graph:** Every road has unit weight (length 1). Initially, the graph is a simple chain `0 -> 1 -> 2 -> ... -> n - 1` with initial distance `n - 1`.
- **Dynamic Edge Additions:** Each query adds a directed shortcut edge `u -> v` with `u < v` and `v - u > 1`.
- **Shortest Path on Unit Graph:** Because all edges have weight 1, Breadth-First Search (BFS) computes the single-source shortest path from node `0` to node `n - 1` in `O(V + E)` time.
- **Constraints:** With `n <= 500` and `queries.length <= 500`, running a full BFS after each query takes at most `500 * (500 + 1000) ~ 7.5 * 10^5` operations, which finishes in tens of milliseconds.

---

## Approach

### Brute Force Approach

The standard way to find unweighted shortest paths is BFS. Running BFS from node 0 after every query is already polynomial and well within the small constraints of problem 3243 (I). An even more naive approach using Floyd-Warshall `O(n^3)` per query would take `500 * 500^3 = 6.25 * 10^{10}` operations and time out.

### Optimized Approach

We maintain an adjacency list `g` of size `n`, initially containing edges `i -> i + 1`. For each query `[u, v]`, we add `v` to `g[u]` and execute a level-order BFS starting from node `0`. A queue `q` and a boolean array `vis` of size `n` manage visited nodes. As BFS advances layer by layer (tracked by depth `d`), the first time node `n - 1` is dequeued, `d` is returned as the shortest distance and recorded in `ans`.

### Step-by-Step Thinking Process

1. The graph is unweighted, directed, and starts with `n - 1` edges representing `i -> i + 1`.
2. Each query adds a single directed shortcut `u -> v`.
3. Since `n <= 500` and `queries.length <= 500`, `V + E` is at most `500 + 500 + 500 = 1500`.
4. Running a clean BFS from node 0 to node `n - 1` takes `O(V + E) = O(n + q)` per query.
5. Total time for all queries is `O(q * (n + q))`, which is less than `10^6` operations—exceptionally fast and simple.
6. Implement level-order BFS using a queue and visited array, returning depth `d` as soon as target `n - 1` is popped.

### Algorithm / Intuition

In `Solution.shortestDistanceAfterQueries`: we initialize adjacency list `g` and add initial roads `g[i].add(i + 1)`. For each query `[u, v]`, we add edge `g[u].add(v)`. Then, we call helper `bfs(0)`. In `bfs`, a queue `q` starts with node 0, and `vis[0] = true`. In each round of the BFS loop, `d` increments by 1. For each node `u` in the current layer, if `u == n - 1`, we immediately return `d`. Otherwise, for all unvisited neighbors `v` in `g[u]`, we mark `vis[v] = true` and push `v` into `q`. The returned level `d` is assigned to `ans[i]`.

---

## Dry Run

### Step-by-Step Execution on Example 1: `n = 5`, `queries = [[2,4],[0,2],[0,4]]`

Initial graph: `0 -> 1 -> 2 -> 3 -> 4`.

- **Query 0: `[2, 4]`**
  - Graph edges: `0->1, 1->2, 2->3, 3->4` plus shortcut `2->4`.
  - BFS from 0: depth 0 = `{0}`, depth 1 = `{1}`, depth 2 = `{2}`, depth 3 = `{3, 4}`.
  - Target 4 reached at depth 3. `ans[0] = 3`.

- **Query 1: `[0, 2]`**
  - Graph adds shortcut `0->2`.
  - BFS from 0: depth 0 = `{0}`, depth 1 = `{1, 2}`. From 2, neighbors are 3 and 4.
  - Depth 2 = `{..., 4}`. Target 4 reached at depth 2. `ans[1] = 2`.

- **Query 2: `[0, 4]`**
  - Graph adds shortcut `0->4`.
  - BFS from 0: depth 0 = `{0}`, depth 1 contains `{4}` directly.
  - Target 4 reached at depth 1. `ans[2] = 1`.

- **Result:** `ans = [3, 2, 1]`.

---

## Complexity Analysis

- **Time Complexity:** `O(q * (n + q))` — For each of the `q` queries, a BFS traverses at most `n` vertices and `n - 1 + q` edges, taking `O(n + q)` per query. With `n, q <= 500`, total operations are under `8 * 10^5`.
- **Space Complexity:** `O(n + q)` — Storing the adjacency list `g` requires `O(n + q)` space. The BFS queue and `vis` boolean array require `O(n)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3243shortest-distance-after-road-addition-queries-i.java](./3243shortest-distance-after-road-addition-queries-i.java) |

---

## Key Learnings

- In graphs with unit edge weights, BFS is the most direct and optimal algorithm for single-pair shortest path queries.
- When constraints are moderate (`n, q <= 500`), repeated BFS is simple, clean, and fast enough without requiring complex dynamic shortest-path structures.
