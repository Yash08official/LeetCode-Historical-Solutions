---
comments: true
difficulty: Easy
tags:
  - Stack
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 145. Binary Tree Postorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0145` (`145`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Stack`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` node of a binary tree, return an array containing its node values visited in **postorder traversal** order.

In a **postorder** traversal, for every subtree you visit:
1. The entire **left** subtree first,
2. The entire **right** subtree second,
3. The **current root** node last.

---

## Examples

### Example 1

**Input:** `root = [1,null,2,3]`

**Output:** `[3,2,1]`

**Explanation:**

### Example 2

**Input:** `root = [1,2,3,4,5,null,8,null,null,6,7,9]`

**Output:** `[4,6,7,5,2,9,8,3,1]`

**Explanation:**

### Example 3

**Input:** `root = []`

**Output:** `[]`

### Example 4

**Input:** `root = [1]`

**Output:** `[1]`

---

## Constraints

- The number of the nodes in the tree is in the range `[0, 100]`.

- `-100 <= Node.val <= 100`

---

## Follow-up Questions

Recursive solution is trivial, could you do it iteratively?

While the solution file uses clean recursive DFS (`n <= 100`), you can solve the **iterative follow-up** in two ways: (1) run modified preorder (**Root -> Right -> Left**) using a stack (pushing `left` then `right`) and reverse `ans` at the end, or (2) use a single stack with a `prev` pointer to check whether `curr.right` was just visited before popping `curr`.

---

## Problem Understanding

- **Children-Before-Parent Dependency:** A node's value cannot be appended until every descendant in both its left and right subtrees has been processed.
- **Base Case:** An empty tree (`root === null`) or any missing child (`node === null`) contributes nothing and returns immediately.
- **Shared Accumulator:** Passing a single shared `ans` array into a recursive closure avoids allocating intermediate sub-arrays at each tree level.

---

## Approach

### Brute Force Approach

Every valid postorder traversal must inspect all `n` nodes (`Omega(n)`), but building new arrays via `[...postorderTraversal(root.left), ...postorderTraversal(root.right), root.val]` at each recursive call copies subtree elements repeatedly, leading to `O(n^2)` time on a skewed tree.

### Optimized Approach

Use **Recursive Depth-First Search (`dfs`)** with a shared output array `ans`. For each non-null node, recursively traverse `node.left`, then `node.right`, and finally push `node.val` onto `ans`.

### Step-by-Step Thinking Process

1. Create a single result array `ans = []` in the outer function scope.
2. Define a recursive arrow helper `dfs = (node) => { ... }` that closes over `ans`.
3. If `node === null`, return immediately (base case).
4. Call `dfs(node.left)` to record all left-subtree values in postorder, then `dfs(node.right)` to record all right-subtree values in postorder.
5. Append `ans.push(node.val)` after both recursive calls complete, and invoke `dfs(root)`.

### Algorithm / Intuition

The JavaScript call stack naturally tracks which parent nodes are still waiting for their children to finish. Inside `dfs(node)`, execution pauses at `dfs(node.left)` until the entire left subtree returns, then pauses at `dfs(node.right)` until the entire right subtree returns, and only executes `ans.push(node.val)` on the way back up (post-visit). Because `ans.push` runs in amortized `O(1)` time on a single shared array, each node does constant work.

---

## Dry Run

Trace on **Example 1**: `root = [1, null, 2, 3]` (`node(1).right = node(2)`, `node(2).left = node(3)`)

1. `dfs(node(1))` starts:
   - Calls `dfs(node(1).left)` -> `dfs(null)` -> returns immediately.
   - Calls `dfs(node(1).right)` -> `dfs(node(2))`:
     - Calls `dfs(node(2).left)` -> `dfs(node(3))`:
       - `dfs(null)` (left) returns; `dfs(null)` (right) returns.
       - `ans.push(3)` -> `ans = [3]`.
     - Calls `dfs(node(2).right)` -> `dfs(null)` -> returns.
     - `ans.push(2)` -> `ans = [3, 2]`.
   - `ans.push(1)` -> `ans = [3, 2, 1]`.
2. Return `ans = [3, 2, 1]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — `dfs` visits each of the `n` tree nodes once (plus `n + 1` null child pointers), performing `O(1)` work per call.
- **Space Complexity:** `O(h)` auxiliary call-stack space (`O(n)` worst-case) — Recursion depth equals the tree height `h` (`O(log n)` for a balanced tree, `O(n)` for a skewed tree), excluding the `O(n)` output array `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [145binary-tree-postorder-traversal.js](./145binary-tree-postorder-traversal.js) |

---

## Key Learnings

- Closing over a single `ans` array with an inner `dfs` helper avoids `O(n^2)` array-concatenation overhead while keeping recursive tree code concise.
- Preorder, inorder, and postorder DFS share the exact same recursive skeleton—only the placement of `ans.push(node.val)` relative to `dfs(node.left)` and `dfs(node.right)` changes.
- Postorder naturally models bottom-up tree computations such as subtree heights, diameters, and node deletion.
