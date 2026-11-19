---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
---

# 205. Isomorphic Strings

**[View Problem on LeetCode](https://leetcode.com/problems/isomorphic-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0205` (`205`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `s` and `t`, *determine if they are isomorphic*.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

---

## Examples

### Example 1

**Input:** s = "egg", t = "add"

**Output:** true

**Explanation:**

The strings `s` and `t` can be made identical by:

	
- Mapping `'e'` to `'a'`.
	
- Mapping `'g'` to `'d'`.

### Example 2

**Input:** s = "f11", t = "b23"

**Output:** false

**Explanation:**

The strings `s` and `t` can not be made identical as `'1'` needs to be mapped to both `'2'` and `'3'`.

### Example 3

**Input:** s = "paper", t = "title"

**Output:** true

 

**

---

## Constraints

**

	
- `1 <= s.length <= 5 * 10^4`
	
- `t.length == s.length`
	
- `s` and `t` consist of any valid ascii character.

---

## Problem Understanding

- Two strings `s` and `t` are isomorphic if characters in `s` can be bijectively (one-to-one) mapped to characters in `t` while preserving order.

---

## Approach

### Optimized Approach (Dual ASCII Last-Seen Position Arrays)
1. Maintain two integer arrays `d1[256]` and `d2[256]` initialized to `0`, storing the 1-based index (`i + 1`) where each character was last seen.
2. Iterate `i` from `0` to `n - 1` with `a = s.charAt(i)` and `b = t.charAt(i)`:
   - If `d1[a] != d2[b]`, the two characters do not share the same previous occurrence pattern (violating bijection), so return `false`.
   - Record `d1[a] = i + 1` and `d2[b] = i + 1`.
3. If the loop completes without mismatch, return `true`.

### Dry Run (`s = "egg"`, `t = "add"`)
- `i = 0`: `d1['e'] == d2['a'] == 0` -> set both to `1`.
- `i = 1`: `d1['g'] == d2['d'] == 0` -> set both to `2`.
- `i = 2`: `d1['g'] == d2['d'] == 2` -> set both to `3`.
- Returns `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass through both strings.
- **Space Complexity:** $O(1)$ — Fixed-size arrays of 256 integers for ASCII characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [205isomorphic-strings.java](./205isomorphic-strings.java) |

---

## Key Learnings

- Comparing last-seen 1-based positions across two fixed-size ASCII tables verifies a strict bijection in one pass without hash map overhead.
