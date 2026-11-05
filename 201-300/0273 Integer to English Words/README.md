---
comments: true
difficulty: Hard
tags:
  - Math
  - String
  - Recursion
---

# 273. Integer to English Words

**[View Problem on LeetCode](https://leetcode.com/problems/integer-to-english-words/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0273` (`273`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `String`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given a non-negative 32-bit signed integer `num` (`0 <= num <= 2^31 - 1`), convert it into its standard English words representation.

Words must be capitalized and separated by single spaces without hyphens or 'and' conjunctions (for example, `123` becomes `"One Hundred Twenty Three"`, and `0` becomes `"Zero"`).

---

## Examples

### Example 1

```text
Input: num = 123
Output: "One Hundred Twenty Three"
```

### Example 2

```text
Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"
```

### Example 3

```text
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
```

---

## Constraints

- `0 <= num <= 2^31 - 1`

---

## Problem Understanding

- English number naming groups digits from right to left into three-digit periods: units (`1`), thousands (`1,000`), millions (`1,000,000`), and billions (`1,000,000,000`).
- Since `num <= 2,147,483,647`, the largest scale needed is `"Billion"`.
- Every non-zero three-digit block (`1..999`) follows the exact same internal phrasing rule before appending its scale label (`"Billion"`, `"Million"`, `"Thousand"`, or `""`).
- `0` is a unique standalone edge case: `"Zero"` is returned only when the entire input is `0`, never inside larger numbers like `1000` (`"One Thousand"`).

---

## Approach

### Brute Force Approach

Trying to convert digit-by-digit from left to right using ad-hoc conditional branches for every possible length (`1` to `10` digits) quickly becomes an error-prone maze of special cases—especially around teen numbers (`11`–`19`), internal zeros (`1,000,010`), and trailing spaces.

### Optimized Approach

Decompose `num` from highest scale (`10^9`) down to `1` in steps of `/= 1000`, skipping zero-valued three-digit groups, and use a clean recursive helper `transfer(int num)` backed by word lookup arrays (`lt20`, `tens`, `thousands`) to format each 3-digit chunk.

### Step-by-Step Thinking Process

1. Handle `num == 0` immediately by returning `"Zero"` so zeros inside larger numbers never emit the word `"Zero"`.
2. Predefine three lookup tables: `lt20` for `1..19` (with `""` at index `0`), `tens` for `10, 20, ..., 90`, and `thousands` for scale suffixes `{"Billion", "Million", "Thousand", ""}`.
3. Iterate divisor `i` through `1_000_000_000`, `1_000_000`, `1_000`, `1` alongside scale index `j = 0..3`. If the current 3-digit chunk `num / i` is `0`, `continue` without appending anything.
4. Write recursive helper `transfer(chunk)` that always includes a trailing space when non-empty: empty string for `0`, `lt20[chunk] + " "` for `< 20`, `tens[chunk / 10] + " " + transfer(chunk % 10)` for `< 100`, and `lt20[chunk / 100] + " Hundred " + transfer(chunk % 100)` for `100..999`.
5. Append `transfer(num / i)`, `thousands[j]`, and `' '` to `StringBuilder sb`, reduce `num %= i`, and finally call `sb.toString().trim()` to strip trailing whitespace.

### Algorithm / Intuition

By ensuring `transfer(int num)` always terminates non-empty outputs with a single trailing space and returns `""` for `0`, compound chunks like `50` (`tens[5] + " " + transfer(0)` -> `"Fifty "`) and `500` (`lt20[5] + " Hundred " + transfer(0)` -> `"Five Hundred "`) never produce double spaces! In `numberToWords`, each non-zero 3-digit group `num / i` already ends with a space from `transfer(...)`, so appending `thousands[j]` and `' '` cleanly separates groups; for the final units group where `thousands[3]` is `""`, `.trim()` removes the extra trailing spaces at the very end.

---

## Dry Run

Tracing **Example 1** (`num = 123`):

- `num != 0`, initialize empty `sb`.
- `i = 1_000_000_000, j = 0`: `123 / i == 0` -> `continue`.
- `i = 1_000_000, j = 1`: `123 / i == 0` -> `continue`.
- `i = 1_000, j = 2`: `123 / i == 0` -> `continue`.
- `i = 1, j = 3`: `123 / 1 = 123 != 0`:
  - `transfer(123)` -> `lt20[1] + " Hundred " + transfer(23)`
  - `transfer(23)` -> `tens[2] + " " + transfer(3)`
  - `transfer(3)` -> `lt20[3] + " "` = `"Three "`
  - Unwinding gives `"One Hundred Twenty Three "`.
  - Append `thousands[3]` (`""`) and `' '` -> `sb` holds `"One Hundred Twenty Three  "`, `num %= 1` -> `0`.
- `sb.toString().trim()` returns `"One Hundred Twenty Three"`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — A 32-bit non-negative integer has at most 10 decimal digits (4 groups of 3 digits), so the loop runs 4 iterations and `transfer` recurses to depth at most 3 (generalizing to `O(log num)` for arbitrary-precision integers).
- **Space Complexity:** `O(1)` — Lookup arrays have fixed constant sizes, recursion depth is at most 3, and `StringBuilder` stores a bounded English phrase of constant maximum length.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [273integer-to-english-words.java](./273integer-to-english-words.java) |

---

## Key Learnings

- Grouping digits by powers of `1000` reduces a 10-digit formatting problem to a tiny, self-contained 3-digit problem (`0..999`).
- Maintaining a strict spacing invariant in recursive string builders (every non-empty piece carries one trailing space, and `0` returns `""`) prevents double-space bugs without complex conditional checks.
- Skipping chunks where `num / i == 0` cleanly handles numbers like `1,000,000` (`"One Million"`) without erroneously outputting `"Zero Thousand"`.
