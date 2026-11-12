---
comments: true
difficulty: Hard
tags:
  - Dynamic Programming
  - Tree
  - Depth-First Search
  - Graph Theory
  - DP on Trees
---

# 834. Sum of Distances in Tree

**[View Problem on LeetCode](https://leetcode.com/problems/sum-of-distances-in-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0834` (`834`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Dynamic Programming`, `Tree`, `Depth-First Search`, `Graph Theory`, `DP on Trees` |
| **Solution Language** | Java |

---

## Problem Description

There is an undirected connected tree with `n` nodes labeled from `0` to `n - 1` and `n - 1` edges.

You are given the integer `n` and the array `edges` where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

Return an array `ans` of length `n` where `ans[i]` is the sum of the distances between the `i`-th node and all other nodes in the tree.

---

## Problem Understanding & Rerooting DP

- Running BFS/DFS from every single node takes $O(N^2)$ time, which TLEs for $N = 3 	imes 10^4$.
- When transitioning the root of the tree from parent $u$ to child $v$:
  - All nodes in $v$'s subtree move 1 step **closer** to $v$ (distance decreases by $size[v]$).
  - All other nodes in the tree ($n - size[v]$) move 1 step **further** from $v$ (distance increases by $n - size[v]$).
  - Therefore:
    $$ans[v] = ans[u] - size[v] + (n - size[v])$$
- This enables solving all distances in two DFS traversals (**Tree Rerooting DP**).

---

## Approach

### Two-Pass Tree Rerooting DP

1. **Pass 1 (Bottom-Up DFS - `dfs1`):**
   - Root the tree arbitrarily at node `0`.
   - Compute the size of each subtree: $size[u] = 1 + \sum size[child]$.
   - Accumulate the base distance sum for root `0`: $ans[0] = \sum 	ext{depth}(v)$.
2. **Pass 2 (Top-Down DFS - `dfs2`):**
   - Propagate distance sums from parents to children using the rerooting formula:
     `ans[child] = ans[parent] - size[child] + (n - size[child])`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Exactly two DFS passes over $N$ nodes and $N-1$ edges.
- **Space Complexity:** $O(N)$ for adjacency list, recursion stack, subtree size array, and answer array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [834sum-of-distances-in-tree.java](./834sum-of-distances-in-tree.java) |

---

## Key Learnings

- Tree Rerooting Dynamic Programming allows calculating global subtree metrics for all nodes in optimal $O(N)$ time.
- The incremental change between adjacent tree roots depends purely on the split of total nodes between the two rooted components.
