---
comments: true
difficulty: Easy
tags:
  - String
  - Greedy
  - Enumeration
---

# 2259. Remove Digit From Number to Maximize Result

**[View Problem on LeetCode](https://leetcode.com/problems/remove-digit-from-number-to-maximize-result/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2259` (`2259`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Greedy`, `Enumeration` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `number` representing a positive decimal integer (consisting of digits `'1'` through `'9'`) and a character `digit` (guaranteed to appear at least once in `number`).

Remove **exactly one** occurrence of `digit` from `number` so that the resulting decimal integer is as **large as possible**, and return the resulting string.

---

## Examples

### Example 1

```text
Input: number = "123", digit = "3"
Output: "12"
Explanation: There is only one '3' in "123". After removing '3', the result is "12".
```

### Example 2

```text
Input: number = "1231", digit = "1"
Output: "231"
Explanation: We can remove the first '1' to get "231" or remove the second '1' to get "123".
Since 231 > 123, we return "231".
```

### Example 3

```text
Input: number = "551", digit = "5"
Output: "51"
Explanation: We can remove either the first or second '5' from "551".
Both result in the string "51".
```

---

## Constraints

- `2 <= number.length <= 100`

- `number` consists of digits from `'1'` to `'9'`.

- `digit` is a digit from `'1'` to `'9'`.

- `digit` occurs at least once in `number`.

---

## Problem Understanding

- **Equal-Length Candidates:** Removing any single occurrence of `digit` from a string of length `n` always produces a candidate string of the exact same length `n - 1` (with no leading zeros since digits are `'1'..'9'`).
- **Lexicographical Order == Numerical Order for Equal-Length Strings:** Because every candidate `t` has length `n - 1`, comparing two candidates numerically is identical to comparing them lexicographically via `String.compareTo`!
- **Small Constraint (`n <= 100`):** With at most `100` characters, generating each candidate string and picking the lexicographical maximum runs well under a millisecond.

---

## Approach

### Brute Force Approach

Parsing candidate strings into numeric types like `Integer.parseInt` or `Long.parseLong` fails completely with `NumberFormatException` because `number.length()` can be up to `100` digits (far exceeding 64-bit `long`'s 19-digit limit); using `BigInteger` works in `O(n^2)` time, though string comparison achieves the exact same result without big-number parsing.

### Optimized Approach

Enumerate every index `i` where `number.charAt(i) == digit`, construct the `(n - 1)`-length candidate `t = number.substring(0, i) + number.substring(i + 1)`, and keep the lexicographically largest string `ans` using `ans.compareTo(t) < 0`.

### Step-by-Step Thinking Process

1. Initialize `String ans = "0"` as a sentinel smaller than any valid non-empty string of `'1'..'9'` digits.
2. Loop `i` from `0` to `n - 1` across `number`.
3. Whenever `number.charAt(i) == digit`, form `t = number.substring(0, i) + number.substring(i + 1)`.
4. Compare `ans` and `t` via `if (ans.compareTo(t) < 0) ans = t;`.
5. Return `ans` after checking all occurrences.

### Algorithm / Intuition

Let's check why initializing `String ans = "0"` works seamlessly with `ans.compareTo(t) < 0`:
- Every character in `number` is in `'1'..'9'` (ASCII `49..57`), while `'0'` has ASCII `48`.
- On the very first matching index `i`, `t` starts with a character in `'1'..'9'`, so `"0".compareTo(t)` compares `'0'` against `t.charAt(0)` and returns a negative value (`< 0`), immediately updating `ans = t`.
- On all subsequent matches, both `ans` and `t` have the exact same length `n - 1`, where standard lexicographical `compareTo` matches decimal value order 1-for-1!

---

## Dry Run

Trace on **Example 1**: `number = "123"`, `digit = '3'` (`n = 3`, `ans = "0"`).

- `i = 0`: `d = '1' != '3'` -> skip.
- `i = 1`: `d = '2' != '3'` -> skip.
- `i = 2`: `d = '3' == '3'`:
  - `t = "123".substring(0, 2) + "123".substring(3) = "12" + "" = "12"`.
  - `"0".compareTo("12")` is `'0' - '1' = -1 < 0` -> `ans = "12"`.
- Loop finishes and returns `"12"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — In the worst case where every character of `number` equals `digit`, we construct and compare `n` substrings of length `n - 1`, taking `O(n^2)` time (at most `~10^4` operations for `n <= 100`).
- **Space Complexity:** `O(n)` — Temporary candidate strings `t` and the best string `ans` each hold `n - 1` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2259remove-digit-from-number-to-maximize-result.java](./2259remove-digit-from-number-to-maximize-result.java) |

---

## Key Learnings

- Two positive decimal strings of **identical length** (without leading zeros) have the exact same numerical and lexicographical order—avoiding any need for `BigInteger`.
- If `n` were `10^5`, an `O(n)` greedy optimization removes the **first** index `i` where `number[i] == digit` and `i + 1 < n && number[i + 1] > digit`, or the **last** occurrence of `digit` if no such index exists.
