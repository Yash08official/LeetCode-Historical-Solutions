---
comments: true
difficulty: Easy
tags:
  - Divide and Conquer
  - Bit Manipulation
---

# 191. Number of 1 Bits

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-1-bits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0191` (`191`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Divide and Conquer`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given a positive integer `n`, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).

---

## Examples

### Example 1

**Input:** n = 11

**Output:** 3

**Explanation:**

The input binary string **1011** has a total of three set bits.

### Example 2

**Input:** n = 128

**Output:** 1

**Explanation:**

The input binary string **10000000** has a total of one set bit.

### Example 3

**Input:** n = 2147483645

**Output:** 30

**Explanation:**

The input binary string **1111111111111111111111111111101** has a total of thirty set bits.

 

**

---

## Constraints

**

	
- `1 <= n <= 2^31 - 1`

 

**Follow up:** If this function is called many times, how would you optimize it?

---

## Problem Understanding

- Write a function that takes the binary representation of a positive integer and returns the number of set bits (Hamming weight).

---

## Approach

### Optimized Approach (Brian Kernighan's Bit Manipulation Algorithm)

1. Initialize `ans = 0`.
2. While `n != 0`:
   - Clear the lowest set bit using `n -= (n & -n)` (or `n &= (n - 1)`).
   - Increment `ans`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(k)$ — Where $k$ is the number of 1-bits in `n` (at most 32). Runs strictly proportional to set bits rather than total bits.
- **Space Complexity:** $O(1)$ — Only scalar integer variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [191number-of-1-bits.java](./191number-of-1-bits.java) |

---

## Key Learnings

- The expression `n & -n` isolates the lowest set bit, while subtracting it clears that bit in a single CPU cycle.
