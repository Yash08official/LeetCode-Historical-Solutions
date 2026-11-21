---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
---

# 290. Word Pattern

**[View Problem on LeetCode](https://leetcode.com/problems/word-pattern/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0290` (`290`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a `pattern` and a string `s`, find if `s` follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`. Specifically:

	
- Each letter in `pattern` maps to **exactly** one unique word in `s`.
	
- Each unique word in `s` maps to **exactly** one letter in `pattern`.
	
- No two letters map to the same word, and no two words map to the same letter.

---

## Examples

### Example 1

**Input:** pattern = "abba", s = "dog cat cat dog"

**Output:** true

**Explanation:**

The bijection can be established as:

	
- `'a'` maps to `"dog"`.
	
- `'b'` maps to `"cat"`.

### Example 2

**Input:** pattern = "abba", s = "dog cat cat fish"

**Output:** false

### Example 3

**Input:** pattern = "aaaa", s = "dog cat cat dog"

**Output:** false

 

**

---

## Constraints

**

	
- `1 <= pattern.length <= 300`
	
- `pattern` contains only lower-case English letters.
	
- `1 <= s.length <= 3000`
	
- `s` contains only lowercase English letters and spaces `' '`.
	
- `s` **does not contain** any leading or trailing spaces.
	
- All the words in `s` are separated by a **single space**.

---

## Problem Understanding

- Determine if there is a bijection between characters in `pattern` and space-separated words in `s`.

---

## Approach

### Optimized Approach (Dual HashMap Bijection Check)
1. Split `s` into `ws`; if `pattern.length() != ws.length`, return `false`.
2. Maintain `d1: char -> word` and `d2: word -> char`.
3. At each index `i`, verify `!d1.getOrDefault(a, b).equals(b)` and `d2.getOrDefault(b, a) != a` are both false; otherwise return `false`.
4. Insert `(a, b)` into `d1` and `(b, a)` into `d2`.

---

## Complexity Analysis

- **Time Complexity:** $O(n + m)$ where $m$ is length of `s`.
- **Space Complexity:** $O(k)$ for unique words and pattern characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [290word-pattern.java](./290word-pattern.java) |

---

## Key Learnings

- Enforcing both forward (`char -> word`) and reverse (`word -> char`) mappings guarantees a strict one-to-one bijection.
