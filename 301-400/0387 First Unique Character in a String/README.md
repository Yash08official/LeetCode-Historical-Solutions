---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
  - Queue
  - Counting
---

# 387. First Unique Character in a String

**[View Problem on LeetCode](https://leetcode.com/problems/first-unique-character-in-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0387` (`387`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String`, `Queue`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, find the **first** non-repeating character in it and return its index. If it **does not** exist, return `-1`.

---

## Examples

### Example 1

**Input:** s = "leetcode"

**Output:** 0

**Explanation:**

The character `'l'` at index 0 is the first character that does not occur at any other index.

### Example 2

**Input:** s = "loveleetcode"

**Output:** 2

### Example 3

**Input:** s = "aabb"

**Output:** -1

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^5`
	
- `s` consists of only lowercase English letters.

---

## Problem Understanding

- Return the index of the first non-repeating character in `s`, or `-1` if none exists.

---

## Approach

### Optimized Approach (Two-Pass 26-Letter Frequency Count)
1. Pass 1: Count occurrences of each lowercase letter in `int[26] cnt`.
2. Pass 2: Return the first index `i` with `cnt[s.charAt(i) - 'a'] == 1`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [387first-unique-character-in-a-string.java](./387first-unique-character-in-a-string.java) |

---

## Key Learnings

- Two linear passes with a 26-int array beat hash maps in both speed and memory.
