---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 4106. Find Mismatched Segments Between Two Strings

**[View Problem on LeetCode](https://leetcode.com/problems/find-mismatched-segments-between-two-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4106` |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | Java |

---

## Problem Description

You are given two strings `s1` and `s2` of the same length `n`.

Find all maximal contiguous substrings where `s1` and `s2` differ, and return them as pairs of mismatched segments.

---

## Problem Understanding

- Compare characters at identical indices $i$.
- When a mismatch occurs ($s_1[i] 
eq s_2[i]$), expand index $j$ until the characters match again or the end of the string is reached.
- Record the slice $[s_1[i \dots j), s_2[i \dots j)]$ and continue scanning from $i = j$.

---

## Approach

### Two-Pointer Linear Scan

1. Initialize pointer $i = 0$.
2. While $i < n$:
   - If $s_1[i] == s_2[i]$, increment $i$ and continue.
   - Expand $j = i + 1$ while $j < n$ and $s_1[j] 
eq s_2[j]$.
   - Add pair `[s1.substring(i, j), s2.substring(i, j)]` to `ans`.
   - Set $i = j$.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Linear scan visiting each index at most once.
- **Space Complexity:** $O(N)$ for the returned segments.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4106find-mismatched-segments-between-two-strings.java](./4106find-mismatched-segments-between-two-strings.java) |

---

## Key Learnings

- Two-pointer grouping extracts maximal non-matching blocks in a single pass.
