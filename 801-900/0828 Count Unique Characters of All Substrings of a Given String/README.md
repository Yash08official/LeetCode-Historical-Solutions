---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Dynamic Programming
---

# 828. Count Unique Characters of All Substrings of a Given String

**[View Problem on LeetCode](https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0828` (`828`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Let `countUniqueChars(t)` be the number of unique characters in string `t`.
- For example, if `t = "LEETCODE"`, then `"L"`, `"T"`, `"C"`, `"O"`, `"D"` are the unique characters, so `countUniqueChars(t) = 5`.

Given a string `s`, return the sum of `countUniqueChars(t)` where `t` is every contiguous substring of `s`.

---

## Problem Understanding

- Instead of iterating over all $O(N^2)$ substrings and counting unique characters, calculate the **contribution of each character position** across all possible substrings.
- A character at index $i$ contributes $+1$ to a substring $s[L \dots R]$ if and only if $s[i]$ is the **sole occurrence** of that character in $s[L \dots R]$.
- If the previous occurrence of this character is at index $prev$ and the next occurrence is at index $next$:
  - $L$ can be chosen from any index in $(prev, i]$: total of $(i - prev)$ choices.
  - $R$ can be chosen from any index in $[i, next)$: total of $(next - i)$ choices.
- Total substrings where $s[i]$ is unique is $(i - prev) 	imes (next - i)$.

---

## Approach

### Contribution Technique (Index Tracking)

1. Create a list of indices for each of the 26 uppercase English letters.
2. Initialize each letter's list with sentinel value `-1` to represent the left boundary.
3. Record each character's 0-based index in `s`.
4. Append sentinel value `s.length()` to represent the right boundary.
5. For every occurrence index $v[i]$:
   - Contribution is $(v[i] - v[i - 1]) 	imes (v[i + 1] - v[i])$.
   - Accumulate this contribution into `ans`.
6. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass to record indices, followed by iterating through each character occurrence.
- **Space Complexity:** $O(N)$ to store character indices in 26 lists.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [828count-unique-characters-of-all-substrings-of-a-given-string.java](./828count-unique-characters-of-all-substrings-of-a-given-string.java) |

---

## Key Learnings

- Summing contributions over all substrings converts an $O(N^2)$ or $O(N^3)$ substring enumeration into an optimal $O(N)$ element-wise multiplication.
- Sentinel boundary markers (`-1` and `length`) eliminate edge cases for first and last occurrences.
