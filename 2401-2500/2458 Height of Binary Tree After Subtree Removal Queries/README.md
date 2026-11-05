---
comments: true
difficulty: Hard
tags:
  - Array
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 2458. Height of Binary Tree After Subtree Removal Queries

**[View Problem on LeetCode](https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2458` (`2458`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given the root of a binary tree with $n$ nodes, where each node has a unique value from $1$ to $n$. You are also given an array of $m$ queries, where each query specifies a node value `queries[i]` (guaranteed not to be the root).

For each query, determine the height of the binary tree if the entire subtree rooted at `queries[i]` were removed. The height of a tree is defined as the number of edges on the longest simple path from the root to any remaining node.

Queries are independent, meaning the tree is restored to its original state after each query. Return an array `answer` of size $m$ containing the results of each query.

---

## Examples

### Example 1

```text
Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
Output: [2]
Explanation: The diagram above shows the tree after removing the subtree rooted at node with value 4.
The height of the tree is 2 (The path 1 -> 3 -> 2).
```

### Example 2

```text
Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
Output: [3,2,3,2]
Explanation: We have the following queries:
- Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
- Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
- Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
- Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).
```

---

## Constraints

- The number of nodes in the tree is `n`.

- `2 <= n <= 10^5`

- `1 <= Node.val <= n`

- All the values in the tree are **unique**.

- `m == queries.length`

- `1 <= m <= min(n, 10^4)`

- `1 <= queries[i] <= n`

- `queries[i] != root.val`

---

## Problem Understanding

A naive query response would traverse the tree or recompute heights for each query, taking $O(n)$ per query and $O(n \cdot m)$ total. With $n, m \le 10^5$, this is far too slow.

Notice that removing a subtree rooted at node $u$ only affects paths passing through $u$. All paths that do not enter $u$'s subtree remain intact. When $u$ is removed, the resulting tree height is simply the maximum depth of any node in the rest of the tree.

By doing a pre-pass to compute subtree heights and a second traversal passing down the maximum depth achievable outside the current node's subtree (`rest`), we can precompute the answer for every possible node removal in $O(n)$ time, allowing each query to be answered in $O(1)$.

---

## Approach

### Brute Force Approach

For every query $q$, temporarily detach the node $q$ from its parent, run a tree height calculation (DFS or BFS) starting from the root to find the maximum depth, and reattach the node. Each query takes $O(n)$ time. Over $m$ queries, the total time is $O(n \cdot m) \approx 10^5 \times 10^5 = 10^{10}$ operations, causing TLE.

### Optimized Approach

1. First DFS (`f(root)`): Compute and store the height of every subtree in a map `d`, where height is the number of nodes on the longest path down.
2. Second DFS (`dfs(root, depth, rest)`): Traverse the tree while maintaining `depth` (distance from root) and `rest` (the max height if the current node is removed). Store `res[root.val] = rest`. When descending to the left child, the max external height is `max(rest, depth + d.get(root.right))`. When descending to the right child, it is `max(rest, depth + d.get(root.left))`.
3. Answer each query in $O(1)$ via lookup `res[queries[i]]`.

### Step-by-Step Thinking Process

1. Removing a node $u$ at depth $h$ means the new tree height is the maximum depth of any node not in $u$'s subtree.
2. Decompose the nodes outside $u$'s subtree: they consist of nodes outside $u$'s parent's subtree, plus nodes in $u$'s sibling's subtree.
3. Compute subtree depths bottom-up: for each node, its subtree depth is $1 + \max(\text{left}, \text{right})$. Store this in map `d`.
4. Traverse top-down: keep track of `rest`, which is the maximum depth achieved outside the current subtree.
5. For node `root`, `res[root.val] = rest`. For `root.left`, the external paths can either be from `rest` or from going down `root.right` (reaching depth `depth + d.get(root.right)`).
6. Record `res` for all node values $1 \dots n$. Then answer each query in $O(1)$ time.

### Algorithm / Intuition

In the provided Java solution:

1. `f(TreeNode root)` recursively calculates each node's height (in nodes) and records it in `Map<TreeNode, Integer> d`. A null node has height 0.
2. `res = new int[d.size() + 1]` holds the answer for every node value.
3. `dfs(root, depth, rest)` is called with initial `depth = -1, rest = 0`. At each call, `++depth` sets the current node's 0-indexed edge depth from the root.
4. The current node's answer is recorded: `res[root.val] = rest`.
5. The traversal continues to the left child with updated external height `Math.max(rest, depth + d.get(root.right))`, and to the right child with `Math.max(rest, depth + d.get(root.left))`.
6. In `treeQueries`, answers are populated directly via `ans[i] = res[queries[i]]`.

---

## Dry Run

Consider Example 1: `root = [1,3,4,2,null,6,5,null,null,null,null,null,7]`, `queries = [4]`

1. **Subtree heights (`f`)**:
   - Node 2: height 1. Node 3: left=2 (height 1), right=null -> height 2.
   - Node 7: height 1. Node 5: right=7 -> height 2. Node 6: leaf -> height 1.
   - Node 4: left=6 (height 1), right=5 (height 2) -> height 3.
   - Node 1: left=3 (height 2), right=4 (height 3) -> height 4.

2. **Precomputation (`dfs`)**:
   - Root 1: `depth = 0`, `rest = 0`.
   - Left child 3: `rest = max(0, 0 + d.get(4)) = max(0, 3) = 3`.
   - Right child 4: `rest = max(0, 0 + d.get(3)) = max(0, 2) = 2`. Thus `res[4] = 2`.

3. **Query response**:
   - Query 4 -> `res[4] = 2`.

Result: `[2]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m)` — The first DFS visits all $n$ nodes to compute heights in $O(n)$ time. The second DFS visits all $n$ nodes to precompute `res` in $O(n)$ time. Each of the $m$ queries is then answered in $O(1)$ time, yielding $O(n + m)$ overall.
- **Space Complexity:** `O(n)` — The `res` array requires $O(n)$ space, the `HashMap` `d` stores $n$ entries, and recursion depth is bounded by $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2458height-of-binary-tree-after-subtree-removal-queries.java](./2458height-of-binary-tree-after-subtree-removal-queries.java) |

---

## Key Learnings

- Offline precomputation converts expensive query problems into $O(1)$ table lookups.
- Sibling subtree heights provide the exact information needed to evaluate tree metrics upon subtree deletion.
- A two-pass DFS pattern (bottom-up aggregation followed by top-down accumulation) is a powerful technique for tree query problems.
