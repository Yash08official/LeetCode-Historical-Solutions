---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Backtracking
  - Knapsack Problem
  - 0-1 Knapsack
---

# 494. Target Sum

**[View Problem on LeetCode](https://leetcode.com/problems/target-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0494` (`494`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Backtracking`, `Knapsack Problem`, `0-1 Knapsack` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and an integer `target`, you must place either `'+'` or `'-'` in front of every element in `nums` so that the resulting arithmetic expression evaluates to `target`.

Return the **number of distinct sign assignments** that evaluate to `target`.

---

## Examples

### Example 1

```text
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

### Example 2

```text
Input: nums = [1], target = 1
Output: 1
```

---

## Constraints

- `1 <= nums.length <= 20`

- `0 <= nums[i] <= 1000`

- `0 <= sum(nums[i]) <= 1000`

- `-1000 <= target <= 1000`

---

## Problem Understanding

- **Algebraic reduction to 0-1 Knapsack:** Partition `nums` into two subsets: `P` (elements given `'+'`) and `N` (elements given `'-'`). If `s = sum(nums)` is the total sum, then `sum(P) + sum(N) = s` and `sum(P) - sum(N) = target`. Subtracting the second equation from the first gives `2 * sum(N) = s - target`, or `sum(N) = (s - target) / 2`!
- **Feasibility checks:** Since all `nums[i] >= 0`, `sum(N)` must be a non-negative integer. If `s < target` (making `s - target < 0`) or `(s - target)` is odd, no valid assignment exists (`return 0`). (And if `target < -s`, then `n = (s - target) / 2 > s`; no subset of `nums` can sum to `n > s`, so `f[m][n]` naturally evaluates to `0`.)
- **Zero elements (`nums[i] == 0`):** Assigning `+0` and `-0` count as **two distinct expressions**! Starting inner loop `j` from `0` ensures `j >= 0` holds when `nums[i - 1] == 0`, doubling `f[i][j] = f[i - 1][j] + f[i - 1][j]` automatically.

---

## Approach

### Brute Force Approach

Exploring both `'+'` and `'-'` branches recursively at every index `0 .. m - 1` without memoization visits `2^m` leaf states.

For `m = 20`, `2^20 = 1,048,576` passes barely, but scales exponentially (`O(2^m)`) instead of exploiting bounded subset sums (`sum <= 1000`).

### Optimized Approach

Transform into **Subset-Sum Counting (2D 0-1 Knapsack DP)**: count the number of subsets of `nums` summing to `n = (s - target) / 2` using a 2D table `f[m + 1][n + 1]`.

### Step-by-Step Thinking Process

1. Compute total sum `s = Arrays.stream(nums).sum()`.
2. If `s < target` or `(s - target) % 2 != 0`, return `0` immediately because `(s - target) / 2` cannot be a non-negative integer.
3. Set `m = nums.length` and `n = (s - target) / 2`. Now the problem asks: how many subsets of `nums` sum to `n`?
4. Define `f[i][j]` as the number of ways to choose a subset from the first `i` elements (`nums[0 .. i - 1]`) whose sum equals `j`, with base case `f[0][0] = 1`.
5. For each element `i` (`1..m`) and capacity `j` (`0..n`), we can either exclude `nums[i - 1]` (`f[i - 1][j]`) or—when `j >= nums[i - 1]`—include it (`f[i - 1][j - nums[i - 1]]`). Return `f[m][n]`.

### Algorithm / Intuition

In `findTargetSumWays(int[] nums, int target)`:
- `n = (s - target) / 2` represents the exact sum of elements that must receive a `'-'` sign.
- `f[0][0] = 1` represents the 1 way to form sum `0` using zero elements.
- Notice the inner loop starts at `j = 0` (`for (int j = 0; j <= n; ++j)`): if `nums[i - 1] == 0`, then even at `j = 0`, `j >= nums[i - 1]` (`0 >= 0`) is `true`, so `f[i][0]` becomes `f[i - 1][0] + f[i - 1][0] = 2 * f[i - 1][0]`, accurately counting both `+0` and `-0`!

---

## Dry Run

Tracing **Example 1** with `nums = [1, 1, 1, 1, 1]` and `target = 3`:

1. `s = 5`. `5 < 3` is `false`, `(5 - 3) % 2 == 0`.
2. `m = 5`, `n = (5 - 3) / 2 = 1`.
3. Initialize `f[6][2]` with `f[0] = [1, 0]`.
4. Fill rows `i = 1..5` (each `nums[i - 1] = 1`):
   - `i = 1`: `f[1][0] = 1`, `f[1][1] = 0 + 1 = 1` -> `[1, 1]`
   - `i = 2`: `f[2][0] = 1`, `f[2][1] = 1 + 1 = 2` -> `[1, 2]`
   - `i = 3`: `f[3][0] = 1`, `f[3][1] = 2 + 1 = 3` -> `[1, 3]`
   - `i = 4`: `f[4][0] = 1`, `f[4][1] = 3 + 1 = 4` -> `[1, 4]`
   - `i = 5`: `f[5][0] = 1`, `f[5][1] = 4 + 1 = 5` -> `[1, 5]`

Returns `f[5][1] = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Where `m = nums.length` and `n = (s - target) / 2 <= 1000` (at most `20 * 1000 = 20,000` iterations).
- **Space Complexity:** `O(m * n)` — Allocated for the 2D DP table `int[][] f = new int[m + 1][n + 1]` (reducible to `O(n)` with a 1D rolling array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [494target-sum.java](./494target-sum.java) |

---

## Key Learnings

- Any +/- sign-assignment problem over an array with known sum `s` reduces via `P + N = s` and `P - N = target` to standard 0-1 Subset Sum.
- Starting capacity `j` from `0` (rather than `1`) is critical whenever elements can be `0`, since `+0` and `-0` double the count of valid expressions.
- Adding an explicit `Math.abs(target) > s` guard is good defensive practice so negative `target` values below `-s` return `0` without allocating an oversized array.
