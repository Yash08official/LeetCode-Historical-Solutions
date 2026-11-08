---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
---

# 80. Remove Duplicates from Sorted Array II

**[View Problem on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0080` (`80`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` sorted in **non-decreasing order**, remove some duplicates **in-place** such that each unique element appears **at most twice**. The **relative order** of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` *after placing the final result in the first* `k` *slots of* `nums`.

Do not allocate extra space for another array. You must do this by **modifying the input array in-place** with $O(1)$ extra memory.

---

## Examples

### Example 1

```text
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

### Example 2

```text
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
```

---

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in **non-decreasing** order.

---

## Problem Understanding

- The array is already sorted.
- Each unique value is allowed to appear at most twice.
- If we write the valid elements into prefix `nums[0..k-1]`, a new candidate $x$ is valid if and only if $k < 2$ or $x 
eq nums[k - 2]$.

---

## Approach

### Optimized Approach (Two-Pointer In-Place Placement)

1. Initialize write index `k = 0`.
2. Iterate each element `x` in `nums`:
   - If `k < 2` or `x != nums[k - 2]`:
     - Assign `nums[k++] = x`.
3. Return `k`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single forward pass across $N$ elements.
- **Space Complexity:** $O(1)$ — In-place array overwrite with zero auxiliary allocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [80remove-duplicates-from-sorted-array-ii.java](./80remove-duplicates-from-sorted-array-ii.java) |

---

## Key Learnings

- Comparing against `nums[k - 2]` generalizes cleanly to any allowed frequency threshold $M$ (by checking `nums[k - M]`).
- Overwriting within the same array is safe because the write pointer `k` never outpaces the read pointer.
