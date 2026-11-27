---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Bit Manipulation
---

# 477. Total Hamming Distance

**[View Problem on LeetCode](https://leetcode.com/problems/total-hamming-distance/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0477` (`477`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given an integer array `nums`, return *the sum of **Hamming distances** between all the pairs of the integers in* `nums`.

---

## Examples

### Example 1

```
Input: nums = [4,14,2]
Output: 6
Explanation: In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just
showing the four bits relevant in this case).
The answer will be:
HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
```

### Example 2

```
Input: nums = [4,14,4]
Output: 4
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 10^4`

	- `0 <= nums[i] <= 10^9`

	- The answer for the given input will fit in a **32-bit** integer.

---

## Problem Understanding

- Compute the sum of Hamming distances (number of differing bit positions) over all unordered pairs `(nums[i], nums[j])` with `i < j`.

---

## Approach

### Optimized Approach (Bit-Position Contribution Counting)
1. Because bit positions are independent, process each bit position `i` from `0` to `31` separately.
2. Count `a` = number of elements in `nums` with bit `i` set (`(x >> i) & 1`), leaving `b = n - a` elements with bit `i` unset.
3. Exactly `a * b` pairs differ at bit `i`; sum `a * b` across all 32 bit positions.

---

## Complexity Analysis

- **Time Complexity:** $O(32 \cdot n) = O(n)$.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [477total-hamming-distance.java](./477total-hamming-distance.java) |

---

## Key Learnings

- Decomposing pairwise bitwise sums by bit position turns an $O(n^2)$ pair enumeration into $O(32n)$ linear counting.
