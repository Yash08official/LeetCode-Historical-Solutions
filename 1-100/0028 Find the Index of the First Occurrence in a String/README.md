---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
  - String Matching
  - Z Algorithm
  - Knuth–Morris–Pratt Algorithm
  - Boyer–Moore String-Search Algorithm
---

# 28. Find the Index of the First Occurrence in a String

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0028` (`28`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String`, `String Matching`, `Z Algorithm`, `Knuth–Morris–Pratt Algorithm`, `Boyer–Moore String-Search Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `haystack` and `needle`, find and return the `0`-based starting index of the first occurrence of `needle` as a contiguous substring inside `haystack`. If `needle` does not appear anywhere in `haystack`, return `-1`.

---

## Examples

### Example 1

```text
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
```

### Example 2

```text
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
```

---

## Constraints

- `1 <= haystack.length, needle.length <= 10^4`

- `haystack` and `needle` consist of only lowercase English characters.

---

## Problem Understanding

- **Substring match definition:** Index `i` (`0 <= i <= haystack.length - needle.length`) is a match if `haystack[i + j] == needle[j]` for all `0 <= j < needle.length`.
- **First occurrence:** Scanning from left to right and returning immediately upon completing a full match of `needle` guarantees we find the smallest valid starting index.
- **Edge cases:** `needle` longer than `haystack` (must return `-1`), single-character `needle`, or repeated prefixes like `haystack = "mississippi"` and `needle = "issip"` where resetting without rewinding `haystack` would miss overlapping starts.

---

## Approach

### Brute Force Approach

A naive implementation slices a new substring `haystack.substring(i, i + len2)` at every index `i` and calls `.equals(needle)`, allocating temporary string objects on older runtimes or using nested loops over every start position in `O(n * m)` worst-case time.

### Optimized Approach

The implemented Java solution uses **in-place two-pointer character matching with backtracking** (`p` on `haystack`, `q` on `needle`) in `O(1)` auxiliary space. Characters are compared directly via `charAt`; while matching, `p` and `q` advance together, and on a mismatch `p` rewinds to the next candidate start index (`p -= q - 1`) while `q` resets to `0`.

### Step-by-Step Thinking Process

1. Guard against an empty `needle` (`"".equals(needle)` returns `0`) and store `len1 = haystack.length()` and `len2 = needle.length()`.
2. Maintain pointer `p = 0` in `haystack` and pointer `q = 0` in `needle`, looping `while (p < len1)`.
3. When `haystack.charAt(p) == needle.charAt(q)`: if `len2 == 1`, return `p` immediately; otherwise increment both `++p` and `++q`.
4. When characters mismatch: the current attempt began at `p - q`, so shift `p` to the next starting position `(p - q) + 1` via `p -= q - 1` and reset `q = 0`.
5. Check `if (q == len2)` at the end of the loop body—if all `len2` characters matched, return the match's start index `p - q`. If the loop finishes without matching, return `-1`.

### Algorithm / Intuition

Suppose a candidate match starts at index `s` in `haystack` and matches `q` characters before failing at `p = s + q`. Simply keeping `p` where it is and setting `q = 0` would skip potential matches starting at `s + 1 .. s + q`! The statement `p -= q - 1` computes `p - q + 1 = s + 1`, rewinding `p` to try the very next starting index cleanly inside a single `while` loop without nested `for` loops or substring allocations. Note that because `p` rewinds on mismatches, worst-case inputs like `haystack = "aaa...ab"` and `needle = "aa...ab"` still take `O(len1 * len2)` time (whereas Knuth-Morris-Pratt / KMP could avoid rewinding `p` in `O(len1 + len2)` time using `O(len2)` LPS table space).

---

## Dry Run

Tracing Example 1: `haystack = "sadbutsad"` (`len1 = 9`), `needle = "sad"` (`len2 = 3`)

| Iteration | `p` (in) | `q` (in) | Compare `haystack[p]` vs `needle[q]` | Updates (`p`, `q`) | `q == len2`? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `0` | `0` | `'s' == 's'` (match) | `p = 1`, `q = 1` | `1 == 3` (no) |
| 2 | `1` | `1` | `'a' == 'a'` (match) | `p = 2`, `q = 2` | `2 == 3` (no) |
| 3 | `2` | `2` | `'d' == 'd'` (match) | `p = 3`, `q = 3` | `3 == 3` -> **return `3 - 3 = 0`** |

---

## Complexity Analysis

- **Time Complexity:** `O(n * m)` — In the worst case (where `n = haystack.length()` and `m = needle.length()`), pointer `p` rewinds via `p -= q - 1` on repeated near-matches, checking up to `m` characters across `n - m + 1` starting positions.
- **Space Complexity:** `O(1)` — Uses only four integer variables (`len1`, `len2`, `p`, `q`) with zero extra array or substring allocations.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [28find-the-index-of-the-first-occurrence-in-a-string.java](./28find-the-index-of-the-first-occurrence-in-a-string.java) |

---

## Key Learnings

- When matching substrings with two pointers, a mismatch after `q` matched characters requires rewinding `p` to `(p - q) + 1` (`p -= q - 1`) so overlapping candidate starts are not skipped.
- To guarantee strict `O(n + m)` worst-case time without rewinding `p`, precomputing a KMP Longest Proper Prefix-Suffix (LPS) array or Z-array trades `O(m)` space for linear worst-case speed.
