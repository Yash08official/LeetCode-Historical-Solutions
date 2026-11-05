---
comments: true
difficulty: Hard
tags:
  - String
---

# 65. Valid Number

**[View Problem on LeetCode](https://leetcode.com/problems/valid-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0065` (`65`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, determine whether `s` is a syntactically **valid number** according to scientific/decimal notation rules.

A valid number consists of either an **integer** or a **decimal**, optionally followed by an **exponent**:
- **Integer:** Optional sign (`'+'` or `'-'`) followed by one or more digits (`0-9`).
- **Decimal:** Optional sign (`'+'` or `'-'`) followed by either `digits + '.'`, `digits + '.' + digits`, or `'.' + digits` (there must be at least one digit adjacent to the dot).
- **Exponent:** `'e'` or `'E'` followed by a valid **integer** (optional `'+'`/`'-'` sign followed by one or more digits; decimals are **not** allowed in the exponent).

---

## Examples

### Example 1

**Input:** `s = "0"`

**Output:** `true`

### Example 2

**Input:** `s = "e"`

**Output:** `false`

### Example 3

**Input:** `s = "."`

**Output:** `false`

---

## Constraints

- `1 <= s.length <= 20`

- `s` consists of only English letters (both uppercase and lowercase), digits (`0-9`), plus `'+'`, minus `'-'`, or dot `'.'`.

---

## Problem Understanding

- **No Whitespace Allowed:** Constraints state `s` contains only letters, digits, `'+'`, `'-'`, and `'.'`; any letter other than `'e'`/`'E'` is immediately invalid.
- **Dot Placement Rules:** At most **one** `'.'` may appear, it **cannot** appear after `'e'`/`'E'`, and it cannot stand alone without digits in the mantissa (rejecting `"."`, `"+."`, `".e1"`, `"-.E5"`).
- **Exponent Placement Rules:** At most **one** `'e'`/`'E'` may appear, there must be a valid non-empty mantissa before it (`j > i`), and there must be at least one digit after it (even if `'e'` is followed by `'+'` or `'-'`).
- **Sign Placement Rules:** `'+'` or `'-'` may appear **only** at index `0` or immediately after `'e'`/`'E'`, and never as the final character of `s`.

---

## Approach

### Brute Force Approach

Attempting to rely on built-in `Double.parseDouble(s)` or regex engines is a common trap in interviews: Java's `Double.parseDouble` accepts suffixes like `"1f"`, `"2d"`, `"NaN"`, `"Infinity"`, and hexadecimal floats that are **invalid** under this specification, while catching exceptions for control flow is slow and misses the parsing design goal.

### Optimized Approach

Perform a **single-pass deterministic rule scan**: consume an optional leading sign at `i = 0`, reject sign-only or bare-dot mantissas up front, then sweep `j` from `i` to `n - 1` enforcing exact invariants on `dot` count, `e` count, post-exponent sign consumption, and digit characters.

### Step-by-Step Thinking Process

1. Advance start index `i` past an optional leading `'+'` or `'-'`. If `i == n`, the string was just a sign, so return `false`.
2. Eliminate digitless-dot mantissas right away: if `s.charAt(i) == '.'` and either `i + 1 == n` (string ends right at `'.'`) or `s.charAt(i + 1)` is `'e'`/`'E'` (nothing between leading sign/start and `'e'` except `'.'`), return `false`.
3. Scan `j` from `i` to `n - 1` with counters `dot = 0` and `e = 0`.
4. On `'.'`: fail if `e > 0` (dot inside exponent) or `dot > 0` (second dot); otherwise `++dot`.
5. On `'e'` or `'E'`: fail if `e > 0` (second exponent), `j == i` (empty mantissa before `'e'`), or `j == n - 1` (trailing `'e'`); otherwise `++e`, and if `s.charAt(j + 1)` is `'+'` or `'-'`, advance `++j` and fail if `j == n - 1` (trailing sign after `'e'`).
6. On any other character: fail if it is not an ASCII digit `'0'..'9'`. If the loop completes, return `true`.

### Algorithm / Intuition

Every edge case in the formal grammar is covered by the interplay of `i` (first index after any leading sign) and the `j` scan:
- Why can't `"+.e3"` slip through `j > i` at `'e'`? Because the pre-loop guard explicitly rejects `s.charAt(i) == '.'` when `s.charAt(i + 1)` is `'e'`/`'E'` or end-of-string! Any other string starting with `'.'` at index `i` must have a character at `i + 1` that is neither `'e'`/`'E'` nor end-of-string—and the loop verifies `i + 1` is a digit `'0'..'9'` (since a second `'.'` or misplaced sign/letter fails immediately).
- Why can't `'+'` or `'-'` appear mid-number like `"1+2"`? Because signs are only consumed at index `0` (before the loop) and at `j + 1` immediately inside the `'e'`/`'E'` branch; anywhere else they hit `else if (s.charAt(j) < '0' || s.charAt(j) > '9') return false;`.

---

## Dry Run

**Trace 1 (Example 1):** `s = "0"` (`n = 1`)
- `i = 0`: `s.charAt(0) = '0'` (not `'+'`/`'-'`, `i` stays `0`).
- `i == n` (`0 == 1`) is `false`; `s.charAt(0) == '.'` is `false`.
- Loop `j = 0`: `'0'` is neither `'.'` nor `'e'`/`'E'`, and `'0' <= '0' <= '9'` holds.
- Loop finishes -> returns **`true`**.

**Trace 2 (Quick verification on Example 2 `"e"` & Example 3 `"."`):**
- `s = "e"` (`n = 1`, `i = 0`): At `j = 0`, hits `'e'` branch -> `j == i` (`0 == 0`) is `true` -> immediately returns **`false`**.
- `s = "."` (`n = 1`, `i = 0`): Pre-loop guard `s.charAt(0) == '.' && i + 1 == n` (`1 == 1`) is `true` -> immediately returns **`false`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We inspect each character of `s` (`n = s.length() <= 20`) at most once in a single left-to-right pass.
- **Space Complexity:** `O(1)` — Only four integer variables (`n`, `i`, `dot`, `e`) and loop counter `j` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [65valid-number.java](./65valid-number.java) |

---

## Key Learnings

- Stripping the optional leading sign first (`i = 0` or `1`) normalizes signed and unsigned inputs so all subsequent mantissa checks reference `i` uniformly.
- Handling exponent signs (`e+` / `e-`) inline when `'e'`/`'E'` is encountered means any `'+'` or `'-'` seen by the main loop body is guaranteed invalid.
- Alternatively, complex lexical grammars like Valid Number can be modeled as an explicit Deterministic Finite Automaton (DFA) transition table if specifications grow larger.
