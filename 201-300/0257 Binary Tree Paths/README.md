---
comments: true
difficulty: Easy
tags:
  - String
  - Backtracking
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 257. Binary Tree Paths

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-paths/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0257` (`257`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Backtracking`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given the `root` of a binary tree.

Return all **root-to-leaf** paths* *in **any order**.

A **leaf** is a node with no children.

---

## Examples

### Example 1

```text
**Input:** root = [1,2,3,null,5]
**Output:** ["1->2->5","1->3"]
```

### Example 2

```text
**Input:** root = [1]
**Output:** ["1"]
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[1, 100]`.
	
- `-100 <= Node.val <= 100`

---

## Problem Understanding

- Return all root-to-leaf paths in a binary tree formatted as `"a->b->c"`.

---

## Approach

### Optimized Approach (DFS Backtracking with Path List)
1. Maintain current path list `t` and result list `ans`.
2. On entering `root`, append `root.val + ""` to `t`.
3. If leaf (`root.left == null && root.right == null`), join `t` with `"->"` and add to `ans`; otherwise recurse on children.
4. Backtrack by removing the last element from `t`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot h)$ — Joining paths at leaves.\n- **Space Complexity:** $O(h)$ — Path list and recursion stack (excluding output).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [257binary-tree-paths.java](./257binary-tree-paths.java) |

---

## Key Learnings

- Push/pop backtracking on a shared `List<String>` avoids creating intermediate string copies at every internal node.
