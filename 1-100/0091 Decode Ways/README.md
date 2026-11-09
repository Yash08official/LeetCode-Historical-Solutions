---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
---

# 91. Decode Ways

**[View Problem on LeetCode](https://leetcode.com/problems/decode-ways/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0091` (`91`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You have intercepted a secret message encoded as a string of numbers. The message is **decoded** via the following mapping:

- `"1"` -> `'A'`
- `"2"` -> `'B'`
- ...
- `"26"` -> `'Z'`

However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes (`"2"` and `"5"` vs `"25"`).

For example, `"11106"` can be decoded into:
- `"AAJF"` with the grouping `(1, 1, 10, 6)`
- `"KJF"` with the grouping `(11, 10, 6)`
- The grouping `(1, 11, 06)` is invalid because `"06"` is not a valid code (only `"6"` is valid).

Note: there may be strings that are impossible to decode.

Given a string `s` containing only digits, return the **number of ways** to **decode** it. If the entire string cannot be decoded in any valid way, return `0`.

---

## Examples

### Example 1

```text
Input: s = "12"
Output: 2
Explanation:
"12" could be decoded as "AB" (1 2) or "L" (12).
```

### Example 2

```text
Input: s = "226"
Output: 3
Explanation:
"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```

### Example 3

```text
Input: s = "06"
Output: 0
Explanation:
"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). In this case, the string is not a valid encoding, so return 0.
```

---

## Constraints

- `1 <= s.length <= 100`
- `s` contains only digits and may contain leading zero(s).

---

## Problem Understanding

- At each position `i`:
  1. A single digit `s[i-1]` is valid if it is not `'0'` (adds ways from `dp[i-1]`).
  2. A two-digit pair `s[i-2..i-1]` is valid if `s[i-2] != '0'` and the numeric value is between `10` and `26` inclusive (adds ways from `dp[i-2]`).
- Since `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, we can optimize space to $O(1)$ using two variables `f` ($dp[i-2]$) and `g` ($dp[i-1]$).

---

## Approach

### Optimized Approach (Dynamic Programming with $O(1)$ Space)

1. Let `f = 0` ($dp[i-2]$) and `g = 1` ($dp[i-1]$ base case for empty prefix).
2. For $i$ from $1$ to $n$:
   - Let `h = 0`.
   - If `s[i - 1] != '0'`, single-digit decoding is valid: `h = g`.
   - If $i > 1$, `s[i - 2] != '0'`, and the two-digit substring $s[i-2..i-1] \le 26$:
     - Two-digit decoding is valid: `h += f`.
   - Advance state: `f = g`, `g = h`.
3. Return `g`.

---

## Dry Run

Consider `s = "226"`:
- Initial: `f = 0, g = 1`.
- $i = 1$ (`'2'`): `h = g = 1`. `f = 1, g = 1`.
- $i = 2$ (`'2'`):
  - Single digit `'2'` != `'0'`: `h = 1`.
  - Two digits `"22"` <= 26: `h += f` (1 + 1 = 2).
  - Update: `f = 1, g = 2`.
- $i = 3$ (`'6'`):
  - Single digit `'6'` != `'0'`: `h = 2`.
  - Two digits `"26"` <= 26: `h += f` (2 + 1 = 3).
  - Update: `f = 2, g = 3`.
- Final result: `3`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Linear scan of length $N$ string with constant-time subproblem transitions.
- **Space Complexity:** $O(1)$ — Rolling variables `f`, `g`, `h` require no array allocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [91decode-ways.java](./91decode-ways.java) |

---

## Key Learnings

- The problem is isomorphic to Fibonacci / Climbing Stairs, with conditional transitions governed by valid digit ranges `[1..9]` and `[10..26]`.
- Rolling state variables reduce space complexity from $O(N)$ to $O(1)$ cleanly.
