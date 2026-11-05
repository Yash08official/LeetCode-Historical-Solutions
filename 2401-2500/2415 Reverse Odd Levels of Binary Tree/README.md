---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 2415. Reverse Odd Levels of Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2415` (`2415`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a perfect binary tree, reverse the node values at each odd level of the tree.

- For example, if node values at level 1 are `[3, 5]`, they should become `[5, 3]`.
- If node values at level 3 are `[2, 1, 3, 4, 7, 11, 29, 18]`, they should become `[18, 29, 11, 7, 4, 3, 1, 2]`.

Return the root of the reversed tree. A binary tree is perfect if all parent nodes have two children and all leaf nodes are at the same level. The root is at level 0.

---

## Examples

### Example 1

```text
Input: root = [2,3,5,8,13,21,34]
Output: [2,5,3,8,13,21,34]
Explanation:
The tree has only one odd level.
The nodes at level 1 are 3, 5 respectively, which are reversed and become 5, 3.
```

### Example 2

```text
Input: root = [7,13,11]
Output: [7,11,13]
Explanation:
The nodes at level 1 are 13, 11, which are reversed and become 11, 13.
```

### Example 3

```text
Input: root = [0,1,2,0,0,0,0,1,1,1,1,2,2,2,2]
Output: [0,2,1,0,0,0,0,2,2,2,2,1,1,1,1]
Explanation:
The odd levels have non-zero values.
The nodes at level 1 were 1, 2, and are 2, 1 after the reversal.
The nodes at level 3 were 1, 1, 1, 1, 2, 2, 2, 2, and are 2, 2, 2, 2, 1, 1, 1, 1 after the reversal.
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 2^14]`.

- `0 <= Node.val <= 10^5`

- `root` is a **perfect** binary tree.

---

## Problem Understanding

Key observations and constraints:
- Number of nodes in the tree is in the range `[1, 2^14]` (up to `16,384` nodes), with `0 <= Node.val <= 10^5`.
- The tree is guaranteed to be a PERFECT binary tree, meaning level `i` contains exactly `2^i` nodes, and all leaves are at the exact same maximum depth.
- The problem only asks to reverse node VALUES (`val`), not to rewire tree pointers (`left` and `right`).
- Odd levels are `1, 3, 5, ...`. Even levels (`0, 2, 4, ...`) remain unchanged.
- Breadth-First Search (BFS) naturally processes nodes level by level.

---

## Approach

### Brute Force Approach

A brute-force approach might collect all node references into a 2D array by level, reverse the values of arrays at odd indices, and reassign them. While also `O(N)`, BFS level-by-level queue processing performs this in-place during traversal without needing global level collections.

### Optimized Approach

Use Breadth-First Search (BFS) level-order traversal with a `Deque<TreeNode> q`:
1. Initialize `q` with `root`, and a level counter `i = 0`.
2. While `q` is not empty, process all nodes at the current level:
   - If `i` is odd (`i % 2 == 1`), collect all nodes at this level in a list `t`.
   - Enqueue the children of each node: `q.offer(node.left)` and `q.offer(node.right)` (if they exist).
3. If the current level was odd, use two pointers `l = 0, r = t.size() - 1` to swap the values of symmetric pairs: `t.get(l).val` with `t.get(r).val`.
4. Advance `++i` and repeat until the queue is empty.
5. Return `root`.

### Step-by-Step Thinking Process

1. We only need to swap node values, not modify tree structure.
2. Tree is perfect, so every internal node has both left and right children.
3. BFS level-order traversal cleanly partitions nodes by depth level `i`.
4. At level `i`, if `i % 2 == 1`, store the nodes in a list `t`.
5. Reverse values in `t` using two pointers `l` and `r`.
6. Enqueue children for the next level.

### Algorithm / Intuition

In `Solution.reverseOddLevels`, `Deque<TreeNode> q = new ArrayDeque<>()` starts with `root`. A loop tracks level index `i = 0`. For each level, `List<TreeNode> t = new ArrayList<>()` is initialized. The inner loop runs `k = q.size()` times to poll all nodes belonging to level `i`.

If `i % 2 == 1`, each polled node is added to list `t`. Then, child nodes `node.left` and `node.right` are offered to `q` for the next level. After draining the level, if `i` was odd, a symmetric two-pointer loop swaps the values: `int x = t.get(l).val; t.get(l).val = t.get(r).val; t.get(r).val = x;` as `l` and `r` converge toward the center. Finally, `root` is returned.

---

## Dry Run

Consider `root = [2, 3, 5, 8, 13, 21, 34]`:
- Level 0 (`i = 0`): `q = [2]`. Even level. Enqueue children `3, 5`.
- Level 1 (`i = 1`): `q = [3, 5]`. Odd level!
  - Nodes polled: 3 and 5 are added to `t = [Node(3), Node(5)]`.
  - Enqueue children: 8, 13, 21, 34.
  - Reverse `t`: swap `t[0].val` (3) and `t[1].val` (5) -> `t[0].val = 5`, `t[1].val = 3`.
- Level 2 (`i = 2`): `q = [8, 13, 21, 34]`. Even level. Nodes are leaves (no children to enqueue).
- Queue is now empty. Loop terminates.
- Result: level 1 node values are `[5, 3]`. Return `root` matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Every node in the tree of size `N` is visited once by the BFS queue. At odd levels, swapping node values takes time proportional to the number of nodes at those levels (`~N/2`), resulting in strictly `O(N)` time.
- **Space Complexity:** `O(N)` — The queue `q` and list `t` hold at most the maximum width of the tree, which for a perfect binary tree is the leaf level containing `(N + 1) / 2` nodes.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2415reverse-odd-levels-of-binary-tree.java](./2415reverse-odd-levels-of-binary-tree.java) |

---

## Key Learnings

- Modifying node values (`node.val`) directly is much simpler and less error-prone than rewiring tree pointers.
- BFS level-by-level processing cleanly encapsulates tree depth, making level-conditioned operations straightforward.
- Symmetric two-pointer reversal (`l < r`) mirrors arrays and lists in linear time.
