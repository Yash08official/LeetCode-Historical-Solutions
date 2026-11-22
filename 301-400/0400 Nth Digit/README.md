---
comments: true
difficulty: Medium
tags:
  - Math
  - Binary Search
---

# 400. Nth Digit

**[View Problem on LeetCode](https://leetcode.com/problems/nth-digit/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0400` (`400`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return the `n^th` digit of the infinite integer sequence `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]`.

---

## Examples

### Example 1

```text
**Input:** n = 3
**Output:** 3
```

### Example 2

```text
**Input:** n = 11
**Output:** 0
**Explanation:** The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.
```

 

**

---

## Constraints

**

	
- `1 <= n <= 2^31 - 1`

---

## Problem Understanding

- Find the `n`-th digit in the infinite concatenated positive integer sequence `123456789101112...`.

---

## Approach

### Optimized Approach (Digit-Length Bucket Arithmetic)
1. Group numbers by digit length `k = 1, 2, 3, ...`, where each bucket has `cnt = 9 * 10^(k-1)` numbers and `k * cnt` digits.
2. Subtract full buckets while `(long) k * cnt < n` to find the exact digit width `k`.
3. Locate the exact number `num = 10^(k-1) + (n - 1) / k` and extract digit index `(n - 1) % k`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log_{10} n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [400nth-digit.java](./400nth-digit.java) |

---

## Key Learnings

- Skipping whole powers-of-10 digit buckets locates the `n`-th digit in $\le 10$ iterations with 64-bit overflow protection.
