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

# 1372. Longest ZigZag Path in a Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1372` (`1372`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Dynamic Programming`, `Tree`, `Depth-First Search`, `Binary Tree`, `DP on Trees` |
| **Solution Language** | Java |

---

## Problem Description

Given the `root` of a binary tree, find and return the length of the **longest ZigZag path** contained anywhere in the tree.

A ZigZag path starts at **any** node, picks an initial child direction (`left` or `right`), takes one step in that direction, and then **strictly alternates** directions (`left -> right -> left -> ...` or `right -> left -> right -> ...`) at every subsequent step. The length of a ZigZag path is the number of **edges** traversed (`nodes_visited - 1`, so a single node has length `0`).

---

## Examples

### Example 1

```text
Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
Output: 3
Explanation: Longest ZigZag path in blue nodes (right -> left -> right).
```

### Example 2

```text
Input: root = [1,1,1,null,1,null,null,1,1,null,1]
Output: 4
Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).
```

### Example 3

```text
Input: root = [1]
Output: 0
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 5 * 10^4]`.

- `1 <= Node.val <= 100`

---

## Problem Understanding

- A ZigZag path does **not** have to start at `root` or end at a leaf—any node can initiate a new ZigZag path if stepping twice in the same direction (e.g., `left -> left`) breaks the previous alternation.
- At any node `u`, we only need to know two pieces of history from above: how long was the alternating path that **just arrived at `u` via a left edge** (`l`), and how long was the alternating path that **just arrived at `u` via a right edge** (`r`)?
- Moving from `u` to `u.left` extends a path that arrived at `u` from the **right** (`r + 1`), while resetting the "arrived from right" length at `u.left` to `0` (ready to start fresh if we later move left again).

---

## Approach

### Brute Force Approach

Starting two separate top-down ZigZag walks (one initial `left`, one initial `right`) independently from every one of the `N` nodes in the binary tree visits paths repeatedly—on a skewed zig-zagging spine of length `N`, this takes `O(N^2)` time.

### Optimized Approach

Perform a single top-down DFS `dfs(root, l, r)` carrying `l` (ZigZag edges ending at `root` via a left step) and `r` (ZigZag edges ending at `root` via a right step). Update global `ans = Math.max(ans, Math.max(l, r))`, then recurse with `dfs(root.left, r + 1, 0)` and `dfs(root.right, 0, l + 1)`.

### Step-by-Step Thinking Process

1. Define `dfs(node, l, r)` where `l` is the length of the current ZigZag path ending at `node` from a **left** move, and `r` is the length ending at `node` from a **right** move.
2. At the tree `root`, no edges have been traversed yet, so call `dfs(root, 0, 0)`.
3. At each non-null `node`, update `ans = Math.max(ans, Math.max(l, r))`.
4. When stepping to `node.left`, we just took a **left** edge after whatever previously arrived at `node` via a **right** edge (`r`), so `node.left`'s new `l` becomes `r + 1`! Meanwhile, `node.left` did NOT arrive via a right edge, so its `r` resets to `0` (`dfs(node.left, r + 1, 0)`).
5. Symmetrically, stepping to `node.right` extends `l` into `l + 1` on the right and resets `l` to `0` (`dfs(node.right, 0, l + 1)`).

### Algorithm / Intuition

Why does passing `0` as the second state (`dfs(root.left, r + 1, 0)`) automatically handle **restarting** a ZigZag path mid-tree? Suppose we move `left` to `u = root.left` (giving `u` state `(r + 1, 0)`) and then move `left` **again** to `v = u.left`. Because two consecutive `left` moves cannot belong to the same ZigZag path, `v` receives `(u.r + 1, 0) = (0 + 1, 0) = (1, 0)`—meaning a brand-new 1-edge ZigZag path `u -> v` has cleanly started at `u`! Thus every possible start node in the entire tree is accounted for in one pass.

---

## Dry Run

Tracing **Example 2** (compact tree `root = [1, 1, 1, null, 1, null, null, 1, 1, null, 1]` where path `root -> left -> right -> left -> right` has length `4`) and **Example 1**:

On **Example 1** (`root` has only `right` child `A`; `A` has `left` `B` and `right` `C`; `C` has `left` `D` and `right` `E`; `D` has `right` `F`; `F` has `right` `G`):
- `dfs(root, 0, 0)` -> `ans = 0`
- `dfs(A = root.right, 0, 0 + 1 = 1)` -> `ans = 1` (`root ->R A`)
  - `dfs(B = A.left, 1 + 1 = 2, 0)` -> `ans = 2` (`root ->R A ->L B`, leaf)
  - `dfs(C = A.right, 0, 0 + 1 = 1)` -> consecutive right restarted at `A`! (`A ->R C`, len `1`)
    - `dfs(D = C.left, 1 + 1 = 2, 0)` -> `ans = 2` (`A ->R C ->L D`)
      - `dfs(F = D.right, 0, 2 + 1 = 3)` -> **`ans = 3`** (`A ->R C ->L D ->R F`)
        - `dfs(G = F.right, 0, 0 + 1 = 1)` -> restarted (`F ->R G`, len `1`)

Return `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Visits every one of the `n` tree nodes exactly once with `O(1)` work per node.
- **Space Complexity:** `O(h)` — Recursion stack uses space proportional to tree height `h` (`O(n)` worst-case skewed tree, `O(log n)` balanced tree).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1372longest-zigzag-path-in-a-binary-tree.java](./1372longest-zigzag-path-in-a-binary-tree.java) |

---

## Key Learnings

- Passing `(l, r)` top-down (`dfs(left, r + 1, 0)` and `dfs(right, 0, l + 1)`) is clean, tail-friendly, and avoids allocating `int[2]` return arrays at every node as bottom-up tree DP would.
- Resetting the non-taken direction to `0` (`0 + 1 = 1` on the next step) seamlessly models starting a fresh path at any internal node.
- Double-check whether a tree path problem measures **nodes** or **edges** (`nodes - 1`): starting with `(0, 0)` at `root` naturally counts edges (`0` for a 1-node tree).
