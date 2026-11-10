---
comments: true
difficulty: Easy
tags:
  - Array
  - Dynamic Programming
---

# 121. Best Time to Buy and Sell Stock

**[View Problem on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0121` (`121`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the $i^{\text{th}}$ day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.

---

## Examples

### Example 1

```text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

### Example 2

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

---

## Constraints

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

---

## Problem Understanding

- We must pick two days $i < j$ to maximize `prices[j] - prices[i]`.
- If prices strictly decrease, maximum profit is 0.
- For every day $j$, the optimal day to have bought is the minimum price observed in `prices[0 .. j-1]`.

---

## Approach

### Optimized Approach (Single-Pass Greedy Running Minimum)

1. Maintain `ans = 0` (maximum profit) and `mi = prices[0]` (minimum price seen so far).
2. Iterate through each price `v` in `prices`:
   - Calculate potential profit: `ans = Math.max(ans, v - mi)`.
   - Update minimum purchase price: `mi = Math.min(mi, v)`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass through the `prices` array.
- **Space Complexity:** $O(1)$ — Constant extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [121best-time-to-buy-and-sell-stock.js](./121best-time-to-buy-and-sell-stock.js) |

---

## Key Learnings

- Tracking a prefix minimum value transforms an $O(N^2)$ brute-force pair comparison into an optimal $O(N)$ single-pass greedy scan.
