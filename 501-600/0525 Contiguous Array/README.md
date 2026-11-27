---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Prefix Sum
---

# 525. Contiguous Array

**[View Problem on LeetCode](https://leetcode.com/problems/contiguous-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0525` (`525`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given a binary array `nums`, return *the maximum length of a contiguous subarray with an equal number of *`0`* and *`1`.

---

## Examples

### Example 1

```
Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
```

### Example 2

```
Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
```

### Example 3

```
Input: nums = [0,1,1,1,1,1,0,0,0]
Output: 6
Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 10^5`

	- `nums[i]` is either `0` or `1`.

---

## Problem Understanding

- Find the maximum length of a contiguous binary subarray containing equal numbers of `0`s and `1`s.

---

## Approach

### Optimized Approach (Zero-to-Minus-One Prefix Sum + Earliest Index Map)
1. Map `1 -> +1` and `0 -> -1` in running prefix sum `s` so equal counts correspond to a zero-sum subarray (`s[r] == s[l]`).
2. Seed `d.put(0, -1)` so a balanced prefix starting at index `0` is handled uniformly.
3. For each index `i`, if `s` already appears in `d`, update `ans = Math.max(ans, i - d.get(s))`; otherwise record `d.put(s, i)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — single pass over `nums`.
- **Space Complexity:** $O(n)$ for the prefix-balance map `d`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [525contiguous-array.java](./525contiguous-array.java) |

---

## Key Learnings

- Encoding `0` as `-1` transforms equal-count subarray problems into standard zero-sum subarray length maximization.
