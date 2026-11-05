---
comments: true
difficulty: Medium
tags:
  - Dynamic Programming
  - Graph Theory
  - Topological Sort
  - Shortest Path
  - Dijkstra's Algorithm
---

# 1976. Number of Ways to Arrive at Destination

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1976` (`1976`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Dynamic Programming`, `Graph Theory`, `Topological Sort`, `Shortest Path`, `Dijkstra's Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

A city has `n` intersections numbered `0` to `n - 1` connected by bi-directional roads. Each entry `roads[i] = [u_i, v_i, time_i]` represents a two-way road between `u_i` and `v_i` taking `time_i` minutes to traverse. The road network is connected, and at most one direct road exists between any pair of intersections.

Find how many distinct paths travel from intersection `0` to intersection `n - 1` in the **minimum possible travel time**. Return this count **modulo** `10^9 + 7`.

---

## Examples

### Example 1

```text
Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output: 4
Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
The four ways to get there in 7 minutes are:
- 0 ➝ 6
- 0 ➝ 4 ➝ 6
- 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
- 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
```

### Example 2

```text
Input: n = 2, roads = [[1,0,10]]
Output: 1
Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.
```

---

## Constraints

- `1 <= n <= 200`

- `n - 1 <= roads.length <= n * (n - 1) / 2`

- `roads[i].length == 3`

- `0 <= u_i, v_i <= n - 1`

- `1 <= time_i <= 10^9`

- `u_i!= v_i`

- There is at most one road connecting any two intersections.

- You can reach any intersection from any other intersection.

---

## Problem Understanding

- Road travel times are strictly positive (`1 <= time_i <= 10^9`), so shortest-path distances satisfy optimal substructure with no zero-weight or negative cycles.
- Total travel time along a path of up to `199` edges can reach `199 * 10^9 ~ 2 * 10^11`, which overflows 32-bit `int`—so distances and sentinel `inf` **must** use `long` (`Long.MAX_VALUE / 2` avoids overflow during `dist[t] + g[t][j]`).
- Notice the graph size constraint: `1 <= n <= 200`, while `roads.length` can be as dense as `n * (n - 1) / 2` (`~20,000` edges)! For dense graphs with small `n`, **un-heaped `O(n^2)` Dijkstra** on an adjacency matrix is both clean and asymptotically optimal!

---

## Approach

### Brute Force Approach

Enumerating all simple paths from `0` to `n - 1` via DFS/backtracking to find the minimum travel time and count matching paths takes `O(n!)` time in a complete graph of `n = 200` nodes, which is completely impossible.

### Optimized Approach

Combine **dense `O(n^2)` Dijkstra's algorithm** (using an `n x n` adjacency matrix `g`) with **dynamic programming** path counting (`f[j]` = number of shortest paths from `0` to `j` modulo `10^9 + 7`) updated on the fly whenever an edge relaxes or ties `dist[j]`.

### Step-by-Step Thinking Process

1. Build an `n x n` adjacency matrix `g` initialized to `inf = Long.MAX_VALUE / 2` (`g[0][0] = 0`) and fill `g[u][v] = g[v][u] = t` for each road.
2. Maintain `dist[j]` (shortest travel time from `0` to `j`, initialized to `inf` with `dist[0] = 0`), `f[j]` (ways to reach `j` in time `dist[j]`, with `f[0] = 1`), and `vis[j]` (whether node `j`'s shortest distance is finalized).
3. Repeat `n` times: linearly scan unvisited nodes to pick `t` with minimum `dist[t]`, and mark `vis[t] = true`. Because all edge weights are positive, `dist[t]` and `f[t]` are now permanently finalized!
4. Relax every other node `j != t` with candidate time `ne = dist[t] + g[t][j]`:
  - If `ne < dist[j]`, we found a strictly faster way to `j`, so reset `dist[j] = ne` and `f[j] = f[t]`.
  - If `ne == dist[j]`, we found additional shortest paths to `j` through `t`, so add `f[j] = (f[j] + f[t]) % mod`.
5. After all `n` nodes are processed, return `(int) f[n - 1]`.

### Algorithm / Intuition

Why can we update `f[j]` directly inside Dijkstra without a separate topological sort pass? Because all road times `time_i >= 1` are strictly positive! Whenever `t` is extracted as the unvisited node with minimum `dist[t]`, every shorter node has already been finalized and pushed its path count into `f[t]`, and no future node can ever change `dist[t]` or `f[t]`. Using `inf = Long.MAX_VALUE / 2` (~`4.6 * 10^18`) ensures `dist[t] + g[t][j]` never wraps around to a negative `long` when `g[t][j] == inf`.

---

## Dry Run

Tracing Example 1: `n = 7`, `roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]`:

| Iteration | Picked Node `t` (`dist[t]`, `f[t]`) | Key Neighbor Updates (`dist[j]`, `f[j]`) |
| :--- | :--- | :--- |
| 1 | `t = 0` (`dist = 0`, `f = 1`) | `1: (2, 1)`, `4: (5, 1)`, `6: (7, 1)` |
| 2 | `t = 1` (`dist = 2`, `f = 1`) | `2: (5, 1)`, `3: (5, 1)` |
| 3 | `t = 2` (`dist = 5`, `f = 1`) | `5: (6, 1)` |
| 4 | `t = 3` (`dist = 5`, `f = 1`) | `5: ne = 6 == dist[5]` -> `f[5] = 1 + 1 = 2`; `6: ne = 8 > 7` (ignored) |
| 5 | `t = 4` (`dist = 5`, `f = 1`) | `6: ne = 5 + 2 = 7 == dist[6]` -> `f[6] = 1 + 1 = 2` |
| 6 | `t = 5` (`dist = 6`, `f = 2`) | `6: ne = 6 + 1 = 7 == dist[6]` -> `f[6] = 2 + 2 = 4` |
| 7 | `t = 6` (`dist = 7`, `f = 4`) | Finalized! |

Returns `f[6] = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2 + m)` = `O(n^2)` — Populating `g` from `m` roads takes `O(n^2 + m)`, and the `n` outer iterations of dense Dijkstra each scan `n` vertices twice (`O(n^2)` total).
- **Space Complexity:** `O(n^2)` — The `n x n` adjacency matrix `g` uses `O(n^2)` space (with `n <= 200`, only `40,000` `long`s).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1976number-of-ways-to-arrive-at-destination.java](./1976number-of-ways-to-arrive-at-destination.java) |

---

## Key Learnings

- For dense graphs (`m = Theta(n^2)`) with small `n <= 200`, classic `O(n^2)` array-based Dijkstra actually beats heap-based `O(m log n)` (`O(n^2 log n)`) in both asymptotic complexity and cache locality!
- Shortest-path counting works seamlessly inside Dijkstra whenever **all edge weights are strictly positive**, because Dijkstra processes nodes in valid topological order of the Shortest-Path DAG.
- Use `Long.MAX_VALUE / 2` rather than `Long.MAX_VALUE` for infinity so `dist[t] + g[t][j]` never overflows signed 64-bit integers.
