---
comments: true
difficulty: Medium
tags:
  - Graph Theory
---

# 2924. Find Champion II

**[View Problem on LeetCode](https://leetcode.com/problems/find-champion-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2924` (`2924`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

We are given an integer `n` representing the number of teams (labeled from `0` to `n - 1`) participating in a tournament, and a 2D array `edges` where each directed edge `edges[i] = [u, v]` signifies that team `u` is stronger than team `v`. The directed graph is guaranteed to be a Directed Acyclic Graph (DAG).

A team is considered a champion if there is no other team that is strictly stronger than them (meaning they have no incoming edges in the DAG). If there exists exactly one such undefeated team that can be crowned the unique champion of the tournament, return its index. If there are multiple candidate champions or no unique champion can be determined, return `-1`.

---

## Examples

### Example 1

```text
Input: n = 3, edges = [[0,1],[1,2]]
Output: 0
Explanation: Team 1 is weaker than team 0. Team 2 is weaker than team 1. So the champion is team 0.
```

### Example 2

```text
Input: n = 4, edges = [[0,2],[1,3],[1,2]]
Output: -1
Explanation: Team 2 is weaker than team 0 and team 1. Team 3 is weaker than team 1. But team 1 and team 0 are not weaker than any other teams. So the answer is -1.
```

---

## Constraints

- `1 <= n <= 100`

- `m == edges.length`

- `0 <= m <= n * (n - 1) / 2`

- `edges[i].length == 2`

- `0 <= edge[i][j] <= n - 1`

- `edges[i][0] != edges[i][1]`

- The input is generated such that if team `a` is stronger than team `b`, team `b` is not stronger than team `a`.

- The input is generated such that if team `a` is stronger than team `b` and team `b` is stronger than team `c`, then team `a` is stronger than team `c`.

---

## Problem Understanding

Key properties and invariants of the tournament DAG:
- A directed edge `u -> v` means team `u` defeats team `v`. Consequently, team `v` cannot be the champion because someone is strictly stronger than `v`.
- In graph terms, any node with an in-degree greater than 0 has at least one incoming edge and is disqualified from being a champion.
- Only nodes with an in-degree equal to 0 are undefeated candidates.
- If exactly one node has `indegree == 0`, it is reachable from no one and dominates the tournament, making it the unique champion.
- If there are zero nodes or strictly more than one node with `indegree == 0`, there is ambiguity (no single undefeated leader), so we must return `-1`.

---

## Approach

### Brute Force Approach

A naive approach would perform a breadth-first search (BFS) or depth-first search (DFS) starting from every node `0` to `n - 1` to find how many other nodes each team can reach. A team could be verified as the champion only if it can reach all other `n - 1` nodes in the DAG. Running a full traversal from every node takes `O(n * (n + m))` time, which is unnecessarily slow for a graph where checking in-degrees alone is both necessary and sufficient.

### Optimized Approach

We maintain an in-degree frequency array `indeg` of length `n`. We iterate through all edges `[u, v]` and increment `indeg[v]`. Then, we scan the in-degrees of all `n` teams: whenever `indeg[i] == 0`, we increment a counter `cnt` and record candidate index `ans = i`. If `cnt == 1`, we return `ans`; otherwise, we return `-1`.

### Step-by-Step Thinking Process

1. Recognize that in a DAG representation of a tournament, an edge `u -> v` directly implies that team `v` has lost to team `u`.
2. Any team that has lost at least one match has an in-degree of at least 1 and cannot be the supreme champion.
3. Therefore, potential champions are precisely the nodes with in-degree 0.
4. If more than one node has in-degree 0, neither can claim superiority over the other, meaning there is no unique champion.
5. Hence, the problem reduces to simply counting nodes with in-degree 0 and verifying that count equals 1.

### Algorithm / Intuition

The algorithm operates directly on graph topology:
1. Allocate an array `indeg` of size `n` initialized to `0`.
2. For each edge `e` in `edges`, increment `indeg[e[1]]` because `e[1]` is the defeated team receiving an incoming edge.
3. Traverse indices `0` through `n - 1`. If `indeg[i] == 0`, increment `cnt` and store `ans = i`.
4. Check the count: if `cnt == 1`, team `ans` is the only node with no incoming edges, so return `ans`. If `cnt != 1`, return `-1`.

---

## Dry Run

Trace on Example 1: `n = 3, edges = [[0, 1], [1, 2]]`

- Initialize `indeg = [0, 0, 0]`.
- Process edge `[0, 1]`: `indeg[1]` becomes `1`. Array is `[0, 1, 0]`.
- Process edge `[1, 2]`: `indeg[2]` becomes `1`. Array is `[0, 1, 1]`.
- Scan `indeg`:
  - `i = 0`: `indeg[0] == 0` -> `++cnt` (now `cnt = 1`), `ans = 0`.
  - `i = 1`: `indeg[1] == 1` -> skip.
  - `i = 2`: `indeg[2] == 1` -> skip.
- Final check: `cnt == 1` is true. Return `ans = 0`.

---

## Complexity Analysis

- **Time Complexity:** O(n + m) — We iterate through all `m` edges to populate in-degrees, followed by a single linear pass of size `n` to count zero-in-degree nodes.
- **Space Complexity:** O(n) — An integer array `indeg` of size `n` is allocated to record the in-degree of each team.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2924find-champion-ii.java](./2924find-champion-ii.java) |

---

## Key Learnings

- In tournament DAGs, an undefeated participant corresponds directly to a source node (in-degree 0).
- A unique champion exists if and only if there is exactly one source node in the DAG.
- Identifying graph source nodes requires only counting in-degrees in linear time rather than performing full reachability traversals.
