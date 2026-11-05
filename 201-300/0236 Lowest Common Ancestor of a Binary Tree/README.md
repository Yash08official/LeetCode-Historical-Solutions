---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Tree
  - Binary Lifting
  - Lowest Common Ancestor
---

# 236. Lowest Common Ancestor of a Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0236` (`236`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Tree`, `Binary Lifting`, `Lowest Common Ancestor` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree and references to two distinct nodes `p` and `q` guaranteed to exist in the tree, find and return their **Lowest Common Ancestor (LCA)**.

The lowest common ancestor of `p` and `q` is the deepest node in the tree whose subtree contains both `p` and `q` (where a node is explicitly allowed to be a descendant of itself).

---

## Examples

### Example 1

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
```

### Example 2

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
```

### Example 3

```text
Input: root = [1,2], p = 1, q = 2
Output: 1
```

---

## Constraints

- The number of nodes in the tree is in the range `[2, 10^5]`.

- `-10^9 <= Node.val <= 10^9`

- All `Node.val` are **unique**.

- `p != q`

- `p` and `q` will exist in the tree.

---

## Problem Understanding

Notice that this is a general **Binary Tree**, NOT a Binary Search Tree — node values have no ordering invariant, so we cannot steer left or right by comparing values. However, the constraints give us two very helpful guarantees: all `Node.val` are unique, and **both `p` and `q` definitely exist in the tree**. Consider how `p` and `q` can sit relative to their LCA `u`:
1. **Split case:** `p` is in one subtree of `u` (`u.left` or `u.right`) and `q` is in the other.
2. **Ancestor-descendant case:** `u` itself is `p` (with `q` somewhere inside `p`'s subtree) or `u` itself is `q` (with `p` somewhere inside `q`'s subtree).

---

## Approach

### Brute Force Approach

Run a traversal from `root` to record a `parent` map (`Map<TreeNode, TreeNode>`) or store the full root-to-`p` path list and root-to-`q` path list, then put `p`'s ancestors into a `HashSet` and walk upward from `q` until hitting the first shared ancestor. While `O(n)` in time, building explicit parent maps and ancestor sets allocates `O(n)` hash table storage on top of traversal.

### Optimized Approach

Use a concise single-pass post-order recursive DFS: return `root` immediately if `root == null || root == p || root == q`, recurse on `root.left` and `root.right`, return `root` if both sides return non-null, and otherwise bubble up whichever child returned non-null.

### Step-by-Step Thinking Process

1. Base case: if `root == null`, return `null`; if `root == p || root == q`, return `root` immediately without needing to search deeper beneath it.
2. Recursively query `var left = lowestCommonAncestor(root.left, p, q)` and `var right = lowestCommonAncestor(root.right, p, q)`.
3. If `left != null && right != null`, one target was found in the left subtree and the other in the right subtree, making `root` their exact split point (the LCA) — return `root`.
4. Otherwise, at most one subtree returned a non-null node (either one of `p`/`q`, or an LCA already found deeper down). Bubble it upward via `left == null ? right : left`.

### Algorithm / Intuition

Why is it safe to stop and return `root` immediately when `root == p` without checking whether `q` lies inside `p`'s subtree?
- **Case A (`q` IS inside `p`'s subtree):** Then `p` itself is the LCA of `p` and `q`! Every ancestor above `p` will receive `p` from one side and `null` from its other side, bubbling `p` all the way up to the final return.
- **Case B (`q` is NOT inside `p`'s subtree):** Because `q` is guaranteed to exist somewhere in the tree, `q` will be found in the opposite branch of their true common ancestor higher up, where `left != null && right != null` will fire and return that common ancestor!
*(Note: this early-return shortcut specifically relies on the constraint that both `p` and `q` exist in the tree.)*

---

## Dry Run

Tracing Example 1: `root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]`, `p = node(5)`, `q = node(1)`:

- Call `lowestCommonAncestor(node(3), 5, 1)`:
  - `node(3)` is neither `null`, `5`, nor `1`.
  - **Left call** `lowestCommonAncestor(node(5), 5, 1)`:
    - Hits base case `root == p` (`node(5) == node(5)`) -> immediately returns **`node(5)`**!
  - **Right call** `lowestCommonAncestor(node(1), 5, 1)`:
    - Hits base case `root == q` (`node(1) == node(1)`) -> immediately returns **`node(1)`**!
  - Back at `node(3)`: `left = node(5)` (`!= null`) and `right = node(1)` (`!= null`).
  - Condition `left != null && right != null` is `true` -> returns **`node(3)`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — In the worst case, the DFS visits each of the `n` nodes in the binary tree at most once.
- **Space Complexity:** `O(h)` (up to `O(n)` in the worst case) — Uses `O(h)` call-stack frames where `h` is the tree height (`O(log n)` for a balanced tree, `O(n)` for a skewed chain).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [236lowest-common-ancestor-of-a-binary-tree.java](./236lowest-common-ancestor-of-a-binary-tree.java) |

---

## Key Learnings

- Overloading the recursive return value to carry either a found target (`p`/`q`) or a resolved LCA keeps the post-order LCA implementation remarkably compact.
- Stopping immediately at `root == p || root == q` works because both `p` and `q` are guaranteed to be in the tree; if `p` or `q` could be absent, you would need to traverse full subtrees and count matches (`0`, `1`, or `2`).
- Comparing object references (`root == p`) is `O(1)` and works even if node values were not unique.
