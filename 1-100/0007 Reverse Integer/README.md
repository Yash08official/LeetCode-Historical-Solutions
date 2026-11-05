---
comments: true
difficulty: Medium
tags:
  - Math
---

# 7. Reverse Integer

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-integer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0007` (`7`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math` |
| **Solution Language** | Java |

---

## Problem Description

Given a signed 32-bit integer `x`, reverse its base-10 digits while preserving its sign. Trailing zeros in `x` (such as `120` -> `21`) are naturally dropped.

If the reversed value falls outside the signed 32-bit integer range `[-2^31, 2^31 - 1]` (`[-2147483648, 2147483647]`), return `0`.

---

## Examples

### Example 1

```text
Input: x = 123
Output: 321
```

### Example 2

```text
Input: x = -123
Output: -321
```

### Example 3

```text
Input: x = 120
Output: 21
```

---

## Constraints

- `-2^31 <= x <= 2^31 - 1`

---

## Problem Understanding

- **Signed modulo in Java:** Unlike Python's mathematical modulo, Java's `%` remainder operator preserves the sign of the dividend (`-123 % 10 == -3` and `-123 / 10 == -12`). Consequently, `res = res * 10 + x % 10` works identically for positive and negative `x` without stripping the sign!
- **32-bit overflow:** Inputs like `1534236469` are valid 32-bit `int`s, yet their reversed digits (`9646324351`) exceed `Integer.MAX_VALUE` (`2147483647`) and must return `0`.
- **Implementation note:** Although the problem prompt asks how to handle environments without 64-bit integers, the provided Java solution uses a 64-bit `long res` accumulator and checks 32-bit `Integer` bounds afterward.

---

## Approach

### Brute Force Approach

Convert `Math.abs((long) x)` into a `String`, reverse it via `StringBuilder.reverse()`, prepend `'-'` if negative, and call `Integer.parseInt` wrapped in a `try-catch (NumberFormatException)` block. While easy to read, string allocation and exception-driven control flow add unnecessary memory and runtime overhead compared to pure arithmetic.

### Optimized Approach

Extract digits from right to left using `% 10` and `/ 10` into a `long` accumulator `res`, then verify `res` fits within `[Integer.MIN_VALUE, Integer.MAX_VALUE]` before casting back to `int`.

### Step-by-Step Thinking Process

1. Initialize `long res = 0` so intermediate reversed values up to 10 digits (~`9 * 10^9`) never overflow during accumulation.
2. While `x != 0`, peel off the last signed digit via `x % 10`, shift `res` left one decimal place (`res * 10 + x % 10`), and truncate `x /= 10`.
3. Once `x == 0`, check if `res > Integer.MAX_VALUE || res < Integer.MIN_VALUE`; if so, return `0`.
4. Otherwise, safely cast `(int) res` and return it.

### Algorithm / Intuition

In `7reverse-integer.java`, the `while (x != 0)` loop processes one base-10 digit per iteration. Leading zeros in the reversed number (from trailing zeros in `x`, e.g., `x = 120` -> first iteration `res = 0 * 10 + 0 = 0`) vanish automatically. Because Java's `long` spans `[-9.22 * 10^18, 9.22 * 10^18]` and reversing a 10-digit 32-bit `int` produces at most `8,463,847,412` in magnitude, `res` cannot overflow a `long`. A single post-loop check against `Integer.MAX_VALUE` and `Integer.MIN_VALUE` catches any 32-bit overflow.

---

## Dry Run

**Input:** `x = 123`

| Iteration | `x` (Start) | `x % 10` | `res = res * 10 + x % 10` | `x /= 10` |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `123` | `3` | `0 * 10 + 3 = 3` | `12` |
| `2` | `12` | `2` | `3 * 10 + 2 = 32` | `1` |
| `3` | `1` | `1` | `32 * 10 + 1 = 321` | `0` |

Loop terminates (`x == 0`). `321` lies within `[-2147483648, 2147483647]`, so `(int) res` returns `321`.

---

## Complexity Analysis

- **Time Complexity:** `O(log10(|x|))` (or `O(1)` bounded by at most `10` iterations) — A 32-bit signed integer has at most `10` base-10 digits.
- **Space Complexity:** `O(1)` — Only a single `long` variable `res` is allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [7reverse-integer.java](./7reverse-integer.java) |

---

## Key Learnings

- Java's signed remainder (`-123 % 10 == -3`) lets a single `while (x != 0)` loop reverse both positive and negative numbers without `Math.abs(Integer.MIN_VALUE)` pitfalls.
- In interviews where 64-bit `long` is strictly disallowed, replace `long res` with `int res` and guard **before** multiplying: check `if (res > Integer.MAX_VALUE / 10 || res < Integer.MIN_VALUE / 10)` inside the loop.
- Arithmetic digit extraction (`% 10`, `/ 10`) avoids heap allocations entirely.
