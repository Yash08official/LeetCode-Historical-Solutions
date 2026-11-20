---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Search Tree
  - Binary Tree
  - Binary Lifting
  - Lowest Common Ancestor
---

# 235. Lowest Common Ancestor of a Binary Search Tree

**[View Problem on LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0235` (`235`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Search Tree`, `Binary Tree`, `Binary Lifting`, `Lowest Common Ancestor` |
| **Solution Language** | Java |

---

## Problem Description

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**).”

---

## Examples

### Example 1

```text
**Input:** root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
**Output:** 6
**Explanation:** The LCA of nodes 2 and 8 is 6.
```

### Example 2

```text
**Input:** root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
**Output:** 2
**Explanation:** The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
```

### Example 3

```text
**Input:** root = [2,1], p = 2, q = 1
**Output:** 2
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[2, 10^5]`.
	
- `-10^9 <= Node.val <= 10^9`
	
- All `Node.val` are **unique**.
	
- `p != q`
	
- `p` and `q` will exist in the BST.

---

## Problem Understanding

- Find the lowest common ancestor (LCA) of two nodes `p` and `q` in a Binary Search Tree.

---

## Approach

### Optimized Approach (BST Ordering Split Point)
1. If `root.val < Math.min(p.val, q.val)`, both `p` and `q` lie in the right subtree -> recurse on `root.right`.
2. If `root.val > Math.max(p.val, q.val)`, both lie in the left subtree -> recurse on `root.left`.
3. Otherwise `root` lies between `p` and `q` (inclusive), making `root` the LCA.

---

## Complexity Analysis

- **Time Complexity:** $O(h)$ — Follows a single root-to-LCA path.\n- **Space Complexity:** $O(h)$ — Recursion stack depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [235lowest-common-ancestor-of-a-binary-search-tree.java](./235lowest-common-ancestor-of-a-binary-search-tree.java) |

---

## Key Learnings

- BST ordering lets you decide left/right/split at each node in $O(1)$ without exploring both subtrees.
