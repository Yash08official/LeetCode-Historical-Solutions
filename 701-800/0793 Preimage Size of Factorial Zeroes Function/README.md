---
comments: true
difficulty: Hard
tags:
  - Math
  - Binary Search
---

# 793. Preimage Size of Factorial Zeroes Function

**[View Problem on LeetCode](https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0793` (`793`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Let f(x) be the number of zeroes at the end of x!. Recall that x! = 1 * 2 * 3 * ... * x and by convention, 0! = 1.


	For example, f(3) = 0 because 3! = 6 has no zeroes at the end, while f(11) = 2 because 11! = 39916800 has two zeroes at the end.


Given an integer k, return the number of non-negative integers x have the property that f(x) = k.

 
Example 1:


Input: k = 0
Output: 5
Explanation: 0!, 1!, 2!, 3!, and 4! end with k = 0 zeroes.


Example 2:


Input: k = 5
Output: 0
Explanation: There is no x such that x! ends in k = 5 zeroes.


Example 3:


Input: k = 3
Output: 5


 
Constraints:


	0 <= k <= 109

---

## Problem Understanding

- Let $f(x)$ be the number of trailing zeroes in $x!$, which is non-decreasing.
- The number of integers $x$ such that $f(x) = k$ is given by $g(k + 1) - g(k)$, where $g(k)$ is the smallest $x$ such that $f(x) \ge k$.
- Legendre's formula gives $f(x) = \sum_{i=1}^\infty \lfloor x / 5^i \rfloor$.

---

## Approach

### Optimized Approach (Binary Search with Legendre's Formula)

1. Function `f(x)` computes Legendre's sum recursively: `x / 5 + f(x / 5)`.
2. Binary search `g(k)` finds the smallest $x \in [0, 5k]$ such that `f(x) >= k`.
3. The preimage size for $k$ is simply `g(k + 1) - g(k)` (which is always either 0 or 5).

---

## Dry Run

For $k = 0$:
- $g(1) = 5$ (since $5! = 120$ has 1 zero).
- $g(0) = 0$.
$g(1) - g(0) = 5 - 0 = 5$ (numbers 0, 1, 2, 3, 4).

---

## Complexity Analysis

- **Time Complexity:** $O(\log^2 k)$ — Binary search over $[0, 5k]$ where each step computes Legendre's formula in $O(\log_5 k)$ time.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [793preimage-size-of-factorial-zeroes-function.java](./793preimage-size-of-factorial-zeroes-function.java) |

---

## Key Learnings

- The number of trailing zeroes in $x!$ increases only at multiples of 5, jumping by at least 1, so the preimage count is always either 0 or 5.
- Monotonicity enables binary searching for function boundaries.
