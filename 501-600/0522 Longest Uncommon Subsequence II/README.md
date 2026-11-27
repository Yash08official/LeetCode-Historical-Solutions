---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Two Pointers
  - String
  - Sorting
---

# 522. Longest Uncommon Subsequence II

**[View Problem on LeetCode](https://leetcode.com/problems/longest-uncommon-subsequence-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0522` (`522`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `String`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of strings `strs`, return *the length of the **longest uncommon subsequence** between them*. If the longest uncommon subsequence does not exist, return `-1`.

An **uncommon subsequence** between an array of strings is a string that is a **subsequence of one string but not the others**.

A **subsequence** of a string `s` is a string that can be obtained after deleting any number of characters from `s`.

	- For example, `"abc"` is a subsequence of `"aebdc"` because you can delete the underlined characters in `"aebdc"` to get `"abc"`. Other subsequences of `"aebdc"` include `"aebdc"`, `"aeb"`, and `""` (empty string).

---

## Examples

### Example 1

```
Input: strs = ["aba","cdc","eae"]
Output: 3
```

### Example 2

```
Input: strs = ["aaa","aaa","aa"]
Output: -1
```

 

**

---

## Constraints

**

	- `2 <= strs.length <= 50`

	- `1 <= strs[i].length <= 10`

	- `strs[i]` consists of lowercase English letters.

---

## Problem Understanding

- Given an array of strings `strs`, find the length of the longest string (or subsequence of it) that is **not** a subsequence of any other string in `strs`, or `-1` if none exists.

---

## Approach

### Optimized Approach (Pairwise Subsequence Verification)
1. If any subsequence of `strs[i]` is uncommon, then the full string `strs[i]` itself must also be uncommon — so only full strings in `strs` need to be checked as candidates.
2. For each string `strs[i]`, check via two-pointer `check(strs[i], strs[j])` whether it is a subsequence of any other string `strs[j]` (`j != i`).
3. If no other string contains `strs[i]` as a subsequence, update `ans = Math.max(ans, strs[i].length())`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2 \cdot L)$ where $n = \text{strs.length} \le 50$ and $L$ is max string length.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [522longest-uncommon-subsequence-ii.java](./522longest-uncommon-subsequence-ii.java) |

---

## Key Learnings

- Maximality implies any uncommon subsequence can always be extended to the full source string itself, reducing the search space to the `n` input strings.
