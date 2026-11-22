---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Divide and Conquer
  - Sorting
  - Heap (Priority Queue)
  - Bucket Sort
  - Counting
  - Quickselect
---

# 347. Top K Frequent Elements

**[View Problem on LeetCode](https://leetcode.com/problems/top-k-frequent-elements/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0347` (`347`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Divide and Conquer`, `Sorting`, `Heap (Priority Queue)`, `Bucket Sort`, `Counting`, `Quickselect` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and an integer `k`, return *the* `k` *most frequent elements*. You may return the answer in **any order**.

---

## Examples

### Example 1

**Input:** nums = [1,1,1,2,2,3], k = 2

**Output:** [1,2]

### Example 2

**Input:** nums = [1], k = 1

**Output:** [1]

### Example 3

**Input:** nums = [1,2,1,2,1,2,3,1,3,2], k = 2

**Output:** [1,2]

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `-10^4 <= nums[i] <= 10^4`
	
- `k` is in the range `[1, the number of unique elements in the array]`.
	
- It is **guaranteed** that the answer is **unique**.

 

**Follow up:** Your algorithm's time complexity must be better than `O(n log n)`, where n is the array's size.

---

## Problem Understanding

- Return the `k` most frequent elements in `nums`.

---

## Approach

### Optimized Approach (Frequency Map + Size-k Min-Heap)
1. Count occurrences of each element in `Map<Integer, Integer> cnt`.
2. Maintain a min-heap `pq` ordered by frequency; for each entry, offer it and poll whenever `pq.size() > k`.
3. Extract keys from the remaining `k` heap entries.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log k)$ — Bounded min-heap of size `k`.\n- **Space Complexity:** $O(n)$ for frequency map.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [347top-k-frequent-elements.java](./347top-k-frequent-elements.java) |

---

## Key Learnings

- Keeping a min-heap capped at size `k` evicts low-frequency elements in $O(\log k)$, outperforming full $O(n \log n)$ sorting.
