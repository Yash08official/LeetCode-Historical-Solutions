---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Divide and Conquer
  - Sliding Window
---

# 395. Longest Substring with At Least K Repeating Characters

**[View Problem on LeetCode](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0395` (`395`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Divide and Conquer`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` and an integer `k`, return *the length of the longest substring of* `s` *such that the frequency of each character in this substring is greater than or equal to* `k`.

if no such substring exists, return 0.

---

## Examples

### Example 1

```text
**Input:** s = "aaabb", k = 3
**Output:** 3
**Explanation:** The longest substring is "aaa", as 'a' is repeated 3 times.
```

### Example 2

```text
**Input:** s = "ababbc", k = 2
**Output:** 5
**Explanation:** The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^4`
	
- `s` consists of only lowercase English letters.
	
- `1 <= k <= 10^5`

---

## Problem Understanding

- Find the length of the longest substring of `s` in which every appearing character occurs at least `k` times.

---

## Approach

### Optimized Approach (Divide and Conquer on Infrequent Split Character)
1. Count letter frequencies in `s[l..r]`.
2. Find any character `split` with `0 < cnt[c] < k`; no valid substring can contain `split`.
3. If none exists, the entire range `r - l + 1` is valid. Otherwise split `s[l..r]` at all occurrences of `split` and return the max over recursive subcalls.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot \Sigma)$ where $\Sigma \le 26$ (at most 26 recursion levels since each level eliminates at least one character).\n- **Space Complexity:** $O(\Sigma)$ recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [395longest-substring-with-at-least-k-repeating-characters.java](./395longest-substring-with-at-least-k-repeating-characters.java) |

---

## Key Learnings

- Eliminating at least one distinct character per recursion level bounds recursion depth to at most 26.
