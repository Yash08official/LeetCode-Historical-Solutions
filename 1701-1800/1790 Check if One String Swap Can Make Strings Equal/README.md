---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
  - Counting
---

# 1790. Check if One String Swap Can Make Strings Equal

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1790` (`1790`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given two equal-length lowercase strings `s1` and `s2`. A **string swap** consists of picking two indices in **one** string (possibly the same index) and swapping their characters.

Return `true` if `s1` and `s2` can be made identical using **at most one** string swap on one of the strings, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: s1 = "bank", s2 = "kanb"
Output: true
Explanation: For example, swap the first character with the last character of s2 to make "bank".
```

### Example 2

```text
Input: s1 = "attack", s2 = "defend"
Output: false
Explanation: It is impossible to make them equal with one string swap.
```

### Example 3

```text
Input: s1 = "kelb", s2 = "kelb"
Output: true
Explanation: The two strings are already equal, so no string swap operation is required.
```

---

## Constraints

- `1 <= s1.length, s2.length <= 100`

- `s1.length == s2.length`

- `s1` and `s2` consist of only lowercase English letters.

---

## Problem Understanding

- **Zero Swaps Needed:** If `s1` and `s2` already match at every index (`0` mismatches), `0` swaps (or swapping an index with itself) leaves them equal -> `true`.
- **One Swap Needed:** Swapping two distinct indices `i` and `j` in `s2` changes at most `2` positions. For `s1` and `s2` to become equal, there must be **exactly `2`** mismatched positions `i < j`, and cross-characters must match: `s1[i] == s2[j]` and `s1[j] == s2[i]`.
- **Impossible Cases:** Having `1` mismatch or `>= 3` mismatches can never be resolved by a single swap.

---

## Approach

### Brute Force Approach

A brute-force approach checks if `s1.equals(s2)`, and otherwise tries swapping every pair of indices `(i, j)` (`0 <= i < j < n`) in `s2` and comparing the resulting string of length `n` with `s1`. Trying `O(n^2)` pairs with `O(n)` string comparison takes `O(n^3)` time and `O(n)` extra space.

### Optimized Approach

Scan both strings once in lockstep, counting mismatched positions `cnt` and storing the characters `(c1, c2)` of the first mismatch. Fail immediately if `cnt > 2` or if the second mismatch fails `a == c2 && b == c1`; finally verify `cnt != 1`.

### Step-by-Step Thinking Process

1. Maintain mismatch count `cnt = 0` and placeholders `c1`, `c2` for the mismatched characters at the first differing index.
2. Iterate index `i` from `0` to `s1.length() - 1`, reading `a = s1.charAt(i)` and `b = s2.charAt(i)`.
3. Whenever `a != b`, increment `cnt`. If `cnt > 2`, or if `cnt == 2` and `(a != c2 || b != c1)`, return `false` right away.
4. Record `c1 = a` and `c2 = b` (important on the first mismatch when `cnt == 1`).
5. After finishing the loop, `cnt` can only be `0`, `1`, or a valid `2`. Return `cnt != 1` so `cnt == 0` and valid `cnt == 2` return `true` while `cnt == 1` returns `false`.

### Algorithm / Intuition

Instead of collecting all mismatch indices into a list, `c1` and `c2` remember the character pair `(s1[i_1], s2[i_1])` from the first mismatch (`cnt == 1`). When the second mismatch (`cnt == 2`) arrives with `(a, b) = (s1[i_2], s2[i_2])`, swapping `i_1` and `i_2` works if and only if `a == c2` and `b == c1`. If a third mismatch ever appears (`++cnt > 2`), the method short-circuits with `false`. Finally, `return cnt != 1` neatly rejects the lone single-mismatch edge case.

---

## Dry Run

Using **Example 1**: `s1 = "bank"`, `s2 = "kanb"`

Initially: `cnt = 0`, `c1 = 0`, `c2 = 0`.

| `i` | `a` (`s1[i]`) | `b` (`s2[i]`) | `a != b`? | Action & Check | State After |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `'b'` | `'k'` | Yes | `++cnt -> 1` (valid) | `cnt = 1, c1 = 'b', c2 = 'k'` |
| `1` | `'a'` | `'a'` | No | — | `cnt = 1, c1 = 'b', c2 = 'k'` |
| `2` | `'n'` | `'n'` | No | — | `cnt = 1, c1 = 'b', c2 = 'k'` |
| `3` | `'k'` | `'b'` | Yes | `++cnt -> 2`; `'k' == c2` & `'b' == c1` (valid) | `cnt = 2, c1 = 'k', c2 = 'b'` |

End of loop: `cnt != 1` (`2 != 1`) -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Inspects at most `n` character pairs once, with early exit on invalid mismatches.
- **Space Complexity:** `O(1)` — Uses only primitive variables (`cnt`, `c1`, `c2`, `a`, `b`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1790check-if-one-string-swap-can-make-strings-equal.java](./1790check-if-one-string-swap-can-make-strings-equal.java) |

---

## Key Learnings

- A single transposition affects either `0` or `2` positions — never `1` and never `3` or more.
- Tracking just the previous mismatch characters `(c1, c2)` eliminates any need for frequency arrays or index lists.
