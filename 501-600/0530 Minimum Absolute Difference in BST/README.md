---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Search Tree
  - Binary Tree
---

# 530. Minimum Absolute Difference in BST

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0530` (`530`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a Binary Search Tree (BST), return *the minimum absolute difference between the values of any two different nodes in the tree*.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2021/02/05/bst1.jpg)

```
Input: root = [4,2,6,1,3]
Output: 1
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2021/02/05/bst2.jpg)

```
Input: root = [1,0,48,null,null,12,49]
Output: 1
```

 

**

---

## Constraints

**

	- The number of nodes in the tree is in the range `[2, 10^4]`.

	- `0 <= Node.val <= 10^5`

 

**Note:** This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

---

## Problem Understanding

- Find the minimum absolute difference between values of any two different nodes in a Binary Search Tree (BST).

---

## Approach

### Optimized Approach (Iterative Inorder BST Traversal)
1. An inorder traversal of a BST visits node values in strictly sorted order.
2. The minimum difference must occur between two consecutively visited nodes in the inorder sequence.
3. Simulate inorder traversal using an explicit 2-state `Frame` stack:
   - Track `pre` (the previously visited node value).
   - For each node visited in `state == 1`, update `ans = Math.min(ans, node.val - pre)`, then update `pre = node.val`.
4. Return the minimum difference found.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — visits every node once in sorted order.
- **Space Complexity:** $O(H)$ stack depth where $H$ is the tree height.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [530minimum-absolute-difference-in-bst.java](./530minimum-absolute-difference-in-bst.java) |

---

## Key Learnings

- Sorting properties of BST inorder traversal guarantee that closest numeric neighbors are visited consecutively.
