---
comments: true
difficulty: Medium
tags:
  - Binary Search
  - Bit Manipulation
  - Tree
  - Binary Tree
---

# 222. Count Complete Tree Nodes

**[View Problem on LeetCode](https://leetcode.com/problems/count-complete-tree-nodes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0222` (`222`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Binary Search`, `Bit Manipulation`, `Tree`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a **complete** binary tree, return the number of the nodes in the tree.

According to **Wikipedia**, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between `1` and `2^h` nodes inclusive at the last level `h`.

Design an algorithm that runs in less than O(n) time complexity.

---

## Examples

### Example 1

```text
**Input:** root = [1,2,3,4,5,6]
**Output:** 6
```

### Example 2

```text
**Input:** root = []
**Output:** 0
```

### Example 3

```text
**Input:** root = [1]
**Output:** 1
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[0, 5 * 10^4]`.
	
- `0 <= Node.val <= 5 * 10^4`
	
- The tree is guaranteed to be **complete**.

---

## Problem Understanding

- Count the total number of nodes in a complete binary tree faster than $O(n)$.

---

## Approach

### Optimized Approach (Complete Binary Tree Subtree Height Comparison)
1. Compute leftmost depths `left = depth(root.left)` and `right = depth(root.right)`.
2. If `left == right`, the left subtree is a perfect binary tree with $2^{\text{left}} - 1$ nodes; together with `root` that contributes `1 << left`, so recurse on `root.right`.
3. Otherwise, the right subtree is a perfect binary tree of height `right`; together with `root` that contributes `1 << right`, so recurse on `root.left`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log^2 n)$ — Each recursive level descends by 1 and computes height in $O(\log n)$.\n- **Space Complexity:** $O(\log n)$ — Recursion stack depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [222count-complete-tree-nodes.js](./222count-complete-tree-nodes.js) |

---

## Key Learnings

- Exploiting the complete-tree invariant eliminates half the tree at every step, achieving sublinear $O(\log^2 n)$ counting.
