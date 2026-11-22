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

# 349. Intersection of Two Arrays

**[View Problem on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0349` (`349`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given two integer arrays `nums1` and `nums2`, return *an array of their intersection*. Each element in the result must be **unique** and you may return the result in **any order**.

---

## Examples

### Example 1

```text
**Input:** nums1 = [1,2,2,1], nums2 = [2,2]
**Output:** [2]
```

### Example 2

```text
**Input:** nums1 = [4,9,5], nums2 = [9,4,9,8,4]
**Output:** [9,4]
**Explanation:** [4,9] is also accepted.
```

 

**

---

## Constraints

**

	
- `1 <= nums1.length, nums2.length <= 1000`
	
- `0 <= nums1[i], nums2[i] <= 1000`

---

## Problem Understanding

- Return an array of unique elements present in both `nums1` and `nums2`.

---

## Approach

### Optimized Approach (Fixed-Range Boolean Presence Array)
1. Since values lie in `[0, 1000]`, mark all values from `nums1` in `boolean[] s = new boolean[1001]`.
2. Scan `nums2`: when `s[x]` is `true`, add `x` to `ans` and immediately set `s[x] = false` to guarantee uniqueness.

---

## Complexity Analysis

- **Time Complexity:** $O(n + m)$.\n- **Space Complexity:** $O(1)$ (fixed 1001-element boolean table).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [349intersection-of-two-arrays.java](./349intersection-of-two-arrays.java) |

---

## Key Learnings

- Clearing `s[x] = false` upon first match deduplicates results in a single pass without needing a second set.
