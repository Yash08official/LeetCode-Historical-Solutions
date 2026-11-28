---
comments: true
difficulty: Easy
tags:
  - String
---

# 521. Longest Uncommon Subsequence I

**[View Problem on LeetCode](https://leetcode.com/problems/longest-uncommon-subsequence-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0521` (`521`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `a` and `b`, return *the length of the **longest uncommon subsequence** between *`a` *and* `b`. *If no such uncommon subsequence exists, return* `-1`*.*

An **uncommon subsequence** between two strings is a string that is a **subsequence of exactly one of them**.

---

## Examples

### Example 1

```
Input: a = "aba", b = "cdc"
Output: 3
Explanation: One longest uncommon subsequence is "aba" because "aba" is a subsequence of "aba" but not "cdc".
Note that "cdc" is also a longest uncommon subsequence.
```

### Example 2

```
Input: a = "aaa", b = "bbb"
Output: 3
Explanation: The longest uncommon subsequences are "aaa" and "bbb".
```

### Example 3

```
Input: a = "aaa", b = "aaa"
Output: -1
Explanation: Every subsequence of string a is also a subsequence of string b. Similarly, every subsequence of string b is also a subsequence of string a. So the answer would be -1.
```

 

**

---

## Constraints

**

	- `1 <= a.length, b.length <= 100`

	- `a` and `b` consist of lower-case English letters.

---

## Problem Understanding

- Find the length of the longest uncommon subsequence between two strings `a` and `b`, defined as a string that is a subsequence of one but not the other.

---

## Approach

### Optimized Approach (Equality Check & Maximum Length)
1. If `a.equals(b)`, every subsequence of `a` is also a subsequence of `b`, so no uncommon subsequence exists; return `-1`.
2. If `a != b`, the longer string itself cannot be a subsequence of the shorter string (and if equal in length, cannot be a subsequence of a different string).
3. Therefore, the longest uncommon subsequence is simply the longer string itself; return `Math.max(a.length(), b.length())`.

---

## Complexity Analysis

- **Time Complexity:** $O(\min(|a|, |b|))$ for string equality comparison.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [521longest-uncommon-subsequence-i.java](./521longest-uncommon-subsequence-i.java) |

---

## Key Learnings

- Recognizing that a string cannot be a subsequence of another strictly shorter or distinct same-length string simplifies the problem to a direct length check.
