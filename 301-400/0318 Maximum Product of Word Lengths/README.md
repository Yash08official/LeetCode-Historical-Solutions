---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Bit Manipulation
---

# 318. Maximum Product of Word Lengths

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-product-of-word-lengths/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0318` (`318`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given a string array `words`, return *the maximum value of* `length(word[i]) * length(word[j])` *where the two words do not share common letters*. If no such two words exist, return `0`.

---

## Examples

### Example 1

```text
**Input:** words = ["abcw","baz","foo","bar","xtfn","abcdef"]
**Output:** 16
**Explanation:** The two words can be "abcw", "xtfn".
```

### Example 2

```text
**Input:** words = ["a","ab","abc","d","cd","bcd","abcd"]
**Output:** 4
**Explanation:** The two words can be "ab", "cd".
```

### Example 3

```text
**Input:** words = ["a","aa","aaa","aaaa"]
**Output:** 0
**Explanation:** No such pair of words.
```

 

**

---

## Constraints

**

	
- `2 <= words.length <= 1000`
	
- `1 <= words[i].length <= 1000`
	
- `words[i]` consists only of lowercase English letters.

---

## Problem Understanding

- Maximize `words[i].length() * words[j].length()` over all pairs of words that share no common letters.

---

## Approach

### Optimized Approach (26-Bit Letter Bitmasks)
1. Encode each word's character set into an `int` bitmask `mask[i]`.
2. Two words share no letters iff `(mask[i] & mask[j]) == 0`; check all pairs `(i, j)` and track maximum length product.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2 + L)$ where $L$ is total characters across all words.\n- **Space Complexity:** $O(n)$ for bitmask array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [318maximum-product-of-word-lengths.java](./318maximum-product-of-word-lengths.java) |

---

## Key Learnings

- Bitmasking a 26-letter alphabet reduces character-disjointness checks from $O(|w_1| + |w_2|)$ to a single $O(1)$ bitwise AND.
