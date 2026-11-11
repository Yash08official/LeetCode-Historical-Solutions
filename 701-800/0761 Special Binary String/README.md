---
comments: true
difficulty: Hard
tags:
  - String
  - Recursion
---

# 761. Special Binary String

**[View Problem on LeetCode](https://leetcode.com/problems/special-binary-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0761` (`761`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Special binary strings are binary strings with the following two properties:


	The number of 0&#39;s is equal to the number of 1&#39;s.
	Every prefix of the binary string has at least as many 1&#39;s as 0&#39;s.


You are given a special binary string s.

A move consists of choosing two consecutive, non-empty, special substrings of s, and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.

Return the lexicographically largest resulting string possible after applying the mentioned operations on the string.

 
Example 1:


Input: s = "11011000"
Output: "11100100"
Explanation: The strings "10" [occuring at s[1]] and "1100" [at s[3]] are swapped.
This is the lexicographically largest string possible after some number of swaps.


Example 2:


Input: s = "10"
Output: "10"


 
Constraints:


	1 <= s.length <= 50
	s[i] is either &#39;0&#39; or &#39;1&#39;.
	s is a special binary string.

---

## Problem Understanding

- A special binary string has equal numbers of 0s and 1s, and every prefix has at least as many 1s as 0s.
- This is isomorphic to a **valid balanced parentheses sequence** (`1` = `(`, `0` = `)`).
- Swapping adjacent special substrings is equivalent to reordering sibling subtrees in a tree representation to maximize lexicographical order.

---

## Approach

### Optimized Approach (Divide and Conquer / Tree-Level Sorting)

1. Decompose string $s$ into primitive special components by maintaining a prefix counter `cnt` (`+1` for `'1'`, `-1` for `'0'`).
2. When `cnt == 0`, a primitive special substring $1 + M + 0$ is identified.
3. Recursively optimize inner substring: $t = 1 + \text{makeLargestSpecial}(M) + 0$.
4. Collect all optimized primitive components, sort them in descending lexicographical order, and concatenate them.
5. Return the combined string.

---

## Dry Run

For `s = "11011000"`:
- Decomposes into primitives.
- Recursively sorts subcomponents descending to maximize lexicographical rank.
Result: `"11100100"`.

---

## Complexity Analysis

- **Time Complexity:** $O(N^2)$ due to string slicing and sorting at each recursion depth.
- **Space Complexity:** $O(N)$ for recursion call stack and component lists.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [761special-binary-string.java](./761special-binary-string.java) |

---

## Key Learnings

- Mapping binary constraints to Dyck paths / balanced parentheses simplifies complex string transformation problems into tree sibling permutations.
