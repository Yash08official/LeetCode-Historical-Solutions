---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 513. Find Bottom Left Tree Value

**[View Problem on LeetCode](https://leetcode.com/problems/find-bottom-left-tree-value/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0513` (`513`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given the `root` of a binary tree.

Return the **leftmost** value in the **last** row of the tree.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2020/12/14/tree1.jpg)

```
Input: root = [2,1,3]
Output: 1
Explanation: The last row is [1,3], so the leftmost value is 1.
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2020/12/14/tree2.jpg)

```
Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7
Explanation: The last row contains only the node 7.
```

 

**

---

## Constraints

**

	- The number of nodes in the tree is in the range `[1, 10^4]`.

	- `-2^31 <= Node.val <= 2^31 - 1`

---

## Problem Understanding

- Return the value of the leftmost node in the deepest row of a binary tree.

---

## Approach

### Optimized Approach (Postorder Depth-Tracking DFS)
1. Traverse the tree in `left -> right -> root` order via `dfs(root, curr)` starting at depth `curr = 1`, tracking the maximum depth seen `mx` and corresponding value `ans`.
2. Because the left subtree at any depth is visited strictly before the right subtree, the **first** node visited at a strictly greater depth (`mx < curr`) is guaranteed to be the leftmost node at that depth.
3. Update `mx = curr` and `ans = root.val` only on strict inequality `mx < curr`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — visits every node once.
- **Space Complexity:** $O(H)$ recursion stack depth, where $H$ is the tree height ($O(N)$ worst case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [513find-bottom-left-tree-value.java](./513find-bottom-left-tree-value.java) |

---

## Key Learnings

- Updating `ans` only when `curr > mx` guarantees left-to-right precedence at every depth level without needing a BFS queue.
