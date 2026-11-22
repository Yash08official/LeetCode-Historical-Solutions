---
comments: true
difficulty: Medium
tags:
  - Math
  - Bit Manipulation
---

# 371. Sum of Two Integers

**[View Problem on LeetCode](https://leetcode.com/problems/sum-of-two-integers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0371` (`371`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given two integers `a` and `b`, return *the sum of the two integers without using the operators* `+` *and* `-`.

---

## Examples

### Example 1

```text
**Input:** a = 1, b = 2
**Output:** 3
```

### Example 2

```text
**Input:** a = 2, b = 3
**Output:** 5
```

 

**

---

## Constraints

**

	
- `-1000 <= a, b <= 1000`

---

## Problem Understanding

- Compute `a + b` without using `+` or `-` operators.

---

## Approach

### Optimized Approach (Bitwise Half-Adder Recursion)
1. `a ^ b` computes sum bits without carries; `(a & b) << 1` computes carry bits.
2. Recurse `getSum(a ^ b, (a & b) << 1)` until carry `b == 0`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ (at most 32 carry propagations).\n- **Space Complexity:** $O(1)$ recursion depth (at most 32).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [371sum-of-two-integers.java](./371sum-of-two-integers.java) |

---

## Key Learnings

- Binary addition decomposes into XOR (sum without carry) and shifted AND (carry) repeated until carry vanishes.
