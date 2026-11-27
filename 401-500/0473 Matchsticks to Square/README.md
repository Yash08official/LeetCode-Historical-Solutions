---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Backtracking
  - Bit Manipulation
  - Bitmask
---

# 473. Matchsticks to Square

**[View Problem on LeetCode](https://leetcode.com/problems/matchsticks-to-square/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0473` (`473`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Backtracking`, `Bit Manipulation`, `Bitmask` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the `i^th` matchstick. You want to use **all the matchsticks** to make one square. You **should not break** any stick, but you can link them up, and each matchstick must be used **exactly one time**.

Return `true` if you can make this square and `false` otherwise.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2021/04/09/matchsticks1-grid.jpg)

```
Input: matchsticks = [1,1,2,2,2]
Output: true
Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.
```

### Example 2

```
Input: matchsticks = [3,3,3,3,4]
Output: false
Explanation: You cannot find a way to form a square with all the matchsticks.
```

 

**

---

## Constraints

**

	- `1 <= matchsticks.length <= 15`

	- `1 <= matchsticks[i] <= 10^8`

---

## Problem Understanding

- Determine whether all given `matchsticks` can be partitioned into 4 subsets of equal sum to form the 4 sides of a square.

---

## Approach

### Optimized Approach (Descending-Order Backtracking with Symmetry Pruning)
1. Compute total perimeter `s` and maximum stick `mx`. If `s % 4 != 0` or `mx > s / 4`, immediately return `false`.
2. Sort `matchsticks` ascending and iterate backwards from the longest stick (`u = n - 1` down to `0`) so oversized placements fail immediately.
3. Try placing `matchsticks[u]` into each of the 4 sides `edges[0..3]`: skip `i` when `i > 0 && edges[i - 1] == edges[i]` to eliminate symmetric duplicate branches, and prune whenever `edges[i] > x`.

---

## Complexity Analysis

- **Time Complexity:** $O(4^n)$ worst case, heavily pruned in practice by descending stick order and equal-edge deduplication ($n \le 15$).
- **Space Complexity:** $O(n)$ recursion stack depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [473matchsticks-to-square.java](./473matchsticks-to-square.java) |

---

## Key Learnings

- Placing larger items first and skipping adjacent equal buckets (`edges[i - 1] == edges[i]`) dramatically cuts backtracking search trees in partition problems.
