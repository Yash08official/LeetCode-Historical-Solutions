---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Math
  - String
---

# 12. Integer to Roman

**[View Problem on LeetCode](https://leetcode.com/problems/integer-to-roman/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0012` (`12`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Math`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Convert a given integer `num` (`1 <= num <= 3999`) into its canonical **Roman numeral** string representation.

Roman numerals combine seven base symbols (`I = 1`, `V = 5`, `X = 10`, `L = 50`, `C = 100`, `D = 500`, `M = 1000`) from highest decimal place to lowest, plus six standard subtractive combinations for digits starting with `4` or `9`: `IV` (`4`), `IX` (`9`), `XL` (`40`), `XC` (`90`), `CD` (`400`), and `CM` (`900`).

---

## Examples

### Example 1

**Input:** `num = 3749`

**Output:** `"MMMDCCXLIX"`

**Explanation:**

```text
3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
```

### Example 2

**Input:** `num = 58`

**Output:** `"LVIII"`

**Explanation:**

```text
50 = L
 8 = VIII
```

### Example 3

**Input:** `num = 1994`

**Output:** `"MCMXCIV"`

**Explanation:**

```text
1000 = M
 900 = CM
  90 = XC
   4 = IV
```

---

## Constraints

- `1 <= num <= 3999`

---

## Problem Understanding

- **Bounded domain:** `num` is strictly between `1` and `3999`, meaning the output length never exceeds `15` characters (e.g., `3888 = "MMMDCCCLXXXVIII"`).
- **Unified symbol table:** Treating the `6` subtractive pairs (`CM`, `CD`, `XC`, `XL`, `IX`, `IV`) as first-class tokens alongside the `7` single-character symbols creates a canonical `13`-denomination system where greedy largest-value subtraction always produces the exact valid Roman numeral.

---

## Approach

### Brute Force Approach

Split `num` into thousands, hundreds, tens, and ones digits separately and write verbose `if-else` / `switch` blocks for `4`, `5`, `9`, and `1..3` repetitions in each decimal place. While `O(1)` in runtime, duplicating branching logic across four place values is error-prone and harder to maintain.

### Optimized Approach

Store all `13` standard and subtractive values (`1000` down to `1`) and their matching Roman strings in parallel arrays, greedily subtracting the largest fitting value and appending its symbol to a `StringBuilder`.

### Step-by-Step Thinking Process

1. List the `13` valid Roman building blocks in strictly descending order in `int[] values` and `String[] symbols`: `1000 ("M")`, `900 ("CM")`, `500 ("D")`, `400 ("CD")`, `100 ("C")`, `90 ("XC")`, `50 ("L")`, `40 ("XL")`, `10 ("X")`, `9 ("IX")`, `5 ("V")`, `4 ("IV")`, `1 ("I")`.
2. Initialize an empty `StringBuilder roman`.
3. Iterate `i` from `0` to `12`; while `num >= values[i]`, subtract `values[i]` from `num` and append `symbols[i]` to `roman`.
4. Return `roman.toString()`.

### Algorithm / Intuition

In `12integer-to-roman.java`, including `900`, `400`, `90`, `40`, `9`, and `4` directly in `values` automatically enforces the Roman numeral rules: for example, `400` matches `"CD"` before `100` (`"C"`) is ever reached, preventing invalid four-in-a-row `"CCCC"` sequences, and `90` matches `"XC"` before `50` (`"L"`), preventing `"LXXXX"`. Each `values[i]` is subtracted at most `3` times (for powers of `10`) or `1` time (for `5`s and subtractive pairs).

---

## Dry Run

**Input:** `num = 3749`

| Index `i` | `values[i]` (`symbols[i]`) | `while (num >= values[i])` Executions | Remaining `num` | `roman` After Step |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `1000` (`"M"`) | `3` times (`3749 -> 2749 -> 1749 -> 749`) | `749` | `"MMM"` |
| `1` | `900` (`"CM"`) | `0` times | `749` | `"MMM"` |
| `2` | `500` (`"D"`) | `1` time (`749 -> 249`) | `249` | `"MMMD"` |
| `3` | `400` (`"CD"`) | `0` times | `249` | `"MMMD"` |
| `4` | `100` (`"C"`) | `2` times (`249 -> 149 -> 49`) | `49` | `"MMMDCC"` |
| `5`–`6` | `90`, `50` | `0` times | `49` | `"MMMDCC"` |
| `7` | `40` (`"XL"`) | `1` time (`49 -> 9`) | `9` | `"MMMDCCXL"` |
| `8` | `10` (`"X"`) | `0` times | `9` | `"MMMDCCXL"` |
| `9` | `9` (`"IX"`) | `1` time (`9 -> 0`) | `0` | `"MMMDCCXLIX"` |
| `10`–`12` | `5`, `4`, `1` | `0` times | `0` | `"MMMDCCXLIX"` |

**Output:** `"MMMDCCXLIX"`

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — `values` has a fixed length of `13`, and for `num <= 3999` the inner `while` loop executes at most `15` times in total.
- **Space Complexity:** `O(1)` — The lookup arrays (`13` elements) and `StringBuilder` (at most `15` characters) occupy constant bounded memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [12integer-to-roman.java](./12integer-to-roman.java) |

---

## Key Learnings

- Encoding subtractive rules as explicit table entries turns messy conditional formatting into a clean, table-driven greedy loop.
- Greedy change-making isn't optimal for arbitrary coin systems, but Roman numerals form a canonical system where largest-first subtraction is always exact.
- `StringBuilder` avoids repeated immutable `String` concatenations in Java.
