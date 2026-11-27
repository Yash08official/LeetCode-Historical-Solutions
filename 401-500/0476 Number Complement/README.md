---
comments: true
difficulty: Easy
tags:
  - Bit Manipulation
---

# 476. Number Complement

**[View Problem on LeetCode](https://leetcode.com/problems/number-complement/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0476` (`476`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

The **complement** of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.

	- For example, The integer `5` is `"101"` in binary and its **complement** is `"010"` which is the integer `2`.

Given an integer `num`, return *its complement*.

---

## Examples

### Example 1

```
Input: num = 5
Output: 2
Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.
```

### Example 2

```
Input: num = 1
Output: 0
Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.
```

 

**

---

## Constraints

**

	- `1 <= num < 2^31`

 

**Note:** This question is the same as 1009: https://leetcode.com/problems/complement-of-base-10-integer/

---

## Problem Understanding

- Return the bitwise complement of a positive integer `num` by flipping only the bits from its most significant `1`-bit down to bit `0` (ignoring leading zeros).

---

## Approach

### Optimized Approach (Bit-Length Mask via `Integer.numberOfLeadingZeros`)
1. Compute the exact bit length of `num` as `32 - Integer.numberOfLeadingZeros(num)`.
2. Construct an all-ones mask of that bit length: `(1 << (32 - Integer.numberOfLeadingZeros(num))) - 1`.
3. XOR `num` with the mask to flip all active bits in $O(1)$ time.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [476number-complement.java](./476number-complement.java) |

---

## Key Learnings

- `Integer.numberOfLeadingZeros(num)` computes the highest set bit position in a single CPU instruction (`LZCNT`/`BSR`), enabling a one-line mask-and-XOR solution.
