---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 4117. Minimum Range After Sum Operations

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-range-after-sum-operations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4117` (`4117`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | Java |

---

## Problem Description

You are given three integers `a`, `b`, and `c`.

You may perform the following operation **any** number of times (including zero):

	
- Choose one of the three integers and **replace** it with the sum of the other two integers. The other two integers remain unchanged.

The **range** of three integers is defined as the difference between the **maximum value** and the **minimum value**.

Return the **minimum range** that can be obtained after performing the operation any number of times.

---

## Examples

### Example 1

**Input:** a = 9, b = 2, c = 5

**Output:** 5

**Explanation:**

One sequence of operations which results in the minimum range is as follows:

	
- Set `a` to `b + c = 2 + 5 = 7`. The three integers are now `a = 7`, `b = 2`, `c = 5`.
	
- The range of the three integers is `max(7, 2, 5) - min(7, 2, 5) = 7 - 2 = 5`.

### Example 2

**Input:** a = 5, b = 7, c = 6

**Output:** 2

**Explanation:**

Without doing any operations, the range of the three integers is `max(5, 7, 6) - min(5, 7, 6) = 7 - 5 = 2`.

### Example 3

**Input:** a = 3, b = 3, c = 3

**Output:** 0

**Explanation:**

Without doing any operations, the range of the three integers is `max(3, 3, 3) - min(3, 3, 3) = 3 - 3 = 0`.

 

**

---

## Constraints

**

	
- `1 <= a, b, c <= 100`

---

## Problem Understanding

- Given three integers `a`, `b`, and `c`, minimize the range (`max - min`) achievable after applying the allowed sum operations.

---

## Approach

### Optimized Approach (Sort 3 Values + Closed-Form Comparison)
1. Place `{a, b, c}` into array `lom` and sort ascending so `lom[0] <= lom[1] <= lom[2]`.
2. Compute initial range `range = lom[2] - lom[0]`.
3. Return `Math.min(range, lom[1])`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ — Sorting 3 elements and constant arithmetic.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4117minimum-range-after-sum-operations.java](./4117minimum-range-after-sum-operations.java) |

---

## Key Learnings

- Sorting a fixed-size triple exposes the exact closed-form minimum range in $O(1)$.
