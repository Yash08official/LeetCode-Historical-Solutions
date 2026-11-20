---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
  - Sorting
---

# 242. Valid Anagram

**[View Problem on LeetCode](https://leetcode.com/problems/valid-anagram/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0242` (`242`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

---

## Examples

### Example 1

**Input:** s = "anagram", t = "nagaram"

**Output:** true

### Example 2

**Input:** s = "rat", t = "car"

**Output:** false

 

**

---

## Constraints

**

	
- `1 <= s.length, t.length <= 5 * 10^4`
	
- `s` and `t` consist of lowercase English letters.

 

**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

---

## Problem Understanding

- Return `true` if string `t` is an anagram of string `s` (same character frequencies).

---

## Approach

### Optimized Approach (Single 26-Letter Frequency Balance Array)
1. If lengths differ, immediately return `false`.
2. Use `int[26] cnt`: increment for each character in `s` and decrement for each character in `t`.
3. Verify all 26 counts equal `0`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass over both strings.\n- **Space Complexity:** $O(1)$ — Fixed 26-element array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [242valid-anagram.java](./242valid-anagram.java) |

---

## Key Learnings

- Incrementing for `s` and decrementing for `t` in a single frequency array checks multiset equality cleanly.
