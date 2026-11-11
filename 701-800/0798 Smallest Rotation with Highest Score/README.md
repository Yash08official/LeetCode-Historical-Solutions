---
comments: true
difficulty: Hard
tags:
  - Array
  - Prefix Sum
---

# 798. Smallest Rotation with Highest Score

**[View Problem on LeetCode](https://leetcode.com/problems/smallest-rotation-with-highest-score/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0798` (`798`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array nums. You can rotate it by a non-negative integer k so that the array becomes [nums[k], nums[k + 1], ... nums[nums.length - 1], nums[0], nums[1], ..., nums[k-1]]. Afterward, any entries that are less than or equal to their index are worth one point.


	For example, if we have nums = [2,4,1,3,0], and we rotate by k = 2, it becomes [1,3,0,2,4]. This is worth 3 points because 1 > 0 [no points], 3 > 1 [no points], 0 <= 2 [one point], 2 <= 3 [one point], 4 <= 4 [one point].


Return the rotation index k that corresponds to the highest score we can achieve if we rotated nums by it. If there are multiple answers, return the smallest such index k.

 
Example 1:


Input: nums = [2,3,1,4,0]
Output: 3
Explanation: Scores for each k are listed below: 
k = 0,  nums = [2,3,1,4,0],    score 2
k = 1,  nums = [3,1,4,0,2],    score 3
k = 2,  nums = [1,4,0,2,3],    score 3
k = 3,  nums = [4,0,2,3,1],    score 4
k = 4,  nums = [0,2,3,1,4],    score 3
So we should choose k = 3, which has the highest score.


Example 2:


Input: nums = [1,3,0,2,4]
Output: 0
Explanation: nums will always have 3 points no matter how it shifts.
So we will choose the smallest k, which is 0.


 
Constraints:


	1 <= nums.length <= 105
	0 <= nums[i] < nums.length

---

## Problem Understanding

- An element $nums[i]$ scores a point after rotation by $k$ if its new index $new\_idx \ge nums[i]$.
- Under rotation $k$, new index is $(i - k + n) \pmod n$.
- We find the range of $k$ where this condition holds for each element, and use a difference array to compute scores for all $k$ in $O(N)$.

---

## Approach

### Optimized Approach (Difference Array / Line Sweep)

1. Create a difference array `d` of size $n$.
2. For each element $i$:
   - The interval of rotation amounts $k$ yielding a point spans from $l = (i + 1) \pmod n$ to $r = (n + i + 1 - nums[i]) \pmod n$.
   - Apply difference array updates: `++d[l]`, `--d[r]`.
3. Compute prefix sums across `d` to find the rotation $k$ that maximizes the accumulated score.
4. Return the minimal index $k$.

---

## Dry Run

For $nums = [2, 3, 1, 4, 0]$:
Each element contributes a $+1$ to its active rotation intervals in `d`.
Prefix sweep identifies the index with maximum cumulative sum.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass to populate difference array, single pass prefix sum.
- **Space Complexity:** $O(N)$ for the difference array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [798smallest-rotation-with-highest-score.java](./798smallest-rotation-with-highest-score.java) |

---

## Key Learnings

- Interval scoring across cyclic rotations translates into range additions on a difference array.
- Difference arrays allow converting an $O(N^2)$ brute-force rotation check into optimal $O(N)$ time.
