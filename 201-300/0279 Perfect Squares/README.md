---
comments: true
difficulty: Medium
tags:
  - Math
  - Dynamic Programming
  - Breadth-First Search
  - Knapsack Problem
  - Complete Knapsack
---

# 279. Perfect Squares

**[View Problem on LeetCode](https://leetcode.com/problems/perfect-squares/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0279` (`279`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Breadth-First Search`, `Knapsack Problem`, `Complete Knapsack` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return *the least number of perfect square numbers that sum to* `n`.

A **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, `1`, `4`, `9`, and `16` are perfect squares while `3` and `11` are not.

---

## Examples

### Example 1

```text
**Input:** n = 12
**Output:** 3
**Explanation:** 12 = 4 + 4 + 4.
```

### Example 2

```text
**Input:** n = 13
**Output:** 2
**Explanation:** 13 = 4 + 9.
```

 

**

---

## Constraints

**

	
- `1 <= n <= 10^4`

---

## Problem Understanding

- Return the least number of perfect square numbers (`1, 4, 9, ...`) that sum to `n`.

---

## Approach

### Optimized Approach (Unbounded / Complete Knapsack DP)
1. Initialize `f[0..n]` to infinity with `f[0] = 0`, where `f[j]` is the minimum perfect squares summing to `j`.
2. For each square root `i` from `1` to `floor(sqrt(n))`, iterate `j` forward from `i * i` to `n` updating `f[j] = Math.min(f[j], f[j - i * i] + 1)`.
3. Return `f[n]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n\sqrt{n})$.
- **Space Complexity:** $O(n)$ — 1D DP array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [279perfect-squares.java](./279perfect-squares.java) |

---

## Key Learnings

- Iterating capacity `j` forward models unlimited reuse of each square `i * i` (Complete Knapsack).
