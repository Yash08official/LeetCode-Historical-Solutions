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

# 116. Populating Next Right Pointers in Each Node

**[View Problem on LeetCode](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0116` (`116`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **perfect binary tree** where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

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
Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree, your function should populate each next pointer to point to its next right node. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
```

### Example 2

```text
Input: root = []
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 2^12 - 1]`.
- `-1000 <= Node.val <= 1000`

---

## Problem Understanding

- The tree is a **perfect binary tree** (every non-leaf has both left and right children, all leaves are at the deepest level).
- We must connect:
  1. Internal sibling connection: `node.left.next = node.right`.
  2. Cross-parent connection: `node.right.next = node.next.left` (connecting across different subtrees on the same level).

---

## Approach

### Optimized Approach (Recursive DFS Cross-Subtree Stitching)

1. If `root == null`, return `null`.
2. Define recursive helper `dfs(left, right)`:
   - If `left == null || right == null`, return.
   - Connect the current pair: `left.next = right`.
   - Recursively stitch:
     - Left child's subtrees: `dfs(left.left, left.right)`
     - Cross-subtree bridge: `dfs(left.right, right.left)`
     - Right child's subtrees: `dfs(right.left, right.right)`
3. Call `dfs(root.left, root.right)` and return `root`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each connection between adjacent nodes at the same level is established in $O(1)$ time.
- **Space Complexity:** $O(\log N)$ — Recursion call stack depth bounded by tree height $H = \log_2 N$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [116populating-next-right-pointers-in-each-node.java](./116populating-next-right-pointers-in-each-node.java) |

---

## Key Learnings

- Passing adjacent node pairs `(left, right)` recursively allows bridging across distinct subtrees without needing an auxiliary level-order queue.
