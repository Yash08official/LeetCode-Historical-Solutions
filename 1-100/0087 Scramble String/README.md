---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
---

# 87. Scramble String

**[View Problem on LeetCode](https://leetcode.com/problems/scramble-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0087` (`87`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

A string `s` can be recursively **scrambled** as follows:
1. If `s` has length `1`, stop.
2. If `s` has length `> 1`, split `s` at any non-empty cut point into `s = x + y`.
3. Randomly choose either to keep the halves in order (`x + y`) or swap them (`y + x`).
4. Recursively apply the same scrambling process independently to `x` and `y`.

Given two equal-length lowercase strings `s1` and `s2`, return `true` if `s2` can be produced by scrambling `s1`, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: s1 = "great", s2 = "rgeat"
Output: true
Explanation: One possible scenario applied on s1 is:
"great" --> "gr/eat" // divide at random index.
"gr/eat" --> "gr/eat" // random decision is not to swap the two substrings and keep them in order.
"gr/eat" --> "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at random index each of them.
"g/r / e/at" --> "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
"r/g / e/at" --> "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
"r/g / e/ a/t" --> "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
The algorithm stops now, and the result string is "rgeat" which is s2.
As one possible scenario led s1 to be scrambled to s2, we return true.
```

### Example 2

```text
Input: s1 = "abcde", s2 = "caebd"
Output: false
```

### Example 3

```text
Input: s1 = "a", s2 = "a"
Output: true
```

---

## Constraints

- `s1.length == s2.length`

- `1 <= s1.length <= 30`

- `s1` and `s2` consist of lowercase English letters.

---

## Problem Understanding

- Scrambling corresponds to building a binary parse tree over `s1` and optionally swapping the left and right children at any subset of internal nodes.
- At the top-level split of a substring of length `len` into `k` and `len - k` (`1 <= k < len`), there are two possibilities:
  - **No swap:** prefix of length `k` in `s1` scrambles to prefix of length `k` in `s2`, AND suffix of length `len - k` in `s1` scrambles to suffix of length `len - k` in `s2`.
  - **Swap:** prefix of length `k` in `s1` scrambles to **suffix** of length `k` in `s2`, AND suffix of length `len - k` in `s1` scrambles to **prefix** of length `len - k` in `s2`.
- Any recursive subproblem is uniquely identified by `(i, j, len)` — comparing `s1[i .. i + len - 1]` against `s2[j .. j + len - 1]`. Since `n <= 30`, `n^3 <= 27,000` states easily fit in a 3D memoization table.

---

## Approach

### Brute Force Approach

Pure recursion without memoization tries all `len - 1` split points and both swap/no-swap branches at every level. Because identical substring pairs `(i, j, len)` are re-solved across many split trees, the time complexity blows up exponentially (`Omega(4^n)`), timing out well before `n = 30`.

### Optimized Approach

Use top-down recursion with a 3D memoization table `int[][][] dp = new int[n][n][n + 1]` (`0` = uncomputed, `1` = true, `-1` = false) over substring start indices `(i, j)` and length `len`.

### Step-by-Step Thinking Process

1. Check quick base cases at the entry point: if `s1.length() != s2.length()` return `false`; if `s1.equals(s2)` return `true`.
2. Represent each subproblem by `(i, j, len)`, comparing `s1[i .. i + len - 1]` and `s2[j .. j + len - 1]`, cached in `dp[i][j][len]`.
3. If `dp[i][j][len] != 0`, return `dp[i][j][len] == 1` immediately.
4. If `s1.substring(i, i + len).equals(s2.substring(j, j + len))` (which also covers the base case `len == 1` when characters match), store `dp[i][j][len] = 1` and return `true`.
5. Try every split size `k` from `1` to `len - 1`: check both unswapped (`(i, j, k)` with `(i + k, j + k, len - k)`) and swapped (`(i, j + len - k, k)` with `(i + k, j, len - k)`). If none succeed, cache `-1` and return `false`.

### Algorithm / Intuition

In `isScramble(String s1, String s2)`, `dp` is an `n x n x (n + 1)` integer array initialized to `0`:
- `0` means `(i, j, len)` has not been solved yet.
- `1` means `s1[i .. i + len - 1]` can scramble into `s2[j .. j + len - 1]`.
- `-1` means it cannot.

Inside `solve(s1, s2, i, j, len, dp)`:
- When `len == 1` and the single characters differ, `substring.equals` is `false` and the loop `for (int k = 1; k < len; k++)` does not execute (`1 < 1` is false), so `dp[i][j][1]` cleanly records `-1` and returns `false`.
- For `len > 1`, each split `k` tests the non-swapped pair `(a && b)` and the swapped pair `(c && d)`. Note that storing `boolean a = solve(...); boolean b = solve(...);` evaluates both recursive calls before `if (a && b)`, but because every `(i, j, len)` state is memoized in `dp`, each distinct state is computed only once.

---

## Dry Run

Tracing Example 1 with `s1 = "great"`, `s2 = "rgeat"` (`n = 5`), starting at `solve(s1, s2, 0, 0, 5, dp)`:

1. `"great".equals("rgeat")` is `false`. Try splits `k = 1, 2, ...`:
2. At **`k = 2`** (non-swapped branch):
   - `a = solve(s1, s2, 0, 0, 2, dp)` compares `"gr"` vs `"rg"`:
     - `"gr".equals("rg")` is `false`.
     - Split `k = 1`:
       - Non-swapped: `"g"` vs `"r"` (`false`) and `"r"` vs `"g"` (`false`).
       - **Swapped (`c && d`):** `c = solve(0, 1, 1)` (`"g"` vs `"g"` -> `true`) and `d = solve(1, 0, 1)` (`"r"` vs `"r"` -> `true`) -> `dp[0][0][2] = 1`, `a = true`!
   - `b = solve(s1, s2, 2, 2, 3, dp)` compares `"eat"` vs `"eat"`:
     - `s1.substring(2, 5).equals(s2.substring(2, 5))` is immediately `true` -> `dp[2][2][3] = 1`, `b = true`!
3. Since `a && b` is `true`, `dp[0][0][5] = 1` and `solve` returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^4)` — There are `O(n^3)` distinct `(i, j, len)` states in `dp`, and computing each state performs an `O(len)` substring comparison plus up to `len - 1` split transitions of `O(1)` amortized lookup cost (`O(n)` work per state).
- **Space Complexity:** `O(n^3)` — The 3D array `dp[n][n][n + 1]` stores `O(n^3)` integers, alongside `O(n)` maximum recursion depth and temporary substring slices.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [87scramble-string.java](./87scramble-string.java) |

---

## Key Learnings

- 3D interval DP `(i, j, len)` is a natural representation whenever two equal-length substrings from two strings are recursively partitioned and matched.
- Using a tri-state `int` array (`0` unvisited, `1` true, `-1` false) avoids allocating `Boolean` wrapper objects in Java.
- Short-circuiting recursive calls (`if (solve(...) && solve(...))`) and pruning states whose 26-letter character counts differ can further speed up constant factors in practice.
