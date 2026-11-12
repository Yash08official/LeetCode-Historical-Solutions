---
comments: true
difficulty: Easy
tags:
  - Array
  - Greedy
  - Sorting
---

# 1005. Maximize Sum Of Array After K Negations

**[View Problem on LeetCode](https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1005` |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and an integer `k`, modify the array in the following way:
- Choose an index `i` and replace `nums[i]` with `-nums[i]`.
- You must apply this operation exactly `k` times. You may choose the same index `i` multiple times.

Return the largest possible sum of the array after modifying it in this way.

---

## Problem Understanding

- To maximize the sum, we should greedily negate the most negative numbers first (from $-100$ up to $-1$).
- If all negative numbers have been turned positive and remaining $k > 0$:
  - If $k$ is even, we can flip the same number back and forth without penalty.
  - If $k$ is odd and `0` exists in the array, we can flip `0` with zero penalty.
  - Otherwise, we must flip the smallest positive number to negative.

---

## Approach

### Greedy Frequency Counting

1. Count occurrences of each number in `nums` (values range from $-100$ to $100$).
2. Loop $x$ from $-100$ to $-1$:
   - For each negative number, flip up to $\min(count, k)$ occurrences from $x$ to $-x$, decrementing $k$.
3. If $k$ is still odd and no zero exists:
   - Find the smallest positive number $x \in [1 \dots 100]$ and flip one occurrence to $-x$.
4. Sum all `value * count` across the map and return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N + C)$ where $C = 200$ is the constant value range $[-100 \dots 100]$.
- **Space Complexity:** $O(C)$ to store frequency counts.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1005maximize-sum-of-array-after-k-negations.java](./1005maximize-sum-of-array-after-k-negations.java) |

---

## Key Learnings

- When numbers are bounded within a small integer range, frequency bucket sorting yields $O(N)$ greedy optimization.
