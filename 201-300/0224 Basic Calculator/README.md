---
comments: true
difficulty: Hard
tags:
  - Math
  - String
  - Stack
  - Recursion
---

# 224. Basic Calculator

**[View Problem on LeetCode](https://leetcode.com/problems/basic-calculator/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0224` (`224`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `String`, `Stack`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` representing a valid mathematical expression containing non-negative integers, `'+'`, `'-'`, `'('`, `')'`, and spaces `' '`, evaluate the expression and return its integer result without using any built-in string evaluation functions like `eval()`.

---

## Examples

### Example 1

```text
Input: s = "1 + 1"
Output: 2
```

### Example 2

```text
Input: s = " 2-1 + 2 "
Output: 3
```

### Example 3

```text
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
```

---

## Constraints

- `1 <= s.length <= 3 * 10^5`

- `s` consists of digits, `'+'`, `'-'`, `'('`, `')'`, and `' '`.

- `s` represents a valid expression.

- `'+'` is **not** used as a unary operation (i.e., `"+1"` and `"+(2 + 3)"` is invalid).

- `'-'` could be used as a unary operation (i.e., `"-1"` and `"-(2 + 3)"` is valid).

- There will be no two consecutive operators in the input.

- Every number and running calculation will fit in a signed 32-bit integer.

---

## Problem Understanding

Notice which operators are present — and absent! There is **no multiplication `'*'` or division `'/'`**, only addition `'+'`, subtraction `'-'`, and parentheses `'('` / `')'`. Because `'+'` and `'-'` share identical precedence and associate left-to-right, every number can be folded directly into a running sum `ans` multiplied by its local `sign` (`+1` or `-1`). Also note from constraints: `'-'` can appear as a unary negation (such as `"-1"` or `"-(2 + 3)"`), whereas `'+'` is never unary, and every intermediate value fits in a signed 32-bit `int`.

---

## Approach

### Brute Force Approach

Repeatedly scanning the string to locate the innermost parenthesized subexpression `( ... )`, evaluating it, splicing its string value back into `s`, and repeating until no parentheses remain requires `O(n)` string copies per pair of parentheses, degrading to `O(n^2)` time on deeply nested expressions like `"(((...(1)...)))"`.

### Optimized Approach

Evaluate `s` in a single left-to-right pass using an `ArrayDeque<Integer>` stack `stk`: accumulate `ans += sign * x` within the current scope, push `(ans, sign)` onto `stk` when entering `'('`, and combine `ans = stk.pop() * ans + stk.pop()` when exiting `')'`.

### Step-by-Step Thinking Process

1. Track the current parenthesized scope's running total `ans = 0` and active operator `sign = 1` (`+1` for addition, `-1` for subtraction).
2. When encountering a digit at `i`, parse all consecutive digits with pointer `j` into `x = x * 10 + (s.charAt(j) - '0')`, add `sign * x` to `ans`, and advance `i = j - 1`.
3. Update `sign = 1` on `'+'` and `sign = -1` on `'-'`. Note that if `'-'` is unary (at the start of `s` or right after `'('`), `ans` is already `0`, so setting `sign = -1` naturally negates the upcoming number or parenthesized group!
4. On `'('`, save the outer context by pushing `ans` first and `sign` second onto `stk`, then reset `ans = 0` and `sign = 1` for the new inner scope.
5. On `')'`, `stk.pop()` retrieves the `sign` that preceded `'('`, and the second `stk.pop()` retrieves the outer `ans`, combining them via `ans = stk.pop() * ans + stk.pop()`. Ignore whitespace `' '` automatically.

### Algorithm / Intuition

Pushing **two** items (`ans` then `sign`) on every `'('` turns arbitrarily nested parentheses into clean scope suspension and resumption:
- Suppose we have `10 - (4 + 2)`. Right before `'('`, `ans = 10` and `sign = -1`. Entering `'('` pushes `10` then `-1`, and resets `ans = 0, sign = 1`.
- Inside `(4 + 2)`, `ans` accumulates to `6`.
- At `')'`, Java evaluates operands left-to-right in `stk.pop() * ans + stk.pop()`: the first `stk.pop()` yields `-1` (multiplying `6` to `-6`), and the second `stk.pop()` yields `10`, producing `-6 + 10 = 4`!

---

## Dry Run

Tracing Example 1 (`s = "1 + 1"`):

| `i` | `s.charAt(i)` | Action | `sign` | `ans` | `stk` (top -> bottom) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Init | — | Start | `1` | `0` | `[]` |
| `0` | `'1'` | Parse `x = 1`; `ans += 1 * 1` | `1` | `1` | `[]` |
| `1` | `' '` | Ignored | `1` | `1` | `[]` |
| `2` | `'+'` | Set `sign = 1` | `1` | `1` | `[]` |
| `3` | `' '` | Ignored | `1` | `1` | `[]` |
| `4` | `'1'` | Parse `x = 1`; `ans += 1 * 1` | `1` | `2` | `[]` |

Returns `ans = 2`. *(Similarly, on nested `"1-(2+3)"`: `'('` pushes `1` then `-1` onto `stk`; `2+3` yields `ans = 5`; `')'` computes `-1 * 5 + 1 = -4`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every character in `s` is visited a constant number of times (the inner digit loop advances `i = j - 1` so digits are never rescanned).
- **Space Complexity:** `O(n)` — In the worst case of deeply nested parentheses (e.g., `"(((1)))"`), `stk` stores up to `O(n)` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [224basic-calculator.java](./224basic-calculator.java) |

---

## Key Learnings

- Treating subtraction `a - b` as signed addition `a + (-1) * b` unifies `'+'`, binary `'-'`, and unary `'-'` into a single `sign` variable.
- When popping multiple values inside one expression (`stk.pop() * ans + stk.pop()`), remember Java guarantees strict left-to-right operand evaluation, matching the LIFO order (`sign` pushed after `ans`).
- Advancing `i = j - 1` at the end of a `for (...; ++i)` multi-digit parse prevents skipping the operator or parenthesis immediately following a number.
