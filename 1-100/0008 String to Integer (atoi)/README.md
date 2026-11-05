---
comments: true
difficulty: Medium
tags:
  - String
---

# 8. String to Integer (atoi)

**[View Problem on LeetCode](https://leetcode.com/problems/string-to-integer-atoi/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0008` (`8`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

Implement `myAtoi(s)`, which parses a string into a 32-bit signed integer manually (without built-in parsing functions like `parseInt` or `Number`) according to four sequential rules:

1. **Leading whitespace:** Discard leading spaces.
2. **Sign:** Check for a single optional `'+'` or `'-'` character (defaulting to positive if neither is present).
3. **Digits:** Read consecutive decimal digits (`'0'`–`'9'`), stopping immediately at the first non-digit character or end of string (returning `0` if no digits exist).
4. **Clamping:** Clamp values outside `[-2^31, 2^31 - 1]` to `-2147483648` or `2147483647`.

---

## Examples

### Example 1

**Input:** `s = "42"`

**Output:** `42`

**Explanation:**

```text
The underlined characters are what is read in and the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
```

### Example 2

**Input:** `s = " -042"`

**Output:** `-42`

**Explanation:**

```text
Step 1: "   -042" (leading whitespace is read and ignored)
            ^
Step 2: "   -042" ('-' is read, so the result should be negative)
             ^
Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
               ^
```

### Example 3

**Input:** `s = "1337c0d3"`

**Output:** `1337`

**Explanation:**

```text
Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
         ^
Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)
             ^
```

### Example 4

**Input:** `s = "0-1"`

**Output:** `0`

**Explanation:**

```text
Step 1: "0-1" (no characters read because there is no leading whitespace)
         ^
Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)
          ^
```

### Example 5

**Input:** `s = "words and 987"`

**Output:** `0`

**Explanation:**

Reading stops at the first non-digit character 'w'.

---

## Constraints

- `0 <= s.length <= 200`

- `s` consists of English letters (lower-case and upper-case), digits (`0 - 9`), `' '`, `'+'`, `'-'`, and `'.'`.

---

## Problem Understanding

- **Strict state order:** Once sign checking passes, a second sign or space (like `"+-12"` or `"0-1"`) immediately terminates digit reading.
- **ASCII digit decoding:** Subtracting `'0'`'s ASCII code (`48`) via `str.charCodeAt(i) - 48` yields `0..9` for valid digits and `< 0` or `> 9` for any other character.
- **Asymmetric 32-bit bounds:** `INT_MAX` is `2147483647` whereas `INT_MIN` is `-2147483648`. When `isPositive === 0` and the input is `"-2147483648"`, triggering the `> 2147483647` clamp returns `-2147483648`, which happens to be the exact value anyway!

---

## Approach

### Brute Force Approach

Extract the matching prefix using a regular expression (`/^[+-]?\d+/`) after trimming, convert it using arbitrary-precision `BigInt`, and clamp against `-2147483648n` and `2147483647n`. However, the specification explicitly forbids built-in string-to-number conversion utilities, requiring manual character-by-character parsing.

### Optimized Approach

Trim whitespace, inspect an optional sign character at index `0`, and accumulate digits via ASCII arithmetic while checking against `2147483647` before multiplying by `10`.

### Step-by-Step Thinking Process

1. Call `str = str.trim()` to strip leading (and trailing) whitespace; if `str` becomes empty, return `0`.
2. Track sign with `isPositive = 1`, cursor `i = 0`, and magnitude `ans = 0`. Advance `i` if `str[0]` is `'+'` or `'-'` (setting `isPositive = 0` for `'-'`).
3. Loop `i` across remaining characters, computing `t = str.charCodeAt(i) - 48`. Break immediately if `t < 0 || t > 9`.
4. Check if `ans * 10 + t > 2147483647` rearranged safely as `ans > (2147483647 - t) / 10`. If true, return `2147483647` for positive or `-2147483648` for negative.
5. Otherwise update `ans = ans * 10 + t`, and after the loop return `isPositive ? ans : -ans`.

### Algorithm / Intuition

In `8string-to-integer-atoi.js`, JavaScript numbers are IEEE-754 doubles, so `(2147483647 - t) / 10` performs exact floating-point division (for instance, when `ans = 214748364` and `t = 8`, `(2147483647 - 8) / 10 = 214748363.9`, so `ans > 214748363.9` evaluates to `true`!). Notice also why `-2147483648` works seamlessly without a separate bound: at the final digit `t = 8` of `"-2147483648"`, the overflow branch triggers and returns `-2147483648`, which matches both the exact value and the clamped minimum. Finally, `isPositive ? ans : -ans` applies the parsed sign once digit accumulation finishes.

---

## Dry Run

**Input:** `s = "42"`

1. `str = "42".trim()` -> `"42"` (non-empty).
2. `isPositive = 1`, `i = 0`, `ans = 0`. `str[0]` is `'4'` (neither `'+'` nor `'-'`).
3. **Iteration `i = 0`:** `t = 52 - 48 = 4` (`0 <= 4 <= 9`). `0 > 214748364.3` is `false`. `ans = 0 * 10 + 4 = 4`.
4. **Iteration `i = 1`:** `t = 50 - 48 = 2` (`0 <= 2 <= 9`). `4 > 214748364.5` is `false`. `ans = 4 * 10 + 2 = 42`.
5. Loop ends (`i = 2`). `isPositive` is `1`, so returns `42`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Trimming `str` scans at most `n` characters, and the `for` loop inspects each remaining character at most once.
- **Space Complexity:** `O(n)` — `str.trim()` allocates a new substring of length up to `n` (an in-place `while (s[i] === ' ') i++;` scan could reduce auxiliary space to `O(1)`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [8string-to-integer-atoi.js](./8string-to-integer-atoi.js) |

---

## Key Learnings

- Rearranging `ans * 10 + t > MAX` into `ans > (MAX - t) / 10` is a classic pattern to detect overflow before multiplication.
- Note that in JavaScript `str.trim()` strips all Unicode whitespace (including `\t` and `\n`), whereas strict `atoi` specifications in C++/Java only skip `' '` (`0x20`) — using `while (s[i] === ' ') i++` avoids both extra memory and tab/newline edge cases.
- Using `charCodeAt(i) - 48` parses base-10 digits in constant time without regex or string conversion.
