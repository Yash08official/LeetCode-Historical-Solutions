---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Greedy
---

# 122. Best Time to Buy and Sell Stock II

**[View Problem on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0122` (`122`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the $i^{\text{th}}$ day.

On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share of the stock at any time. However, you can buy it then immediately sell it on the **same day**.

Find and return *the **maximum profit** you can achieve*.

---

## Examples

### Example 1

```text
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.
```

### Example 2

```text
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Total profit is 4.
```

### Example 3

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
```

---

## Constraints

- `1 <= prices.length <= 3 * 10^4`
- `0 <= prices[i] <= 10^4`

---

## Problem Understanding

- Unlike Problem 121, we can complete as many buy/sell transactions as we like.
- At any given day, we are in one of two states:
  1. Holding a share of stock.
  2. Not holding any stock (cash only).

---

## Approach

### Optimized Approach (2-State Dynamic Programming with Rolling Array)

1. Define DP states:
   - `f[0]`: Maximum profit on current day holding a share of stock.
   - `f[1]`: Maximum profit on current day holding no stock.
2. Initialize base case (day 0):
   - `f = [-prices[0], 0]`.
3. For each day $i$ from $1$ to $n - 1$:
   - Transition to next state `g`:
     - `g[0] = Math.max(f[0], f[1] - prices[i])` (keep holding or buy today).
     - `g[1] = Math.max(f[1], f[0] + prices[i])` (keep empty or sell today).
   - Update `f = g`.
4. Return `f[1]` (maximum profit holding no stock at the end).

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Linear scan evaluating 2 constant-time transitions per day.
- **Space Complexity:** $O(1)$ — Rolling 2-element array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [122best-time-to-buy-and-sell-stock-ii.java](./122best-time-to-buy-and-sell-stock-ii.java) |

---

## Key Learnings

- Explicit state machines with rolling variables generalize seamlessly to stock trading problems with cooldowns, transaction fees, and limits.
