---
comments: true
difficulty: Hard
tags:
  - Math
  - Enumeration
---

# 479. Largest Palindrome Product

**[View Problem on LeetCode](https://leetcode.com/problems/largest-palindrome-product/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0479` (`479`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Enumeration` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n` (`1 <= n <= 8`), find the **largest palindromic integer** that can be expressed as the product of two `n`-digit positive integers.

Because the largest palindrome product can have up to `2n` (`16`) digits, return that palindrome **modulo `1337`** (importantly, maximize the palindrome *before* taking the remainder modulo `1337`).

---

## Examples

### Example 1

```text
Input: n = 2
Output: 987
Explanation: 99 x 91 = 9009, 9009 % 1337 = 987
```

### Example 2

```text
Input: n = 1
Output: 9
```

---

## Constraints

- `1 <= n <= 8`

---

## Problem Understanding

- **Digit count of product:** Two `n`-digit integers lie in `[10^(n-1), 10^n - 1]`. Their product has at most `2n` digits (up to `(10^n - 1)^2 < 10^(2n)`).
- **Enumerating palindromes vs. enumerating pairs:** Enumerating all pairs of `n`-digit numbers takes `O(10^(2n))` (`10^16` for `n = 8`—impossible!). By contrast, an even-length `2n`-digit palindrome is completely determined by its `n`-digit upper half `a` (`<= 9 * 10^(n-1)` candidates), and the largest factorable palindrome appears very near the top of that descending range!
- **Base case `n = 1`:** For `n = 1`, the maximum product of two 1-digit numbers is `9 * 9 = 81`, and no 2-digit palindrome `<= 81` (`77, 66, ..., 11`) factors into two 1-digit numbers (`77 = 7 * 11`, `66 = 6 * 11`, etc.), so the largest palindrome product is the 1-digit palindrome `9` (`9 * 1` or `3 * 3`).

---

## Approach

### Brute Force Approach

Testing all pairs `(i, j)` of `n`-digit integers (`10^(n-1) <= i, j <= 10^n - 1`), checking whether `i * j` is a palindrome, and tracking the maximum takes `O(n * 10^(2n))` time.

Even for `n = 6`, `10^12` iterations far exceed time limits.

### Optimized Approach

Use **Descending Even-Length Palindrome Enumeration + Bounded Divisor Check**: construct `2n`-digit palindromes `x` in strictly decreasing order from their `n`-digit left half `a` (`10^n - 1` down to `10^(n-1)`), and test `n`-digit divisors `t` from `mx` down while `t * t >= x`, returning `x % 1337` on the first hit (with fallback `9` for `n = 1`).

### Step-by-Step Thinking Process

1. Compute the largest `n`-digit integer `mx = 10^n - 1`.
2. For `n >= 2`, the largest palindrome product has `2n` digits. Iterate its `n`-digit upper half `a` downward from `mx` while `a > mx / 10`.
3. Mirror `a` onto itself (`x = a`, then repeatedly shift `x = x * 10 + b % 10`) to form the `2n`-digit palindrome `x` in strictly decreasing order—meaning the very first factorable `x` we find is guaranteed to be the global maximum!
4. To check if `x` splits into two `n`-digit factors `t` and `x / t` (assuming `t >= x / t`), iterate `t` downward from `mx` while `t * t >= x`: if `t * t < x`, then the cofactor `x / t` would exceed `t`, which we either already tested or exceeds `mx` (`> n` digits)!
5. If `x % t == 0`, both `t <= mx` and `x / t <= t <= mx` (and `x / t >= 10^(n-1)` since `x >= 10^(2n-1)` and `t < 10^n`), so immediately return `(int) (x % 1337)`. If the loop finishes without finding a `2n`-digit solution (which occurs only when `n == 1`), return `9`.

### Algorithm / Intuition

In `largestPalindrome(int n)`:
- `mx = (int) Math.pow(10, n) - 1` sets the upper bound for `n`-digit factors.
- Outer loop `for (int a = mx; a > mx / 10; --a)` builds `long x` (up to `16` digits for `n = 8`, fitting comfortably inside signed 64-bit `long` up to `9.22 * 10^18`) by appending `a`'s reversed digits.
- Inner loop `for (long t = mx; t * t >= x; --t)` uses `long t` so `t * t` never overflows 32 bits (`(10^8)^2 = 10^16`). As soon as `t * t < x`, no valid factor pair `(t, x / t)` with both factors `<= mx` can exist, pruning the search immediately!
- For `n = 1`, `mx = 9`: `x` tests `99, 88, ..., 11`, none of which divide evenly by `t in [4..9]`, falling through cleanly to `return 9;`.

---

## Dry Run

Tracing **Example 1** with `n = 2` (`mx = 99`, `mx / 10 = 9`):

- `a = 99` -> `x = 9999`: `t = 99` has `t * t = 9801 < 9999` -> inner loop terminates immediately.
- `a = 98` -> `x = 9889`: `t = 99` has `9801 < 9889` -> inner loop terminates.
- `a = 97` -> `x = 9779`: `t = 99` (`9801 >= 9779`, `9779 % 99 = 77 != 0`); `t = 98` (`9604 < 9779`) -> stops.
- `a = 96 .. 91` -> `x = 9669 .. 9119`: tested `t` values (`99`, `98`, ..., `96`) do not divide `x` before `t * t < x`.
- `a = 90` -> `x = 9009`: `t = 99` (`9801 >= 9009`), `9009 % 99 == 0` (`9009 = 99 * 91`)!
- Immediately returns `(int) (9009 % 1337) = 987`.

---

## Complexity Analysis

- **Time Complexity:** `O(10^(2n))` worst-case upper bound, `O(10^n)` in practice — For `n <= 8`, a valid palindrome appears near `mx`, and the `t * t >= x` cutoff restricts `t` to a small window near `mx`.
- **Space Complexity:** `O(1)` — Uses only primitive `int` and `long` variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [479largest-palindrome-product.java](./479largest-palindrome-product.java) |

---

## Key Learnings

- Generating structured targets (palindromes) from largest to smallest and testing factorability is orders of magnitude faster than generating unstructured products and testing palindromicity.
- The stopping condition `t * t >= x` serves double duty: it avoids redundant symmetric factor checks AND enforces that the cofactor `x / t` cannot exceed `mx`.
- Using `long` for `t` prevents 32-bit overflow in `t * t` when `n >= 5`.
