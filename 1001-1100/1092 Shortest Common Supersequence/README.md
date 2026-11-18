---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
  - Longest Common Subsequence
---

# 1092. Shortest Common Supersequence

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-common-supersequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1092` (`1092`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Longest Common Subsequence` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `str1` and `str2`, return *the shortest string that has both *`str1`* and *`str2`* as **subsequences***. If there are multiple valid strings, return **any** of them.

A string `s` is a **subsequence** of string `t` if deleting some number of characters from `t` (possibly `0`) results in the string `s`.

---

## Examples

### Example 1

```text
**Input:** str1 = "abac", str2 = "cab"
**Output:** "cabac"
**Explanation:** 
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.
```

### Example 2

```text
**Input:** str1 = "aaaaaaaa", str2 = "aaaaaaaa"
**Output:** "aaaaaaaa"
```

 

**

---

## Constraints

**

	
- `1 <= str1.length, str2.length <= 1000`
	
- `str1` and `str2` consist of lowercase English letters.

---

## Problem Understanding

- Given two strings `str1` and `str2`, return the shortest string that has both `str1` and `str2` as subsequences.

---

## Approach

### Optimized Approach (LCS DP Table + Backtracking Reconstruction)

1. Compute the Longest Common Subsequence (LCS) DP table `f[m+1][n+1]` where `f[i][j]` is LCS length of prefixes `str1[0..i-1]` and `str2[0..j-1]`.
2. Backtrack from `(m, n)` to `(0, 0)`:
   - If `i == 0`, append remaining `str2` characters.
   - If `j == 0`, append remaining `str1` characters.
   - If `f[i][j] == f[i-1][j]`, character `str1[i-1]` is not in LCS; append it and decrement `i`.
   - Else if `f[i][j] == f[i][j-1]`, character `str2[j-1]` is not in LCS; append it and decrement `j`.
   - Else, characters match (`str1[i-1] == str2[j-1]`); append once and decrement both `i` and `j`.
3. Reverse `ans` and return.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$ — To fill DP table and linear time to backtrack.
- **Space Complexity:** $O(m \cdot n)$ — For DP table storage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1092shortest-common-supersequence.java](./1092shortest-common-supersequence.java) |

---

## Key Learnings

- Shortest Common Supersequence is dual to Longest Common Subsequence: characters belonging to LCS appear once, while non-LCS characters from both strings are interleaved in relative order.
