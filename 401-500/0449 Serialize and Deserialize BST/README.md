---
comments: true
difficulty: Medium
tags:
  - String
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Design
  - Binary Search Tree
  - Binary Tree
---

# 449. Serialize and Deserialize BST

**[View Problem on LeetCode](https://leetcode.com/problems/serialize-and-deserialize-bst/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0449` (`449`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Design`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be serialized to a string, and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.

---

## Examples

### Example 1

```text
**Input:** root = [2,1,3]
**Output:** [2,1,3]
```

### Example 2

```text
**Input:** root = []
**Output:** []
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[0, 10^4]`.
	
- `0 <= Node.val <= 10^4`
	
- The input tree is **guaranteed** to be a binary search tree.

---

## Problem Understanding

- Design a compact `serialize` and `deserialize` codec for a Binary Search Tree.

---

## Approach

### Optimized Approach (Preorder Traversal + Value-Bound BST Reconstruction)
1. `serialize`: perform preorder DFS and join node values with spaces (no `#` null markers needed!).
2. `deserialize`: consume preorder values left-to-right using recursive range bounds `dfs(mi, mx)` — a value belongs to the current subtree iff `mi <= x <= mx`, splitting into `dfs(mi, x)` (left) and `dfs(x, mx)` (right).

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ for both `serialize` and `deserialize`.\n- **Space Complexity:** $O(n)$ for serialized string and recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [449serialize-and-deserialize-bst.java](./449serialize-and-deserialize-bst.java) |

---

## Key Learnings

- BST ordering uniquely determines tree topology from preorder alone, making serialization as compact as $n$ integers with no null placeholders.
