---
comments: true
difficulty: Hard
tags:
  - String
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 1028. Recover a Tree From Preorder Traversal

**[View Problem on LeetCode](https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1028` (`1028`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

A binary tree was serialized using a **preorder** depth-first search (`Root -> Left -> Right`) where each node is written as `D` consecutive dashes `'-'` (representing its depth `D`, with the root at depth `0`) immediately followed by its integer value.

If a node in the tree has only **one** child, that child is guaranteed to be its **left** child. Given the string `traversal`, reconstruct the original binary tree and return its `root`.

---

## Examples

### Example 1

```text
Input: traversal = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
```

### Example 2

```text
Input: traversal = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]
```

### Example 3

```text
Input: traversal = "1-401--349---90--88"
Output: [1,401,null,349,88,90]
```

---

## Constraints

- The number of nodes in the original tree is in the range `[1, 1000]`.

- `1 <= Node.val <= 10^9`

---

## Problem Understanding

- **Ancestor Chain Invariant in Preorder:** When preorder DFS visits a node at depth `D` (`D >= 1`), its immediate parent is **always** the most recently visited node at depth `D - 1`!
- **Stack Size Equals Depth:** If we maintain a stack storing the active root-to-current-node path (`stack[0]` at depth `0`, `stack[1]` at depth `1`, ..., `stack[k - 1]` at depth `k - 1`), then popping until `stack.size() == depth` leaves the exact parent of the incoming depth-`depth` node at `stack.peek()`.
- **Left-Before-Right Attachment:** Because single children are guaranteed to be left children and preorder visits `left` before `right`, if `parent.left == null` the new node **must** be `parent.left`; otherwise it **must** be `parent.right`.

---

## Approach

### Brute Force Approach

Recursively splitting the `traversal` string with regular expressions at each depth level (matching exact runs of `D` dashes not bordered by extra dashes) re-scans substrings at every depth, taking `O(N * H)` (up to `O(N^2)`) time and extra string allocations.

### Optimized Approach

Parse `(depth, num)` pairs in a single left-to-right pass over `traversal` while maintaining the active ancestor path in a `Stack<TreeNode>` whose size matches the current depth.

### Step-by-Step Thinking Process

1. Scan `traversal` with a single cursor `i = 0`: for each token, count consecutive `'-'` characters into `depth`, then parse consecutive digits into `num` and create `newNode = new TreeNode(num)`.
2. Backtrack up the ancestor chain by popping `stack` `while (stack.size() > depth)`.
3. Now `stack.size() == depth`. If `stack` is non-empty (`depth > 0`), `stack.peek()` is the depth `(depth - 1)` parent: attach `newNode` to `stack.peek().left` if `null`, else `stack.peek().right`.
4. Push `newNode` onto `stack` (bringing `stack.size()` to `depth + 1`).
5. After parsing the entire string, the root (depth `0`) sits at the bottom of `stack`, returned via `stack.get(0)`.

### Algorithm / Intuition

In `recoverFromPreorder`, `stack` mirrors the DFS call stack of the original preorder traversal:
- Descending from parent (depth `d`) to left child (depth `d + 1`) sees `stack.size() == d + 1 == depth`, so zero pops occur and `newNode` attaches to `left`.
- Backtracking from a deep leaf (say depth `4`) to an ancestor's right child at depth `1` sees `stack.size() > 1`; `while (stack.size() > depth)` pops depths `4, 3, 2, 1`, leaving only depth `0` (the root) on `stack`. Since `root.left` is already occupied, `newNode` attaches to `root.right`!

Because only the root ever has `depth == 0` (and appears first), `stack.get(0)` always holds the root node at completion.

---

## Dry Run

Trace on **Example 1**: `traversal = "1-2--3--4-5--6--7"`

| Parsed Token `(depth, num)` | Pops (`size > depth`) | Parent (`stack.peek()`) & Attachment | `stack` Values (bottom -> top) |
| :--- | :--- | :--- | :--- |
| `(0, 1)` | none (`0 > 0` false) | `stack` empty -> root | `[1]` |
| `(1, 2)` | none (`1 > 1` false) | `1.left = 2` | `[1, 2]` |
| `(2, 3)` | none (`2 > 2` false) | `2.left = 3` | `[1, 2, 3]` |
| `(2, 4)` | pop `3` (`3 > 2`) | `2.right = 4` | `[1, 2, 4]` |
| `(1, 5)` | pop `4`, pop `2` (`3 -> 1`) | `1.right = 5` | `[1, 5]` |
| `(2, 6)` | none (`2 > 2` false) | `5.left = 6` | `[1, 5, 6]` |
| `(2, 7)` | pop `6` (`3 > 2`) | `5.right = 7` | `[1, 5, 7]` |

- Returns `stack.get(0)` -> root `1` with level-order `[1, 2, 5, 3, 4, 6, 7]`.

---

## Complexity Analysis

- **Time Complexity:** `O(L)` — Where `L = traversal.length()`. Index `i` visits each character of `traversal` once, and each of the `N <= L` nodes is pushed and popped at most once.
- **Space Complexity:** `O(H)` auxiliary stack space — `stack` holds at most `H + 1` nodes along a root-to-leaf path (where `H <= N` is tree height), plus `O(N)` for the reconstructed tree.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1028recover-a-tree-from-preorder-traversal.java](./1028recover-a-tree-from-preorder-traversal.java) |

---

## Key Learnings

- Whenever serialized tree input provides `(depth, value)` pairs in preorder, keeping a path stack invariant `stack.size() == depth` reconstructs parent-child edges iteratively without recursion.
- Parsing multi-digit integers manually (`num = num * 10 + (ch - '0')`) handles values up to `10^9` (like `401` and `349` in Example 3) cleanly in a single pass.
