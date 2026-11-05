---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 1448. Count Good Nodes in Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1448` (`1448`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a binary tree `root`, a node `X` in the tree is defined as good if in the path from the root to `X` there are no nodes with a value greater than `X` (that is, the value of node `X` is greater than or equal to every node value on the path from `root` to `X`).

Return the total number of good nodes in the binary tree.

---

## Examples

### Example 1

```text
Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: Nodes in blue are good.
Root Node (3) is always a good node.
Node 4 -> (3,4) is the maximum value in the path starting from the root.
Node 5 -> (3,4,5) is the maximum value in the path
Node 3 -> (3,1,3) is the maximum value in the path.
```

### Example 2

```text
Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.
```

### Example 3

```text
Input: root = [1]
Output: 1
Explanation: Root is considered as good.
```

---

## Constraints

- The number of nodes in the binary tree is in the range `[1, 10^5]`.

- Each node's value is between `[-10^4, 10^4]`.

---

## Problem Understanding

Key observations:
- The root node is always good because its path consists only of itself.
- For any node `X`, we only need to know the maximum node value encountered along the ancestral path from the root down to `X`.
- If `X.val >= max_ancestor`, then `X` is a good node, and the maximum value passed to its subtrees becomes `X.val`.
- If `X.val < max_ancestor`, `X` is not good, and the maximum value passed to its subtrees remains `max_ancestor`.
- Node values can be negative (down to `-10^4`), so the initial maximum must be set to a value smaller than or equal to `-10^4`.

---

## Approach

### Brute Force Approach

For each node, trace back up to the root (e.g., storing parent pointers or maintaining explicit path lists) and verify that no ancestor has a value strictly greater than the node's value. For a tree of height `h`, this takes `O(n * h)` time (up to `O(n^2)` in skewed trees) and requires significant additional memory.

### Optimized Approach

Depth-First Search (DFS) pre-order traversal. Pass down the running maximum value `mx` along the path from the root. At each node, if `mx <= node.val`, increment the good nodes counter `ans` and update `mx = node.val`. Then recursively visit the left and right children with the updated `mx`.

### Step-by-Step Thinking Process

1. Recognize that a node's eligibility depends only on the maximum value on the path from the root.
2. Use recursion (DFS) carrying an argument `mx` representing the current path's maximum.
3. Initialize `mx` to `-100000`, which is strictly smaller than the minimum possible node value (`-10^4`).
4. At each non-null node, compare `node.val` with `mx`. If `mx <= node.val`, increment `ans` and set `mx = node.val`.
5. Recursively invoke `dfs(node.left, mx)` and `dfs(node.right, mx)`.

### Algorithm / Intuition

The JavaScript function `goodNodes(root)` declares `let ans = 0` and defines an inner recursive function `dfs(node, mx)`:
- If `!node`, return.
- If `mx <= node.val`, increment `ans++` and update `mx = node.val`.
- Recurse on `node.left` and `node.right` passing `mx`.
- Start the traversal with `dfs(root, -100000)` and return `ans`.

---

## Dry Run

Walkthrough on Example 1: `root = [3, 1, 4, 3, null, 1, 5]`.
- `dfs(Node(3), -100000)`:
  - `-100000 <= 3` is `true` -> `ans = 1`, `mx = 3`.
  - Recurse left: `dfs(Node(1), 3)`:
    - `3 <= 1` is `false` -> `ans = 1`, `mx = 3`.
    - Recurse left: `dfs(Node(3), 3)`:
      - `3 <= 3` is `true` -> `ans = 2`, `mx = 3`.
      - Children null, return.
    - Right child null, return.
  - Recurse right: `dfs(Node(4), 3)`:
    - `3 <= 4` is `true` -> `ans = 3`, `mx = 4`.
    - Recurse left: `dfs(Node(1), 4)`:
      - `4 <= 1` is `false`. Children null, return.
    - Recurse right: `dfs(Node(5), 4)`:
      - `4 <= 5` is `true` -> `ans = 4`, `mx = 5`.
      - Children null, return.
- Return `ans = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node in the binary tree is visited exactly once during DFS traversal.
- **Space Complexity:** `O(h)` — The recursion call stack uses memory proportional to the tree height `h`. In the worst case of a skewed tree, `h = O(n)`; in a balanced tree, `h = O(log n)`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1448count-good-nodes-in-binary-tree.js](./1448count-good-nodes-in-binary-tree.js) |

---

## Key Learnings

- Passing path statistics (such as the running maximum) down the call stack is more efficient than storing and checking full paths.
- Local updates to parameter `mx` in the stack frame automatically backtrack when returning from subtrees.
