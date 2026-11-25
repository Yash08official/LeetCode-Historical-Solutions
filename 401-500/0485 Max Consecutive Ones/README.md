---
comments: true
difficulty: Easy
tags:
  - Array
---

# 485. Max Consecutive Ones

**[View Problem on LeetCode](https://leetcode.com/problems/max-consecutive-ones/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0485` (`485`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

Given a binary array `nums`, return *the maximum number of consecutive *`1`*'s in the array*.

---

## Examples

### Example 1

```text
**Input:** nums = [1,1,0,1,1,1]
**Output:** 3
**Explanation:** The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
```

### Example 2

```text
**Input:** nums = [1,0,1,1,0,1]
**Output:** 2
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `nums[i]` is either `0` or `1`.

---

## Problem Understanding

- Return the maximum number of consecutive `1`s in binary array `nums`.

---

## Approach

### Optimized Approach (Single-Pass Run Counter)
1. Maintain running streak `cnt` and global max `ans`: increment `cnt` on `1` and update `ans`, or reset `cnt = 0` on `0`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [485max-consecutive-ones.java](./485max-consecutive-ones.java) |

---

## Key Learnings

- One linear scan tracks maximal contiguous runs in constant space.
