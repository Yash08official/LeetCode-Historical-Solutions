---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
---

# 123. Best Time to Buy and Sell Stock III

**[View Problem on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0123` (`123`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `prices` where `prices[i]` is the stock price on day `i`, return the **maximum total profit** you can earn by completing **at most two** buy-sell transactions.

You may not hold more than one share of stock at a time — you must sell your current share before buying again.

---

## Examples

### Example 1

```text
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
```

### Example 2

```text
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
```

### Example 3

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

---

## Constraints

- `1 <= prices.length <= 10^5`

- `0 <= prices[i] <= 10^5`

---

## Problem Understanding

- You can perform `0`, `1`, or `2` transactions.
- At any day `i`, your trading lifecycle sits in one of five conceptual stages: nothing done (`0`), holding 1st stock (`f1`), sold 1st stock (`f2`), holding 2nd stock (`f3`), or sold 2nd stock (`f4`).
- Notice that `prices.length <= 10^5`, so an `O(n^2)` split-point algorithm (running Best Time to Buy and Sell Stock I on `[0..k]` and `[k+1..n-1]` for every `k`) is too slow unless precomputed with prefix/suffix arrays or solved directly with a 4-variable state machine.

---

## Approach

### Brute Force Approach

Trying every pair of non-overlapping intervals `[b1, s1]` and `[b2, s2]` (`0 <= b1 < s1 < b2 < s2 < n`) takes `O(n^4)` time, or `O(n^2)` if choosing a partition point `k` and scanning `[0..k]` and `[k+1..n-1]` naively on each split — timing out for `n = 10^5`.

### Optimized Approach

Maintain a **4-variable State-Machine DP** (`f1`, `f2`, `f3`, `f4`) tracking the best net cash balance after the 1st buy, 1st sell, 2nd buy, and 2nd sell across a single `O(n)` pass in `O(1)` space.

### Step-by-Step Thinking Process

1. Define four scalar DP states:
  - `f1`: maximum cash balance after buying the 1st stock (`<= 0` or negative cost).
  - `f2`: maximum cash balance (profit) after selling the 1st stock.
  - `f3`: maximum cash balance after buying the 2nd stock using profit from `f2`.
  - `f4`: maximum cash balance (total profit) after selling the 2nd stock.
2. Initialize on day `0`: `f1 = -prices[0]`, `f2 = 0`, `f3 = -prices[0]`, `f4 = 0` (modeling virtual same-day zero-profit buy+sell so `f4` naturally covers 0, 1, or 2 transactions).
3. For each day `i` from `1` to `n - 1`, update `f1`, `f2`, `f3`, `f4` in order.
4. Observe why updating sequentially on day `i` without temp variables is valid: if `f1` updates to `-prices[i]`, `f1 + prices[i] = 0`, which never exceeds `f2 >= 0`; similarly if `f3` updates to `f2 - prices[i]`, `f3 + prices[i] = f2`, which simply carries 1-transaction profit `f2` into `f4`!
5. Return `f4` at the end of the array.

### Algorithm / Intuition

In `maxProfit(int[] prices)`, think of `f1, f2, f3, f4` as your wallet balance (starting at `0` dollars):
- Buying a stock on day `i` subtracts `prices[i]` from your wallet.
- Selling a stock on day `i` adds `prices[i]` to your wallet.

On each day `i >= 1`:
- `f1 = Math.max(f1, -prices[i]);` — keep our earlier 1st stock, or buy 1st stock cheaper today.
- `f2 = Math.max(f2, f1 + prices[i]);` — keep earlier 1st-sale profit, or sell our 1st stock today.
- `f3 = Math.max(f3, f2 - prices[i]);` — keep earlier 2nd stock, or reinvest `f2` to buy a 2nd stock today.
- `f4 = Math.max(f4, f3 + prices[i]);` — keep earlier 2nd-sale profit, or sell our 2nd stock today.

Because same-day buy-and-sell cancels out (`-prices[i] + prices[i] = 0`), `f4` automatically equals the maximum over **0, 1, or 2** real transactions!

---

## Dry Run

Tracing Example 1 with `prices = [3, 3, 5, 0, 0, 3, 1, 4]`:

| Day `i` | `prices[i]` | `f1` (1st Buy) | `f2` (1st Sell) | `f3` (2nd Buy) | `f4` (2nd Sell) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` (init) | `3` | `-3` | `0` | `-3` | `0` |
| `1` | `3` | `-3` | `0` | `-3` | `0` |
| `2` | `5` | `-3` | `2` (`-3+5`) | `-3` | `2` (`-3+5`) |
| `3` | `0` | `0` (`-0`) | `2` | `2` (`2-0`) | `2` (`2+0`) |
| `4` | `0` | `0` | `2` | `2` | `2` |
| `5` | `3` | `0` | `3` (`0+3`) | `2` | `5` (`2+3`) |
| `6` | `1` | `0` | `3` | `2` (`3-1`) | `5` |
| `7` | `4` | `0` | `4` (`0+4`) | `2` | **`6`** (`2+4`) |

Returns `f4 = 6` (buy at `0` on day `3/4`, sell at `3` on day `5` -> `+3`; buy at `1` on day `6`, sell at `4` on day `7` -> `+3`; total `6`).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates through `prices` once from index `1` to `n - 1` with four `O(1)` `Math.max` updates per day.
- **Space Complexity:** `O(1)` — Uses only four integer variables (`f1`, `f2`, `f3`, `f4`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [123best-time-to-buy-and-sell-stock-iii.java](./123best-time-to-buy-and-sell-stock-iii.java) |

---

## Key Learnings

- Modeling stock trading via **wallet cash balance** (`-price` on buy, `+price` on sell) turns multi-transaction DP into clean symmetric `Math.max` transitions.
- Allowing virtual zero-profit same-day buy-sell transitions merges the `0`, `1`, and `2` transaction cases into a single final variable `f4`.
- This exact pattern generalizes directly to **Best Time to Buy and Sell Stock IV** (at most `k` transactions) using `buy[1..k]` and `sell[1..k]` arrays.
