---
comments: true
difficulty: Easy
tags:
  - Array
  - Design
  - Prefix Sum
---

# 303. Range Sum Query - Immutable

**[View Problem on LeetCode](https://leetcode.com/problems/range-sum-query-immutable/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0303` (`303`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Design`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, handle multiple queries of the following type:

	
- Calculate the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** where `left <= right`.

Implement the `NumArray` class:

	
- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
	
- `int sumRange(int left, int right)` Returns the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** (i.e. `nums[left] + nums[left + 1] + ... + nums[right]`).

---

## Examples

### Example 1

```text
**Input**
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
**Output**
[null, 1, -1, -3]

**Explanation**
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^4`
	
- `-10^5 <= nums[i] <= 10^5`
	
- `0 <= left <= right < nums.length`
	
- At most `10^4` calls will be made to `sumRange`.

---

## Problem Understanding

- Support multiple `sumRange(left, right)` queries over an immutable integer array.

---

## Approach

### Optimized Approach (1D Prefix Sum Array)
1. Precompute `s[i + 1] = s[i] + nums[i]` in the constructor.
2. Answer each `sumRange(left, right)` in $O(1)$ via `s[right + 1] - s[left]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ constructor, $O(1)$ per query.\n- **Space Complexity:** $O(n)$ for prefix sum array `s`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [303range-sum-query-immutable.java](./303range-sum-query-immutable.java) |

---

## Key Learnings

- Using a 1-indexed prefix sum array of length `n + 1` eliminates `left == 0` boundary checks.
