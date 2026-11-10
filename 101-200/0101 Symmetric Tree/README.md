---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 101. Symmetric Tree

**[View Problem on LeetCode](https://leetcode.com/problems/symmetric-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0101` (`101`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, *check whether it is a mirror of itself* (i.e., symmetric around its center).

---

## Examples

### Example 1

```text
Input: root = [1,2,2,3,4,4,3]
Output: true
```

### Example 2

```text
Input: root = [1,2,2,null,3,null,3]
Output: false
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 1000]`.
- `-100 <= Node.val <= 100`

---

## Problem Understanding

- A binary tree is symmetric around its center if the left subtree is an inverted mirror image of the right subtree.
- For two nodes `root1` and `root2` to be symmetric mirror reflections:
  1. Both must be `null` (mirror reflections of empty nodes).
  2. If both are non-null, their values must be equal (`root1.val == root2.val`).
  3. The outer subtrees must mirror each other: `root1.left` must mirror `root2.right`.
  4. The inner subtrees must mirror each other: `root1.right` must mirror `root2.left`.

---

## Approach

### Optimized Approach (Recursive DFS Mirror Comparison)

1. Base case: If `root == null`, return `true`.
2. Invoke helper `dfs(root.left, root.right)`.
3. In `dfs(root1, root2)`:
   - If `root1 == root2` (both null or same reference), return `true`.
   - If either is null or `root1.val != root2.val`, return `false`.
   - Recursively evaluate `dfs(root1.left, root2.right) && dfs(root1.right, root2.left)`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — In the worst case, every node in the tree is visited once.
- **Space Complexity:** $O(H)$ — Recursion call stack proportional to the height $H$ of the binary tree ($O(\log N)$ best/balanced, $O(N)$ worst).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [101symmetric-tree.java](./101symmetric-tree.java) |

---

## Key Learnings

- Symmetry in binary trees requires comparing pair-wise reflections (`left.left` with `right.right`, and `left.right` with `right.left`).
- Early return on reference equality (`root1 == root2`) cleanly covers simultaneous null checks.
