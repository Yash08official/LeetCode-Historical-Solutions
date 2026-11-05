---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
  - Dynamic Programming
---

# 392. Is Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/is-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0392` (`392`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `s` and `t`, determine whether `s` is a **subsequence** of `t`. Return `true` if `s` can be formed by deleting zero or more characters from `t` without changing the relative order of the remaining characters, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: s = "abc", t = "ahbgdc"
Output: true
```

### Example 2

```text
Input: s = "axc", t = "ahbgdc"
Output: false
```

---

## Constraints

- `0 <= s.length <= 100`

- `0 <= t.length <= 10^4`

- `s` and `t` consist only of lowercase English letters.

---

## Follow-up Questions

Suppose there are lots of incoming `s`, say `s_1, s_2, ..., s_k` where `k >= 10^9`, and you want to check one by one to see if `t` has its subsequence. In this scenario, how would you change your code?

When `k >= 10^9` incoming strings `s_1, s_2, ...` are checked against a fixed `t` (`|t| <= 10^4`), scanning `t` per query (`O(k * |t|)`) is far too slow. Instead, preprocess `t` **once**:
1. **Subsequence Automaton (`O(26 * |t|)` preprocessing, `O(|s|)` per query):** Build a 2D table `nxt[pos][26]` from right to left where `nxt[pos][c]` stores the earliest index `>= pos` where character `c` appears in `t` (or `-1` if absent). Each query `s` just jumps `pos = nxt[pos][s[i] - 'a'] + 1` in `O(|s|)` time!
2. **Index Lists + Binary Search (`O(|t|)` preprocessing, `O(|s| log |t|)` per query):** Store a sorted list of occurrence indices for each of the 26 letters and binary-search for the smallest index `> prevIdx` for each character of `s`.

---

## Problem Understanding

For `s` of length `m` to be a subsequence of `t` of length `n`, there must exist strictly increasing indices `0 <= j_0 < j_1 < ... < j_{m-1} < n` such that `t[j_k] == s[k]` for all `0 <= k < m`.

Key observations:
- **Greedy earliest match:** If `s[0]` appears at multiple positions in `t`, matching `s[0]` with its *earliest* occurrence in `t` leaves the longest possible suffix of `t` to match `s[1..m-1]`. It can never hurt to match greedily!
- Edge cases: When `s` is empty (`m == 0`), the loop doesn't run and `i == m` (`0 == 0`) immediately returns `true`.

---

## Approach

### Brute Force Approach

Generating all `2^n` subsequences of `t` or recursively branching on whether to match or skip each occurrence of `s[i]` in `t` without memoization takes exponential time.

Even 2D Longest Common Subsequence DP (`dp[m + 1][n + 1]`) takes `O(m * n)` time and `O(m * n)` space, which is unnecessary when greedy matching works.

### Optimized Approach

Use **Two Pointers** (`i` on `s`, `j` on `t`) in a single greedy pass: advance `j` across every character of `t`, incrementing `i` whenever `s.charAt(i) == t.charAt(j)`. Return `true` iff `i` reaches `m`.

### Step-by-Step Thinking Process

1. Store lengths `m = s.length()` and `n = t.length()`, and initialize pointers `i = 0` and `j = 0`.
2. Loop while `i < m && j < n` (both strings still have unmatched characters).
3. If `s.charAt(i) == t.charAt(j)`, greedily match `s[i]` by advancing `++i`.
4. Unconditionally advance `++j` to inspect the next character of `t`.
5. Once the loop terminates, return `i == m` (`true` if every character of `s` was matched).

### Algorithm / Intuition

Pointer `i` represents how many prefix characters of `s` have already been matched inside `t[0..j-1]`. Whenever `t.charAt(j)` equals the next needed character `s.charAt(i)`, matching it immediately maximizes the remaining suffix `t[j+1..n-1]` available for `s[i+1..m-1]`. If `i == m` before `j` reaches `n`, the `while (i < m && j < n)` condition short-circuits early.

---

## Dry Run

Tracing `isSubsequence("abc", "ahbgdc")` (**Example 1**, `m = 3, n = 6`):

| Step | `i` (`s[i]`) | `j` (`t[j]`) | Match? | After Step (`i`, `j`) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `0` (`'a'`) | `0` (`'a'`) | Yes | `i = 1`, `j = 1` |
| 2 | `1` (`'b'`) | `1` (`'h'`) | No | `i = 1`, `j = 2` |
| 3 | `1` (`'b'`) | `2` (`'b'`) | Yes | `i = 2`, `j = 3` |
| 4 | `2` (`'c'`) | `3` (`'g'`) | No | `i = 2`, `j = 4` |
| 5 | `2` (`'c'`) | `4` (`'d'`) | No | `i = 2`, `j = 5` |
| 6 | `2` (`'c'`) | `5` (`'c'`) | Yes | `i = 3`, `j = 6` |

Loop exits because `i == 3 == m`. Returns `3 == 3` -> `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` (more precisely `O(m + n)` or `O(n)` since early exit stops at `min` scan) — `j` increments at most `n` times with `O(1)` work per step.
- **Space Complexity:** `O(1)` — Only four integer variables (`m`, `n`, `i`, `j`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [392is-subsequence.java](./392is-subsequence.java) |

---

## Key Learnings

- Subsequence matching satisfies the greedy exchange property: matching each target character at its earliest valid position in `t` is always optimal.
- Checking `i < m && j < n` both guards against `IndexOutOfBoundsException` when `s` is empty and exits early as soon as `s` is completely matched.
- When `t` is queried repeatedly against billions of patterns, preprocessing `t` shifts per-query cost from `O(|t|)` down to `O(|s|)` or `O(|s| log |t|)`.
