---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 540. Single Element in a Sorted Array

**[View Problem on LeetCode](https://leetcode.com/problems/single-element-in-a-sorted-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0540` (`540`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return *the single element that appears only once*.

Your solution must run in `O(log n)` time and `O(1)` space.

---

## Examples

### Example 1

```
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
```

### Example 2

```
Input: nums = [3,3,7,7,10,11,11]
Output: 10
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 10^5`

	- `0 <= nums[i] <= 10^5`

---

## Problem Understanding

- Find the single element that appears once in a sorted array where every other element appears twice, in $O(\log n)$ time and $O(1)$ space.

---

## Approach

### Optimized Approach (Parity-XOR Binary Search)
1. Before the unique element, identical pairs start at **even** indices `(2k, 2k + 1)`; after it, pairs shift to `(2k + 1, 2k + 2)`.
2. Note that `mid ^ 1` flips the lowest bit: giving `mid + 1` when `mid` is even, and `mid - 1` when `mid` is odd.
3. Binary search in `[0, n - 1]`: if `nums[mid] == nums[mid ^ 1]`, the left side up through `mid` has intact pairing so advance `l = mid + 1`; otherwise shrink `r = mid`.
4. Return `nums[l]`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ binary search.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [540single-element-in-a-sorted-array.java](./540single-element-in-a-sorted-array.java) |

---

## Key Learnings

- Checking `nums[mid] == nums[mid ^ 1]` unifies even and odd `mid` index parity checks into a single expression.
