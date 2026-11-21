---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - String
  - Tree
  - Depth-First Search
---

# 3331. Find Subtree Sizes After Changes

**[View Problem on LeetCode](https://leetcode.com/problems/find-subtree-sizes-after-changes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3331` (`3331`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Tree`, `Depth-First Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given a tree rooted at node 0 that consists of `n` nodes numbered from `0` to `n - 1`. The tree is represented by an array `parent` of size `n`, where `parent[i]` is the parent of node `i`. Since node 0 is the root, `parent[0] == -1`.

You are also given a string `s` of length `n`, where `s[i]` is the character assigned to node `i`.

We make the following changes on the tree **one** time **simultaneously** for all nodes `x` from `1` to `n - 1`:

	
- Find the **closest** node `y` to node `x` such that `y` is an ancestor of `x`, and `s[x] == s[y]`.
	
- If node `y` does not exist, do nothing.
	
- Otherwise, **remove** the edge between `x` and its current parent and make node `y` the new parent of `x` by adding an edge between them.

Return an array `answer` of size `n` where `answer[i]` is the **size** of the subtree rooted at node `i` in the **final** tree.

---

## Examples

### Example 1

**Input:** parent = [-1,0,0,1,1,1], s = "abaabc"

**Output:** [6,3,1,1,1,1]

**Explanation:**

The parent of node 3 will change from node 1 to node 0.

### Example 2

**Input:** parent = [-1,0,4,0,1], s = "abbba"

**Output:** [5,2,1,1,1]

**Explanation:**

The following changes will happen at the same time:

	
- The parent of node 4 will change from node 1 to node 0.
	
- The parent of node 2 will change from node 4 to node 1.

 

**

---

## Constraints

**

	
- `n == parent.length == s.length`
	
- `1 <= n <= 10^5`
	
- `0 <= parent[i] <= n - 1` for all `i >= 1`.
	
- `parent[0] == -1`
	
- `parent` represents a valid tree.
	
- `s` consists only of lowercase English letters.

---

## Problem Understanding

- Re-parent every node `x` to its closest ancestor `y` having the same character `s[y] == s[x]` (if one exists) simultaneously based on the original tree, then return the final subtree size of every node.

---

## Approach

### Optimized Approach (Iterative Post-Order DFS + Per-Character Ancestor Stacks)
1. Build adjacency list `g` from `parent`.
2. Maintain 26 stacks `d[0..25]` storing active ancestors on the current root-to-node path for each letter `'a'..'z'`.
3. Run an iterative DFS with explicit `(node, fa, state)` stack frames:
   - Entry (`state == 0`): initialize `ans[i] = 1`, push `i` onto `d[idx]`, push exit frame `(i, fa, 1)`, and push children `(j, i, 0)`.
   - Exit (`state == 1`): the new parent `k` is the previous element in `d[idx]` if `d[idx].size() > 1`, otherwise the original parent `fa`. Add `ans[i]` into `ans[k]` (if `k >= 0`) and pop `i` from `d[idx]`.
4. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each node is pushed and popped twice in iterative DFS.
- **Space Complexity:** $O(n)$ — Tree adjacency list, DFS stack, and ancestor lists.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3331find-subtree-sizes-after-changes.java](./3331find-subtree-sizes-after-changes.java) |

---

## Key Learnings

- Because re-parenting only moves a node upward to an existing ancestor, post-order bottom-up accumulation directly computes final subtree sizes in a single $O(n)$ pass without rebuilding the tree.
