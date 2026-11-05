---
comments: true
difficulty: Easy
tags:
  - Math
  - Dynamic Programming
  - Memoization
---

# 1137. N-th Tribonacci Number

**[View Problem on LeetCode](https://leetcode.com/problems/n-th-tribonacci-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1137` (`1137`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Memoization` |
| **Solution Language** | JavaScript |

---

## Problem Description

The **Tribonacci** sequence is defined by the base cases `T_0 = 0`, `T_1 = 1`, and `T_2 = 1`, with each subsequent term equal to the sum of the three preceding terms:

`T_(n+3) = T_n + T_(n+1) + T_(n+2)` for `n >= 0`.

Given a non-negative integer `n` (`0 <= n <= 37`), compute and return `T_n`.

---

## Examples

### Example 1

```text
Input: n = 4
Output: 4
Explanation:
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
```

### Example 2

```text
Input: n = 25
Output: 1389537
```

---

## Constraints

- `0 <= n <= 37`

- The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.

---

## Problem Understanding

- **Three-Term Recurrence:** Just as Fibonacci sums the previous two values, Tribonacci sums the previous three values.
- **32-Bit Safe Bounds:** Since `n <= 37`, `T_37 = 2,082,876,103`, which fits comfortably below `2^31 - 1 = 2,147,483,647` (and well within JavaScript's `Number.MAX_SAFE_INTEGER`).
- **Constant State Dependency:** Computing the next state only ever requires the latest three values `(T_k, T_(k+1), T_(k+2))`.

---

## Approach

### Brute Force Approach

A direct recursive translation `tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3)` without memoization recomputes overlapping subproblems exponentially in `O(3^n)` time, timing out well before `n = 37`.

### Optimized Approach

Use iterative bottom-up dynamic programming with three rolling variables (`a = 0, b = 1, c = 1`), shifting the window `(a, b, c) -> (b, c, a + b + c)` exactly `n` times and returning `a`.

### Step-by-Step Thinking Process

1. Initialize a sliding three-element window `(a, b, c)` to `(T_0, T_1, T_2) = (0, 1, 1)`.
2. Observe that shifting `(a, b, c)` forward by one step sets `d = a + b + c`, then updates `a = b`, `b = c`, `c = d`, advancing the window to `(T_1, T_2, T_3)`.
3. After `k` shifts, `a` always holds `T_k`—including `k = 0`, where `0` shifts leave `a = T_0 = 0`!
4. Use `while (n--)` to perform `n` shifts and return `a` cleanly without needing special base-case `if` statements.

### Algorithm / Intuition

In `tribonacci(n)`, variables `a`, `b`, and `c` maintain the invariant `(a, b, c) == (T_k, T_(k+1), T_(k+2))` after `k` loop iterations.

The condition `while (n--)` tests the current value of `n` (stopping when `n` reaches `0`) and decrements `n` for the body. In each step, `let d = a + b + c` computes `T_(k+3)`, and `a = b; b = c; c = d;` slides the window forward by one index. Even for `n = 0`, `while (n--)` evaluates `0` (falsy) and immediately returns `a = 0`.

---

## Dry Run

Using **Example 1** (`n = 4`):

| Step | `n` (before `--`) | `a` | `b` | `c` | Computed `d = a + b + c` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Init | `4` | `0` (`T_0`) | `1` (`T_1`) | `1` (`T_2`) | — |
| Iter 1 | `4 -> 3` | `1` (`T_1`) | `1` (`T_2`) | `2` (`T_3`) | `0 + 1 + 1 = 2` |
| Iter 2 | `3 -> 2` | `1` (`T_2`) | `2` (`T_3`) | `4` (`T_4`) | `1 + 1 + 2 = 4` |
| Iter 3 | `2 -> 1` | `2` (`T_3`) | `4` (`T_4`) | `7` (`T_5`) | `1 + 2 + 4 = 7` |
| Iter 4 | `1 -> 0` | `4` (`T_4`) | `7` (`T_5`) | `13` (`T_6`) | `2 + 4 + 7 = 13` |
| Exit | `0` (stops) | **`4`** | `7` | `13` | Returns `a = 4` |

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The `while (n--)` loop executes `n` times, performing constant-time additions and variable assignments in each iteration.
- **Space Complexity:** `O(1)` — Only four scalar variables (`a`, `b`, `c`, and `d`) are used regardless of `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1137n-th-tribonacci-number.js](./1137n-th-tribonacci-number.js) |

---

## Key Learnings

- Returning the leading variable `a` of a rolling `(a, b, c)` window eliminates separate edge-case branches for `n = 0`, `n = 1`, and `n = 2`.
- Any `k`-th order linear recurrence can be reduced from `O(n)` DP table space to `O(k)` rolling variables (and even `O(k^3 log n)` time via matrix exponentiation if `n` were huge).
