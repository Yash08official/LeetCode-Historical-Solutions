---
comments: true
difficulty: Easy
tags:
  - Tree
  - Binary Search Tree
  - Binary Tree
---

# 700. Search in a Binary Search Tree

**[View Problem on LeetCode](https://leetcode.com/problems/search-in-a-binary-search-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0700` (`700`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` node of a Binary Search Tree (BST) and a target integer `val`, locate the node in the tree whose value equals `val`.

If such a node exists, return that `TreeNode` (which represents the subtree rooted at that node); otherwise, return `null`.

---

## Examples

### Example 1

```text
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
```

### Example 2

```text
Input: root = [4,2,7,1,3], val = 5
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 5000]`.

- `1 <= Node.val <= 10^7`

- `root` is a binary search tree.

- `1 <= val <= 10^7`

---

## Problem Understanding

- In a Binary Search Tree, every node in the left subtree of `root` has a value strictly less than `root.val`, and every node in the right subtree has a value strictly greater than `root.val`.
- Because node values follow the BST ordering invariant, at each node we can immediately discard half of the remaining subtrees instead of exploring both children.
- Returning the matched `TreeNode` reference automatically preserves its entire left and right subtrees.

---

## Approach

### Brute Force Approach

A naive tree search ignores the BST ordering property and performs a general DFS or BFS over both `root.left` and `root.right` for every node. In the worst case (or whenever `val` is absent), this visits all `n` nodes in `O(n)` time even if the tree is perfectly balanced.

### Optimized Approach

Exploit the BST ordering property recursively: return `root` immediately if `root` is `null` or `root.val == val`; otherwise, recurse exclusively into `root.left` when `root.val > val` or into `root.right` when `root.val < val`.

### Step-by-Step Thinking Process

1. Check the base cases first: if `root == null`, the target does not exist along this search path; if `root.val == val`, we have found the target subtree root.
2. Compare `root.val` against `val` using the BST invariant.
3. If `root.val > val`, any node equal to `val` can only reside in `root.left`, so return `searchBST(root.left, val)`.
4. Otherwise (`root.val < val`), any node equal to `val` can only reside in `root.right`, so return `searchBST(root.right, val)`.

### Algorithm / Intuition

The `searchBST` method acts like binary search on a tree structure:
- `if (root == null || root.val == val) return root;` handles both termination conditions concisely in one check.
- The ternary expression `root.val > val ? searchBST(root.left, val) : searchBST(root.right, val)` steps down one level per call along the unique root-to-target path.

---

## Dry Run

Trace on **Example 1**: `root = [4, 2, 7, 1, 3]`, `val = 2`.

1. `searchBST(node(4), 2)`: `root != null` and `4 != 2`. Since `4 > 2`, recurse left -> `searchBST(node(2), 2)`.
2. `searchBST(node(2), 2)`: `root.val == 2` matches `val`! Return `node(2)` (whose children are `1` and `3`, serialized as `[2, 1, 3]`).

Result returned up the call stack: `[2, 1, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(h)` — Where `h` is the height of the BST (`O(log n)` for a balanced BST and `O(n)` in the worst case of a skewed tree).
- **Space Complexity:** `O(h)` — Due to the recursion call stack depth matching the path length from the root (`O(log n)` balanced, `O(n)` worst-case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [700search-in-a-binary-search-tree.java](./700search-in-a-binary-search-tree.java) |

---

## Key Learnings

- The BST invariant reduces subtree search to a single root-to-leaf path rather than a full tree traversal.
- Combining `root == null` and `root.val == val` provides a clean, unified base case for recursive tree searches.
- Tail-recursive BST traversal can also be converted into a `while` loop if `O(1)` auxiliary space is required.
