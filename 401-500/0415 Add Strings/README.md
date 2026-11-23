---
comments: true
difficulty: Easy
tags:
  - Math
  - String
  - Simulation
---

# 415. Add Strings

**[View Problem on LeetCode](https://leetcode.com/problems/add-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0415` (`415`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `String`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given two non-negative integers, `num1` and `num2` represented as string, return *the sum of* `num1` *and* `num2` *as a string*.

You must solve the problem without using any built-in library for handling large integers (such as `BigInteger`). You must also not convert the inputs to integers directly.

---

## Examples

### Example 1

```text
**Input:** num1 = "11", num2 = "123"
**Output:** "134"
```

### Example 2

```text
**Input:** num1 = "456", num2 = "77"
**Output:** "533"
```

### Example 3

```text
**Input:** num1 = "0", num2 = "0"
**Output:** "0"
```

 

**

---

## Constraints

**

	
- `1 <= num1.length, num2.length <= 10^4`
	
- `num1` and `num2` consist of only digits.
	
- `num1` and `num2` don't have any leading zeros except for the zero itself.

---

## Problem Understanding

- Add two non-negative decimal integer strings `num1` and `num2` without using arbitrary-precision libraries.

---

## Approach

### Optimized Approach (Right-to-Left Schoolbook Addition)
1. Walk pointers `i` and `j` from the end of `num1` and `num2` while `i >= 0 || j >= 0 || c > 0`.
2. Sum digits plus carry `c`, append `c % 10` to `StringBuilder`, set `c /= 10`, and reverse at the end.

---

## Complexity Analysis

- **Time Complexity:** $O(\max(m, n))$.\n- **Space Complexity:** $O(\max(m, n))$ for output buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [415add-strings.java](./415add-strings.java) |

---

## Key Learnings

- Handling carry inside the single loop condition `i >= 0 || j >= 0 || c > 0` eliminates post-loop carry checks.
