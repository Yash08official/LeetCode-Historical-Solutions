---
comments: true
difficulty: Easy
tags:
  - Math
  - Greedy
---

# 4000. Largest Integer With Given Digit Sum

**[View Problem on LeetCode](https://leetcode.com/problems/largest-integer-with-given-digit-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4000` |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integers `n` and `s`. Find the largest integer with exactly `n` digits such that the sum of its digits equals `s`. If no such integer exists, return `-1`.

---

## Problem Understanding

- An integer with $n$ digits has maximum digit sum $9 	imes n$.
- If $s > 9 	imes n$, it is impossible to form any valid integer; return `-1`.
- To maximize the resulting number, greedy placement should allocate the highest possible digits (up to 9) to the most significant positions (from left to right).

---

## Approach

### Greedy Digit Allocation

1. If $n 	imes 9 < s$, return `-1`.
2. Construct the integer digit by digit across $n$ positions:
   - For each position, greedily take digit $x = \min(s, 9)$.
   - Append $x$ to the accumulated integer `ans = ans * 10 + x`.
   - Deduct $x$ from remaining sum $s$.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Loop runs exactly $n$ iterations.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4000largest-integer-with-given-digit-sum.java](./4000largest-integer-with-given-digit-sum.java) |

---

## Key Learnings

- Lexicographical and numerical value maximization problems naturally favor greedy placement from most significant to least significant position.
