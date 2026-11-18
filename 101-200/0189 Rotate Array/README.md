---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Two Pointers
---

# 189. Rotate Array

**[View Problem on LeetCode](https://leetcode.com/problems/rotate-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0189` (`189`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Two Pointers` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

---

## Examples

### Example 1

```text
**Input:** nums = [1,2,3,4,5,6,7], k = 3
**Output:** [5,6,7,1,2,3,4]
**Explanation:**
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```

### Example 2

```text
**Input:** nums = [-1,-100,3,99], k = 2
**Output:** [3,99,-1,-100]
**Explanation:** 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `-2^31 <= nums[i] <= 2^31 - 1`
	
- `0 <= k <= 10^5`

 

**Follow up:**

	
- Try to come up with as many solutions as you can. There are at least **three** different ways to solve this problem.
	
- Could you do it in-place with `O(1)` extra space?

---

## Problem Understanding

- Given an integer array `nums`, rotate the array to the right by `k` steps in-place with $O(1)$ extra memory.

---

## Approach

### Optimized Approach (Three-Step Array Reversal Algorithm)

1. Normalize `k %= nums.length` to avoid redundant full rotations.
2. Define in-place helper `reverse(i, j)` swapping elements inward until pointers meet.
3. Apply three reversals:
   - Reverse the entire array: `reverse(0, n - 1)`.
   - Reverse the first `k` elements: `reverse(0, k - 1)`.
   - Reverse the remaining `n - k` elements: `reverse(k, n - 1)`.
4. The array is now rotated right by `k` positions in-place.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each element is swapped at most twice.
- **Space Complexity:** $O(1)$ — In-place pointer swaps with no extra array allocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [189rotate-array.js](./189rotate-array.js) |

---

## Key Learnings

- The 3-reversal trick is the gold-standard algorithm for in-place cyclic shift in linear time and strictly constant space.
