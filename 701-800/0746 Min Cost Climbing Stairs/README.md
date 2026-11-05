---
comments: true
difficulty: Easy
tags:
  - Array
  - Dynamic Programming
---

# 746. Min Cost Climbing Stairs

**[View Problem on LeetCode](https://leetcode.com/problems/min-cost-climbing-stairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0746` (`746`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `cost` where `cost[i]` is the price of stepping onto the `i`-th stair (`0`-indexed). Once you pay `cost[i]`, you can climb either **`1`** or **`2`** steps upward.

You may begin your climb at either index `0` or index `1`. Return the minimum total cost required to reach the **top of the floor**, which lies at index `cost.length` (one position past the last stair).

---

## Examples

### Example 1

```text
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

### Example 2

```text
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
```

---

## Constraints

- `2 <= cost.length <= 1000`

- `0 <= cost[i] <= 999`

---

## Problem Understanding

- Reaching index `i >= cost.length` means we have cleared the staircase and incur `0` additional cost.
- Starting at step `0` or step `1` is free until we step onto it and pay `cost[0]` or `cost[1]` to jump further, so the overall answer is `min(minCostFrom(0), minCostFrom(1))`.
- Since `0 <= cost[i] <= 999`, every valid cumulative cost is non-negative (`>= 0`), making `-1` a safe sentinel value for uncomputed memo slots.

---

## Approach

### Brute Force Approach

A plain recursive function `dfs(i) = cost[i] + min(dfs(i + 1), dfs(i + 2))` recomputes `dfs(i + 2)`, `dfs(i + 3)`, and so on exponentially many times (forming a Fibonacci-like recursion tree of size `O(2^n)`), which times out well before `n = 1000`.

### Optimized Approach

Use **top-down memoized recursion (`dfs`)** with a cache array `f` of size `n` initialized to `-1`, computing `f[i] = cost[i] + Math.min(dfs(i + 1), dfs(i + 2))` once per stair and returning `Math.min(dfs(0), dfs(1))`.

### Step-by-Step Thinking Process

1. Define `dfs(i)` as the minimum cost to reach the top (`>= n`) starting from stair `i`.
2. Base case: if `i >= n`, we have already reached the top of the staircase, so return `0`.
3. Recurrence: from stair `i`, we must pay `cost[i]` and then choose the cheaper of landing on `i + 1` or `i + 2`: `cost[i] + Math.min(dfs(i + 1), dfs(i + 2))`.
4. Cache results in `f = Array(n).fill(-1)`, recomputing only when `f[i] < 0`.
5. Because we may start from stair `0` or stair `1`, return `Math.min(dfs(0), dfs(1))`.

### Algorithm / Intuition

In `minCostClimbingStairs(cost)`:
- `f` starts as `[-1, -1, ..., -1]`. Because `cost[i] >= 0`, any computed `f[i]` satisfies `f[i] >= 0`, so `if (f[i] < 0)` reliably detects whether stair `i` has been solved.
- When `dfs(0)` runs, it recursively populates `f[n - 1], f[n - 2], ..., f[0]`. Notice that when `dfs(1)` is subsequently called in `Math.min(dfs(0), dfs(1))`, `f[1]` is **already cached** and returns in `O(1)`!

---

## Dry Run

Trace on **Example 1**: `cost = [10, 15, 20]` (`n = 3`, `f = [-1, -1, -1]`).

1. Call `dfs(0)`:
   - Calls `dfs(1)` -> calls `dfs(2)`:
     - `dfs(3)` returns `0` (`3 >= 3`); `dfs(4)` returns `0` (`4 >= 3`).
     - `f[2] = cost[2] + Math.min(0, 0) = 20 + 0 = 20`.
   - Back in `dfs(1)`: `dfs(3)` returns `0`. `f[1] = cost[1] + Math.min(20, 0) = 15 + 0 = 15`.
   - Back in `dfs(0)`: `dfs(2)` returns cached `f[2] = 20`. `f[0] = cost[0] + Math.min(15, 20) = 10 + 15 = 25`.
2. Call `dfs(1)`: immediately returns cached `f[1] = 15`.
3. `Math.min(25, 15)` returns `15`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each stair index `0 .. n - 1` is computed once, doing `O(1)` work per state.
- **Space Complexity:** `O(n)` — Uses an array `f` of length `n` and recursion call stack depth up to `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [746min-cost-climbing-stairs.js](./746min-cost-climbing-stairs.js) |

---

## Key Learnings

- Memoization collapses exponential Fibonacci-style branching trees (`dfs(i + 1)` and `dfs(i + 2)`) into `O(n)` linear time.
- Always verify value constraints (`cost[i] >= 0`) before using `-1` as an unvisited sentinel in DP arrays.
- Just like Fibonacci, this recurrence can also be rolled into two variables in `O(1)` space using bottom-up iteration.
