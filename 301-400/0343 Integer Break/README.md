---
comments: true
difficulty: Medium
tags:
  - Math
  - Dynamic Programming
---

# 343. Integer Break

**[View Problem on LeetCode](https://leetcode.com/problems/integer-break/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0343` (`343`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, break it into the sum of `k` **positive integers**, where `k >= 2`, and maximize the product of those integers.

Return *the maximum product you can get*.

---

## Examples

### Example 1

```text
**Input:** n = 2
**Output:** 1
**Explanation:** 2 = 1 + 1, 1 × 1 = 1.
```

### Example 2

```text
**Input:** n = 10
**Output:** 36
**Explanation:** 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
```

 

**

---

## Constraints

**

	
- `2 <= n <= 58`

---

## Problem Understanding

- Split integer `n >= 2` into the sum of at least two positive integers to maximize their product.

---

## Approach

### Optimized Approach (Mathematical Greedy Factor of 3)
1. For `n < 4`, return `n - 1` (`2 -> 1`, `3 -> 2`).
2. Otherwise split into as many `3`s as possible (since $3 \times 3 > 2 \times 2 \times 2$):
   - `n % 3 == 0`: $3^{n/3}$.
   - `n % 3 == 1`: replace `3 + 1` with `2 + 2` -> $3^{n/3 - 1} \times 4$.
   - `n % 3 == 2`: $3^{n/3} \times 2$.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ (or $O(\log n)$ for `Math.pow`).\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [343integer-break.java](./343integer-break.java) |

---

## Key Learnings

- Because $e \approx 2.718$ maximizes $x^{n/x}$, choosing integer parts of `3` (and `4` instead of `3+1`) yields the globally optimal product.
