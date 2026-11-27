---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Tree
  - Depth-First Search
  - Binary Tree
  - DP on Trees
---

# 508. Most Frequent Subtree Sum

**[View Problem on LeetCode](https://leetcode.com/problems/most-frequent-subtree-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0508` (`508`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Tree`, `Depth-First Search`, `Binary Tree`, `DP on Trees` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, return the most frequent **subtree sum**. If there is a tie, return all the values with the highest frequency in any order.

The **subtree sum** of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2021/04/24/freq1-tree.jpg)

```
Input: root = [5,2,-3]
Output: [2,-3,4]
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2021/04/24/freq2-tree.jpg)

```
Input: root = [5,2,-5]
Output: [2]
```

 

**

---

## Constraints

**

	- The number of nodes in the tree is in the range `[1, 10^4]`.

	- `-10^5 <= Node.val <= 10^5`

---

## Problem Understanding

- Compute the subtree sum (`node.val + leftSum + rightSum`) for every node in a binary tree and return all subtree sums tied for the highest occurrence frequency.

---

## Approach

### Optimized Approach (Iterative State-Machine Postorder Traversal)
1. Use an explicit stack `stk` of `(TreeNode, state)` `Frame`s and an `IdentityHashMap<TreeNode, Integer> sub` to store each node's computed subtree sum iteratively (postorder: children must resolve before parent).
2. When `state == 0`, re-push `(node, 1)` followed by right and left children in `state == 0`.
3. When `state == 1`, children are already in `sub`; compute `s = node.val + l + r`, increment `cnt[s]`, update max frequency `mx`, and store `sub.put(node, s)`.
4. Collect every sum in `cnt` whose count equals `mx` and convert to `int[]`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — each node transitions through states `0` and `1` once.
- **Space Complexity:** $O(N)$ for `sub`, `cnt`, and the explicit stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [508most-frequent-subtree-sum.java](./508most-frequent-subtree-sum.java) |

---

## Key Learnings

- A 2-state explicit `Frame` stack plus `IdentityHashMap` cleanly converts recursive postorder DP on trees into an overflow-safe iterative traversal.
