---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 309. Best Time to Buy and Sell Stock with Cooldown

**[View Problem on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0309` (`309`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i^th` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

	
- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

---

## Examples

### Example 1

```text
**Input:** prices = [1,2,3,0,2]
**Output:** 3
**Explanation:** transactions = [buy, sell, cooldown, buy, sell]
```

### Example 2

```text
**Input:** prices = [1]
**Output:** 0
```

 

**

---

## Constraints

**

	
- `1 <= prices.length <= 5000`
	
- `0 <= prices[i] <= 1000`

---

## Problem Understanding

- Maximize stock trading profit with unlimited transactions and a mandatory 1-day cooldown after selling.

---

## Approach

### Optimized Approach (Top-Down Memoized DP)
1. Define `dfs(i, j)` as max profit starting on day `i` with holding state `j` (`0` = not holding, `1` = holding).
2. Choices: skip day (`dfs(i + 1, j)`), buy when `j == 0` (`-prices[i] + dfs(i + 1, 1)`), or sell when `j == 1` (`prices[i] + dfs(i + 2, 0)` skipping the cooldown day).
3. Memoize results in `Integer[][] f`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — $2n$ unique states.\n- **Space Complexity:** $O(n)$ memoization table and recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [309best-time-to-buy-and-sell-stock-with-cooldown.java](./309best-time-to-buy-and-sell-stock-with-cooldown.java) |

---

## Key Learnings

- Modeling cooldown simply as jumping `i + 2` after a sale makes state-machine DP effortless.
