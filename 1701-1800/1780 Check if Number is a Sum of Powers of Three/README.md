---
comments: true
difficulty: Medium
tags:
  - Math
---

# 1780. Check if Number is a Sum of Powers of Three

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1780` (`1780`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math` |
| **Solution Language** | Java |

---

## Problem Description

Given a positive integer `n`, return `true` if `n` can be expressed as a sum of **distinct** powers of three (`3^x` for non-negative integers `x >= 0`), and `false` otherwise.

---

## Examples

### Example 1

```text
Input: n = 12
Output: true
Explanation: 12 = 3^1 + 3^2
```

### Example 2

```text
Input: n = 91
Output: true
Explanation: 91 = 3^0 + 3^2 + 3^4
```

### Example 3

```text
Input: n = 21
Output: false
```

---

## Constraints

- `1 <= n <= 10^7`

---

## Problem Understanding

- **Distinct Powers = Binary Coefficients in Base 3:** Writing `n` as a sum of powers of `3` where each power `3^x` is used either `0` times or `1` time is equivalent to `n = d_0 * 3^0 + d_1 * 3^1 + d_2 * 3^2 + ...` with every ternary digit `d_k` in `{0, 1}`.
- **Uniqueness of Base-3 Representation:** Every positive integer has a **unique** base-3 (ternary) representation with digits in `{0, 1, 2}`. Moreover, since `1 + 3 + 9 + ... + 3^{k-1} = (3^k - 1) / 2 < 3^k`, you can never replace `2 * 3^k` using distinct smaller powers or larger powers of `3`!
- **Necessary & Sufficient Condition:** `n` is a sum of distinct powers of three if and only if its ternary representation contains **no digit `2`**.

---

## Approach

### Brute Force Approach

Since `3^{15} = 14,348,907 > 10^7`, there are only 15 powers of three (`3^0` through `3^{14}`) less than or equal to `10^7`. A brute-force approach could enumerate all `2^{15} = 32,768` subsets via bitmasking or recursive backtracking to check if any subset sums to `n`. While fast enough for `10^7`, it does far more work than examining base-3 digits directly.

### Optimized Approach

Repeatedly extract the least-significant base-3 digit `n % 3` and divide `n` by `3`. If any remainder exceeds `1` (i.e., `n % 3 == 2`), immediately return `false`; if `n` reaches `0`, return `true`.

### Step-by-Step Thinking Process

1. Express `n` in base 3: `n = d_0 + 3 * (d_1 + 3 * (d_2 + ...))`.
2. Observe that `n % 3` reveals `d_0`:
  - If `n % 3 == 0`, `3^0` is not included.
  - If `n % 3 == 1`, `3^0` is included once (`n - 1` becomes divisible by `3`).
  - If `n % 3 == 2`, no sum of higher powers `3^1, 3^2, ...` (all multiples of `3`) and at most one `3^0 = 1` can ever leave remainder `2` mod `3`!
3. Divide `n` by `3` (`n /= 3`) to shift right in base 3 and repeat while `n > 0`.

### Algorithm / Intuition

Modulo `3` gives a crystal-clear proof of why greedy/ternary digit checking works: every power `3^x` with `x >= 1` is divisible by `3`, and `3^0 = 1` can be used at most once. Therefore, any valid sum of distinct powers of `3` must have remainder `0` or `1` modulo `3` — never `2`! Once we subtract that `0` or `1` and divide by `3` (`n /= 3`), the exact same argument applies recursively to the remaining powers. Hence checking `n % 3 > 1` at each division step is completely airtight.

---

## Dry Run

Using **Example 1**: `n = 12` (and contrasting **Example 3**: `n = 21`)

**Trace for `n = 12`:**
- `n = 12 > 0`: `12 % 3 = 0` (`<= 1`), `n = 12 / 3 = 4`
- `n = 4 > 0`: `4 % 3 = 1` (`<= 1`), `n = 4 / 3 = 1`
- `n = 1 > 0`: `1 % 3 = 1` (`<= 1`), `n = 1 / 3 = 0`
- Loop ends (`n == 0`) -> returns `true` (`12 = (110)_3 = 3^2 + 3^1`).

*(For `n = 21`: `21 % 3 = 0 -> n = 7`; `7 % 3 = 1 -> n = 2`; `2 % 3 = 2 > 1` -> returns `false`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(log_3 n)` — Each iteration divides `n` by `3`, taking at most `15` iterations for `n <= 10^7`.
- **Space Complexity:** `O(1)` — Modifies `n` in place with zero auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1780check-if-number-is-a-sum-of-powers-of-three.java](./1780check-if-number-is-a-sum-of-powers-of-three.java) |

---

## Key Learnings

- Representing `n` as a sum of distinct powers of base `b` (`b >= 3`) is possible if and only if every base-`b` digit of `n` is `0` or `1`.
- Checking modular remainders (`n % 3`) proves impossibility immediately without needing backtracking.
