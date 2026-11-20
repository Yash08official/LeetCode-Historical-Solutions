---
comments: true
difficulty: Medium
tags:
  - Math
  - String
  - Stack
---

# 227. Basic Calculator II

**[View Problem on LeetCode](https://leetcode.com/problems/basic-calculator-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0227` (`227`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `String`, `Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` which represents an expression, *evaluate this expression and return its value*. 

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of `[-2^31, 2^31 - 1]`.

**Note:** You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.

---

## Examples

### Example 1

```text
**Input:** s = "3+2*2"
**Output:** 7
```

### Example 2

```text
**Input:** s = " 3/2 "
**Output:** 1
```

### Example 3

```text
**Input:** s = " 3+5 / 2 "
**Output:** 5
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 3 * 10^5`
	
- `s` consists of integers and operators `('+', '-', '*', '/')` separated by some number of spaces.
	
- `s` represents a valid expression.
	
- All the integers in the expression are non-negative integers in the range `[0, 2^31 - 1]`.
	
- The answer is **guaranteed** to fit in a **32-bit integer**.

---

## Problem Understanding

- Evaluate a non-negative integer arithmetic expression string containing `+`, `-`, `*`, `/` (truncating toward zero) and spaces without parentheses.

---

## Approach

### Optimized Approach (Precedence Stack)
1. Track the previous operator `sign` (initially `'+'`) and current parsed integer `v`.
2. When reaching an operator or the end of the string:
   - `+`: push `v`; `-`: push `-v`.
   - `*`: pop top and push `top * v`; `/`: pop top and push `top / v`.
   - Update `sign = c` and reset `v = 0`.
3. Sum all remaining terms in `stk`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single scan over the expression string.\n- **Space Complexity:** $O(n)$ — Stack of additive terms.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [227basic-calculator-ii.java](./227basic-calculator-ii.java) |

---

## Key Learnings

- Resolving high-precedence `*` and `/` immediately onto a stack turns the entire expression into a final summation.
