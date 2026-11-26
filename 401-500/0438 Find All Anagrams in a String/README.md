---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 438. Find All Anagrams in a String

**[View Problem on LeetCode](https://leetcode.com/problems/find-all-anagrams-in-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0438` (`438`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in **any order**.

---

## Examples

### Example 1

```
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
```

### Example 2

```
Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
```

 

**

---

## Constraints

**

	- `1 <= s.length, p.length <= 3 * 10^4`

	- `s` and `p` consist of lowercase English letters.

---

## Problem Understanding

- Return all starting indices of substrings in `s` that are anagrams of `p` (both lowercase English letters).

---

## Approach

### Optimized Approach (Fixed-Size Sliding Window with 26-Char Frequency Arrays)
1. Count character frequencies of `p` in `cnt1[26]`.
2. Pre-populate `cnt2[26]` with the first `n - 1` characters of `s` (where `n = p.length()`).
3. Slide the right pointer `i` from `n - 1` to `m - 1`: add `s[i]` to `cnt2`, compare `Arrays.equals(cnt1, cnt2)` in $O(26)$ to record `i - n + 1` on a match, then remove the outgoing character `s[i - n + 1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(26 \cdot m) = O(m)$ where $m = \text{s.length()}$.
- **Space Complexity:** $O(1)$ auxiliary space (two fixed 26-element arrays).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [438find-all-anagrams-in-a-string.java](./438find-all-anagrams-in-a-string.java) |

---

## Key Learnings

- Fixed-length anagram detection over a bounded alphabet reduces cleanly to an $O(1)$-space sliding window with constant-time frequency-array comparison.
