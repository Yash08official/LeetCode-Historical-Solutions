---
comments: true
difficulty: Hard
tags:
  - String
  - Stack
  - Recursion
---

# 1106. Parsing A Boolean Expression

**[View Problem on LeetCode](https://leetcode.com/problems/parsing-a-boolean-expression/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1106` (`1106`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Stack`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

You are given a valid string `expression` representing a boolean formula built from the following grammar:

- `'t'` evaluates to `true`, and `'f'` evaluates to `false`.
- `'!(subExpr)'` evaluates to the logical **NOT** of `subExpr`.
- `'&(subExpr_1, subExpr_2, ..., subExpr_n)'` evaluates to the logical **AND** of its `1` or more comma-separated sub-expressions.
- `'|(subExpr_1, subExpr_2, ..., subExpr_n)'` evaluates to the logical **OR** of its `1` or more comma-separated sub-expressions.

Parse and evaluate `expression`, returning its final `boolean` value.

---

## Examples

### Example 1

```text
Input: expression = "&(|(f))"
Output: false
Explanation:
First, evaluate |(f) --> f. The expression is now "&(f)".
Then, evaluate &(f) --> f. The expression is now "f".
Finally, return false.
```

### Example 2

```text
Input: expression = "|(f,f,f,t)"
Output: true
Explanation: The evaluation of (false OR false OR false OR true) is true.
```

### Example 3

```text
Input: expression = "!(&(f,t))"
Output: true
Explanation:
First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
Then, evaluate !(f) --> NOT false --> true. We return true.
```

---

## Constraints

- `1 <= expression.length <= 2 * 10^4`

- expression[i] is one following characters: `'('`, `')'`, `'&'`, `'|'`, `'!'`, `'t'`, `'f'`, and `','`.

---

## Problem Understanding

- **Nested Prefix Syntax:** Every operator (`'!'`, `'&'`, `'|'`) immediately precedes an opening parenthesis `'('` and applies to all comma-separated operands up to the matching `')'`.
- **Innermost-First Evaluation:** Whenever we encounter a closing parenthesis `')'`, every nested sub-expression inside that pair of parentheses has already been reduced to `'t'` or `'f'`.
- **Boolean Reduction Rules via Counts:** If an expression block has `t` true operands and `f` false operands:
  - `'!'` (unary): true iff `f > 0` (its single operand was `'f'`).
  - `'&'`: true iff `f == 0` (no operand was `'f'`).
  - `'|'`: true iff `t > 0` (at least one operand was `'t'`).

---

## Approach

### Brute Force Approach

Repeatedly scan the string to locate an innermost `op(...)` substring containing no nested `'('`, evaluate it, and splice the resulting `'t'` or `'f'` back into a new string until length `1` is reached. Because strings are immutable in Java, repeated scanning and string rebuilding can degrade to `O(n^2)` time on deeply nested inputs like `"!(!(!(...)))"` of length `2 * 10^4`.

### Optimized Approach

Use a single character stack (`Deque<Character> stk`), pushing only operators (`'!'`, `'&'`, `'|'`) and boolean literals (`'t'`, `'f'`) while ignoring `'('` and `','`. On each `')'`, pop `'t'`/`'f'` literals to count `t` and `f`, pop the operator `op`, and push the evaluated `'t'` or `'f'` back onto `stk`.

### Step-by-Step Thinking Process

1. Notice that `,` is purely a delimiter and `(` always appears immediately after an operator (`!`, `&`, or `|`), meaning the operator itself already marks the start of the current parenthesized scope on the stack!
2. Scan `expression` left to right: ignore `'('` and `','`, and push operators `'!'`, `'&'`, `'|'` and literals `'t'`, `'f'` onto `stk`.
3. When `c == ')'`, all arguments belonging to the innermost active operator sit continuously as `'t'`/`'f'` characters at the top of `stk`, bounded directly underneath by that scope's operator.
4. Pop while `stk.peek()` is `'t'` or `'f'`, tallying `t` and `f`, then pop `char op = stk.pop()`, evaluate the result character (`'t'` or `'f'`), and push it back onto `stk`.

### Algorithm / Intuition

Why is it safe to omit `'('` from `stk`? Because in this grammar, a parenthesized list can **only** be introduced by `'!'`, `'&'`, or `'|'`. Therefore, literals from an outer scope (such as `'t'` in `&(t, |(f))`) are always separated from literals of an inner scope (`'f'`) by the inner operator (`'|'`).

When `c == ')'` is reached in `parseBoolExpr`, the `while (stk.peek() == 't' || stk.peek() == 'f')` loop pops only the current group's operands, incrementing `t` and `f`. The very next element popped (`char op = stk.pop()`) is guaranteed to be the enclosing operator `'!'`, `'&'`, or `'|'`. Defaulting `c = 'f'`, the condition `(op == '!' && f > 0) || (op == '&' && f == 0) || (op == '|' && t > 0)` flips `c` to `'t'` in exact accordance with NOT, AND, and OR semantics, then pushes `c` onto `stk`. At the end, `stk` holds a single character, and `stk.peek() == 't'` yields the final boolean.

---

## Dry Run

Using **Example 1** (`expression = "&(|(f))"`):

| Read `c` | Action | Stack `stk` (top on right) |
| :--- | :--- | :--- |
| `'&'` | Push `'&'` | `['&']` |
| `'('` | Ignored | `['&']` |
| `'|'` | Push `'|'` | `['&', '|']` |
| `'('` | Ignored | `['&', '|']` |
| `'f'` | Push `'f'` | `['&', '|', 'f']` |
| `')'` | Pop `'f'` (`t=0, f=1`), pop `op='|'`; `t > 0` is false -> push `'f'` | `['&', 'f']` |
| `')'` | Pop `'f'` (`t=0, f=1`), pop `op='&'`; `f == 0` is false -> push `'f'` | `['f']` |

Finally, `stk.peek() == 't'` evaluates `'f' == 't'` -> **`false`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate through the `n` characters of `expression` once, and each pushed character is popped from `stk` at most once.
- **Space Complexity:** `O(n)` — In the worst case (e.g., deeply nested expressions or `&(t,t,t,...)`), `stk` holds `O(n)` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1106parsing-a-boolean-expression.java](./1106parsing-a-boolean-expression.java) |

---

## Key Learnings

- Because every `'('` in this prefix boolean grammar is preceded by an operator token, the operator itself acts as the scope boundary marker on the stack, making `'('` storage unnecessary.
- Counting `t` and `f` frequencies lets you evaluate `n`-ary `&`, `|`, and unary `!` uniformly without building intermediate boolean lists.
- Java's `ArrayDeque` is preferred over legacy `java.util.Stack` due to lower synchronization overhead and cache-friendly array backing.
