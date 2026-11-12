---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - String
---

# 1002. Find Common Characters

**[View Problem on LeetCode](https://leetcode.com/problems/find-common-characters/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1002` |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string array `words`, return an array of all characters that show up in all strings within the `words` (including duplicates). You may return the answer in any order.

---

## Problem Understanding

- A character appears in all strings with multiplicity equal to its minimum frequency across all words in `words`.
- Since all characters are lowercase English letters, a fixed array of size 26 tracks frequencies.

---

## Approach

### Frequency Intersection Array

1. Maintain an array `cnt` of size 26 initialized with a large upper bound.
2. For each word in `words`:
   - Compute character frequency table `t` of size 26.
   - Update `cnt[i] = Math.min(cnt[i], t[i])` for all $0 \le i < 26$.
3. Build the result list by repeating each character `a` through `z` exactly `cnt[i]` times.
4. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \cdot L)$ where $N$ is the number of words and $L$ is the maximum word length.
- **Space Complexity:** $O(1)$ auxiliary space (fixed-size array of 26 integers).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1002find-common-characters.java](./1002find-common-characters.java) |

---

## Key Learnings

- Multiset intersection is computed by taking element-wise minimums across frequency arrays.
