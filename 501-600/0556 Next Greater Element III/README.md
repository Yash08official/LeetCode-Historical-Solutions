---
comments: true
difficulty: Medium
tags:
  - Math
  - Two Pointers
  - String
---

# 556. Next Greater Element III

**[View Problem on LeetCode](https://leetcode.com/problems/next-greater-element-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0556` (`556`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a positive integer `n`, find *the smallest integer which has exactly the same digits existing in the integer* `n` *and is greater in value than* `n`. If no such positive integer exists, return `-1`.

**Note** that the returned integer should fit in **32-bit integer**, if there is a valid answer but it does not fit in **32-bit integer**, return `-1`.

---

## Examples

### Example 1

```
Input: n = 12
Output: 21
```

### Example 2

```
Input: n = 21
Output: -1
```

 

**

---

## Constraints

**

	- `1 <= n <= 2^31 - 1`

---

## Problem Understanding

- Find the smallest 32-bit integer greater than `n` formed by permuting the digits of `n`, or `-1` if no such 32-bit integer exists.

---

## Approach

### Optimized Approach (Next Lexicographical Permutation Algorithm)
1. Convert `n` to a character array `cs`.
2. Find the pivot `i`: the rightmost index such that `cs[i] < cs[i + 1]`. If no such index exists, the digits are in descending order; return `-1`.
3. Find successor `j`: the rightmost index such that `cs[i] < cs[j]`.
4. Swap `cs[i]` and `cs[j]`.
5. Reverse the suffix from index `i + 1` to `cs.length - 1` to make it as small as possible.
6. Parse as a 64-bit integer (`Long.parseLong`); if it exceeds `Integer.MAX_VALUE`, return `-1`; otherwise cast to `int`.

---

## Complexity Analysis

- **Time Complexity:** $O(D)$ where $D \le 10$ is the number of digits in `n`.
- **Space Complexity:** $O(D)$ for digit array representation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [556next-greater-element-iii.java](./556next-greater-element-iii.java) |

---

## Key Learnings

- The standard next-permutation algorithm applies directly to digit arrays, with 32-bit overflow checked before downcasting.
