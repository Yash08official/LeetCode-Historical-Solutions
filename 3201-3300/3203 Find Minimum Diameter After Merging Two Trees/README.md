---
comments: true
difficulty: Hard
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
---

# 3203. Find Minimum Diameter After Merging Two Trees

**[View Problem on LeetCode](https://leetcode.com/problems/find-minimum-diameter-after-merging-two-trees/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3203` (`3203`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

You are given two undirected trees with `n` and `m` nodes, numbered from `0` to `n - 1` and `0` to `m - 1`, respectively. The edges of the two trees are given in 2D integer arrays `edges1` and `edges2`.

You must connect the two trees into a single tree by adding exactly one undirected edge between any node in the first tree and any node in the second tree.

Return the minimum possible diameter of the resulting merged tree. The diameter of a tree is defined as the length of the longest simple path between any pair of nodes.

---

## Examples

### Example 1

**Input:** `edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]`

**Output:** `3`

**Explanation:**

We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.

### Example 2

**Input:** `edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]`

**Output:** `5`

**Explanation:**

We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.

---

## Constraints

- `1 <= n, m <= 10^5`

- `edges1.length == n - 1`

- `edges2.length == m - 1`

- `edges1[i].length == edges2[i].length == 2`

- `edges1[i] = [a_i, b_i]`

- `0 <= a_i, b_i < n`

- `edges2[i] = [u_i, v_i]`

- `0 <= u_i, v_i < m`

- The input is generated such that `edges1` and `edges2` represent valid trees.

---

## Problem Understanding

- **Tree Diameter and Radius:** Let the diameters of the two trees be `d1` and `d2`. The radius of a tree with diameter `d` is `ceil(d / 2) = (d + 1) / 2`, representing the maximum distance from an optimal tree center to any other node.
- **Merged Tree Diameter Candidates:** When an edge connects node `u` in tree 1 and node `v` in tree 2, the longest path in the merged tree can be:
  1. Completely inside tree 1: length `d1`.
  2. Completely inside tree 2: length `d2`.
  3. Crossing the new edge: distance from furthest node in tree 1 to `u`, plus 1 (the new edge), plus distance from `v` to furthest node in tree 2.
- **Optimal Choice:** To minimize the crossing path, we connect the centers of the two trees, yielding a path length of `(d1 + 1) / 2 + (d2 + 1) / 2 + 1`.
- Hence, the answer is `max(d1, d2, (d1 + 1) / 2 + (d2 + 1) / 2 + 1)`.

---

## Approach

### Brute Force Approach

A brute force approach would test all `n * m` possible pairs of nodes `(u, v)`, add an edge between `u` and `v`, and compute the diameter of the combined tree using BFS/DFS. With `n, m <= 10^5`, this would require `O(n * m * (n + m))` operations, which would time out catastrophically.

### Optimized Approach

We compute the diameter of tree 1 (`d1`) and tree 2 (`d2`) independently using the standard two-DFS method. For a tree, a first DFS from node 0 identifies the furthest node `a`. A second DFS from `a` identifies the furthest node from `a` and the maximum distance `ans`, which is the tree's diameter. After finding `d1` and `d2`, the optimal merged diameter is computed directly as `Math.max(Math.max(d1, d2), (d1 + 1) / 2 + (d2 + 1) / 2 + 1)`.

### Step-by-Step Thinking Process

1. Connecting two trees with an edge creates a new tree whose diameter is bounded below by the existing diameters `d1` and `d2`.
2. Any path crossing between the trees has length `dist(x, u) + 1 + dist(v, y)`. To minimize the maximum such path, `u` and `v` must be the centers of tree 1 and tree 2, where maximum distance to any node is minimized to `ceil(d / 2)`.
3. Therefore, the minimum crossing path length is `(d1 + 1) / 2 + (d2 + 1) / 2 + 1`.
4. The overall answer is `max(d1, d2, (d1 + 1) / 2 + (d2 + 1) / 2 + 1)`.
5. To find the diameter of each tree in `O(V + E)` time, build the adjacency list and run two DFS traversals: DFS 1 finds the furthest leaf `a`, DFS 2 from `a` finds the maximum distance.

### Algorithm / Intuition

In `Solution.minimumDiameterAfterMerge`: `treeDiameter` builds an adjacency list `g` of size `edges.length + 1`. It initializes `ans = 0` and `a = 0`. The first call `dfs(0, -1, 0)` explores all nodes reachable from `0`, updating `ans = t` and `a = i` whenever a strictly deeper node is reached; upon return, `a` is one endpoint of a longest diameter path. The second call `dfs(a, -1, 0)` re-starts DFS from `a`, finding the longest path originating at `a`, which gives the exact tree diameter. We obtain `d1` and `d2`, and return `Math.max(Math.max(d1, d2), (d1 + 1) / 2 + (d2 + 1) / 2 + 1)`.

---

## Dry Run

### Step-by-Step Execution on Example 1: `edges1 = [[0,1],[0,2],[0,3]]`, `edges2 = [[0,1]]`

- **Tree 1:** 4 nodes (star graph centered at 0 with leaves 1, 2, 3).
  - `dfs(0, -1, 0)` visits leaves at depth 1. Furthest node `a = 1` (or 2 or 3).
  - `dfs(1, -1, 0)` explores from node 1: `1 -> 0 (t=1) -> 2 (t=2), 3 (t=2)`. Max distance `ans = 2`.
  - `d1 = 2`.
- **Tree 2:** 2 nodes connected by edge `[0, 1]`.
  - `dfs(0, -1, 0)` finds node 1 at depth 1. `a = 1`.
  - `dfs(1, -1, 0)` finds node 0 at depth 1. Max distance `ans = 1`.
  - `d2 = 1`.
- **Merged Tree Calculation:**
  - Radius 1 = `(2 + 1) / 2 = 1`.
  - Radius 2 = `(1 + 1) / 2 = 1`.
  - Crossing diameter = `1 + 1 + 1 = 3`.
  - Result: `max(max(2, 1), 3) = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m)` — We construct the adjacency lists and execute two DFS traversals on tree 1 (`O(n)` time) and two DFS traversals on tree 2 (`O(m)` time).
- **Space Complexity:** `O(n + m)` — Adjacency list representations `g` and DFS recursion call stacks require `O(n)` memory for the first tree and `O(m)` memory for the second tree.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3203find-minimum-diameter-after-merging-two-trees.java](./3203find-minimum-diameter-after-merging-two-trees.java) |

---

## Key Learnings

- The diameter of any unweighted tree can be found in two DFS/BFS passes: from an arbitrary node to find the furthest leaf, then from that leaf to find the maximum path length.
- When joining two trees with an edge to minimize diameter, always connect their topological centers, achieving a combined diameter of `ceil(d1 / 2) + ceil(d2 / 2) + 1`.
