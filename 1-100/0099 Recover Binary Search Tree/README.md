---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Search Tree
  - Binary Tree
---

# 99. Recover Binary Search Tree

**[View Problem on LeetCode](https://leetcode.com/problems/recover-binary-search-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0099` (`99`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given the `root` of a binary search tree (BST), where the values of **exactly two** nodes of the tree were swapped by mistake. *Recover the tree without changing its structure*.

---

## Examples

### Example 1

```text
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
```

### Example 2

```text
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.
```

---

## Constraints

- The number of nodes in the tree is in the range `[2, 1000]`.
- `-2^31 <= Node.val <= 2^31 - 1`
---

## Follow-up

A solution using $O(n)$ space is pretty straight-forward. Could you devise a constant $O(1)$ space solution?

---

## Problem Understanding

- In an in-order traversal of a BST, elements should be strictly increasing.
- When two nodes are swapped, there will be either 1 or 2 inversions where `prev.val > root.val`:
  - If 2 inversions: `first` is `prev` from the first inversion, `second` is `root` from the second inversion.
  - If 1 inversion (adjacent nodes swapped): `first` is `prev` and `second` is `root` from that single inversion.
- Swapping the values of `first` and `second` restores the BST.

---

## Approach

### Optimized Approach (In-Order Traversal Inversion Detection)

1. Maintain pointer fields `prev = null`, `first = null`, `second = null`.
2. Define recursive `dfs(root)` for in-order traversal:
   - If `root == null`, return.
   - `dfs(root.left)`.
   - If `prev != null && prev.val > root.val`:
     - If `first == null`: record `first = prev` (the larger anomalous value).
     - Always update `second = root` (the smaller anomalous value).
   - `prev = root`.
   - `dfs(root.right)`.
3. After traversal completes, swap the values `first.val` and `second.val`.
4. Tree structure is fully preserved.

---

## Dry Run

Consider in-order sequence `[1, 3, 2, 4]` where 3 and 2 were swapped:
- Traverse 1: `prev = 1`.
- Traverse 3: `1 < 3`, `prev = 3`.
- Traverse 2: `3 > 2` (inversion!):
  - `first == null` -> `first = 3`.
  - `second = 2`.
  - `prev = 2`.
- Traverse 4: `2 < 4`, `prev = 4`.
- Swap `first.val` (3) and `second.val` (2): sequence becomes `[1, 2, 3, 4]` (valid!).

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single full in-order traversal visiting all $N$ nodes.
- **Space Complexity:** $O(H)$ — Recursion stack bounded by tree height $H$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [99recover-binary-search-tree.java](./99recover-binary-search-tree.java) |

---

## Key Learnings

- Swapping two elements in a sorted sequence creates at most two points of descent.
- The first misplaced node is always the larger predecessor in the first descent; the second misplaced node is always the successor in the last descent.
