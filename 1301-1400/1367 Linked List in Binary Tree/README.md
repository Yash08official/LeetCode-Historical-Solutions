---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 1367. Linked List in Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/linked-list-in-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1367` (`1367`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given the `head` of a singly linked list and the `root` of a binary tree.

Return `true` if all node values in the linked list, starting from `head`, match some contiguous **downward path** in the binary tree (a path starting at any tree node and stepping exclusively from parent to `left` or `right` child at each step); otherwise return `false`.

---

## Examples

### Example 1

```text
Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.
```

### Example 2

```text
Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
```

### Example 3

```text
Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.
```

---

## Constraints

- The number of nodes in the tree will be in the range `[1, 2500]`.

- The number of nodes in the list will be in the range `[1, 100]`.

- `1 <= Node.val <= 100` for each node in the linked list and binary tree.

---

## Problem Understanding

- A downward path can begin at **any** node in the binary tree (not necessarily `root`) and end at **any** descendant node (not necessarily a leaf).
- Once a downward match starts at a tree node `u`, every subsequent list node `head.next` **must** match a direct child (`u.left` or `u.right`)—skipping tree nodes or reversing upward is not allowed.
- The tree has up to `N = 2500` nodes and the linked list has up to `M = 100` nodes.

---

## Approach

### Brute Force Approach

Extract every root-to-leaf path of the binary tree as a string or list and check whether the linked list appears as a contiguous subarray in any path. In a skewed or bushy tree with long shared prefixes, copying full root-to-leaf paths repeatedly wastes time and space compared to terminating mismatched branches immediately during DFS.

### Optimized Approach

Use a two-level recursive Depth-First Search: `isSubPath(head, root)` traverses every tree node as a candidate starting point, while helper `dfs(head, root)` verifies whether a continuous downward path starting at the current `root` matches the remaining linked list `head`.

### Step-by-Step Thinking Process

1. Separate the two responsibilities cleanly into two recursive functions: **choosing where the path starts** (`isSubPath`) vs **continuing an active match** (`dfs`).
2. In `isSubPath(head, root)`, if `root == null`, no path can start here (`return false`). Otherwise return `true` if `dfs(head, root)` succeeds right here, OR if `isSubPath` succeeds in `root.left` or `root.right`.
3. In `dfs(head, root)`, check `if (head == null) return true` **first**—meaning all list nodes have been matched!
4. Next, if `root == null` or `head.val != root.val`, this downward branch fails (`return false`).
5. If `head.val == root.val`, advance `head` to `head.next` and try extending downward into either `root.left` or `root.right`.

### Algorithm / Intuition

Keeping `isSubPath` and `dfs` strictly separate prevents the classic bug of resetting `head` mid-match or skipping tree levels. Once `isSubPath` invokes `dfs(head, node)`, `dfs` **never** resets back to the original `head`—every recursive call inside `dfs` strictly advances both `head.next` and `root.left` / `root.right`. Ordering the base cases inside `dfs` as `if (head == null) return true;` **before** `if (root == null) return false;` ensures that matching the final list node at a leaf node (whose children are `null`) returns `true`.

---

## Dry Run

Tracing `head = [4, 2, 8]` on **Example 1** (`root = 1`, `root.left = 4 -> right 2 -> left 1`, `root.right = 4 -> left 2 -> (left 6, right 8)`):

1. `isSubPath([4,2,8], Node(1))`:
   - `dfs([4,2,8], Node(1))`: `4 != 1` -> `false`.
2. Recurse `isSubPath([4,2,8], root.left = Node(4))`:
   - `dfs([4,2,8], Node(4))` matches `4` -> tries `dfs([2,8], null)` (`false`) and `dfs([2,8], Node(2))` -> matches `2` -> tries `dfs([8], Node(1))` (`8 != 1`, `false`) and `dfs([8], null)` (`false`).
   - Subtree calls under `root.left` find no `4` -> returns `false`.
3. Recurse `isSubPath([4,2,8], root.right = Node(4))`:
   - `dfs([4,2,8], Node(4))` matches `4` -> calls `dfs([2,8], Node(2))` -> matches `2`:
     - `dfs([8], Node(6))`: `8 != 6` -> `false`
     - `dfs([8], Node(8))`: matches `8` -> calls `dfs(null, null)` -> `head == null` returns **`true`!**
4. Short-circuits all outer `||` expressions and returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(N * min(2^M, N))` — Let `N` be the number of tree nodes and `M` be the list length. `isSubPath` initiates `dfs` from at most `N` tree nodes, and each `dfs` explores only downward nodes within that subtree up to depth `M` (at most `min(2^M, subtree_size) <= N` nodes; `O(N * M)` on non-branching paths and bounded by `O(N^2)` in the worst case).
- **Space Complexity:** `O(H)` — Recursion call stack depth is bounded by the height `H` of the binary tree (`O(N)` worst-case for a skewed tree, `O(log N)` for a balanced tree; `dfs` adds at most `M <= H` frames).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1367linked-list-in-binary-tree.java](./1367linked-list-in-binary-tree.java) |

---

## Key Learnings

- Dual recursion (`isSubPath` for start-node selection + `dfs` for contiguous matching) is the exact same structural pattern as `Subtree of Another Tree` (`LeetCode 572`) and `Path Sum III` (`LeetCode 437`).
- Always place `if (head == null) return true;` **above** `if (root == null) return false;` so matches ending at a tree leaf succeed.
- To achieve strict `O(N + M)` worst-case time even on adversarial all-equal trees, KMP failure links can be tracked during a single DFS over the tree.
