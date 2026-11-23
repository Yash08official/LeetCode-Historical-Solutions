---
comments: true
difficulty: Easy
tags:
  - Math
  - Binary Search
---

# 441. Arranging Coins

**[View Problem on LeetCode](https://leetcode.com/problems/arranging-coins/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0441` (`441`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

You have `n` coins and you want to build a staircase with these coins. The staircase consists of `k` rows where the `i^th` row has exactly `i` coins. The last row of the staircase **may be** incomplete.

Given the integer `n`, return *the number of **complete rows** of the staircase you will build*.

---

## Examples

### Example 1

```text
**Input:** n = 5
**Output:** 2
**Explanation:** Because the 3rd row is incomplete, we return 2.
```

### Example 2

```text
**Input:** n = 8
**Output:** 3
**Explanation:** Because the 4th row is incomplete, we return 3.
```

 

**

---

## Constraints

**

	
- `1 <= n <= 2^31 - 1`

---

## Problem Understanding

- Given `n` coins, find the maximum number of complete staircase rows `k` where row `i` requires `i` coins (`k(k + 1) / 2 <= n`).

---

## Approach

### Optimized Approach (Upper-Bound Binary Search with 64-Bit Arithmetic)
1. Binary search `left = 1, right = n` using `long` and upper-mid `(left + right + 1) >>> 1`.
2. If `(1 + mid) * mid / 2 <= n`, advance `left = mid`; else `right = mid - 1`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [441arranging-coins.java](./441arranging-coins.java) |

---

## Key Learnings

- Promoting `mid` to `long` prevents 32-bit overflow in `(1 + mid) * mid / 2`.
