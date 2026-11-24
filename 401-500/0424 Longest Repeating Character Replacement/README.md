---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 424. Longest Repeating Character Replacement

**[View Problem on LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0424` (`424`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.

---

## Examples

### Example 1

```text
**Input:** s = "ABAB", k = 2
**Output:** 4
**Explanation:** Replace the two 'A's with two 'B's or vice versa.
```

### Example 2

```text
**Input:** s = "AABABBA", k = 1
**Output:** 4
**Explanation:** Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^5`
	
- `s` consists of only uppercase English letters.
	
- `0 <= k <= s.length`

---

## Problem Understanding

- Return the length of the longest substring that can be turned into all identical uppercase letters using at most `k` character replacements.

---

## Approach

### Optimized Approach (Non-Shrinking Sliding Window)
1. Expand right pointer `r`, updating letter count `cnt` and historical max frequency `mx`.
2. If window replacements needed `r - l + 1 - mx > k`, slide left pointer `l` forward by 1 (preserving the largest valid window width seen so far).
3. Return final window size `n - l`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$ (26-int array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [424longest-repeating-character-replacement.java](./424longest-repeating-character-replacement.java) |

---

## Key Learnings

- Because we only care about maximum length, we never need to shrink the window or recompute `mx` when sliding `l`.
