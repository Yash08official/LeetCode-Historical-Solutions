---
comments: true
difficulty: Easy
tags:
  - String
---

# 520. Detect Capital

**[View Problem on LeetCode](https://leetcode.com/problems/detect-capital/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0520` (`520`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

We define the usage of capitals in a word to be right when one of the following cases holds:

	- All letters in this word are capitals, like `"USA"`.

	- All letters in this word are not capitals, like `"leetcode"`.

	- Only the first letter in this word is capital, like `"Google"`.

Given a string `word`, return `true` if the usage of capitals in it is right.

---

## Examples

### Example 1

```
Input: word = "USA"
Output: true
```

### Example 2

```
Input: word = "FlaG"
Output: false
```

 

**

---

## Constraints

**

	- `1 <= word.length <= 100`

	- `word` consists of lowercase and uppercase English letters.

---

## Problem Understanding

- Verify if capitalization in a word is valid: all capitals, all lowercase, or only the first letter capitalized.

---

## Approach

### Optimized Approach (Single-Pass Upper Case Counting)
1. Iterate through characters in `word` and count how many are uppercase (`cnt`).
2. Capitalization is valid if and only if:
   - `cnt == 0` (all lowercase), OR
   - `cnt == word.length()` (all uppercase), OR
   - `cnt == 1 && Character.isUpperCase(word.charAt(0))` (only title-cased).

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ where $n = \text{word.length()}$.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [520detect-capital.java](./520detect-capital.java) |

---

## Key Learnings

- Counting uppercase occurrences collapses multiple case-checking rules into three simple integer comparisons.
