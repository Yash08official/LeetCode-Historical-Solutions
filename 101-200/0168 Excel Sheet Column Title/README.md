---
comments: true
difficulty: Easy
tags:
  - Math
  - String
---

# 168. Excel Sheet Column Title

**[View Problem on LeetCode](https://leetcode.com/problems/excel-sheet-column-title/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0168` (`168`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `columnNumber`, return *its corresponding column title as it appears in an Excel sheet*.

For example:

```text
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
```

---

## Examples

### Example 1

```text
**Input:** columnNumber = 1
**Output:** "A"
```

### Example 2

```text
**Input:** columnNumber = 28
**Output:** "AB"
```

### Example 3

```text
**Input:** columnNumber = 701
**Output:** "ZY"
```

 

**

---

## Constraints

**

	
- `1 <= columnNumber <= 2^31 - 1`

---

## Problem Understanding

- Convert a 1-indexed integer `columnNumber` into its corresponding Excel sheet column title (e.g., 1 -> A, 28 -> AB, 701 -> ZY).
- This is a base-26 conversion with 1-based indexing (bijective base-26).

---

## Approach

### Optimized Approach (1-Based Base-26 Conversion)

1. While `columnNumber > 0`:
   - Decrement `columnNumber` by 1 (`--columnNumber`) to shift from 1-indexed $[1, 26]$ to 0-indexed $[0, 25]$.
   - Extract current character: `(char) ('A' + columnNumber % 26)`.
   - Append character to `StringBuilder`.
   - Divide `columnNumber /= 26`.
2. Reverse `StringBuilder` and return string.

---

## Complexity Analysis

- **Time Complexity:** $O(\log_{26} n)$ — Logarithmic in base 26 relative to column number.
- **Space Complexity:** $O(1)$ auxiliary space (excluding output string buffer).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [168excel-sheet-column-title.java](./168excel-sheet-column-title.java) |

---

## Key Learnings

- Shifting by `--columnNumber` at the start of each iteration cleanly aligns 1-based bijective base systems with standard 0-based modular arithmetic.
