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

# 889. Construct Binary Tree from Preorder and Postorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0889` (`889`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Divide and Conquer`, `Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integer arrays `preorder` and `postorder` representing the preorder (`Root -> Left -> Right`) and postorder (`Left -> Right -> Root`) traversals of the same binary tree containing **distinct** node values.

Reconstruct and return the root of the binary tree. If multiple valid binary trees share the same `preorder` and `postorder` traversals, you may return **any** of them.

---

## Examples

### Example 1

```text
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
```

### Example 2

```text
Input: preorder = [1], postorder = [1]
Output: [1]
```

---

## Constraints

- `1 <= preorder.length <= 30`

- `1 <= preorder[i] <= preorder.length`

- All the values of `preorder` are **unique**.

- `postorder.length == preorder.length`

- `1 <= postorder[i] <= postorder.length`

- All the values of `postorder` are **unique**.

- It is guaranteed that `preorder` and `postorder` are the preorder traversal and postorder traversal of the same binary tree.

---

## Problem Understanding

- **Why Multiple Trees Can Exist:** Preorder and postorder uniquely determine a binary tree only when every internal node has two children (a full binary tree). When a node has just **one** child, `[Root, Child]` in preorder and `[Child, Root]` in postorder look identical whether `Child` is a left child or a right child.
- **Canonical Choice:** Whenever `a < b` (the current subtree has more than `1` node), `preorder[a]` is the root, and `preorder[a + 1]` is the root of its first child subtree. We can always assign `preorder[a + 1]` as the **left** subtree root without loss of generality.
- **Subtree Boundary via Postorder:** In `postorder`, all nodes of a subtree appear contiguously before that subtree's root! Thus, locating `preorder[a + 1]` at index `i` in `postorder[c .. d]` tells us the exact size `m = i - c + 1` of the left subtree.

---

## Approach

### Brute Force Approach

Doing a linear scan through `postorder` inside every recursive call to locate `preorder[a + 1]` takes `O(n)` work per node. For a skewed tree of depth `n`, this degrades total reconstruction time to `O(n^2)`.

### Optimized Approach

Precompute a `HashMap` `pos` mapping each value in `postorder` to its index for `O(1)` lookups, then recursively partition the index ranges `[a, b]` in `preorder` and `[c, d]` in `postorder` using Divide and Conquer.

### Step-by-Step Thinking Process

1. Populate `pos` so `pos.get(val)` returns the index of `val` in `postorder` in `O(1)` time.
2. Define recursive helper `dfs(a, b, c, d)` to construct the subtree corresponding to `preorder[a .. b]` and `postorder[c .. d]`.
3. Handle base cases: if `a > b`, the range is empty (`return null`); create `root = new TreeNode(preorder[a])`, and if `a == b`, it is a leaf (`return root`).
4. For `a < b`, treat `preorder[a + 1]` as the left child's root and look up its postorder index `i = pos.get(preorder[a + 1])`.
5. Compute left subtree node count `m = i - c + 1`, then split both arrays: left gets `dfs(a + 1, a + m, c, i)` and right gets `dfs(a + m + 1, b, i + 1, d - 1)`.

### Algorithm / Intuition

In `constructFromPrePost`, `preorder` and `postorder` partition any subtree of size `b - a + 1` synchronously:
- `preorder[a .. b]` has layout: `[root] + [left subtree (m nodes)] + [right subtree]`.
- `postorder[c .. d]` has layout: `[left subtree (m nodes)] + [right subtree] + [root]`.

When `a < b`, `preorder[a + 1]` is the first node visited after `root`, so it must be the root of the left subtree (or the sole child subtree, which we canonically place on the left). In `postorder`, the left subtree occupies `c .. i` ending at its own root `i = pos.get(preorder[a + 1])`. That gives `m = i - c + 1` nodes for `root.left`, leaving `a + m + 1 .. b` and `i + 1 .. d - 1` for `root.right` (which naturally evaluates to empty `a + m + 1 > b` if there is no right subtree).

---

## Dry Run

Trace on **Example 1**: `preorder = [1, 2, 4, 5, 3, 6, 7]`, `postorder = [4, 5, 2, 6, 7, 3, 1]`

- `pos = {4:0, 5:1, 2:2, 6:3, 7:4, 3:5, 1:6}`

1. **`dfs(0, 6, 0, 6)`:** `root = 1`. Next in preorder is `preorder[1] = 2`, at `i = pos.get(2) = 2`. Left size `m = 2 - 0 + 1 = 3`.
   - **`root.left = dfs(1, 3, 0, 2)`:** `root = 2`. Next is `preorder[2] = 4`, at `i = pos.get(4) = 0`. Left size `m = 0 - 0 + 1 = 1`.
     - `2.left = dfs(2, 2, 0, 0)` -> base case `a == b`, returns leaf `4`.
     - `2.right = dfs(3, 3, 1, 1)` -> base case `a == b`, returns leaf `5`.
   - **`root.right = dfs(4, 6, 3, 5)`:** `root = 3`. Next is `preorder[5] = 6`, at `i = pos.get(6) = 3`. Left size `m = 3 - 3 + 1 = 1`.
     - `3.left = dfs(5, 5, 3, 3)` -> returns leaf `6`.
     - `3.right = dfs(6, 6, 4, 4)` -> returns leaf `7`.
2. **Final Tree:** Level-order `[1, 2, 3, 4, 5, 6, 7]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Building `pos` takes `O(n)` time, and `dfs` creates each of the `n` tree nodes once with `O(1)` index arithmetic and hash map lookup per node.
- **Space Complexity:** `O(n)` — `pos` stores `n` entries, and the recursion call stack reaches depth `O(n)` in the worst case (`O(log n)` for a balanced tree).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [889construct-binary-tree-from-preorder-and-postorder-traversal.java](./889construct-binary-tree-from-preorder-and-postorder-traversal.java) |

---

## Key Learnings

- Unlike Preorder + Inorder or Postorder + Inorder, Preorder + Postorder leaves single-child orientation ambiguous—assuming the child is a left child resolves the ambiguity cleanly.
- Passing index bounds `(a, b, c, d)` instead of slicing subarrays keeps the reconstruction strictly `O(n)` time and `O(n)` space.
- Because all node values are guaranteed distinct, a value-to-index `HashMap` reduces subtree boundary searches from `O(n)` to `O(1)`.
