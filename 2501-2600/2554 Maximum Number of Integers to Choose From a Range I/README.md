---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Binary Search
  - Greedy
  - Sorting
---

# 2554. Maximum Number of Integers to Choose From a Range I

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2554` (`2554`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Binary Search`, `Greedy`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `banned` and two integers `n` and `maxSum`.

You must select integers following three rules:
1. Every chosen integer must belong to the range `[1, n]`.
2. Each integer can be chosen at most once.
3. No chosen integer may appear in the `banned` array.
4. The sum of all chosen integers must not exceed `maxSum`.

Return the maximum number of integers you can choose under these constraints.

---

## Examples

### Example 1

```text
Input: banned = [1,6,5], n = 5, maxSum = 6
Output: 2
Explanation: You can choose the integers 2 and 4.
2 and 4 are from the range [1, 5], both did not appear in banned, and their sum is 6, which did not exceed maxSum.
```

### Example 2

```text
Input: banned = [1,2,3,4,5,6,7], n = 8, maxSum = 1
Output: 0
Explanation: You cannot choose any integer while following the mentioned conditions.
```

### Example 3

```text
Input: banned = [11], n = 7, maxSum = 50
Output: 7
Explanation: You can choose the integers 1, 2, 3, 4, 5, 6, and 7.
They are from the range [1, 7], all did not appear in banned, and their sum is 28, which did not exceed maxSum.
```

---

## Constraints

- `1 <= banned.length <= 10^4`

- `1 <= banned[i], n <= 10^4`

- `1 <= maxSum <= 10^9`

---

## Problem Understanding

To maximize the count of chosen distinct integers while keeping their total sum under `maxSum`, we should always prefer smaller integers over larger ones because smaller values consume less of the available sum budget. Duplicate elements in `banned` and numbers outside `[1, n]` should not affect our choices. Fast membership testing is necessary to avoid repeatedly scanning `banned`.

---

## Approach

### Brute Force Approach

A naive approach could generate subsets of allowed numbers in `[1, n]` or recursively explore inclusion/exclusion to find the largest subset sum $\le maxSum$. This would take exponential time $O(2^n)$, which is completely infeasible for $n = 10^4$.

### Optimized Approach

Use a greedy strategy backed by a hash set. Store all elements of `banned` in a `HashSet<Integer>` for $O(1)$ lookup. Iterate sequentially from `i = 1` up to `n`, checking if adding `i` exceeds `maxSum`. If `i` is not banned and `s + i <= maxSum`, pick `i`, increment our answer count, and add `i` to the running sum.

### Step-by-Step Thinking Process

1. We want to maximize the quantity of chosen integers subject to $\sum x_i \le maxSum$.
2. This is a variation of the knapsack problem where every item has weight equal to its value and each item has unit value. Greedily picking the smallest available weights yields the optimal count.
3. Therefore, consider integers in strictly increasing order: $1, 2, 3, \dots, n$.
4. At each number `i`, if it is in `banned`, skip it. If adding `i` would push the sum past `maxSum`, no subsequent number `> i` can be added either, so terminate early.

### Algorithm / Intuition

We initialize a `HashSet<Integer> ban` and insert all values from `banned`. Variables `ans` (count of chosen integers) and `s` (accumulated sum) start at 0. The loop iterates `i` from 1 to `n` with condition `s + i <= maxSum`. For each `i`, `!ban.contains(i)` checks whether `i` is permitted. If permitted, `++ans` increments our count and `s += i` updates the running sum. Once `s + i > maxSum`, the loop breaks immediately, and `ans` is returned.

---

## Dry Run

Trace with Example 1: `banned = [1,6,5]`, `n = 5`, `maxSum = 6`.
- Insert banned into `ban`: `{1, 6, 5}`.
- Initialize `ans = 0`, `s = 0`.
- `i = 1`: `s + 1 = 1 <= 6`. Check `ban.contains(1)` -> true (banned). Skip.
- `i = 2`: `s + 2 = 2 <= 6`. Check `ban.contains(2)` -> false. `++ans` -> 1, `s = 0 + 2 = 2`.
- `i = 3`: `s + 3 = 5 <= 6`. Check `ban.contains(3)` -> false. `++ans` -> 2, `s = 2 + 3 = 5`.
- `i = 4`: `s + 4 = 5 + 4 = 9 > 6`. Loop condition `s + i <= maxSum` is false; terminate loop.
Return `ans = 2` (the chosen numbers are 2 and 3).

---

## Complexity Analysis

- **Time Complexity:** `O(m + n)` — Inserting `m = banned.length` elements into the `HashSet` takes `O(m)` time on average. The loop runs at most `n` times with `O(1)` set lookups per iteration. Overall time is `O(m + n)`.
- **Space Complexity:** `O(m)` — The `HashSet` stores up to `m` unique banned integers, where `m <= 10^4`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2554maximum-number-of-integers-to-choose-from-a-range-i.java](./2554maximum-number-of-integers-to-choose-from-a-range-i.java) |

---

## Key Learnings

- When maximizing item count under a total sum constraint, the greedy choice of picking the smallest available positive integers is mathematically optimal.
- Checking `s + i <= maxSum` as the loop condition allows early termination as soon as the smallest candidate exceeds the remaining budget.
- A `HashSet` provides amortized `O(1)` membership checks, turning an otherwise `O(n * m)` lookup into `O(n + m)`.
