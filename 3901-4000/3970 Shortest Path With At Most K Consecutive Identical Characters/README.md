---
comments: true
difficulty: Medium
tags:
  - String
  - Graph Theory
  - Heap (Priority Queue)
  - Shortest Path
---

# 3970. Shortest Path With At Most K Consecutive Identical Characters

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-path-with-at-most-k-consecutive-identical-characters/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3970` (`3970`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Graph Theory`, `Heap (Priority Queue)`, `Shortest Path` |
| **Solution Language** | Java |

---

## Problem Description

You are given a directed weighted graph with `n` nodes labeled from 0 to `n - 1`, represented by a 2D integer array `edges` where `edges[i] = [u_i, v_i, w_i]` denotes a directed edge from node `u_i` to node `v_i` with weight `w_i`.

You are also given a string `labels` of length `n`, where `labels[i]` represents the character assigned to node `i`, and a positive integer `k`.

Your task is to find the **minimum total edge weight** of a path starting at node 0 and ending at node `n - 1` such that the concatenated string of node labels along the path contains **at most `k` consecutive identical characters**.

If no valid path exists that satisfies this condition, return `-1`. Nodes and edges may be revisited.

---

## Examples

### Example 1

**Input:** `n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 1`

**Output:** `3`

**Explanation:**

The optimal valid path from node 0 to node 2 is as follows:

- Use `edges[2] = [0, 2, 3]` to reach node 2 with a weight `w_i = 3`.

The corresponding concatenation of labels is `"ab"`, which satisfies at most `k = 1` consecutive identical characters. Thus, the answer is 3.

### Example 2

**Input:** `n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 2`

**Output:** `2`

**Explanation:**

The optimal valid path from node 0 to node 2 is as follows:

- Use `edges[0] = [0, 1, 1]` to reach node 1 with weight `w_i = 1`.

- Use `edges[1] = [1, 2, 1]` to reach node 2 with weight `w_i = 1`.

The corresponding concatenation of labels is `"aab"`, which satisfies at most `k = 2` consecutive identical characters. Thus, the answer is 2.

### Example 3

**Input:** `n = 3, edges = [[0,1,1],[1,2,1]], labels = "aaa", k = 2`

**Output:** `-1`

**Explanation:**

There is no valid path from node 0 to node 2 that satisfies at most `k = 2` consecutive identical characters. Thus, the answer is -1.

---

## Constraints

- `1 <= n == labels.length <= 5 * 10^4`

- `0 <= edges.length <= 5 * 10^4`

- `edges[i] == [u_i, v_i, w_i]`

- `0 <= u_i, v_i <= n - 1`

- `u_i != v_i`

- `1 <= w_i <= 10^4`

- `labels` consists of lowercase English letters

- `1 <= k <= 50`

---

## Problem Understanding

Key observations and requirements:
1. **Consecutive Character Constraint**:
   - As we traverse the path, the sequence of node labels must never have a run of identical characters exceeding length `k`.
   - When moving from node `u` to node `v`:
     - If `labels[v] == labels[u]`, the current consecutive run increments by 1 (`cur + 1`). This transition is only permitted if `cur + 1 <= k`.
     - If `labels[v] != labels[u]`, the streak resets to 1 (`nxt = 1`).
2. **State Representation**:
   - Because the feasibility and future transitions depend on the length of the current streak of identical characters, the standard Dijkstra state `u` is insufficient.
   - We must expand the state space to `(u, cur)`, where:
     - `u`: current node (`0 <= u < n`).
     - `cur`: number of consecutive nodes ending at `u` that share the label `labels[u]` (`1 <= cur <= k`).
3. **Shortest Path on State Graph**:
   - All edge weights are positive (`w_i >= 1`).
   - Dijkstra's algorithm efficiently finds the shortest path on this expanded state graph.

---

## Approach

### Brute Force Approach

A naive approach would perform standard DFS with backtracking to enumerate all simple and non-simple paths from node 0 to node `n - 1`.
Because the graph can contain cycles and nodes/edges can be revisited, an unpruned DFS will either loop infinitely or explore an exponential number of paths, resulting in Time Limit Exceeded.
Similarly, standard Dijkstra with only node indices `dist[u]` fails because a longer path arriving at `u` with a smaller streak `cur` might be required to legally extend to the target.

### Optimized Approach

The implemented solution runs **Dijkstra's Algorithm on an Augmented State Graph**:
1. **Adjacency Representation**:
   - Construct an adjacency list `g` where `g[u]` stores pairs `(v, w)`.
2. **Distance Table**:
   - Maintain `dist[n][k + 1]`, initialized to `Integer.MAX_VALUE`.
   - Starting state: at node 0, the path has 1 consecutive character `labels[0]`. Thus, `dist[0][1] = 0`.
3. **Priority Queue**:
   - Min-heap storing `int[] {distance, u, cur}`, prioritized by `distance`.
   - Push `{0, 0, 1}` into the priority queue.
4. **Dijkstra Loop**:
   - Pop `{d, u, cur}`.
   - If `u == n - 1`, return `d` immediately (the first time the target node is extracted from the priority queue, its distance is minimal).
   - If `d > dist[u][cur]`, skip (outdated entry).
   - For each outgoing edge `(v, w)` from `u`:
     - Determine the next streak length:
       `nxt = (labels.charAt(v) != labels.charAt(u)) ? 1 : cur + 1`.
     - If `nxt <= k` and `d + w < dist[v][nxt]`:
       - Update `dist[v][nxt] = d + w`.
       - Push `{d + w, v, nxt}` into the priority queue.
5. If the priority queue empties without reaching `n - 1`, return `-1`.

### Step-by-Step Thinking Process

1. The problem asks for the shortest path in a weighted directed graph subject to a streak constraint on node labels.
2. Notice that edge weights are positive (`w_i >= 1`), so Dijkstra's algorithm applies.
3. A single node `u` can be reached with different streak lengths of `labels[u]`. A path with higher weight but lower streak could be valid where a lower-weight path with streak `k` is blocked.
4. Augment the state from `u` to `(u, cur)`, where `1 <= cur <= k`.
5. The transitions are: if `labels[v] == labels[u]`, next streak is `cur + 1` (valid if `<= k`); if `labels[v] != labels[u]`, streak resets to `1`.
6. State space size is `n * k <= 5 * 10^4 * 50 = 2.5 * 10^6`. Dijkstra runs efficiently within limits.

### Algorithm / Intuition

In `Solution.shortestPath`:
- `dist` is sized `[n][k + 1]` to directly index streaks up to `k`.
- The priority queue orders states by path weight `a[0]`.
- When expanding `u`:
  - `labels.charAt(v) != labels.charAt(u)` tests if the label changes. If it changes, `nxt = 1`. If it matches, `nxt = cur + 1`.
  - The check `if (nxt <= k && nd < dist[v][nxt])` enforces both the consecutive character constraint and Dijkstra relaxation.
- The early exit `if (u == n - 1) return d;` guarantees the optimal shortest distance is returned on first extraction.

---

## Dry Run

Consider `n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 1`:

1. **Initialization**:
   - `dist` initialized to `INF`.
   - `dist[0][1] = 0`.
   - `pq` has `[{0, 0, 1}]`.
2. **Iteration 1**:
   - Pop `{d = 0, u = 0, cur = 1}`.
   - Outgoing edges from 0:
     - Edge to 1 with weight 1: `labels[1] ('a') == labels[0] ('a')` -> `nxt = 1 + 1 = 2`.
       - Check `nxt <= k`: `2 <= 1` is **false**. Pruned!
     - Edge to 2 with weight 3: `labels[2] ('b') != labels[0] ('a')` -> `nxt = 1`.
       - Check `nxt <= k`: `1 <= 1` is true. `nd = 0 + 3 = 3 < dist[2][1] (INF)`.
       - `dist[2][1] = 3`. Push `{3, 2, 1}`.
3. **Iteration 2**:
   - Pop `{d = 3, u = 2, cur = 1}`.
   - Target reached: `u == 2 == n - 1`.
   - Return `d = 3`. Matches Example 1!

---

## Complexity Analysis

- **Time Complexity:** `O((|V| * k + |E| * k) * log(|V| * k))` — There are at most `|V| * k` states and `|E| * k` transitions in the state graph. With `|V|, |E| <= 5 * 10^4` and `k <= 50`, the number of states is at most `2.5 * 10^6`, which Dijkstra handles within standard time limits.
- **Space Complexity:** `O(|V| * k + |E|)` — The distance table `dist[n][k + 1]` takes `O(n * k)` space, the graph adjacency list requires `O(n + |E|)` space, and the priority queue holds at most `O(|E| * k)` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3970shortest-path-with-at-most-k-consecutive-identical-characters.java](./3970shortest-path-with-at-most-k-consecutive-identical-characters.java) |

---

## Key Learnings

- When path constraints depend on history (such as consecutive identical attributes), augment the graph node with the relevant history state (e.g. current streak length).
- Shortest path with positive weights on an expanded state graph can be solved directly with Dijkstra's algorithm without modifying the core relaxation logic.
- Resetting counters on character mismatch is a classic finite automaton state transition integrated into graph search.
