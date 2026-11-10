---
comments: true
difficulty: Medium
tags:
  - Tree
  - Breadth-First Search
  - Binary Tree
---

# 107. Binary Tree Level Order Traversal II

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0107` (`107`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, return *the bottom-up level order traversal of its nodes' values*. (i.e., from leaf to root level by level from left to right).

---

## Examples

### Example 1

```text
Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
```

### Example 2

```text
Input: root = [1]
Output: [[1]]
```

### Example 3

```text
Input: root = []
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

---

## Problem Understanding

- Standard level-order traversal visits levels from top to bottom (root to leaf).
- Here, we must return levels in reverse order: from deepest leaf level up to the root level, but maintaining left-to-right order within each level.

---

## Approach

### Optimized Approach (BFS Level-Order with LinkedList Front Insertion)

1. If `root == null`, return an empty list.
2. Initialize `LinkedList<List<Integer>> ans` and a queue `Deque<TreeNode> q = new LinkedList<>()`.
3. Enqueue `root`.
4. While `q` is not empty:
   - For each node at the current level (`q.size()` nodes):
     - Poll node and append its value to current level list `t`.
     - Enqueue `node.left` and `node.right` if they exist.
   - Insert `t` at the front of `ans`: `ans.addFirst(t)`.
5. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Every node is enqueued, dequeued, and added to the list once. `addFirst` on `LinkedList` takes $O(1)$ time per level.
- **Space Complexity:** $O(N)$ — Queue stores at most $O(N)$ nodes at the widest tree level, and result stores all $N$ values.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [107binary-tree-level-order-traversal-ii.java](./107binary-tree-level-order-traversal-ii.java) |

---

## Key Learnings

- Using `LinkedList.addFirst()` naturally reverses the outer level order in $O(1)$ time per level without requiring a post-traversal collection reversal.
