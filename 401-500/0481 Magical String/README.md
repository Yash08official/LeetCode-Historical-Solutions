---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
---

# 481. Magical String

**[View Problem on LeetCode](https://leetcode.com/problems/magical-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0481` (`481`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

A magical string `s` consists of only `'1'` and `'2'` and obeys the following rule:

	
- Concatenating the sequence of lengths of its consecutive groups of identical characters `'1'` and `'2'` generates the string `s` itself.

The first few elements of `s` is `s = "1221121221221121122……"`. If we group the consecutive `1`'s and `2`'s in `s`, it will be `"1 22 11 2 1 22 1 22 11 2 11 22 ......"` and counting the occurrences of `1`'s or `2`'s in each group yields the sequence `"1 2 2 1 1 2 1 2 2 1 2 2 ......"`.

You can see that concatenating the occurrence sequence gives us `s` itself.

Given an integer `n`, return the number of `1`'s in the first `n` number in the magical string `s`.

---

## Examples

### Example 1

```text
**Input:** n = 6
**Output:** 3
**Explanation:** The first 6 elements of magical string s is "122112" and it contains three 1's, so return 3.
```

### Example 2

```text
**Input:** n = 1
**Output:** 1
```

 

**

---

## Constraints

**

	
- `1 <= n <= 10^5`

---

## Problem Understanding

- Count the number of `1`s in the first `n` elements of the self-describing Kolakoski sequence `1, 2, 2, 1, 1, 2, 1, ...`.

---

## Approach

### Optimized Approach (Two-Pointer Sequence Construction)
1. Seed `s = [1, 2, 2]` with read pointer `i = 2`.
2. While `s.size() < n`, alternate next digit `cur = 3 - s.get(s.size() - 1)` and append `cur` exactly `s.get(i)` times.
3. Count `1`s in `s[0..n - 1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [481magical-string.java](./481magical-string.java) |

---

## Key Learnings

- `3 - pre` cleanly toggles between `1` and `2` while the read pointer drives run lengths.
