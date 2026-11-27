---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - String
  - Sorting
---

# 524. Longest Word in Dictionary through Deleting

**[View Problem on LeetCode](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0524` (`524`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `String`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` and a string array `dictionary`, return *the longest string in the dictionary that can be formed by deleting some of the given string characters*. If there is more than one possible result, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.

---

## Examples

### Example 1

```
Input: s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
Output: "apple"
```

### Example 2

```
Input: s = "abpcplea", dictionary = ["a","b","c"]
Output: "a"
```

 

**

---

## Constraints

**

	- `1 <= s.length <= 1000`

	- `1 <= dictionary.length <= 1000`

	- `1 <= dictionary[i].length <= 1000`

	- `s` and `dictionary[i]` consist of lowercase English letters.

---

## Problem Understanding

- Return the longest string in `dictionary` (tie-breaking by smallest lexicographical order) that can be formed by deleting characters from `s`, i.e., is a subsequence of `s`.

---

## Approach

### Optimized Approach (Two-Pointer Subsequence Match + Best-Candidate Tracking)
1. Helper `check(s, t)` verifies whether `s` is a subsequence of `t` in a single linear two-pointer scan.
2. Iterate through each dictionary word `t`: if `check(t, s)` holds and either `t.length() > ans.length()` or `(t.length() == ans.length() && t.compareTo(ans) < 0)`, update `ans = t`.

---

## Complexity Analysis

- **Time Complexity:** $O(d \cdot (m + L))$ where $d = \text{dictionary.size()}$, $m = \text{s.length()}$, and $L$ is average dictionary word length.
- **Space Complexity:** $O(1)$ extra space beyond the result reference.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [524longest-word-in-dictionary-through-deleting.java](./524longest-word-in-dictionary-through-deleting.java) |

---

## Key Learnings

- Scanning candidates directly and updating `(length, lexicographical)` best-so-far avoids sorting the dictionary beforehand.
