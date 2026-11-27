---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Math
  - Prefix Sum
  - Pigeonhole Principle
---

# 523. Continuous Subarray Sum

**[View Problem on LeetCode](https://leetcode.com/problems/continuous-subarray-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0523` (`523`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Prefix Sum`, `Pigeonhole Principle` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array nums and an integer k, return `true` *if *`nums`* has a **good subarray** or *`false`* otherwise*.

A **good subarray** is a subarray where:

	- its length is **at least two**, and

	- the sum of the elements of the subarray is a multiple of `k`.

**Note** that:

	- A **subarray** is a contiguous part of the array.

	- An integer `x` is a multiple of `k` if there exists an integer `n` such that `x = n * k`. `0` is **always** a multiple of `k`.

---

## Examples

### Example 1

```
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
```

### Example 2

```
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
```

### Example 3

```
Input: nums = [23,2,6,4,7], k = 13
Output: false
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 10^5`

	- `0 <= nums[i] <= 10^9`

	- `0 <= sum(nums[i]) <= 2^31 - 1`

	- `1 <= k <= 2^31 - 1`

---

## Problem Understanding

- Determine whether `nums` contains a contiguous subarray of length at least `2` whose sum is a multiple of `k`.

---

## Approach

### Optimized Approach (Prefix Sum Modulo + Earliest Index Map)
1. Maintain running prefix sum modulo `k`: `s = (s + nums[i]) % k`, seeded with `d.put(0, -1)`.
2. Two indices whose prefix sums share the same remainder modulo `k` bound a subarray divisible by `k`.
3. Only insert `d.put(s, i)` when `s` is unseen (to keep the earliest index and maximize subarray length); if `s` already exists and `i - d.get(s) > 1`, return `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — single pass over `nums`.
- **Space Complexity:** $O(\min(n, k))$ for the remainder-to-first-index map `d`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [523continuous-subarray-sum.java](./523continuous-subarray-sum.java) |

---

## Key Learnings

- Keeping only the *first* occurrence of each prefix remainder simultaneously enables subarray length checks (`>= 2`) without storing index lists.
