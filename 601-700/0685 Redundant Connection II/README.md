---
comments: true
difficulty: Hard
tags:
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Graph Theory
---

# 685. Redundant Connection II

**[View Problem on LeetCode](https://leetcode.com/problems/redundant-connection-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0685` (`685`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.

The given input is a directed graph that started as a rooted tree with `n` nodes (with distinct values from `1` to `n`), with one additional directed edge added.

Return an edge that can be removed so that the resulting graph is a rooted tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array.

---

## Examples

### Example 1

```text
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

### Example 2

```text
Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
Output: [4,1]
```

---

## Constraints

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ui, vi <= n`

---

## Problem Understanding

Adding an extra directed edge to a rooted tree can result in two types of structural flaws:
1. **Two parents:** A node has in-degree $2$ (two incoming edges).
2. **Directed cycle:** A cycle exists without any node having in-degree $2$.
3. **Both:** A node has two parents and a cycle is formed.

---

## Approach

### Optimized Approach (Union-Find with In-Degree Tracking)

1. Maintain parent array `p` to detect nodes with two parents (`conflict`).
2. Maintain a Disjoint Set Union (`UnionFind`) to detect cycles (`cycle`).
3. Traverse edges:
   - For edge `edges[i] = [u, v]`:
     - If node `v` already has a parent (`p[v] != v`), mark `conflict = i` (skip adding this edge to Union-Find for now).
     - Otherwise, set `p[v] = u` and union `u` and `v`. If they were already connected, mark `cycle = i`.
4. Resolve cases:
   - **Case 1 (No node with two parents):** Only a cycle exists. Return `edges[cycle]`.
   - **Case 2 (Two parents and a cycle):** The cycle was caused by the earlier edge pointing to the conflict node. Return `[p[v], v]`.
   - **Case 3 (Two parents, no cycle):** The conflict edge is redundant. Return `edges[conflict]`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \cdot lpha(N))$ — Near-linear time using Union-Find with path compression.
- **Space Complexity:** $O(N)$ — Parent array and disjoint set structures for $N$ vertices.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [685redundant-connection-ii.java](./685redundant-connection-ii.java) |

---

## Key Learnings

- Directed tree invariants require both acyclicity and single parentage (in-degree $\le 1$ for all nodes).
- Separating in-degree conflict detection from cycle detection resolves edge ambiguity cleanly.
