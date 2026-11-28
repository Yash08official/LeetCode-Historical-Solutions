---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Binary Search Tree
  - Binary Tree
---

# 501. Find Mode in Binary Search Tree

**[View Problem on LeetCode](https://leetcode.com/problems/find-mode-in-binary-search-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0501` (`501`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary search tree (BST) with duplicates, return *all the mode(s) (i.e., the most frequently occurred element) in it*.

If the tree has more than one mode, return them in **any order**.

Assume a BST is defined as follows:

	- The left subtree of a node contains only nodes with keys **less than or equal to** the node's key.

	- The right subtree of a node contains only nodes with keys **greater than or equal to** the node's key.

	- Both the left and right subtrees must also be binary search trees.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2021/03/11/mode-tree.jpg)

```
Input: root = [1,null,2,2]
Output: [2]
```

### Example 2

```
Input: root = [0]
Output: [0]
```

 

**

---

## Constraints

**

	- The number of nodes in the tree is in the range `[1, 10^4]`.

	- `-10^5 <= Node.val <= 10^5`

 

**Follow up:** Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).

---

## Problem Understanding

- Find all mode(s) (the most frequently occurred elements) in a Binary Search Tree (BST) with duplicates.

---

## Approach

### Optimized Approach (Iterative Inorder State Machine Traversal)
1. Since the tree is a BST, an **inorder traversal** visits all node values in non-decreasing order, clustering identical values consecutively.
2. Use an explicit 2-state `Frame(node, state)` stack to simulate recursion:
   - `state == 0`: re-push with `state = 1`, then push left child if non-null.
   - `state == 1`: process current node value. If `prev == node.val`, increment `cnt`; otherwise reset `cnt = 1`. Update `res` and `mx`, update `prev = node.val`, and push right child with `state = 0`.
3. Return the collected mode values as an `int[]` array.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — each node is visited in constant time.
- **Space Complexity:** $O(H)$ stack depth where $H$ is the tree height ($O(N)$ worst case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [501find-mode-in-binary-search-tree.java](./501find-mode-in-binary-search-tree.java) |

---

## Key Learnings

- Exploiting BST inorder sorting enables finding modes in a single pass with running frequency counters without allocating a frequency hash table.
