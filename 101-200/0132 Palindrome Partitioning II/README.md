---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
---

# 132. Palindrome Partitioning II

**[View Problem on LeetCode](https://leetcode.com/problems/palindrome-partitioning-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0132` (`132`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given a lowercase string `s`, partition `s` into contiguous substrings such that **every** substring in the partition is a palindrome, and return the **minimum number of cuts** required to achieve such a partitioning.

---

## Examples

### Example 1

```text
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
```

### Example 2

```text
Input: s = "a"
Output: 0
```

### Example 3

```text
Input: s = "ab"
Output: 1
```

---

## Constraints

- `1 <= s.length <= 2000`

- `s` consists of lowercase English letters only.

---

## Problem Understanding

- Partitioning a string into `k` substrings uses `k - 1` cuts; if the entire string `s` is already a palindrome, **`0` cuts** are needed.
- Worst case: cutting between every adjacent character produces `n` single-character palindromes using `n - 1` cuts.
- If we compute `f[i]` (minimum cuts for prefix `s[0..i]`) by trying every valid final palindrome `s[j..i]` (`0 <= j <= i`), checking whether `s[j..i]` is a palindrome naively inside the loop would add an `O(n)` factor (`O(n^3)` total). Precomputing a 2D palindrome table `g[j][i]` first keeps the total runtime `O(n^2)`!

---

## Approach

### Brute Force Approach

Backtracking over all `2^(n - 1)` cut subsets (like Palindrome Partitioning I) or running `O(n)` palindrome verification inside `O(n^2)` DP transitions takes `O(2^n)` or `O(n^3)` time — too slow for `n <= 2000`.

### Optimized Approach

Use two-stage **Dynamic Programming**: first precompute all palindromic substrings in a 2D boolean table `g[n][n]` in `O(n^2)` time, then compute the minimum-cut 1D DP array `f[n]` in `O(n^2)` time.

### Step-by-Step Thinking Process

1. Precompute `boolean[][] g = new boolean[n][n]` where `g[i][j]` indicates whether `s[i..j]` is a palindrome.
2. Fill `g` initially with `true` (so single characters `g[i][i]` and empty intervals `g[i + 1][i]` for 2-character substrings are `true`), then loop `i` from `n - 1` down to `0` and `j` from `i + 1` to `n - 1` setting `g[i][j] = (s.charAt(i) == s.charAt(j)) && g[i + 1][j - 1]`.
3. Allocate `int[] f = new int[n]` where `f[i]` is the minimum cuts for `s[0..i]`, initialized to the worst case `f[i] = i`.
4. For each prefix end `i` from `1` to `n - 1`, try every last-piece start `j` from `0` to `i`: if `g[j][i]` is `true`, then `s[0..i]` needs `0` cuts if `j == 0`, or `1 + f[j - 1]` cuts if `j > 0`.
5. Return `f[n - 1]`.

### Algorithm / Intuition

In `minCut(String s)`:
1. **Why `i` loops backward (`n - 1` down to `0`) when building `g`:** `g[i][j]` depends on `g[i + 1][j - 1]` (a larger row index `i + 1` and smaller column index `j - 1`). Iterating `i` downward and `j` upward guarantees `g[i + 1][j - 1]` is already finalized! Moreover, pre-filling `g` with `true` means when `j == i + 1` (length 2), `g[i + 1][i]` is `true`, so `g[i][i + 1]` simplifies to `s.charAt(i) == s.charAt(i + 1)` with zero length-based `if` branches.
2. **Minimum Cut Transition:** When `g[j][i]` is `true`, `s[j..i]` forms one palindromic block at the end of `s[0..i]`:
   - If `j == 0`, the whole prefix `s[0..i]` is a single palindrome -> **`0` cuts**.
   - If `j > 0`, we place `1` cut right before index `j` and optimally partition `s[0..j - 1]` -> **`1 + f[j - 1]` cuts**.

---

## Dry Run

Tracing Example 1 with `s = "aab"` (`n = 3`):

1. **Palindrome Table `g` (`s = "aab"`):**
   - `i = 2`: inner loop `j = 3` doesn't run -> `g[2][2] = true` (`"b"`).
   - `i = 1`: `j = 2`: `s[1]('a') == s[2]('b')` is `false` -> `g[1][2] = false` (`"ab"`).
   - `i = 0`:
     - `j = 1`: `s[0]('a') == s[1]('a') && g[1][0](true)` -> `g[0][1] = true` (`"aa"`).
     - `j = 2`: `s[0]('a') == s[2]('b')` is `false` -> `g[0][2] = false` (`"aab"`).
2. **Min-Cut Array `f` (init `f = [0, 1, 2]`):**
   - **`i = 1` (`"aa"`):**
     - `j = 0`: `g[0][1]` is `true` -> `j == 0`, so `f[1] = min(1, 0) = 0`.
     - `j = 1`: `g[1][1]` is `true` -> `f[1] = min(0, 1 + f[0]) = min(0, 1) = 0`.
   - **`i = 2` (`"aab"`):**
     - `j = 0`: `g[0][2]` is `false`.
     - `j = 1`: `g[1][2]` is `false`.
     - `j = 2`: `g[2][2]` is `true` -> `j > 0`, so `f[2] = min(2, 1 + f[1]) = min(2, 1 + 0) = 1`.

Returns `f[2] = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Precomputing `g` visits `n(n - 1) / 2` pairs in `O(1)` each, and computing `f` visits `n(n + 1) / 2` pairs in `O(1)` each.
- **Space Complexity:** `O(n^2)` — Dominated by the `n x n` boolean palindrome matrix `g` (plus `O(n)` for `f`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [132palindrome-partitioning-ii.java](./132palindrome-partitioning-ii.java) |

---

## Key Learnings

- Pre-initializing `boolean[][] g` to `true` lets the single recurrence `g[i][j] = (s[i] == s[j]) && g[i + 1][j - 1]` handle length-1, length-2, and general substrings uniformly.
- Always check loop iteration direction in interval DP: because `g[i][j]` reads `i + 1` and `j - 1`, `i` must decrease while `j` increases (or iterate by increasing substring length).
- Note: you can also reduce space to `O(n)` by expanding odd/even palindrome centers `(l, r)` directly and updating `f[r] = min(f[r], l == 0 ? 0 : f[l - 1] + 1)` on the fly without storing `g`.
