---
comments: true
difficulty: Easy
tags:
  - Math
  - Bit Manipulation
  - Recursion
---

# 231. Power of Two

**[View Problem on LeetCode](https://leetcode.com/problems/power-of-two/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0231` (`231`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Bit Manipulation`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer `n`, return *`true` if it is a power of two. Otherwise, return `false`*.

An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

---

## Examples

### Example 1

```text
**Input:** n = 1
**Output:** true
**Explanation: **20 = 1
```

### Example 2

```text
**Input:** n = 16
**Output:** true
**Explanation: **24 = 16
```

### Example 3

```text
**Input:** n = 3
**Output:** false
```

 

**

---

## Constraints

**

	
- `-2^31 <= n <= 2^31 - 1`

 

**Follow up:** Could you solve it without loops/recursion?

---

## Problem Understanding

- Determine if integer `n` is a power of two ($n = 2^x$ for some integer $x \ge 0$).

---

## Approach

### Optimized Approach (Lowest Set Bit Isolation)
1. A positive integer is a power of two iff it has exactly one set bit in binary.
2. `n & -n` isolates the lowest set bit of `n`, so `n > 0 && n === (n & -n)` holds if and only if `n` is a power of two.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [231power-of-two.js](./231power-of-two.js) |

---

## Key Learnings

- Two's complement bit trick `n & -n` extracts the rightmost `1`-bit in constant time.
