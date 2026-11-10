---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
---

# 125. Valid Palindrome

**[View Problem on LeetCode](https://leetcode.com/problems/valid-palindrome/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0125` (`125`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` *if it is a **palindrome**, or* `false` *otherwise*.

---

## Examples

### Example 1

```text
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

### Example 2

```text
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

### Example 3

```text
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

---

## Constraints

- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters.

---

## Problem Understanding

- Check palindrome symmetry ignoring non-alphanumeric characters (spaces, punctuation, symbols).
- Case-insensitive comparison (`'A' === 'a'`).

---

## Approach

### Optimized Approach (Two-Pointer In-Place Scan)

1. Initialize two pointers: `i = 0` (left boundary) and `j = s.length - 1` (right boundary).
2. While `i < j`:
   - If `s[i]` is not alphanumeric (`!/[a-zA-Z0-9]/.test(s[i])`), increment `i`.
   - Else if `s[j]` is not alphanumeric, decrement `j`.
   - Else if `s[i].toLowerCase() !== s[j].toLowerCase()`, return `false`.
   - Else, advance both pointers: `++i; --j;`.
3. Return `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each character is examined at most once by the pointers.
- **Space Complexity:** $O(1)$ — Operates directly on the input string without creating cleaned copies.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [125valid-palindrome.js](./125valid-palindrome.js) |

---

## Key Learnings

- Skipping non-alphanumeric characters on the fly via two pointers avoids allocating an auxiliary cleaned string.
