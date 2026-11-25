---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - String
---

# 500. Keyboard Row

**[View Problem on LeetCode](https://leetcode.com/problems/keyboard-row/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0500` (`500`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of strings `words`, return *the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below*.

**Note** that the strings are **case-insensitive**, both lowercased and uppercased of the same letter are treated as if they are at the same row.

In the **American keyboard**:

	
- the first row consists of the characters `"qwertyuiop"`,
	
- the second row consists of the characters `"asdfghjkl"`, and
	
- the third row consists of the characters `"zxcvbnm"`.

---

## Examples

### Example 1

**Input:** words = ["Hello","Alaska","Dad","Peace"]

**Output:** ["Alaska","Dad"]

**Explanation:**

Both `"a"` and `"A"` are in the 2nd row of the American keyboard due to case insensitivity.

### Example 2

**Input:** words = ["omk"]

**Output:** []

### Example 3

**Input:** words = ["adsdf","sfd"]

**Output:** ["adsdf","sfd"]

 

**

---

## Constraints

**

	
- `1 <= words.length <= 20`
	
- `1 <= words[i].length <= 100`
	
- `words[i]` consists of English letters (both lowercase and uppercase).

---

## Problem Understanding

- Return all words from `words` that can be typed using letters of only one row of an American QWERTY keyboard.

---

## Approach

### Optimized Approach (26-Char Row-Lookup Table)
1. Encode each letter `'a'..'z'` to its keyboard row `'0'`, `'1'`, or `'2'` in constant string `s = "12210111011122000010020202"`.
2. For each word, verify every lowercase character maps to the same row as the first character.

---

## Complexity Analysis

- **Time Complexity:** $O(L)$ total characters across all words.\n- **Space Complexity:** $O(1)$ auxiliary.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [500keyboard-row.java](./500keyboard-row.java) |

---

## Key Learnings

- Pre-encoding a static 26-character lookup string replaces hash sets with $O(1)$ direct indexing.
