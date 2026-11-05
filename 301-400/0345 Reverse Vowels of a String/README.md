---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
---

# 345. Reverse Vowels of a String

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-vowels-of-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0345` (`345`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an ASCII string `s`, reverse the order of all vowels appearing in `s` while keeping every non-vowel character fixed at its original index, and return the resulting string.

Vowels consist of `'a'`, `'e'`, `'i'`, `'o'`, and `'u'` in both lowercase and uppercase (`'A'`, `'E'`, `'I'`, `'O'`, `'U'`).

---

## Examples

### Example 1

**Input:** `s = "IceCreAm"`

**Output:** `"AceCreIm"`

**Explanation:**

The vowels in `s` are `['I', 'e', 'e', 'A']`. On reversing the vowels, s becomes `"AceCreIm"`.

### Example 2

**Input:** `s = "leetcode"`

**Output:** `"leotcede"`

---

## Constraints

- `1 <= s.length <= 3 * 10^5`

- `s` consist of **printable ASCII** characters.

---

## Problem Understanding

Only the subset of indices holding vowels participates in the reversal; consonants, digits, punctuation, and spaces never move. If the vowels in `s` appear at indices `p_1 < p_2 < ... < p_k`, then after reversal `p_1` receives the character originally at `p_k`, `p_2` receives `p_{k-1}`, and so on.

Key observations:
- Both uppercase and lowercase vowels are interchangeable positions in the vowel sequence, and each vowel retains its original case when moved.
- JavaScript strings are immutable, so converting `s` into a character array allows `O(1)` in-place swaps.
- `s.length` can be up to `3 * 10^5`, requiring a linear-time `O(n)` scan.

---

## Approach

### Brute Force Approach

A two-pass extra-buffer approach scans `s` once to collect every vowel into a separate array `vowels`, reverses `vowels` (or pops from its end), and then scans `s` a second time to build a new string—emitting the next reversed vowel whenever the current character is a vowel, or the original character otherwise.

While still `O(n)` time, it requires multiple passes and a separate vowel buffer in addition to building the output string.

### Optimized Approach

We use a **Converging Two-Pointer** approach on a mutable character array `chars`. Starting `left` at the beginning and `right` at the end, we advance `left` past non-vowels and retreat `right` past non-vowels; whenever both pointers sit on vowels, we swap them and step both inward until they cross.

### Step-by-Step Thinking Process

1. Split `s` into an array of single-character strings `chars` so indices can be mutated in place.
2. Initialize `left = 0` and `right = s.length - 1`.
3. Define a case-insensitive helper `isVowel(c)` that lowercases `c` and checks membership in `'aeiou'`.
4. While `left < right`, if `chars[left]` is not a vowel, increment `left`; else if `chars[right]` is not a vowel, decrement `right`.
5. Otherwise both pointers point to vowels: swap `chars[left]` and `chars[right]`, increment `left`, and decrement `right`.
6. Join `chars` back into a single string with `chars.join('')` and return it.

### Algorithm / Intuition

In `reverseVowels(s)`, `chars` holds `s.split('')`. Each iteration of `while (left < right)` makes guaranteed progress by either advancing `left`, decrementing `right`, or moving both after calling `swap(chars, left, right)`.

Because `else if (!isVowel(chars[right]))` only runs once `isVowel(chars[left])` is `true`, `left` pauses on the outermost unswapped vowel on the left while `right` scans leftward for its matching outermost vowel on the right. Array destructuring `[chars[i], chars[j]] = [chars[j], chars[i]]` inside `swap` exchanges them cleanly.

---

## Dry Run

Tracing `reverseVowels("IceCreAm")` (**Example 1**):

Initial `chars`: `['I', 'c', 'e', 'C', 'r', 'e', 'A', 'm']`, `left = 0`, `right = 7`.

| Step | `left` (`chars[left]`) | `right` (`chars[right]`) | Action | `chars` After Step |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `0` (`'I'`, vowel) | `7` (`'m'`, non-vowel) | `right--` (`6`) | `['I','c','e','C','r','e','A','m']` |
| 2 | `0` (`'I'`, vowel) | `6` (`'A'`, vowel) | `swap(0, 6)`, `left++` (`1`), `right--` (`5`) | `['A','c','e','C','r','e','I','m']` |
| 3 | `1` (`'c'`, non-vowel) | `5` (`'e'`) | `left++` (`2`) | `['A','c','e','C','r','e','I','m']` |
| 4 | `2` (`'e'`, vowel) | `5` (`'e'`, vowel) | `swap(2, 5)`, `left++` (`3`), `right--` (`4`) | `['A','c','e','C','r','e','I','m']` |
| 5 | `3` (`'C'`, non-vowel) | `4` (`'r'`) | `left++` (`4`) | `['A','c','e','C','r','e','I','m']` |

Now `left = 4` is not `< right = 4`, so the loop terminates. `chars.join('')` returns `"AceCreIm"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Splitting and joining take `O(n)` time, and the two pointers `left` and `right` each traverse at most `n` positions with `O(1)` vowel checks (`'aeiou'.includes(...)` scans a 5-character literal).
- **Space Complexity:** `O(n)` — `chars` stores all `n` characters of `s` so swaps can be performed in JavaScript.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [345reverse-vowels-of-a-string.js](./345reverse-vowels-of-a-string.js) |

---

## Key Learnings

- When reversing only a filtered subset of elements in place, converging two pointers avoid storing index maps or auxiliary element lists.
- JavaScript strings are immutable; converting to an array via `split('')` and rejoining via `join('')` prevents `O(n^2)` string concatenation overhead.
- Normalizing characters via `c.toLowerCase()` halves the vowel lookup set from 10 characters to 5 while preserving the original character in `chars` for swapping.
