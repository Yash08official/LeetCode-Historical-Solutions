---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 872. Leaf-Similar Trees

**[View Problem on LeetCode](https://leetcode.com/problems/leaf-similar-trees/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0872` (`872`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

In a binary tree, reading the values of all **leaf nodes** (nodes with neither a left nor a right child) in strict left-to-right order forms its **leaf value sequence**.

Given the roots `root1` and `root2` of two binary trees, return `true` if and only if both trees produce the exact same leaf value sequence.

---

## Examples

### Example 1

```text
Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true
```

### Example 2

```text
Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false
```

---

## Constraints

- The number of nodes in each tree will be in the range `[1, 200]`.

- Both of the given trees will have values in the range `[0, 200]`.

---

## Problem Understanding

- Two trees can have completely different internal shapes, heights, and internal node values yet still be **leaf-similar** as long as their left-to-right leaf sequences match.
- Any depth-first traversal (pre-order, in-order, or post-order) that recurses on `node.left` before `node.right` visits all leaves in exact left-to-right order!
- Comparing arrays of numbers requires element-by-element equality (in JavaScript, `leaves1 === leaves2` compares object references and would always be `false`, whereas `JSON.stringify` serializes exact element boundaries `[6,7,4,9,8]`).

---

## Approach

### Brute Force Approach

Level-order BFS cannot be used directly to collect leaves because leaves at shallower depths on the right would be visited before deeper leaves on the left! Trying to sort leaves by horizontal coordinate fails on overlapping columns; standard left-first DFS is both the simplest and optimal traversal.

### Optimized Approach

Run a recursive pre-order `dfs` on `root1` and `root2` to collect their left-to-right leaf values into arrays `leaves1` and `leaves2`, then check sequence equality via `JSON.stringify(leaves1) === JSON.stringify(leaves2)`.

### Step-by-Step Thinking Process

1. Create two empty arrays `leaves1 = []` and `leaves2 = []`.
2. Write a helper `dfs(node, leafValues)`: if `node === null`, do nothing; if `node.left === null && node.right === null`, `node` is a leaf, so append `node.val` to `leafValues`.
3. Recurse on `dfs(node.left, leafValues)` first, then `dfs(node.right, leafValues)` so left-subtree leaves always precede right-subtree leaves.
4. Compare the two collected arrays safely using `JSON.stringify(leaves1) === JSON.stringify(leaves2)`.

### Algorithm / Intuition

In `leafSimilar(root1, root2)`:
- `dfs` visits every node in standard root -> left -> right order, recording `node.val` exclusively when both child pointers are `null`.
- Using `JSON.stringify` instead of `leaves1.join('')` avoids delimiter-collision bugs (for instance, `[1, 23]` vs `[12, 3]` both join without delimiters to `"123"`, whereas `JSON.stringify` produces `"[1,23]"` vs `"[12,3]"`).

---

## Dry Run

Trace on **Example 1**:
- `root1 = [3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]`:
  - `dfs(root1, leaves1)` visits `3 -> 5 -> 6` (leaf: push `6`) `-> 2 -> 7` (leaf: push `7`) `-> 4` (leaf: push `4`) `-> 1 -> 9` (leaf: push `9`) `-> 8` (leaf: push `8`).
  - `leaves1 = [6, 7, 4, 9, 8]`.
- `root2 = [3, 5, 1, 6, 7, 4, 2, null, null, null, null, null, null, 9, 8]`:
  - `dfs(root2, leaves2)` visits `3 -> 5 -> 6` (leaf: push `6`) `-> 7` (leaf: push `7`) `-> 1 -> 4` (leaf: push `4`) `-> 2 -> 9` (leaf: push `9`) `-> 8` (leaf: push `8`).
  - `leaves2 = [6, 7, 4, 9, 8]`.
- `JSON.stringify(leaves1) === JSON.stringify(leaves2)` compares `"[6,7,4,9,8]" === "[6,7,4,9,8]"` -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n1 + n2)` — Where `n1` and `n2` are the node counts of the two trees; every node is visited once and `JSON.stringify` runs in time proportional to the leaf count.
- **Space Complexity:** `O(n1 + n2)` — Stores up to `(n1 + 1) / 2` and `(n2 + 1) / 2` leaf values plus `O(h1 + h2)` recursion stack frames.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [872leaf-similar-trees.js](./872leaf-similar-trees.js) |

---

## Key Learnings

- Pre-order, in-order, and post-order DFS all visit binary tree leaves in the exact same left-to-right relative order; BFS does **not**.
- When serializing numeric arrays for equality checks in JavaScript, always include delimiters (`JSON.stringify` or `.join(',')`) so multi-digit numbers cannot collide.
