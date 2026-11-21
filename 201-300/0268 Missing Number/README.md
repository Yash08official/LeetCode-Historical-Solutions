---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Math
  - Binary Search
  - Bit Manipulation
  - Sorting
---

# 268. Missing Number

**[View Problem on LeetCode](https://leetcode.com/problems/missing-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0268` (`268`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Binary Search`, `Bit Manipulation`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return *the only number in the range that is missing from the array.*

---

## Examples

### Example 1

**Input:** nums = [3,0,1]

**Output:** 2

**Explanation:**

`n = 3` since there are 3 numbers, so all numbers are in the range `[0,3]`. 2 is the missing number in the range since it does not appear in `nums`.

### Example 2

**Input:** nums = [0,1]

**Output:** 2

**Explanation:**

`n = 2` since there are 2 numbers, so all numbers are in the range `[0,2]`. 2 is the missing number in the range since it does not appear in `nums`.

### Example 3

**Input:** nums = [9,6,4,2,3,5,7,0,1]

**Output:** 8

**Explanation:**

`n = 9` since there are 9 numbers, so all numbers are in the range `[0,9]`. 8 is the missing number in the range since it does not appear in `nums`.

 

 

 

 

 

**

---

## Constraints

**

	
- `n == nums.length`
	
- `1 <= n <= 10^4`
	
- `0 <= nums[i] <= n`
	
- All the numbers of `nums` are **unique**.

 

**Follow up:** Could you implement a solution using only `O(1)` extra space complexity and `O(n)` runtime complexity?

---

## Problem Understanding

- Given `n` distinct numbers in `[0, n]`, find the single missing number.

---

## Approach

### Optimized Approach (Running Index-Value Difference Sum)
1. Initialize `ans = n`.
2. For each index `i` from `0` to `n - 1`, accumulate `ans += i - nums[i]`.
3. Every present number cancels with its corresponding index, leaving the missing number in `ans` without risking integer overflow.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [268missing-number.js](./268missing-number.js) |

---

## Key Learnings

- Accumulating `i - nums[i]` avoids computing `n * (n + 1) / 2` upfront and prevents intermediate overflow.
