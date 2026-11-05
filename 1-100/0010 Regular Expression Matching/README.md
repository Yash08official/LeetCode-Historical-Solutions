---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
  - Recursion
---

# 10. Regular Expression Matching

**[View Problem on LeetCode](https://leetcode.com/problems/regular-expression-matching/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0010` (`10`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given a text string `s` (lowercase English letters) and a pattern string `p` (lowercase English letters, `'.'`, and `'*'`), implement full-string regular expression matching:

- `'.'` matches any single character.
- `'*'` matches **zero or more** occurrences of the character immediately preceding `'*'`.

Return `true` if `p` matches the **entire** string `s` from start to finish, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

### Example 2

```text
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

### Example 3

```text
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```

---

## Constraints

- `1 <= s.length <= 20`

- `1 <= p.length <= 20`

- `s` contains only lowercase English letters.

- `p` contains only lowercase English letters, `'.'`, and `'*'`.

- It is guaranteed for each appearance of the character `'*'`, there will be a previous valid character to match.

---

## Problem Understanding

- **Full match required:** Unlike substring regex search, every character of `s` must be accounted for by `p`.
- **Preceding-element binding of `'*'`:** `'a*'` is a single repeatable unit (`""`, `"a"`, `"aa"`, ...); `'*'` never acts standalone and constraints guarantee a valid character precedes every `'*'`.
- **Empty text with non-empty pattern:** Even when `s` is empty (`i = 0`), patterns like `"a*"` or `"a*b*c*"` can match `""` by choosing zero occurrences for each `x*` pair!

---

## Approach

### Brute Force Approach

Use plain recursion without memoization: when encountering `x*`, branch into skipping `x*` (`p.substring(2)`) or consuming one matching character from `s` (`s.substring(1)` while keeping `p`). On adversarial inputs like `s = "aaaaaaaaaa"` and `p = "a*a*a*b"`, overlapping subproblems re-evaluate exponentially in `O(2^(m + n))` time.

### Optimized Approach

Use bottom-up 2D Dynamic Programming (`boolean[][] dp` of size `(m + 1) x (n + 1)`), where `dp[i][j]` records whether the prefix `s[0..i-1]` matches the pattern prefix `p[0..j-1]`.

### Step-by-Step Thinking Process

1. Allocate `dp[s.length() + 1][p.length() + 1]` and set the empty-string / empty-pattern base case `dp[0][0] = true`.
2. Pre-fill row `0` (`i = 0`, empty string `s`): whenever `p.charAt(j - 1) == '*'`, the pair `x*` can match zero characters, so `dp[0][j] = dp[0][j - 2]`.
3. Iterate `i` from `1` to `s.length()` and `j` from `1` to `p.length()`.
4. Case 1 (`p[j - 1]` is a matching letter or `'.'`): both prefixes must match without their last characters, so `dp[i][j] = dp[i - 1][j - 1]`.
5. Case 2 (`p[j - 1] == '*'`): either `x*` matches **zero** occurrences (`dp[i][j - 2]`), or `x*` consumes **at least one** character `s[i - 1]` — valid when `dp[i - 1][j]` is `true` and `p[j - 2]` matches `s[i - 1]` (exact char or `'.'`).
6. Return `dp[s.length()][p.length()]`.

### Algorithm / Intuition

In `10regular-expression-matching.java`, the crucial transition is the `'*'` recurrence:
`dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (p.charAt(j - 2) == s.charAt(i - 1) || p.charAt(j - 2) == '.'))`.
Why `dp[i - 1][j]` instead of `dp[i - 1][j - 2]`? Because keeping `j` intact lets `x*` match **multiple** characters inductively: if `s[0..i-2]` already matched `p[0..j-1]` (using zero or more copies of `x`), and `s[i - 1]` also matches `x`, then `s[0..i-1]` matches `p[0..j-1]` by absorbing one more `x`!

---

## Dry Run

**Input:** `s = "aa"`, `p = "a"`

1. Allocate `dp[3][2]`, set `dp[0][0] = true`.
2. Row `0` init: `j = 1`, `p.charAt(0) = 'a' != '*'`, so `dp[0][1] = false`.
3. **Row `i = 1` (`s[0] = 'a'`):**
   - `j = 1` (`p[0] = 'a'`): `'a' == 'a'` -> `dp[1][1] = dp[0][0] = true`.
4. **Row `i = 2` (`s[1] = 'a'`):**
   - `j = 1` (`p[0] = 'a'`): `'a' == 'a'` -> `dp[2][1] = dp[1][0] = false`.

| `dp[i][j]` | `""` (`j=0`) | `"a"` (`j=1`) |
| :--- | :--- | :--- |
| **`""` (`i=0`)** | `true` | `false` |
| **`"a"` (`i=1`)** | `false` | `true` |
| **`"aa"` (`i=2`)** | `false` | `false` |

Returns `dp[2][1]` -> **`false`**.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Where `m = s.length()` and `n = p.length()`. Each of the `m * n` cells in `dp` is computed in `O(1)` time.
- **Space Complexity:** `O(m * n)` — Allocates an `(m + 1) x (n + 1)` boolean DP table.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [10regular-expression-matching.java](./10regular-expression-matching.java) |

---

## Key Learnings

- Modeling "1 or more matches" of `x*` via `dp[i - 1][j]` avoids an inner loop over repetition counts, keeping each DP state `O(1)`.
- Don't forget row `0` initialization (`dp[0][j] = dp[0][j - 2]` on `'*'`): empty text `s = ""` can still match patterns like `"c*a*b*"`.
- Because row `i` only reads from row `i` and row `i - 1`, space can optionally be compressed to `O(n)` using two 1D arrays.
