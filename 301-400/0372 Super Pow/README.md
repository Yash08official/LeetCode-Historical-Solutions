---
comments: true
difficulty: Medium
tags:
  - Math
  - Divide and Conquer
  - Euler's Totient Function
  - Euler's Theorem
---

# 372. Super Pow

**[View Problem on LeetCode](https://leetcode.com/problems/super-pow/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0372` (`372`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Divide and Conquer`, `Euler's Totient Function`, `Euler's Theorem` |
| **Solution Language** | Java |

---

## Problem Description

Your task is to calculate `a^b` mod `1337` where `a` is a positive integer and `b` is an extremely large positive integer given in the form of an array.

---

## Examples

### Example 1

**Input:** a = 2, b = [3]

**Output:** 8

**Explanation:**

The array `b = [3]` represents the exponent 3. Therefore, `a^3 = 2^3 = 8`, so the result is 8.

### Example 2

**Input:** a = 2, b = [1,0]

**Output:** 1024

**Explanation:**

The array `b = [1, 0]` represents the exponent 10. Therefore, `a^10 = 2^10 = 1024`, so the result is 1024.

### Example 3

**Input:** a = 1, b = [4,3,3,8,5,2]

**Output:** 1

**Explanation:**

The array `b = [4, 3, 3, 8, 5, 2]` represents a positive exponent. Since `a = 1`, any positive power of 1 is 1. Therefore, the result is 1.

 

**

---

## Constraints

**

	
- `1 <= a <= 2^31 - 1`
	
- `1 <= b.length <= 2000`
	
- `0 <= b[i] <= 9`
	
- `b` does not contain leading zeros.

---

## Problem Understanding

- Compute $a^b \bmod 1337$ where huge exponent $b$ is represented as an array of decimal digits.

---

## Approach

### Optimized Approach (Right-to-Left Base-10 Modular Exponentiation)
1. Process digits of `b` from least significant to most significant:
   - Multiply `ans` by `qpow(a, b[i]) % 1337`.
   - Raise base `a = qpow(a, 10) % 1337` for the next decimal place.
2. Helper `qpow` performs binary exponentiation modulo `1337`.

---

## Complexity Analysis

- **Time Complexity:** $O(|b|)$ (each `qpow` exponent is $\le 10$).\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [372super-pow.java](./372super-pow.java) |

---

## Key Learnings

- Expanding $a^{10q + r} = (a^{10})^q \cdot a^r$ handles arbitrarily large array exponents cleanly in linear time.
