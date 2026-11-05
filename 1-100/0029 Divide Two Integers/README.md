---
comments: true
difficulty: Medium
tags:
  - Math
  - Bit Manipulation
---

# 29. Divide Two Integers

**[View Problem on LeetCode](https://leetcode.com/problems/divide-two-integers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0029` (`29`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given two 32-bit signed integers `dividend` (`a`) and `divisor` (`b`) with `b != 0`, compute the integer quotient `a / b` truncated toward zero **without** using the multiplication (`*`), division (`/`), or modulo (`%`) operators.

Assume your environment can only store 32-bit signed integers in the range `[-2^31, 2^31 - 1]` (`[-2147483648, 2147483647]`). If the true quotient exceeds `2^31 - 1`, clamp and return `2^31 - 1`.

---

## Examples

### Example 1

```text
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
```

### Example 2

```text
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.
```

---

## Constraints

- `-2^31 <= dividend, divisor <= 2^31 - 1`

- `divisor != 0`

---

## Problem Understanding

- **32-bit asymmetry trap:** `Integer.MIN_VALUE` is `-2^31` (`-2147483648`), whereas `Integer.MAX_VALUE` is `2^31 - 1` (`2147483647`). Converting `-2^31` to a positive `int` overflows! However, every positive 32-bit `int` safely converts to a negative `int`.
- **Only overflow case:** Under integer division, the quotient overflows 32-bit signed range in exactly one case: `a == Integer.MIN_VALUE` and `b == -1`, whose mathematical quotient `+2^31` clamps to `Integer.MAX_VALUE`.
- **Truncation toward zero:** Determining the result sign (`sign`) upfront and dividing magnitudes drops any remainder naturally.

---

## Approach

### Brute Force Approach

Repeatedly subtracting `|b|` from `|a|` one copy at a time (`ans++` while `|a| >= |b|`) avoids `*` and `/`, but when `a = -2^31` and `b = -1` (or `b = 2`), it performs up to `2^31` loop iterations—timing out with `O(|a / b|)` complexity.

### Optimized Approach

The implemented Java solution uses **negative-domain conversion and exponential bit-shift doubling**. After handling `b == 1` and the overflow case `(Integer.MIN_VALUE, -1)`, it records whether `a` and `b` share the same `sign`, negates any positive operand so both `a` and `b` are negative, and repeatedly finds the largest power-of-two multiple `x = b * 2^k` (via `x <<= 1` and `cnt <<= 1`) that still satisfies `a <= x`, subtracting `x` from `a` and adding `cnt` to `ans`.

### Step-by-Step Thinking Process

1. Handle fast/overflow edge cases first: if `b == 1`, return `a`; if `a == Integer.MIN_VALUE && b == -1`, return `Integer.MAX_VALUE`.
2. Compute `boolean sign = (a > 0 && b > 0) || (a < 0 && b < 0)` to remember if the final quotient is positive.
3. Convert both `a` and `b` to negative numbers (`a = a > 0 ? -a : a; b = b > 0 ? -b : b;`) so `Integer.MIN_VALUE` never overflows a 32-bit `int`.
4. While `a <= b` (meaning `|a| >= |b|` in negative numbers), start with `x = b` and `cnt = 1`, and double both (`x <<= 1`, `cnt <<= 1`) as long as `x >= (Integer.MIN_VALUE >> 1)` (preventing `x << 1` underflow) and `a <= (x << 1)`.
5. Accumulate `ans += cnt`, reduce the remaining dividend `a -= x`, and once `a > b`, return `sign ? ans : -ans`.

### Algorithm / Intuition

Every non-negative quotient can be decomposed into powers of two (just like binary long division). Working with negative values (`a <= 0`, `b < 0`) neatly avoids needing `long` variables, because `[-2^31, 0]` covers the full magnitude range of all 32-bit signed integers. Inside the inner loop, the guard `x >= (Integer.MIN_VALUE >> 1)` (`-1073741824`) ensures that doubling `x` via `x << 1` cannot wrap around past `-2^31` before comparing `a <= (x << 1)`.

---

## Dry Run

Tracing Example 1: `a = 10`, `b = 3`

1. Edge checks pass (`b != 1`, not `MIN_VALUE / -1`). `sign = true` (both positive).
2. Convert to negative domain: `a = -10`, `b = -3`, `ans = 0`.
3. **Outer Iteration 1 (`a <= b`: `-10 <= -3`):**
   - Start `x = -3`, `cnt = 1`.
   - Check `a <= (x << 1)` (`-10 <= -6`): true -> `x = -6`, `cnt = 2`.
   - Check `a <= (x << 1)` (`-10 <= -12`): false -> inner loop stops.
   - `ans += 2` (`ans = 2`), `a -= (-6)` (`a = -4`).
4. **Outer Iteration 2 (`a <= b`: `-4 <= -3`):**
   - Start `x = -3`, `cnt = 1`.
   - Check `a <= (x << 1)` (`-4 <= -6`): false -> inner loop stops.
   - `ans += 1` (`ans = 3`), `a -= (-3)` (`a = -1`).
5. **Outer loop check (`-1 <= -3`):** false. Return `sign ? ans : -ans` -> `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(log^2 |a|)` (or `O(1)` bounded by 32-bit integer width) — Each outer iteration strips the highest remaining power-of-two bit of the quotient (at most `31` iterations), and the inner doubling loop runs at most `31` shifts per outer step.
- **Space Complexity:** `O(1)` — Uses only primitive 32-bit scalar variables (`sign`, `ans`, `x`, `cnt`) without `long` or arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [29divide-two-integers.java](./29divide-two-integers.java) |

---

## Key Learnings

- Flipping positive integers to negative (`a = a > 0 ? -a : a`) is the cleanest way in 32-bit arithmetic to handle `Integer.MIN_VALUE` without widening to 64-bit `long`.
- Before evaluating `x << 1` on a negative 32-bit `int`, checking `x >= (Integer.MIN_VALUE >> 1)` prevents signed bit-shift underflow.
- Exponential doubling (`x <<= 1`) simulates binary division by subtracting the largest power-of-two multiple of the divisor in logarithmic steps.
