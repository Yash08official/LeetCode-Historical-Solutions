---
comments: true
difficulty: Medium
tags:
  - Math
  - Dynamic Programming
  - Bit Manipulation
  - Memoization
  - Game Theory
  - Bitmask
---

# 464. Can I Win

**[View Problem on LeetCode](https://leetcode.com/problems/can-i-win/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0464` (`464`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Bit Manipulation`, `Memoization`, `Game Theory`, `Bitmask` |
| **Solution Language** | Java |

---

## Problem Description

In the "100 game" two players take turns adding, to a running total, any integer from `1` to `10`. The player who first causes the running total to **reach or exceed** 100 wins.

What if we change the game so that players **cannot** re-use integers?

For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

Given two integers `maxChoosableInteger` and `desiredTotal`, return `true` if the first player to move can force a win, otherwise, return `false`. Assume both players play **optimally**.

---

## Examples

### Example 1

```
Input: maxChoosableInteger = 10, desiredTotal = 11
Output: false
Explanation:
No matter which integer the first player choose, the first player will lose.
The first player can choose an integer from 1 up to 10.
If the first player choose 1, the second player can only choose integers from 2 up to 10.
The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.
Same with other integers chosen by the first player, the second player will always win.
```

### Example 2

```
Input: maxChoosableInteger = 10, desiredTotal = 0
Output: true
```

### Example 3

```
Input: maxChoosableInteger = 10, desiredTotal = 1
Output: true
```

 

**

---

## Constraints

**

	- `1 <= maxChoosableInteger <= 20`

	- `0 <= desiredTotal <= 300`

---

## Problem Understanding

- Two players alternate picking unused integers from `1..maxChoosableInteger` without replacement, adding them to a shared running total. Determine whether the first player can force reaching or exceeding `desiredTotal`.

---

## Approach

### Optimized Approach (Bitmask Game-Theory DFS with Memoization)
1. First check feasibility: if the sum of all integers $\frac{M(M+1)}{2} < \text{desiredTotal}$, neither player can ever win, so return `false`.
2. Represent the set of already-chosen integers as a bitmask `mask` (`0` to `2^M - 1`); the running sum `s` is uniquely determined by `mask`.
3. In `dfs(mask, s)`, try every unused integer `i + 1`: if `s + i + 1 >= desiredTotal` (immediate win) or the opponent loses from the next state (`!dfs(mask | (1 << i), s + i + 1)`), memoize `true` in `f` and return `true`. Otherwise memoize and return `false`.

---

## Complexity Analysis

- **Time Complexity:** $O(M \cdot 2^M)$ where $M = \text{maxChoosableInteger} \le 20$.
- **Space Complexity:** $O(2^M)$ for the memoization map `f` and $O(M)$ recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [464can-i-win.java](./464can-i-win.java) |

---

## Key Learnings

- Because `s` is a pure function of `mask`, memoizing solely by `mask` avoids redundant state dimensions in impartial two-player games.
