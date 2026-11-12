---
comments: true
difficulty: Easy
tags:
  - Bit Manipulation
---

# 1009. Complement of Base 10 Integer

**[View Problem on LeetCode](https://leetcode.com/problems/complement-of-base-10-integer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1009` |
| **Difficulty** | Easy |
| **Topics / Tags** | `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

The complement of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.
- For example, The integer `5` is `"101"` in binary and its complement is `"010"` which is the integer `2`.

Given an integer `n`, return its complement.

---

## Problem Understanding

- Flipping bit $b \in \{0, 1\}$ can be done via XOR: $b \oplus 1$.
- Special case: for $n = 0$, the binary representation is `"0"`, so its complement is `1`.

---

## Approach

### Bit-by-Bit Shift Simulation

1. If $n == 0$, return `1`.
2. Initialize `ans = 0` and bit index `i = 0`.
3. While $n 
eq 0$:
   - Invert the lowest bit: `(n & 1) ^ 1`.
   - Place it at bit position `i`: `ans |= bit << i`.
   - Shift $n$ right by 1 and increment `i`.
4. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log N)$ — Loops through the number of bits in $n$ ($\le 32$).
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1009complement-of-base-10-integer.java](./1009complement-of-base-10-integer.java) |

---

## Key Learnings

- Bitwise operations $n \ \& \ 1 \ \oplus \ 1$ cleanly extract and flip individual binary digits.
