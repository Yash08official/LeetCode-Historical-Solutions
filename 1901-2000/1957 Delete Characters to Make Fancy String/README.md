---
comments: true
difficulty: Easy
tags:
  - String
---

# 1957. Delete Characters to Make Fancy String

**[View Problem on LeetCode](https://leetcode.com/problems/delete-characters-to-make-fancy-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1957` (`1957`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

A string is called **fancy** if it never contains **three identical consecutive characters** (such as `"aaa"` or `"eee"`).

Given a string `s`, delete the fewest characters possible so that `s` becomes fancy, and return the resulting string. The resulting fancy string is guaranteed to be unique.

---

## Examples

### Example 1

```text
Input: s = "leeetcode"
Output: "leetcode"
Explanation:
Remove an 'e' from the first group of 'e's to create "leetcode".
No three consecutive characters are equal, so return "leetcode".
```

### Example 2

```text
Input: s = "aaabaaaa"
Output: "aabaa"
Explanation:
Remove an 'a' from the first group of 'a's to create "aabaaaa".
Remove two 'a's from the second group of 'a's to create "aabaa".
No three consecutive characters are equal, so return "aabaa".
```

### Example 3

```text
Input: s = "aab"
Output: "aab"
Explanation: No three consecutive characters are equal, so return "aab".
```

---

## Constraints

- `1 <= s.length <= 10^5`

- `s` consists only of lowercase English letters.

---

## Problem Understanding

- Any maximal contiguous block of `m` identical characters (e.g., `'a'` repeated `5` times: `"aaaaa"`) has no three consecutive equal characters if and only if we shrink its length to `min(m, 2)`.
- Deleting extra characters from one block of identical letters never merges two neighboring blocks, because adjacent maximal blocks have different letters! That is why the optimal result is unique.
- Since `s.length` is up to `10^5`, string concatenation with `+` inside a loop in Java would degrade to `O(n^2)`; we must use a mutable `StringBuilder`.

---

## Approach

### Brute Force Approach

Repeatedly scanning the string for any `3` consecutive matching characters and calling `s = s.substring(0, i) + s.substring(i + 1)` to delete one character at a time copies `O(n)` characters per deletion, leading to `O(n^2)` time complexity and Time Limit Exceeded when `s` is `100,000` `'a'`s.

### Optimized Approach

Build the result greedily from left to right in a `StringBuilder ans`: append the current character `c` if `ans` currently has fewer than `2` characters, or if `c` differs from at least one of the last two characters already in `ans`.

### Step-by-Step Thinking Process

1. Initialize an empty `StringBuilder ans` to accumulate kept characters in `O(1)` amortized time per character.
2. Iterate through each character `c` of `s`.
3. Check the tail of `ans` (let `n = ans.length()`): appending `c` would create three identical consecutive letters **if and only if** `n >= 2` and `c == ans.charAt(n - 1)` and `c == ans.charAt(n - 2)`.
4. Negate that forbidden condition using De Morgan's Law: append `c` whenever `n < 2 || c != ans.charAt(n - 1) || c != ans.charAt(n - 2)`.
5. Convert `ans` to a `String` at the end and return it.

### Algorithm / Intuition

In `makeFancyString`, `ans` always stores a valid fancy prefix of the characters processed so far. For each incoming `c`, `n = ans.length()` gives the current output length. Java's short-circuit `||` safely skips `charAt` calls when `n < 2`; when `n >= 2`, `c` is appended unless both `ans.charAt(n - 1)` and `ans.charAt(n - 2)` already equal `c`. Skipping `c` in that exact case is equivalent to deleting it from `s`, ensuring every run of `3+` identical characters is capped at length `2`.

---

## Dry Run

Tracing `s = "leeetcode"`:

| Step | `c` | `n = ans.length()` | Condition `n < 2 \|\| c != ans[n-1] \|\| c != ans[n-2]` | Action | `ans` After |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `'l'` | `0` | `n < 2` (`true`) | Append `'l'` | `"l"` |
| 2 | `'e'` | `1` | `n < 2` (`true`) | Append `'e'` | `"le"` |
| 3 | `'e'` | `2` | `'e' != 'l'` (`ans[0]`) (`true`) | Append `'e'` | `"lee"` |
| 4 | `'e'` | `3` | `n < 2` (`false`), `'e' != 'e'` (`false`), `'e' != 'e'` (`false`) | **Skip!** | `"lee"` |
| 5..9 | `'t'`, `'c'`, `'o'`, `'d'`, `'e'` | `3..7` | Each differs from `ans[n-1]` (`true`) | Append all | `"leetcode"` |

Returns `"leetcode"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every character of `s` is inspected once, with `O(1)` `charAt` lookups and `O(1)` amortized `StringBuilder.append` calls.
- **Space Complexity:** `O(n)` — `s.toCharArray()` and `StringBuilder ans` each hold up to `n` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1957delete-characters-to-make-fancy-string.java](./1957delete-characters-to-make-fancy-string.java) |

---

## Key Learnings

- Checking the last `k - 1` elements of the output buffer (`ans.charAt(n - 1)`, `ans.charAt(n - 2)`) is often cleaner and less error-prone than maintaining separate streak counters.
- Always use `StringBuilder` instead of `String` `+` concatenation inside loops in Java to keep linear `O(n)` runtime.
