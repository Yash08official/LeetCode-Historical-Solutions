---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Backtracking
---

# 17. Letter Combinations of a Phone Number

**[View Problem on LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0017` (`17`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Backtracking` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a string `digits` of length `1` to `4` containing characters from `'2'` through `'9'`, return all possible letter strings that `digits` could represent on a classic telephone keypad:

- `'2': "abc"`, `'3': "def"`, `'4': "ghi"`, `'5': "jkl"`, `'6': "mno"`, `'7': "pqrs"`, `'8': "tuv"`, `'9': "wxyz"`.

Return the combinations in any order.

---

## Examples

### Example 1

```text
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Example 2

```text
Input: digits = "2"
Output: ["a","b","c"]
```

---

## Constraints

- `1 <= digits.length <= 4`

- `digits[i]` is a digit in the range `['2', '9']`.

---

## Problem Understanding

- **Cartesian product:** Each digit at position `idx` multiplies the number of partial prefixes by `3` (or `4` for `'7'` and `'9'`).
- **Small max output:** Since `digits.length <= 4`, the total number of combinations is at most `4^4 = 256` strings of length `4`.
- **Empty guard:** Although current LeetCode constraints state `1 <= digits.length <= 4`, handling `digits.length === 0` by returning `[]` (rather than `['']`) is an essential defensive guard.

---

## Approach

### Brute Force Approach

Write `4` hardcoded nested loops padded for shorter lengths, or repeatedly rebuild combinations from scratch by indexing base-4/base-3 counters. Hardcoding depth doesn't generalize cleanly across lengths `1..4`.

### Optimized Approach

Build combinations iteratively **level by level** (BFS-style): start with `ans = ['']`, and for each digit in `digits`, expand every prefix in `ans` with every mapped letter of that digit.

### Step-by-Step Thinking Process

1. Return `[]` immediately if `digits.length === 0`.
2. Seed `ans = ['']` (a single empty prefix) and define the `0`-indexed keypad lookup array `d = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']` where digit `i` maps to `d[+i - 2]`.
3. For each digit character `i` of `digits`, look up its letters `s = d[+i - 2]` and create a temporary array `t = []`.
4. Take the Cartesian product of existing prefixes `a` in `ans` and characters `b` in `s`, pushing `a + b` into `t`.
5. Replace the contents of `ans` with `t` via `ans.splice(0, ans.length, ...t)` and return `ans` after all digits are processed.

### Algorithm / Intuition

In `17letter-combinations-of-a-phone-number.js`, instead of recursive backtracking, the solution performs an iterative breadth-first expansion. Why must `digits.length === 0` be checked before seeding `ans = ['']`? Because `['']` acts as the multiplicative identity for Cartesian products (`[''] x ['a','b','c'] = ['a','b','c']`), whereas zero digits should yield `0` combinations (`[]`), not `['']`. Using unary plus `+i - 2` converts `'2'..'9'` directly to array indices `0..7`.

---

## Dry Run

**Input:** `digits = "23"`

1. `digits.length` is `2 !== 0`. Initialize `ans = ['']`.
2. **Digit `'2'` (`+i - 2 = 0`, `s = "abc"`):**
   - Expand `a = ''` with `'a'`, `'b'`, `'c'` -> `t = ['a', 'b', 'c']`.
   - `ans` becomes `['a', 'b', 'c']`.
3. **Digit `'3'` (`+i - 2 = 1`, `s = "def"`):**
   - `a = 'a'` -> `'ad', 'ae', 'af'`
   - `a = 'b'` -> `'bd', 'be', 'bf'`
   - `a = 'c'` -> `'cd', 'ce', 'cf'`
   - `ans` becomes `['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']`.

**Output:** `["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]`

---

## Complexity Analysis

- **Time Complexity:** `O(n * 4^n)` — For `n = digits.length`, there are at most `4^n` final combinations, and concatenating strings up to length `n` across levels totals `O(n * 4^n)` work.
- **Space Complexity:** `O(n * 4^n)` — `ans` and `t` hold up to `4^n` strings of length `n` (at most `256` 4-character strings for `n <= 4`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [17letter-combinations-of-a-phone-number.js](./17letter-combinations-of-a-phone-number.js) |

---

## Key Learnings

- Iterative level-by-level Cartesian product expansion achieves the same combinations as recursive DFS backtracking without recursion overhead.
- Seeding `ans = ['']` simplifies the first iteration so it needs no special case, provided `digits.length === 0` is guarded upfront.
- Note that `ans.splice(0, ans.length, ...t)` spreads `t` onto the JS call stack — perfectly safe for `<= 256` items, though reassigning `let ans = t` is safer if `t` could exceed ~`10^5` elements.
