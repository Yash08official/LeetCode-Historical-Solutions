---
comments: true
difficulty: Medium
tags:
  - Math
  - String
  - Simulation
---

# 43. Multiply Strings

**[View Problem on LeetCode](https://leetcode.com/problems/multiply-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0043` (`43`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `String`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given two non-negative integers `num1` and `num2` formatted as digit strings. Return their product as a string without leading zeros (unless the product itself is `"0"`).

You may **not** use built-in arbitrary-precision libraries (such as Java's `BigInteger`) or parse the entire input strings directly into primitive integer types.

---

## Examples

### Example 1

```text
Input: num1 = "2", num2 = "3"
Output: "6"
```

### Example 2

```text
Input: num1 = "123", num2 = "456"
Output: "56088"
```

---

## Constraints

- `1 <= num1.length, num2.length <= 200`

- `num1` and `num2` consist of digits only.

- Both `num1` and `num2` do not contain any leading zero, except the number `0` itself.

---

## Problem Understanding

- **Overflow Constraint:** Each string can be up to `200` digits long, meaning the product can reach `400` digits—far exceeding 64-bit `long` capacity (`~19` digits).
- **Product Length Bound:** Multiplying an `m`-digit positive integer by an `n`-digit positive integer always produces either `m + n - 1` or `m + n` digits. Specifically, `(10^m - 1) * (10^n - 1) < 10^(m + n)`.
- **Positional Alignment:** In grade-school multiplication, multiplying digit `num1[i]` (from left, 0-indexed) with digit `num2[j]` contributes directly to the place value at index `i + j + 1` in a 0-indexed array of length `m + n`, with carries propagating into index `i + j`.
- **Zero Edge Case:** If either `num1` or `num2` equals `"0"`, the product is immediately `"0"`.

---

## Approach

### Brute Force Approach

A naive simulation mimics paper-and-pencil long multiplication literally: multiply `num1` by each single digit of `num2` from right to left to generate `n` separate intermediate strings (appending trailing `'0'`s for place value), and then run string-addition routines to sum those `n` strings one by one. While still `O(m * n)`, repeatedly constructing, reversing, and adding intermediate strings creates substantial object-allocation overhead and error-prone carry logic.

### Optimized Approach

Allocate a single integer array `arr` of length `m + n` to accumulate all pairwise digit products `a * b` directly at index `i + j + 1`. Afterward, perform a single right-to-left pass over `arr` to propagate carries (`arr[i - 1] += arr[i] / 10`, `arr[i] %= 10`), skip at most one leading zero at `arr[0]`, and convert the digits into the final string.

### Step-by-Step Thinking Process

1. Handle the zero shortcut up front: if `"0".equals(num1)` or `"0".equals(num2)`, return `"0"` immediately so we never have to strip multiple leading zeros later.
2. Create `int[] arr = new int[m + n]`. Because `m`-digit times `n`-digit numbers have at least `m + n - 1` digits (when non-zero), at most `arr[0]` can remain `0` after carries finish.
3. Loop `i` from `m - 1` down to `0` and `j` from `n - 1` down to `0`. Convert characters to digits `a` and `b` and add `a * b` directly into `arr[i + j + 1]`. Defer carry handling until all products are summed—since `m, n <= 200` and `a * b <= 81`, each bucket holds at most `200 * 81 = 16200`, safely within 32-bit `int`.
4. Sweep `i` from `arr.length - 1` down to `1`, pushing `arr[i] / 10` into `arr[i - 1]` and keeping `arr[i] % 10` at `arr[i]`.
5. Start reading at index `1` if `arr[0] == 0` (otherwise index `0`), append each digit to a `StringBuilder`, and return `ans.toString()`.

### Algorithm / Intuition

In `multiply(String num1, String num2)`:
- The early guard `if ("0".equals(num1) || "0".equals(num2)) return "0";` guarantees both inputs represent strictly positive integers (`>= 1`).
- `int[] arr = new int[m + n]` reserves exact slots for all place values. The least significant digits are at `i = m - 1` and `j = n - 1`, whose product lands at `(m - 1) + (n - 1) + 1 = m + n - 1`—the very last slot of `arr`.
- The nested loops accumulate raw sums `arr[i + j + 1] += a * b` without normalizing digits on every step.
- A single cleanup loop `for (int i = arr.length - 1; i > 0; --i)` normalizes every bucket into `[0, 9]` by carrying `arr[i] / 10` one slot left. Note that `arr[0]` receives `arr[1] / 10` and is guaranteed `< 10` because the overall product is strictly less than `10^(m + n)`.
- Finally, `int i = arr[0] == 0 ? 1 : 0;` skips `arr[0]` if no carry reached the highest slot, and `StringBuilder ans` serializes the remaining digits.

---

## Dry Run

**Input (Example 1):** `num1 = "2"`, `num2 = "3"`

1. **Zero Check:** Neither string is `"0"`. `m = 1`, `n = 1`, `arr = [0, 0]` (length `2`).
2. **Pairwise Product Loop:**
   - `i = 0`: `a = '2' - '0' = 2`.
   - `j = 0`: `b = '3' - '0' = 3`.
   - `arr[0 + 0 + 1] = arr[1] += 2 * 3` -> `arr = [0, 6]`.
3. **Carry Propagation Loop (`i` from `1` down to `1`):**
   - `i = 1`: `arr[0] += 6 / 10` (`0`), `arr[1] = 6 % 10` (`6`) -> `arr = [0, 6]`.
4. **String Construction:**
   - `arr[0] == 0` is `true`, so starting index `i = 1`.
   - Loop `i = 1`: `ans.append(arr[1])` -> `"6"`.
5. **Output:** `"6"`

*(Quick check on multi-digit carry, e.g., `"12" * "3"`: `arr` starts `[0, 0, 0]` -> raw products give `[0, 3, 6]` or for `"12" * "9"` raw products give `[0, 9, 18]` -> carry pass turns `[0, 9, 18]` into `[0, 10, 8]` then `[1, 0, 8]` -> `"108"`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — The nested digit-multiplication loops run `m * n` times, followed by two linear `O(m + n)` passes for carry normalization and string building.
- **Space Complexity:** `O(m + n)` — We allocate `int[] arr` of length `m + n` and `StringBuilder ans` of capacity up to `m + n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [43multiply-strings.java](./43multiply-strings.java) |

---

## Key Learnings

- Index arithmetic `i + j + 1` cleanly maps 0-indexed string positions `(i, j)` directly to their place-value bucket inside a product array of length `m + n`.
- Deferring carry normalization to a single post-processing pass simplifies inner-loop logic and works safely whenever the maximum accumulated bucket sum cannot overflow `int`.
- Handling `"0"` early guarantees a positive product of length at least `m + n - 1`, reducing leading-zero removal to a single ternary check `arr[0] == 0 ? 1 : 0`.
