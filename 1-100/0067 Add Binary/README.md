---
comments: true
difficulty: Easy
tags:
  - Math
  - String
  - Bit Manipulation
  - Simulation
---

# 67. Add Binary

**[View Problem on LeetCode](https://leetcode.com/problems/add-binary/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0067` (`67`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `String`, `Bit Manipulation`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given two binary strings `a` and `b`, return *their sum as a binary string*.

---

## Examples

### Example 1

```text
Input: a = "11", b = "1"
Output: "100"
```

### Example 2

```text
Input: a = "1010", b = "1011"
Output: "10101"
```

---

## Constraints

- `1 <= a.length, b.length <= 10^4`
- `a` and `b` consist only of `'0'` or `'1'` characters.
- Each string does not contain leading zeros except for the zero itself.

---

## Problem Understanding

- We need to perform full adder binary addition on two arbitrary-precision binary strings.
- Process characters from right to left (least significant to most significant), propagating the carry bit.

---

## Approach

### Optimized Approach (Right-to-Left Full Adder Simulation)

1. Use two pointers `i = a.length() - 1` and `j = b.length() - 1` and a `carry = 0`.
2. While `i >= 0 || j >= 0 || carry > 0`:
   - Add `a[i]` (if $i \ge 0$) and `b[j]` (if $j \ge 0$) to `carry`.
   - Append `carry % 2` to a `StringBuilder`.
   - Update `carry /= 2`.
   - Decrement `i` and `j`.
3. Reverse the `StringBuilder` and return as string.

---

## Complexity Analysis

- **Time Complexity:** $O(\max(N, M))$ — Single loop processing digits of strings $a$ and $b$ of lengths $N$ and $M$.
- **Space Complexity:** $O(\max(N, M))$ — Memory to store the resulting sum string.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [67add-binary.java](./67add-binary.java) |

---

## Key Learnings

- Simulating a hardware ripple-carry adder handles arbitrarily long integers without integer overflow risks.
