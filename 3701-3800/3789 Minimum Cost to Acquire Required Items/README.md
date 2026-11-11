---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Greedy
---

# 3789. Minimum Cost to Acquire Required Items

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-cost-to-acquire-required-items/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3789` (`3789`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given five integers cost1, cost2, costBoth, need1, and need2.

There are three types of items available:


	An item of type 1 costs cost1 and contributes 1 unit to the type 1 requirement only.
	An item of type 2 costs cost2 and contributes 1 unit to the type 2 requirement only.
	An item of type 3 costs costBoth and contributes 1 unit to both type 1 and type 2 requirements.


You must collect enough items so that the total contribution toward type 1 is at least need1 and the total contribution toward type 2 is at least need2.

Return an integer representing the minimum possible total cost to achieve these requirements.

 
Example 1:


Input: cost1 = 3, cost2 = 2, costBoth = 1, need1 = 3, need2 = 2

Output: 3

Explanation:

After buying three type 3 items, which cost 3 * 1 = 3, the total contribution to type 1 is 3 (>= need1 = 3) and to type 2 is 3 (>= need2 = 2).
Any other valid combination would cost more, so the minimum total cost is 3.


Example 2:


Input: cost1 = 5, cost2 = 4, costBoth = 15, need1 = 2, need2 = 3

Output: 22

Explanation:

We buy need1 = 2 items of type 1 and need2 = 3 items of type 2: 2 * 5 + 3 * 4 = 10 + 12 = 22.
Any other valid combination would cost more, so the minimum total cost is 22.


Example 3:


Input: cost1 = 5, cost2 = 4, costBoth = 15, need1 = 0, need2 = 0

Output: 0

Explanation:

Since no items are required (need1 = need2 = 0), we buy nothing and pay 0.


 
Constraints:


	1 <= cost1, cost2, costBoth <= 106
	0 <= need1, need2 <= 109

---

## Problem Understanding

- We need `need1` units of item 1 and `need2` units of item 2.
- Item 1 costs `cost1`, item 2 costs `cost2`, and a bundle containing one of each costs `costBoth`.
- We evaluate the three viable acquisition strategies: buy individually, buy entirely via bundles, or buy shared minimum via bundles and remainder individually.

---

## Approach

### Optimized Approach (Greedy Cost Evaluation)

1. Strategy A (Buy individually): $a = \text{need1} \times \text{cost1} + \text{need2} \times \text{cost2}$.
2. Strategy B (Buy all as bundles): $b = \text{costBoth} \times \max(\text{need1}, \text{need2})$.
3. Strategy C (Buy shared min as bundles, remainder individually):
   - $mn = \min(\text{need1}, \text{need2})$.
   - $c = \text{costBoth} \times mn + (\text{need1} - mn) \times \text{cost1} + (\text{need2} - mn) \times \text{cost2}$.
4. Return $\min(a, b, c)$ using 64-bit integer arithmetic to prevent overflow.

---

## Dry Run

If cost1 = 5, cost2 = 6, costBoth = 8, need1 = 3, need2 = 2:
- $a = 3 \times 5 + 2 \times 6 = 27$.
- $b = 8 \times 3 = 24$.
- $c = 8 \times 2 + 1 \times 5 = 21$.
Optimal cost is 21.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ — Arithmetic evaluations.
- **Space Complexity:** $O(1)$ auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3789minimum-cost-to-acquire-required-items.java](./3789minimum-cost-to-acquire-required-items.java) |

---

## Key Learnings

- Evaluating all three possible boundary cost frontiers directly solves bundle purchase optimization in $O(1)$ time without linear programming.
