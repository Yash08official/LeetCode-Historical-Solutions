---
comments: true
difficulty: Medium
tags:
  - Math
---

# 172. Factorial Trailing Zeroes

**[View Problem on LeetCode](https://leetcode.com/problems/factorial-trailing-zeroes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0172` (`172`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math` |
| **Solution Language** | Java |

---

## Problem Description

Given a non-negative integer `n`, return the number of **trailing zeroes** in the decimal representation of `n!` (`n * (n - 1) * ... * 2 * 1`, with `0! = 1`).

---

## Examples

### Example 1

```text
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.
```

### Example 2

```text
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
```

### Example 3

```text
Input: n = 0
Output: 0
```

---

## Constraints

- `0 <= n <= 10^4`

---

## Follow-up Questions

Could you write a solution that works in logarithmic time complexity?

The implemented `while (n > 0)` loop already runs in **`O(log n)` logarithmic time** (`O(log_5 n)` divisions) and `O(1)` space.

---

## Problem Understanding

- **Factorial Overflow:** Even `21!` overflows a signed 64-bit integer, and `10000!` has over `35,600` digits—computing `n!` explicitly is either impossible in fixed-width integers or far too slow with arbitrary-precision arithmetic.
- **Prime Factorization of `10`:** Every trailing zero in base `10` comes from a factor of `10 = 2 * 5` in the prime factorization of `n!`.
- **Factors of `5` Are the Bottleneck:** Across `1..n`, every second integer supplies at least one factor of `2`, whereas only every fifth integer supplies a factor of `5`. Since `count(2) >= count(5)` always holds, the number of trailing zeroes equals the **exact exponent of prime `5`** in `n!`.

---

## Approach

### Brute Force Approach

Computing `n!` using `BigInteger` multiplication from `1` to `n` and counting trailing `'0'` characters or dividing by `10` takes `O(n^2 log^2 n)` bit operations and `O(n log n)` memory for `n = 10^4`.

### Optimized Approach

Apply **Legendre's Formula** iteratively: repeatedly divide `n` by `5` (`n /= 5`) and add the quotient to `ans` until `n` reaches `0`.

### Step-by-Step Thinking Process

1. Count how many multiples of `5` exist in `1..n`: there are `floor(n / 5)` such numbers, each contributing at least one factor of `5`.
2. Multiples of `25 = 5^2` (`25, 50, 75, ...`) contribute a *second* factor of `5` not yet counted—there are `floor(n / 25)` of them.
3. Similarly, multiples of `125 = 5^3` contribute a *third* factor of `5`, and in general `5^k` contributes `floor(n / 5^k)` extra factors.
4. Instead of computing powers `5^k` (which could overflow if `n` were near `Integer.MAX_VALUE`), observe that `floor(floor(n / 5) / 5) == floor(n / 25)`.
5. Loop `while (n > 0)`: update `n /= 5` and add `ans += n`.

### Algorithm / Intuition

In `trailingZeroes(int n)`, each `n /= 5` step scales the range down by a factor of `5`. On pass 1, `n / 5` counts every multiple of `5` (`5, 10, 15, 20, 25, ...`). Dividing by `5` maps `{5, 10, 15, 20, 25, ...}` onto `{1, 2, 3, 4, 5, ...}`, so on pass 2, dividing that quotient by `5` counts how many originally had *at least two* factors of `5` (`25, 50, ...`), and so on until `n` becomes `0`.

---

## Dry Run

Trace on **Example 1**: `n = 3`

1. `ans = 0`.
2. Iteration 1 (`n = 3 > 0`): `n = 3 / 5 = 0`, `ans = 0 + 0 = 0`.
3. Loop `while (n > 0)` terminates; returns `0`.

*(Additional trace on `n = 25` to see multi-power accumulation: Iter 1: `n = 25 / 5 = 5`, `ans = 5`; Iter 2: `n = 5 / 5 = 1`, `ans = 6`; Iter 3: `n = 1 / 5 = 0`, `ans = 6` -> returns `6`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(log_5 n)` (i.e., `O(log n)`) — `n` shrinks by a factor of `5` every iteration; for `n <= 10^4`, the loop runs at most `6` times.
- **Space Complexity:** `O(1)` — Only the accumulator `ans` and parameter `n` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [172factorial-trailing-zeroes.java](./172factorial-trailing-zeroes.java) |

---

## Key Learnings

- Legendre's formula computes the exact power of any prime `p` dividing `n!` as `sum_{k >= 1} floor(n / p^k)`.
- Dividing `n /= 5` iteratively is superior to multiplying a divisor `p *= 5` because `p *= 5` can overflow 32-bit `int` when `n` approaches `2^31 - 1`.
- Trailing zeroes in any base `B` generalize to finding `min_i floor(exponent_of(p_i in n!) / e_i)` over the prime factorization `B = prod p_i^{e_i}`.
