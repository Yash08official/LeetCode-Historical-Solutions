---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
---

# 133. Clone Graph

**[View Problem on LeetCode](https://leetcode.com/problems/clone-graph/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0133` (`133`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Depth-First Search`, `Breadth-First Search`, `Graph Theory` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a reference of a node in a **connected** undirected graph.

Return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

```text
class Node {
    public int val;
    public List<Node> neighbors;
}
```

 

**Test case format:**

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with `val == 1`, the second node with `val == 2`, and so on. The graph is represented in the test case using an adjacency list.

An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with `val = 1`. You must return the **copy of the given node** as a reference to the cloned graph.

---

## Examples

### Example 1

```text
**Input:** adjList = [[2,4],[1,3],[2,4],[1,3]]
**Output:** [[2,4],[1,3],[2,4],[1,3]]
**Explanation:** There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
```

### Example 2

```text
**Input:** adjList = [[]]
**Output:** [[]]
**Explanation:** Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
```

### Example 3

```text
**Input:** adjList = []
**Output:** []
**Explanation:** This an empty graph, it does not have any nodes.
```

 

**

---

## Constraints

**

	
- The number of nodes in the graph is in the range `[0, 100]`.
	
- `1 <= Node.val <= 100`
	
- `Node.val` is unique for each node.
	
- There are no repeated edges and no self-loops in the graph.
	
- The Graph is connected and all nodes can be visited starting from the given node.

---

## Problem Understanding

- We need to create a deep copy of a connected undirected graph where each node contains an integer value and a list of neighbors.
- Deep copy requires creating entirely new `_Node` instances without reusing existing references or circular pointer loops.

---

## Approach

### Optimized Approach (Depth-First Search with HashMap Registry)

1. Maintain a Hash Map `g` mapping original node references to their corresponding cloned node instances.
2. Define a recursive helper `dfs(node)`:
   - If `node` is `null`, return `null`.
   - If `node` is already in map `g`, return the cloned instance `g.get(node)` (prevents infinite recursion on cycles).
   - Create a new `_Node(node.val)` and immediately register it in `g.set(node, cloned)`.
   - Iterate through `node.neighbors`, recursively cloning each neighbor and appending it to `cloned.neighbors`.
3. Return the result of `dfs(node)` on the start node.

---

## Complexity Analysis

- **Time Complexity:** $O(V + E)$ — Every vertex $V$ and edge $E$ in the graph is traversed exactly once.
- **Space Complexity:** $O(V)$ — For the hash map storing cloned instances and the recursion call stack ($O(V)$ worst case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [133clone-graph.js](./133clone-graph.js) |

---

## Key Learnings

- Cycle detection in graph cloning is cleanly handled by registering newly created clone nodes in a hash map before recursing on neighbors.
