---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 226. Invert Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/invert-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0226` (`226`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree, invert the tree, and return *its root*.

---

## Examples

### Example 1

```text
**Input:** root = [4,2,7,1,3,6,9]
**Output:** [4,7,2,9,6,3,1]
```

### Example 2

```text
**Input:** root = [2,1,3]
**Output:** [2,3,1]
```

### Example 3

```text
**Input:** root = []
**Output:** []
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[0, 100]`.
	
- `-100 <= Node.val <= 100`

---

## Problem Understanding

- Mirror (invert) a binary tree by swapping the left and right children of every node.

---

## Approach

### Optimized Approach (Recursive Post-Order DFS)
1. Base case: if `!root`, return `root`.
2. Recursively invert `root.left` and `root.right`.
3. Swap `root.left = r` and `root.right = l`, then return `root`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Visits every node once.\n- **Space Complexity:** $O(h)$ — Call stack proportional to tree height $h$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [226invert-binary-tree.js](./226invert-binary-tree.js) |

---

## Key Learnings

- Bottom-up recursion naturally inverts every subtree before swapping child references.
