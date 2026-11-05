---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
  - Topological Sort
  - Kosaraju's Algorithm
  - Tarjan's SCC Algorithm
---

# 802. Find Eventual Safe States

**[View Problem on LeetCode](https://leetcode.com/problems/find-eventual-safe-states/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0802` (`802`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Graph Theory`, `Topological Sort`, `Kosaraju's Algorithm`, `Tarjan's SCC Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

You are given a directed graph of `n` nodes (`0` to `n - 1`) as a 0-indexed adjacency list `graph`, where `graph[i]` lists all nodes `j` reachable via a directed edge `i -> j`.

- A **terminal node** has no outgoing edges (`graph[i].length == 0`).
- A **safe node** is a node from which **every** possible outgoing path eventually terminates at a terminal node (i.e., cannot enter any cycle).

Return all safe nodes sorted in **ascending** order.

---

## Examples

### Example 1

```text
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
```

### Example 2

```text
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
Explanation:
Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
```

---

## Constraints

- `n == graph.length`

- `1 <= n <= 10^4`

- `0 <= graph[i].length <= n`

- `0 <= graph[i][j] <= n - 1`

- `graph[i]` is sorted in a strictly increasing order.

- The graph may contain self-loops.

- The number of edges in the graph will be in the range `[1, 4 * 10^4]`.

---

## Problem Understanding

- A node is unsafe if and only if at least one path starting from it can reach a directed cycle (including a self-loop).
- Conversely, terminal nodes are trivially safe, and any node whose **every** outgoing edge points to an already-known safe node is also safe!
- Reversing the edge directions allows us to propagate safety backward from terminal nodes using **Kahn's topological sort algorithm**.

---

## Approach

### Brute Force Approach

Starting an independent cycle-detection DFS from every node `0 .. n - 1` without cross-call state memoization re-traverses shared subgraphs repeatedly, taking `O(V * (V + E))` time in the worst case.

### Optimized Approach

Build the **reversed graph** `rg` while recording each node's original out-degree in `indeg`, seed a BFS queue `q` with all terminal nodes (`indeg[i] == 0`), peel away safe edges via Kahn's algorithm, and collect all nodes whose `indeg[i]` reaches `0` in ascending index order.

### Step-by-Step Thinking Process

1. Notice that in the original graph, terminal nodes have out-degree `0`. If we reverse all edges (`i -> j` becomes `j -> i`), original out-degrees become **in-degrees** in the reversed graph `rg`.
2. Initialize `indeg[i] = graph[i].length` and add reverse edges `rg[j].add(i)`. Enqueue every node with `indeg[i] == 0` into `q`.
3. Repeatedly poll a safe node `i` from `q` and iterate over its original predecessors `j` in `rg[i]`, decrementing `indeg[j]`.
4. Whenever `--indeg[j] == 0`, **all** outgoing edges of `j` in the original graph have been proven to lead to safe nodes, so `j` itself is safe and joins `q`. Nodes in cycles or leading into cycles will never reach `indeg == 0`.
5. Scan `i` from `0` to `n - 1` and append nodes with `indeg[i] == 0` to `ans`, producing a naturally sorted list without calling `Collections.sort`.

### Algorithm / Intuition

In `eventualSafeNodes(int[][] graph)`:
- `rg` stores incoming neighbors: for every original edge `i -> j`, `rg[j].add(i)` records that `j` is an outgoing dependency of `i`.
- `indeg[i]` counts how many unresolved outgoing edges node `i` still has.
- During the `while (!q.isEmpty())` loop, polling `i` means `i` is confirmed safe; decrementing `indeg[j]` crosses off `i` from `j`'s dependencies. Only when `indeg[j]` hits `0` is `j` guaranteed free of any path to a cycle.
- Finally, iterating `for (int i = 0; i < n; ++i)` collects safe nodes in ascending order in `O(n)` time.

---

## Dry Run

Trace on **Example 1**: `graph = [[1,2], [2,3], [5], [0], [5], [], []]` (`n = 7`).

1. Setup:
   - `rg`: `0:[3], 1:[0], 2:[0,1], 3:[1], 4:[], 5:[2,4], 6:[]`
   - `indeg = [2, 2, 1, 1, 1, 0, 0]`
   - Initial `q = [5, 6]` (terminal nodes).
2. Poll `5`: `rg[5] = [2, 4]`:
   - `--indeg[2] -> 0` -> enqueue `2`.
   - `--indeg[4] -> 0` -> enqueue `4`.
3. Poll `6`: `rg[6] = []`.
4. Poll `2`: `rg[2] = [0, 1]` -> `--indeg[0] -> 1`, `--indeg[1] -> 1` (neither hits `0` because of cycle `0 -> 1 -> 3 -> 0`).
5. Poll `4`: `rg[4] = []`. Queue is now empty.
6. Final `indeg = [1, 1, 0, 1, 0, 0, 0]` -> indices with `0` are `[2, 4, 5, 6]`.

---

## Complexity Analysis

- **Time Complexity:** `O(V + E)` — Where `V = n` and `E` is the total number of edges; building `rg` and running Kahn's BFS visits each node and edge once.
- **Space Complexity:** `O(V + E)` — Reversed adjacency list `rg` stores `E` integers, while `indeg` and `q` use `O(V)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [802find-eventual-safe-states.java](./802find-eventual-safe-states.java) |

---

## Key Learnings

- Reversing directed edges turns 'nodes whose all outgoing paths reach sinks' into standard Kahn's topological sort from in-degree `0` sources.
- Nodes belonging to or able to reach a cycle never have their remaining degree reduced to `0` in Kahn's algorithm.
- Scanning `0 .. n - 1` at the end produces sorted output in `O(n)` without an `O(n log n)` sort.
