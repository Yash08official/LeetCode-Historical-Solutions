---
comments: true
difficulty: Medium
tags:
  - Array
  - Divide and Conquer
  - Tree
  - Matrix
---

# 427. Construct Quad Tree

**[View Problem on LeetCode](https://leetcode.com/problems/construct-quad-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0427` (`427`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Divide and Conquer`, `Tree`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given a `n * n` matrix `grid` of `0's` and `1's` only. We want to represent `grid` with a Quad-Tree.

Return *the root of the Quad-Tree representing *`grid`.

A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:

	- `val`: True if the node represents a grid of 1's or False if the node represents a grid of 0's. Notice that you can assign the `val` to True or False when `isLeaf` is False, and both are accepted in the answer.

	- `isLeaf`: True if the node is a leaf node on the tree or False if the node has four children.

```
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}
```

We can construct a Quad-Tree from a two-dimensional area using the following steps:

	- If the current grid has the same value (i.e all `1's` or all `0's`) set `isLeaf` True and set `val` to the value of the grid and set the four children to Null and stop.

	- If the current grid has different values, set `isLeaf` to False and set `val` to any value and divide the current grid into four sub-grids as shown in the photo.

	- Recurse for each of the children with the proper sub-grid.

![diagram](https://assets.leetcode.com/uploads/2020/02/11/new_top.png)

If you want to know more about the Quad-Tree, you can refer to the wiki.

**Quad-Tree format:**

You don't need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where `null` signifies a path terminator where no node exists below.

It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list `[isLeaf, val]`.

If the value of `isLeaf` or `val` is True we represent it as **1** in the list `[isLeaf, val]` and if the value of `isLeaf` or `val` is False we represent it as **0**.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2020/02/11/grid1.png)

```
Input: grid = [[0,1],[1,0]]
Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
Explanation: The explanation of this example is shown below:
Notice that 0 represents False and 1 represents True in the photo representing the Quad-Tree.
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2020/02/12/e2mat.png)

```
Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.
The topLeft, bottomLeft and bottomRight each has the same value.
The topRight have different values so we divide it into 4 sub-grids where each has the same value.
Explanation is shown in the photo below:
```

 

**

---

## Constraints

**

	- `n == grid.length == grid[i].length`

	- `n == 2^x` where `0 <= x <= 6`

---

## Problem Understanding

- Given an `n x n` binary matrix (`n` is a power of 2), recursively compress uniform subgrids into leaf `Node`s and split mixed subgrids into four equal quadrants (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`).

---

## Approach

### Optimized Approach (Recursive Divide-and-Conquer DFS)
1. Define `dfs(a, b, c, d, grid)` for the submatrix with top-left `(a, b)` and bottom-right `(c, d)`.
2. Scan the submatrix to detect whether both `0` and `1` appear (`zero`, `one`).
3. If `zero + one == 1`, the region is uniform: return a leaf `Node(val = (one == 1), isLeaf = true)`.
4. Otherwise, split at midpoints `(a + c) / 2` and `(b + d) / 2` and recursively build all four child quadrants.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2 \log n)$ — up to $\log_2 n$ recursion levels, each scanning at most $n^2$ cells in total.
- **Space Complexity:** $O(\log n)$ recursion stack depth (excluding output Quad-Tree nodes).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [427construct-quad-tree.java](./427construct-quad-tree.java) |

---

## Key Learnings

- Top-down divide-and-conquer cleanly maps 2D spatial partitioning to a 4-way recursive tree construction.
