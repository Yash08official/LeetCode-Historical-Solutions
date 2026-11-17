---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Stack
---

# 150. Evaluate Reverse Polish Notation

**[View Problem on LeetCode](https://leetcode.com/problems/evaluate-reverse-polish-notation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0150` (`150`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Stack` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return *an integer that represents the value of the expression*.

**Note** that:

	
- The valid operators are `'+'`, `'-'`, `'*'`, and `'/'`.
	
- Each operand may be an integer or another expression.
	
- The division between two integers always **truncates toward zero**.
	
- There will not be any division by zero.
	
- The input represents a valid arithmetic expression in a reverse polish notation.
	
- The answer and all the intermediate calculations can be represented in a **32-bit** integer.

---

## Examples

### Example 1

```text
**Input:** tokens = ["2","1","+","3","*"]
**Output:** 9
**Explanation:** ((2 + 1) * 3) = 9
```

### Example 2

```text
**Input:** tokens = ["4","13","5","/","+"]
**Output:** 6
**Explanation:** (4 + (13 / 5)) = 6
```

### Example 3

```text
**Input:** tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
**Output:** 22
**Explanation:** ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

 

**

---

## Constraints

**

	
- `1 <= tokens.length <= 10^4`
	
- `tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer in the range `[-200, 200]`.

---

## Problem Understanding

- Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix notation).
- Operands are integers, operators are `+`, `-`, `*`, `/`. Division truncates toward zero.

---

## Approach

### Optimized Approach (Stack-Based Postfix Evaluation)

1. Initialize a double-ended queue / stack `stk` to hold integer operands.
2. Iterate through each token `t`:
   - If `t` is a number (length > 1 or character 0 is a digit), parse as integer and push onto `stk`.
   - If `t` is an operator, pop the right operand `y`, then the left operand `x`.
   - Evaluate operation (`x + y`, `x - y`, `x * y`, `x / y`) and push result back onto `stk`.
3. After processing all tokens, pop and return the final value on the stack.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single linear pass over tokens.
- **Space Complexity:** $O(n)$ — In worst case, stack holds up to $n/2$ operands.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [150evaluate-reverse-polish-notation.java](./150evaluate-reverse-polish-notation.java) |

---

## Key Learnings

- In postfix evaluation, the first popped element is the right operand and the second is the left operand—order matters for subtraction and division.
