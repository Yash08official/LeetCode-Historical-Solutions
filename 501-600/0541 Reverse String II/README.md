---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
---

# 541. Reverse String II

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-string-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0541` (`541`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` and an integer `k`, reverse the first `k` characters for every `2k` characters counting from the start of the string.

If there are fewer than `k` characters left, reverse all of them. If there are less than `2k` but greater than or equal to `k` characters, then reverse the first `k` characters and leave the other as original.

---

## Examples

### Example 1

```
Input: s = "abcdefg", k = 2
Output: "bacdfeg"
```

### Example 2

```
Input: s = "abcd", k = 2
Output: "bacd"
```

 

**

---

## Constraints

**

	- `1 <= s.length <= 10^4`

	- `s` consists of only lowercase English letters.

	- `1 <= k <= 10^4`

---

## Problem Understanding

- Reverse the first $k$ characters for every $2k$ characters counting from the start of the string.

---

## Approach

### Optimized Approach (Two-Pointer In-Place Chunk Reversal)
1. Convert string `s` to a character array `cs`.
2. Step loop index `i` in increments of `2k`.
3. For each block, reverse the subarray from `l = i` to `r = Math.min(i + k - 1, n - 1)` using standard two-pointer swapping.
4. Construct and return a new string from `cs`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ where $n = \text{s.length()}$ since each character is swapped at most once.
- **Space Complexity:** $O(n)$ for the character array buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [541reverse-string-ii.java](./541reverse-string-ii.java) |

---

## Key Learnings

- Stride iteration (`i += 2k`) combined with bounded right endpoint `Math.min(i + k - 1, n - 1)` naturally handles both full and partial final chunks.
