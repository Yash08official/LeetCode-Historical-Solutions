---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Math
  - String
---

# 166. Fraction to Recurring Decimal

**[View Problem on LeetCode](https://leetcode.com/problems/fraction-to-recurring-decimal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0166` (`166`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Math`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given two integers representing the `numerator` and `denominator` of a fraction, return *the fraction in string format*.

If the fractional part is repeating, enclose the repeating part in parentheses

If multiple answers are possible, return **any of them**.

It is **guaranteed** that the length of the answer string is less than `10^4` for all the given inputs.

**Note** that if the fraction can be represented as a *finite length string*, you **must** return it.

---

## Examples

### Example 1

```text
**Input:** numerator = 1, denominator = 2
**Output:** "0.5"
```

### Example 2

```text
**Input:** numerator = 2, denominator = 1
**Output:** "2"
```

### Example 3

```text
**Input:** numerator = 4, denominator = 333
**Output:** "0.(012)"
```

 

**

---

## Constraints

**

	
- `-2^31 <= numerator, denominator <= 2^31 - 1`
	
- `denominator != 0`

---

## Problem Understanding

- Given two integers `numerator` and `denominator`, return the fraction in string format.
- If the fractional part is repeating, enclose the repeating sequence in parentheses.
- Be careful with integer overflow when negating `-2^31`, division by non-repeating vs repeating decimals, and zero numerators.

---

## Approach

### Optimized Approach (Long Division with Remainder Hash Map)

1. Base case: If `numerator == 0`, return `"0"`.
2. Sign handling: Determine sign using `(numerator > 0) ^ (denominator > 0)`.
3. Overflow prevention: Cast numerator and denominator to 64-bit `long` and take absolute values.
4. Integer part: Append `a / b`. If remainder `a % b == 0`, return the result immediately.
5. Fractional part:
   - Append `.` to start decimals.
   - Maintain a Hash Map `d` storing each remainder `a` mapped to its position in `StringBuilder`.
   - In each step:
     - Record current remainder position: `d.put(a, sb.length())`.
     - Multiply remainder by 10 (`a *= 10`), append `a / b`, update remainder `a %= b`.
     - If the new remainder `a` is already in map `d`, a repeating cycle is found! Insert `(` at `d.get(a)`, append `)`, and break.
6. Return `sb.toString()`.

---

## Complexity Analysis

- **Time Complexity:** $O(	ext{denominator})$ — The number of unique remainders modulo $b$ is strictly less than $b$, guaranteeing termination within at most $b$ steps.
- **Space Complexity:** $O(	ext{denominator})$ — Storage in the remainder map and string buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [166fraction-to-recurring-decimal.java](./166fraction-to-recurring-decimal.java) |

---

## Key Learnings

- Remainder recurrence in standard long division precisely characterizes repeating decimal cycles.
- Converting operands to 64-bit `long` before `Math.abs` is required to avoid overflow on `Integer.MIN_VALUE`.
