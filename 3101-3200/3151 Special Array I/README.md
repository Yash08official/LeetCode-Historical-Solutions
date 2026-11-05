---
comments: true
difficulty: Easy
tags:
  - Array
---

# 3151. Special Array I

**[View Problem on LeetCode](https://leetcode.com/problems/special-array-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3151` (`3151`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

An array is considered special if the parity of every pair of adjacent elements alternates, meaning one element is even and the other is odd (or vice versa).

Given an integer array `nums`, return `true` if `nums` is a special array, and `false` otherwise.

---

## Examples

### Example 1

**Input:** `nums = [1]`

**Output:** `true`

**Explanation:**

There is only one element. So the answer is `true`.

### Example 2

**Input:** `nums = [2,1,4]`

**Output:** `true`

**Explanation:**

There is only two pairs: `(2,1)` and `(1,4)`, and both of them contain numbers with different parity. So the answer is `true`.

### Example 3

**Input:** `nums = [4,3,1,6]`

**Output:** `false`

**Explanation:**

`nums[1]` and `nums[2]` are both odd. So the answer is `false`.

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 100`

---

## Problem Understanding

Parity definitions and edge cases:
- Two adjacent numbers `a` and `b` have different parity if `a % 2 != b % 2`.
- If any adjacent pair shares the same parity (`nums[i] % 2 == nums[i - 1] % 2`), the array is not special, and we can immediately return `false`.
- If the array contains only a single element (`nums.length == 1`), there are no adjacent pairs, so it trivially satisfies the condition and returns `true`.

---

## Approach

### Brute Force Approach

A brute-force check scans all adjacent pairs `(nums[i - 1], nums[i])` from left to right. Because this already takes `O(n)` time and single-pass inspection, the direct check is optimal.

### Optimized Approach

We iterate from `i = 1` to `nums.length - 1`. At each step, we check if `nums[i] % 2 == nums[i - 1] % 2`. If equal, we immediately return `false`. If the loop finishes without finding any violating pair, we return `true`.

### Step-by-Step Thinking Process

1. We need to verify that adjacent elements alternate between even and odd.
2. Parity of integer `x` is determined by `x % 2`.
3. Check all pairs `(nums[i - 1], nums[i])` for `i` from `1` to `n - 1`.
4. If any adjacent pair has identical parities, early return `false`.
5. If no conflicts exist, return `true`.

### Algorithm / Intuition

The algorithm performs a single forward verification pass:
1. Loop `i` from `1` to `nums.length - 1`.
2. If `nums[i] % 2 == nums[i - 1] % 2`, return `false`.
3. If the loop completes, return `true`.

---

## Dry Run

Trace on Example 1: `nums = [1]` (`n = 1`)

- Length is 1.
- Loop `i` from 1 to 0 does not execute.
- Returns `true` immediately, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n) — Single linear pass across the array of length n with O(1) parity comparisons per element.
- **Space Complexity:** O(1) auxiliary space — Only a single loop index `i` is used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3151special-array-i.java](./3151special-array-i.java) |

---

## Key Learnings

- Early termination on first invalid adjacent pair guarantees optimal best-case performance.
- Arrays of length 1 trivially satisfy adjacent-element conditions because the set of adjacent pairs is empty.
