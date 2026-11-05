---
comments: true
difficulty: Hard
tags:
  - Math
  - String
  - Backtracking
---

# 282. Expression Add Operators

**[View Problem on LeetCode](https://leetcode.com/problems/expression-add-operators/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0282` (`282`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `String`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `num` consisting only of digits (`'0'`–`'9'`) and an integer `target`. Return all valid expressions that can be formed by inserting the binary operators `'+'`, `'-'`, or `'*'` between the digits of `num` such that the resulting mathematical expression evaluates to `target`.

Digits may also be grouped together without an operator between them to form multi-digit operands, provided that **no operand has leading zeros** (a single `'0'` is valid, such as `"1+0+5"`, whereas `"1+05"` is invalid). Standard operator precedence applies (`'*'` binds tighter than `'+'` and `'-'`).

---

## Examples

### Example 1

```text
Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]
Explanation: Both "1*2*3" and "1+2+3" evaluate to 6.
```

### Example 2

```text
Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]
Explanation: Both "2*3+2" and "2+3*2" evaluate to 8.
```

### Example 3

```text
Input: num = "3456237490", target = 9191
Output: []
Explanation: There are no expressions that can be created from "3456237490" to evaluate to 9191.
```

---

## Constraints

- `1 <= num.length <= 10`

- `num` consists of only digits.

- `-2^31 <= target <= 2^31 - 1`

---

## Problem Understanding

- Length of `num` is small (`1 <= num.length <= 10`), which signals an exponential backtracking search over operator placements.
- Multiplication (`'*'`) has higher precedence than `'+'` and `'-'`. Evaluating left-to-right on the fly requires remembering the value of the **last signed term** (`prev`) added to the running total (`curr`), so we can undo it (`curr - prev`) and add `prev * next`.
- Multi-digit numbers up to 10 digits (e.g., `"9999999999"`) and intermediate products can overflow a 32-bit `int`, so `64`-bit `long` arithmetic is essential.

---

## Approach

### Brute Force Approach

A naive backtracking approach generates every candidate expression string first (deciding at each of the `n - 1` gaps between `'+'`, `'-'`, `'*'`, or no operator) and then runs a full two-stack or two-pass expression parser at every leaf. Re-parsing the entire expression from scratch at each leaf adds redundant scanning overhead and still requires validating leading zeros afterward.

### Optimized Approach

Use depth-first backtracking (`dfs(u, prev, curr, path)`) that partitions `num` into valid multi-digit operands on the fly, prunes leading-zero substrings immediately, and maintains both the running value `curr` and last term `prev` in `long` variables to handle multiplication precedence in `O(1)` per transition.

### Step-by-Step Thinking Process

1. Define recursive state `dfs(int u, long prev, long curr, String path)`, where `u` is the next unused index in `num`, `curr` is the value of `path` so far, and `prev` is the last term contributed to `curr`.
2. When `u == num.length()`, all digits have been consumed; if `curr == target`, record `path` in `ans`.
3. Iterate end index `i` from `u` to `num.length() - 1` to form the next operand `num.substring(u, i + 1)`. If `i != u && num.charAt(u) == '0'`, `break` immediately because any multi-digit slice starting at `'0'` has a leading zero.
4. Parse `long next = Long.parseLong(num.substring(u, i + 1))`. If `u == 0`, this is the very first number in the expression (no leading operator), so recurse with `prev = next, curr = next, path = "" + next`.
5. Otherwise (`u > 0`), branch into all three operators: `'+'` (`prev = next`, `curr + next`), `'-'` (`prev = -next`, `curr - next`), and `'*'` (`prev = prev * next`, `curr - prev + prev * next`).

### Algorithm / Intuition

Why does `curr - prev + prev * next` handle chained multiplications as well as `+` and `-`? Suppose the expression so far is `2 + 3`, so `curr = 5` and `prev = 3`. If the next operator is `* 4`, we subtract `prev` (`5 - 3 = 2`) and add `prev * next` (`2 + 12 = 14`), while passing `newPrev = prev * next = 12`. If yet another `* 5` follows (`2 + 3 * 4 * 5`), `prev` is now `12`, so `curr - prev + prev * 5 = 14 - 12 + 60 = 62`! Storing the entire multiplied chain inside `prev` handles arbitrarily long multiplication runs without a stack.

---

## Dry Run

Tracing **Example 1** (`num = "123"`, `target = 6`):

- Start `dfs(0, 0, 0, "")`.
- `u = 0, i = 0` (`next = 1`): calls `dfs(1, 1, 1, "1")`.
  - From `u = 1, i = 1` (`next = 2`):
    - `'+'`: `dfs(2, 2, 3, "1+2")` -> at `u = 2, i = 2` (`next = 3`):
      - `'+'`: `dfs(3, 3, 6, "1+2+3")` -> `u == 3` and `curr == 6` -> **adds `"1+2+3"`**!
      - `'-'`: `curr = 0` != 6; `'*'`: `curr = 3 - 2 + 2*3 = 7` != 6.
    - `'-'`: `dfs(2, -2, -1, "1-2")` -> with `3`, produces `2, -4, -5` (none equal `6`).
    - `'*'`: `dfs(2, 2, 2, "1*2")` -> at `u = 2, i = 2` (`next = 3`):
      - `'+'`: `curr = 5`; `'-'`: `curr = -1`;
      - `'*'`: `dfs(3, 6, 2 - 2 + 2*3 = 6, "1*2*3")` -> `u == 3` and `curr == 6` -> **adds `"1*2*3"`**!
  - Multi-digit branches (`"1+23"`, `"12+3"`, `"123"`, etc.) do not equal `6`.
- Result: `["1+2+3", "1*2*3"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * 4^n)` — Across `n - 1` digit gaps there are 4 effective choices (`'+'`, `'-'`, `'*'`, or extending the operand), yielding `O(4^n)` states, and each step performs `O(n)` substring parsing and string concatenation.
- **Space Complexity:** `O(n)` — Auxiliary recursion stack depth is at most `n` (with strings of length at most `2n` per frame), excluding the output list `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [282expression-add-operators.java](./282expression-add-operators.java) |

---

## Key Learnings

- Tracking `(curr, prev)` lets you evaluate `+`, `-`, and `*` expressions incrementally in `O(1)` per operator without building an explicit AST or operator stack.
- Breaking out of the inner loop as soon as `i != u && num.charAt(u) == '0'` prunes an entire subtree of invalid leading-zero numbers.
- Always use `long` when parsing up to 10-digit substrings or multiplying intermediate terms against a 32-bit `target`.
