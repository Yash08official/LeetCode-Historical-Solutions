---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 153. Find Minimum in Rotated Sorted Array

**[View Problem on LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0153` (`153`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

	
- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
	
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in `O(log n) time`.

---

## Examples

### Example 1

```text
**Input:** nums = [3,4,5,1,2]
**Output:** 1
**Explanation:** The original array was [1,2,3,4,5] rotated 3 times.
```

### Example 2

```text
**Input:** nums = [4,5,6,7,0,1,2]
**Output:** 0
**Explanation:** The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

### Example 3

```text
**Input:** nums = [11,13,15,17]
**Output:** 11
**Explanation:** The original array was [11,13,15,17] and it was rotated 4 times.
```

 

**

---

## Constraints

**

	
- `n == nums.length`
	
- `1 <= n <= 5000`
	
- `-5000 <= nums[i] <= 5000`
	
- All the integers of `nums` are **unique**.
	
- `nums` is sorted and rotated between `1` and `n` times.

---

## Problem Understanding

- An array of unique integers sorted in ascending order was rotated between 1 and $n$ times.
- Find the minimum element in $O(\log n)$ time.

---

## Approach

### Optimized Approach (Binary Search on Inflection Point)

1. Initialize search boundaries `l = 0` and `r = nums.length - 1`.
2. While `l < r`:
   - Compute midpoint `mid = (l + r) >> 1`.
   - Compare `nums[mid]` with `nums[nums.length - 1]` (the rightmost boundary):
     - If `nums[mid] > nums[nums.length - 1]`, the inflection point (minimum) lies strictly to the right (`l = mid + 1`).
     - Otherwise, the minimum lies at or to the left of `mid` (`r = mid`).
3. Return `nums[l]` when `l == r`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ — Search space halves each step.
- **Space Complexity:** $O(1)$ — Constant auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [153find-minimum-in-rotated-sorted-array.java](./153find-minimum-in-rotated-sorted-array.java) |

---

## Key Learnings

- Comparing against the fixed rightmost element `nums[n-1]` avoids ambiguities regardless of whether the array is fully rotated or unrotated.
