---
comments: true
difficulty: Medium
tags:
  - Tree
  - Breadth-First Search
  - Binary Tree
---

# 103. Binary Tree Zigzag Level Order Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0103` (`103`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, return *the zigzag level order traversal of its nodes' values*. (i.e., from left to right, then right to left for the next level and alternate between).

---

## Examples

### Example 1

```text
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
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
- `-100 <= Node.val <= 100`

---

## Problem Understanding

- We need to perform level-by-level traversal of the binary tree.
- For level 0 (root), values are traversed left-to-right.
- For level 1, values are traversed right-to-left.
- For level 2, values are traversed left-to-right, and so on alternating direction each level.

---

## Approach

### Optimized Approach (BFS Level-Order with Direction Flip)

1. If `root == null`, return an empty list `ans`.
2. Initialize queue `q` (e.g. `ArrayDeque<TreeNode>`) and enqueue `root`.
3. Maintain boolean variable `left = true` indicating whether the current level should be stored left-to-right.
4. While `q` is not empty:
   - Determine current level size `n = q.size()`.
   - Collect values for this level into a temporary list `t`.
   - For each node polled:
     - Add `node.val` to `t`.
     - Enqueue `node.left` (if non-null).
     - Enqueue `node.right` (if non-null).
   - If `!left`, reverse `t` using `Collections.reverse(t)`.
   - Add `t` to `ans`.
   - Invert `left = !left`.
5. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each node is enqueued, dequeued, and placed into the result exactly once. Reversing levels takes $O(N)$ total time across all levels.
- **Space Complexity:** $O(N)$ — The queue holds at most $O(N)$ nodes at the maximum level width, and the result stores all $N$ node values.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [103binary-tree-zigzag-level-order-traversal.java](./103binary-tree-zigzag-level-order-traversal.java) |

---

## Key Learnings

- Breadth-First Search with a boolean direction flag provides a simple and robust implementation of zigzag traversal.
- Alternating direction can be achieved either by reversing the level collection or using a double-ended queue (`Deque`) to insert values at the front or back.
