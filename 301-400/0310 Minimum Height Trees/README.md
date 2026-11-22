---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
  - Topological Sort
---

# 310. Minimum Height Trees

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-height-trees/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0310` (`310`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Graph Theory`, `Topological Sort` |
| **Solution Language** | Java |

---

## Problem Description

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of `n` nodes labelled from `0` to `n - 1`, and an array of `n - 1` `edges` where `edges[i] = [a_i, b_i]` indicates that there is an undirected edge between the two nodes `a_i` and `b_i` in the tree, you can choose any node of the tree as the root. When you select a node `x` as the root, the result tree has height `h`. Among all possible rooted trees, those with minimum height (i.e. `min(h)`)  are called **minimum height trees** (MHTs).

Return *a list of all **MHTs'** root labels*. You can return the answer in **any order**.

The **height** of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

---

## Examples

### Example 1

```text
**Input:** n = 4, edges = [[1,0],[1,2],[1,3]]
**Output:** [1]
**Explanation:** As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
```

### Example 2

```text
**Input:** n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
**Output:** [3,4]
```

 

**

---

## Constraints

**

	
- `1 <= n <= 2 * 10^4`
	
- `edges.length == n - 1`
	
- `0 <= a_i, b_i < n`
	
- `a_i != b_i`
	
- All the pairs `(a_i, b_i)` are distinct.
	
- The given input is **guaranteed** to be a tree and there will be **no repeated** edges.

---

## Problem Understanding

- Given an undirected tree of `n` nodes, find all root choices that minimize the tree's height (the tree's center(s)).

---

## Approach

### Optimized Approach (Iterative Leaf Peeling / Topological BFS)
1. Handle `n == 1` directly (`[0]`). Build adjacency list `g` and vertex `degree` array.
2. Enqueue all leaf nodes (`degree == 1`).
3. Repeatedly peel all current leaves layer by layer, decrementing neighbor degrees and enqueueing newly formed leaves. The last non-empty layer (`ans`, of size 1 or 2) contains the minimum height tree roots.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each vertex and edge is processed once.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [310minimum-height-trees.java](./310minimum-height-trees.java) |

---

## Key Learnings

- Every tree has at most 2 centers, which are found by peeling leaves inward via BFS.
