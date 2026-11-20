---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Search Tree
  - Binary Tree
---

# 230. Kth Smallest Element in a BST

**[View Problem on LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0230` (`230`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary search tree, and an integer `k`, return *the* `k^th` *smallest value (**1-indexed**) of all the values of the nodes in the tree*.

---

## Examples

### Example 1

```text
**Input:** root = [3,1,4,null,2], k = 1
**Output:** 1
```

### Example 2

```text
**Input:** root = [5,3,6,2,4,null,null,1], k = 3
**Output:** 3
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is `n`.
	
- `1 <= k <= n <= 10^4`
	
- `0 <= Node.val <= 10^4`

 

**Follow up:** If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

---

## Problem Understanding

- Return the `k`-th smallest (1-indexed) value in a Binary Search Tree.

---

## Approach

### Optimized Approach (Subtree-Size Augmented BST Lookup)
1. Precompute the size of every subtree in a `Map<TreeNode, Integer> cnt` via DFS `count(root)`.
2. Walk down from `root`: let `v` be the size of `node.left`.
   - If `v == k - 1`, `node.val` is the answer.
   - If `v < k - 1`, step right and adjust `k -= (v + 1)`.
   - Else step left.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ preprocessing + $O(h)$ per query.\n- **Space Complexity:** $O(n)$ — Map storing subtree node counts.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [230kth-smallest-element-in-a-bst.java](./230kth-smallest-element-in-a-bst.java) |

---

## Key Learnings

- Augmenting BST nodes with subtree sizes answers order-statistic queries in $O(h)$ time, directly supporting the follow-up of frequent queries.
