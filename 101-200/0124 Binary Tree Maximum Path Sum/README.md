---
comments: true
difficulty: Hard
tags:
  - Dynamic Programming
  - Tree
  - Depth-First Search
  - Binary Tree
  - DP on Trees
---

# 124. Binary Tree Maximum Path Sum

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0124` (`124`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Dynamic Programming`, `Tree`, `Depth-First Search`, `Binary Tree`, `DP on Trees` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a non-empty binary tree, return the **maximum path sum** of any **non-empty** path in the tree.

A path is any connected sequence of distinct nodes linked by parent-child edges — it does **not** have to pass through `root` or reach a leaf, and it may consist of even a single node.

---

## Examples

### Example 1

```text
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
```

### Example 2

```text
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 3 * 10^4]`.

- `-1000 <= Node.val <= 1000`

---

## Problem Understanding

- Every simple path in a tree has a unique **highest node** (lowest common ancestor of its endpoints), where the path goes up from some node in the left subtree, crosses that highest node, and goes down into the right subtree.
- **Crucial Distinction:**
  1. When treating `node` as the **highest arch point** of a candidate path, we can include **both** its best left downward chain and its best right downward chain: `left + right + node.val`.
  2. When **returning** upward to `node`'s parent, a valid simple path cannot fork in two directions, so we may return **at most one** downward branch: `Math.max(left, right) + node.val`.
- All node values can be negative (`-1000 <= Node.val <= 1000`), so negative child branch contributions should be clamped to `0` (`Math.max(0, dfs(...))`), while `ans` must start below `-1000` (`-1001`) because the path itself must contain at least one node!

---

## Approach

### Brute Force Approach

Finding the unique path between every pair of nodes `(u, v)` in the tree (or running DFS starting from every node as source) checks `O(n^2)` node pairs, taking `O(n^2)` time — too slow for `n = 3 * 10^4`.

### Optimized Approach

Run a single post-order **Tree DP / DFS** traversal that clamps negative child gains to `0`, updates a global `ans` with `left + right + root.val` at every node, and returns `Math.max(left, right) + root.val` to the caller.

### Step-by-Step Thinking Process

1. Initialize `let ans = -1001` (strictly less than the minimum possible single-node value `-1000`).
2. Define `dfs(root)` to return the maximum sum of a downward chain starting at `root` (or `0` if `!root`).
3. Compute `left = Math.max(0, dfs(root.left))` and `right = Math.max(0, dfs(root.right))` — if a child subtree yields a negative sum, dropping it (`0`) strictly improves any path touching `root`.
4. Update the global best path sum considering `root` as the turning point: `ans = Math.max(ans, left + right + root.val)`.
5. Return the best single-branch extension `Math.max(left, right) + root.val` to `root`'s parent.

### Algorithm / Intuition

In `maxPathSum(root)`, `dfs` performs two jobs simultaneously at each node:
1. **Global Arch Check:** `ans = Math.max(ans, left + right + root.val)` tests the best path whose peak is `root`. Because `left` and `right` were clamped with `Math.max(0, ...)`, this single formula automatically covers 4 cases: `root` alone (`0 + 0 + val`), `root + left`, `root + right`, and `left + root + right`!
2. **Upward Single-Chain Return:** `return Math.max(left, right) + root.val` hands the parent the best non-branching chain starting at `root` (and if that return value is negative, the parent's `Math.max(0, ...)` will safely ignore it).

Even if every node in the tree is `-1000`, `left` and `right` clamp to `0` and `ans` updates to `-1000 > -1001`, respecting the non-empty path rule.

---

## Dry Run

Tracing Example 1 (`root = [1, 2, 3]`):

- **Initial:** `ans = -1001`
- **`dfs(Node(2))`:**
  - `left = max(0, 0) = 0`, `right = max(0, 0) = 0`
  - `ans = max(-1001, 0 + 0 + 2) = 2`
  - returns `max(0, 0) + 2 = 2`
- **`dfs(Node(3))`:**
  - `left = 0`, `right = 0`
  - `ans = max(2, 0 + 0 + 3) = 3`
  - returns `max(0, 0) + 3 = 3`
- **`dfs(Node(1))`:**
  - `left = max(0, 2) = 2`, `right = max(0, 3) = 3`
  - `ans = max(3, 2 + 3 + 1) = 6`
  - returns `max(2, 3) + 1 = 4`

`maxPathSum` returns `ans = 6`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Post-order DFS visits each of the `n` nodes in the binary tree once with `O(1)` arithmetic per node.
- **Space Complexity:** `O(h)` (worst-case `O(n)` for a skewed tree, `O(log n)` for a balanced tree) — Recursion stack depth equals tree height `h`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [124binary-tree-maximum-path-sum.js](./124binary-tree-maximum-path-sum.js) |

---

## Key Learnings

- Separating **what a node contributes to the global answer** (`left + right + val`, allowing a V-turn) from **what a node returns to its parent** (`max(left, right) + val`, no V-turn) is the core pattern of Tree DP (e.g., Diameter of Binary Tree, Longest Univalue Path).
- Clamping child gains via `Math.max(0, dfs(child))` collapses four conditional cases into one clean expression.
- Never initialize `ans = 0` when negative values are allowed and paths must be non-empty — use `-Infinity` or a bound below the minimum node value (`-1001`).
