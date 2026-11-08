---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
  - Dynamic Programming
  - Enumeration
---

# 3503. Longest Palindrome After Substring Concatenation I

**[View Problem on LeetCode](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3503` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String`, `Dynamic Programming`, `Enumeration` |
| **Solution Language** | Java |

---

## Problem Description

You are given two strings, `s` and `t`.

You can create a new string by selecting a substring from `s` (possibly empty) and a substring from `t` (possibly empty), then concatenating them in order.

Return the length of the **longest palindrome** that can be formed this way.

---

## Examples

### Example 1

```text
Input: s = "a", t = "a"
Output: 2
Explanation: We can select "a" from s and "a" from t, concatenating them gives "aa", which is a palindrome of length 2.
```

### Example 2

```text
Input: s = "abc", t = "def"
Output: 1
```

---

## Constraints

- `1 <= s.length, t.length <= 1000`
- `s` and `t` consist only of lowercase English letters.

---

## Problem Understanding

- A palindrome formed by concatenating substring $s_{sub}$ from $s$ and $t_{sub}$ from $t$ consists of:
  - An outer matching part where suffix of $s_{sub}$ mirrors prefix of $t_{sub}$ (i.e. $s[i] == rev(t)[j]$).
  - An optional inner palindrome centered entirely in $s$ or entirely in $t$.
- We can precompute the longest palindromic substring starting at each index in $s$ and $t$ using center expansion.
- Then, compute the Longest Common Substring between $s$ and reversed $t$ via dynamic programming.

---

## Approach

### Optimized Approach (Palindromic Centers + Reversed String DP)

1. Let $revT = 	ext{reverse}(T)$.
2. Precompute `g1[i]` (longest palindrome starting at $s[i]$) and `g2[j]` (longest palindrome starting at $revT[j]$) using center-expansion.
3. Define DP array `f[m + 1][n + 1]`, where `f[i][j]` is the longest common suffix of $s[0..i-1]$ and $revT[0..j-1]$.
4. When $s[i - 1] == revT[j - 1]$:
   - `f[i][j] = f[i - 1][j - 1] + 1`.
   - Update maximum answer with `f[i][j] * 2 + g1[i]` and `f[i][j] * 2 + g2[j]`.
5. Return the maximum palindrome length found.

---

## Complexity Analysis

- **Time Complexity:** $O(m^2 + n^2 + m \cdot n)$ — $O(m^2)$ and $O(n^2)$ for precomputing longest palindromic substrings, and $O(m \cdot n)$ for 2D DP.
- **Space Complexity:** $O(m \cdot n)$ — For the 2D DP matrix.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3503longest-palindrome-after-substring-concatenation-i.java](./3503longest-palindrome-after-substring-concatenation-i.java) |

---

## Key Learnings

- Decomposing composite palindromes into an outer reversed matching pair plus an internal single-string palindrome decouples cross-string matching from single-string symmetry.
