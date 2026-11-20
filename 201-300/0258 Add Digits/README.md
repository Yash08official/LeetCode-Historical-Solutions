---
comments: true
difficulty: Easy
tags:
  - Math
  - Simulation
  - Number Theory
---

# 258. Add Digits

**[View Problem on LeetCode](https://leetcode.com/problems/add-digits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0258` (`258`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Simulation`, `Number Theory` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `num`, repeatedly add all its digits until the result has only one digit, and return it.

---

## Examples

### Example 1

```text
**Input:** num = 38
**Output:** 2
**Explanation:** The process is
38 --> 3 + 8 --> 11
11 --> 1 + 1 --> 2 
Since 2 has only one digit, return it.
```

### Example 2

```text
**Input:** num = 0
**Output:** 0
```

 

**

---

## Constraints

**

	
- `0 <= num <= 2^31 - 1`

 

**Follow up:** Could you do it without any loop/recursion in `O(1)` runtime?

---

## Problem Understanding

- Repeatedly sum the digits of `num` until only a single digit remains (digital root).

---

## Approach

### Optimized Approach (Congruence Modulo 9 — Digital Root Formula)
1. Because $10^k \equiv 1 \pmod 9$, a number and the sum of its digits are always congruent modulo 9.
2. In Java, `(num - 1) % 9 + 1` handles both `num = 0` (`(-1) % 9 + 1 = -1 + 1 = 0`) and multiples of 9 (`8 % 9 + 1 = 9`) in a single expression.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [258add-digits.java](./258add-digits.java) |

---

## Key Learnings

- The digital root formula `(num - 1) % 9 + 1` computes repeated digit sums in constant time without loops.
