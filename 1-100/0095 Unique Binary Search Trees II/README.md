---
comments: true
difficulty: Medium
tags:
  - Dynamic Programming
  - Backtracking
  - Tree
  - Binary Search Tree
  - Binary Tree
---

# 95. Unique Binary Search Trees II

**[View Problem on LeetCode](https://leetcode.com/problems/unique-binary-search-trees-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0095` (`95`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Dynamic Programming`, `Backtracking`, `Tree`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return *all the structurally unique **BST**'s (binary search trees), which has exactly* `n` *nodes of unique values from* `1` *to* `n`. Return the answer in **any order**.

---

## Examples

### Example 1

```text
Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
```

### Example 2

```text
Input: n = 1
Output: [[1]]
```

---

## Constraints

- `1 <= n <= 8`

---

## Problem Understanding

- Any value $v \in [i, j]$ can act as the root of a valid BST.
- The left subtree must be built from values in $[i, v - 1]$.
- The right subtree must be built from values in $[v + 1, j]$.
- The total trees for root $v$ is the Cartesian product of all valid left subtrees and all valid right subtrees.

---

## Approach

### Optimized Approach (Divide and Conquer / Recursive Tree Construction)

1. Define recursive helper `dfs(i, j)` returning `List<TreeNode>`:
   - If `i > j`, return a list containing `null` (empty subtree).
   - For each root candidate `v` from `i` to `j`:
     - Recursively generate `leftSubtrees = dfs(i, v - 1)`.
     - Recursively generate `rightSubtrees = dfs(v + 1, j)`.
     - For each `l` in `leftSubtrees` and each `r` in `rightSubtrees`:
       - Construct `new TreeNode(v, l, r)` and add to result list.
2. Invoke `dfs(1, n)` and return result.

---

## Dry Run

For `n = 3`:
- Root 1: left `dfs(1, 0)` -> `[null]`, right `dfs(2, 3)` -> 2 trees (`2-3` and `3-2`). Gives 2 trees.
- Root 2: left `dfs(1, 1)` -> `[1]`, right `dfs(3, 3)` -> `[3]`. Gives 1 tree.
- Root 3: left `dfs(1, 2)` -> 2 trees, right `dfs(4, 3)` -> `[null]`. Gives 2 trees.
Total: $2 + 1 + 2 = 5$ unique trees (Catalan number $C_3 = 5$).

---

## Complexity Analysis

- **Time Complexity:** $O(4^n / n^{1/2})$ — Bounded by the $n$-th Catalan number $C_n = \frac{1}{n+1}\binom{2n}{n}$.
- **Space Complexity:** $O(4^n / n^{1/2})$ — To store all structurally unique BST configurations.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [95unique-binary-search-trees-ii.java](./95unique-binary-search-trees-ii.java) |

---

## Key Learnings

- BST properties partition the value range strictly into disjoint left and right continuous intervals.
- The Cartesian combination of recursively constructed subtrees naturally yields all unique tree topologies without duplicate generation.
