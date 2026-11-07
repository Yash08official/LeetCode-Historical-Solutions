---
comments: true
difficulty: Easy
tags:
  - String
---

# 58. Length of Last Word

**[View Problem on LeetCode](https://leetcode.com/problems/length-of-last-word/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0058` (`58`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting of words and spaces, return *the length of the **last** word in the string*.

A **word** is a maximal substring consisting of non-space characters only.

---

## Examples

### Example 1

```text
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
```

### Example 2

```text
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
```

### Example 3

```text
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
```

---

## Constraints

- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.

---

## Problem Understanding

- We need the length of the last word.
- Trailing spaces must be skipped first.
- Once the end of the last word is found, scan backward until reaching another space or the beginning of the string.

---

## Approach

### Optimized Approach (Backward Two-Pointer Scan)

1. Start pointer `i = s.length() - 1`.
2. Skip trailing spaces: while `i >= 0 && s.charAt(i) == ' '`, decrement `i`.
3. Set pointer `j = i`.
4. Traverse characters of the last word: while `j >= 0 && s.charAt(j) != ' '`, decrement `j`.
5. The length of the last word is `i - j`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single backward scan examining at most $N$ characters.
- **Space Complexity:** $O(1)$ — In-place two-pointer scan requiring zero extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [58length-of-last-word.java](./58length-of-last-word.java) |

---

## Key Learnings

- Reverse traversal avoids allocating split string arrays, achieving $O(1)$ auxiliary space.
