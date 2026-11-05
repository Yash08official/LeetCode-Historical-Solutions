---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
---

# 151. Reverse Words in a String

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-words-in-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0151` (`151`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` containing words separated by spaces, return a new string with the **order of the words reversed** while keeping the characters within each individual word intact.

A word is any maximal contiguous sequence of non-space characters. Because `s` can contain leading spaces, trailing spaces, or runs of multiple spaces between words, your returned string must join the reversed words with **a single space** and contain no leading or trailing spaces.

---

## Examples

### Example 1

```text
Input: s = "the sky is blue"
Output: "blue is sky the"
```

### Example 2

```text
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
```

### Example 3

```text
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```

---

## Constraints

- `1 <= s.length <= 10^4`

- `s` contains English letters (upper-case and lower-case), digits, and spaces `' '`.

- There is **at least one** word in `s`.

---

## Follow-up Questions

If the string data type is mutable in your language, can you solve it **in-place** with `O(1)` extra space?

Java `String` is immutable, so `O(n)` space is unavoidable in Java (`char[]` conversion still takes `O(n)`). In languages with mutable strings (like C++), you solve the **`O(1)` in-place follow-up** in three `O(n)` passes: (1) compact extra spaces in-place using read/write two pointers, (2) reverse the entire compacted string, and (3) reverse each individual word back into forward character order.

---

## Problem Understanding

- **Whitespace Normalization:** Runs of `2+` consecutive spaces (`"   "`) must collapse into a single space, and leading/trailing spaces must be stripped completely.
- **Word Preservation:** We reverse word positions (`["the", "sky"] -> ["sky", "the"]`), NOT character order inside words.
- **Non-Empty Guarantee:** Constraints guarantee at least one word exists in `s`, so trimming and splitting will always produce at least one non-empty token.

---

## Approach

### Brute Force Approach

Repeatedly concatenating strings in a loop using `res = res + words[i] + " "` in Java allocates a brand-new `String` object and copies all accumulated characters on every word, degrading to `O(n^2)` time when there are `O(n)` short words.

### Optimized Approach

Trim outer whitespace with `s.trim()`, tokenize on one-or-more whitespace characters via `split("\\s+")`, and append tokens in reverse index order into a mutable `StringBuilder`.

### Step-by-Step Thinking Process

1. Call `s.trim()` first! If `s` has leading spaces, calling `s.split("\\s+")` without `trim()` produces an unwanted empty string `""` as `words[0]`.
2. Split the trimmed string on regex `"\\s+"` so any contiguous run of spaces collapses cleanly into token boundaries.
3. Iterate `i` backward from `words.length - 1` down to `0`, appending `words[i]` followed by `" "` to `StringBuilder sb`.
4. Convert `sb.toString()` and call `.trim()` to strip the single trailing space added after `words[0]`.

### Algorithm / Intuition

In `reverseWords(String s)`, `s.trim().split("\\s+")` handles both tokenization and multi-space cleanup in one expression, yielding an array `words` of clean non-empty words in original order. Walking `words` from back to front into `StringBuilder sb` avoids `O(n^2)` immutable `String` concatenation. Finally, `sb.toString().trim()` removes the extra space appended after the last iteration (`i = 0`).

---

## Dry Run

Trace on **Example 1**: `s = "the sky is blue"`

1. `s.trim()` -> `"the sky is blue"`.
2. `.split("\\s+")` -> `words = ["the", "sky", "is", "blue"]` (`words.length = 4`).
3. Reverse loop into `sb`:
   - `i = 3`: append `"blue"` + `" "` -> `sb = "blue "`
   - `i = 2`: append `"is"` + `" "` -> `sb = "blue is "`
   - `i = 1`: append `"sky"` + `" "` -> `sb = "blue is sky "`
   - `i = 0`: append `"the"` + `" "` -> `sb = "blue is sky the "`
4. `sb.toString().trim()` strips the trailing space -> returns `"blue is sky the"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — `trim()`, regex `split("\\s+")`, the reverse `StringBuilder` loop, and final `trim()` each scan characters linear in `n = s.length()`.
- **Space Complexity:** `O(n)` — Both the `words` array and the `StringBuilder` `sb` store `O(n)` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [151reverse-words-in-a-string.java](./151reverse-words-in-a-string.java) |

---

## Key Learnings

- In Java, `"  hello".split("\\s+")` yields `["", "hello"]` with a leading empty string—always call `s.trim()` before `split("\\s+")`!
- Using `StringBuilder` inside loops ensures `O(n)` linear string assembly instead of `O(n^2)` string copying.
- Regex `\s+` is concise and readable, though manual two-pointer scanning avoids regex engine overhead in latency-critical code.
