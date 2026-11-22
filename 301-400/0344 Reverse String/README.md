---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
---

# 344. Reverse String

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0344` (`344`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Write a function that reverses a string. The input string is given as an array of characters `s`.

You must do this by modifying the input array in-place with `O(1)` extra memory.

---

## Examples

### Example 1

```text
**Input:** s = ["h","e","l","l","o"]
**Output:** ["o","l","l","e","h"]
```

### Example 2

```text
**Input:** s = ["H","a","n","n","a","h"]
**Output:** ["h","a","n","n","a","H"]
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^5`
	
- `s[i]` is a printable ascii character.

---

## Problem Understanding

- Reverse character array `s` in-place using $O(1)$ extra memory.

---

## Approach

### Optimized Approach (Converging Two Pointers)
1. Place pointers `i = 0` and `j = s.length - 1`.
2. Swap `s[i]` and `s[j]` while `i < j`, advancing `++i` and `--j`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [344reverse-string.java](./344reverse-string.java) |

---

## Key Learnings

- Two-pointer symmetric swapping reverses an array in-place in $n/2$ swaps.
