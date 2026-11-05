---
comments: true
difficulty: Easy
tags:
  - Array
  - String
  - Trie
  - Rolling Hash
  - String Matching
  - Hash Function
---

# 3042. Count Prefix and Suffix Pairs I

**[View Problem on LeetCode](https://leetcode.com/problems/count-prefix-and-suffix-pairs-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3042` (`3042`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `String`, `Trie`, `Rolling Hash`, `String Matching`, `Hash Function` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed array of strings `words`. We define a boolean function `isPrefixAndSuffix(str1, str2)` that returns `true` if `str1` is both a prefix and a suffix of `str2`, and `false` otherwise.

Our task is to count the number of index pairs `(i, j)` such that `0 <= i < j < words.length` and `isPrefixAndSuffix(words[i], words[j])` evaluates to `true`.

---

## Examples

### Example 1

```text
Input: words = ["a","aba","ababa","aa"]
Output: 4
Explanation: In this example, the counted index pairs are:
i = 0 and j = 1 because isPrefixAndSuffix("a", "aba") is true.
i = 0 and j = 2 because isPrefixAndSuffix("a", "ababa") is true.
i = 0 and j = 3 because isPrefixAndSuffix("a", "aa") is true.
i = 1 and j = 2 because isPrefixAndSuffix("aba", "ababa") is true.
Therefore, the answer is 4.
```

### Example 2

```text
Input: words = ["pa","papa","ma","mama"]
Output: 2
Explanation: In this example, the counted index pairs are:
i = 0 and j = 1 because isPrefixAndSuffix("pa", "papa") is true.
i = 2 and j = 3 because isPrefixAndSuffix("ma", "mama") is true.
Therefore, the answer is 2.
```

### Example 3

```text
Input: words = ["abab","ab"]
Output: 0
Explanation: In this example, the only valid index pair is i = 0 and j = 1, and isPrefixAndSuffix("abab", "ab") is false.
Therefore, the answer is 0.
```

---

## Constraints

- `1 <= words.length <= 50`

- `1 <= words[i].length <= 10`

- `words[i]` consists only of lowercase English letters.

---

## Problem Understanding

Key definitions and constraints:
- A string `s` is a prefix of `t` if `t` begins with `s` (`t.startsWith(s)`).
- A string `s` is a suffix of `t` if `t` ends with `s` (`t.endsWith(s)`).
- If `s.length() > t.length()`, `s` can never be a prefix or suffix of `t`.
- The constraints specify `words.length <= 50` and each `words[i].length <= 10`.
- With such small input dimensions (`n <= 50`, string lengths `<= 10`), the total number of index pairs `(i, j)` is at most `50 * 49 / 2 = 1,225`, making direct string comparison practically instantaneous.

---

## Approach

### Brute Force Approach

The brute-force approach iterates through all pairs `(i, j)` with `i < j` and calls string matching functions. Because `n <= 50`, this brute-force approach is already optimal and requires no complex prefix-suffix tree (Trie) structures.

### Optimized Approach

We iterate through all pairs `(i, j)` with `0 <= i < j < n` using nested loops. For each pair, we let `s = words[i]` and `t = words[j]`. We check if `t.startsWith(s) && t.endsWith(s)`. If both conditions are met, we increment `ans`. Finally, we return `ans`.

### Step-by-Step Thinking Process

1. We need to test `isPrefixAndSuffix(words[i], words[j])` for all pairs with `i < j`.
2. Check constraints: `n <= 50`, `length <= 10`.
3. Evaluating all pairs takes `(50 * 49 / 2) * 10 ≈ 12,250` operations, well within typical 1-second execution budgets (~10^8 operations).
4. Built-in `startsWith` and `endsWith` methods handle prefix and suffix checking efficiently in `O(length)` time.
5. Implement two nested loops and return the count.

### Algorithm / Intuition

The algorithm checks each candidate pair directly:
1. Initialize counter `ans = 0` and get length `n = words.length`.
2. Outer loop `i` from `0` to `n - 1`, setting `s = words[i]`.
3. Inner loop `j` from `i + 1` to `n - 1`, setting `t = words[j]`.
4. If `t.startsWith(s) && t.endsWith(s)`, increment `ans`.
5. Return `ans`.

---

## Dry Run

Trace on Example 1: `words = ["a", "aba", "ababa", "aa"]` (`n = 4`)

- `i = 0, s = "a"`:
  - `j = 1, t = "aba"`: starts with "a" and ends with "a" -> `ans = 1`.
  - `j = 2, t = "ababa"`: starts with "a" and ends with "a" -> `ans = 2`.
  - `j = 3, t = "aa"`: starts with "a" and ends with "a" -> `ans = 3`.
- `i = 1, s = "aba"`:
  - `j = 2, t = "ababa"`: starts with "aba" and ends with "aba" -> `ans = 4`.
  - `j = 3, t = "aa"`: length of "aba" > "aa", fails.
- `i = 2, s = "ababa"`:
  - `j = 3, t = "aa"`: length of "ababa" > "aa", fails.
- Final `ans = 4`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n^2 * L) — There are O(n^2) pairs of words, and checking `startsWith` and `endsWith` takes O(L) time where L is the maximum string length (L <= 10).
- **Space Complexity:** O(1) auxiliary space — Only a counter `ans` and loop indices are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3042count-prefix-and-suffix-pairs-i.java](./3042count-prefix-and-suffix-pairs-i.java) |

---

## Key Learnings

- Always check constraints before over-engineering: for `n <= 50`, `O(n^2 * L)` brute-force is concise, readable, and lightning-fast.
- Standard library methods `startsWith` and `endsWith` provide concise, idiomatic string prefix/suffix validation.
