---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
  - Dynamic Programming
  - Manacher
---

# 5. Longest Palindromic Substring

**[View Problem on LeetCode](https://leetcode.com/problems/longest-palindromic-substring/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0005` (`5`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String`, `Dynamic Programming`, `Manacher` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a string `s` of length `1` to `1000` containing digits and English letters, find and return the **longest contiguous substring** of `s` that reads the same forward and backward (a palindrome).

If multiple palindromic substrings share the maximum length, returning any one of them is valid.

---

## Examples

### Example 1

```text
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

### Example 2

```text
Input: s = "cbbd"
Output: "bb"
```

---

## Constraints

- `1 <= s.length <= 1000`

- `s` consist of only digits and English letters.

---

## Problem Understanding

- **Recursive palindrome structure:** A substring `s[i..j]` (`i < j`) is a palindrome if and only if its outer characters match (`s[i] === s[j]`) **and** its inner substring `s[i + 1 .. j - 1]` is also a palindrome (or empty when `j == i + 1`).
- **Single-character baseline:** Every string of length `>= 1` has at least a palindrome of length `1` (`s[0]`).
- **Input size:** With `n <= 1000`, an `O(n^2)` dynamic programming table (`1000 x 1000` booleans) fits well within time and memory limits.

---

## Approach

### Brute Force Approach

Generate all `O(n^2)` substrings `s[i..j]` and verify each one from both ends in `O(n)` time. Because palindrome verification repeats overlapping inner character comparisons over and over, worst-case runtime degrades to `O(n^3)`.

### Optimized Approach

Use bottom-up 2D Dynamic Programming (`f[i][j]`) iterating `i` backward from `n - 2` to `0` and `j` forward from `i + 1` to `n - 1`, recording the starting index `k` and maximum length `mx` of the longest palindrome.

### Step-by-Step Thinking Process

1. Define `f[i][j]` as a boolean indicating whether `s[i..j]` is a palindrome.
2. Initialize the entire `n x n` grid `f` to `true`. This handles both length-`1` base cases (`f[i][i] = true`) and empty inner ranges (`f[i + 1][i] = true` when `j = i + 1`, i.e., length-`2` substrings).
3. Because `f[i][j]` depends on `f[i + 1][j - 1]` (row below, column to the left), iterate `i` downward from `n - 2` to `0` and `j` upward from `i + 1` to `n - 1`.
4. Set `f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1]`. Whenever `f[i][j]` is `true` and `j - i + 1 > mx`, update `mx = j - i + 1` and `k = i`.
5. Extract and return `s.slice(k, k + mx)`.

### Algorithm / Intuition

In `5longest-palindromic-substring.js`, pre-filling `f` with `true` makes the transition remarkably concise. When `j === i + 1` (a 2-character substring), `f[i + 1][j - 1]` accesses `f[i + 1][i]` on the sub-diagonal, which remains `true` from initialization! Thus `f[i][j] = f[i + 1][j - 1]` works identically for length `2` and length `>= 3` without an extra `j - i < 2` check. Variables `k = 0` and `mx = 1` default to the single character `s[0]` in case no longer palindrome exists.

---

## Dry Run

**Input:** `s = "babad"` (`n = 5`), initially `k = 0`, `mx = 1`

- `i = 3` (`'a'`): `j = 4` (`'d'`) -> `'a' !== 'd'`, `f[3][4] = false`.
- `i = 2` (`'b'`):
  - `j = 3` (`'a'`) -> `false`.
  - `j = 4` (`'d'`) -> `false`.
- `i = 1` (`'a'`):
  - `j = 2` (`'b'`) -> `false`.
  - `j = 3` (`'a'`) -> `'a' === 'a'`, `f[1][3] = f[2][2] = true`. Length `3 > mx (1)` -> `mx = 3`, `k = 1` (`"aba"`).
  - `j = 4` (`'d'`) -> `false`.
- `i = 0` (`'b'`):
  - `j = 1` (`'a'`) -> `false`.
  - `j = 2` (`'b'`) -> `'b' === 'b'`, `f[0][2] = f[1][1] = true`. Length `3` is not `> mx (3)`, so `k` and `mx` stay `1` and `3`.
  - `j = 3` (`'a'`), `j = 4` (`'d'`) -> `false`.

Returns `s.slice(1, 1 + 3)` -> `"aba"` (an equally valid longest palindrome alongside `"bab"`).

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — The nested loops evaluate `(n * (n - 1)) / 2` substring pairs in `O(1)` time each, plus `O(n)` for the final `slice`.
- **Space Complexity:** `O(n^2)` — Allocates an `n x n` 2D array `f` of booleans.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [5longest-palindromic-substring.js](./5longest-palindromic-substring.js) |

---

## Key Learnings

- Iteration order matters in interval DP: computing `f[i][j]` from `f[i + 1][j - 1]` requires processing larger `i` before smaller `i`.
- Pre-initializing `f` to `true` lets sub-diagonal entries `f[i + 1][i]` represent empty strings, unifying length-2 and length-3+ transitions.
- If space must be reduced further, Expanding Around Centers achieves `O(n^2)` time in `O(1)` extra space, and Manacher's Algorithm solves it in `O(n)` time and `O(n)` space.
