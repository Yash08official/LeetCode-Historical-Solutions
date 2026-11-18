---
comments: true
difficulty: Easy
tags:
  - Divide and Conquer
  - Bit Manipulation
---

# 190. Reverse Bits

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-bits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0190` (`190`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Divide and Conquer`, `Bit Manipulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Reverse bits of a given 32 bits signed integer.

---

## Examples

### Example 1

**Input:** n = 43261596

**Output:** 964176192

**Explanation:**

	
		
			Integer
			Binary
		
		
			43261596
			00000010100101000001111010011100
		
		
			964176192
			00111001011110000010100101000000
		
	

### Example 2

**Input:** n = 2147483644

**Output:** 1073741822

**Explanation:**

	
		
			Integer
			Binary
		
		
			2147483644
			01111111111111111111111111111100
		
		
			1073741822
			00111111111111111111111111111110
		
	

 

**

---

## Constraints

**

	
- `0 <= n <= 2^31 - 2`
	
- `n` is even.

 

**Follow up:** If this function is called many times, how would you optimize it?

---

## Problem Understanding

- Reverse bits of a given 32-bit unsigned integer.

---

## Approach

### Optimized Approach (Bitwise Shift & Masking)

1. Initialize `ans = 0`.
2. Loop $i$ from 0 to 31:
   - Extract the lowest bit: `n & 1`.
   - Shift it to position $31 - i$: `(n & 1) << (31 - i)`.
   - Bitwise OR into `ans`.
   - Shift `n` right by 1: `n >>= 1`.
3. In JavaScript, convert to 32-bit unsigned integer using zero-fill right shift: `ans >>> 0`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ — Exactly 32 constant iterations.
- **Space Complexity:** $O(1)$ — Single integer accumulator.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [190reverse-bits.js](./190reverse-bits.js) |

---

## Key Learnings

- In JavaScript, bitwise operators treat operands as 32-bit signed integers; applying `>>> 0` forces conversion to unsigned 32-bit integer representation.
