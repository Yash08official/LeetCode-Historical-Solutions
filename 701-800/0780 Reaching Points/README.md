---
comments: true
difficulty: Hard
tags:
  - Math
---

# 780. Reaching Points

**[View Problem on LeetCode](https://leetcode.com/problems/reaching-points/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0780` (`780`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math` |
| **Solution Language** | Java |

---

## Problem Description

Given four integers sx, sy, tx, and ty, return true if it is possible to convert the point (sx, sy) to the point (tx, ty) through some operations, or false otherwise.

The allowed operation on some point (x, y) is to convert it to either (x, x + y) or (x + y, y).

 
Example 1:


Input: sx = 1, sy = 1, tx = 3, ty = 5
Output: true
Explanation:
One series of moves that transforms the starting point to the target is:
(1, 1) -> (1, 2)
(1, 2) -> (3, 2)
(3, 2) -> (3, 5)


Example 2:


Input: sx = 1, sy = 1, tx = 2, ty = 2
Output: false


Example 3:


Input: sx = 1, sy = 1, tx = 1, ty = 1
Output: true


 
Constraints:


	1 <= sx, sy, tx, ty <= 109

---

## Problem Understanding

- From $(x, y)$, forward moves are $(x, x + y)$ or $(x + y, y)$.
- Moving forward branches exponentially, but moving **backward** from $(tx, ty)$ is deterministic:
  - If $tx > ty$, previous state must have been $(tx - ty, ty)$.
  - If $ty > tx$, previous state must have been $(tx, ty - tx)$.
- Subtracting modulo arithmetic speeds up successive subtractions drastically (Euclidean algorithm).

---

## Approach

### Optimized Approach (Euclidean Modulo Reverse Search)

1. While $tx > sx$ and $ty > sy$ and $tx \ne ty$:
   - If $tx > ty$: $tx \%= ty$.
   - Else: $ty \%= tx$.
2. Check termination:
   - If $tx == sx$ and $ty == sy$: return `true`.
   - If $tx == sx$: $ty$ can reduce to $sy$ if and only if $ty > sy$ and $(ty - sy) \% tx == 0$.
   - If $ty == sy$: $tx$ can reduce to $sx$ if and only if $tx > sx$ and $(tx - sx) \% ty == 0$.
3. Return `false`.

---

## Dry Run

For `sx = 1, sy = 1, tx = 3, ty = 5`:
1. $3 < 5$: $ty \%= 3$ -> $ty = 2$.
2. $3 > 2$: $tx \%= 2$ -> $tx = 1$.
3. $tx == sx$ (1 == 1): $(ty - sy) \% tx = (2 - 1) \% 1 = 0$ -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log(\max(tx, ty)))$ — Identical to the Euclidean GCD algorithm.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [780reaching-points.java](./780reaching-points.java) |

---

## Key Learnings

- Working backward transforms an intractable branching search into a unique deterministic path.
- Using modulo arithmetic replaces repeated subtractions with logarithmic steps.
