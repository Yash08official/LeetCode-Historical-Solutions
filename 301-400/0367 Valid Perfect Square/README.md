---
comments: true
difficulty: Easy
tags:
  - Math
  - Binary Search
---

# 367. Valid Perfect Square

**[View Problem on LeetCode](https://leetcode.com/problems/valid-perfect-square/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0367` (`367`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Given a positive integer num, return `true` *if* `num` *is a perfect square or* `false` *otherwise*.

A **perfect square** is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as `sqrt`.

---

## Examples

### Example 1

```text
**Input:** num = 16
**Output:** true
**Explanation:** We return true because 4 * 4 = 16 and 4 is an integer.
```

### Example 2

```text
**Input:** num = 14
**Output:** false
**Explanation:** We return false because 3.742 * 3.742 = 14 and 3.742 is not an integer.
```

 

**

---

## Constraints

**

	
- `1 <= num <= 2^31 - 1`

---

## Problem Understanding

- Return `true` if positive integer `num` is a perfect square without using built-in `sqrt`.

---

## Approach

### Approach (Sum of Consecutive Odd Numbers Identity)
1. Every perfect square $k^2$ equals the sum of the first $k$ odd integers: $1 + 3 + 5 + \dots + (2k - 1) = k^2$.
2. Repeatedly subtract `i = 1, 3, 5, ...` while `num > 0` and check `num == 0`.

---

## Complexity Analysis

- **Time Complexity:** $O(\sqrt{n})$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [367valid-perfect-square.java](./367valid-perfect-square.java) |

---

## Key Learnings

- Subtracting consecutive odd integers tests perfect squares using only addition/subtraction.
