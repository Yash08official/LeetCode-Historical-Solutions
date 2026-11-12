---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Math
  - Dynamic Programming
  - Bit Manipulation
  - Bitmask
---

# 805. Split Array With Same Average

**[View Problem on LeetCode](https://leetcode.com/problems/split-array-with-same-average/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0805` (`805`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Dynamic Programming`, `Bit Manipulation`, `Bitmask` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`. You want to split the array into two non-empty arrays `A` and `B` such that `avg(A) == avg(B)`.

Return `true` if you can achieve this, and `false` otherwise.

---

## Problem Understanding

- If `avg(A) == avg(B) == avg(nums)`, then for subset $A$ of size $k$ with sum $s_A$:
  $$rac{s_A}{k} = rac{s}{n} \implies s_A \cdot n = k \cdot s \implies \sum_{x \in A} (n \cdot x - s) = 0$$
- By transforming each element into $nums[i] = nums[i] \cdot n - s$, the problem simplifies to finding a non-empty proper subset of $nums$ whose sum equals $0$.
- With $n \le 30$, generating all $2^{30}$ subsets directly is too slow, but splitting into two halves of size $\le 15$ enables **Meet-in-the-Middle**.

---

## Approach

### Meet in the Middle + Bitmask

1. Calculate the total sum $s$ of `nums`.
2. Normalize all elements: `nums[i] = nums[i] * n - s`.
3. Split the array into two halves:
   - First half of length $m = \lfloor n / 2 
floor$.
   - Second half of length $n - m$.
4. **Left Half:** Enumerate all non-empty subsets using bitmask $1 \le i < 2^m$.
   - If any subset sums to 0, return `true`.
   - Otherwise, store all non-zero subset sums in a hash set `vis`.
5. **Right Half:** Enumerate all non-empty subsets using bitmask $1 \le i < 2^{n - m}$.
   - If any subset sums to 0, return `true`.
   - If the subset does not include the entirety of the right half and its negation `-t` exists in `vis`, we found a valid proper subset summing to 0, so return `true`.
6. If no subset combination sums to 0, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $O(2^{n/2} \cdot n)$ — Generating all subsets for both halves of size $\le 15$ requires at most $2 \cdot 2^{15}$ operations.
- **Space Complexity:** $O(2^{n/2})$ to store the subset sums of the first half in a HashSet.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [805split-array-with-same-average.java](./805split-array-with-same-average.java) |

---

## Key Learnings

- Multiplying by $n$ and subtracting the total sum transforms an average-matching problem into a zero-sum subset search.
- Meet-in-the-middle reduces an intractable $2^{30} pprox 10^9$ search space down to $2^{15} pprox 3.2 	imes 10^4$ operations.
