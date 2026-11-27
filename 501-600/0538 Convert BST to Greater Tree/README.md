---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Search Tree
  - Binary Tree
---

# 538. Convert BST to Greater Tree

**[View Problem on LeetCode](https://leetcode.com/problems/convert-bst-to-greater-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0538` (`538`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

As a reminder, a *binary search tree* is a tree that satisfies these constraints:

	- The left subtree of a node contains only nodes with keys **less than** the node's key.

	- The right subtree of a node contains only nodes with keys **greater than** the node's key.

	- Both the left and right subtrees must also be binary search trees.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2019/05/02/tree.png)

```
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```

### Example 2

```
Input: root = [0,null,1]
Output: [1,null,1]
```

 

**

---

## Constraints

**

	- The number of nodes in the tree is in the range `[0, 10^4]`.

	- `-10^4 <= Node.val <= 10^4`

	- All the values in the tree are **unique**.

	- `root` is guaranteed to be a valid binary search tree.

 

**Note:** This question is the same as 1038: https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/

---

## Problem Understanding

- Convert a Binary Search Tree in place into a Greater Tree where every node's key becomes the original key plus the sum of all keys greater than it.

---

## Approach

### Optimized Approach (Iterative Reverse-Inorder State-Machine Traversal)
1. Visiting nodes in **reverse inorder (`right -> node -> left`)** processes BST keys in strictly descending order.
2. Track `Frame(node, state)` on explicit stack `stk` and running suffix sum `s`:
   - `state == 0`: push `(node, 1)` and recurse right if `node.right != null`.
   - `state == 1`: accumulate `s += node.val`, overwrite `node.val = s`, and push `node.left` with `state == 0`.
3. Return modified `root`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — each node is visited once.
- **Space Complexity:** $O(H)$ explicit stack depth, where $H$ is tree height ($O(N)$ worst case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [538convert-bst-to-greater-tree.java](./538convert-bst-to-greater-tree.java) |

---

## Key Learnings

- Reverse inorder traversal turns BST greater-sum conversion into a single running prefix sum over descending keys.
