---
comments: true
difficulty: Easy
tags:
  - Array
  - Math
  - Sliding Window
  - Enumeration
  - Number Theory
---

# 3411. Maximum Subarray With Equal Products

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-subarray-with-equal-products/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3411` (`3411`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Math`, `Sliding Window`, `Enumeration`, `Number Theory` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of **positive** integers `nums`.

An array `arr` is called **product equivalent** if `prod(arr) == lcm(arr) * gcd(arr)`, where:

	
- `prod(arr)` is the product of all elements of `arr`.
	
- `gcd(arr)` is the GCD of all elements of `arr`.
	
- `lcm(arr)` is the LCM of all elements of `arr`.

Return the length of the **longest** **product equivalent** subarray of `nums`.

---

## Examples

### Example 1

**Input:** nums = [1,2,1,2,1,1,1]

**Output:** 5

**Explanation:** 

The longest product equivalent subarray is `[1, 2, 1, 1, 1]`, where `prod([1, 2, 1, 1, 1]) = 2`, `gcd([1, 2, 1, 1, 1]) = 1`, and `lcm([1, 2, 1, 1, 1]) = 2`.

### Example 2

**Input:** nums = [2,3,4,5,6]

**Output:** 3

**Explanation:** 

The longest product equivalent subarray is `[3, 4, 5].`

### Example 3

**Input:** nums = [1,2,3,1,4,5,1]

**Output:** 5

 

**

---

## Constraints

**

	
- `2 <= nums.length <= 100`
	
- `1 <= nums[i] <= 10`

---

## Problem Understanding

- Find the maximum length of a contiguous subarray whose product equals `gcd(subarray) * lcm(subarray)`.

---

## Approach

### Optimized Approach (Bounded Subarray Enumeration with Product Cutoff)
1. Precompute `mx = max(nums)` and `ml = lcm(nums)`. Since `gcd * lcm <= mx * ml`, any subarray whose running product `p` exceeds `maxP = ml * mx` can never satisfy `p == g * l`.
2. For each start index `i`, extend `j` maintaining running product `p`, `g = gcd(g, nums[j])`, and `l = lcm(l, nums[j])`; update `ans` when `p == g * l` and break immediately when `p > maxP`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log(\max))$ amortized (inner loop breaks quickly once `p > maxP`).\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3411maximum-subarray-with-equal-products.java](./3411maximum-subarray-with-equal-products.java) |

---

## Key Learnings

- Bounding `p <= max(nums) * lcm(nums)` prevents integer overflow and prunes the inner scan early.
