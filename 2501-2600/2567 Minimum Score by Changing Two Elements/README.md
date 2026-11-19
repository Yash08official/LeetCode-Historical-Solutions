---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Sorting
---

# 2567. Minimum Score by Changing Two Elements

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-score-by-changing-two-elements/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2567` (`2567`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`.

	
- The **low** score of `nums` is the **minimum** absolute difference between any two integers.
	
- The **high** score of `nums` is the **maximum** absolute difference between any two integers.
	
- The **score** of `nums` is the sum of the **high** and **low** scores.

Return the **minimum score** after **changing two elements** of `nums`.

---

## Examples

### Example 1

**Input:** nums = [1,4,7,8,5]

**Output:** 3

**Explanation:**

	
- Change `nums[0]` and `nums[1]` to be 6 so that `nums` becomes [6,6,7,8,5].
	
- The low score is the minimum absolute difference: |6 - 6| = 0.
	
- The high score is the maximum absolute difference: |8 - 5| = 3.
	
- The sum of high and low score is 3.

### Example 2

**Input:** nums = [1,4,3]

**Output:** 0

**Explanation:**

	
- Change `nums[1]` and `nums[2]` to 1 so that `nums` becomes [1,1,1].
	
- The sum of maximum absolute difference and minimum absolute difference is 0.

 

**

---

## Constraints

**

	
- `3 <= nums.length <= 10^5`
	
- `1 <= nums[i] <= 10^9`

---

## Problem Understanding

- The score of `nums` is `low + high`, where `low` is the minimum absolute difference between any two distinct indices and `high` is the maximum absolute difference (`max(nums) - min(nums)`).
- We may change at most 2 elements to any value. Notice that changing any element to match an existing remaining element immediately makes `low = 0`. Thus the problem reduces to minimizing `high` after effectively removing 2 extreme elements.

---

## Approach

### Optimized Approach (Sorting + Greedy 3-Case Extreme Removal)
1. Sort `nums` in ascending order.
2. Removing (reassigning to an interior value) 2 extreme elements leaves 3 optimal possibilities for the remaining `[min, max]` span:
   - Remove the 2 largest elements: `a = nums[n - 3] - nums[0]`.
   - Remove 1 smallest and 1 largest element: `b = nums[n - 2] - nums[1]`.
   - Remove the 2 smallest elements: `c = nums[n - 1] - nums[2]`.
3. In all 3 cases, setting the 2 changed elements equal to a remaining element guarantees `low = 0`.
4. Return `Math.min(a, Math.min(b, c))`.

### Dry Run (`nums = [1,4,7,8,5]`)
- Sorted: `[1, 4, 5, 7, 8]`, `n = 5`.
- `a = nums[2] - nums[0] = 5 - 1 = 4`.
- `b = nums[3] - nums[1] = 7 - 4 = 3`.
- `c = nums[4] - nums[2] = 8 - 5 = 3`.
- Minimum is `3`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — Dominated by sorting `nums`.
- **Space Complexity:** $O(\log n)$ — Built-in Dual-Pivot Quicksort stack space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2567minimum-score-by-changing-two-elements.java](./2567minimum-score-by-changing-two-elements.java) |

---

## Key Learnings

- When up to $k$ elements can be freely reassigned, matching them to an existing element collapses `low` to `0`, reducing the objective purely to shrinking the sorted range by removing $k$ elements from the two ends.
