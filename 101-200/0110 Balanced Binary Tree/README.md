---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 110. Balanced Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/balanced-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0110` (`110`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a binary tree, determine if it is **height-balanced**.

A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

---

## Examples

### Example 1

```text
Input: root = [3,9,20,null,null,15,7]
Output: true
```

### Example 2

```text
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
```

### Example 3

```text
Input: root = []
Output: true
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-10^4 <= Node.val <= 10^4`

---

## Problem Understanding

- A tree is balanced if and only if for every node:
  1. Its left subtree is balanced.
  2. Its right subtree is balanced.
  3. The difference between the height of the left and right subtrees is at most 1: $|h_{left} - h_{right}| \le 1$.
- An empty tree has height 0 and is balanced.

---

## Approach

### Optimized Approach (Bottom-Up Postorder DFS with Early Pruning)

1. Define helper function `height(root)`:
   - If `!root`, return `0`.
   - Recursively compute `l = height(root.left)`.
   - Recursively compute `r = height(root.right)`.
   - If `l === -1` or `r === -1` (subtree is already unbalanced) or `Math.abs(l - r) > 1`:
     - Return `-1` immediately to signal imbalance.
   - Otherwise, return `1 + Math.max(l, r)`.
2. The tree is balanced if `height(root) >= 0`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Every node is visited once in bottom-up fashion. Imbalance is propagated upward without redundant top-down height recalculations.
- **Space Complexity:** $O(H)$ — Recursion call stack space proportional to tree height $H$ ($O(\log N)$ best, $O(N)$ worst).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [110balanced-binary-tree.js](./110balanced-binary-tree.js) |

---

## Key Learnings

- Bottom-up postorder traversal avoids the $O(N^2)$ overhead of repeatedly computing tree heights from root to leaves.
- Sentinel return values (such as `-1`) allow immediate error/unbalanced signaling without dedicated exception handling.
