---
comments: true
difficulty: Hard
tags:
  - Math
  - Enumeration
---

# 829. Consecutive Numbers Sum

**[View Problem on LeetCode](https://leetcode.com/problems/consecutive-numbers-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0829` (`829`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Enumeration` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return the number of ways you can write `n` as the sum of consecutive positive integers.

---

## Problem Understanding & Mathematical Derivation

- Suppose $n$ is represented as the sum of $k$ consecutive positive integers starting from $x$:
  $$n = x + (x + 1) + (x + 2) + \dots + (x + k - 1)$$
  $$n = k \cdot x + rac{k(k - 1)}{2}$$
- Multiply both sides by 2:
  $$2n = 2kx + k(k - 1) = k(2x + k - 1)$$
- For positive integer $x \ge 1$:
  $$2x = rac{2n}{k} - (k - 1) = rac{2n}{k} + 1 - k$$
- Thus, $k$ is a valid length if:
  1. $k$ divides $2n$ evenly ($2n \pmod k == 0$).
  2. $\left(rac{2n}{k} + 1 - k
ight)$ is a positive even number ($2x \ge 2$).
- Since $x \ge 1$, we have $k(k + 1) \le 2n$, giving $k \le \sqrt{2n}$.

---

## Approach

### $O(\sqrt{N})$ Enumeration

1. Double $n$: `n <<= 1`.
2. Iterate $k$ from $1$ while $k(k + 1) \le 2n$:
   - Check if $2n \pmod k == 0$.
   - Check if $(2n / k + 1 - k)$ is even (`% 2 == 0`).
   - If both conditions hold, increment `ans`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(\sqrt{N})$ — Loop runs up to $\sqrt{2n} pprox 4.5 	imes 10^4$ iterations for $n = 10^9$.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [829consecutive-numbers-sum.java](./829consecutive-numbers-sum.java) |

---

## Key Learnings

- Algebraic reformulation bounds the search range to $O(\sqrt{N})$.
- Checking parity and divisibility avoids costly floating-point operations.
