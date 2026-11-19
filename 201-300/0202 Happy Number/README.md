---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - Math
  - Two Pointers
  - Floyd's Cycle Finding Algorithm
---

# 202. Happy Number

**[View Problem on LeetCode](https://leetcode.com/problems/happy-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0202` (`202`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `Math`, `Two Pointers`, `Floyd's Cycle Finding Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

Write an algorithm to determine if a number `n` is happy.

A **happy number** is a number defined by the following process:

	
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
	
- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
	
- Those numbers for which this process **ends in 1** are happy.

Return `true` *if* `n` *is a happy number, and* `false` *if not*.

---

## Examples

### Example 1

```text
**Input:** n = 19
**Output:** true
**Explanation:**
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

### Example 2

```text
**Input:** n = 2
**Output:** false
```

 

**

---

## Constraints

**

	
- `1 <= n <= 2^31 - 1`

---

## Problem Understanding

- Repeatedly replace `n` with the sum of the squares of its digits.
- Return `true` if the sequence reaches `1`, or `false` if it enters an endless cycle that does not include `1`.

---

## Approach

### Brute-Force vs. Optimized Approach
- **HashSet Approach:** Store every visited number in a `Set` to detect cycles in $O(\log n)$ space.
- **Optimized Approach (Floyd's Cycle Finding Algorithm — Fast & Slow Pointers):**
  1. Define helper `next(x)` to compute the sum of squares of digits of `x`.
  2. Initialize `slow = n` and `fast = next(n)`.
  3. Advance `slow` by 1 step (`next(slow)`) and `fast` by 2 steps (`next(next(fast))`) until `slow == fast`.
  4. If the sequence converges to `1`, both pointers meet at `1`; otherwise they meet inside a cycle. Return `slow == 1`.

### Dry Run (`n = 19`)
- `19 -> 82 -> 68 -> 100 -> 1 -> 1`.
- `slow` and `fast` eventually both reach `1`, so `slow == fast` terminates and returns `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ — Computing digit-square sum takes $O(\log n)$ and the sequence shrinks rapidly to a small bounded range.
- **Space Complexity:** $O(1)$ — No hash set needed thanks to Floyd's two-pointer cycle detection.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [202happy-number.java](./202happy-number.java) |

---

## Key Learnings

- Any deterministic functional sequence over a bounded state space can be checked for cycles in $O(1)$ auxiliary memory using Floyd's Tortoise and Hare algorithm.
