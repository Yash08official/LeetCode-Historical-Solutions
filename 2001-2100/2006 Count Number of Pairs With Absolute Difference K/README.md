---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Counting
---

# 2006. Count Number of Pairs With Absolute Difference K

**[View Problem on LeetCode](https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2006` (`2006`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Counting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums` and a positive integer `k`, count and return the number of index pairs `(i, j)` with `i < j` such that the absolute difference between `nums[i]` and `nums[j]` equals `k` (`|nums[i] - nums[j]| == k`).

---

## Examples

### Example 1

```text
Input: nums = [1,2,2,1], k = 1
Output: 4
Explanation: The pairs with an absolute difference of 1 are:
- [1,2,2,1]
- [1,2,2,1]
- [1,2,2,1]
- [1,2,2,1]
```

### Example 2

```text
Input: nums = [1,3], k = 3
Output: 0
Explanation: There are no pairs with an absolute difference of 3.
```

### Example 3

```text
Input: nums = [3,2,1,5,4], k = 2
Output: 3
Explanation: The pairs with an absolute difference of 2 are:
- [3,2,1,5,4]
- [3,2,1,5,4]
- [3,2,1,5,4]
```

---

## Constraints

- `1 <= nums.length <= 200`

- `1 <= nums[i] <= 100`

- `1 <= k <= 99`

---

## Problem Understanding

- For a fixed right element `num = nums[j]`, an earlier element `nums[i]` (`i < j`) satisfies `|nums[i] - num| == k` if and only if `nums[i] == num + k` **or** `nums[i] == num - k`.
- Since `1 <= k <= 99`, `num + k` and `num - k` are **always distinct** (`k != 0`), so we never double-count the same earlier index `i`!
- Processing `nums` left to right while maintaining frequencies of **already-seen** numbers automatically enforces `i < j`.

---

## Approach

### Brute Force Approach

Using two nested loops `for (let i = 0; i < n; i++)` and `for (let j = i + 1; j < n; j++)` to test `Math.abs(nums[i] - nums[j]) === k` takes `O(n^2)` time. While small enough to pass for `n <= 200`, it scales poorly compared to a single-pass frequency lookup.

### Optimized Approach

Sweep `nums` once from left to right using a frequency hash map `numMap`: for each element `num`, add the existing counts of `num + k` and `num - k` from `numMap` into `count`, and then increment `numMap[num]`.

### Step-by-Step Thinking Process

1. Rewrite `|nums[i] - nums[j]| == k` for `i < j` as: when standing at `j` (`num = nums[j]`), how many previous elements `nums[i]` equal either `num + k` or `num - k`?
2. Maintain an object `numMap = {}` mapping each value seen so far to its frequency.
3. For each `num` in `nums`, look up `numMap[num + k]` and `numMap[num - k]`; if truthy (non-zero), add them to `count`.
4. Only **after** querying `numMap`, increment `numMap[num] = (numMap[num] || 0) + 1` so an element never pairs with itself (`k >= 1` also prevents self-pairing, and post-updating enforces `i < j`).
5. Return `count`.

### Algorithm / Intuition

In `countKDifference`, `numMap` stores the exact frequency distribution of the prefix `nums[0 .. j-1]` when visiting index `j`. Checking `if (numMap[num + k])` and `if (numMap[num - k])` counts all valid left partners `i < j` in `O(1)` time at once rather than one by one! Because `k >= 1`, the two target values `num + k` and `num - k` never collide. Finally, `(numMap[num] || 0) + 1` initializes unseen keys from `undefined` to `0` before adding `1`.

---

## Dry Run

Tracing Example 1: `nums = [1, 2, 2, 1]`, `k = 1`:

| Step | `num` | `numMap[num + 1]` | `numMap[num - 1]` | `count` After | `numMap` After Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `1` | `numMap[2]` (`undefined`) | `numMap[0]` (`undefined`) | `0` | `{1: 1}` |
| 2 | `2` | `numMap[3]` (`undefined`) | `numMap[1]` (`1`) | `0 + 1 = 1` | `{1: 1, 2: 1}` |
| 3 | `2` | `numMap[3]` (`undefined`) | `numMap[1]` (`1`) | `1 + 1 = 2` | `{1: 1, 2: 2}` |
| 4 | `1` | `numMap[2]` (`2`) | `numMap[0]` (`undefined`) | `2 + 2 = 4` | `{1: 2, 2: 2}` |

Returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates over the `n` elements of `nums` once, performing three `O(1)` average-time hash map accesses per element.
- **Space Complexity:** `O(min(n, U))` — `numMap` stores at most `n` keys (bounded by `U = 100`, the range of `nums[i]`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2006count-number-of-pairs-with-absolute-difference-k.js](./2006count-number-of-pairs-with-absolute-difference-k.js) |

---

## Key Learnings

- Splitting `|a - b| == k` into two exact equality lookups (`b + k` and `b - k`) transforms a range/distance check into `O(1)` hash-table lookups (just like Two Sum!).
- Always check whether `k == 0` is allowed by constraints: here `k >= 1` guarantees `num + k != num - k`; if `k == 0` were possible, checking both branches would double-count!
