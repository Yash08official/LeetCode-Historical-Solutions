---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Math
  - Dynamic Programming
  - Heap (Priority Queue)
---

# 264. Ugly Number II

**[View Problem on LeetCode](https://leetcode.com/problems/ugly-number-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0264` (`264`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Math`, `Dynamic Programming`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, and `5`.

Given an integer `n`, return *the* `n^th` ***ugly number***.

---

## Examples

### Example 1

```text
**Input:** n = 10
**Output:** 12
**Explanation:** [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
```

### Example 2

```text
**Input:** n = 1
**Output:** 1
**Explanation:** 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
```

 

**

---

## Constraints

**

	
- `1 <= n <= 1690`

---

## Problem Understanding

- Return the `n`-th ugly number (positive integer whose only prime factors are `2`, `3`, and `5`).

---

## Approach

### Optimized Approach (3-Pointer Dynamic Programming)
1. Maintain DP array `dp` with `dp[0] = 1` and three pointers `p2 = p3 = p5 = 0`.
2. At each step `i`, compute candidates `dp[p2] * 2`, `dp[p3] * 3`, `dp[p5] * 5` and set `dp[i]` to their minimum.
3. Advance every pointer whose candidate matched `dp[i]` (using separate `if` statements so duplicates like `6 = 2*3 = 3*2` are skipped automatically).

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass generating `n` ugly numbers.
- **Space Complexity:** $O(n)$ — DP array of length `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [264ugly-number-ii.java](./264ugly-number-ii.java) |

---

## Key Learnings

- Merging three sorted virtual streams with separate `if` pointer increments produces deduplicated ugly numbers in linear time.
