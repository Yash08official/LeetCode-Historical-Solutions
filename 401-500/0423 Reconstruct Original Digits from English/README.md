---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Math
  - String
---

# 423. Reconstruct Original Digits from English

**[View Problem on LeetCode](https://leetcode.com/problems/reconstruct-original-digits-from-english/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0423` (`423`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Math`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` containing an out-of-order English representation of digits `0-9`, return *the digits in **ascending** order*.

---

## Examples

### Example 1

```text
**Input:** s = "owoztneoer"
**Output:** "012"
```

### Example 2

```text
**Input:** s = "fviefuro"
**Output:** "45"
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^5`
	
- `s[i]` is one of the characters `["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"]`.
	
- `s` is **guaranteed** to be valid.

---

## Problem Understanding

- Given a jumbled lowercase string containing English digit words (`"zero"`..`"nine"`), reconstruct the digits in ascending order.

---

## Approach

### Optimized Approach (Unique-Letter Elimination Order)
1. Count all 26 letters in `counter`.
2. Deduce even digits from uniquely identifying letters: `0` (`z`), `2` (`w`), `4` (`u`), `6` (`x`), `8` (`g`).
3. Deduce remaining digits by subtracting already-counted overlaps: `3` (`h - 8`), `5` (`f - 4`), `7` (`s - 6`), `1` (`o - 0 - 2 - 4`), `9` (`i - 5 - 6 - 8`).
4. Emit digits `0..9` in ascending order.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$ (fixed 26- and 10-element arrays).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [423reconstruct-original-digits-from-english.java](./423reconstruct-original-digits-from-english.java) |

---

## Key Learnings

- Solving the triangular linear system of letter counts recovers exact digit multiplicities in one linear pass.
