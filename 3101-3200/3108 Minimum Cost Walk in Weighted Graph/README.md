---
comments: true
difficulty: Hard
tags:
  - Array
  - Bit Manipulation
  - Union-Find
  - Graph Theory
---

# 3108. Minimum Cost Walk in Weighted Graph

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3108` (`3108`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Union-Find`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

We are given an undirected weighted graph with `n` vertices labeled `0` to `n - 1`, and an array `edges` where `edges[i] = [u, v, w]` denotes an undirected edge between `u` and `v` with weight `w`.

A walk on a graph is a sequence of vertices and edges. The cost of a walk is the bitwise AND of the weights of all edges traversed on that walk. A walk can repeat vertices and edges multiple times.

We are given a list of queries `query` where `query[i] = [s_i, t_i]`. For each query, we must return the minimum cost of a walk from `s_i` to `t_i`. If no walk exists between `s_i` and `t_i`, return `-1`. If `s_i == t_i`, the cost is defined as `0`.

---

## Examples

### Example 1

**Input:** `n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]`

**Output:** `[1,-1]`

**Explanation:**

To achieve the cost of 1 in the first query, we need to move on the following edges: `0->1` (weight 7), `1->2` (weight 1), `2->1` (weight 1), `1->3` (weight 7).

In the second query, there is no walk between nodes 3 and 4, so the answer is -1.

### Example 2

**Input:** `n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]`

**Output:** `[0]`

**Explanation:**

To achieve the cost of 0 in the first query, we need to move on the following edges: `1->2` (weight 1), `2->1` (weight 6), `1->2` (weight 1).

---

## Constraints

- `2 <= n <= 10^5`

- `0 <= edges.length <= 10^5`

- `edges[i].length == 3`

- `0 <= u_i, v_i <= n - 1`

- `u_i != v_i`

- `0 <= w_i <= 10^5`

- `1 <= query.length <= 10^5`

- `query[i].length == 2`

- `0 <= s_i, t_i <= n - 1`

- `s_i != t_i`

---

## Problem Understanding

Crucial graph and bitwise AND observations:
- For any two numbers `A` and `B`, the bitwise AND satisfies `A & B <= A` and `A & B <= B`. ANDing more edge weights can only clear bits, never set new ones, which means bitwise AND is monotonically non-increasing as more edges are traversed.
- Because a walk can traverse any edge multiple times and return back to the path without net movement (e.g., walk `u -> v -> u`), a walk between `s` and `t` can incorporate *every single edge* present in the entire connected component containing `s` and `t`.
- Therefore, if `s` and `t` are in the same connected component and `s != t`, the minimum cost walk is simply the bitwise AND of **all edge weights** in that connected component!
- If `s == t`, the walk traverses 0 edges, with cost 0.
- If `s` and `t` belong to different connected components, no walk can connect them, so the answer is `-1`.

---

## Approach

### Brute Force Approach

Attempting shortest-path algorithms like Dijkstra's or Bellman-Ford fails because bitwise AND does not satisfy the optimal substructure of additive path weights, and walks can arbitrarily cycle to decrease the AND sum. Exploring all cyclic walks would lead to an infinite search space.

### Optimized Approach

We use a Disjoint Set Union (Union-Find) data structure:
1. First pass over `edges`: union the endpoints `u` and `v` of each edge to determine connected components.
2. Allocate an array `g` of size `n` initialized to `-1` (all binary 1s in two's complement).
3. Second pass over `edges`: for each edge `[u, v, w]`, find the component root `root = uf.find(u)` and update `g[root] &= w`.
4. For each query `[s, t]`:
   - If `s == t`, answer `0`.
   - Else if `uf.find(s) == uf.find(t)`, answer `g[uf.find(s)]`.
   - Else (different components), answer `-1`.

### Step-by-Step Thinking Process

1. What makes a walk distinct from a simple path? A walk can revisit edges and vertices arbitrarily.
2. In bitwise AND, `x & y <= min(x, y)`. The more edge weights we include in the walk, the smaller (or equal) the resulting cost.
3. Can we include every edge in the component? Yes, by walking back and forth along tree paths to traverse every edge in the connected component.
4. Therefore, for any connected pair `(s, t)` with `s != t`, the minimal possible AND cost is the AND of ALL edges in that component.
5. Use Disjoint Set Union (DSU) to identify connected components, and compute the cumulative bitwise AND of each component's edges.
6. Answer queries in `O(1)` amortized time via DSU lookups.

### Algorithm / Intuition

The architecture consists of a `UnionFind` class and component-wise bitwise accumulation:
1. Create `UnionFind uf = new UnionFind(n)` with union-by-size and path compression.
2. For each edge `e` in `edges`, call `uf.union(e[0], e[1])`.
3. Initialize array `g` of size `n` filled with `-1` (in Java, `-1` has all 32 bits set to 1, acting as the bitwise AND identity).
4. For each edge `e` in `edges`, update `g[uf.find(e[0])] &= e[2]`.
5. Helper function `f(u, v)`:
   - If `u == v`, return `0`.
   - Find roots `a = uf.find(u)` and `b = uf.find(v)`.
   - If `a == b`, return `g[a]`; else return `-1`.
6. Populate `ans[i] = f(query[i][0], query[i][1])` for each query and return `ans`.

---

## Dry Run

Trace on Example 1: `n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]`

- Build Union-Find components:
  - Union `(0, 1)`, union `(1, 3)`, union `(1, 2)` -> Vertices `{0, 1, 2, 3}` form one component with root, say, `0`. Vertex `4` is an isolated component.
- Compute component bitwise AND in `g`:
  - Initialize `g = [-1, -1, -1, -1, -1]`.
  - Edge `[0, 1, 7]`: `g[0] &= 7` (`-1 & 7 = 7`).
  - Edge `[1, 3, 7]`: `g[0] &= 7` (`7 & 7 = 7`).
  - Edge `[1, 2, 1]`: `g[0] &= 1` (`7 & 1 = 1`).
  - `g[0] = 1`.
- Evaluate queries:
  - Query 0: `[0, 3]`: `0 != 3`, `uf.find(0) == uf.find(3) == 0`. Return `g[0] = 1`. `ans[0] = 1`.
  - Query 1: `[3, 4]`: `uf.find(3) = 0`, `uf.find(4) = 4`. Different components. Return `-1`. `ans[1] = -1`.
- Return `ans = [1, -1]`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n + E * alpha(n) + Q * alpha(n)) — Where E is the number of edges, Q is the number of queries, and alpha is the inverse Ackermann function. Graph union and query lookups run in near-constant time per operation.
- **Space Complexity:** O(n + Q) — Storing the DSU parent and size arrays, component weight array `g`, and query answers `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3108minimum-cost-walk-in-weighted-graph.java](./3108minimum-cost-walk-in-weighted-graph.java) |

---

## Key Learnings

- The properties of walks combined with bitwise AND reduce complex path-finding to component-wide bitwise aggregation.
- Using `-1` as the initial accumulator serves as the bitwise identity element (all 1s in two's complement).
- DSU provides an optimal mechanism for dynamic component queries and edge grouping.
