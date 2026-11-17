---
comments: true
difficulty: Easy
tags:
  - Array
  - Sliding Window
  - Prefix Sum
---

# 3364. Minimum Positive Sum Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-positive-sum-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3364` (`3364`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Sliding Window`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` and **two** integers `l` and `r`. Your task is to find the **minimum** sum of a **subarray** whose size is between `l` and `r` (inclusive) and whose sum is greater than 0.

Return the **minimum** sum of such a subarray. If no such subarray exists, return -1.

A **subarray** is a contiguous non-empty sequence of elements within an array.

---

## Examples

### Example 1

**Input:** nums = [3, -2, 1, 4], l = 2, r = 3

**Output:** 1

**Explanation:**

The subarrays of length between `l = 2` and `r = 3` where the sum is greater than 0 are:

	
- `[3, -2]` with a sum of 1
	
- `[1, 4]` with a sum of 5
	
- `[3, -2, 1]` with a sum of 2
	
- `[-2, 1, 4]` with a sum of 3

Out of these, the subarray `[3, -2]` has a sum of 1, which is the smallest positive sum. Hence, the answer is 1.

### Example 2

**Input:** nums = [-2, 2, -3, 1], l = 2, r = 3

**Output:** -1

**Explanation:**

There is no subarray of length between `l` and `r` that has a sum greater than 0. So, the answer is -1.

### Example 3

**Input:** nums = [1, 2, 3, 4], l = 2, r = 4

**Output:** 3

**Explanation:**

The subarray `[1, 2]` has a length of 2 and the minimum sum greater than 0. So, the answer is 3.

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 100`
	
- `1 <= l <= r <= nums.length`
	
- `-1000 <= nums[i] <= 1000`

---

## Problem Understanding

- Given an array `nums` and integers `l` and `r`, find the minimum sum of any subarray whose length is between `l` and `r` inclusive and whose sum is strictly positive ($> 0$).
- Return `-1` if no such subarray exists.

---

## Approach

### Optimized Approach (Brute-Force Sliding Window / Running Prefix Accumulation)

1. Iterate start index $i$ from $0$ to $n - 1$.
2. Maintain running sum $s = 0$ as end index $j$ expands from $i$ to $n - 1$:
   - Add `nums[j]` to $s$.
   - Calculate current window length $k = j - i + 1$.
   - If $k \ge l$ and $k \le r$ and $s > 0$:
     - Update minimum answer `ans = min(ans, s)`.
3. If no valid positive sum was found, return `-1`; otherwise return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ — Evaluates all candidate subarrays starting at each index $i$.
- **Space Complexity:** $O(1)$ — Only scalar accumulators used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3364minimum-positive-sum-subarray.java](./3364minimum-positive-sum-subarray.java) |

---

## Key Learnings

- Direct running sum accumulation avoids re-summing subarrays and stays within time limits for standard contest constraints.
