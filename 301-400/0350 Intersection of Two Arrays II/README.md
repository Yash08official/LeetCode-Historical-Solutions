---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Two Pointers
  - Binary Search
  - Sorting
---

# 350. Intersection of Two Arrays II

**[View Problem on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0350` (`350`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given two integer arrays `nums1` and `nums2`, return *an array of their intersection*. Each element in the result must appear as many times as it shows in both arrays and you may return the result in **any order**.

---

## Examples

### Example 1

```text
**Input:** nums1 = [1,2,2,1], nums2 = [2,2]
**Output:** [2,2]
```

### Example 2

```text
**Input:** nums1 = [4,9,5], nums2 = [9,4,9,8,4]
**Output:** [4,9]
**Explanation:** [9,4] is also accepted.
```

 

**

---

## Constraints

**

	
- `1 <= nums1.length, nums2.length <= 1000`
	
- `0 <= nums1[i], nums2[i] <= 1000`

 

**Follow up:**

	
- What if the given array is already sorted? How would you optimize your algorithm?
	
- What if `nums1`'s size is small compared to `nums2`'s size? Which algorithm is better?
	
- What if elements of `nums2` are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

---

## Problem Understanding

- Return the multiset intersection of `nums1` and `nums2` (each element appears as many times as it occurs in both arrays).

---

## Approach

### Optimized Approach (Fixed-Range Frequency Array)
1. Count occurrences of each value in `nums1` inside `int[] cnt = new int[1001]`.
2. Scan `nums2`: whenever `cnt[x]-- > 0`, append `x` to `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n + m)$.\n- **Space Complexity:** $O(1)$ (fixed 1001-element count array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [350intersection-of-two-arrays-ii.java](./350intersection-of-two-arrays-ii.java) |

---

## Key Learnings

- Decrementing a frequency counter on match cleanly enforces multiset intersection multiplicity.
