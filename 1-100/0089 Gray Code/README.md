---
comments: true
difficulty: Medium
tags:
  - Math
  - Backtracking
  - Bit Manipulation
---

# 89. Gray Code

**[View Problem on LeetCode](https://leetcode.com/problems/gray-code/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0089` (`89`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Backtracking`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

An **n-bit Gray code sequence** is a sequence of $2^n$ integers where:

- Every integer is in the **inclusive** range $[0, 2^n - 1]$,
- The first integer is `0`,
- An integer appears **no more than once** in the sequence,
- The binary representation of every pair of **adjacent** integers differs by **exactly one bit**, and
- The binary representation of the **first** and **last** integers differs by **exactly one bit**.

Given an integer `n`, return *any valid **n-bit Gray code sequence***.

---

## Examples

### Example 1

```text
Input: n = 2
Output: [0,1,3,2]
Explanation:
The binary representation of [0,1,3,2] is [00,01,11,10].
- 00 and 01 differ by one bit
- 01 and 11 differ by one bit
- 11 and 10 differ by one bit
- 10 and 00 differ by one bit
[0,2,3,1] is also a valid gray code sequence, whose binary representation is [00,10,11,01].
```

### Example 2

```text
Input: n = 1
Output: [0,1]
```

---

## Constraints

- `1 <= n <= 16`

---

## Problem Understanding

- We need a sequence of $2^n$ numbers starting at $0$ where consecutive numbers differ by exactly one binary bit.
- By standard mathematical Gray code definition, the $i$-th Gray code word is generated directly by the formula:
  $$G(i) = i \oplus (i \gg 1)$$
- This direct mapping produces a cyclic Gray code sequence of length $2^n$ with zero overhead.

---

## Approach

### Optimized Approach (Direct Bitwise Gray Code Formula)

1. The total number of elements in the sequence is $2^n = 1 \ll n$.
2. Allocate a result list of size $2^n$.
3. For each index $i$ from $0$ to $(1 \ll n) - 1$:
   - Compute `i ^ (i >> 1)`.
   - Append the computed integer to the result list.
4. Return the list.

---

## Dry Run

For `n = 2`, range $0$ to $3$:
- $i = 0$ (`00`): $0 \oplus 0 = 0$ (`00`)
- $i = 1$ (`01`): $1 \oplus 0 = 1$ (`01`)
- $i = 2$ (`10`): $2 \oplus 1 = 3$ (`11`)
- $i = 3$ (`11`): $3 \oplus 1 = 2$ (`10`)
Output: `[0, 1, 3, 2]`.

---

## Complexity Analysis

- **Time Complexity:** $O(2^n)$ — Generates each of the $2^n$ Gray code numbers in $O(1)$ bitwise operations.
- **Space Complexity:** $O(1)$ auxiliary space (excluding the returned list of $2^n$ elements).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [89gray-code.java](./89gray-code.java) |

---

## Key Learnings

- The formula $i \oplus (i \gg 1)$ is the closed-form bijection between binary numerals and standard reflected Gray codes.
- Knowing algebraic bitwise transformations avoids complex recursive backtracking algorithms entirely.
