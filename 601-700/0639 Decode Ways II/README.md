---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
---

# 639. Decode Ways II

**[View Problem on LeetCode](https://leetcode.com/problems/decode-ways-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0639` (`639`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

A message containing letters from `A-Z` can be encoded into numbers using the following mapping:

```text
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above.

In addition to the digits `'0'`-`'9'`, the encoded message may also contain the `'*'` character, which can represent any digit from `'1'` to `'9'` (`'0'` is not allowed).

Given a string `s` consisting of digits and `'*'` characters, return the number of ways to decode it.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

---

## Examples

### Example 1

```text
Input: s = "*"
Output: 9
Explanation: The encoded message can represent any of the encoded messages "1", "2", "3", "4", "5", "6", "7", "8", or "9".
Each of these can be decoded to the strings "A", "B", "C", "D", "E", "F", "G", "H", and "I" respectively.
Hence, there are a total of 9 ways to decode "*".
```

### Example 2

```text
Input: s = "1*"
Output: 18
Explanation: The encoded message can represent any of the encoded messages "11", "12", "13", "14", "15", "16", "17", "18", or "19".
Each of these encoded messages have 2 ways to be decoded (e.g. "11" -> "AA" or "K").
Hence, there are a total of 9 * 2 = 18 ways to decode "1*".
```

### Example 3

```text
Input: s = "2*"
Output: 15
Explanation: The encoded message can represent any of the encoded messages "21", "22", "23", "24", "25", or "26".
There are 9 ways ("21" to "29") decoding as single letters, and 6 ways ("21" to "26") decoding as two digits. Total = 9 + 6 = 15.
```

---

## Constraints

- `1 <= s.length <= 10^5`
- `s[i]` is a digit or `'*'`.

---

## Problem Understanding

- Each character can be decoded individually if it forms a valid digit `1-9`.
- A pair of consecutive characters can be decoded together if they form a valid integer between `10` and `26`.
- The wildcard `'*'` expands into choices `1` through `9`.
- Dynamic programming state $dp[i]$ depends only on $dp[i - 1]$ (1-character decode) and $dp[i - 2]$ (2-character decode), allowing $O(1)$ auxiliary memory.

---

## Approach

### Optimized Approach (Constant-Space Dynamic Programming)

1. Let $a = dp[i - 2]$, $b = dp[i - 1]$, and $c = dp[i]$.
2. Initialize $a = 0, b = 1, c = 0$.
3. For each character $s[i - 1]$:
   - **Single digit transition:**
     - If $s[i - 1] == '*'$: $c = 9 	imes b \pmod{10^9 + 7}$.
     - If $s[i - 1] 
eq '0'$: $c = b$.
     - Else: $c = 0$.
   - **Two digit transition ($i > 1$):**
     - `'**'`: $15$ combinations ($9$ from `11-19` and $6$ from `21-26`) $ightarrow c += 15 	imes a$.
     - `'*d'`: if $d \le '6'$, prefix can be `'1'` or `'2'` ($2 	imes a$); if $d > '6'$, prefix can only be `'1'` ($1 	imes a$).
     - `'d*'`: if $d == '1'$, second digit can be `1-9` ($9 	imes a$); if $d == '2'$, second digit can be `1-6` ($6 	imes a$).
     - `'dd'`: if integer value $\in [10, 26]$, $c += a$.
   - Shift states: $a = b$, $b = c \pmod{10^9 + 7}$.
4. Return $(int) c$.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass over string $s$ of length $N$ with constant arithmetic operations per step.
- **Space Complexity:** $O(1)$ — Only three scalar variables (`a`, `b`, `c`) are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [639decode-ways-ii.java](./639decode-ways-ii.java) |

---

## Key Learnings

- Comprehensive case enumeration is required when combining wildcards with multi-character parsing rules.
- Rolling variables reduce space complexity from $O(N)$ to $O(1)$.
