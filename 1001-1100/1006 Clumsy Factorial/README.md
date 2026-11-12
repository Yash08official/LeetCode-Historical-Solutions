---
comments: true
difficulty: Medium
tags:
  - Math
  - Stack
  - Simulation
---

# 1006. Clumsy Factorial

**[View Problem on LeetCode](https://leetcode.com/problems/clumsy-factorial/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1006` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Stack`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

The clumsy factorial of an integer `n` is obtained by applying the operations multiplication `'*'`, division `'/'`, addition `'+'`, and subtraction `'-'` in rotation on the sequence of integers from `n` down to `1`:
- For example, `clumsy(10) = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1`.

Perform floor division and follow standard operator precedence: multiplication and division are evaluated before addition and subtraction.

---

## Problem Understanding

- Operations cycle every 4 steps: `*`, `/`, `+`, `-`.
- Due to operator precedence:
  - `*` and `/` bind immediately to the previous term.
  - `+` pushes positive numbers onto the accumulator stack.
  - `-` pushes negative numbers onto the accumulator stack.

---

## Approach

### Stack-Based Operator Precedence Simulation

1. Push initial number `n` onto a stack `stk`.
2. Cycle an operation index $k \in \{0, 1, 2, 3\}$ for each subsequent number $x = n-1$ down to 1:
   - $k = 0$ (`*`): Pop top, multiply by $x$, push result back.
   - $k = 1$ (`/`): Pop top, perform integer division by $x$, push result back.
   - $k = 2$ (`+`): Push $+x$ onto stack.
   - $k = 3$ (`-`): Push $-x$ onto stack.
3. Sum all integers remaining in the stack.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass from $n$ down to 1.
- **Space Complexity:** $O(N)$ for the stack storage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1006clumsy-factorial.java](./1006clumsy-factorial.java) |

---

## Key Learnings

- Arithmetic expressions with operator precedence can be simplified by immediately resolving high-precedence operations into a linear summation stack.
