---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
---

# 801. Minimum Swaps To Make Sequences Increasing

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0801` (`801`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integer arrays of the same length nums1 and nums2. In one operation, you are allowed to swap nums1[i] with nums2[i].


	For example, if nums1 = [1,2,3,8], and nums2 = [5,6,7,4], you can swap the element at i = 3 to obtain nums1 = [1,2,3,4] and nums2 = [5,6,7,8].


Return the minimum number of needed operations to make nums1 and nums2 strictly increasing. The test cases are generated so that the given input always makes it possible.

An array arr is strictly increasing if and only if arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1].

 
Example 1:


Input: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
Output: 1
Explanation: 
Swap nums1[3] and nums2[3]. Then the sequences are:
nums1 = [1, 3, 5, 7] and nums2 = [1, 2, 3, 4]
which are both strictly increasing.


Example 2:


Input: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
Output: 1


 
Constraints:


	2 <= nums1.length <= 105
	nums2.length == nums1.length
	0 <= nums1[i], nums2[i] <= 2 * 105

---

## Problem Understanding

- At each index $i$, we can either keep $nums1[i]$ and $nums2[i]$ as they are or swap them.
- Let $a$ be the min swaps up to $i$ where no swap occurs at $i$.
- Let $b$ be the min swaps up to $i$ where a swap occurs at $i$.
- State transitions depend on comparing $(nums1[i-1], nums1[i])$ and $(nums2[i-1], nums2[i])$.-

---

## Approach

### Optimized Approach (Dynamic Programming with State Compression)

1. Initialize $a = 0$ (no swap at index 0) and $b = 1$ (swap at index 0).
2. For $i$ from 1 to $N - 1$:
   - Save previous values $x = a, y = b$.
   - **Case 1: Sequences strictly increasing without cross-swap** ($nums1[i-1] \ge nums1[i] \lor nums2[i-1] \ge nums2[i]$):
     - A swap must have occurred at one but not both: $a = y, b = x + 1$.
   - **Case 2: Both choices valid**:
     - Check if cross-swap also maintains order ($nums1[i-1] < nums2[i] \land nums2[i-1] < nums1[i]$):
       - $a = \min(a, y), b = \min(b, x + 1)$.
3. Return $\min(a, b)$.

---

## Dry Run

For `nums1 = [1,3,5,4]`, `nums2 = [1,2,3,7]`:
- $i=1$: both monotonic and cross-monotonic -> $a=0, b=1$.
- $i=2$: both monotonic and cross-monotonic -> $a=0, b=1$.
- $i=3$: $5 \ge 4$, must swap one: $a = 1, b = 1$.
Result: $\min(1, 1) = 1$.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single forward pass across $N$ elements.
- **Space Complexity:** $O(1)$ — Rolling variables require zero array allocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [801minimum-swaps-to-make-sequences-increasing.java](./801minimum-swaps-to-make-sequences-increasing.java) |

---

## Key Learnings

- Compressing 2-state DP transitions into scalar variables reduces auxiliary space from $O(N)$ to $O(1)$.
- Comparing adjacent and diagonal elements completely characterizes valid swap configurations.
