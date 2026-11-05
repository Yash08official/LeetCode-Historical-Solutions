---
comments: true
difficulty: Easy
tags:
  - Math
  - String
  - Euclidean Algorithm
  - Greatest Common Divisor
---

# 1071. Greatest Common Divisor of Strings

**[View Problem on LeetCode](https://leetcode.com/problems/greatest-common-divisor-of-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1071` (`1071`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `String`, `Euclidean Algorithm`, `Greatest Common Divisor` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two non-empty uppercase strings `str1` and `str2`, we say a string `t` **divides** a string `s` if `s` can be constructed by concatenating `t` with itself one or more times (`s = t + t + ... + t`).

Return the **longest** string `x` that divides both `str1` and `str2`. If no common divisor string exists, return an empty string `""`.

---

## Examples

### Example 1

**Input:** `str1 = "ABCABC", str2 = "ABC"`

**Output:** `"ABC"`

### Example 2

**Input:** `str1 = "ABABAB", str2 = "ABAB"`

**Output:** `"AB"`

### Example 3

**Input:** `str1 = "LEET", str2 = "CODE"`

**Output:** `""`

### Example 4

**Input:** `str1 = "AAAAAB", str2 = "AAA"`

**Output:** `""`​​​​​​​

---

## Constraints

- `1 <= str1.length, str2.length <= 1000`

- `str1` and `str2` consist of English uppercase letters.

---

## Problem Understanding

- **Periodic Structure:** If `x` divides both `str1` and `str2`, then `str1` consists of `p` copies of `x` and `str2` consists of `q` copies of `x` for some positive integers `p, q`.
- **Commutativity Test:** If both strings are repetitions of a common base block, then `str1 + str2` and `str2 + str1` both equal `p + q` copies of that base block and must be identical. Conversely, if `str1 + str2 === str2 + str1`, mathematical periodicity guarantees they share a repeating base unit.
- **Maximal Length Property:** Any common divisor `x` must have length dividing both `str1.length` and `str2.length`. Therefore, the longest possible `x` has length `gcd(str1.length, str2.length)`.

---

## Approach

### Brute Force Approach

Try every prefix length `L` from `min(str1.length, str2.length)` down to `1`. For each `L` that divides both lengths, extract `candidate = str1.substring(0, L)` and rebuild `candidate.repeat(str1.length / L)` and `candidate.repeat(str2.length / L)` to verify equality with `str1` and `str2`. In the worst case (when lengths have many divisors), checking all candidates takes `O(min(m, n) * (m + n))` time.

### Optimized Approach

Verify whether a common divisor exists in `O(m + n)` time by checking `(str1 + str2) !== (str2 + str1)`. If they match, compute `gcd = getGCD(str1.length, str2.length)` using the Euclidean algorithm and return `str1.substring(0, gcd)`.

### Step-by-Step Thinking Process

1. Observe that if `str1` and `str2` are multiples of a common string `x`, concatenating them in either order (`str1 + str2` vs `str2 + str1`) yields the exact same string.
2. If `(str1 + str2) !== (str2 + str1)`, no common repeating block can exist, so immediately return `""`.
3. When they do commute, both strings are repetitions of the same minimal period, and the largest block dividing both lengths has size `gcd(str1.length, str2.length)`.
4. Compute `getGCD(a, b)` recursively via `getGCD(b, a % b)` until `b === 0`, then slice `str1.substring(0, gcd)`.

### Algorithm / Intuition

In `gcdOfStrings(str1, str2)`, the guard `if ((str1 + str2) !== (str2 + str1))` acts as a necessary and sufficient existence check in a single string comparison. Once passed, we know `str1` and `str2` are composed of a common atomic pattern.

Helper function `getGCD(a, b)` implements the recursive Euclidean algorithm: when `b === 0`, it returns `a`; otherwise it recurses on `(b, a % b)`. Storing the result in `gcd`, `str1.substring(0, gcd)` extracts the prefix of length `gcd`, which is guaranteed to tile both `str1` and `str2` completely and maximally.

---

## Dry Run

Using **Example 1** (`str1 = "ABCABC"`, `str2 = "ABC"`):

1. **Commutativity Check:**
   - `str1 + str2` = `"ABCABC" + "ABC"` = `"ABCABCABC"`.
   - `str2 + str1` = `"ABC" + "ABCABC"` = `"ABCABCABC"`.
   - Both strings are equal, so execution continues.
2. **Compute `getGCD(6, 3)`:**
   - `getGCD(6, 3)`: `b !== 0` -> calls `getGCD(3, 6 % 3)` = `getGCD(3, 0)`.
   - `getGCD(3, 0)`: `b === 0` -> returns `3`.
   - `gcd = 3`.
3. **Extract Result:**
   - `str1.substring(0, 3)` -> `"ABC"`, which is returned.

---

## Complexity Analysis

- **Time Complexity:** `O(m + n)` — Concatenating and comparing `str1 + str2` and `str2 + str1` takes `O(m + n)` time (where `m = str1.length` and `n = str2.length`), while `getGCD(m, n)` runs in `O(log(min(m, n)))` steps and `substring(0, gcd)` takes `O(gcd)` time.
- **Space Complexity:** `O(m + n)` — Creating the two concatenated strings `str1 + str2` and `str2 + str1` uses `O(m + n)` memory, plus `O(log(min(m, n)))` call-stack frames for `getGCD`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1071greatest-common-divisor-of-strings.js](./1071greatest-common-divisor-of-strings.js) |

---

## Key Learnings

- Two non-empty strings share a common repeating divisor if and only if `str1 + str2 === str2 + str1`.
- Once periodic compatibility is established, string divisibility reduces directly to integer divisibility on lengths via `gcd(m, n)`.
- The Euclidean algorithm `gcd(a, b) = gcd(b, a % b)` computes greatest common divisors in logarithmic time.
