---
comments: true
difficulty: Medium
tags:
  - Array
  - Sorting
  - Bucket Sort
  - Radix Sort
  - Pigeonhole Principle
---

# 164. Maximum Gap

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-gap/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0164` (`164`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Sorting`, `Bucket Sort`, `Radix Sort`, `Pigeonhole Principle` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, return *the maximum difference between two successive elements in its sorted form*. If the array contains less than two elements, return `0`.

You must write an algorithm that runs in linear time and uses linear extra space.

---

## Examples

### Example 1

```text
**Input:** nums = [3,6,9,1]
**Output:** 3
**Explanation:** The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.
```

### Example 2

```text
**Input:** nums = [10]
**Output:** 0
**Explanation:** The array contains less than 2 elements, therefore return 0.
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `0 <= nums[i] <= 10^9`

---

## Problem Understanding

- Given an integer array `nums`, return the maximum difference between two successive elements in its sorted form.
- Must run in linear $O(n)$ time and use $O(n)$ extra space.

---

## Approach

### Optimized Approach (Bucket Sort / Pigeonhole Principle)

1. If array length $n < 2$, return `0`.
2. Find minimum `mi` and maximum `mx` in `nums`. If `mi == mx`, all elements are equal (return `0`).
3. Calculate bucket size $B = \max(1, \lfloor(mx - mi) / (n - 1)floor)$ and bucket count $C = \lfloor(mx - mi) / Bfloor + 1$.
4. Initialize $C$ buckets, each tracking its `min` and `max` values.
5. Place each number into bucket $i = (v - mi) / B$, updating the bucket's min and max.
6. By Pigeonhole Principle, the maximum gap cannot occur within any single bucket—it must occur between the maximum of an earlier bucket and the minimum of the next non-empty bucket.
7. Iterate through buckets, computing gap as `bucket.min - prev_max` and updating the maximum difference.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass to find bounds, single pass to populate buckets, single pass to find max gap.
- **Space Complexity:** $O(n)$ — Auxiliary bucket storage proportional to $n$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [164maximum-gap.java](./164maximum-gap.java) |

---

## Key Learnings

- The Pigeonhole Principle guarantees that at least one bucket interval is larger than the uniform average gap, meaning internal bucket differences can be safely ignored.
