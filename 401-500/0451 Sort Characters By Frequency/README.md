---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sorting
  - Heap (Priority Queue)
  - Bucket Sort
  - Counting
---

# 451. Sort Characters By Frequency

**[View Problem on LeetCode](https://leetcode.com/problems/sort-characters-by-frequency/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0451` (`451`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sorting`, `Heap (Priority Queue)`, `Bucket Sort`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, sort it in **decreasing order** based on the **frequency** of the characters. The **frequency** of a character is the number of times it appears in the string.

Return *the sorted string*. If there are multiple answers, return *any of them*.

---

## Examples

### Example 1

```
Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
```

### Example 2

```
Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.
```

### Example 3

```
Input: s = "Aabb"
Output: "bbAa"
Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.
```

 

**

---

## Constraints

**

	- `1 <= s.length <= 5 * 10^5`

	- `s` consists of uppercase and lowercase English letters and digits.

---

## Problem Understanding

- Sort the characters of string `s` in non-increasing order of their frequency in `s`.

---

## Approach

### Optimized Approach (Hash Map Frequency Count + Sort Unique Characters)
1. Count the frequency of every character in `s` using `Map<Character, Integer> cnt`.
2. Extract the unique character keys into a list `cs` and sort `cs` in descending order of `cnt.get(c)`.
3. Rebuild the output string with a `StringBuilder` by appending each character `cnt.get(c)` times.

---

## Complexity Analysis

- **Time Complexity:** $O(n + k \log k)$ where $n = \text{s.length()}$ and $k \le 62$ is the number of distinct characters ($O(n)$ effectively).
- **Space Complexity:** $O(n)$ for the output `StringBuilder` ($O(k)$ for the frequency map and key list).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [451sort-characters-by-frequency.java](./451sort-characters-by-frequency.java) |

---

## Key Learnings

- Sorting only the distinct characters ($k \le 62$) rather than all $n$ characters keeps sorting overhead negligible while keeping the implementation concise.
