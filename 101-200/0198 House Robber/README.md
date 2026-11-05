---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 198. House Robber

**[View Problem on LeetCode](https://leetcode.com/problems/house-robber/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0198` (`198`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are planning to rob houses lined up along a street. You are given a 0-indexed integer array `nums`, where `nums[i]` represents the amount of cash stashed in the `i`-th house.

Adjacent houses have connected security alarms: if you break into two adjacent houses (`i` and `i + 1`) on the same night, the police are automatically alerted. Return the maximum total amount of cash you can rob tonight without triggering any alarms.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

### Example 2

```text
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```

---

## Constraints

- `1 <= nums.length <= 100`

- `0 <= nums[i] <= 400`

---

## Problem Understanding

At every house `i`, making a decision affects only the immediate next house `i + 1`:
- If we rob house `i`, we gain `nums[i]` and must skip `i + 1`, continuing from `i + 2`.
- If we skip house `i`, we gain `0` from it and are free to consider house `i + 1`.

Notice the constraints: `1 <= nums.length <= 100` and `0 <= nums[i] <= 400`. Because every house has a non-negative amount, the optimal loot from any suffix is always `>= 0`, which means `-1` can safely serve as an uncomputed sentinel value.

---

## Approach

### Brute Force Approach

A pure recursive search explores both choices (rob `i` and jump to `i + 2`, or skip `i` and move to `i + 1`) at every index without caching results. Because `dfs(i)` calls both `dfs(i + 1)` and `dfs(i + 2)`, subproblems like `dfs(2)`, `dfs(3)`, etc., are recomputed exponentially many times, resulting in `O(2^n)` (more Tightly `O(phi^n)`) time complexity.

### Optimized Approach

Use top-down Dynamic Programming (recursion with memoization): define `dfs(i)` as the maximum cash obtainable from the suffix `nums[i..n-1]` and cache each computed result in a memo array `f` initialized to `-1`.

### Step-by-Step Thinking Process

1. Model the problem around suffix index `i`: what is the maximum amount we can rob starting from house `i` through `n - 1`?
2. Identify the base case: once `i >= n`, there are no houses left to rob, so return `0`.
3. Formulate the recurrence: `Math.max(nums[i] + dfs(i + 2), dfs(i + 1))`, comparing robbing house `i` versus skipping it.
4. Recognize overlapping subproblems and create `const f = Array(n).fill(-1)` so each index `i` is evaluated at most once when `f[i] < 0`.

### Algorithm / Intuition

In `rob(nums)`, `n` stores `nums.length` and `f` is an array of length `n` filled with `-1`. The closure `dfs(i)` computes the optimal answer for suffix `i`:
- If `i >= n`, we have stepped past the last house and return `0`.
- Otherwise, we check `if (f[i] < 0)`. Since `nums[i] >= 0`, any valid answer is non-negative, so `f[i] < 0` confirms `i` has not been solved yet.
- We compute `f[i] = Math.max(nums[i] + dfs(i + 2), dfs(i + 1))` and return `f[i]`.
Finally, `dfs(0)` returns the answer for the entire street.

---

## Dry Run

Tracing `nums = [1, 2, 3, 1]` (`n = 4`, `f = [-1, -1, -1, -1]`):

- Call `dfs(0)`:
  - Needs `nums[0] + dfs(2)` and `dfs(1)`.
  - Call `dfs(2)`:
    - Needs `nums[2] + dfs(4)` and `dfs(3)`.
    - `dfs(4)` returns `0` (`4 >= 4`).
    - Call `dfs(3)`: computes `Math.max(nums[3] + dfs(5), dfs(4)) = Math.max(1 + 0, 0) = 1` -> sets `f[3] = 1`.
    - `dfs(2)` computes `Math.max(3 + 0, 1) = 3` -> sets `f[2] = 3`.
  - Call `dfs(1)`:
    - Needs `nums[1] + dfs(3)` and `dfs(2)`.
    - Both `f[3] = 1` and `f[2] = 3` are already `>= 0` (memo hits!).
    - `dfs(1)` computes `Math.max(2 + 1, 3) = 3` -> sets `f[1] = 3`.
  - `dfs(0)` computes `Math.max(1 + 3, 3) = 4` -> sets `f[0] = 4`.
- Returns `f[0] = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each state `i` from `0` to `n - 1` is computed once in `O(1)` work thanks to memoization in `f`.
- **Space Complexity:** `O(n)` — The memoization array `f` uses `O(n)` space, and the recursion call stack `dfs` reaches depth `O(n)`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [198house-robber.js](./198house-robber.js) |

---

## Key Learnings

- Top-down memoization (`dfs(i)` + `f[i]`) directly mirrors the natural recursive decision tree while collapsing exponential `O(2^n)` branching down to `O(n)`.
- Using `-1` as a memo sentinel is safe only because `nums[i] >= 0` guarantees all valid DP states are non-negative; if negative values were possible, `undefined` or `null` should be used instead.
- Because `f[i]` only depends on `f[i + 1]` and `f[i + 2]`, this recurrence can also be written iteratively in `O(1)` space using two rolling variables.
