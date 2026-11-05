---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
---

# 1768. Merge Strings Alternately

**[View Problem on LeetCode](https://leetcode.com/problems/merge-strings-alternately/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1768` (`1768`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two lowercase English strings `word1` and `word2`, merge them into a single string by taking characters in alternating order starting with `word1` (`word1[0]`, `word2[0]`, `word1[1]`, `word2[1]`, ...).

If one string is longer than the other, append all remaining characters of the longer string onto the end of the merged result.

---

## Examples

### Example 1

```text
Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r
```

### Example 2

```text
Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.
word1:  a   b
word2:    p   q   r   s
merged: a p b q   r   s
```

### Example 3

```text
Input: word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: Notice that as word1 is longer, "cd" is appended to the end.
word1:  a   b   c   d
word2:    p   q
merged: a p b q c   d
```

---

## Constraints

- `1 <= word1.length, word2.length <= 100`

- `word1` and `word2` consist of lowercase English letters.

---

## Problem Understanding

- **Alternating Prefix:** Up to `l = min(word1.length, word2.length)`, both strings contribute one character at each index `i` (`word1[i]` followed by `word2[i]`).
- **Remaining Suffix:** After `l` pairs, at most one string has leftover characters starting at index `l`, which are appended verbatim.
- **Lengths:** `1 <= word1.length, word2.length <= 100`.

---

## Approach

### Brute Force Approach

Repeatedly concatenating immutable strings with `res += word1[i]` inside a loop (or slicing off the first character of each string on every step like `word1 = word1.slice(1)`) creates intermediate string copies on each step, degrading to `O((m + n)^2)` character copies for large strings.

### Optimized Approach

Collect alternating character pairs in an array `merged` up to `l = Math.min(w1, w2)`, append any leftover tail slice from the longer string, and join the array once with `merged.join('')`.

### Step-by-Step Thinking Process

1. Record lengths `w1 = word1.length`, `w2 = word2.length`, and their minimum `l = Math.min(w1, w2)`.
2. Loop `i` from `0` to `l - 1`, pushing both `word1[i]` and `word2[i]` into an array `merged`.
3. Check if one string was longer (`w1 > w2` or `w2 > w1`), and if so, append the remaining substring `.slice(l)` via `merged.concat(...)`.
4. Flatten `merged` into a single string using `merged.join('')`.

### Algorithm / Intuition

Using a JavaScript array `merged` as a string buffer avoids repeated string concatenation overhead during the loop. For indices `0 <= i < l`, `merged.push(word1[i], word2[i])` interleaves characters cleanly. Afterward, if `w1 > w2`, `word1.slice(l)` extracts the leftover suffix string, and `merged.concat(word1.slice(l))` appends that suffix string as the final element of `merged` (similarly for `word2.slice(l)` when `w2 > w1`). Finally, `merged.join('')` concatenates all single-character entries and any trailing suffix string into the complete answer.

---

## Dry Run

Using **Example 1**: `word1 = "abc"`, `word2 = "pqr"`

- `w1 = 3`, `w2 = 3`, `l = Math.min(3, 3) = 3`, `merged = []`.
- `i = 0`: push `'a'`, `'p'` -> `['a', 'p']`
- `i = 1`: push `'b'`, `'q'` -> `['a', 'p', 'b', 'q']`
- `i = 2`: push `'c'`, `'r'` -> `['a', 'p', 'b', 'q', 'c', 'r']`
- Neither `w1 > w2` nor `w2 > w1` triggers.
- `merged.join('')` returns `"apbqcr"`.

*(Note: On Example 2 with `"ab"` and `"pqrs"`, `l = 2` produces `['a', 'p', 'b', 'q']`, `w2 > w1` appends `"rs"` via `concat` to yield `['a', 'p', 'b', 'q', 'rs']`, and `.join('')` produces `"apbqrs"`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(w1 + w2)` — Iterating up to `min(w1, w2)`, slicing/concatenating the tail, and joining all characters takes linear time in the total length `w1 + w2`.
- **Space Complexity:** `O(w1 + w2)` — The `merged` buffer and resulting string store all `w1 + w2` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1768merge-strings-alternately.js](./1768merge-strings-alternately.js) |

---

## Key Learnings

- Building strings via an array buffer plus `.join('')` is a clean linear-time pattern for character-by-character construction.
- Splitting the loop into the common length `Math.min(w1, w2)` followed by a single `.slice(l)` avoids per-iteration bounds checks.
