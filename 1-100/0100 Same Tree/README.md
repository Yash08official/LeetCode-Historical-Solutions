---
comments: true
difficulty: Easy
tags:
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Binary Tree
---

# 100. Same Tree

**[View Problem on LeetCode](https://leetcode.com/problems/same-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0100` (`100`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

---

## Examples

### Example 1

```text
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

### Example 2

```text
Input: p = [1,2], q = [1,null,2]
Output: false
```

### Example 3

```text
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

---

## Constraints

- The number of nodes in both trees is in the range `[0, 100]`.
- `-10^4 <= Node.val <= 10^4`

---

## Problem Understanding

- Two binary trees are identical if and only if:
  1. Both root nodes are null, or
  2. Both root nodes are non-null with equal values, and their left subtrees are identical, and their right subtrees are identical.
- Can be evaluated iteratively via parallel Breadth-First Search (BFS) using two queues.

---

## Approach

### Optimized Approach (Parallel BFS with Dual Queues)

1. If `p == q`, return `true` (handles both null or same reference).
2. If `p == null || q == null`, return `false`.
3. Initialize two queues `q1` and `q2` with `p` and `q` respectively.
4. While both queues are non-empty:
   - Poll `p = q1.poll()` and `q = q2.poll()`.
   - If `p.val != q.val`, return `false`.
   - Check structural consistency of left children:
     - If one has a left child and the other does not, return `false`.
   - Check structural consistency of right children:
     - If one has a right child and the other does not, return `false`.
   - Enqueue non-null left children to `q1` and `q2`.
   - Enqueue non-null right children to `q1` and `q2`.
5. Return `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — In the worst case, all $N$ nodes of both trees are visited once.
- **Space Complexity:** $O(N)$ — Dual queue capacity stores at most $O(N)$ nodes at the widest tree level.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [100same-tree.java](./100same-tree.java) |

---

## Key Learnings

- Iterative dual-queue BFS eliminates recursion stack overflow risks for deeply unbalanced trees.
- Validating child existence symmetry before enqueuing prevents enqueuing null references.
