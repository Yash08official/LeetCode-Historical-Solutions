---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Stack
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 114. Flatten Binary Tree to Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0114` (`114`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Stack`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree, flatten the tree into a "linked list":

- The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.
- The "linked list" should be in the same order as a **pre-order traversal** of the binary tree.

---

## Examples

### Example 1

```text
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```

### Example 2

```text
Input: root = []
Output: []
```

### Example 3

```text
Input: root = [0]
Output: [0]
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-100 <= Node.val <= 100`

---

## Problem Understanding

- We need to modify the binary tree in-place so that all `left` pointers are `null` and `right` pointers chain the nodes in pre-order traversal sequence.
- Preorder sequence: Root $\to$ Left subtree $\to$ Right subtree.
- Therefore, the entirety of the left subtree must precede the right subtree. The rightmost node of the left subtree (predecessor) must point to `root.right`.

---

## Approach

### Optimized Approach (Morris-Style In-Place Predecessor Threading)

1. While `root` is not null:
   - If `root.left` exists:
     - Find the rightmost node of the left subtree: `let pre = root.left; while (pre.right) pre = pre.right;`.
     - Rewire: set `pre.right = root.right`.
     - Move the flattened left subtree to become the right child: `root.right = root.left`.
     - Nullify left pointer: `root.left = null`.
   - Move to next node: `root = root.right`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Every node is visited at most twice (once to find predecessor, once as current).
- **Space Complexity:** $O(1)$ — In-place pointer rewiring without auxiliary stacks or recursion.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [114flatten-binary-tree-to-linked-list.js](./114flatten-binary-tree-to-linked-list.js) |

---

## Key Learnings

- Morris traversal techniques allow in-place tree transformations without extra stack frames or node list allocations.
- Splicing the original right subtree at the end of the left subtree naturally preserves preorder traversal order.
