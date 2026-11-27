---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
---

# 516. Longest Palindromic Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/longest-palindromic-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0516` (`516`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, find *the longest palindromic **subsequence**'s length in* `s`.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

---

## Examples

### Example 1

```
Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
```

### Example 2

```
Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".
```

 

**

---

## Constraints

**

	- `1 <= s.length <= 1000`

	- `s` consists only of lowercase English letters.

---

## Problem Understanding

- Find the length of the longest palindromic subsequence (not necessarily contiguous) in string `s`.

---

## Approach

### Optimized Approach (Bottom-Up Interval Dynamic Programming)
1. Let `f[i][j]` be the longest palindromic subsequence length within substring `s[i..j]`.
2. Base case: `f[i][i] = 1` for all single characters.
3. Iterate `i` backwards from `n - 1` down to `0` and `j` forwards from `i + 1` to `n - 1`:
   - If `s[i] == s[j]`, both endpoints match: `f[i][j] = f[i + 1][j - 1] + 2` (note `f[i + 1][j - 1] == 0` automatically when `j == i + 1`).
   - Otherwise, drop either endpoint: `f[i][j] = Math.max(f[i + 1][j], f[i][j - 1])`.
4. Return `f[0][n - 1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ where $n = \text{s.length()}$.
- **Space Complexity:** $O(n^2)$ for the DP table `f`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [516longest-palindromic-subsequence.java](./516longest-palindromic-subsequence.java) |

---

## Key Learnings

- Iterating `i` descending and `j` ascending ensures subproblems `f[i + 1][j - 1]`, `f[i + 1][j]`, and `f[i][j - 1]` are always resolved before `f[i][j]`.
