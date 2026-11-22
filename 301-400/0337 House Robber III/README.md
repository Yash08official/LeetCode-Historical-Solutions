---
comments: true
difficulty: Medium
tags:
  - Dynamic Programming
  - Tree
  - Depth-First Search
  - Binary Tree
  - DP on Trees
---

# 337. House Robber III

**[View Problem on LeetCode](https://leetcode.com/problems/house-robber-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0337` (`337`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Dynamic Programming`, `Tree`, `Depth-First Search`, `Binary Tree`, `DP on Trees` |
| **Solution Language** | Java |

---

## Problem Description

The thief has found himself a new place for his thievery again. There is only one entrance to this area, called `root`.

Besides the `root`, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.

Given the `root` of the binary tree, return *the maximum amount of money the thief can rob **without alerting the police***.

---

## Examples

### Example 1

```text
**Input:** root = [3,2,3,null,3,null,1]
**Output:** 7
**Explanation:** Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
```

### Example 2

```text
**Input:** root = [3,4,5,1,3,null,1]
**Output:** 9
**Explanation:** Maximum amount of money the thief can rob = 4 + 5 = 9.
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[1, 10^4]`.
	
- `0 <= Node.val <= 10^4`

---

## Problem Understanding

- Maximize robbery amount on a binary tree where directly linked parent and child nodes cannot both be robbed.

---

## Approach

### Optimized Approach (Tree DP — Post-Order Pair Return)
1. `dfs(root)` returns a 2-element array `[robRoot, skipRoot]`:
   - `robRoot = root.val + l[1] + r[1]` (must skip both children).
   - `skipRoot = max(l[0], l[1]) + max(r[0], r[1])` (children free to rob or skip).
2. Answer is `Math.max(ans[0], ans[1])`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Visits every node once.\n- **Space Complexity:** $O(h)$ recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [337house-robber-iii.java](./337house-robber-iii.java) |

---

## Key Learnings

- Returning both `(rob, skip)` states from each subtree avoids recomputation and memoization maps.
