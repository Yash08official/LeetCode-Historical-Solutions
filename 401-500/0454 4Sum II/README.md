---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
---

# 454. 4Sum II

**[View Problem on LeetCode](https://leetcode.com/problems/4sum-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0454` (`454`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | Java |

---

## Problem Description

Given four integer arrays `nums1`, `nums2`, `nums3`, and `nums4` all of length `n`, return the number of tuples `(i, j, k, l)` such that:

	- `0 <= i, j, k, l < n`

	- `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`

---

## Examples

### Example 1

```
Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
Output: 2
Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
```

### Example 2

```
Input: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
Output: 1
```

 

**

---

## Constraints

**

	- `n == nums1.length`

	- `n == nums2.length`

	- `n == nums3.length`

	- `n == nums4.length`

	- `1 <= n <= 200`

	- `-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28`

---

## Problem Understanding

- Given four integer arrays of length `n`, count the number of index tuples `(i, j, k, l)` such that `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`.

---

## Approach

### Optimized Approach (Meet-in-the-Middle Pair-Sum Hash Map)
1. Partition the four arrays into two halves: `(nums1, nums2)` and `(nums3, nums4)`.
2. Compute all $n^2$ pairwise sums `a + b` from `nums1` and `nums2`, storing their counts in `HashMap<Integer, Integer> cnt`.
3. Iterate over all $n^2$ pairs `(c, d)` from `nums3` and `nums4` and add `cnt.getOrDefault(-(c + d), 0)` to the answer.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ — two nested double loops with $O(1)$ average hash map operations.
- **Space Complexity:** $O(n^2)$ in the worst case for storing up to $n^2$ distinct sums in `cnt`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4544sum-ii.java](./4544sum-ii.java) |

---

## Key Learnings

- Splitting a 4-way sum into two 2-way sums (meet-in-the-middle) reduces complexity from $O(n^4)$ to $O(n^2)$.
