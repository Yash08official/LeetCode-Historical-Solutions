---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Sorting
---

# 442. Find All Duplicates in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/find-all-duplicates-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0442` (`442`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` of length `n` where all the integers of `nums` are in the range `[1, n]` and each integer appears **at most** **twice**, return *an array of all the integers that appears **twice***.

You must write an algorithm that runs in `O(n)` time and uses only *constant* auxiliary space, excluding the space needed to store the output

---

## Examples

### Example 1

```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
```

### Example 2

```
Input: nums = [1,1,2]
Output: [1]
```

### Example 3

```
Input: nums = [1]
Output: []
```

 

**

---

## Constraints

**

	- `n == nums.length`

	- `1 <= n <= 10^5`

	- `1 <= nums[i] <= n`

	- Each element in `nums` appears **once** or **twice**.

---

## Problem Understanding

- Given an array `nums` of length `n` with values in `[1, n]` where each value appears once or twice, return all values that appear twice in $O(n)$ time and $O(1)$ extra space.

---

## Approach

### Optimized Approach (In-Place Cyclic Sort)
1. For each index `i`, repeatedly swap `nums[i]` into its home index `nums[i] - 1` while `nums[i] != nums[nums[i] - 1]`.
2. After cyclic placement, every distinct value `v` occupies index `v - 1`; any duplicate value is stranded at an index `i` where `nums[i] != i + 1`.
3. Scan `nums` once and collect all `nums[i]` with `nums[i] != i + 1`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — each swap places at least one element into its final position, so at most $n$ swaps occur in total.
- **Space Complexity:** $O(1)$ auxiliary space (excluding output list).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [442find-all-duplicates-in-an-array.java](./442find-all-duplicates-in-an-array.java) |

---

## Key Learnings

- When array values lie in `[1, n]`, cyclic sort turns the array itself into a hash table mapping value `v` to slot `v - 1`.
