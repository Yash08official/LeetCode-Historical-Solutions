---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 117. Populating Next Right Pointers in Each Node II

**[View Problem on LeetCode](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0117` (`117`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given a binary tree:

```c
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
};
```

Populate each `next` pointer to point to its next right node. If there is no next right node, the `next` pointer should be set to `NULL`.

Initially, all `next` pointers are set to `NULL`.

---

## Examples

### Example 1

```text
Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree, your function should populate each next pointer to point to its next right node. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
```

### Example 2

```text
Input: root = []
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 6000]`.
- `-100 <= Node.val <= 100`

---

## Problem Understanding

- Unlike Problem 116, this tree is **arbitrary** (nodes may have zero, one, or two children; leaves may exist at varying depths).
- We must connect all nodes at each level horizontally from left to right.
- We must achieve this in $O(1)$ auxiliary space by leveraging the `next` pointers already established at the previous level.

---

## Approach

### Optimized Approach (Level-by-Level Linked List Traversal in O(1) Space)

1. Use the already connected parent level as a linked list (`node = node.next`) to construct the child level's linked list.
2. For each level:
   - Maintain `next` (head of the next level) and `prev` (tail of the next level being assembled).
   - Iterate through current level `node`:
     - Inspect `node.left`: if non-null, link `prev.next = node.left` and advance `prev`.
     - Inspect `node.right`: if non-null, link `prev.next = node.right` and advance `prev`.
     - Move to `node = node.next`.
   - Once the level is completed, descend to `node = next`.
3. Return `root`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Every node is visited once as a parent and linked once as a child.
- **Space Complexity:** $O(1)$ — Only pointer references (`prev`, `next`, `node`) are maintained; no queue or recursive stack frames are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [117populating-next-right-pointers-in-each-node-ii.java](./117populating-next-right-pointers-in-each-node-ii.java) |

---

## Key Learnings

- Using the previously established `next` pointers turns each tree level into a singly linked list, enabling level-order traversal with strictly $O(1)$ extra memory.
