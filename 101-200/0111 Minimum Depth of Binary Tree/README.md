---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 111. Minimum Depth of Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-depth-of-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0111` (`111`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree, find and return its **minimum depth**.

The minimum depth is the number of nodes along the shortest path from the `root` node down to the nearest **leaf** node, where a leaf is strictly defined as a node with **neither** a left child nor a right child.

---

## Examples

### Example 1

```text
Input: root = [3,9,20,null,null,15,7]
Output: 2
```

### Example 2

```text
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 10^5]`.

- `-1000 <= Node.val <= 1000`

---

## Problem Understanding

- **Critical Leaf Trap:** If a node has `left == null` and `right != null` (for instance `root = [2, null, 3, ...]`), `root` is **not** a leaf! Taking `1 + Math.min(minDepth(left), minDepth(right))` blindly would evaluate `1 + Math.min(0, ...)` = `1`, falsely stopping at a missing child pointer instead of continuing to an actual leaf.
- When one child is `null`, the path **must** descend into the non-null child.
- Only when **both** `root.left` and `root.right` are non-null can we take `Math.min` of the two subtrees.

---

## Approach

### Brute Force Approach

Enumerating all root-to-leaf paths explicitly into lists and measuring the shortest list takes extra memory and path-copying overhead; alternatively, a naive recursive formula without null-child guards gives wrong answers on one-sided trees.

### Optimized Approach

Use recursive **Depth-First Search (DFS)** with explicit single-child checks (`!root.left` and `!root.right`) so only paths terminating at genuine leaf nodes are considered.

### Step-by-Step Thinking Process

1. Handle the empty tree first: if `!root`, return `0`.
2. If `!root.left`, `root` has no left subtree: either `root.right` is also `null` (making `root` a leaf, so `1 + minDepth(null) = 1`) or `root.right` exists (forcing us down `root.right`). Both cases are handled cleanly by `return 1 + minDepth(root.right)`!
3. If `!root.right` (and `root.left` exists), we must go left: `return 1 + minDepth(root.left)`.
4. Otherwise, both children exist, so return `1 + Math.min(minDepth(root.left), minDepth(root.right))`.

### Algorithm / Intuition

In `minDepth(root)`:
- `if (!root) return 0;` handles an empty input tree (and also serves as the base return when called from a leaf's `!root.left` branch).
- `if (!root.left) return 1 + minDepth(root.right);` neatly unifies two cases:
  1. **Leaf node (`left == null, right == null`):** evaluates `1 + minDepth(null)` = `1 + 0 = 1`.
  2. **Right-only internal node (`left == null, right != null`):** ignores the missing left child and adds `1` to `minDepth(root.right)`.
- `if (!root.right) return 1 + minDepth(root.left);` handles left-only internal nodes.
- Finally, when both subtrees are non-empty, `1 + Math.min(minDepth(root.left), minDepth(root.right))` picks the shallower leaf path.

---

## Dry Run

Tracing Example 1 (`root = [3, 9, 20, null, null, 15, 7]`):

- `minDepth(Node(3))`: both `left` (`9`) and `right` (`20`) exist -> evaluates `1 + Math.min(minDepth(9), minDepth(20))`.
  - `minDepth(Node(9))`: `!root.left` is true (`9.left == null`) -> returns `1 + minDepth(9.right = null)` = `1 + 0 = 1`.
  - `minDepth(Node(20))`: both `15` and `7` exist -> `minDepth(15) = 1`, `minDepth(7) = 1` -> returns `1 + Math.min(1, 1) = 2`.
- `minDepth(Node(3))` returns `1 + Math.min(1, 2) = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Recursive DFS visits every node in the tree once in `O(1)` time per node.
- **Space Complexity:** `O(h)` (worst-case `O(n)` on a skewed chain like Example 2, `O(log n)` on a balanced tree) — Call-stack depth matches the height of the tree.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [111minimum-depth-of-binary-tree.js](./111minimum-depth-of-binary-tree.js) |

---

## Key Learnings

- Always check the exact definition of a **leaf** (`!node.left && !node.right`): in minimum-depth or root-to-leaf path problems, a `null` branch on an internal node is NOT a valid endpoint.
- Writing `if (!root.left) return 1 + minDepth(root.right);` handles both true leaves and right-only nodes in a single clean statement.
- Note on BFS vs DFS: while this recursive DFS visits all `n` nodes, an iterative level-order **BFS** can terminate as soon as it encounters the very first leaf, which is faster when a shallow leaf sits next to a very deep subtree.
