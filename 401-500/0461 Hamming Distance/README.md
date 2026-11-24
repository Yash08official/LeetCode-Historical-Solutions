---
comments: true
difficulty: Easy
tags:
  - Bit Manipulation
---

# 461. Hamming Distance

**[View Problem on LeetCode](https://leetcode.com/problems/hamming-distance/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0461` (`461`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers `x` and `y`, return *the **Hamming distance** between them*.

---

## Examples

### Example 1

```text
**Input:** x = 1, y = 4
**Output:** 2
**Explanation:**
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
The above arrows point to positions where the corresponding bits are different.
```

### Example 2

```text
**Input:** x = 3, y = 1
**Output:** 1
```

 

**

---

## Constraints

**

	
- `0 <= x, y <= 2^31 - 1`

 

**Note:** This question is the same as  2220: Minimum Bit Flips to Convert Number.

---

## Problem Understanding

- Return the number of bit positions at which integers `x` and `y` differ.

---

## Approach

### Optimized Approach (XOR + Popcount)
1. `x ^ y` sets a `1` at every differing bit position.
2. Return `Integer.bitCount(x ^ y)`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [461hamming-distance.java](./461hamming-distance.java) |

---

## Key Learnings

- Hamming distance is literally the popcount of bitwise XOR.
