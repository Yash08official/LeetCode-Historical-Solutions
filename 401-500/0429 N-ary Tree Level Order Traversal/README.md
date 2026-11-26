---
comments: true
difficulty: Medium
tags:
  - Tree
  - Breadth-First Search
---

# 429. N-ary Tree Level Order Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0429` (`429`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Breadth-First Search` |
| **Solution Language** | Java |

---

## Problem Description

Given an n-ary tree, return the *level order* traversal of its nodes' values.

*Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).*

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)

```
Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png)

```
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
```

 

**

---

## Constraints

**

	- The height of the n-ary tree is less than or equal to `1000`

	- The total number of nodes is between `[0, 10^4]`

---

## Problem Understanding

- Return the level-order (top-to-bottom, left-to-right) traversal values of an N-ary tree.

---

## Approach

### Optimized Approach (Depth-Indexed Preorder DFS)
1. Maintain `ans`, a list of lists where `ans.get(i)` stores node values at depth `i`.
2. Run preorder DFS `dfs(root, i)`: whenever `ans.size() <= i`, append a new empty level list.
3. Append `root.val` to `ans.get(i)` and recurse on each child in left-to-right order with depth `i + 1`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — every node is visited once.
- **Space Complexity:** $O(H)$ recursion stack space, where $H$ is the tree height ($O(N)$ worst case), plus output storage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [429n-ary-tree-level-order-traversal.java](./429n-ary-tree-level-order-traversal.java) |

---

## Key Learnings

- Preorder DFS visiting children left-to-right naturally preserves left-to-right ordering within every depth bucket, offering a clean alternative to queue-based BFS.
