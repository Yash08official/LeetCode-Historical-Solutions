---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Greedy
---

# 3946. Maximum Number of Items From Sale I

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-number-of-items-from-sale-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3946` (`3946`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 2D integer array `items`, where `items[i] = [factori, pricei]` represents the `i^th` item. You are also given an integer `budget`.

There are unlimited copies of each item available for purchase.You may buy any number of copies of any items such that the total cost of the purchased copies is at most `budget`.

After buying items, you may receive free copies according to the following rules:

	- For each item `i` that you bought **at least one copy** of, you receive **one free copy** of every item `j` such that `j != i` and `factori` divides `factorj`.

	- Buying multiple copies of the same item `i` does **not** give additional free copies through item `i`.

	- The same item `j` can be received multiple times for free if it is received from purchases of different item types.

Return the **maximum total number of item copies** you can obtain, including both purchased copies and free copies, while spending at most `budget` on purchased items.

---

## Examples

### Example 1

**Input:** items = [[6,2],[2,6],[3,4]], budget = 9

**Output:** 4

**Explanation:**

	- You can buy 2 copies of item 0 and 1 copy of item 2 for a total cost of `2 * 2 + 4 = 8`, which is not greater than `budget = 9`.

	- Buying item 2 gives 1 free copy of item 0, because `factor2 = 3` divides `factor0 = 6`.

	- You leave with 3 purchased copies and 1 free copy, for a total of 4 item copies.

### Example 2

**Input:** items = [[2,4],[3,2],[4,1],[6,4],[12,4]], budget = 8

**Output:** 10

**Explanation:**

	- You can buy 1 copy of item 0, 1 copy of item 1, and 2 copies of item 2 for a total cost of `4 + 2 + 2 * 1 = 8`.

	- Buying item 0 gives 1 free copy of items 2, 3, and 4.

	- Buying item 1 gives 1 free copy of items 3 and 4.

	- Buying item 2 gives 1 free copy of item 4.

	- Thus, you receive 6 free copies. You leave with 4 purchased copies and 6 free copies, for a total of 10 item copies.

 

**

---

## Constraints

**

	- `1 <= items.length <= 1000`

	- `items[i] = [factori, pricei]`

	- `1 <= factori, pricei <= 1500`

	- `1 <= budget <= 1500`

---

## Problem Understanding

- Maximize the total number of items obtained from a sale within `budget`, where purchasing an item `[factor, price]` yields a bundle count equal to the number of items whose factor is divisible by `factor`, and remaining budget can also be spent greedily on the cheapest item.

---

## Approach

### Optimized Approach (0-1 Knapsack DP + Cheapest-Item Greedy Remainder)
1. Track the minimum item price `mn = Math.min(mn, price)` across all items.
2. For each item `[factor, price]`, count `cnt` = how many items have `jItem[0] % factor == 0`, then update the 1D 0-1 knapsack array `f[j] = Math.max(f[j], f[j - price] + cnt)` for `j` from `budget` down to `price`.
3. After processing all items, evaluate every spent budget `i` in `[0, budget]`: combine the knapsack gain `f[i]` with `(budget - i) / mn` additional items from the remaining budget, returning the maximum.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2 + n \cdot \text{budget})$ where $n = \text{items.length}$.
- **Space Complexity:** $O(\text{budget})$ for the 1D DP array `f`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3946maximum-number-of-items-from-sale-i.java](./3946maximum-number-of-items-from-sale-i.java) |

---

## Key Learnings

- Combining 0-1 knapsack DP for one-time bonus bundles with a post-DP greedy sweep over the leftover budget cleanly handles mixed bounded/unbounded spending.
