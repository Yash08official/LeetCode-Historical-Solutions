---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 2641. Cousins in Binary Tree II

**[View Problem on LeetCode](https://leetcode.com/problems/cousins-in-binary-tree-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2641` (`2641`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree, replace the value of each node with the **sum of all its cousins' values**.

Two nodes in a binary tree are defined as **cousins** if they are at the exact same depth level in the tree but have **different parents**.

Return the `root` of the modified tree. The depth of the root node is 0.

---

## Examples

### Example 1

```text
Input: root = [5,4,9,1,10,null,7]
Output: [0,0,0,7,7,null,11]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 5 does not have any cousins so its sum is 0.
- Node with value 4 does not have any cousins so its sum is 0.
- Node with value 9 does not have any cousins so its sum is 0.
- Node with value 1 has a cousin with value 7 so its sum is 7.
- Node with value 10 has a cousin with value 7 so its sum is 7.
- Node with value 7 has cousins with values 1 and 10 so its sum is 11.
```

### Example 2

```text
Input: root = [3,1,2]
Output: [0,0,0]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 3 does not have any cousins so its sum is 0.
- Node with value 1 does not have any cousins so its sum is 0.
- Node with value 2 does not have any cousins so its sum is 0.
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 10^5]`.

- `1 <= Node.val <= 10^4`

---

## Problem Understanding

Let `depth(u)` be the depth of node `u`.

Observations and mathematical relationship:
- At depth 0, the root node has no cousins because there are no other nodes at depth 0. Its value must become `0`.
- At depth 1, all nodes are direct children of the root (same parent), so none of them have cousins. Their values must become `0`.
- For any depth `d >= 2`, all nodes at depth `d` are either siblings (sharing the same parent) or cousins (having different parents).
- Therefore, for any child node `c` of parent `p`, the sum of all cousins of `c` is:
  `sum_cousins(c) = (total sum of all nodes at depth d) - (sum of all children of p)`.
- Notice that siblings share the exact same cousin sum!

---

## Approach

### Brute Force Approach

A naive approach would perform a breadth-first search (BFS) level by level. For each node, it would traverse all other nodes at the same level, check whether their parent pointer differs, and sum their values.

For a tree level with `k` nodes, comparing every node against all other nodes would take `O(k^2)` time per level, leading to `O(n^2)` worst-case time for wide trees.

### Optimized Approach

The optimal approach uses a two-pass Depth First Search (DFS):

1. **First DFS (`dfs1`):** Traverses the tree to compute `sums[depth]`, which accumulates the total sum of node values at each depth level.
2. **Second DFS (`dfs2`):** Traverses the tree from parent to children. For a parent `node`, it computes `childrenSum = (node.left?.val || 0) + (node.right?.val || 0)`. Then for each existing child, sets `child.val = sums[depth + 1] - childrenSum`.
3. The root's value is set to `0` before starting `dfs2`.

### Step-by-Step Thinking Process

1. Cousins are nodes at the same depth with different parents.
2. Total level sum = (sum of current node's siblings) + (sum of current node's cousins).
3. Therefore: `cousin_sum = level_sum - sibling_group_sum`.
4. We can find `level_sum` for all depths in a first pass: `dfs1(node, depth)` adds `node.val` to `sums[depth]`.
5. In a second pass `dfs2(node, depth)`, a parent node looks at its direct children. The sum of its children is `childrenSum = leftVal + rightVal`.
6. Both `node.left` and `node.right` will have their new value equal to `sums[depth + 1] - childrenSum`.
7. The root node itself has no cousins, so `root.val = 0`.
8. Both passes take linear time `O(n)`.

### Algorithm / Intuition

The solution operates in two clean recursive passes:

1. `sums` array: An array where `sums[d]` stores the sum of all node values at depth `d`.
2. `dfs1(node, depth)`: If `sums.length <= depth`, pushes `0`. Adds `node.val` to `sums[depth]`, then recursively visits `node.left` and `node.right` at `depth + 1`.
3. After `dfs1`, `root.val` is set to `0` because the root has no cousins.
4. `dfs2(node, depth)`: Inspects `node` as a parent. Calculates `childrenSum = leftValue + rightValue`. For each child that exists, assigns `child.val = sums[depth + 1] - childrenSum`, then recursively calls `dfs2(child, depth + 1)`.
5. Returns the updated `root`.

---

## Dry Run

Trace for `root = [5, 4, 9, 1, 10, null, 7]`:

- **Pass 1 (`dfs1`):**
  - Depth 0: node `5` -> `sums[0] = 5`.
  - Depth 1: nodes `4`, `9` -> `sums[1] = 4 + 9 = 13`.
  - Depth 2: nodes `1`, `10` (children of 4), `7` (child of 9) -> `sums[2] = 1 + 10 + 7 = 18`.
  - `sums = [5, 13, 18]`.
- Set `root.val = 0` (node 5 becomes 0).
- **Pass 2 (`dfs2`):**
  - At root (node `5`, depth 0):
    - `childrenSum = node.left.val (4) + node.right.val (9) = 13`.
    - Left child (4): `val = sums[1] - 13 = 13 - 13 = 0`.
    - Right child (9): `val = sums[1] - 13 = 13 - 13 = 0`.
  - At node `4` (depth 1):
    - `childrenSum = 1 + 10 = 11`.
    - Left child (1): `val = sums[2] - 11 = 18 - 11 = 7`.
    - Right child (10): `val = sums[2] - 11 = 18 - 11 = 7`.
  - At node `9` (depth 1):
    - `childrenSum = 0 + 7 = 7`.
    - Right child (7): `val = sums[2] - 7 = 18 - 7 = 11`.
- **Resulting tree:** `[0, 0, 0, 7, 7, null, 11]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Where `n` is the number of nodes in the binary tree. `dfs1` visits every node once (`O(n)`), and `dfs2` visits every node once (`O(n)`).
- **Space Complexity:** `O(h)` — Where `h` is the maximum height of the binary tree. The recursion call stack uses `O(h)` space (up to `O(n)` in the worst case of a skewed tree, `O(\log n)` for a balanced tree), and `sums` stores `h` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2641cousins-in-binary-tree-ii.js](./2641cousins-in-binary-tree-ii.js) |

---

## Key Learnings

- Cousin values at any depth can be calculated efficiently in batch: `cousin_sum = level_sum - sibling_sum`.
- Processing child values from the perspective of their parent node naturally isolates siblings sharing the same parent.
- A two-pass DFS decomposes dependencies cleanly: first compute global level aggregates, then update localized differences.
