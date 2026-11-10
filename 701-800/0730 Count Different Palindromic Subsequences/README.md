---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
---

# 730. Count Different Palindromic Subsequences

**[View Problem on LeetCode](https://leetcode.com/problems/count-different-palindromic-subsequences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0730` (`730`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, return *the number of different non-empty palindromic subsequences in* `s`. Since the answer may be very large, return it **modulo** `10^9 + 7`.

A subsequence of a string is obtained by deleting zero or more characters from the string.

A sequence is palindromic if it is the same reverse as forward.

Two sequences `a_1, a_2, ...` and `b_1, b_2, ...` are different if there is some `i` for which `a_i != b_i`.

---

## Examples

### Example 1

```text
Input: s = "bccb"
Output: 6
Explanation: The 6 different non-empty palindromic subsequences are 'b', 'c', 'bb', 'cc', 'bcb', 'bccb'.
Note that 'bcb' is counted only once, even though it can occur in two ways.
```

### Example 2

```text
Input: s = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"
Output: 104860361
Explanation: There are 3104860382 different non-empty palindromic subsequences, which is 104860361 modulo 10^9 + 7.
```

---

## Constraints

- `1 <= s.length <= 1000`
- `s[i]` is either `'a'`, `'b'`, `'c'`, or `'d'`.

---

## Problem Understanding

- We must count unique palindromic subsequences.
- Duplicate subsequences (identical character strings formed from different indices) must only be counted once.
- The alphabet size is strictly bounded: $\Sigma = \{'a', 'b', 'c', 'd'\}$.

---

## Approach

### Optimized Approach (3D Interval Dynamic Programming)

1. Let $dp[i][j][k]$ be the number of distinct palindromic subsequences in substring $s[i \dots j]$ that start and end with character $c_k$ (where $k \in \{0, 1, 2, 3\}$ for `'a', 'b', 'c', 'd'`).
2. **Base case:** For length 1 ($i == j$): $dp[i][i][s[i] - 'a'] = 1$.
3. **Transitions:** For length $l$ from $2$ to $n$:
   - For substring $s[i \dots j]$:
     - If $s[i] == c_k$ and $s[j] == c_k$:
       - Subsequences include single character "$c_k$", double character "$c_k c_k$", and wrapping any valid palindrome in $s[i+1 \dots j-1]$ with $c_k$.
       - $dp[i][j][k] = 2 + \sum_{m=0}^{3} dp[i+1][j-1][m] \pmod{10^9+7}$.
     - Else if $s[i] == c_k$: $dp[i][j][k] = dp[i][j-1][k]$.
     - Else if $s[j] == c_k$: $dp[i][j][k] = dp[i+1][j][k]$.
     - Else: $dp[i][j][k] = dp[i+1][j-1][k]$.
4. Sum $dp[0][n-1][k]$ for $k \in [0, 3]$ modulo $10^9 + 7$.

---

## Complexity Analysis

- **Time Complexity:** $O(4 \cdot N^2) = O(N^2)$ — Two nested loops for substring intervals, and constant factor 4 for the 4 character types.
- **Space Complexity:** $O(4 \cdot N^2) = O(N^2)$ — 3D DP array sized $N \times N \times 4$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [730count-different-palindromic-subsequences.java](./730count-different-palindromic-subsequences.java) |

---

## Key Learnings

- Partitioning palindrome counts by their boundary characters ($k \in \{a,b,c,d\}$) guarantees distinctness and eliminates duplicate overcounting.
