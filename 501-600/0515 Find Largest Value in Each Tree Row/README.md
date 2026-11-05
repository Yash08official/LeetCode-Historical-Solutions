---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 515. Find Largest Value in Each Tree Row

**[View Problem on LeetCode](https://leetcode.com/problems/find-largest-value-in-each-tree-row/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0515` (`515`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, find the **maximum node value in each horizontal row (level)** of the tree from top (row `0`) to bottom, and return those maximums as a list.

---

## Examples

### Example 1

```text
Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
```

### Example 2

```text
Input: root = [1,2,3]
Output: [1,3]
```

---

## Constraints

- The number of nodes in the tree will be in the range `[0, 10^4]`.

- `-2^31 <= Node.val <= 2^31 - 1`

---

## Problem Understanding

- **Empty tree edge case:** `root` may be `null` (`0` nodes), in which case the output must be an empty list `[]`.
- **Full 32-bit signed range:** Node values can be as small as `Integer.MIN_VALUE` (`-2^31`). Initializing a row's running maximum `t` to `0` or `-1` would fail on all-negative rows—initializing `t = q.peek().val` (or `Integer.MIN_VALUE`) handles negative values properly!

---

## Approach

### Brute Force Approach

Computing the height of the tree first and then running a separate root-to-depth recursive scan for each level `0 .. h - 1` revisits upper tree nodes repeatedly, degrading to `O(n^2)` time on skewed trees.

### Optimized Approach

Use **Level-Order Breadth-First Search (BFS)** with an `ArrayDeque`: process all nodes at the current depth in one batch using `q.size()`, track the maximum value `t` across that batch, and append `t` to `ans`.

### Step-by-Step Thinking Process

1. Handle the empty tree immediately: `if (root == null) return ans;`.
2. Push `root` into queue `Deque<TreeNode> q = new ArrayDeque<>()`.
3. While `q` is non-empty, all nodes currently in `q` belong to the exact same tree row.
4. Initialize the row maximum `int t = q.peek().val;` from the first node of the row, and snapshot the row count in `for (int i = q.size(); i > 0; --i)`.
5. Poll each `node` in the row, update `t = Math.max(t, node.val)`, enqueue non-null `left` and `right` children for the next row, and add `t` to `ans` once the row loop finishes.

### Algorithm / Intuition

In `largestValues(TreeNode root)`:
- Capturing `int i = q.size()` in the `for` loop initializer freezes the exact count of current-row nodes before any children from the next row are offered into `q`.
- Initializing `int t = q.peek().val;` uses an actual value from the current row, avoiding any sentinel-value bugs even when every node in the row equals `Integer.MIN_VALUE`.

---

## Dry Run

Tracing **Example 1** with `root = [1, 3, 2, 5, 3, null, 9]`:

1. **Row 0:** `q = [1]`. `t = 1`. Polls `1` (`t = 1`), enqueues `3` and `2`. Appends `1` -> `ans = [1]`.
2. **Row 1:** `q = [3, 2]` (`size = 2`). `t = 3`.
   - Polls `3` (`t = max(3, 3) = 3`), enqueues `5` and `3`.
   - Polls `2` (`t = max(3, 2) = 3`), enqueues `9`.
   - Appends `3` -> `ans = [1, 3]`.
3. **Row 2:** `q = [5, 3, 9]` (`size = 3`). `t = 5`.
   - Polls `5` (`t = 5`), polls `3` (`t = 5`), polls `9` (`t = max(5, 9) = 9`), no children.
   - Appends `9` -> `ans = [1, 3, 9]`.
4. `q` is empty -> returns `[1, 3, 9]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node in the binary tree is enqueued and dequeued exactly once.
- **Space Complexity:** `O(w)` — Where `w <= (n + 1) / 2` is the maximum width of any tree row stored in `q` (`O(n)` in the worst case for a balanced binary tree).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [515find-largest-value-in-each-tree-row.java](./515find-largest-value-in-each-tree-row.java) |

---

## Key Learnings

- Snapshotting `q.size()` at the start of each BFS outer iteration cleanly separates tree levels without storing `(node, depth)` pairs.
- Initializing a group's maximum from its first element (`q.peek().val`) is safer than guessing a numeric sentinel.
- Pre-order DFS passing `depth` (`if (depth == ans.size()) ans.add(val); else ans.set(depth, Math.max(...))`) is a clean `O(h)`-space alternative when tree width vastly exceeds tree height.
