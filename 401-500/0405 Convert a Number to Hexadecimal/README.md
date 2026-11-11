---
comments: true
difficulty: Easy
tags:
  - Math
  - Bit Manipulation
---

# 405. Convert a Number to Hexadecimal

**[View Problem on LeetCode](https://leetcode.com/problems/convert-a-number-to-hexadecimal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0405` (`405`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given a 32-bit integer num, return a string representing its hexadecimal representation. For negative integers, two&rsquo;s complement method is used.

All the letters in the answer string should be lowercase characters, and there should not be any leading zeros in the answer except for the zero itself.

Note: You are not allowed to use any built-in library method to directly solve this problem.

 
Example 1:
Input: num = 26
Output: "1a"
Example 2:
Input: num = -1
Output: "ffffffff"

 
Constraints:


	-231 <= num <= 231 - 1

---

## Problem Understanding

- For any 32-bit integer, its two's complement hexadecimal representation has at most 8 hex digits (each hex digit corresponds to 4 binary bits).
- We iterate through the 8 nibbles (groups of 4 bits) from most significant to least significant, shifting right and masking with `0xf` (`1111` in binary).
- Leading zeros should be omitted unless the entire number is `0`.

---

## Approach

### Optimized Approach (Bitwise Shift and Masking)

1. If `num == 0`, immediately return `"0"`.
2. Iterate `i` from 7 down to 0:
   - Extract the 4-bit nibble: `x = (num >> (4 * i)) & 0xf`.
   - If `sb.length() > 0 || x != 0` (suppressing leading zeros):
     - Map `x` to `'0'-'9'` if $x < 10$, or `'a'-'f'` if $x \ge 10$.
     - Append character to `StringBuilder`.
3. Return `sb.toString()`.

---

## Dry Run

For `num = 26`:
- $i=7..2$: nibbles are 0 (suppressed).
- $i=1$: `(26 >> 4) & 0xf = 1` -> append `'1'`.
- $i=0$: `26 & 0xf = 10` -> append `'a'`.
Result: `"1a"`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ — Exactly 8 iterations processing 4 bits per step.
- **Space Complexity:** $O(1)$ auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [405convert-a-number-to-hexadecimal.java](./405convert-a-number-to-hexadecimal.java) |

---

## Key Learnings

- Arithmetic right shift preserves two's complement sign representation naturally without needing special negative number handling.
- Checking `sb.length() > 0 || x != 0` cleanly suppresses leading zeros.
