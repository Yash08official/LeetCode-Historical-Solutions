---
comments: true
difficulty: Easy
tags:
  - String
  - String Matching
  - Z Algorithm
  - Knuth–Morris–Pratt Algorithm
---

# 459. Repeated Substring Pattern

**[View Problem on LeetCode](https://leetcode.com/problems/repeated-substring-pattern/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0459` (`459`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `String Matching`, `Z Algorithm`, `Knuth–Morris–Pratt Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

---

## Examples

### Example 1

```text
**Input:** s = "abab"
**Output:** true
**Explanation:** It is the substring "ab" twice.
```

### Example 2

```text
**Input:** s = "aba"
**Output:** false
```

### Example 3

```text
**Input:** s = "abcabcabcabc"
**Output:** true
**Explanation:** It is the substring "abc" four times or the substring "abcabc" twice.
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^4`
	
- `s` consists of lowercase English letters.

---

## Problem Understanding

- Determine if string `s` can be constructed by repeating a proper substring multiple times.

---

## Approach

### Optimized Approach (Doubled-String Rotation Containment)
1. Form `str = s + s` and trim the first and last character (`str.substring(1, str.length() - 1)`).
2. `s` is periodic iff `s` appears as a non-trivial rotation inside `str.substring(1, 2n - 1)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ (with linear substring search; $O(n^2)$ worst-case in `String.contains`).\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [459repeated-substring-pattern.java](./459repeated-substring-pattern.java) |

---

## Key Learnings

- A string is a non-trivial repetition iff it equals one of its own non-zero cyclic shifts, which occurs iff it lies inside `(s + s)[1..2n-2]`.
