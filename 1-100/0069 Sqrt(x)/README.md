---
comments: true
difficulty: Easy
tags:
  - Math
  - Binary Search
  - Newton's Method
---

# 69. Sqrt(x)

**[View Problem on LeetCode](https://leetcode.com/problems/sqrtx/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0069` (`69`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Binary Search`, `Newton's Method` |
| **Solution Language** | Java |

---

## Problem Description

Given a non-negative integer `x`, compute and return the integer part of its square root — that is, `sqrt(x)` rounded down toward zero to the nearest non-negative integer.

You must implement the calculation yourself without calling any built-in exponentiation functions or power operators (such as `Math.sqrt(x)`, `Math.pow(x, 0.5)`, or `x ** 0.5`).

---

## Examples

### Example 1

```text
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

### Example 2

```text
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
```

---

## Constraints

- `0 <= x <= 2^31 - 1`

---

## Problem Understanding

- We are looking for the largest non-negative integer `k` such that `k * k <= x`.
- Since `f(k) = k * k` is monotonically non-decreasing for `k >= 0`, the search space `[0, x]` satisfies a monotonic predicate (`k * k <= x` is `true` up to the answer, then `false` afterward), making Binary Search ideal.
- **Overflow Pitfall:** Because `x` can be as large as `2^31 - 1` (`Integer.MAX_VALUE`), computing `mid * mid` or `l + r + 1` in 32-bit signed integers can overflow. Using division (`mid > x / mid`) and unsigned right shift (`(l + r + 1) >>> 1`) avoids 32-bit integer overflow cleanly.

---

## Approach

### Brute Force Approach

A naive linear scan tests integers `k = 0, 1, 2, ...` one by one until `(long) (k + 1) * (k + 1) > x`, then returns `k`. While simple and constant-space, this requires up to `sqrt(x)` iterations (around `46,340` steps when `x = 2^31 - 1`), running in `O(sqrt(x))` time instead of logarithmic time.

### Optimized Approach

Perform a binary search over the range `[0, x]` to find the rightmost integer `mid` satisfying `mid <= x / mid`, using unsigned bit shifting `(l + r + 1) >>> 1` to select the upper midpoint without signed overflow.

### Step-by-Step Thinking Process

1. Formulate the target as finding the maximum integer `mid` in `[0, x]` such that `mid * mid <= x`.
2. Maintain two boundaries `l = 0` and `r = x` where the answer is guaranteed to lie inside `[l, r]`.
3. Because `l = mid` is used when `mid` is valid, choose the upper midpoint `(l + r + 1) >>> 1` so that when `r = l + 1`, `mid` evaluates to `r` rather than `l` (preventing an infinite loop).
4. Notice that `(l + r + 1)` could exceed `Integer.MAX_VALUE` as a signed `int`, so apply Java's unsigned right shift `>>> 1` to divide the unsigned 32-bit sum by 2 safely.
5. Compare `mid > x / mid` instead of `mid * mid > x` to avoid multiplication overflow; since `l < r` guarantees `l + r + 1 >= 2`, `mid` is always at least `1`, so `x / mid` never divides by zero.

### Algorithm / Intuition

In `mySqrt(int x)`, `l` starts at `0` and `r` starts at `x`. Inside `while (l < r)`, `mid = (l + r + 1) >>> 1` picks the upper middle candidate. Notice two crucial safety properties in this Java implementation:
1. Even if `l + r + 1` overflows into a negative signed `int` (for example when `x = 2147483647`), its raw 32-bit unsigned value is at most `2^32 - 2`, so `>>> 1` shifts in a `0` sign bit and produces the exact mathematical midpoint.
2. Whenever `l < r` with `l >= 0`, `l + r + 1 >= 2`, ensuring `mid >= 1`. Therefore `x / mid` is always safe from division-by-zero.

If `mid > x / mid` (equivalent to `mid * mid > x` over the reals since `mid >= 1`), `mid` is strictly too large, so we narrow the upper bound with `r = mid - 1`. Otherwise `mid` is a valid floor candidate, so we keep `mid` in the search range via `l = mid`. When `l == r`, `l` holds the exact integer square root.

---

## Dry Run

Tracing `x = 8` (Example 2, which demonstrates non-perfect square rounding; for Example 1 with `x = 4`, the steps similarly converge to `2`):

**Example 1 (`x = 4`):**

| Iteration | `l` | `r` | `mid = (l + r + 1) >>> 1` | `x / mid` | `mid > x / mid`? | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `0` | `4` | `(0 + 4 + 1) >>> 1 = 2` | `4 / 2 = 2` | `2 > 2` (False) | `l = 2` |
| 2 | `2` | `4` | `(2 + 4 + 1) >>> 1 = 3` | `4 / 3 = 1` | `3 > 1` (True) | `r = 3 - 1 = 2` |
| End | `2` | `2` | Loop terminates (`l == r`) | - | - | Return `2` |

---

## Complexity Analysis

- **Time Complexity:** `O(log x)` — Each iteration halves the search interval `[l, r]`, taking at most `32` iterations for any 32-bit integer `x`.
- **Space Complexity:** `O(1)` — Only three scalar integer variables (`l`, `r`, `mid`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [69sqrtx.java](./69sqrtx.java) |

---

## Key Learnings

- When binary searching for the **maximum** valid value (`l = mid`), always compute the upper midpoint `(l + r + 1) >>> 1` so two-element intervals `[l, l + 1]` make progress.
- Java's unsigned right-shift operator `>>> 1` safely halves `l + r + 1` even if `l + r + 1` wraps past `Integer.MAX_VALUE` into negative two's-complement territory.
- Rewriting `mid * mid > x` as `mid > x / mid` prevents 32-bit multiplication overflow without casting to `long`, provided `mid > 0` is guaranteed.
