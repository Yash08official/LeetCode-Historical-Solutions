---
comments: true
difficulty: Easy
tags:
  - Stack
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 94. Binary Tree Inorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0094` (`94`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Stack`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, return *the inorder traversal of its nodes' values*.

---

## Examples

### Example 1

```text
Input: root = [1,null,2,3]
Output: [1,3,2]
```

### Example 2

```text
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [4,2,6,5,7,1,3,9,8]
```

### Example 3

```text
Input: root = []
Output: []
```

### Example 4

```text
Input: root = [1]
Output: [1]
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

---

## Problem Understanding

- Inorder traversal explores binary trees in the standard sequence: **Left Subtree $ightarrow$ Current Node $ightarrow$ Right Subtree**.
- For Binary Search Trees, this produces values in strictly non-decreasing order.

---

## Approach

### Optimized Approach (Recursive Depth-First Search)

1. Maintain a list `ans` to collect node values.
2. Define a helper `dfs(root)`:
   - If `root == null`, return.
   - Recurse on `dfs(root.left)`.
   - Add `root.val` to `ans`.
   - Recurse on `dfs(root.right)`.
3. Call `dfs(root)` and return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Every node in the tree of $N$ vertices is visited exactly once.
- **Space Complexity:** $O(H)$ — Recursion call stack space proportional to tree height $H$ ($O(\log N)$ for balanced trees, $O(N)$ for skewed trees).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [94binary-tree-inorder-traversal.java](./94binary-tree-inorder-traversal.java) |

---

## Key Learnings

- Canonical tree traversal decomposes cleanly into recursive subproblems matching tree definition invariants.
