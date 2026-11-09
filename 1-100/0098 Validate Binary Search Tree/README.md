---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Search Tree
  - Binary Tree
---

# 98. Validate Binary Search Tree

**[View Problem on LeetCode](https://leetcode.com/problems/validate-binary-search-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0098` (`98`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, *determine if it is a valid binary search tree (BST)*.

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

---

## Examples

### Example 1

```text
Input: root = [2,1,3]
Output: true
```

### Example 2

```text
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

---

## Problem Understanding

- A binary tree is a valid BST if and only if its in-order traversal visits node values in **strictly increasing** order.
- By tracking the previously visited node `prev`, we only need to verify `prev.val < root.val` at each step of an in-order DFS traversal.

---

## Approach

### Optimized Approach (In-Order Traversal with Previous Node Tracking)

1. Maintain member reference `prev = null`.
2. Define `dfs(root)`:
   - If `root == null`, return `true`.
   - Traverse left subtree: `if (!dfs(root.left)) return false;`
   - Check BST property: if `prev != null && prev.val >= root.val`, return `false` (violation of strictly increasing sequence).
   - Update `prev = root`.
   - Traverse right subtree: `return dfs(root.right);`
3. Return `dfs(root)`.

---

## Dry Run

Consider `root = [2, 1, 3]`:
1. `dfs(2)` calls `dfs(1)`.
2. `dfs(1)`:
   - `dfs(null)` returns `true`.
   - `prev == null` -> `prev = 1`.
   - `dfs(null)` returns `true`. Returns `true`.
3. Back at `root = 2`:
   - `prev.val = 1 < 2` (valid!).
   - `prev = 2`.
   - Call `dfs(3)`:
     - `dfs(null)` returns `true`.
     - `prev.val = 2 < 3` (valid!).
     - `prev = 3`.
     - `dfs(null)` returns `true`. Returns `true`.
4. Entire tree valid -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single in-order traversal visiting each node at most once with early exit upon violation.
- **Space Complexity:** $O(H)$ — Recursion call stack proportional to tree height $H$ ($O(\log N)$ balanced, $O(N)$ worst case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [98validate-binary-search-tree.java](./98validate-binary-search-tree.java) |

---

## Key Learnings

- In-order traversal of a BST is strictly monotonic increasing.
- Tracking `prev` eliminates the risk of integer overflow that arises when passing min/max integer bounds.
