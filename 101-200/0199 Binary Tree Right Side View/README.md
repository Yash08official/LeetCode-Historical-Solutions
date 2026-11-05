---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 199. Binary Tree Right Side View

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-right-side-view/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0199` (`199`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, imagine standing to the right of the tree and looking horizontally toward it from top to bottom. Return a list of the node values visible from the right side, ordered from the root's level down to the deepest level.

---

## Examples

### Example 1

**Input:** `root = [1,2,3,null,5,null,4]`

**Output:** `[1,3,4]`

**Explanation:**

### Example 2

**Input:** `root = [1,2,3,4,null,null,null,5]`

**Output:** `[1,3,4,5]`

**Explanation:**

### Example 3

**Input:** `root = [1,null,3]`

**Output:** `[1,3]`

### Example 4

**Input:** `root = []`

**Output:** `[]`

---

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.

- `-100 <= Node.val <= 100`

---

## Problem Understanding

At any depth `d`, multiple nodes might exist, and a rightmost node might actually belong to the **left** subtree if the right subtree is shorter (as in Example 2). Therefore, simply walking `root = root.right` fails whenever a right branch terminates early. What we actually need is the **last (rightmost) node present on each depth level** of the tree.

---

## Approach

### Brute Force Approach

A naive approach could traverse the entire tree, record `(depth, horizontal_order, val)` for every node into a list or map of lists grouped by depth, and then iterate through all depth buckets afterward to extract the last element of each list. While `O(n)` in time, storing full per-level lists wastes memory when we only care about the final node of each level.

### Optimized Approach

Perform a level-by-level Breadth-First Search (BFS) using a `Queue<TreeNode>`, pushing left children before right children, and record the value of the last node (`i == levelSize - 1`) popped in each level.

### Step-by-Step Thinking Process

1. Handle the empty-tree edge case immediately: if `root == null`, return an empty `ArrayList`.
2. Use a FIFO `Queue<TreeNode>` initialized with `root` so nodes are processed strictly level by level from top to bottom.
3. At the start of each `while` iteration, snapshot `int levelSize = queue.size()`, which equals the exact number of nodes on the current depth.
4. Enqueue `node.left` followed by `node.right` for every node in the level so each subsequent level stays ordered from left to right.
5. When `i == levelSize - 1`, `node` is the rightmost node at this depth, so append `node.val` to `result`.

### Algorithm / Intuition

In `rightSideView`, `queue` holds all nodes of the current depth in left-to-right order. Capturing `levelSize = queue.size()` before the `for` loop separates the current level from the children being enqueued for the next level. Inside the loop (`i = 0` to `levelSize - 1`), `queue.poll()` removes nodes from left to right; the final iteration `i == levelSize - 1` is guaranteed to hold the rightmost node on that level regardless of whether it came from a left or right branch.

---

## Dry Run

Tracing Example 1: `root = [1, 2, 3, null, 5, null, 4]`

| Level | Initial `queue` (front -> back) | `levelSize` | Popped Nodes (`i = 0 .. levelSize-1`) | Added at `i == levelSize - 1` | Enqueued Next Level |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `[1]` | `1` | `i=0`: `1` | `1` | `2`, `3` |
| `1` | `[2, 3]` | `2` | `i=0`: `2`, `i=1`: `3` | `3` | `5` (from `2`), `4` (from `3`) |
| `2` | `[5, 4]` | `2` | `i=0`: `5`, `i=1`: `4` | `4` | *(none)* |

`queue` becomes empty and `result` returns `[1, 3, 4]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node in the binary tree is enqueued once and dequeued once in `O(1)` time.
- **Space Complexity:** `O(w)` (up to `O(n)` in the worst case) — The BFS `queue` holds at most one full level of width `w`, which can be `(n + 1) / 2` in a complete binary tree.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [199binary-tree-right-side-view.java](./199binary-tree-right-side-view.java) |

---

## Key Learnings

- Snapshotting `int levelSize = queue.size()` before iterating is the standard BFS idiom for isolating level boundaries without storing explicit `(node, depth)` pairs.
- Enqueuing `left` before `right` ensures `i == levelSize - 1` is the rightmost node; reversing that order (`right` before `left`) makes `i == 0` the rightmost node.
- An alternative DFS approach visits `node.right` before `node.left` and adds `node.val` the first time `depth == result.size()`, trading `O(w)` queue space for `O(h)` call-stack space.
