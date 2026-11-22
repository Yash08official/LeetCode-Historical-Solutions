---
comments: true
difficulty: Medium
tags:
  - Array
  - Divide and Conquer
  - Greedy
  - Sorting
  - Quickselect
---

# 324. Wiggle Sort II

**[View Problem on LeetCode](https://leetcode.com/problems/wiggle-sort-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0324` (`324`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Divide and Conquer`, `Greedy`, `Sorting`, `Quickselect` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, reorder it such that `nums[0] < nums[1] > nums[2] < nums[3]...`.

You may assume the input array always has a valid answer.

---

## Examples

### Example 1

```text
**Input:** nums = [1,5,1,1,6,4]
**Output:** [1,6,1,5,1,4]
**Explanation:** [1,4,1,5,1,6] is also accepted.
```

### Example 2

```text
**Input:** nums = [1,3,2,2,3,1]
**Output:** [2,3,1,3,1,2]
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 5 * 10^4`
	
- `0 <= nums[i] <= 5000`
	
- It is guaranteed that there will be an answer for the given input `nums`.

 

**Follow Up:** Can you do it in `O(n)` time and/or **in-place** with `O(1)` extra space?

---

## Problem Understanding

- Reorder `nums` in-place so `nums[0] < nums[1] > nums[2] < nums[3] ...`.

---

## Approach

### Optimized Approach (Counting Bucket Sort + Descending Interleaved Placement)
1. Count value frequencies in `bucket[0..5000]`.
2. Fill odd indices (`1, 3, 5, ...`) first with the largest values descending from `5000`, then fill even indices (`0, 2, 4, ...`) with the remaining smaller values descending.
3. Placing largest-to-smallest in odd then even positions maximizes separation between equal values.

---

## Complexity Analysis

- **Time Complexity:** $O(n + M)$ where $M = 5000$.\n- **Space Complexity:** $O(M)$ for counting bucket array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [324wiggle-sort-ii.java](./324wiggle-sort-ii.java) |

---

## Key Learnings

- Filling peaks (odd indices) then valleys (even indices) in descending order prevents identical median elements from landing adjacent.
