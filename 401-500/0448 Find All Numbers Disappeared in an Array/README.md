---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
---

# 448. Find All Numbers Disappeared in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0448` (`448`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | Java |

---

## Problem Description

Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return *an array of all the integers in the range* `[1, n]` *that do not appear in* `nums`.

---

## Examples

### Example 1

```text
**Input:** nums = [4,3,2,7,8,2,3,1]
**Output:** [5,6]
```

### Example 2

```text
**Input:** nums = [1,1]
**Output:** [2]
```

 

**

---

## Constraints

**

	
- `n == nums.length`
	
- `1 <= n <= 10^5`
	
- `1 <= nums[i] <= n`

 

**Follow up:** Could you do it without extra space and in `O(n)` runtime? You may assume the returned list does not count as extra space.

---

## Problem Understanding

- Given `nums` of length `n` with values in `[1, n]`, return all integers in `[1, n]` that do not appear in `nums` using $O(1)$ extra space.

---

## Approach

### Optimized Approach (In-Place Sign-Negation Indexing)
1. For each `x` in `nums`, mark index `i = Math.abs(x) - 1` as seen by negating `nums[i]` if positive.
2. Collect all `i + 1` whose `nums[i]` remains positive.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$ auxiliary (in-place sign flags).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [448find-all-numbers-disappeared-in-an-array.java](./448find-all-numbers-disappeared-in-an-array.java) |

---

## Key Learnings

- Using the sign bit of `nums[val - 1]` turns the input array itself into a zero-extra-memory presence bitset.
