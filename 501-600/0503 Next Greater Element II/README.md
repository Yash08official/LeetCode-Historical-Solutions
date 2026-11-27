---
comments: true
difficulty: Medium
tags:
  - Array
  - Stack
  - Monotonic Stack
---

# 503. Next Greater Element II

**[View Problem on LeetCode](https://leetcode.com/problems/next-greater-element-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0503` (`503`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Stack`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given a circular integer array `nums` (i.e., the next element of `nums[nums.length - 1]` is `nums[0]`), return *the **next greater number** for every element in* `nums`.

The **next greater number** of a number `x` is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return `-1` for this number.

---

## Examples

### Example 1

```
Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number. 
The second 1's next greater number needs to search circularly, which is also 2.
```

### Example 2

```
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 10^4`

	- `-10^9 <= nums[i] <= 10^9`

---

## Problem Understanding

- For each element in a circular integer array `nums`, find the next greater element encountered when traversing forward (wrapping around from index `n - 1` back to `0`), or `-1` if none exists.

---

## Approach

### Optimized Approach (Doubled-Index Reverse Monotonic Stack)
1. Initialize `ans` of length `n` with `-1`.
2. Simulate array duplication conceptually without allocating a `2n` array by iterating `i` backwards from `2n - 1` down to `0` and indexing `j = i % n`.
3. Maintain a strictly decreasing stack `stk` of values seen to the right: pop any element `<= nums[j]`, record `stk.peek()` as `ans[j]` if the stack is non-empty, and push `nums[j]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — each element is pushed and popped at most twice across the $2n$ loop.
- **Space Complexity:** $O(n)$ for the monotonic stack `stk`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [503next-greater-element-ii.java](./503next-greater-element-ii.java) |

---

## Key Learnings

- Modulo indexing (`i % n`) turns a circular traversal into a linear scan over `2n` virtual elements with zero extra array allocation.
