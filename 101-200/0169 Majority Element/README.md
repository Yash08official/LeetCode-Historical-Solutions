---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Divide and Conquer
  - Sorting
  - Counting
  - Boyer–Moore Majority Vote Algorithm
---

# 169. Majority Element

**[View Problem on LeetCode](https://leetcode.com/problems/majority-element/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0169` (`169`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Divide and Conquer`, `Sorting`, `Counting`, `Boyer–Moore Majority Vote Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

Given an array `nums` of size `n`, return *the majority element*.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

---

## Examples

### Example 1

```text
**Input:** nums = [3,2,3]
**Output:** 3
```

### Example 2

```text
**Input:** nums = [2,2,1,1,1,2,2]
**Output:** 2
```

 

**

---

## Constraints

**

	
- `n == nums.length`
	
- `1 <= n <= 5 * 10^4`
	
- `-10^9 <= nums[i] <= 10^9`
	
- The input is generated such that a majority element will exist in the array.

 

**Follow-up:** Could you solve the problem in linear time and in `O(1)` space?

---

## Problem Understanding

- Given an array `nums` of size $n$, return the majority element that appears strictly more than $\lfloor n / 2 floor$ times.
- Target linear time $O(n)$ and constant space $O(1)$.

---

## Approach

### Optimized Approach (Boyer–Moore Majority Vote Algorithm)

1. Maintain candidate majority element `m` and count tracker `cnt = 0`.
2. Iterate through each element `x` in `nums`:
   - If `cnt == 0`, assign current element `m = x` and set `cnt = 1`.
   - Otherwise, if `m == x`, increment `cnt += 1`.
   - If `m != x`, decrement `cnt -= 1`.
3. Because the majority element appears more than half the time, its occurrences outnumber all other elements combined, guaranteeing `m` retains the majority element at the end.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single linear scan over `nums`.
- **Space Complexity:** $O(1)$ — Only two scalar variables `cnt` and `m`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [169majority-element.java](./169majority-element.java) |

---

## Key Learnings

- Pair-wise cancellation in Boyer-Moore vote algorithm guarantees the majority element survives all cancellations when its frequency exceeds $n/2$.
