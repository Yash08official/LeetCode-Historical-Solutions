---
comments: true
difficulty: Easy
tags:
  - String
---

# 2124. Check if All A's Appears Before All B's

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2124` (`2124`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting of **only** the characters `'a'` and `'b'`, return `true` *if **every** *`'a'` *appears before **every** *`'b'`* in the string*. Otherwise, return `false`.

---

## Examples

### Example 1

```text
**Input:** s = "aaabbb"
**Output:** true
**Explanation:**
The 'a's are at indices 0, 1, and 2, while the 'b's are at indices 3, 4, and 5.
Hence, every 'a' appears before every 'b' and we return true.
```

### Example 2

```text
**Input:** s = "abab"
**Output:** false
**Explanation:**
There is an 'a' at index 2 and a 'b' at index 1.
Hence, not every 'a' appears before every 'b' and we return false.
```

### Example 3

```text
**Input:** s = "bbb"
**Output:** true
**Explanation:**
There are no 'a's, hence, every 'a' appears before every 'b' and we return true.
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 100`
	
- `s[i]` is either `'a'` or `'b'`.

---

## Problem Understanding

- Given a string `s` consisting only of `'a'` and `'b'`, return `true` if every `'a'` appears before every `'b'`.

---

## Approach

### Optimized Approach (Forbidden Substring Check)
1. Every `'a'` appears before every `'b'` if and only if `'b'` is never followed immediately by `'a'`.
2. Check `!s.contains("ba")`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2124check-if-all-as-appears-before-all-bs.java](./2124check-if-all-as-appears-before-all-bs.java) |

---

## Key Learnings

- Reducing a global ordering property over a binary alphabet to the absence of the adjacent inversion `"ba"` yields a one-line optimal solution.
