---
comments: true
difficulty: Medium
tags:
  - Math
  - String
  - Dynamic Programming
  - Combinatorics
---

# 2063. Vowels of All Substrings

**[View Problem on LeetCode](https://leetcode.com/problems/vowels-of-all-substrings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2063` (`2063`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `String`, `Dynamic Programming`, `Combinatorics` |
| **Solution Language** | Java |

---

## Problem Description

Given a lowercase English string `word`, return the **sum of vowel counts** (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`) across **every contiguous non-empty substring** of `word`.

Because the total can exceed the 32-bit signed integer limit, compute and return it as a 64-bit integer (`long`).

---

## Examples

### Example 1

```text
Input: word = "aba"
Output: 6
Explanation:
All possible substrings are: "a", "ab", "aba", "b", "ba", and "a".
- "b" has 0 vowels in it
- "a", "ab", "ba", and "a" have 1 vowel each
- "aba" has 2 vowels in it
Hence, the total sum of vowels = 0 + 1 + 1 + 1 + 1 + 2 = 6.
```

### Example 2

```text
Input: word = "abc"
Output: 3
Explanation:
All possible substrings are: "a", "ab", "abc", "b", "bc", and "c".
- "a", "ab", and "abc" have 1 vowel each
- "b", "bc", and "c" have 0 vowels each
Hence, the total sum of vowels = 1 + 1 + 1 + 0 + 0 + 0 = 3.
```

### Example 3

```text
Input: word = "ltcd"
Output: 0
Explanation: There are no vowels in any substring of "ltcd".
```

---

## Constraints

- `1 <= word.length <= 10^5`

- `word` consists of lowercase English letters.

---

## Problem Understanding

- A string of length `n` has `n * (n + 1) / 2` substrings. For `n = 10^5`, there are `~5 * 10^9` substrings, and the answer can reach `~1.67 * 10^14` (e.g., `100,000` `'a'`s), so `long` arithmetic is mandatory!
- **Contribution Technique (Swap the Summation):** Instead of asking *'for each substring, how many vowels does it contain?'*, flip the question and ask: **'for each vowel at index `i`, how many substrings contain index `i`?'**
- A substring `word[L .. R]` contains index `i` if and only if its start index `L` satisfies `0 <= L <= i` (**`i + 1` choices**) and its end index `R` satisfies `i <= R <= n - 1` (**`n - i` choices**). By the multiplication rule, index `i` belongs to **exact `(i + 1) * (n - i)` substrings**!

---

## Approach

### Brute Force Approach

Enumerating all `(L, R)` pairs (`0 <= L <= R < n`) while maintaining a running vowel count for fixed `L` takes `O(n^2)` time (`~5 * 10^9` iterations for `n = 10^5`), resulting in Time Limit Exceeded.

### Optimized Approach

Iterate `i` from `0` to `word.length() - 1`: whenever `isVowel(word.charAt(i))` is `true`, add `(long) (i + 1) * (long) (word.length() - i)` to `long sum`.

### Step-by-Step Thinking Process

1. Write a constant-time helper `isVowel(char c)` testing `'a'`, `'e'`, `'i'`, `'o'`, `'u'`.
2. Initialize `long sum = 0`.
3. For each index `i` (`0 <= i < n`), if `word.charAt(i)` is a vowel, count independent choices for substring left endpoint `L` in `[0, i]` (`i + 1` choices) and right endpoint `R` in `[i, n - 1]` (`n - i` choices).
4. Cast to `long` **before** multiplying—`(long) (i + 1) * (long) (word.length() - i)`—because `(50000) * (50001) = 2.5 * 10^9` overflows 32-bit `int`!
5. Return `sum`.

### Algorithm / Intuition

By linearity of expectation / double-sum exchange, summing vowel counts over all substrings `(L, R)` is identical to summing `(number of substrings covering i)` over every vowel position `i`. In `countVowels`, each character `word.charAt(i)` is tested once with `isVowel`. Consonants contribute `0`; each vowel at index `i` contributes `(long) (i + 1) * (long) (word.length() - i)` directly to `sum` in `O(1)` time.

---

## Dry Run

Tracing Example 1: `word = "aba"` (`length = 3`):

| `i` | `word.charAt(i)` | `isVowel`? | Left Choices `(i + 1)` | Right Choices `(3 - i)` | Contribution Added | `sum` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `'a'` | `true` | `1` (`L in {0}`) | `3` (`R in {0,1,2}`) | `1 * 3 = 3` | `3` |
| `1` | `'b'` | `false` | — | — | `0` | `3` |
| `2` | `'a'` | `true` | `3` (`L in {0,1,2}`) | `1` (`R in {2}`) | `3 * 1 = 3` | `6` |

Returns `6`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Scans `word` of length `n` once with `O(1)` work per character.
- **Space Complexity:** `O(1)` — Uses only a single `long sum` accumulator.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2063vowels-of-all-substrings.java](./2063vowels-of-all-substrings.java) |

---

## Key Learnings

- The **Contribution Technique** (`(i + 1) * (n - i)` substrings containing index `i`) turns countless `O(n^2)` 'sum over all substrings/subarrays' problems into `O(n)` one-liners!
- Always cast operands to `long` **before** multiplication (`(long) (i + 1) * (n - i)`), because `int * int` overflows **before** assignment to a `long` variable (`50000 * 50000 = 2.5 * 10^9 > 2.147 * 10^9`)!
