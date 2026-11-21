---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Bit Manipulation
  - Pigeonhole Principle
  - Floyd's Cycle Finding Algorithm
---

# 287. Find the Duplicate Number

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-duplicate-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0287` (`287`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Bit Manipulation`, `Pigeonhole Principle`, `Floyd's Cycle Finding Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.

There is only **one repeated number** in `nums`, return *this repeated number*.

You must solve the problem **without** modifying the array `nums` and using only constant extra space.

---

## Examples

### Example 1

```text
**Input:** nums = [1,3,4,2,2]
**Output:** 2
```

### Example 2

```text
**Input:** nums = [3,1,3,4,2]
**Output:** 3
```

### Example 3

```text
**Input:** nums = [3,3,3,3,3]
**Output:** 3
```

 

**

---

## Constraints

**

	
- `1 <= n <= 10^5`
	
- `nums.length == n + 1`
	
- `1 <= nums[i] <= n`
	
- All the integers in `nums` appear only **once** except for **precisely one integer** which appears **two or more** times.

 

Follow up:

	
- How can we prove that at least one duplicate number must exist in `nums`?
	
- Can you solve the problem in linear runtime complexity?

---

## Problem Understanding

- Find the single repeated number in an array of `n + 1` integers in `[1, n]` without modifying `nums` and using $O(1)$ extra space.

---

## Approach

### Optimized Approach (Binary Search on Value Range — Pigeonhole Principle)
1. Binary search value range `[l = 0, r = n - 1]`.
2. Count how many elements in `nums` satisfy `v <= mid`.
3. By the Pigeonhole Principle, if `cnt > mid`, the duplicate must lie in `[l, mid]` (`r = mid`); otherwise it lies in `[mid + 1, r]` (`l = mid + 1`).
4. Return `l`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — $O(\log n)$ value bisections, each scanning `nums` in $O(n)$.
- **Space Complexity:** $O(1)$ — Read-only on `nums`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [287find-the-duplicate-number.java](./287find-the-duplicate-number.java) |

---

## Key Learnings

- The Pigeonhole Principle induces a monotonic prefix count over `[1, n]`, enabling read-only binary search in $O(1)$ space.
