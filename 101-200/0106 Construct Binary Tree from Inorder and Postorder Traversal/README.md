---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Divide and Conquer
  - Tree
  - Binary Tree
---

# 106. Construct Binary Tree from Inorder and Postorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0106` (`106`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Divide and Conquer`, `Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return *the binary tree*.

---

## Examples

### Example 1

```text
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
```

### Example 2

```text
Input: inorder = [-1], postorder = [-1]
Output: [-1]
```

---

## Constraints

- `1 <= inorder.length <= 3000`
- `postorder.length == inorder.length`
- `-3000 <= inorder[i], postorder[i] <= 3000`
- `inorder` and `postorder` consist of **unique** values.
- Each value of `postorder` also appears in `inorder`.
- `inorder` is **guaranteed** to be the inorder traversal of the tree.
- `postorder` is **guaranteed** to be the postorder traversal of the tree.

---

## Problem Understanding

- In **postorder** traversal (`left -> right -> root`), the last element of any subtree range is always the subtree root.
- In **inorder** traversal (`left -> root -> right`), finding that root element divides the sequence into the left subtree and right subtree elements.
- The length of the left subtree allows splitting the postorder array into left and right subtree sections.

---

## Approach

### Optimized Approach (Divide and Conquer with Hash Map)

1. Precompute hash map `d` storing `inorder[i] -> i` for $O(1)$ index lookup.
2. Define recursive function `dfs(i, j, n)`:
   - `i`: starting index in `inorder`.
   - `j`: starting index in `postorder`.
   - `n`: size of current subtree.
   - If `n <= 0`, return `null`.
3. Root value is located at the end of the postorder range: `v = postorder[j + n - 1]`.
4. Lookup `k = d.get(v)` in inorder map.
5. Left subtree length is `k - i`.
6. Recursively build:
   - Left child: `dfs(i, j, k - i)`
   - Right child: `dfs(k + 1, j + k - i, n - k + i - 1)`
7. Return `new TreeNode(v, left, right)`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each node is constructed once with $O(1)$ lookup via hash map.
- **Space Complexity:** $O(N)$ — $O(N)$ for hash map and $O(H)$ recursion stack space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [106construct-binary-tree-from-inorder-and-postorder-traversal.java](./106construct-binary-tree-from-inorder-and-postorder-traversal.java) |

---

## Key Learnings

- Symmetrical logic to Preorder+Inorder reconstruction, but root is read from the end of the postorder range (`j + n - 1`).
- Exact index offset arithmetic avoids unnecessary array copying.
