---
comments: true
difficulty: Hard
tags:
  - Array
  - Math
  - Backtracking
---

# 679. 24 Game

**[View Problem on LeetCode](https://leetcode.com/problems/24-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0679` (`679`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Math`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `cards` of length `4`. You have four cards, each containing a number in the range `[1, 9]`. You should arrange the numbers on these cards in a mathematical expression using the operators `['+', '-', '*', '/']` and the parentheses `'('` and `')'` to get the value `24`.

You are restricted with the following rules:

- The division operator `'/'` represents real division, not integer division.
- Every operation done is between two numbers. In particular, we cannot use `'-'` as a unary operator.

Return `true` if you can get such expression that evaluates to `24`, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: cards = [4,1,8,7]
Output: true
Explanation: (8-4) * (7-1) = 24
```

### Example 2

```text
Input: cards = [1,2,1,2]
Output: false
```

---

## Constraints

- `cards.length == 4`
- `1 <= cards[i] <= 9`

---

## Problem Understanding

- We have exactly $4$ numbers. At each operation, any two numbers can be selected and combined using one of $+$, $-$, $	imes$, $/$.
- Since real division is used, results can be fractional (e.g., $4 / (1 - 2/3) = 12$).
- Equality to $24$ must be checked within floating-point tolerance ($|val - 24| < 10^{-6}$).

---

## Approach

### Optimized Approach (Backtracking / Depth-First Search)

1. Convert card values to a list of `Double`.
2. Define a recursive helper `dfs(nums)`:
   - **Base case:** If `nums.size() == 1`, return `Math.abs(nums.get(0) - 24) < 1e-6`.
   - For every distinct pair of indices $i 
eq j$:
     - Construct a new list `next` containing all numbers except `nums[i]` and `nums[j]`.
     - Try all four operations:
       - $nums[i] + nums[j]$
       - $nums[i] - nums[j]$
       - $nums[i] 	imes nums[j]$
       - $nums[i] / nums[j]$ (provided $|nums[j]| > 10^{-6}$)
     - For each result, append it to `next` and recursively invoke `dfs(next)`. If true, propagate `true`.
3. Return `false` if all combinations are exhausted without reaching 24.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ — The total number of states is strictly bounded: $4$ numbers have $inom{4}{2} 	imes 6$ initial combinations, leading to $< 10^4$ function calls.
- **Space Complexity:** $O(1)$ — Recursion depth is at most 4.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [67924-game.java](./67924-game.java) |

---

## Key Learnings

- Small combinatorial state spaces can be searched exhaustively via backtracking without complex AST parsing.
- Floating-point arithmetic requires epsilon comparison ($10^{-6}$) to avoid precision errors with division.
