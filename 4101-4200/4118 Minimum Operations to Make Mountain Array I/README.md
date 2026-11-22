---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 4118. Minimum Operations to Make Mountain Array I

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-operations-to-make-mountain-array-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4118` (`4118`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` of length `n`.

In one operation, you may **increment** or **decrement** any element of `nums` by 1.

All elements of `nums` must remain **positive** (**at least** 1) after every operation.

An array is called a **mountain array** if there exists an index `peak` such that `0 < peak < n - 1` and:

	
- `nums[0] < nums[1] < ... < nums[peak]`
	
- `nums[peak] > nums[peak + 1] > ... > nums[n - 1]`

Return the **minimum** number of operations required to transform `nums` into a mountain array. If it is impossible, return -1.

---

## Examples

### Example 1

**Input:** nums = [2,2,3]

**Output:** 2

**Explanation:**

​​​​​​​One optimal way is to:

	
- Increment `nums[1]` by 1 and decrement `nums[2]` by 1.
	
- The resulting array is `[2, 3, 2]`, which is a mountain array with `peak = 1`.
	
- Therefore, the total number of operations is `1 + 1 = 2`.

### Example 2

**Input:** nums = [9,4,9]

**Output:** 6

**Explanation:**

One optimal way is to:

	
- Increment `nums[1]` by 1 six times.
	
- The resulting array is `[9, 10, 9]`, which is a mountain array with `peak = 1`.
	
- Therefore, the total number of operations is 6.

### Example 3

**Input:** nums = [5,7,7,4]

**Output:** 1

**Explanation:**

One optimal way is to:

	
- Decrement `nums[1]` by 1.
	
- The resulting array is `[5, 6, 7, 4]`, which is a mountain array with `peak = 2`.
	
- Therefore, the total number of operations is 1.

### Example 4

**Input:** nums = [1,2]

**Output:** -1

**Explanation:**

A mountain array must have a peak with at least one element on each side. Since `n = 2` and operations do not change the array's length, forming a mountain array is impossible.

 

**

---

## Constraints

**

	
- `1 <= n == nums.length <= 1000`
	
- `1 <= nums[i] <= 1000`

---

## Problem Understanding

- Transform `nums` into a strictly mountain array (strictly increasing up to a peak `i` with `1 <= i <= n - 2`, then strictly decreasing) using minimum total unit increment/decrement cost.

---

## Approach

### Optimized Approach (Prefix/Suffix Value-Indexed Dynamic Programming)
1. If `n < 3`, a mountain array is impossible; return `-1`.
2. Let `limit = max(nums) + n` be the upper bound on any optimal target value.
3. Compute `left[i][v]`: minimum cost to make `nums[0..i]` strictly increasing ending at value `v`, using a running prefix minimum `best = min(best, left[i - 1][v - 1])` in $O(1)$ per state.
4. Symmetrically compute `right[i][v]`: minimum cost to make `nums[i..n - 1]` strictly decreasing starting at value `v`.
5. For every valid peak `(i, v)` (`1 <= i <= n - 2`), combine `left[i][v] + right[i][v] - |nums[i] - v|` (subtracting double-counted peak cost) and return the global minimum.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot (\max + n))$ — Prefix-min transition optimizes each DP state to $O(1)$.\n- **Space Complexity:** $O(n \cdot (\max + n))$ for `left` and `right` tables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4118minimum-operations-to-make-mountain-array-i.java](./4118minimum-operations-to-make-mountain-array-i.java) |

---

## Key Learnings

- Prefix-minimum sweeps reduce strict-inequality DP transitions from $O(V^2)$ to $O(V)$ per index, and combining prefix + suffix DP cleanly solves peak-based mountain problems.
