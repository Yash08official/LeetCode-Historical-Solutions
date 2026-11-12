---
comments: true
difficulty: Hard
tags:
  - Dynamic Programming
  - Bit Manipulation
  - Breadth-First Search
  - Graph Theory
  - Bitmask
---

# 847. Shortest Path Visiting All Nodes

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-path-visiting-all-nodes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0847` (`847`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Dynamic Programming`, `Bit Manipulation`, `Breadth-First Search`, `Graph Theory`, `Bitmask` |
| **Solution Language** | Java |

---

## Problem Description

You have an undirected, connected graph of `n` nodes labeled from `0` to `n - 1`. You are given an array `graph` where `graph[i]` is a list of all the nodes connected with node `i` by an edge.

Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.

---

## Problem Understanding

- We can visit nodes and edges repeatedly, but we want the minimum total steps to visit all $n$ nodes.
- With $n \le 12$, the set of visited nodes can be encoded as a bitmask of length $n$ ($0 \le 	ext{mask} < 2^n$).
- The state of the traversal is uniquely identified by `(current_node, visited_bitmask)`.
- Finding the shortest path in an unweighted graph where transitions cost 1 step is the classic domain of **Breadth-First Search (BFS)**.

---

## Approach

### Multi-Source BFS with Bitmask State

1. **State Space:** `(node, mask)` where `mask` has the $i$-th bit set if node $i$ has been visited.
2. **Multi-Source Initialization:** Since we can start at any node, enqueue `(i, 1 << i)` for all $0 \le i < n$ and mark `vis[i][1 << i] = true`.
3. **Target State:** The search terminates as soon as any state has `mask == (1 << n) - 1` (all bits set).
4. **Level-by-Level BFS:**
   - Maintain the step counter `ans`.
   - In each BFS step, expand all states currently in the queue.
   - For every neighbor $j$ of `i`:
     - New mask is `nst = st | (1 << j)`.
     - If `(j, nst)` has not been visited, mark it visited and enqueue `(j, nst)`.
5. Return the step count `ans` upon encountering the complete mask.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2 \cdot 2^n)$ — There are $n \cdot 2^n$ distinct states, and each state has at most $n$ outgoing edges.
- **Space Complexity:** $O(n \cdot 2^n)$ for the visited array and the BFS queue.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [847shortest-path-visiting-all-nodes.java](./847shortest-path-visiting-all-nodes.java) |

---

## Key Learnings

- Bitmasking compactly represents subset visitation states when $n \le 15$.
- Multi-source BFS eliminates the need to test each starting node individually.
