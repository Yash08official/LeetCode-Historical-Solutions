---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Knapsack Problem
  - Complete Knapsack
---

# 518. Coin Change II

**[View Problem on LeetCode](https://leetcode.com/problems/coin-change-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0518` (`518`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Knapsack Problem`, `Complete Knapsack` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return *the number of combinations that make up that amount*. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin.

The **final** answer is **guaranteed** to fit into a signed **32-bit** integer.

---

## Examples

### Example 1

```
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

### Example 2

```
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
```

### Example 3

```
Input: amount = 10, coins = [10]
Output: 1
```

 

**

---

## Constraints

**

	- `1 <= coins.length <= 300`

	- `1 <= coins[i] <= 5000`

	- All the values of `coins` are **unique**.

	- `0 <= amount <= 5000`

---

## Problem Understanding

- Count the total number of coin combinations (order does not matter) that sum up to `amount`, given unlimited supplies of each denomination in `coins`.

---

## Approach

### Optimized Approach (1D Complete / Unbounded Knapsack DP)
1. Let `f[j]` be the number of unordered combinations summing to `j`, initialized with `f[0] = 1`.
2. Place **coins in the outer loop** and iterate target sum `j` **forwards** from `x` to `amount` (`f[j] += f[j - x]`).
3. Outer-coin iteration guarantees each coin type is considered in fixed order (counting combinations, not permutations), while forward iteration allows unlimited reuse of coin `x`.

---

## Complexity Analysis

- **Time Complexity:** $O(\text{coins.length} \times \text{amount})$.
- **Space Complexity:** $O(\text{amount})$ for the 1D DP array `f`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [518coin-change-ii.java](./518coin-change-ii.java) |

---

## Key Learnings

- In unbounded knapsack counting problems, `coins` in the outer loop yields **combinations**, whereas `amount` in the outer loop yields **permutations**.
