---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Tree
  - Binary Tree
---

# 331. Verify Preorder Serialization of a Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0331` (`331`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

One way to serialize a binary tree is to use **preorder traversal**. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as `'#'`.

For example, the above binary tree can be serialized to the string `"9,3,4,#,#,1,#,#,2,#,6,#,#"`, where `'#'` represents a null node.

Given a string of comma-separated values `preorder`, return `true` if it is a correct preorder traversal serialization of a binary tree.

It is **guaranteed** that each comma-separated value in the string must be either an integer or a character `'#'` representing null pointer.

You may assume that the input format is always valid.

	
- For example, it could never contain two consecutive commas, such as `"1,,3"`.

**Note: **You are not allowed to reconstruct the tree.

---

## Examples

### Example 1

```text
**Input:** preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"
**Output:** true
```

### Example 2

```text
**Input:** preorder = "1,#"
**Output:** false
```

### Example 3

```text
**Input:** preorder = "9,#,#,1"
**Output:** false
```

 

**

---

## Constraints

**

	
- `1 <= preorder.length <= 10^4`
	
- `preorder` consist of integers in the range `[0, 100]` and `'#'` separated by commas `','`.

---

## Problem Understanding

- Verify whether a comma-separated preorder string (with `#` for nulls) represents a valid binary tree serialization without building the tree.

---

## Approach

### Optimized Approach (Stack Leaf-Collapsing Reduction)
1. Push each token onto `stk`.
2. Whenever the top 3 elements match `(non-#, #, #)`, collapse that complete leaf subtree into a single `#` and repeat.
3. The serialization is valid iff the stack reduces to exactly `["#"]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each token is pushed and collapsed at most once.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [331verify-preorder-serialization-of-a-binary-tree.java](./331verify-preorder-serialization-of-a-binary-tree.java) |

---

## Key Learnings

- Bottom-up subtree reduction (`node, #, # -> #`) validates preorder structure in linear time without constructing tree nodes.
