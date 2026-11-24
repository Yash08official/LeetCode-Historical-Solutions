---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Sliding Window
---

# 413. Arithmetic Slices

**[View Problem on LeetCode](https://leetcode.com/problems/arithmetic-slices/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0413` (`413`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

An integer array is called arithmetic if it consists of **at least three elements** and if the difference between any two consecutive elements is the same.

	
- For example, `[1,3,5,7,9]`, `[7,7,7,7]`, and `[3,-1,-5,-9]` are arithmetic sequences.

Given an integer array `nums`, return *the number of arithmetic **subarrays** of* `nums`.

A **subarray** is a contiguous subsequence of the array.

---

## Examples

### Example 1

```text
**Input:** nums = [1,2,3,4]
**Output:** 3
**Explanation:** We have 3 arithmetic slices in nums: [1, 2, 3], [2, 3, 4] and [1,2,3,4] itself.
```

### Example 2

```text
**Input:** nums = [1]
**Output:** 0
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 5000`
	
- `-1000 <= nums[i] <= 1000`

---

## Problem Understanding

- Count all contiguous subarrays of length $\ge 3$ whose consecutive differences are equal.

---

## Approach

### Optimized Approach (Consecutive Difference Run Counter)
1. Track current difference `d` and consecutive matching-difference count `cnt`.
2. When `nums[i + 1] - nums[i] == d`, increment `cnt`; otherwise reset `d` and `cnt = 0`.
3. Add `cnt` to `ans` at every step (each extension creates `cnt` new valid slices ending at `i + 1`).

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [413arithmetic-slices.java](./413arithmetic-slices.java) |

---

## Key Learnings

- Extending a constant-difference run by 1 element adds `cnt` new arithmetic subarrays ending at that index.
