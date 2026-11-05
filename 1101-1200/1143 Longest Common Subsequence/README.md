---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
  - Longest Common Subsequence
---

# 1143. Longest Common Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/longest-common-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1143` (`1143`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Longest Common Subsequence` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two lowercase English strings `text1` and `text2`, return the length of their **longest common subsequence (LCS)**. If they share no common characters, return `0`.

A **subsequence** is formed by deleting zero or more characters from a string while keeping the remaining characters in their original relative order.

---

## Examples

### Example 1

```text
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
```

### Example 2

```text
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

### Example 3

```text
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

---

## Constraints

- `1 <= text1.length, text2.length <= 1000`

- `text1` and `text2` consist of only lowercase English characters.

---

## Problem Understanding

- **Optimal Substructure on Prefixes:** Let `f[i][j]` represent the LCS length of prefixes `text1[0..i-1]` (first `i` chars) and `text2[0..j-1]` (first `j` chars):
  - If the last characters match (`text1[i - 1] == text2[j - 1]`), pairing them is always optimal: `f[i][j] = f[i - 1][j - 1] + 1`.
  - Otherwise, at least one of `text1[i - 1]` or `text2[j - 1]` cannot be part of a common ending pair, so `f[i][j] = max(f[i - 1][j], f[i][j - 1])`.
- **Manageable Constraints:** `1 <= text1.length, text2.length <= 1000`, so `m * n <= 10^6`, fitting comfortably in quadratic time and memory.

---

## Approach

### Brute Force Approach

Generate all `2^m` subsequences of `text1` and test whether each is a subsequence of `text2` in `O(n)` time (or run unmemoized recursion branching into `f(i-1, j)` and `f(i, j-1)`). Both take exponential `O(2^min(m, n))` time and fail for strings of length `1000`.

### Optimized Approach

Build a 2D bottom-up dynamic programming table `f` of size `(m + 1) x (n + 1)` initialized to `0`, filling row by row using the LCS recurrence and returning `f[m][n]`.

### Step-by-Step Thinking Process

1. Define `f[i][j]` as the LCS length between the first `i` characters of `text1` and the first `j` characters of `text2`.
2. Pad the table with row `0` and column `0` initialized to `0` (`Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))`), representing empty prefixes.
3. Iterate `i` from `1` to `m` and `j` from `1` to `n`: if `text1[i - 1] == text2[j - 1]`, extend the diagonal `f[i - 1][j - 1] + 1`; else take `Math.max(f[i - 1][j], f[i][j - 1])`.
4. Return `f[m][n]` once all prefix pairs have been evaluated.

### Algorithm / Intuition

In `longestCommonSubsequence`, `m` and `n` store `text1.length` and `text2.length`. Using `1`-based DP indices (`1..m` and `1..n`) while indexing `text1[i - 1]` and `text2[j - 1]` avoids out-of-bounds checks when looking up `f[i - 1][j - 1]`, `f[i - 1][j]`, and `f[i][j - 1]`, because row `0` and column `0` are pre-filled with `0`s.

Because both loops advance in increasing order of `i` and `j`, all three dependency cells (`top-left`, `top`, `left`) are guaranteed to be computed before `f[i][j]`.

---

## Dry Run

Using **Example 1** (`text1 = "abcde"`, `text2 = "ace"`, `m = 5, n = 3`):

Completed DP table `f[i][j]`:

| `i \ j` | `""` (0) | `'a'` (1) | `'c'` (2) | `'e'` (3) |
| :--- | :---: | :---: | :---: | :---: |
| **`""` (0)** | `0` | `0` | `0` | `0` |
| **`'a'` (1)** | `0` | **`1`** (`a==a`) | `1` | `1` |
| **`'b'` (2)** | `0` | `1` | `1` | `1` |
| **`'c'` (3)** | `0` | `1` | **`2`** (`c==c`) | `2` |
| **`'d'` (4)** | `0` | `1` | `2` | `2` |
| **`'e'` (5)** | `0` | `1` | `2` | **`3`** (`e==e`) |

Returns `f[5][3] = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Nested loops fill `m * n` cells of table `f`, doing `O(1)` character comparison and arithmetic per cell.
- **Space Complexity:** `O(m * n)` — The 2D array `f` allocates `(m + 1) * (n + 1)` numbers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1143longest-common-subsequence.js](./1143longest-common-subsequence.js) |

---

## Key Learnings

- 1-indexed DP padding (`(m + 1) x (n + 1)`) cleanly handles empty-prefix base cases without conditional boundary checks.
- Whenever two ending characters match in LCS, greedily matching them (`f[i - 1][j - 1] + 1`) never loses optimality.
- If memory is tight, `f[i]` only depends on `f[i - 1]`, so space can be further compressed to `O(min(m, n))` using a 1D rolling array.
