---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Graph Theory
---

# 684. Redundant Connection

**[View Problem on LeetCode](https://leetcode.com/problems/redundant-connection/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0684` (`684`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Graph Theory` |
| **Solution Language** | JavaScript |

---

## Problem Description

A tree is a connected, undirected graph with no cycles. You are given a connected undirected graph on `n` vertices labeled `1` to `n` that started as a valid tree (`n - 1` edges) and had **one extra edge** added between two distinct vertices.

Given the `n` edges in `edges` (`edges[i] = [a_i, b_i]`), find and return an edge whose removal restores the graph to a valid tree of `n` nodes. If multiple edges could be removed, return the one that **appears last** in `edges`.

---

## Examples

### Example 1

```text
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

### Example 2

```text
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

---

## Constraints

- `n == edges.length`

- `3 <= n <= 1000`

- `edges[i].length == 2`

- `1 <= a_i < b_i <= edges.length`

- `a_i != b_i`

- There are no repeated edges.

- The given graph is connected.

---

## Problem Understanding

- **Tree + 1 Edge = Unique Cycle:** Adding one edge `(u, v)` to a tree creates **exactly one simple cycle** (consisting of `(u, v)` plus the unique tree path between `u` and `v`). Removing *any* edge on this cycle restores a connected tree, while removing any non-cycle edge disconnects the graph.
- **Why Incremental Union-Find Returns the Last Cycle Edge Automatically:** As we add edges one by one in input order, no two endpoints of an edge belong to the same connected component *until* the **final** edge of that unique cycle is processed! At that exact moment, all other edges of the cycle have already been added and merged into one component, so the first edge `(a_i, b_i)` whose endpoints already share a root *is* the last cycle edge in `edges`.

---

## Approach

### Brute Force Approach

For each edge from the end of `edges` (`i = n - 1` down to `0`), temporarily remove `edges[i]` and run a full DFS/BFS from node `1` to check whether all `n` nodes are still reachable (`O(n)` per edge), taking `O(n^2)` total time and `O(n)` graph construction space.

### Optimized Approach

Process `edges` sequentially using **Disjoint Set Union (Union-Find)** with path compression, returning the first edge `[a_i, b_i]` whose `0`-indexed endpoints already belong to the same connected component (`find(a - 1) === find(b - 1)`).

### Step-by-Step Thinking Process

1. Initialize a parent array `p` of length `n` where each node `0 .. n - 1` is initially its own root (`p[i] = i`).
2. Define recursive `find(x)` with **path compression**: if `p[x] !== x`, set `p[x] = find(p[x])` and return `p[x]`.
3. Iterate through `edges` in order (`i = 0, 1, ...`). Convert `1`-based labels to `0`-based indices (`edges[i][0] - 1` and `edges[i][1] - 1`) and find their component roots `pa` and `pb`.
4. If `pa === pb`, a path between these two vertices already exists in the edges seen so far — so `edges[i]` closes the cycle and is the last cycle edge in input order; return `edges[i]`.
5. Otherwise, union the two components via `p[pa] = pb`.

### Algorithm / Intuition

In `findRedundantConnection`, `p` tracks connected components dynamically as edges arrive. Every edge with `pa !== pb` merges two separate subtrees (`p[pa] = pb`), reducing the number of components by `1`. Because the graph has `n` vertices and a unique cycle, every non-cycle edge and the first `L - 1` edges of an `L`-edge cycle connect previously separate subtrees. Only the `L`-th (last-occurring) edge of the cycle sees `pa === pb`, letting us return `edges[i]` immediately without explicitly extracting the cycle.

---

## Dry Run

Tracing Example 1: `edges = [[1, 2], [1, 3], [2, 3]]` (`n = 3`):

- **Init:** `p = [0, 1, 2]` (for nodes `1, 2, 3`).
- **`i = 0`, edge `[1, 2]` (`0` and `1`):**
  - `pa = find(0) = 0`, `pb = find(1) = 1` (`0 !== 1`).
  - Union: `p[0] = 1` -> `p = [1, 1, 2]`.
- **`i = 1`, edge `[1, 3]` (`0` and `2`):**
  - `pa = find(0)` -> `p[0] = find(1) = 1`; `pb = find(2) = 2` (`1 !== 2`).
  - Union: `p[1] = 2` -> `p = [1, 2, 2]`.
- **`i = 2`, edge `[2, 3]` (`1` and `2`):**
  - `pa = find(1) = 2`, `pb = find(2) = 2` -> **`pa === pb` (`2 === 2`)**!
- **Return:** `[2, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` worst-case (`O(n * alpha(n))` with union by rank; practically `O(n)` here) — Processes up to `n` edges using Union-Find with path compression.
- **Space Complexity:** `O(n)` — The parent array `p` uses `O(n)` space, and recursive `find` uses up to `O(n)` call-stack space prior to compression.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [684redundant-connection.js](./684redundant-connection.js) |

---

## Key Learnings

- Union-Find is the canonical data structure for incremental cycle detection in undirected graphs.
- Because a tree plus one edge has a **single** cycle, the first edge that triggers `find(u) === find(v)` during a forward scan is guaranteed to be the *last* cycle edge in the input array.
- Pairing path compression (`p[x] = find(p[x])`) with union by rank/size upgrades worst-case amortized lookup time from `O(log n)` to inverse Ackermann `O(alpha(n))`.
