---
comments: true
difficulty: Hard
tags:
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Graph Theory
---

# 2493. Divide Nodes Into the Maximum Number of Groups

**[View Problem on LeetCode](https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2493` (`2493`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

You are given a positive integer $n$ representing the number of nodes in an undirected graph labeled $1$ to $n$, and a 2D integer array `edges` where `edges[i] = [a_i, b_i]` represents an undirected edge.

You want to divide the nodes of the graph into $m$ groups (labeled $1$ to $m$) such that:
1. Each node belongs to exactly one group.
2. For every edge `[u, v]`, if $u$ is in group $x$ and $v$ is in group $y$, then $|x - y| = 1$.

Return the **maximum** number of groups $m$ into which you can divide the nodes. If no such division is possible, return `-1`.

---

## Examples

### Example 1

```text
Input: n = 6, edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]
Output: 4
Explanation: As shown in the image we:
- Add node 5 to the first group.
- Add node 1 to the second group.
- Add nodes 2 and 4 to the third group.
- Add nodes 3 and 6 to the fourth group.
We can see that every edge is satisfied.
It can be shown that that if we create a fifth group and move any node from the third or fourth group to it, at least on of the edges will not be satisfied.
```

### Example 2

```text
Input: n = 3, edges = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: If we add node 1 to the first group, node 2 to the second group, and node 3 to the third group to satisfy the first two edges, we can see that the third edge will not be satisfied.
It can be shown that no grouping is possible.
```

---

## Constraints

- `1 <= n <= 500`

- `1 <= edges.length <= 10^4`

- `edges[i].length == 2`

- `1 <= a_i, b_i <= n`

- `a_i != b_i`

- There is at most one edge between any pair of vertices.

---

## Problem Understanding

The condition $|x - y| = 1$ for all edges imposes two critical insights:
1. **Bipartiteness**: Because every edge connects a node in group $x$ to a node in group $x \pm 1$, the parity of groups alternates along any path. Thus, adjacent nodes must have different parities. This means the graph must be **bipartite** (it cannot contain any odd-length cycles). If an odd cycle exists, no valid grouping exists, and we must return `-1`.
2. **Independent Components**: Each connected component of the graph can be partitioned into groups independently. The total maximum number of groups is the sum of the maximum groups achievable across all connected components.
3. **Component Diameter via BFS**: For a given connected component, if we start a BFS from a chosen source node $u$, the number of groups we can form is the maximum level / distance reached by BFS from $u$. To maximize groups for a component, we can try running BFS from every node in that component and take the maximum depth found.

---

## Approach

### Brute Force Approach

Assigning group numbers $1 \dots m$ to nodes directly via backtracking has exponential complexity $O(m^n)$, which is completely infeasible. Even checking all partitions directly without BFS properties would fail for $n = 500$.

### Optimized Approach

For every node $i$ from $0$ to $n - 1$, run a BFS:
- Track node distances in `dist` (starting with `dist[i] = 1`).
- Identify the minimum node index in the component (`root = Math.min(root, a)`) to serve as the component identifier.
- If an edge leads to an already-visited node `b` with $|\text{dist}[b] - \text{dist}[a]| \ne 1$, the component is not bipartite; return `-1` immediately.
- Record the maximum BFS depth `mx` for this component: `d[root] = Math.max(d[root], mx)`.
Finally, return the sum of maximum depths across all components (`Arrays.stream(d).sum()`).

### Step-by-Step Thinking Process

1. Analyze the grouping requirement $|x - y| = 1$: adjacent nodes must have strictly consecutive group IDs.
2. Deduce that odd cycles make such an assignment impossible (bipartite graph requirement).
3. Observe that each connected component is independent; the global answer is $\sum_{\text{components}} \max(\text{groups in component})$.
4. Recognize that BFS levels from a starting node naturally partition vertices into groups differing by 1.
5. Run BFS from every node $i \in [0, n-1]$ to find the maximum possible BFS height in its component.
6. Detect invalid odd cycles during BFS: if a neighbor $b$ has already been assigned a distance and $|dist[b] - dist[a]| \ne 1$, return `-1`.
7. Track the representative root (`Math.min` of component node IDs) and update `d[root] = Math.max(d[root], mx)`.
8. Return the sum of `d` across all component representatives.

### Algorithm / Intuition

In the provided Java solution:

1. The graph `g` is converted to 0-indexed representation.
2. `d` is an array of size $n$ where `d[root]` stores the maximum groups achievable for the component identified by `root`.
3. An outer loop iterates $i$ from $0$ to $n - 1$, launching BFS from node $i$:
   - `dist[i] = 1`, `mx = 1`, `root = i`.
   - During BFS: for each node $a$, `root = Math.min(root, a)` keeps track of the component canonical ID.
   - For each neighbor $b$: if unvisited (`dist[b] == 0`), set `dist[b] = dist[a] + 1` and push to queue. If already visited and `Math.abs(dist[b] - dist[a]) != 1`, an odd cycle is detected, and the function terminates early returning `-1`.
   - At the end of the BFS, `d[root] = Math.max(d[root], mx)` updates the best depth found for that component.
4. Finally, `Arrays.stream(d).sum()` aggregates the results across all components.

---

## Dry Run

Consider Example 1: $n = 6$, `edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]` (0-indexed: 0-1, 0-3, 0-4, 1-5, 1-2, 3-5)

1. Nodes {0, 1, 2, 3, 4, 5} form a single connected component with min node ID `root = 0`.
2. **BFS from node 4** (1-indexed node 5):
   - `dist[4] = 1`.
   - Level 2: node 0 (neighbor of 4). `dist[0] = 2`.
   - Level 3: nodes 1, 3 (neighbors of 0). `dist[1] = 3`, `dist[3] = 3`.
   - Level 4: nodes 2, 5 (neighbors of 1 and 3). `dist[2] = 4`, `dist[5] = 4`.
   - All cross edges between visited nodes differ by 1 (e.g. edge between 3 and 5 has distance difference $|4 - 3| = 1$). No odd cycles!
   - Max distance `mx = 4`.
3. Across all starting nodes, the maximum BFS depth for this component is 4.
4. Component sum: `d[0] = 4`.

Final Return: `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n \cdot (V + E))` — For each of the $n$ vertices, a complete BFS traversal is performed over its connected component, taking $O(V + E)$ time. With $n \le 500$ and $|E| \le 10^4$, $n \cdot (V + E) \le 500 \times 10^4 = 5 \times 10^6$ operations, executing well within the 2-second time limit.
- **Space Complexity:** `O(V + E)` — Adjacency list representation `g`, distance array `dist`, and component max array `d` take $O(n + m)$ memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2493divide-nodes-into-the-maximum-number-of-groups.java](./2493divide-nodes-into-the-maximum-number-of-groups.java) |

---

## Key Learnings

- The consecutive group numbering constraint $|x - y| = 1$ is equivalent to graph 2-colorability (bipartiteness).
- The diameter of a bipartite component from an optimal source vertex yields the maximum valid group partition.
- Component-wise optimization using BFS from all candidate vertices is tractable when $n \le 500$.
