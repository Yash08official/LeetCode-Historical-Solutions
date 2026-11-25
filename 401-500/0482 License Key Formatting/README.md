---
comments: true
difficulty: Easy
tags:
  - String
---

# 482. License Key Formatting

**[View Problem on LeetCode](https://leetcode.com/problems/license-key-formatting/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0482` (`482`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

You are given a license key represented as a string `s` that consists of only alphanumeric characters and dashes. The string is separated into `n + 1` groups by `n` dashes. You are also given an integer `k`.

We want to reformat the string `s` such that each group contains exactly `k` characters, except for the first group, which could be shorter than `k` but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.

Return *the reformatted license key*.

---

## Examples

### Example 1

```text
**Input:** s = "5F3Z-2e-9-w", k = 4
**Output:** "5F3Z-2E9W"
**Explanation:** The string s has been split into two parts, each part has 4 characters.
Note that the two extra dashes are not needed and can be removed.
```

### Example 2

```text
**Input:** s = "2-5g-3-J", k = 2
**Output:** "2-5G-3J"
**Explanation:** The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^5`
	
- `s` consists of English letters, digits, and dashes `'-'`.
	
- `1 <= k <= 10^4`

---

## Problem Understanding

- Reformat a license key string into uppercase groups of length `k` separated by dashes, allowing only the first group to be shorter than `k`.

---

## Approach

### Optimized Approach (Leading-Group Size Computation + Single Forward Pass)
1. Count non-dash characters modulo `k` to determine the first group's exact length `cnt` (or `k` if divisible).
2. Scan forward, skipping `'-'`, appending `Character.toUpperCase(c)`, and inserting `'-'` whenever `cnt` reaches `0` (resetting `cnt = k`). Trim any trailing `'-'`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(n)$ for `StringBuilder`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [482license-key-formatting.java](./482license-key-formatting.java) |

---

## Key Learnings

- Computing the first group's remainder upfront allows forward-order construction without needing to reverse the string.
