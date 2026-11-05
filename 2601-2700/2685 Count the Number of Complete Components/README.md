---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Graph Theory
---

# 2685. Count the Number of Complete Components

**[View Problem on LeetCode](https://leetcode.com/problems/count-the-number-of-complete-components/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2685` (`2685`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer `n` representing the number of vertices in an undirected graph, numbered from `0` to `n - 1`. You are also given a 2D integer array `edges` where `edges[i] = [a_i, b_i]` indicates an undirected edge between vertices `a_i` and `b_i`.

A **connected component** is a subgraph in which every vertex is reachable from any other vertex in the subgraph, and no vertex outside the subgraph is connected to any vertex in the subgraph.

A connected component is **complete** if there exists an edge between every pair of vertices in that component.

Return the **number of complete connected components** in the graph.

---

## Examples

### Example 1

```text
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.
```

### Example 2

```text
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.
```

---

## Constraints

- `1 <= n <= 50`

- `0 <= edges.length <= n * (n - 1) / 2`

- `edges[i].length == 2`

- `0 <= a_i, b_i <= n - 1`

- `a_i != b_i`

- There are no repeated edges.

---

## Problem Understanding

Key definitions and graph theory observations:
- The graph is partitioned into disjoint connected components.
- Let a component have `V` vertices. For this component to be complete (a clique of size `V`):
  - Every vertex in the component must have degree equal to `V - 1`.
  - The total number of undirected edges inside the component must be `V * (V - 1) / 2`.
  - In terms of vertex degrees: the sum of degrees of all vertices in the component is `∑ deg(v) = 2 * (number of edges) = V * (V - 1)`.
- This gives an exact criterion: if `(∑ deg(v)) == V * (V - 1)`, then the component has exactly all possible pairs of edges and is complete!

---

## Approach

### Brute Force Approach

A brute force approach would find each connected component, collect all its vertices into a list, and then use nested loops to check if an edge exists between every pair `(u, v)` of vertices in that component using an adjacency matrix or hash set.

Checking all pairs takes `O(V^2)` per component. While feasible for `n <= 50`, verifying the degree sum equation `V * (V - 1) == ∑ deg(v)` during DFS traversal is far more direct and optimal.

### Optimized Approach

The solution builds an adjacency list `g` and uses DFS to traverse each unvisited component:

1. Build adjacency list `g` of size `n`.
2. For each unvisited vertex `i`, trigger `dfs(i)` which returns `int[] {x, y}`:
   - `x` = total vertices in the component.
   - `y` = sum of degrees of all vertices in the component (`∑ g[v].size()`).
3. If `x * (x - 1) == y`, the component is complete, and we increment `ans`.
4. Return `ans`.

### Step-by-Step Thinking Process

1. We need to count how many connected components are complete graphs (cliques).
2. In any graph, the sum of degrees in a component is twice the number of edges in that component: `∑ deg(v) = 2 * E`.
3. In a complete graph with `V` vertices, every vertex connects to all other `V - 1` vertices, so each vertex has degree `V - 1`.
4. Therefore, for a component to be complete, the sum of degrees must equal `V * (V - 1)`.
5. We can run DFS on each unvisited vertex, returning two values: the number of vertices `x` and the sum of degrees `y`.
6. If `x * (x - 1) == y`, the component is complete -> increment `ans`.

### Algorithm / Intuition

The algorithm combines DFS component traversal with the Handshaking Lemma:

1. `g` stores the undirected graph adjacency list.
2. `vis` tracks visited vertices.
3. `dfs(i)` marks `vis[i] = true`, initializes `x = 1` (vertex count) and `y = g[i].size()` (vertex degree).
4. For each unvisited neighbor `j \in g[i]`, `dfs(j)` is called recursively, adding `t[0]` to `x` and `t[1]` to `y`.
5. After DFS completes for the component, `t[0]` is the number of vertices `V`, and `t[1]` is the sum of degrees `∑ deg(v)`.
6. Because each edge in the component connects two vertices in the component, `∑ deg(v) = 2 * E_{comp}`. For a complete component, `E_{comp} = V(V - 1)/2`, so `2 * E_{comp} = V(V - 1)`. The condition `t[0] * (t[0] - 1) == t[1]` holds if and only if every pair is connected.

---

## Dry Run

Trace for `n = 6`, `edges = [[0,1],[0,2],[1,2],[3,4]]`:

- Graph components:
  - Vertices {0, 1, 2} with edges [0,1], [0,2], [1,2].
  - Vertices {3, 4} with edge [3,4].
  - Vertex {5} with no edges.
- **Component 1 (starts at 0):**
  - Visits 0 (deg 2), 1 (deg 2), 2 (deg 2).
  - `x = 3`, `y = 2 + 2 + 2 = 6`.
  - Check `x * (x - 1) == y` -> `3 * 2 = 6 == 6` -> True. `ans = 1`.
- **Component 2 (starts at 3):**
  - Visits 3 (deg 1), 4 (deg 1).
  - `x = 2`, `y = 1 + 1 = 2`.
  - Check `x * (x - 1) == y` -> `2 * 1 = 2 == 2` -> True. `ans = 2`.
- **Component 3 (starts at 5):**
  - Visits 5 (deg 0).
  - `x = 1`, `y = 0`.
  - Check `x * (x - 1) == y` -> `1 * 0 = 0 == 0` -> True. `ans = 3`.
- **Total complete components:** `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(V + E)` — Where `V = n` and `E = edges.length`. Building the adjacency list takes `O(V + E)`, and DFS visits every vertex and traverses every edge exactly once.
- **Space Complexity:** `O(V + E)` — Adjacency list `g` stores `2E` directed edges, `vis` array takes `O(V)` space, and recursion call stack depth is at most `O(V)`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2685count-the-number-of-complete-components.java](./2685count-the-number-of-complete-components.java) |

---

## Key Learnings

- A connected component of `V` vertices is a complete graph if and only if the sum of degrees equals `V * (V - 1)`.
- Single vertices with degree 0 satisfy `1 * (1 - 1) == 0` and are vacuously complete components of size 1.
- Accumulating vertex count and degree sum in a single DFS pass avoids extra pair checking.
