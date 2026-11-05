---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
---

# 188. Best Time to Buy and Sell Stock IV

**[View Problem on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0188` (`188`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer `k` and an array `prices` where `prices[i]` is a stock's price on day `i` (`0`-indexed). Find and return the **maximum total profit** achievable using **at most `k` buy-sell transactions**.

You may hold at most one share of stock at a time—you must sell your current share before buying again.

---

## Examples

### Example 1

```text
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
```

### Example 2

```text
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
```

---

## Constraints

- `1 <= k <= 100`

- `1 <= prices.length <= 1000`

- `0 <= prices[i] <= 1000`

---

## Problem Understanding

- **Transaction Counting Convention:** Each complete buy-sell pair counts as `1` transaction. Decrementing the remaining transaction budget either on **buy** (as done here) or on **sell** (never both!) accurately caps completed trades at `k`.
- **Three State Dimensions:** On day `i`, our optimal future decisions depend on: (1) current day `i` (`0..n-1`), (2) how many new buys `j` (`0..k`) we are still allowed to initiate, and (3) whether we currently hold a share (`0` = empty-handed, `1` = holding).
- **Parameter Naming Note in Solution:** Notice carefully that `maxProfit(int k, int[] prices)` passes the max transactions `k` into parameter `j` of `dfs(0, k, 0)`, while inside `dfs(int i, int j, int k)` the local parameter `k` (`0` or `1`) represents the **holding flag**!

---

## Approach

### Brute Force Approach

Recursively branching on every day between doing nothing vs. buying/selling without caching revisits identical `(day, remainingTransactions, holdingState)` states exponentially many times, taking `O(2^n)` time for `n <= 1000`.

### Optimized Approach

Use **Top-Down Memoized DFS (3D Dynamic Programming)** with memo table `Integer[][][] f = new Integer[n][k + 1][2]`, caching the maximum profit from day `i` onward given `j` remaining buys and holding state `k` (`0` or `1`).

### Step-by-Step Thinking Process

1. Define `dfs(i, j, hold)` (named `dfs(i, j, k)` in code) as the max net cashflow achievable across days `i..n-1` starting with `j` remaining buys and holding state `k` (`0` or `1`).
2. Base case: when `i >= n`, no trading days remain, so return `0`.
3. Memoization check: if `f[i][j][k] != null`, return the cached `Integer` immediately.
4. Transition 1 (Rest / Skip day `i`): `ans = dfs(i + 1, j, k)`.
5. Transition 2 (Trade on day `i`): if currently holding (`k > 0`), we can **sell** for `+prices[i]` and move to `dfs(i + 1, j, 0)`; otherwise if not holding (`k == 0`) and `j > 0`, we can **buy** for `-prices[i]`, spend `1` transaction (`j - 1`), and move to `dfs(i + 1, j - 1, 1)`.

### Algorithm / Intuition

Modeling buying as `-prices[i]` cashflow and selling as `+prices[i]` cashflow avoids having to remember *what price* we originally bought at! Why? Because `(sellPrice - buyPrice)` splits additively across days as `-buyPrice` on the buy day plus `+sellPrice` on the sell day. And what if the recursion buys a stock and reaches `i == n` without ever selling it? That branch pays `-prices[buyDay] + 0`, which is always dominated by the "skip buying" branch (`0`), since `prices[buyDay] >= 0`. Using boxed `Integer[][][] f` lets `null` distinguish unvisited states from valid `0`-profit states without needing `Arrays.fill(..., -1)`.

---

## Dry Run

Trace on **Example 1**: `k = 2`, `prices = [2, 4, 1]` (`n = 3`), starting at `dfs(0, 2, 0)`

- At day `0` (`price = 2`, `j = 2`, `hold = 0`):
  - **Option A (Skip day 0):** `dfs(1, 2, 0)`
    - Buying at day `1` (`price = 4`) and selling at day `2` (`price = 1`) gives `-4 + 1 = -3` (worse than skipping all -> `0`). So `dfs(1, 2, 0) = 0`.
  - **Option B (Buy day 0 for `-2`):** `-2 + dfs(1, 1, 1)`
    - At day `1` (`price = 4`, `j = 1`, `hold = 1`):
      - Keep holding: `dfs(2, 1, 1)` -> best at day `2` (`price = 1`) is selling for `+1` (`> 0`), returning `1`.
      - **Sell day 1 for `+4`:** `4 + dfs(2, 1, 0)` -> at day `2` (`price = 1`), buying (`-1 + 0 = -1`) loses to skipping (`0`), so `dfs(2, 1, 0) = 0` -> total `4 + 0 = 4`.
    - Thus `dfs(1, 1, 1) = max(1, 4) = 4`.
  - `dfs(0, 2, 0) = max(0, -2 + 4) = 2`.

Returns `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * k)` — There are `n * (k + 1) * 2` unique states in `f`, and each state evaluates at most two `O(1)` recursive transitions once.
- **Space Complexity:** `O(n * k)` — The memoization table `Integer[n][k + 1][2]` uses `O(n * k)` space, plus `O(n)` call-stack depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [188best-time-to-buy-and-sell-stock-iv.java](./188best-time-to-buy-and-sell-stock-iv.java) |

---

## Key Learnings

- Splitting transaction profit `prices[sell] - prices[buy]` into `-prices[buy]` on purchase and `+prices[sell]` on sale eliminates `prices[buy]` from the DP state—shrinking complexity from `O(n^2 * k)` to `O(n * k)`!
- Using boxed `Integer` arrays in Java provides built-in `null` memoization markers, saving manual sentinel initialization.
- Decrement `j` on **either** buy or sell (not both), and note that since at most `n / 2` non-overlapping transactions fit in `n` days, `k` can also be clamped to `Math.min(k, n / 2)`.
