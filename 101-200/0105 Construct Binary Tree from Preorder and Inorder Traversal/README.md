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

# 105. Construct Binary Tree from Preorder and Inorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0105` (`105`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Divide and Conquer`, `Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return *the binary tree*.

---

## Examples

### Example 1

```text
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

### Example 2

```text
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

---

## Constraints

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` and `inorder` consist of **unique** values.
- Each value of `inorder` also appears in `preorder`.
- `preorder` is **guaranteed** to be the preorder traversal of the tree.
- `inorder` is **guaranteed** to be the inorder traversal of the tree.

---

## Problem Understanding

- In **preorder** traversal (`root -> left -> right`), the first element of any subtree range is always the subtree root.
- In **inorder** traversal (`left -> root -> right`), finding the root element partitions the array into the elements belonging to the left subtree (left of root) and right subtree (right of root).
- The size of the left subtree determines the boundary between left and right subtree elements within the preorder slice.

---

## Approach

### Optimized Approach (Divide and Conquer with Hash Map)

1. Prepopulate a hash map `d` storing `inorder[i] -> i` for $O(1)$ root index lookups.
2. Define recursive helper `dfs(i, j, n)`:
   - `i`: starting index in `preorder`.
   - `j`: starting index in `inorder`.
   - `n`: number of nodes in current subtree.
   - If `n <= 0`, return `null`.
3. Extract root value `v = preorder[i]`.
4. Lookup `k = d.get(v)` in inorder map.
5. Left subtree has size `left_size = k - j`.
6. Recursively construct:
   - Left child: `dfs(i + 1, j, left_size)`
   - Right child: `dfs(i + 1 + left_size, k + 1, n - 1 - left_size)`
7. Return `new TreeNode(v, left, right)`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each node is processed in $O(1)$ time due to $O(1)$ hash map lookups.
- **Space Complexity:** $O(N)$ — Hash map stores $N$ entries and recursion call stack uses $O(H)$ space ($O(N)$ worst case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [105construct-binary-tree-from-preorder-and-inorder-traversal.java](./105construct-binary-tree-from-preorder-and-inorder-traversal.java) |

---

## Key Learnings

- Hash map pre-indexing eliminates the $O(N)$ linear search for root values in inorder traversal, reducing overall time from $O(N^2)$ to $O(N)$.
- Passing index offsets and subtree size parameters avoids expensive array slice allocations.
