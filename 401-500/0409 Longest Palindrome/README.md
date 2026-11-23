---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
  - Greedy
---

# 409. Longest Palindrome

**[View Problem on LeetCode](https://leetcode.com/problems/longest-palindrome/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0409` (`409`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` which consists of lowercase or uppercase letters, return the length of the **longest palindrome** that can be built with those letters.

Letters are **case sensitive**, for example, `"Aa"` is not considered a palindrome.

---

## Examples

### Example 1

```text
**Input:** s = "abccccdd"
**Output:** 7
**Explanation:** One longest palindrome that can be built is "dccaccd", whose length is 7.
```

### Example 2

```text
**Input:** s = "a"
**Output:** 1
**Explanation:** The longest palindrome that can be built is "a", whose length is 1.
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 2000`
	
- `s` consists of lowercase **and/or** uppercase English letters only.

---

## Problem Understanding

- Return the length of the longest palindrome that can be built using characters from `s` (case-sensitive).

---

## Approach

### Optimized Approach (Parity Toggle Array)
1. Track odd-count parity for each ASCII character in `odd[128]` and maintain live odd-character count `cnt`.
2. Every character with an even count contributes fully; among `cnt` odd-count characters, at most 1 can sit in the center, leaving `cnt - 1` unused -> `cnt > 0 ? n - cnt + 1 : n`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$ (128-int array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [409longest-palindrome.java](./409longest-palindrome.java) |

---

## Key Learnings

- Toggling parity bits with `^= 1` computes the exact number of odd-frequency characters in a single pass.
