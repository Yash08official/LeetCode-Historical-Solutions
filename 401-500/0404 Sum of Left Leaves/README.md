---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 404. Sum of Left Leaves

**[View Problem on LeetCode](https://leetcode.com/problems/sum-of-left-leaves/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0404` (`404`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, return *the sum of all left leaves.*

A **leaf** is a node with no children. A **left leaf** is a leaf that is the left child of another node.

---

## Examples

### Example 1

```text
**Input:** root = [3,9,20,null,null,15,7]
**Output:** 24
**Explanation:** There are two left leaves in the binary tree, with values 9 and 15 respectively.
```

### Example 2

```text
**Input:** root = [1]
**Output:** 0
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[1, 1000]`.
	
- `-1000 <= Node.val <= 1000`

---

## Problem Understanding

- Return the sum of all leaf nodes that are left children of their parent.

---

## Approach

### Optimized Approach (Iterative Stack DFS)
1. Push `root` onto `stk` and pop nodes until empty.
2. If `root.left != null`: if `root.left.left == root.left.right` (both `null`, i.e., a leaf), add `root.left.val`; else push `root.left`.
3. If `root.right != null`, push `root.right`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(h)$ stack space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [404sum-of-left-leaves.java](./404sum-of-left-leaves.java) |

---

## Key Learnings

- Checking `node.left == node.right` is a concise Java idiom for `node.left == null && node.right == null` in a binary tree.
