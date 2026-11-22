---
comments: true
difficulty: Medium
tags:
  - Math
  - Dynamic Programming
  - Backtracking
---

# 357. Count Numbers with Unique Digits

**[View Problem on LeetCode](https://leetcode.com/problems/count-numbers-with-unique-digits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0357` (`357`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return the count of all numbers with unique digits, `x`, where `0 <= x < 10^n`.

---

## Examples

### Example 1

```text
**Input:** n = 2
**Output:** 91
**Explanation:** The answer should be the total numbers in the range of 0 ≤ x < 100, excluding 11,22,33,44,55,66,77,88,99
```

### Example 2

```text
**Input:** n = 0
**Output:** 1
```

 

**

---

## Constraints

**

	
- `0 <= n <= 8`

---

## Problem Understanding

- Count integers `x` in `[0, 10^n)` whose decimal digits are all distinct.

---

## Approach

### Optimized Approach (Digit DP with Bitmask & Leading-Zero Flag)
1. `dfs(i, mask, lead)` counts valid numbers from digit position `i` down to `0`, tracking used digits in 10-bit `mask` and whether we are still in leading zeros (`lead`).
2. Leading zeros leave `mask` unchanged; non-zero digits set bit `j` in `mask`. Memoize non-leading states in `f[i][mask]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot 2^{10} \cdot 10)$.\n- **Space Complexity:** $O(n \cdot 2^{10})$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [357count-numbers-with-unique-digits.java](./357count-numbers-with-unique-digits.java) |

---

## Key Learnings

- Separating leading-zero states prevents `0` from being prematurely marked as used for shorter numbers.
