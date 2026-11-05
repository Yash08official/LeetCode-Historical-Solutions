---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 951. Flip Equivalent Binary Trees

**[View Problem on LeetCode](https://leetcode.com/problems/flip-equivalent-binary-trees/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0951` (`951`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

A **flip operation** on a binary tree selects any node and swaps its left and right child subtrees. Two binary trees `X` and `Y` are **flip equivalent** if `X` can be transformed into `Y` using zero or more flip operations.

Given the roots `root1` and `root2` of two binary trees (where every tree has **unique** node values), return `true` if they are flip equivalent and `false` otherwise.

---

## Examples

### Example 1

```text
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.
```

### Example 2

```text
Input: root1 = [], root2 = []
Output: true
```

### Example 3

```text
Input: root1 = [], root2 = [1]
Output: false
```

---

## Constraints

- The number of nodes in each tree is in the range `[0, 100]`.

- Each tree will have **unique node values** in the range `[0, 99]`.

---

## Problem Understanding

- **Local Choice at Every Node:** At any matching pair of nodes `(u, v)` with `u.val === v.val`, there are only two ways their children can align: either **unflipped** (`u.left` matches `v.left` and `u.right` matches `v.right`) or **flipped** (`u.left` matches `v.right` and `u.right` matches `v.left`).
- **Unique Node Values Crucial for Speed:** Because node values within each tree are strictly unique, `u.left` and `u.right` cannot share the same value. Thus at most **one** of the two alignments (flipped vs. unflipped) can match root values at the next level—the non-matching alignment fails immediately in `O(1)` time!
- **Null Handling:** Two `null` subtrees are trivially flip equivalent, whereas one `null` and one non-`null` node are never equivalent.

---

## Approach

### Brute Force Approach

Enumerating every possible subset of nodes in `root1` to flip before testing tree equality explores up to `2^N` flipped configurations, taking `O(N * 2^N)` time.

### Optimized Approach

Use **Recursive Depth-First Search (DFS)** (`dfs(root1, root2)`) to verify root equality at each pair of nodes and recursively check whether either the unflipped child pairing or the flipped child pairing holds.

### Step-by-Step Thinking Process

1. Check base cases first: if both `root1` and `root2` are `null` (or reference-equal), return `true`.
2. If only one of `root1` or `root2` is `null`, or if `root1.val !== root2.val`, no sequence of child flips below them can make their roots match, so return `false`.
3. Otherwise, `root1` and `root2` match at the current level; recursively test both possibilities:
4. Case 1 (no flip at `root1`): `dfs(root1.left, root2.left) && dfs(root1.right, root2.right)`.
5. Case 2 (flip at `root1`): `dfs(root1.left, root2.right) && dfs(root1.right, root2.left)`.
6. Combine both cases with logical OR (`||`).

### Algorithm / Intuition

In `flipEquiv`, the inner helper `dfs(root1, root2)` expresses the inductive definition of flip equivalence directly.

At first glance, four recursive `dfs` calls in `(dfs(L1, L2) && dfs(R1, R2)) || (dfs(L1, R2) && dfs(R1, L1))` might look like `T(h) = 4 T(h - 1)` (`O(4^h)`). However, because all node values in each tree are **unique**, `L2` and `R2` never have equal values (unless both are `null`, in which case short-circuit evaluation handles them in `O(1)`). Consequently, `L1` can match the root value of **at most one** of `L2` or `R2`; the mismatched branch terminates immediately at its very first `val` comparison without recursing further. Each node in the smaller tree is therefore expanded at most once!

---

## Dry Run

Trace on **Example 1**:
- `root1`: `1` with children `(2 [4, 5[7, 8]], 3 [6, null])`
- `root2`: `1` with children `(3 [null, 6], 2 [4, 5[8, 7]])`

1. **`dfs(1, 1)`:** Values match (`1 === 1`).
   - Unflipped tries `dfs(2, 3)` -> `2 !== 3` -> `false` immediately!
   - Flipped tries `dfs(2, 2) && dfs(3, 3)`:
     - **`dfs(2, 2)`:** Values match. Unflipped tries `dfs(4, 4) && dfs(5, 5)`:
       - `dfs(4, 4)`: leaves `(null, null)` -> `true`.
       - `dfs(5, 5)`: Unflipped `dfs(7, 8)` -> `false`; Flipped `dfs(7, 7) && dfs(8, 8)` -> `true`.
       - Returns `true`.
     - **`dfs(3, 3)`:** Values match. Unflipped `dfs(6, null)` -> `false`; Flipped `dfs(6, 6) && dfs(null, null)` -> `true`.
2. Both `dfs(2, 2)` and `dfs(3, 3)` return `true` -> `dfs(1, 1)` returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(min(N_1, N_2))` — Because node values in each tree are unique, at most one of the unflipped or flipped alignments recurses past the immediate child comparison at each node.
- **Space Complexity:** `O(min(H_1, H_2))` — Recursion call stack depth is bounded by the smaller tree's height (`O(min(N_1, N_2))` in the worst case of skewed trees, up to `100`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [951flip-equivalent-binary-trees.js](./951flip-equivalent-binary-trees.js) |

---

## Key Learnings

- Always check problem constraints for **unique node values**: if duplicate values were allowed, branching into both unflipped and flipped pairings could degrade from `O(N)` to `O(N^2)` (requiring canonicalization instead).
- JavaScript's short-circuit `&&` and `||` operators avoid unnecessary recursive calls as soon as a mismatch or a valid pairing is confirmed.
