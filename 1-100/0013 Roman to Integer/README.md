---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - Math
  - String
---

# 13. Roman to Integer

**[View Problem on LeetCode](https://leetcode.com/problems/roman-to-integer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0013` (`13`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `Math`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a valid Roman numeral string `s` representing an integer in `[1, 3999]`, convert it into its corresponding base-10 integer.

Each Roman character represents a fixed value (`I=1`, `V=5`, `X=10`, `L=50`, `C=100`, `D=500`, `M=1000`). Normally symbols appear from largest to smallest and add together, except when a smaller-valued symbol immediately precedes a larger-valued symbol (such as `IV = 4` or `CM = 900`), in which case the smaller value is subtracted.

---

## Examples

### Example 1

```text
Input: s = "III"
Output: 3
Explanation: III = 3.
```

### Example 2

```text
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

### Example 3

```text
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

---

## Constraints

- `1 <= s.length <= 15`

- `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.

- It is **guaranteed** that `s` is a valid roman numeral in the range `[1, 3999]`.

---

## Problem Understanding

- **Local pairwise rule:** In any valid Roman numeral, a symbol at index `i` (`0 <= i < n - 1`) is subtractive **if and only if** `value(s[i]) < value(s[i + 1])`. Otherwise (`value(s[i]) >= value(s[i + 1])`), it is additive!
- **Last character invariant:** The final character `s[n - 1]` has no character after it, so its value is **always** added (`+value(s[n - 1])`).
- **Small input length:** `1 <= s.length <= 15`.

---

## Approach

### Brute Force Approach

Hardcode a map of all `6` two-character subtractive substrings (`"IV"`, `"IX"`, `"XL"`, `"XC"`, `"CD"`, `"CM"`) alongside the `7` single-character symbols; at each index `i`, slice `s.substring(i, i + 2)` when `i + 1 < n` to check if a two-character token matches (advancing `i += 2`), else advance `i += 1`. While still linear, allocating `substring` objects and managing variable step sizes adds unnecessary clutter.

### Optimized Approach

Populate a character-to-value `HashMap`, initialize `ans` with the last character's value, and scan `i` from `0` to `n - 2`, adding or subtracting `d.get(s.charAt(i))` based on whether it is smaller than `d.get(s.charAt(i + 1))`.

### Step-by-Step Thinking Process

1. Map `'I', 'V', 'X', 'L', 'C', 'D', 'M'` to `{1, 5, 10, 50, 100, 500, 1000}` inside `Map<Character, Integer> d`.
2. Seed `ans = d.get(s.charAt(n - 1))` since the rightmost symbol is always positive.
3. Loop `i` from `0` to `n - 2`. Determine `sign = d.get(s.charAt(i)) < d.get(s.charAt(i + 1)) ? -1 : 1`.
4. Accumulate `ans += sign * d.get(s.charAt(i))` and return `ans`.

### Algorithm / Intuition

In `13roman-to-integer.java`, decomposing a subtractive pair like `"CM"` (`900`) into `-100 + 1000` means we never need variable pointer jumps (`i += 2`). Every index `i` is processed uniformly in a single step: at `'C'`, since `100 < 1000`, `sign` becomes `-1` (`ans -= 100`); at `'M'`, `1000` is added positively (`+1000`), yielding net `+900`. Seeding `ans` with `d.get(s.charAt(n - 1))` upfront keeps `s.charAt(i + 1)` guaranteed in-bounds throughout the loop.

---

## Dry Run

**Example 1 Input:** `s = "III"` (`n = 3`)

1. Seed `ans = d.get('I') = 1` (from index `n - 1 = 2`).
2. **`i = 0`:** `d.get('I') < d.get('I')` (`1 < 1`) is `false` -> `sign = 1`. `ans = 1 + 1 * 1 = 2`.
3. **`i = 1`:** `d.get('I') < d.get('I')` (`1 < 1`) is `false` -> `sign = 1`. `ans = 2 + 1 * 1 = 3`.
4. Return `3`.

*(Quick check on subtractive input `"IV"`: seed `ans = d.get('V') = 5`; at `i = 0`, `1 < 5` -> `sign = -1`, `ans = 5 + (-1 * 1) = 4`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(n)` (or `O(1)` since `n <= 15`) — Builds a `7`-entry map in constant time and visits each character of `s` once.
- **Space Complexity:** `O(1)` — `HashMap` `d` and array `vs` hold a fixed `7` entries regardless of input.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [13roman-to-integer.java](./13roman-to-integer.java) |

---

## Key Learnings

- Viewing `IV` (`4`) algebraically as `-1 + 5` eliminates multi-character lookahead tokenization.
- Pre-initializing the accumulator with the final element is a clean idiom whenever adjacent-pair comparisons `arr[i]` vs `arr[i + 1]` run up to `n - 2`.
- A `switch` statement or `int[128]` ASCII table can replace `HashMap<Character, Integer>` if zero heap allocation is desired.
