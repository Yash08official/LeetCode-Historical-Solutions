---
comments: true
difficulty: Easy
tags:
  - String
  - Stack
  - Simulation
---

# 3174. Clear Digits

**[View Problem on LeetCode](https://leetcode.com/problems/clear-digits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3174` (`3174`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Stack`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` consisting of lowercase English letters and numeric digits.

Your task is to repeatedly apply an operation that removes digits: find the first digit in the string, and delete both that digit and the closest non-digit character to its left. Continue this elimination process until the string contains no more digits.

Return the resulting string after all digits and their paired characters are removed. The problem constraints guarantee that every digit will have an available non-digit character to its left when deleted.

---

## Examples

### Example 1

**Input:** `s = "abc"`

**Output:** `"abc"`

**Explanation:**

There is no digit in the string.

### Example 2

**Input:** `s = "cb34"`

**Output:** `""`

**Explanation:**

First, we apply the operation on `s[2]`, and `s` becomes `"c4"`.

Then we apply the operation on `s[1]`, and `s` becomes `""`.

---

## Constraints

- `1 <= s.length <= 100`

- `s` consists only of lowercase English letters and digits.

- The input is generated such that it is possible to delete all digits.

---

## Problem Understanding

- **LIFO Deletion Order:** Each digit eliminates the most recently retained letter immediately to its left. This behavior mirrors the classic backspace or stack behavior where incoming digits act as pop commands.
- **Left-to-Right Processing:** Processing characters sequentially allows each digit to pop the immediately preceding letter that has not yet been removed.
- **Input Guarantee:** It is guaranteed that a non-digit character always exists to the left of any digit at the moment of deletion, meaning stack underflow cannot occur.

---

## Approach

### Brute Force Approach

A naive simulation searches the string for the first digit at index `i`, then scans backward from `i - 1` to find the closest remaining character, removes both characters by rebuilding a new string or shifting characters, and repeats. Because each character removal on a string or array of length `n` requires `O(n)` time, repeating this for up to `n / 2` digits leads to a quadratic worst-case time complexity of `O(n^2)`.

### Optimized Approach

We simulate the process in a single pass using a `StringBuilder` as a stack. We iterate through the string character by character: if the current character is a letter, we append it to the `StringBuilder`; if it is a digit, we delete the last appended character using `stk.deleteCharAt(stk.length() - 1)`. Finally, we convert `stk` to a string.

### Step-by-Step Thinking Process

1. Notice that whenever a digit is encountered, it must remove the closest surviving letter to its left.
2. This is an exact match for a stack data structure, where letters are pushed and digits trigger a pop operation.
3. Instead of an explicit `Stack<Character>`, a `StringBuilder` `stk` serves as an efficient stack with `append()` for push and `deleteCharAt(length - 1)` for pop.
4. Iterate over `s.toCharArray()`. For each character `c`, check `Character.isDigit(c)`: if true, pop the last character; otherwise, push `c`.
5. Convert `stk` to string and return.

### Algorithm / Intuition

In the provided `Solution.clearDigits`: we initialize `StringBuilder stk = new StringBuilder()`. We iterate through every character `c` of `s.toCharArray()`. When `c` is a letter, it is appended to `stk` as a candidate for the final output. When `c` is a digit (`Character.isDigit(c)` is true), the problem requires removing this digit and the closest non-digit to its left. Since `stk` contains only surviving letters in sequential order, the closest letter to the left is simply the top of the stack, which is removed via `stk.deleteCharAt(stk.length() - 1)`. By the end of the iteration, all digits and their paired letters have been eliminated in linear time.

---

## Dry Run

### Step-by-Step Execution on Example 1: `s = "abc"`

| Step | Character `c` | Is Digit? | Action | `stk` Contents |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `'a'` | No | Append `'a'` | `"a"` |
| 2 | `'b'` | No | Append `'b'` | `"ab"` |
| 3 | `'c'` | No | Append `'c'` | `"abc"` |

End of loop reached. Return `stk.toString()` = `"abc"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We traverse the string `s` of length `n` once. Each character triggers either an `append()` or `deleteCharAt()` operation on `StringBuilder`, both running in `O(1)` amortized time.
- **Space Complexity:** `O(n)` — The `StringBuilder` `stk` stores at most `n` characters when no digits are present.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3174clear-digits.java](./3174clear-digits.java) |

---

## Key Learnings

- Matching removal problems where an element cancels out a previously seen element can be solved with a stack in `O(n)` time.
- `StringBuilder` in Java is an optimal and idiomatic stack substitute for character sequences, avoiding the overhead of `Character` object boxing in `Stack<Character>`.
