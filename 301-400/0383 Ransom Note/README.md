---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
  - Counting
---

# 383. Ransom Note

**[View Problem on LeetCode](https://leetcode.com/problems/ransom-note/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0383` (`383`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `ransomNote` and `magazine`, return `true`* if *`ransomNote`* can be constructed by using the letters from *`magazine`* and *`false`* otherwise*.

Each letter in `magazine` can only be used once in `ransomNote`.

---

## Examples

### Example 1

```text
**Input:** ransomNote = "a", magazine = "b"
**Output:** false
```

### Example 2

```text
**Input:** ransomNote = "aa", magazine = "ab"
**Output:** false
```

### Example 3

```text
**Input:** ransomNote = "aa", magazine = "aab"
**Output:** true
```

 

**

---

## Constraints

**

	
- `1 <= ransomNote.length, magazine.length <= 10^5`
	
- `ransomNote` and `magazine` consist of lowercase English letters.

---

## Problem Understanding

- Return `true` if `ransomNote` can be constructed using characters from `magazine` (each letter used at most once).

---

## Approach

### Optimized Approach (26-Letter Frequency Array)
1. Count letter frequencies in `magazine`.
2. Decrement for each character in `ransomNote`; return `false` immediately if any count drops below `0`.

---

## Complexity Analysis

- **Time Complexity:** $O(m + n)$.\n- **Space Complexity:** $O(1)$ (fixed 26-int array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [383ransom-note.java](./383ransom-note.java) |

---

## Key Learnings

- Checking `--cnt[c] < 0` exits early as soon as a letter shortage is detected.
