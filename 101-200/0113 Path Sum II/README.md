---
comments: true
difficulty: Medium
tags:
  - Backtracking
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 113. Path Sum II

**[View Problem on LeetCode](https://leetcode.com/problems/path-sum-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0113` (`113`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Backtracking`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree and an integer `targetSum`, return *all **root-to-leaf** paths where the sum of the node values in the path equals* `targetSum`. Each path should be returned as a list of the node values, not node references.

A **leaf** is a node with no children.

---

## Examples

### Example 1

```text
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22
```

### Example 2

```text
Input: root = [1,2,3], targetSum = 5
Output: []
```

### Example 3

```text
Input: root = [1,2], targetSum = 0
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

---

## Problem Understanding

- We must collect all paths from root to leaf that sum to `targetSum`.
- Unlike Path Sum I (which returns boolean), here we collect full lists of values for each qualifying path.

---

## Approach

### Optimized Approach (Backtracking DFS)

1. Maintain global / scoped array `ans` and current path buffer `t`.
2. Define recursive helper `dfs(root, s)`:
   - If `!root`, return.
   - Decrement `s -= root.val` and push `root.val` into `t`.
   - If `!root.left && !root.right && s === 0` (valid leaf reached):
     - Append a shallow copy `[...t]` to `ans`.
   - Recurse into left child: `dfs(root.left, s)`.
   - Recurse into right child: `dfs(root.right, s)`.
   - Backtrack: `t.pop()`.
3. Call `dfs(root, targetSum)` and return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N^2)$ — In a skewed tree where every leaf matches the target sum, copying path $t$ of length $O(N)$ takes $O(N)$ time per leaf ($O(N^2)$ worst case). In a balanced tree, time is $O(N \log N)$.
- **Space Complexity:** $O(H)$ — Backtracking buffer $t$ and recursion stack consume $O(H)$ space (excluding output space).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [113path-sum-ii.js](./113path-sum-ii.js) |

---

## Key Learnings

- Backtracking using a single shared path array `t` (pushing before recursing and popping afterwards) minimizes object allocation compared to creating new arrays at every call.
