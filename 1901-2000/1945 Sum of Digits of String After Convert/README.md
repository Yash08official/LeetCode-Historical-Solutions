---
comments: true
difficulty: Easy
tags:
  - String
  - Simulation
---

# 1945. Sum of Digits of String After Convert

**[View Problem on LeetCode](https://leetcode.com/problems/sum-of-digits-of-string-after-convert/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1945` (`1945`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given a lowercase English string `s` and an integer `k`, compute a final integer using two stages:

1. **Convert:** Replace every letter in `s` with its 1-based alphabet position (`'a' -> 1`, `'b' -> 2`, ..., `'z' -> 26`) and concatenate all those decimal representations into one giant number.
2. **Transform (`k` times):** Repeatedly replace the current number with the sum of its base-10 digits, performing this digit-sum operation `k` times in total.

Return the integer obtained after `k` transformations.

---

## Examples

### Example 1

**Input:** `s = "iiii", k = 1`

**Output:** `36`

**Explanation:**

The operations are as follows:

- Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999

- Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36

Thus the resulting integer is 36.

### Example 2

**Input:** `s = "leetcode", k = 2`

**Output:** `6`

**Explanation:**

The operations are as follows:

- Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545

- Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33

- Transform #2: 33 ➝ 3 + 3 ➝ 6

Thus the resulting integer is 6.

### Example 3

**Input:** `s = "zbax", k = 2`

**Output:** `8`

---

## Constraints

- `1 <= s.length <= 100`

- `1 <= k <= 10`

- `s` consists of lowercase English letters.

---

## Problem Understanding

- `s.length` can be up to `100`, so the converted string can have up to `200` decimal digits—far too large to parse into a `long` (`~19` digits) or `int` (`~10` digits) directly!
- However, `k >= 1` is guaranteed! That means we **always** perform at least Transform #1, which simply sums all individual digits of each letter's 1-to-26 value.
- After Transform #1, the maximum possible sum for `100` letters is `100 * (1 + 9) = 1000` (from `'s' = 19`), which easily fits inside a standard 32-bit `int`!

---

## Approach

### Brute Force Approach

Building an explicit `StringBuilder` of concatenated position strings (e.g., `"262124"`), converting characters back to digits to sum them into a new `String` `k` times, works without overflow (unlike `Long.parseLong`), but allocates unnecessary intermediate strings of length up to `200` when arithmetic directly on digit values suffices.

### Optimized Approach

Fuse the **Convert** step and **Transform #1** into a single pass over `s`: for each character `ch`, compute `v0 = ch - 'a' + 1` and add its tens digit (`v0 / 10`) and ones digit (`v0 % 10`) directly to `sumdigits`. Then run `k - 1` simple integer digit-sum loops on `sumdigits`.

### Step-by-Step Thinking Process

1. Realize that concatenating numbers as strings and summing all digits of the resulting string produces the **exact same sum** as summing the digits of each individual `1..26` number (`v0 / 10 + v0 % 10`).
2. Compute Transform #1 directly into `int sumdigits` while iterating over `s.toCharArray()`.
3. Since `1 <= k`, `1` transform is now complete; run a loop `for (int i = 1; i < k; i++)` to perform the remaining `k - 1` digit-sum transformations using `% 10` and `/ 10`.
4. Return `sumdigits`.

### Algorithm / Intuition

In `getLucky`, each letter `ch` maps to `v0 = ch - 'a' + 1` in `[1, 26]`. Because `v0` is at most two digits, `v0 / 10 + v0 % 10` extracts the exact sum of `v0`'s decimal digits (for single-digit `1..9`, `v0 / 10` is `0`). Accumulating this across all characters in `s` finishes both Conversion and Transform #1 without ever constructing a 200-digit string or `BigInteger`. Next, the loop `for (int i = 1; i < k; i++)` extracts digits from `temp = sumdigits` via `temp % 10` and `temp /= 10` into `v0`, updating `sumdigits = v0` for each of the remaining `k - 1` transforms.

---

## Dry Run

Tracing Example 1: `s = "iiii"`, `k = 1` (and noting how `k > 1` behaves):

| Step | Character / Iteration | Calculation | `sumdigits` |
| :--- | :--- | :--- | :--- |
| Convert + Transform #1 (`ch = 'i'`) | `'i'` (`1st`) | `v0 = 9`, `9 / 10 + 9 % 10 = 0 + 9 = 9` | `9` |
| Convert + Transform #1 (`ch = 'i'`) | `'i'` (`2nd`) | `v0 = 9`, `0 + 9 = 9` | `18` |
| Convert + Transform #1 (`ch = 'i'`) | `'i'` (`3rd`) | `v0 = 9`, `0 + 9 = 9` | `27` |
| Convert + Transform #1 (`ch = 'i'`) | `'i'` (`4th`) | `v0 = 9`, `0 + 9 = 9` | `36` |
| Remaining Transforms | `i = 1; i < 1` | Loop condition `1 < 1` is `false` (0 extra iterations) | `36` |

Returns `36`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + k)` — The first loop processes `n = s.length()` characters in `O(n)` time, and each of the `k - 1` subsequent transforms processes an integer `<= 1000` (at most 4 digits, i.e., `O(1)` work per transform).
- **Space Complexity:** `O(n)` — Calling `s.toCharArray()` in Java allocates a `char[]` copy of length `n` (using `s.charAt(i)` would reduce auxiliary space to `O(1)`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1945sum-of-digits-of-string-after-convert.java](./1945sum-of-digits-of-string-after-convert.java) |

---

## Key Learnings

- Never try to parse arbitrarily concatenated digit strings into `int` or `long`; check constraints (`s.length <= 100` -> up to 200 digits) first!
- Because addition is associative, summing digits of a concatenated string equals summing the digits of each piece individually—allowing Convert + Transform #1 to collapse into pure integer arithmetic.
