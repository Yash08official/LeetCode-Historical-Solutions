---
comments: true
difficulty: Easy
tags:
  - Stack
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 144. Binary Tree Preorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0144` (`144`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Stack`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` node of a binary tree, return an array containing its node values visited in **preorder traversal** order.

In a **preorder** traversal, for every subtree you visit:
1. The **current root** node first,
2. The entire **left** subtree second,
3. The entire **right** subtree third.

---

## Examples

### Example 1

**Input:** `root = [1,null,2,3]`

**Output:** `[1,2,3]`

**Explanation:**

### Example 2

**Input:** `root = [1,2,3,4,5,null,8,null,null,6,7,9]`

**Output:** `[1,2,4,5,6,7,3,8,9]`

**Explanation:**

### Example 3

**Input:** `root = []`

**Output:** `[]`

### Example 4

**Input:** `root = [1]`

**Output:** `[1]`

---

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.

- `-100 <= Node.val <= 100`

---

## Follow-up Questions

Recursive solution is trivial, could you do it iteratively?

The provided JavaScript solution directly implements the **iterative follow-up** using an explicit stack `stk` rather than system call-stack recursion.

---

## Problem Understanding

- **Root-Left-Right Ordering:** Every node's value is recorded immediately upon reaching it, before descending into either of its children.
- **Empty Tree Edge Case:** The tree can have `0` nodes (`root === null`), in which case we must return an empty array `[]`.
- **LIFO Stack Reversal:** When simulating recursion iteratively with a Last-In-First-Out (LIFO) stack, children must be pushed in **reverse** order (`right` first, then `left`) so that `left` sits on top and gets popped next.

---

## Approach

### Brute Force Approach

There is no slower asymptotic "brute force" since every node must be visited at least once (`Omega(n)`), though a naive recursive implementation that creates new arrays and concatenates `[root.val, ...preorder(root.left), ...preorder(root.right)]` at every node incurs `O(n^2)` array-copy overhead in skewed trees.

### Optimized Approach

Perform an **Iterative Depth-First Search** using an explicit array stack `stk`. Pop the top node, append `node.val` to `ans`, push `node.right` (if non-null), and then push `node.left` (if non-null).

### Step-by-Step Thinking Process

1. Handle the empty tree upfront: if `root === null`, return `[]`.
2. Initialize `ans = []` for the output values and `stk = [root]` as our explicit call stack.
3. While `stk` is non-empty, pop `node = stk.pop()` and immediately record `ans.push(node.val)`.
4. Because `stk` is LIFO and preorder requires visiting `node.left` before `node.right`, push `node.right` onto `stk` first and `node.left` second (only pushing non-null children).
5. Once `stk` becomes empty, all reachable nodes have been processed in exact Root -> Left -> Right order.

### Algorithm / Intuition

In `preorderTraversal(root)`, `stk` explicitly mirrors the pending subtrees waiting to be explored. Because preorder visits the root *before* its subtrees, a node's work is finished the moment it is popped: we push `node.val` to `ans` and never need to revisit `node` again. Pushing `node.right` before `node.left` guarantees that the entire left subtree (which will push and pop its own descendants on top of `node.right`) completely finishes before `node.right` is ever popped.

---

## Dry Run

Trace on **Example 1**: `root = [1, null, 2, 3]` (`node(1).right = node(2)`, `node(2).left = node(3)`)

| Step | Popped `node` | `ans` | Pushed Right | Pushed Left | `stk` (bottom -> top) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Init | — | `[]` | — | — | `[1]` |
| 1 | `1` | `[1]` | `2` | — | `[2]` |
| 2 | `2` | `[1, 2]` | — | `3` | `[3]` |
| 3 | `3` | `[1, 2, 3]` | — | — | `[]` |

Loop terminates and returns `[1, 2, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node in the `n`-node binary tree is pushed onto `stk` once and popped once in `O(1)` time.
- **Space Complexity:** `O(h)` auxiliary space (`O(n)` worst-case) — `stk` holds at most `O(h)` right-child siblings along the active root-to-leaf path, where `h` is the tree height (`O(log n)` balanced, `O(n)` skewed), excluding the `O(n)` output array `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [144binary-tree-preorder-traversal.js](./144binary-tree-preorder-traversal.js) |

---

## Key Learnings

- Preorder is the cleanest traversal to convert from recursion to an explicit stack because the parent node's value is emitted immediately on pop.
- Whenever using a LIFO stack to process items in order `A` then `B`, always push `B` first and `A` second.
- Filtering `null` children before pushing keeps stack memory tight and avoids extra null-check iterations.
