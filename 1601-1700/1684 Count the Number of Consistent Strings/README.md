---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - String
  - Bit Manipulation
  - Counting
---

# 1684. Count the Number of Consistent Strings

**[View Problem on LeetCode](https://leetcode.com/problems/count-the-number-of-consistent-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1684` (`1684`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Bit Manipulation`, `Counting` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a string `allowed` consisting of distinct lowercase English letters, and an array of lowercase strings `words`. A string in `words` is **consistent** if every character in it appears in `allowed`. Return the total number of consistent strings in `words`.

---

## Examples

### Example 1

```text
Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
```

### Example 2

```text
Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.
```

### Example 3

```text
Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.
```

---

## Constraints

- `1 <= words.length <= 10^4`

- `1 <= allowed.length <=^26`

- `1 <= words[i].length <= 10`

- The characters in `allowed` are **distinct**.

- `words[i]` and `allowed` contain only lowercase English letters.

---

## Problem Understanding

- Both `allowed` and `words[i]` contain only lowercase English letters `'a'` through `'z'` (`26` possible characters).
- Whether a word is consistent depends only on membership of each of its characters in `allowed`; duplicate characters inside `words[i]` are fine as long as that character is allowed.

---

## Approach

### Brute Force Approach

For every character of every word in `words`, scanning `allowed` linearly with `allowed.includes(ch)` takes `O(|allowed|)` per character, multiplying work unnecessarily when `allowed` can be indexed once into a direct-address boolean table.

### Optimized Approach

Build a 26-element boolean lookup array `s` marking every character present in `allowed` as `true`. Iterate over each word `w` in `words` and increment `ans` if helper `check(w, s)` confirms every character of `w` maps to `true` in `s`.

### Step-by-Step Thinking Process

1. Allocate `let s = new Array(26).fill(false)` to represent `'a'` through `'z'`.
2. Loop through each character `c` of `allowed` and set `s[c.charCodeAt(0) - 'a'.charCodeAt(0)] = true`.
3. Write a clean helper `check(w, s)` that iterates through `w` and returns `false` immediately upon finding any character where `!s[...]`.
4. Count how many strings `w` in `words` satisfy `check(w, s)` and return `ans`.

### Algorithm / Intuition

Mapping `'a'..'z'` to indices `0..25` via `charCodeAt(...) - 97` gives fast `O(1)` array indexing with zero hash overhead. Inside `check(w, s)`, short-circuiting with `return false` on the very first disallowed character avoids scanning the rest of an inconsistent word.

---

## Dry Run

Tracing Example 1: `allowed = "ab"`, `words = ["ad", "bd", "aaab", "baa", "badab"]`:

1. **Setup `s`:** `s[0] ('a') = true`, `s[1] ('b') = true`, `s[2..25] = false`.
2. **Evaluate `check(w, s)` for each word:**

| Word `w` | Character Checks | First Failure | `check(w, s)` | `ans` |
| :--- | :--- | :--- | :--- | :--- |
| `"ad"` | `'a'` (ok), `'d'` (`s[3] == false`) | `'d'` at `i = 1` | `false` | `0` |
| `"bd"` | `'b'` (ok), `'d'` (`s[3] == false`) | `'d'` at `i = 1` | `false` | `0` |
| `"aaab"` | `'a'`, `'a'`, `'a'`, `'b'` (all ok) | None | `true` | `1` |
| `"baa"` | `'b'`, `'a'`, `'a'` (all ok) | None | `true` | `2` |
| `"badab"` | `'b'`, `'a'`, `'d'` (`s[3] == false`) | `'d'` at `i = 2` | `false` | `2` |

3. Return `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(|allowed| + C)` — Marking `s` takes `O(|allowed|)` (`<= 26`) steps, and checking all words inspects at most `C` total characters across `words`.
- **Space Complexity:** `O(1)` — The boolean lookup array `s` has a fixed size of `26`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1684count-the-number-of-consistent-strings.js](./1684count-the-number-of-consistent-strings.js) |

---

## Key Learnings

- For fixed lowercase English alphabets (`26` letters), a fixed-size boolean array (or a single 26-bit integer bitmask!) is faster and lighter than a general `Set`.
- Separating validation predicates like `check(w, s)` into a helper function avoids labeled `outer:` loop breaks and keeps the counting loop clean.
