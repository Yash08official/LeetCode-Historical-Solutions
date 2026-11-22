---
comments: true
difficulty: Easy
tags:
  - Math
  - Recursion
---

# 326. Power of Three

**[View Problem on LeetCode](https://leetcode.com/problems/power-of-three/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0326` (`326`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return *`true` if it is a power of three. Otherwise, return `false`*.

An integer `n` is a power of three, if there exists an integer `x` such that `n == 3^x`.

---

## Examples

### Example 1

```text
**Input:** n = 27
**Output:** true
**Explanation:** 27 = 33
```

### Example 2

```text
**Input:** n = 0
**Output:** false
**Explanation:** There is no x where 3x = 0.
```

### Example 3

```text
**Input:** n = -1
**Output:** false
**Explanation:** There is no x where 3x = (-1).
```

 

**

---

## Constraints

**

	
- `-2^31 <= n <= 2^31 - 1`

 

**Follow up:** Could you solve it without loops/recursion?

---

## Problem Understanding

- Determine if integer `n` is a power of three without loops or recursion.

---

## Approach

### Optimized Approach (Maximum 32-Bit Power of 3 Divisibility)
1. The largest power of 3 fitting in a signed 32-bit integer is $3^{19} = 1162261467$.
2. Since `3` is prime, a positive `n` is a power of 3 iff `1162261467 % n == 0`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [326power-of-three.java](./326power-of-three.java) |

---

## Key Learnings

- Divisibility into the maximum prime-power within 32-bit range tests powers of any prime base in $O(1)$.
