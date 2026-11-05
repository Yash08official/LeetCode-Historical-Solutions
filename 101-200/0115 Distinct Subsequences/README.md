---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
---

# 115. Distinct Subsequences

**[View Problem on LeetCode](https://leetcode.com/problems/distinct-subsequences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0115` (`115`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `s` and `t`, return the total number of **distinct subsequences** of `s` that equal `t`.

A subsequence of `s` is formed by deleting zero or more characters from `s` without changing the relative order of the remaining characters; two subsequences are distinct if they select characters from different sets of indices in `s`.

---

## Examples

### Example 1

```text
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
```

### Example 2

```text
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
```

---

## Constraints

- `1 <= s.length, t.length <= 1000`

- `s` and `t` consist of English letters.

---

## Problem Understanding

- Even if identical characters appear consecutively (such as the three `'b'`s in `"rabbbit"`), choosing different subsets of indices counts as distinct ways to form `t`.
- If `s.length() < t.length()`, `0` subsequences can match `t`.
- The test cases guarantee that the final answer fits in a 32-bit signed `int`.
- At each character `s[i - 1]` relative to target character `t[j - 1]`, we always have the option to **skip** `s[i - 1]`; if `s[i - 1] == t[j - 1]`, we additionally have the option to **match** them.

---

## Approach

### Brute Force Approach

Recursively branching at every index of `s` to either include or exclude `s[i]` explores up to `2^m` subsequences (or `O(C(m, n))` pruned branches). With `m, n <= 1000`, exponential search immediately hits Time Limit Exceeded.

### Optimized Approach

Use 2D bottom-up Dynamic Programming `int[][] dp = new int[m + 1][n + 1]`, where `dp[i][j]` counts how many subsequences of prefix `s[0 .. i - 1]` equal prefix `t[0 .. j - 1]`.

### Step-by-Step Thinking Process

1. Define `dp[i][j]` as the number of distinct subsequences of the first `i` characters of `s` that match the first `j` characters of `t`.
2. Initialize base cases:
  - `dp[i][0] = 1` for all `0 <= i <= m`: an empty target `""` can be formed in exactly `1` way (delete all `i` characters of `s`).
  - `dp[0][j] = 0` for all `1 <= j <= n` (Java default): an empty `s` cannot form a non-empty `t`.
3. Iterate `i` from `1` to `m` and `j` from `1` to `n`.
4. If `s.charAt(i - 1) == t.charAt(j - 1)`, add two disjoint sets of subsequences: those that match `s[i - 1]` with `t[j - 1]` (`dp[i - 1][j - 1]`) plus those that skip `s[i - 1]` (`dp[i - 1][j]`).
5. Otherwise (`s.charAt(i - 1) != t.charAt(j - 1)`), `s[i - 1]` cannot match `t[j - 1]`, so `dp[i][j] = dp[i - 1][j]`. Return `dp[m][n]`.

### Algorithm / Intuition

In `numDistinct(String s, String t)`, `dp` has dimensions `(m + 1) x (n + 1)`:
- Column `0` is initialized to `1` (`dp[i][0] = 1`), seeding every subsequence match when its first character aligns with `t.charAt(0)`.
- At cell `(i, j)`, we ask: *"Do we use `s.charAt(i - 1)` as the final character of `t[0 .. j - 1]`?"*
  - **Not using `s.charAt(i - 1)`** always contributes `dp[i - 1][j]` ways.
  - **Using `s.charAt(i - 1)`** is valid only when `s.charAt(i - 1) == t.charAt(j - 1)`, contributing `dp[i - 1][j - 1]` ways.
- Summing those two mutually exclusive choices yields `dp[i][j]`.

---

## Dry Run

Tracing Example 1 with `s = "rabbbit"` (`m = 7`) and `t = "rabbit"` (`n = 6`):

| `i` (`s[i-1]`) \ `j` (`t[j-1]`) | `""` | `'r'` | `'a'` | `'b'` | `'b'` | `'i'` | `'t'` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`""` (0)** | `1` | `0` | `0` | `0` | `0` | `0` | `0` |
| **`'r'` (1)** | `1` | `1` | `0` | `0` | `0` | `0` | `0` |
| **`'a'` (2)** | `1` | `1` | `1` | `0` | `0` | `0` | `0` |
| **`'b'` (3)** | `1` | `1` | `1` | `1` | `0` | `0` | `0` |
| **`'b'` (4)** | `1` | `1` | `1` | `2` | `1` | `0` | `0` |
| **`'b'` (5)** | `1` | `1` | `1` | `3` | `3` | `0` | `0` |
| **`'i'` (6)** | `1` | `1` | `1` | `3` | `3` | `3` | `0` |
| **`'t'` (7)** | `1` | `1` | `1` | `3` | `3` | `3` | **`3`** |

Notice row `5` (`3rd 'b'`): `dp[5][4] = dp[4][3] + dp[4][4] = 2 + 1 = 3` ways to pick two `'b'`s out of three (`C(3, 2) = 3`), which then propagates through `'i'` and `'t'` to `dp[7][6] = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Nested loops fill `m * n` cells, performing `O(1)` character comparison and addition per cell.
- **Space Complexity:** `O(m * n)` — The 2D integer table `dp` allocates `(m + 1) * (n + 1)` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [115distinct-subsequences.java](./115distinct-subsequences.java) |

---

## Key Learnings

- Setting `dp[i][0] = 1` for an empty target subsequence is the combinatorial counterpart of `C(i, 0) = 1` — there is always `1` way to choose nothing.
- Partitioning subsequence counts into **use current character** (`dp[i - 1][j - 1]`) vs **skip current character** (`dp[i - 1][j]`) generalizes Pascal's identity `C(n, k) = C(n - 1, k - 1) + C(n - 1, k)` to arbitrary strings.
- Note: if `dp[i][j]` for unreachable suffixes briefly exceeds `Integer.MAX_VALUE` in variants, using `long` or a 1D array iterated right-to-left (`j = n .. 1`) prevents intermediate overflow and reduces space to `O(n)`.
