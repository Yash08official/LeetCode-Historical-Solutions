---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Bit Manipulation
  - Sliding Window
  - Rolling Hash
  - Hash Function
  - Z Algorithm
  - Boyer–Moore String-Search Algorithm
---

# 187. Repeated DNA Sequences

**[View Problem on LeetCode](https://leetcode.com/problems/repeated-dna-sequences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0187` (`187`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Bit Manipulation`, `Sliding Window`, `Rolling Hash`, `Hash Function`, `Z Algorithm`, `Boyer–Moore String-Search Algorithm` |
| **Solution Language** | JavaScript |

---

## Problem Description

The **DNA sequence** is composed of a series of nucleotides abbreviated as `'A'`, `'C'`, `'G'`, and `'T'`.

	
- For example, `"ACGAATTCCG"` is a **DNA sequence**.

When studying **DNA**, it is useful to identify repeated sequences within the DNA.

Given a string `s` that represents a **DNA sequence**, return all the **`10`-letter-long** sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in **any order**.

---

## Examples

### Example 1

```text
**Input:** s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
**Output:** ["AAAAACCCCC","CCCCCAAAAA"]
```

### Example 2

```text
**Input:** s = "AAAAAAAAAAAAA"
**Output:** ["AAAAAAAAAA"]
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 10^5`
	
- `s[i]` is either `'A'`, `'C'`, `'G'`, or `'T'`.

---

## Problem Understanding

- Given a DNA string `s`, find all 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.

---

## Approach

### Optimized Approach (Sliding Window of Length 10 with Hash Map Frequency Counting)

1. Initialize Hash Map `cnt` and result array `ans`.
2. Slide a window of length 10 across `s` from index $0$ to $s.length - 10$:
   - Extract 10-character substring `t = s.slice(i, i + 10)`.
   - Increment count in map: `cnt.set(t, (cnt.get(t) || 0) + 1)`.
   - If count equals exactly 2, push `t` into `ans` (ensuring each duplicate is added only once).
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Where $n$ is string length. Extracting length-10 substrings takes $O(10) = O(1)$ per step.
- **Space Complexity:** $O(n)$ — Hash map storing unique 10-letter substrings.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [187repeated-dna-sequences.js](./187repeated-dna-sequences.js) |

---

## Key Learnings

- Triggering addition to results exactly when frequency count reaches 2 guarantees unique entries in the result array without requiring an extra Set.
