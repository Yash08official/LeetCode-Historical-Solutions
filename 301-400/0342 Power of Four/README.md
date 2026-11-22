---
comments: true
difficulty: Easy
tags:
  - Math
  - Bit Manipulation
  - Recursion
---

# 342. Power of Four

**[View Problem on LeetCode](https://leetcode.com/problems/power-of-four/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0342` (`342`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Bit Manipulation`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return *`true` if it is a power of four. Otherwise, return `false`*.

An integer `n` is a power of four, if there exists an integer `x` such that `n == 4^x`.

---

## Examples

### Example 1

```text
**Input:** n = 16
**Output:** true
```

### Example 2

```text
**Input:** n = 5
**Output:** false
```

### Example 3

```text
**Input:** n = 1
**Output:** true
```

 

**

---

## Constraints

**

	
- `-2^31 <= n <= 2^31 - 1`

 

**Follow up:** Could you solve it without loops/recursion?

---

## Problem Understanding

- Return `true` iff `n` is a power of four ($4^k$) without loops or recursion.

---

## Approach

### Optimized Approach (Power-of-Two Check + Even-Bit Mask)
1. `n > 0 && (n & (n - 1)) == 0` verifies `n` has exactly one set bit (power of 2).
2. `(n & 0xaaaaaaaa) == 0` verifies that single set bit lies at an even bit position (`0, 2, 4, ...`), confirming a power of 4.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [342power-of-four.java](./342power-of-four.java) |

---

## Key Learnings

- Mask `0xaaaaaaaa` selects all odd bit positions in 32-bit binary, cleanly separating powers of 4 from odd powers of 2.
