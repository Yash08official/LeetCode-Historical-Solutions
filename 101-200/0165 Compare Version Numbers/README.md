---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
---

# 165. Compare Version Numbers

**[View Problem on LeetCode](https://leetcode.com/problems/compare-version-numbers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0165` (`165`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given two **version strings**, `version1` and `version2`, compare them. A version string consists of **revisions** separated by dots `'.'`. The **value of the revision** is its **integer conversion** ignoring leading zeros.

To compare version strings, compare their revision values in **left-to-right order**. If one of the version strings has fewer revisions, treat the missing revision values as `0`.

Return the following:

	
- If `version1 < version2`, return -1.
	
- If `version1 > version2`, return 1.
	
- Otherwise, return 0.

---

## Examples

### Example 1

**Input:** version1 = "1.2", version2 = "1.10"

**Output:** -1

**Explanation:**

version1's second revision is "2" and version2's second revision is "10": 2 < 10, so version1 < version2.

### Example 2

**Input:** version1 = "1.01", version2 = "1.001"

**Output:** 0

**Explanation:**

Ignoring leading zeroes, both "01" and "001" represent the same integer "1".

### Example 3

**Input:** version1 = "1.0", version2 = "1.0.0.0"

**Output:** 0

**Explanation:**

version1 has less revisions, which means every missing revision are treated as "0".

 

**

---

## Constraints

**

	
- `1 <= version1.length, version2.length <= 500`
	
- `version1` and `version2` only contain digits and `'.'`.
	
- `version1` and `version2` **are valid version numbers**.
	
- All the given revisions in `version1` and `version2` can be stored in a **32-bit integer**.

---

## Problem Understanding

- Compare two version strings `version1` and `version2` composed of revisions separated by dots `'.'`.
- Revisions are compared numerically (ignoring leading zeros). Missing revisions default to `0`.
- Return `-1` if `version1 < version2`, `1` if `version1 > version2`, or `0` if equal.

---

## Approach

### Optimized Approach (Two Pointers / Single-Pass Numerical Parsing)

1. Use two pointers $i$ and $j$ to scan `version1` and `version2` simultaneously.
2. At each dot-delimited revision segment:
   - Accumulate integer value $a$ by parsing digits of `version1` until `.` or string end.
   - Accumulate integer value $b$ by parsing digits of `version2` until `.` or string end.
   - If $a 
e b$, return $-1$ if $a < b$ else $1$.
3. Skip the dot separator and continue until both strings are completely consumed.
4. If all revisions match, return $0$.

---

## Complexity Analysis

- **Time Complexity:** $O(\max(m, n))$ — Single simultaneous pass across both strings.
- **Space Complexity:** $O(1)$ — Evaluates numbers on the fly without string splitting or array allocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [165compare-version-numbers.java](./165compare-version-numbers.java) |

---

## Key Learnings

- Parsing integers character-by-character on the fly avoids string split allocations and handles arbitrary numbers of leading zeros naturally.
