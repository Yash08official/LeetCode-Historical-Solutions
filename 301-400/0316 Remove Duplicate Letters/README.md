---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Greedy
  - Monotonic Stack
---

# 316. Remove Duplicate Letters

**[View Problem on LeetCode](https://leetcode.com/problems/remove-duplicate-letters/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0316` (`316`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Greedy`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, remove duplicate letters so that every letter appears once and only once. The relative order of the letters that were not removed must be preserved. You must make sure your result is **the smallest in lexicographical order** among all possible results.

---

## Examples

### Example 1

```text
**Input:** s = "bcabc"
**Output:** "abc"
```

### Example 2

```text
**Input:** s = "cbacdcbc"
**Output:** "acdb"
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^4`
	
- `s` consists of lowercase English letters.

 

**Note:** This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/

---

## Problem Understanding

- Remove duplicate letters from `s` so every distinct letter appears once and the resulting string is lexicographically smallest.

---

## Approach

### Optimized Approach (Monotonic Stack + Last-Occurrence Table + Bitmask)
1. Record the last index `last[c]` of each character.
2. Iterate through `s`: skip `c` if already in stack (checked via bitmask `mask`).
3. While stack top is lexicographically greater than `c` and appears again later (`last[top] > i`), pop it and clear its bit in `mask`.
4. Push `c`, set its bit, and reverse the stack at the end.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each character is pushed and popped at most once.\n- **Space Complexity:** $O(1)$ — Stack and bitmask hold at most 26 letters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [316remove-duplicate-letters.java](./316remove-duplicate-letters.java) |

---

## Key Learnings

- Combining a monotonic stack with a last-occurrence check greedily minimizes lexicographical order while preserving completeness.
