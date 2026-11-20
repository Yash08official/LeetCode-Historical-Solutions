---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Sliding Window
---

# 219. Contains Duplicate II

**[View Problem on LeetCode](https://leetcode.com/problems/contains-duplicate-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0219` (`219`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Sliding Window` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums` and an integer `k`, return `true` *if there are two **distinct indices** *`i`* and *`j`* in the array such that *`nums[i] == nums[j]`* and *`abs(i - j) <= k`.

---

## Examples

### Example 1

```text
**Input:** nums = [1,2,3,1], k = 3
**Output:** true
```

### Example 2

```text
**Input:** nums = [1,0,1,1], k = 1
**Output:** true
```

### Example 3

```text
**Input:** nums = [1,2,3,1,2,3], k = 2
**Output:** false
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `-10^9 <= nums[i] <= 10^9`
	
- `0 <= k <= 10^5`

---

## Problem Understanding

- Determine if there exist two distinct indices `i` and `j` with `nums[i] == nums[j]` and `|i - j| <= k`.

---

## Approach

### Optimized Approach (Hash Map of Last-Seen Indices)
1. Maintain a `Map` `d` mapping each value to its most recent index.
2. For each index `i`, if `d.has(nums[i])` and `i - d.get(nums[i]) <= k`, return `true`.
3. Update `d.set(nums[i], i)` so future duplicates always check against the closest prior index.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass with $O(1)$ average map lookups.\n- **Space Complexity:** $O(n)$ — Hash map storing seen values.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [219contains-duplicate-ii.js](./219contains-duplicate-ii.js) |

---

## Key Learnings

- Only the latest occurrence of each value needs to be tracked to minimize index distance `i - j`.
