---
comments: true
difficulty: Easy
tags:
  - Math
  - String
---

# 171. Excel Sheet Column Number

**[View Problem on LeetCode](https://leetcode.com/problems/excel-sheet-column-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0171` (`171`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a string `columnTitle` that represents the column title as appears in an Excel sheet, return *its corresponding column number*.

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
**Input:** columnTitle = "A"
**Output:** 1
```

### Example 2

```text
**Input:** columnTitle = "AB"
**Output:** 28
```

### Example 3

```text
**Input:** columnTitle = "ZY"
**Output:** 701
```

 

**

---

## Constraints

**

	
- `1 <= columnTitle.length <= 7`
	
- `columnTitle` consists only of uppercase English letters.
	
- `columnTitle` is in the range `["A", "FXSHRXW"]`.

---

## Problem Understanding

- Given a string `columnTitle` representing an Excel sheet column title, return its corresponding column number (e.g. A -> 1, AB -> 28, ZY -> 701).
- Inverse operation of problem 168 (standard base-26 Horner's rule evaluation).

---

## Approach

### Optimized Approach (Horner's Rule Polynomial Evaluation)

1. Initialize `result = 0`.
2. Iterate left to right through `columnTitle`:
   - Extract numerical value of character: `columnTitle.charCodeAt(i) - 64` (where `'A'` maps to 1, `'B'` to 2, ..., `'Z'` to 26).
   - Accumulate using polynomial base-26 expansion: `result = result * 26 + value`.
3. Return `result`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Where $n$ is string length (at most 7 for 32-bit integers).
- **Space Complexity:** $O(1)$ — Constant auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [171excel-sheet-column-number.js](./171excel-sheet-column-number.js) |

---

## Key Learnings

- Horner's method provides the standard and overflow-safe technique for base conversion from highest to lowest significant place values.
