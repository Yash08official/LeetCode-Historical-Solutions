---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 437. Path Sum III

**[View Problem on LeetCode](https://leetcode.com/problems/path-sum-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0437` (`437`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a binary tree and an integer `targetSum`, return the number of downward paths where the node values along the path sum to `targetSum`.

A valid path does not need to start at `root` or end at a leaf, provided it travels strictly downwards from parent to child.

---

## Examples

### Example 1

```text
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.
```

### Example 2

```text
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 1000]`.

- `-10^9 <= Node.val <= 10^9`

- `-1000 <= targetSum <= 1000`

---

## Problem Understanding

Every downward path in a binary tree is a contiguous segment along some root-to-leaf path! That means along any active root-to-current-node lineage `root = u_0 -> u_1 -> ... -> u_d = node`, the downward paths ending at `node` have sums equal to `s - prefixSum(u_k)` for ancestors `u_k`.

Key observations:
- Setting `s` as the cumulative sum from `root` down to `node`, a downward path ending at `node` sums to `targetSum` if and only if some ancestor prefix sum equals `s - targetSum`.
- **Backtracking is mandatory:** Unlike a 1D array, a tree branches! Before returning from `node` back to its parent (so the parent can explore its *other* subtree), we must decrement `cnt.get(s)` so prefix sums from the left subtree never leak into the right subtree!
- Note on values: `-10^9 <= Node.val <= 10^9` with up to `1000` nodes means `s` can reach `10^{12}`, which fits safely in JavaScript's `53`-bit exact integer range (`~9 * 10^{15}`).

---

## Approach

### Brute Force Approach

Running a nested DFS from every node `u` as a path start (`pathSumFrom(u, targetSum)`) explores every downward path explicitly.

On a skewed tree of `n` nodes, starting a downward scan from each node takes `O(n^2)` time, whereas prefix-sum hashing solves it in a single `O(n)` traversal.

### Optimized Approach

Perform a single **DFS with a Prefix-Sum Frequency `Map` (`cnt`) and Backtracking**. Seed `cnt.set(0, 1)` for paths starting directly at `root`. At each `node`, add `node.val` to `s`, add `cnt.get(s - targetSum) || 0` to `ans`, increment `cnt[s]`, recurse on `left` and `right`, and decrement `cnt[s]` before returning.

### Step-by-Step Thinking Process

1. Create `cnt = new Map()` and initialize `cnt.set(0, 1)` so any root-anchored path with `s === targetSum` finds `s - targetSum === 0`.
2. Define recursive helper `dfs(node, s)` returning `0` when `node === null`.
3. Advance cumulative path sum `s += node.val` and count valid paths ending at `node` via `let ans = cnt.get(s - targetSum) || 0`.
4. Query `cnt` **before** inserting `s` into `cnt`! (If `targetSum === 0`, inserting `s` first would falsely match `s - 0 = s` as an empty 0-node path!)
5. Increment `cnt.set(s, (cnt.get(s) || 0) + 1)`, accumulate `ans += dfs(node.left, s)` and `ans += dfs(node.right, s)`.
6. Backtrack by decrementing `cnt`'s count for `s` (and deleting `s` if count hits `0`) before returning `ans`.

### Algorithm / Intuition

At any instant inside `dfs(node, s)`, `cnt` contains the exact multiset of prefix sums along the **single active ancestor chain** from `root` to `node`'s parent (plus `0` for the empty prefix above `root`).

Querying `cnt.get(s - targetSum)` before updating `cnt` counts non-empty downward paths ending at `node` in `O(1)` time. Restoring `cnt` on exit (`cnt.set(s, cnt.get(s) - 1)`) guarantees sibling branches never see each other's prefix sums.

---

## Dry Run

Tracing **Example 1**: `root = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]`, `targetSum = 8`

Initial `cnt = {0: 1}`:
- `node = 10`: `s = 10`, `cnt.get(2) = 0` -> `cnt = {0:1, 10:1}`
  - Left `node = 5`: `s = 15`, `cnt.get(7) = 0` -> `cnt = {0:1, 10:1, 15:1}`
    - Left `node = 3`: `s = 18`, `cnt.get(10) = 1` (**Match #1:** path `5 -> 3`) -> `cnt` adds `18`
      - Children `3` (`s=21`) & `-2` (`s=16`): `0` matches, backtrack both, backtrack `18`.
    - Right `node = 2`: `s = 17`, `cnt.get(9) = 0` -> `cnt` adds `17`
      - Right `node = 1`: `s = 18`, `cnt.get(10) = 1` (**Match #2:** path `5 -> 2 -> 1`), backtrack `18`, backtrack `17`.
    - Backtrack `15` (`cnt = {0:1, 10:1}`).
  - Right `node = -3`: `s = 7`, `cnt.get(-1) = 0` -> `cnt = {0:1, 10:1, 7:1}`
    - Right `node = 11`: `s = 18`, `cnt.get(10) = 1` (**Match #3:** path `-3 -> 11`), backtrack `18`, backtrack `7`.

Total returned: `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node in the tree is visited once, performing `O(1)` `Map` lookups and updates.
- **Space Complexity:** `O(h)` where `h` is the tree height (`O(n)` worst case for a skewed tree, `O(log n)` for a balanced tree) — Both the call stack and `cnt` hold at most `h + 1` active entries at any moment.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [437path-sum-iii.js](./437path-sum-iii.js) |

---

## Key Learnings

- Subarray Sum Equals K (`prefixSum + HashMap`) extends directly to trees because any downward tree path is a subarray of a root-to-leaf traversal.
- Always look up `s - targetSum` *before* adding `s` to `cnt` so `targetSum === 0` does not count empty zero-length paths.
- Always undo (`-1`) the prefix sum count when backtracking out of `dfs` so left-subtree sums do not pollute right-subtree queries.
