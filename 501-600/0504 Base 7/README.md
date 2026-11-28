---
comments: true
difficulty: Easy
tags:
  - Math
  - String
---

# 504. Base 7

**[View Problem on LeetCode](https://leetcode.com/problems/base-7/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0504` (`504`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `num`, return *a string of its **base 7** representation*.

---

## Examples

### Example 1

```
Input: num = 100
Output: "202"
```

### Example 2

```
Input: num = -7
Output: "-10"
```

 

**

---

## Constraints

**

	- `-10^7 <= num <= 10^7`

---

## Problem Understanding

- Convert a given 32-bit signed integer `num` into its base 7 representation as a string.

---

## Approach

### Optimized Approach (Repeated Division and Remainder Simulation)
1. Handle `num == 0` by returning `"0"`.
2. Handle negative numbers by prepending `"-"` to the result of `convertToBase7(-num)`.
3. For positive `num`, repeatedly extract `num % 7` into a `StringBuilder` and update `num /= 7` until `num == 0`.
4. Reverse the accumulated digits and return the resulting string.

---

## Complexity Analysis

- **Time Complexity:** $O(\log_7 |num|)$ — at most around 12 divisions for 32-bit integers.
- **Space Complexity:** $O(\log_7 |num|)$ for the output string buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [504base-7.java](./504base-7.java) |

---

## Key Learnings

- Base conversion reduces to extracting remainder digits in least-significant order and reversing the buffer.
