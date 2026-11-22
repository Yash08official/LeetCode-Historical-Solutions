---
comments: true
difficulty: Medium
tags:
  - Array
  - Divide and Conquer
  - Design
  - Binary Indexed Tree
  - Segment Tree
  - Sqrt Decomposition
---

# 307. Range Sum Query - Mutable

**[View Problem on LeetCode](https://leetcode.com/problems/range-sum-query-mutable/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0307` (`307`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Divide and Conquer`, `Design`, `Binary Indexed Tree`, `Segment Tree`, `Sqrt Decomposition` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, handle multiple queries of the following types:

	
- **Update** the value of an element in `nums`.
	
- Calculate the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** where `left <= right`.

Implement the `NumArray` class:

	
- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
	
- `void update(int index, int val)` **Updates** the value of `nums[index]` to be `val`.
	
- `int sumRange(int left, int right)` Returns the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** (i.e. `nums[left] + nums[left + 1] + ... + nums[right]`).

---

## Examples

### Example 1

```text
**Input**
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
**Output**
[null, 9, null, 8]

**Explanation**
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 3 * 10^4`
	
- `-100 <= nums[i] <= 100`
	
- `0 <= index < nums.length`
	
- `-100 <= val <= 100`
	
- `0 <= left <= right < nums.length`
	
- At most `3 * 10^4` calls will be made to `update` and `sumRange`.

---

## Problem Understanding

- Support both point updates `update(index, val)` and range sum queries `sumRange(left, right)` efficiently.

---

## Approach

### Optimized Approach (Binary Indexed Tree / Fenwick Tree)
1. Maintain a 1-indexed `BinaryIndexedTree` supporting `update(x, delta)` (`x += x & -x`) and prefix `query(x)` (`x -= x & -x`).
2. `update(index, val)` computes `delta = val - sumRange(index, index)` and applies `tree.update(index + 1, delta)`.
3. `sumRange(left, right)` returns `tree.query(right + 1) - tree.query(left)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ build, $O(\log n)$ per `update` and `sumRange`.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [307range-sum-query-mutable.java](./307range-sum-query-mutable.java) |

---

## Key Learnings

- Fenwick trees offer a compact, low-constant $O(\log n)$ alternative to segment trees for point-update range-sum problems.
