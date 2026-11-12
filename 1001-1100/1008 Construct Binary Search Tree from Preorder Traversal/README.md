---
comments: true
difficulty: Medium
tags:
  - Array
  - Stack
  - Tree
  - Binary Search Tree
  - Monotonic Stack
  - Binary Tree
---

# 1008. Construct Binary Search Tree from Preorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1008` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Tree`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of integers `preorder`, which represents the **preorder traversal** of a BST (binary search tree), construct the tree and return its root.

It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases.

---

## Problem Understanding

- In a preorder traversal, the first element `preorder[i]` is the root of the current subtree.
- In a BST:
  - All values in the left subtree are smaller than `root.val`.
  - All values in the right subtree are greater than `root.val`.
- Thus, in `preorder[i+1 \dots j]`, the elements smaller than `preorder[i]` form the left subtree, followed by elements greater than `preorder[i]` forming the right subtree.

---

## Approach

### Binary Search Subtree Partitioning

1. In range $[i \dots j]$, construct `root = new TreeNode(preorder[i])`.
2. Binary search to find the first index $l \in [i+1 \dots j+1]$ where `preorder[l] > preorder[i]`.
3. Recursively build:
   - `root.left = dfs(i + 1, l - 1)`
   - `root.right = dfs(l, j)`
4. Return `root`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ average ($O(N^2)$ worst-case for skewed trees).
- **Space Complexity:** $O(N)$ for recursion stack and tree nodes.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1008construct-binary-search-tree-from-preorder-traversal.java](./1008construct-binary-search-tree-from-preorder-traversal.java) |

---

## Key Learnings

- Preorder BST traversal uniquely determines tree structure because the BST property provides the boundary between left and right subtrees.
