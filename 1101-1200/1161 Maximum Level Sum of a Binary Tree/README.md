---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 1161. Maximum Level Sum of a Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1161` (`1161`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given the `root` of a binary tree where levels are **1-indexed**: the root is at level `1`, its children are at level `2`, and so forth.

Compute the sum of node values at each level and return the **smallest** level number `x` whose level sum is **maximum** across the entire tree.

---

## Examples

### Example 1

```text
Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation:
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
```

### Example 2

```text
Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 10^4]`.

- `-10^5 <= Node.val <= 10^5`

---

## Problem Understanding

- **Negative Node Values:** Because `-10^5 <= Node.val <= 10^5`, every level sum in the tree could be negative! Initializing `maxSum` to `0` would fail on an all-negative tree; it must start at `Integer.MIN_VALUE`.
- **32-Bit Integer Safety:** With at most `10^4` nodes and `|Node.val| <= 10^5`, the absolute sum on any single level is at most `10^9`, which fits safely inside a signed 32-bit Java `int` (`<= 2,147,483,647`).
- **Tie-Breaking Rule:** If multiple levels achieve the same maximum sum, we must return the **smallest** level number. Updating `result` only on strict inequality (`sum > maxSum`) naturally keeps the earliest level.

---

## Approach

### Brute Force Approach

Compute the tree height first, then for each level `d` from `1` to `height`, run a separate recursive traversal from `root` down to depth `d` to sum nodes at that depth. Revisiting upper tree nodes repeatedly can degrade to `O(n^2)` time on a skewed binary tree.

### Optimized Approach

Perform a standard Breadth-First Search (BFS) level-order traversal using a `Queue<TreeNode>`, summing node values level by level in `O(n)` time and updating `maxSum` and `result` whenever `sum > maxSum`.

### Step-by-Step Thinking Process

1. Initialize `maxSum = Integer.MIN_VALUE`, `level = 1`, and `result = 1`, then enqueue `root` into a `Queue<TreeNode>`.
2. While `queue` is non-empty, capture `int levelSize = queue.size()` so we process strictly the nodes belonging to the current `level`.
3. Dequeue `levelSize` nodes, accumulate their `val`s into `sum`, and enqueue any non-null `left` and `right` children for the next level.
4. After finishing the level, check `if (sum > maxSum)` (strict `>`) to record `maxSum = sum` and `result = level`, then increment `level++`.

### Algorithm / Intuition

BFS visits tree nodes in increasing order of depth (`level = 1, 2, 3, ...`). Snapshotting `levelSize = queue.size()` at the top of each `while` iteration isolates the exact frontier of nodes at `level`, even as their children are appended to the back of `queue`.

Because levels are inspected from `1` upward and `result` only updates when `sum > maxSum`, any tie at a deeper level (`sum == maxSum`) is ignored, guaranteeing the smallest optimal level is returned.

---

## Dry Run

Using **Example 1** (`root = [1, 7, 0, 7, -8, null, null]`):

1. **Init:** `maxSum = -2147483648`, `level = 1`, `result = 1`, `queue = [1]`.
2. **Level 1 (`levelSize = 1`):**
   - Poll `1` -> `sum = 1`; offer children `7` and `0`.
   - `1 > maxSum` -> `maxSum = 1`, `result = 1`; `level` becomes `2`.
3. **Level 2 (`levelSize = 2`, `queue = [7, 0]`):**
   - Poll `7` (`sum = 7`), offer children `7` and `-8`.
   - Poll `0` (`sum = 7 + 0 = 7`), no children.
   - `7 > 1` -> `maxSum = 7`, `result = 2`; `level` becomes `3`.
4. **Level 3 (`levelSize = 2`, `queue = [7, -8]`):**
   - Poll `7` (`sum = 7`), poll `-8` (`sum = -1`).
   - `-1 > 7` is false -> `maxSum` stays `7`, `result` stays `2`; `level` becomes `4`.
5. **Exit:** `queue` is empty -> returns `result = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each of the `n` nodes in the binary tree is enqueued and dequeued exactly once.
- **Space Complexity:** `O(w)` (`O(n)` worst-case) — `queue` holds at most `w` nodes simultaneously, where `w` is the maximum width of a level (up to `(n + 1) / 2` in a complete binary tree).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1161maximum-level-sum-of-a-binary-tree.java](./1161maximum-level-sum-of-a-binary-tree.java) |

---

## Key Learnings

- Snapshotting `queue.size()` before iterating is the canonical BFS pattern for level-by-level aggregation in trees and graphs.
- Always initialize running maxima to `Integer.MIN_VALUE` (not `0`) when node values can be negative.
- Using strict `>` instead of `>=` when scanning in ascending index order automatically breaks ties in favor of the smallest index.
