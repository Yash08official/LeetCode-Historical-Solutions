---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Sorting
---

# 217. Contains Duplicate

**[View Problem on LeetCode](https://leetcode.com/problems/contains-duplicate/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0217` (`217`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

---

## Examples

### Example 1

**Input:** nums = [1,2,3,1]

**Output:** true

**Explanation:**

The element 1 occurs at the indices 0 and 3.

### Example 2

**Input:** nums = [1,2,3,4]

**Output:** false

**Explanation:**

All elements are distinct.

### Example 3

**Input:** nums = [1,1,1,3,3,4,3,2,4,2]

**Output:** true

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `-10^9 <= nums[i] <= 10^9`

---

## Problem Understanding

- Return `true` if any value appears at least twice in `nums`, and `false` if all elements are distinct.

---

## Approach

### Optimized Approach (Hash Set Cardinality Comparison)
1. Insert all elements of `nums` into a JavaScript `Set`.
2. Compare `new Set(nums).size !== nums.length`; any duplicate shrinks the set size below the array length.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass to construct the `Set`.\n- **Space Complexity:** $O(n)$ — Up to $n$ distinct elements stored in the `Set`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [217contains-duplicate.js](./217contains-duplicate.js) |

---

## Key Learnings

- Comparing `Set.size` to `array.length` is a concise $O(n)$ duplicate check in JavaScript.
