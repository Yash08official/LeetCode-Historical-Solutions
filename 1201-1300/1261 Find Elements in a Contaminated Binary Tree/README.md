---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Design
  - Binary Tree
---

# 1261. Find Elements in a Contaminated Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1261` (`1261`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Design`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

A binary tree originally obeyed the following value rules:
- `root.val == 0`.
- If a node has value `x`, its left child (if non-null) has value `2 * x + 1`, and its right child (if non-null) has value `2 * x + 2`.

The tree was then **contaminated** by setting every node's `val` to `-1`. Implement the `FindElements` class:
- `FindElements(TreeNode root)`: Recovers the contaminated binary tree.
- `boolean find(int target)`: Returns `true` if `target` exists in the recovered tree, or `false` otherwise.

---

## Examples

### Example 1

```text
Input
["FindElements","find","find"]
[[[-1,null,-1]],[1],[2]]
Output
[null,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1]);
findElements.find(1); // return False
findElements.find(2); // return True
```

### Example 2

```text
Input
["FindElements","find","find","find"]
[[[-1,-1,-1,-1,-1]],[1],[3],[5]]
Output
[null,true,true,false]
Explanation
FindElements findElements = new FindElements([-1,-1,-1,-1,-1]);
findElements.find(1); // return True
findElements.find(3); // return True
findElements.find(5); // return False
```

### Example 3

```text
Input
["FindElements","find","find","find","find"]
[[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]]
Output
[null,true,false,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1,-1,null,-1]);
findElements.find(2); // return True
findElements.find(3); // return False
findElements.find(4); // return False
findElements.find(5); // return True
```

---

## Constraints

- `TreeNode.val == -1`

- The height of the binary tree is less than or equal to `20`

- The total number of nodes is between `[1, 10^4]`

- Total calls of `find()` is between `[1, 10^4]`

- `0 <= target <= 10^6`

---

## Problem Understanding

- **Complete Binary Heap Indexing:** Notice `0 -> (2x + 1, 2x + 2)` is the exact `0`-indexed array numbering of a binary heap! Every node in the tree receives a unique non-negative integer.
- **Overflow Check:** Since tree height is `<= 20`, the largest possible node value is `2^20 - 2 = 1,048,574` (and `target <= 10^6`), which fits comfortably in a standard 32-bit `int`.
- **Workload Balance:** With up to `10^4` nodes and up to `10^4` calls to `find(target)`, recording all recovered values in a `HashSet<Integer>` during construction makes every `find` query `O(1)` average time.

---

## Approach

### Brute Force Approach

Recover the tree in the constructor, and on every `find(target)` call run a full DFS/BFS over the tree searching for `target`. With `n = 10^4` nodes and `q = 10^4` queries, scanning the tree per query takes `O(n * q)` (`10^8` operations) instead of `O(1)` per query.

### Optimized Approach

In `FindElements(TreeNode root)`, set `root.val = 0` and run a preorder `dfs(root)` that restores `left.val = val * 2 + 1` and `right.val = val * 2 + 2` while storing every recovered value in `Set<Integer> s = new HashSet<>()`. Answer `find(target)` in `O(1)` via `s.contains(target)`.

### Step-by-Step Thinking Process

1. Maintain an instance field `Set<Integer> s = new HashSet<>()` to cache all valid node values.
2. In the constructor, initialize `root.val = 0` and invoke `dfs(root)`.
3. Inside `dfs(TreeNode root)`, add `root.val` to `s`; if `root.left != null`, assign `root.left.val = root.val * 2 + 1` and recurse `dfs(root.left)`; if `root.right != null`, assign `root.right.val = root.val * 2 + 2` and recurse `dfs(root.right)`.
4. Implement `find(int target)` as a direct `O(1)` lookup `s.contains(target)`.

### Algorithm / Intuition

Because each child's recovered value depends only on its parent's value, a top-down preorder traversal (`dfs`) computes `root.val` before descending into `root.left` and `root.right`.

By inserting `root.val` into the `HashSet` `s` as each node is visited, tree recovery and index building happen in a single `O(n)` pass. Subsequent `find(target)` queries do not touch the tree at all—they simply hash `target` into `s`.

---

## Dry Run

Using **Example 1** (`root = [-1, null, -1]`, queries `find(1)`, `find(2)`):

1. **`new FindElements(root)`:**
   - Sets `root.val = 0`, calls `dfs(root)`.
   - `dfs(node 0)`: `s.add(0)` -> `s = {0}`.
     - `root.left` is `null`.
     - `root.right` is non-null: `root.right.val = 0 * 2 + 2 = 2`, calls `dfs(root.right)`.
   - `dfs(node 2)`: `s.add(2)` -> `s = {0, 2}`; both children `null`.
2. **`find(1)`:** `s.contains(1)` -> **`false`**.
3. **`find(2)`:** `s.contains(2)` -> **`true`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` for `FindElements(root)` construction and `O(1)` average per `find(target)` query — Each of the `n` nodes is visited once during `dfs`, and `HashSet.contains` runs in constant average time.
- **Space Complexity:** `O(n)` — `HashSet` `s` stores `n` integers, and the recursion stack uses `O(h)` space where `h <= 20` is the tree height.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1261find-elements-in-a-contaminated-binary-tree.java](./1261find-elements-in-a-contaminated-binary-tree.java) |

---

## Key Learnings

- Top-down preorder DFS is ideal whenever child state (`2x + 1`, `2x + 2`) is computed directly from parent state (`x`).
- Trading `O(n)` space in a `HashSet` turns repeated `O(n)` tree searches into `O(1)` lookups.
- Bonus insight: adding `1` to every node value turns the numbering into `1`-based binary tree bit-paths (`1 -> 2, 3`), allowing `O(log(target))` tree-walk lookups with `O(1)` extra memory if space were constrained.
