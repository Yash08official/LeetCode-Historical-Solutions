---
comments: true
difficulty: Medium
tags:
  - Tree
  - Breadth-First Search
  - Binary Tree
---

# 102. Binary Tree Level Order Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0102` (`102`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` node of a binary tree, return a 2D array containing its node values grouped **level by level** from top to bottom, with values within each level ordered from **left to right**.

---

## Examples

### Example 1

```text
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

### Example 2

```text
Input: root = [1]
Output: [[1]]
```

### Example 3

```text
Input: root = []
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.

- `-1000 <= Node.val <= 1000`

---

## Problem Understanding

- Level `0` contains only `[root.val]`, level `1` contains `root`'s non-null children from left to right, level `2` contains their children from left to right, and so on.
- Note the edge case `root == null` (`0` nodes in constraints `[0, 2000]`): the output must be an empty list `[]`, not `[[]]`.
- Because we must group nodes by distance from `root`, **Breadth-First Search (BFS)** naturally visits nodes level by level.

---

## Approach

### Brute Force Approach

A naive repeated-depth traversal first computes tree height `H`, then runs a separate top-down DFS from `root` for each target depth `d = 0, 1, ..., H - 1` to collect nodes at depth `d`. In a skewed tree of height `n`, re-traversing upper nodes repeatedly degrades time complexity to `O(n^2)`.

### Optimized Approach

Perform an iterative **Breadth-First Search (BFS)** maintaining the current level's nodes in array `q`, collecting their values into `t` and their non-null children into `qq` on each pass in `O(n)` time.

### Step-by-Step Thinking Process

1. Handle the empty tree immediately: if `!root`, return `[]`.
2. Initialize `q = [root]` to hold all nodes belonging to the current level.
3. While `q.length > 0`, allocate `t = []` for the current level's node values and `qq = []` for the next level's `TreeNode` references.
4. Iterate across every node `{ val, left, right }` in `q`, pushing `val` to `t` and pushing `left` and `right` to `qq` if non-null.
5. Append `t` to `ans`, replace `q`'s contents with `qq` via `q.splice(0, q.length, ...qq)`, and repeat until no nodes remain.

### Algorithm / Intuition

In `levelOrder(root)`, instead of calling `q.shift()` inside a nested loop (which costs `O(k)` per shift on JavaScript arrays), the code processes an entire level array `q` via `for (const { val, left, right } of q)`:
- Object destructuring `{ val, left, right }` cleanly unpacks each `TreeNode`.
- Short-circuit expressions `left && qq.push(left)` and `right && qq.push(right)` enqueue non-null children in left-to-right order.
- `ans.push(t)` records the completed level.
- `q.splice(0, q.length, ...qq)` mutates `const q` in-place to hold the next level's nodes for the next `while (q.length)` iteration.

---

## Dry Run

Tracing Example 1 with `root = [3, 9, 20, null, null, 15, 7]`:

- **Initial:** `ans = []`, `q = [Node(3)]`
- **Pass 1 (Level 0):**
  - Visit `Node(3)`: `t = [3]`, `qq = [Node(9), Node(20)]`
  - `ans = [[3]]`, `q` becomes `[Node(9), Node(20)]`
- **Pass 2 (Level 1):**
  - Visit `Node(9)` (no children): `t = [9]`, `qq = []`
  - Visit `Node(20)` (children `15, 7`): `t = [9, 20]`, `qq = [Node(15), Node(7)]`
  - `ans = [[3], [9, 20]]`, `q` becomes `[Node(15), Node(7)]`
- **Pass 3 (Level 2):**
  - Visit `Node(15)` and `Node(7)` (both leaves): `t = [15, 7]`, `qq = []`
  - `ans = [[3], [9, 20], [15, 7]]`, `q` becomes `[]`
- **End (`q.length === 0`):** Return `[[3], [9, 20], [15, 7]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node in the binary tree is visited, destructured, and copied across `q`/`qq` a constant number of times.
- **Space Complexity:** `O(n)` — At the widest level of a binary tree, `q` and `qq` hold up to `O(n)` (`ceil(n / 2)`) nodes, in addition to the `O(n)` output array `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [102binary-tree-level-order-traversal.js](./102binary-tree-level-order-traversal.js) |

---

## Key Learnings

- Replacing a traditional `shift()`-based queue with two level buffers (`q` and `qq`) avoids JavaScript's `O(k)` `Array.prototype.shift()` overhead while making level boundaries effortless.
- Always guard `!root` before seeding `[root]` into the BFS queue; otherwise `[null]` would cause a runtime destructuring error on `null`.
- Note that for extreme level widths (`> 65,536` nodes), `let q = [root]; ... q = qq;` avoids spreading `...qq` onto the JS call stack in `splice`, though for `n <= 2000` `q.splice(0, q.length, ...qq)` is completely safe.
