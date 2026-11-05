---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 104. Maximum Depth of Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0104` (`104`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree, find and return its **maximum depth**.

The maximum depth is defined as the total number of nodes along the longest downward path starting at the `root` node and ending at the farthest leaf node (an empty tree has depth `0`).

---

## Examples

### Example 1

```text
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

### Example 2

```text
Input: root = [1,null,2]
Output: 2
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.

- `-100 <= Node.val <= 100`

---

## Problem Understanding

- Depth here counts **nodes** (not edges): a single-node tree `[1]` has depth `1`, and an empty tree `[]` has depth `0`.
- Recursive tree structure: the longest root-to-leaf path in any non-empty tree consists of `root` itself (`1` node) followed by the longest path inside either `root.left` or `root.right`.
- With up to `10^4` nodes, we want a linear-time `O(n)` traversal.

---

## Approach

### Brute Force Approach

Generating and storing every explicit root-to-leaf path as an array of nodes and then scanning all paths to find the longest array wastes `O(n^2)` time and memory on skewed or dense trees, when only the integer height of each subtree is needed.

### Optimized Approach

Use concise post-order **Depth-First Search (DFS)** recursion: return `0` for `null` nodes, and `1 + Math.max(maxDepth(root.left), maxDepth(root.right))` for non-null nodes.

### Step-by-Step Thinking Process

1. Identify the base case: if `root` is `null` (`!root`), there are `0` nodes on the path, so return `0`.
2. Recursively compute `l = maxDepth(root.left)`, the maximum depth of the left subtree.
3. Recursively compute `r = maxDepth(root.right)`, the maximum depth of the right subtree.
4. Combine the results by adding `1` for the current `root` node to `Math.max(l, r)`.

### Algorithm / Intuition

In `maxDepth(root)`, the function naturally mirrors the inductive definition of binary tree height:
- `if (!root) return 0;` stops recursion at empty child pointers.
- `const l = maxDepth(root.left);` and `const r = maxDepth(root.right);` evaluate both subtrees bottom-up.
- `return 1 + Math.max(l, r);` bubbles the deeper subtree's node count up to the parent plus `1` for `root`.

For any leaf node (`left == null` and `right == null`), both `l` and `r` return `0`, yielding `1 + Math.max(0, 0) = 1` as required.

---

## Dry Run

Tracing Example 1 with `root = [3, 9, 20, null, null, 15, 7]`:

- `maxDepth(Node(9))`: `l = maxDepth(null) = 0`, `r = maxDepth(null) = 0` -> returns `1 + max(0, 0) = 1`.
- `maxDepth(Node(15))`: leaf -> returns `1`.
- `maxDepth(Node(7))`: leaf -> returns `1`.
- `maxDepth(Node(20))`: `l = maxDepth(15) = 1`, `r = maxDepth(7) = 1` -> returns `1 + max(1, 1) = 2`.
- `maxDepth(Node(3))`: `l = maxDepth(9) = 1`, `r = maxDepth(20) = 2` -> returns `1 + max(1, 2) = 3`.

Final output: `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node in the binary tree is visited once, performing `O(1)` work per call.
- **Space Complexity:** `O(h)` (worst-case `O(n)` for a skewed chain, `O(log n)` for a balanced tree) — Determined by the maximum depth of the recursion call stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [104maximum-depth-of-binary-tree.js](./104maximum-depth-of-binary-tree.js) |

---

## Key Learnings

- Post-order DFS (`left`, `right`, then combine at `root`) is the cleanest pattern whenever a tree property can be expressed directly in terms of its left and right subtrees.
- Be careful to distinguish node-count depth (`null -> 0`, leaf `-> 1`) from edge-count height (`null -> -1`, leaf `-> 0`).
- Unlike Minimum Depth (Problem 111), `Math.max(l, r)` works unconditionally even on single-child nodes because a missing child returns `0`, which never beats a non-empty sibling (`>= 1`).
