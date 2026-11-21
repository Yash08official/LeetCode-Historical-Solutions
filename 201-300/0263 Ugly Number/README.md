---
comments: true
difficulty: Easy
tags:
  - Math
---

# 263. Ugly Number

**[View Problem on LeetCode](https://leetcode.com/problems/ugly-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0263` (`263`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math` |
| **Solution Language** | JavaScript |

---

## Problem Description

An **ugly number** is a *positive* integer which does not have a prime factor other than 2, 3, and 5.

Given an integer `n`, return `true` *if* `n` *is an **ugly number***.

---

## Examples

### Example 1

```text
**Input:** n = 6
**Output:** true
**Explanation:** 6 = 2 × 3
```

### Example 2

```text
**Input:** n = 1
**Output:** true
**Explanation:** 1 has no prime factors.
```

### Example 3

```text
**Input:** n = 14
**Output:** false
**Explanation:** 14 is not ugly since it includes the prime factor 7.
```

 

**

---

## Constraints

**

	
- `-2^31 <= n <= 2^31 - 1`

---

## Problem Understanding

- Return `true` if positive integer `n` has no prime factors other than `2`, `3`, and `5`.

---

## Approach

### Optimized Approach (Repeated Prime-Factor Division)
1. Non-positive integers (`n < 1`) are not ugly; return `false`.
2. Repeatedly divide out all factors of `2`, `3`, and `5`.
3. Return `n === 1` (true iff no other prime factor remains).

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ — Each division reduces `n` by at least half.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [263ugly-number.js](./263ugly-number.js) |

---

## Key Learnings

- Stripping the allowed prime factors directly tests membership without full prime factorization.
