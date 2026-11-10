---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 112. Path Sum

**[View Problem on LeetCode](https://leetcode.com/problems/path-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0112` (`112`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.

A **leaf** is a node with no children.

---

## Examples

### Example 1

```text
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
```

### Example 2

```text
Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
```

### Example 3

```text
Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

---

## Problem Understanding

- A valid path must start at the root node and terminate at a leaf node (a node where `left == null && right == null`).
- The sum of node values along this path must strictly equal `targetSum`.
- If the tree is empty, return `false`.

---

## Approach

### Optimized Approach (Recursive DFS Path Sum Accumulation)

1. Base case: If `root == null`, return `false`.
2. Define recursive helper `dfs(root, s)`:
   - If `!root`, return `false`.
   - Accumulate `s += root.val`.
   - If `!root.left && !root.right` (leaf node):
     - Return `s === targetSum`.
   - Recursively search left and right subtrees:
     - Return `dfs(root.left, s) || dfs(root.right, s)`.
3. Call `dfs(root, 0)`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — In the worst case, every node is visited once.
- **Space Complexity:** $O(H)$ — Recursion call stack space bounded by tree height $H$ ($O(\log N)$ balanced, $O(N)$ skewed).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [112path-sum.js](./112path-sum.js) |

---

## Key Learnings

- A leaf check requires verifying both `!root.left && !root.right`. Checking a null child directly could incorrectly identify an internal single-child node as a path ending.
