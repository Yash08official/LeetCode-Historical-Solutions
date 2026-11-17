---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
---

# 137. Single Number II

**[View Problem on LeetCode](https://leetcode.com/problems/single-number-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0137` (`137`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums` where every element appears **three times** except for one, which appears **exactly once**. *Find the single element and return it*.

You must implement a solution with a linear runtime complexity and use only constant extra space.

---

## Examples

### Example 1

```text
**Input:** nums = [2,2,3,2]
**Output:** 3
```

### Example 2

```text
**Input:** nums = [0,1,0,1,0,1,99]
**Output:** 99
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 3 * 10^4`
	
- `-2^31 <= nums[i] <= 2^31 - 1`
	
- Each element in `nums` appears exactly **three times** except for one element which appears **once**.

---

## Problem Understanding

- Every element appears three times except for one unique element that appears exactly once.
- We must find the unique element in $O(n)$ time and $O(1)$ extra space.

---

## Approach

### Optimized Approach (Digital Logic Bitwise State Machine)

1. Model the count of 1-bits at each position modulo 3 using two integer variables: `ans` (representing bits appearing $1 \pmod 3$) and `acc` (representing bits appearing $2 \pmod 3$).
2. For each number `x` in `nums`:
   - `ans = ans ^ (x & ~acc)`: update bits that transition from 0 to 1, provided they are not already counted in `acc`.
   - `acc = acc ^ (x & ~ans)`: update bits that transition from 1 to 2, using the updated `ans` state.
3. Bits appearing 3 times reset automatically to 0 in both variables.
4. After processing all numbers, `ans` holds the bits of the element appearing exactly once.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass through the input array.
- **Space Complexity:** $O(1)$ — Only two integer state variables used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [137single-number-ii.js](./137single-number-ii.js) |

---

## Key Learnings

- Bitwise Karnaugh maps / finite-state automata allow counting modulo $k$ using $\lceil\log_2 kceil$ bitmask accumulators.
