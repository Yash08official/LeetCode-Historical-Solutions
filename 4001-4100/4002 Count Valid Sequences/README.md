---
comments: true
difficulty: Medium
tags:
  - Math
  - Combinatorics
---

# 4002. Count Valid Sequences

**[View Problem on LeetCode](https://leetcode.com/problems/count-valid-sequences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4002` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Combinatorics` |
| **Solution Language** | Java |

---

## Problem Description

Given integers `n` and `k`, count the number of valid sequences of length `n` satisfying the problem constraints modulo $10^9 + 7$.

---

## Problem Understanding & Combinatorial Formulation

- Stars and bars partitions sequence counts into binomial coefficients $inom{n-1}{k-1}$.
- When parity symmetry $(n + k) \pmod 2 == 0$ creates invalid palindromic / symmetric sequence configurations, subtract the symmetry overcount $inom{(n+k)/2 - 1}{k - 1}$.

---

## Approach

### Precomputed Factorials & Modular Inverse

1. Precompute factorials $f[i] = i! \pmod{MOD}$ and inverse factorials $g[i] = (i!)^{-1} \pmod{MOD}$ using Fermat's Little Theorem up to $MX = 500,001$.
2. Implement $O(1)$ combinations helper $	ext{comb}(n, k) = f[n] \cdot g[k] \cdot g[n-k] \pmod{MOD}$.
3. Calculate base answer: $ans = 	ext{comb}(n - 1, k - 1)$.
4. If $(n + k) \pmod 2 == 0$, subtract $	ext{comb}((n+k)/2 - 1, k - 1)$.
5. Return $(ans + MOD) \pmod{MOD}$.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ per query after $O(MX \log MOD)$ static initialization.
- **Space Complexity:** $O(MX)$ precomputed tables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4002count-valid-sequences.java](./4002count-valid-sequences.java) |

---

## Key Learnings

- Fermat's Little Theorem $a^{MOD-2} \equiv a^{-1} \pmod{MOD}$ enables $O(1)$ modular division.
- Symmetry reduction removes overcounted configurations via parity matching.
