---
comments: true
difficulty: Medium
tags:
  - Math
  - Recursion
---

# 50. Pow(x, n)

**[View Problem on LeetCode](https://leetcode.com/problems/powx-n/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0050` (`50`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

Implement `pow(x, n)`, which computes the floating-point base `x` raised to the signed integer exponent `n` (`x^n`).

---

## Examples

### Example 1

```text
Input: x = 2.00000, n = 10
Output: 1024.00000
```

### Example 2

```text
Input: x = 2.10000, n = 3
Output: 9.26100
```

### Example 3

```text
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
```

---

## Constraints

- `-100.0 < x < 100.0`

- `-2^31 <= n <= 2^31-1`

- `n` is an integer.

- Either `x` is not zero or `n > 0`.

- `-10^4 <= x^n <= 10^4`

---

## Problem Understanding

- **Extreme Exponent Range:** `n` spans the full 32-bit signed integer range `[-2^31, 2^31 - 1]` (`-2,147,483,648` to `2,147,483,647`), so any `O(|n|)` loop will immediately time out.
- **Negative Exponents:** By definition, `x^(-n) = 1 / (x^n)` (problem constraints guarantee `x != 0` whenever `n <= 0`).
- **JavaScript Number Semantics:** Unlike Java/C++ 32-bit `int` (where `-(-2^31)` overflows), JavaScript `number` uses IEEE-754 double-precision floats with 53 bits of exact integer precision (`Number.MAX_SAFE_INTEGER = 2^53 - 1`), so `-n` for `n = -2^31` safely evaluates to exact `+2147483648`.

---

## Approach

### Brute Force Approach

Multiplying `x` by itself `|n|` times in a loop (and taking `1 / result` if `n < 0`) takes `O(|n|)` time. When `n = 2^31 - 1`, over two billion multiplications must execute, exceeding time limits by orders of magnitude.

### Optimized Approach

Use **recursive binary exponentiation (exponentiation by squaring)**: handle `n === 0`, `n === 1`, and `n < 0` as base/sign cases, then repeatedly square the base (`x * x`) while halving the exponent (`n / 2` for even `n`, or `(n - 1) / 2` with an extra factor of `x` for odd `n`).

### Step-by-Step Thinking Process

1. Establish base cases: `x^0 = 1` for any `x`, and `x^1 = x`.
2. Normalize negative powers in one step: when `n < 0`, return `1 / myPow(x, -n)` so all remaining recursive calls operate on strictly positive integers `n >= 2`.
3. Exploit algebraic halving: if `n` is even (`n % 2 === 0`), then `x^n = (x^2)^(n / 2)`, cutting the remaining exponent in half with a single multiplication `x * x`.
4. If `n` is odd, peel off one `x` so the remaining exponent `n - 1` becomes even: `x^n = x * (x^2)^((n - 1) / 2)`.

### Algorithm / Intuition

In `myPow(x, n)`:
- `if (n === 0) return 1;` handles zero exponents immediately.
- `if (n === 1) return x;` stops recursion cleanly once the positive exponent reduces to `1`.
- `if (n < 0) return 1 / myPow(x, -n);` flips negative exponents to positive and takes the reciprocal.
- `if (n % 2 === 0) return myPow(x * x, n / 2);` squares the base argument directly in the tail call while halving `n`.
- Otherwise (`n` is odd), `return x * myPow(x * x, (n - 1) / 2);` multiplies `x` outside and recurses on `(n - 1) / 2` (which is an exact integer because `n` is odd).

Because every recursive call divides `n` by at least `2`, even `n = 2^31` finishes in at most `32` calls.

---

## Dry Run

**Input:** `x = 2.00000`, `n = 10`

1. `myPow(2, 10)` -> `n = 10` is even -> returns `myPow(2 * 2, 10 / 2)` = `myPow(4, 5)`.
2. `myPow(4, 5)` -> `n = 5` is odd -> returns `4 * myPow(4 * 4, (5 - 1) / 2)` = `4 * myPow(16, 2)`.
3. `myPow(16, 2)` -> `n = 2` is even -> returns `myPow(16 * 16, 2 / 2)` = `myPow(256, 1)`.
4. `myPow(256, 1)` -> hits base case `n === 1` -> returns `256`.
5. Unwinding the call stack:
   - `myPow(16, 2)` returns `256`.
   - `myPow(4, 5)` returns `4 * 256 = 1024`.
   - `myPow(2, 10)` returns **`1024`** (`1024.00000`).

---

## Complexity Analysis

- **Time Complexity:** `O(log |n|)` — Each recursive call halves the exponent `n`, performing at most `O(1)` arithmetic per level across at most `~32` levels for `|n| <= 2^31`.
- **Space Complexity:** `O(log |n|)` — The recursion call stack grows to depth `O(log |n|)`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [50powx-n.js](./50powx-n.js) |

---

## Key Learnings

- Binary exponentiation reduces `O(n)` repeated multiplication to `O(log n)` by exploiting `x^n = (x^2)^(n/2)`.
- Know your language's integer model: `-n` for `n = -2^31` is safe in JavaScript (`number` has 53-bit integer precision) and Python (arbitrary-precision `int`), whereas in Java or C++ `n` must first be widened to `long` (`long N = n;`) before negating.
- This recursion can also be written iteratively with a `while (n > 0)` bit-manipulation loop to achieve `O(1)` auxiliary space.
