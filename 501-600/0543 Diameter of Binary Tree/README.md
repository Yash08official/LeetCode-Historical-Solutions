---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Binary Tree
  - DP on Trees
---

# 543. Diameter of Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0543` (`543`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Tree`, `DP on Trees` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, return *the length of the **diameter** of the tree*.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The **length** of a path between two nodes is represented by the number of edges between them.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg)

```
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
```

### Example 2

```
Input: root = [1,2]
Output: 1
```

 

**

---

## Constraints

**

	- The number of nodes in the tree is in the range `[1, 10^4]`.

	- `-100 <= Node.val <= 100`

---

## Problem Understanding

- Compute the diameter of a binary tree, defined as the length of the longest path between any two nodes (measured in edges).

---

## Approach

### Optimized Approach (Postorder DFS Height Calculation)
1. Define `dfs(root)` returning the max depth (number of nodes from `root` downward).
2. At each node:
   - Calculate left subtree depth `l` and right subtree depth `r`.
   - The longest path passing through `root` has length `l + r` edges.
   - Update global maximum diameter `ans = Math.max(ans, l + r)`.
   - Return `1 + Math.max(l, r)` as the height of the current subtree.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — single traversal visiting each node once.
- **Space Complexity:** $O(H)$ recursion stack depth where $H$ is tree height.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [543diameter-of-binary-tree.java](./543diameter-of-binary-tree.java) |

---

## Key Learnings

- Tree diameter computation aligns naturally with postorder height calculation, computing local path lengths as the sum of branch depths.
