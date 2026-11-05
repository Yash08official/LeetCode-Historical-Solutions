---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Greedy
---

# 714. Best Time to Buy and Sell Stock with Transaction Fee

**[View Problem on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0714` (`714`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `prices`, where `prices[i]` represents a stock's price on day `i`, along with a non-negative integer `fee` charged once per completed buy-sell transaction.

You may execute any number of transactions to maximize total profit, provided you never hold more than one share of stock at a time (you must sell your current share before buying again). Return the maximum achievable profit.

---

## Examples

### Example 1

```text
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```

### Example 2

```text
Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6
```

---

## Constraints

- `1 <= prices.length <= 5 * 10^4`

- `1 <= prices[i] < 5 * 10^4`

- `0 <= fee < 5 * 10^4`

---

## Problem Understanding

- On any day `i`, our decision depends only on the day index `i` and a binary state `j` indicating whether we currently hold a share (`j = 1`) or do not hold a share (`j = 0`).
- A transaction fee `fee` is paid once per buy-sell cycle; deducting `fee` at the moment of selling (`prices[i] - fee`) cleanly accounts for each completed cycle.
- You are never forced to sell at a loss if holding until the end — simply doing nothing until `i == prices.length` yields `0` future value, so an unprofitable buy will naturally be outperformed by never buying in the first place.

---

## Approach

### Brute Force Approach

A naive recursive search branches on every day `i` between skipping the day or toggling the holding state (buying/selling) without caching intermediate results. Because both paths reconverge on identical `(day, holding)` states, unmemoized recursion explores `O(2^n)` paths and times out for `n <= 5 * 10^4`.

### Optimized Approach

Use **top-down Dynamic Programming (memoized DFS)** over state `(i, j)`, caching the maximum profit achievable from day `i` onward in a `prices.length x 2` table `f` where `j = 0` means no stock held and `j = 1` means one share held.

### Step-by-Step Thinking Process

1. Model the problem as a state machine over days `i = 0 .. prices.length - 1` with holding flag `j in {0, 1}`.
2. Define `dfs(i, j)` as the maximum net cash flow achievable from day `i` to the end given state `j`.
3. Base case: when `i >= prices.length`, no further trades can occur, so return `0`.
4. At day `i`, we can always choose to rest, earning `dfs(i + 1, j)`.
5. If `j > 0` (currently holding), we can also sell today for `+prices[i] - fee` and transition to `dfs(i + 1, 0)`. If `j === 0` (not holding), we can buy today for `-prices[i]` and transition to `dfs(i + 1, 1)`.
6. Store each computed answer in `f[i][j]` so every `(i, j)` pair is evaluated at most once.

### Algorithm / Intuition

In `maxProfit(prices, fee)`:
- `f` is allocated as an `n x 2` 2D array filled with `null` to distinguish unvisited states from states whose optimal profit happens to be `0`.
- `dfs(i, j)` first checks `i >= prices.length` (returns `0`) and `f[i][j] !== null` (returns cached result).
- `ans` starts as `dfs(i + 1, j)` (skipping day `i`).
- When `j > 0`, `ans` is compared with `prices[i] + dfs(i + 1, 0) - fee` (selling and paying the fee).
- When `j === 0`, `ans` is compared with `-prices[i] + dfs(i + 1, 1)` (buying a share).
- Starting from day `0` with no stock held, `dfs(0, 0)` returns the overall maximum profit.

---

## Dry Run

Trace on **Example 1**: `prices = [1, 3, 2, 8, 4, 9]`, `fee = 2` (evaluating memoized states bottom-up as recursion unwinds):

| Day `i` | `prices[i]` | `f[i][0]` (Not Holding) | `f[i][1]` (Holding) | Optimal Action from `(i, 0)` / `(i, 1)` |
| :--- | :--- | :--- | :--- | :--- |
| `5` | `9` | `max(0, -9 + 0) = 0` | `max(0, 9 + 0 - 2) = 7` | Skip / Sell at `9` (`+7`) |
| `4` | `4` | `max(0, -4 + 7) = 3` | `max(7, 4 + 0 - 2) = 7` | Buy at `4` / Hold |
| `3` | `8` | `max(3, -8 + 7) = 3` | `max(7, 8 + 3 - 2) = 9` | Hold cash / Sell at `8` (`+6 + 3 = 9`) |
| `2` | `2` | `max(3, -2 + 9) = 7` | `max(9, 2 + 3 - 2) = 9` | Buy at `2` / Hold |
| `1` | `3` | `max(7, -3 + 9) = 7` | `max(9, 3 + 7 - 2) = 9` | Skip / Hold |
| `0` | `1` | `max(7, -1 + 9) = 8` | *(not queried)* | Buy at `1` (`-1 + 9 = 8`) |

`dfs(0, 0)` returns `8`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — There are `2n` distinct `(i, j)` states (where `n = prices.length`), and each state performs `O(1)` work.
- **Space Complexity:** `O(n)` — The memoization table `f` stores `2n` entries and the recursion call stack reaches depth `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [714best-time-to-buy-and-sell-stock-with-transaction-fee.js](./714best-time-to-buy-and-sell-stock-with-transaction-fee.js) |

---

## Key Learnings

- Stock trading problems with cooldowns, fees, or transaction limits map cleanly onto DP states `(day, holding_status)`.
- Initializing the memo table with `null` rather than `0` avoids recomputing valid states whose maximum profit is `0`.
- Because `f[i]` only depends on `f[i + 1]`, this recurrence can also be written iteratively with just two scalar variables (`cash` and `hold`) in `O(1)` space.
