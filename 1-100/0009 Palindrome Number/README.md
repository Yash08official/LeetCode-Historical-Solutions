---
comments: true
difficulty: Easy
tags:
  - Math
---

# 9. Palindrome Number

**[View Problem on LeetCode](https://leetcode.com/problems/palindrome-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0009` (`9`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a signed 32-bit integer `x`, return `true` if `x` reads identically from left to right and from right to left (including any sign character), and `false` otherwise.

---

## Examples

### Example 1

```text
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

### Example 2

```text
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

### Example 3

```text
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

---

## Constraints

- `-2^31 <= x <= 2^31 - 1`

---

## Follow-up Questions

Could you solve it without converting the integer to a string?

This solution directly satisfies the follow-up constraint by performing pure base-10 arithmetic (`% 10` and `~~(x / 10)`) without converting `x` to a string.

---

## Problem Understanding

- **Negative numbers are never palindromes:** Any `x < 0` begins with `'-'` on the left and ends with a digit on the right (e.g., `-121` reversed is `121-`), so `x < 0` immediately returns `false`.
- **Trailing zero trap:** If `x > 0` ends in `0` (i.e., `x % 10 === 0`, such as `10` or `100`), its first digit would have to be `0` to be a palindrome — impossible for any positive integer without leading zeros! Only `x === 0` itself is valid while ending in `0`.
- **Half-reversal stops naturally:** If we transfer digits from the right of `x` into `y`, we reach the midpoint as soon as `y >= x`.

---

## Approach

### Brute Force Approach

Convert `x` to a string (`String(x)`) and compare characters from both ends (or compare against `String(x).split('').reverse().join('')`). While `O(d)` in digit count `d`, string allocation uses `O(d)` heap space and violates the classic follow-up requirement to solve it purely with math.

### Optimized Approach

Reject negatives and positive multiples of `10` upfront, then reverse **only the second half** of `x`'s digits into `y` until `y >= x` and check `x === y` (even length) or `x === ~~(y / 10)` (odd length).

### Step-by-Step Thinking Process

1. Return `false` immediately if `x < 0` or `(x > 0 && x % 10 === 0)`.
2. Initialize `y = 0` to hold the reversed lower half of `x`.
3. While `y < x`, append `x`'s last digit to `y` (`y = y * 10 + (x % 10)`) and chop off `x`'s last digit using integer truncation `x = ~~(x / 10)`.
4. When the loop stops (`y >= x`), `x` has an even number of digits if `x === y`, or an odd number of digits (where the middle digit landed at the end of `y`) if `x === ~~(y / 10)`.

### Algorithm / Intuition

In `9palindrome-number.js`, guarding `(x > 0 && x % 10 === 0)` upfront is **essential** for correctness, not just an optimization: if `x = 10` entered the loop, `y` would stay `0` after the first step (`x = 1, y = 0`), then become `y = 1, x = 0`, where `x === ~~(y / 10)` (`0 === 0`) would falsely return `true`! Notice also the double bitwise NOT operator `~~(x / 10)`, which truncates positive floating-point quotients to 32-bit signed integers cleanly in JavaScript (equivalent to `Math.trunc(x / 10)` for `0 <= x <= 2^31 - 1`). Because `y` accumulates at most `5`–`6` digits, `y` can never overflow a 32-bit integer.

---

## Dry Run

**Input:** `x = 121`

1. Guard check: `121 < 0` is `false`; `121 > 0 && 121 % 10 === 0` is `false`.
2. Initialize `y = 0`.
3. **Iteration 1 (`0 < 121`):**
   - `y = 0 * 10 + (121 % 10) = 1`
   - `x = ~~(121 / 10) = 12`
4. **Iteration 2 (`1 < 12`):**
   - `y = 1 * 10 + (12 % 10) = 12`
   - `x = ~~(12 / 10) = 1`
5. Loop condition `12 < 1` is `false` -> exit loop.
6. Return `1 === 12` (`false`) `||` `1 === ~~(12 / 10)` (`1 === 1`, `true`) -> **`true`**.

---

## Complexity Analysis

- **Time Complexity:** `O(log10(x))` — Processes only half the base-10 digits of `x` (at most `5`–`6` iterations for a 32-bit integer).
- **Space Complexity:** `O(1)` — Uses only a single numeric variable `y` with zero string allocations.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [9palindrome-number.js](./9palindrome-number.js) |

---

## Key Learnings

- Reversing only half the integer eliminates any risk of 32-bit integer overflow while cutting loop iterations in half.
- Rejecting `x > 0 && x % 10 === 0` before half-reversal is mandatory because numbers with trailing zeros lose their leading zero in `y`.
- JavaScript's `~~(n)` coerces a number to a 32-bit signed integer by truncating toward zero — safe here because `0 <= x <= 2^31 - 1`.
