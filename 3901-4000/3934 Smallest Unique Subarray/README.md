---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Binary Search
  - Rolling Hash
  - Suffix Array
  - Hash Function
---

# 3934. Smallest Unique Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/smallest-unique-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3934` (`3934`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Binary Search`, `Rolling Hash`, `Suffix Array`, `Hash Function` |
| **Solution Language** | Python 3 |

---

## Problem Description

You are given an integer array `nums`.

Find the **minimum **length of a subarray that is **not** **identical** to any other **subarray** in `nums`.

Return an integer denoting the **minimum possible length** of such a **subarray**.

Two **subarrays** are considered identical if they have the same length and the same elements in corresponding positions.

---

## Examples

### Example 1

**Input:** nums = [3,3,3]

**Output:** 3

**Explanation:**

	
- Subarrays of length 1: `[3]` → appears 3 times
	
- Subarrays of length 2: `[3, 3]` → appears 2 times
	
- Subarrays of length 3: `[3, 3, 3]` → appears once

The subarray `[3, 3, 3]` is unique, so the smallest unique subarray length is 3.

### Example 2

**Input:** nums = [2,1,2,3,3]

**Output:** 1

**Explanation:**

Subarrays of length 1:

	
- `[2]` → appears 2 times
	
- `[1]` → appears once
	
- `[3]` → appears 2 times

The subarray `[1]` is unique, so the smallest unique subarray length is 1.

### Example 3

**Input:** nums = [1,1,2,2,1]

**Output:** 2

**Explanation:**

Subarrays of length 1:

	
- `[1]` → appears 3 times
	
- `[2]` → appears 2 times

Subarrays of length 2:

	
- `[1, 1]` → appears once
	
- `[1, 2]` → appears once
	
- `[2, 2]` → appears once
	
- `[2, 1]` → appears once

There is at least one subarray of length 2 that is unique, so the smallest unique subarray length is 2.

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `1 <= nums[i] <= 10^5`

---

## Problem Understanding

- Find the minimum length of a contiguous subarray in `nums` that occurs **exactly once** in `nums`.

---

## Approach

### Optimized Approach (Binary Search on Length + Polynomial Rolling Hash)
1. Monotonicity: if a unique subarray of length `L` exists, then extending it also yields a unique subarray of any length `> L`.
2. Binary search `mid_len` in `[1, n]`.
3. In `_check_uniqueness(subarray_len)`, compute polynomial rolling hashes (`base = 19`, `mod = 10^9 + 7`) for all contiguous windows of length `subarray_len`, counting occurrences in `self.hash_values`.
4. Return `True` iff at least one hash has frequency `1` (`1 in self.hash_values.values()`).

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — $O(\log n)$ binary search iterations, each doing an $O(n)$ rolling-hash sweep.\n- **Space Complexity:** $O(n)$ for power table and hash frequency dictionary.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Python 3** | [3934smallest-unique-subarray.py](./3934smallest-unique-subarray.py) |

---

## Key Learnings

- Combining binary search on subarray length with $O(1)$-update polynomial rolling hashes solves unique-subarray minimization cleanly in $O(n \log n)$.
