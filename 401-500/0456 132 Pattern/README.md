---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Stack
  - Monotonic Stack
  - Ordered Set
---

# 456. 132 Pattern

**[View Problem on LeetCode](https://leetcode.com/problems/132-pattern/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0456` (`456`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Stack`, `Monotonic Stack`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of `n` integers `nums`, a **132 pattern** is a subsequence of three integers `nums[i]`, `nums[j]` and `nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`.

Return `true`* if there is a **132 pattern** in *`nums`*, otherwise, return *`false`*.*

---

## Examples

### Example 1

```
Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.
```

### Example 2

```
Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
```

### Example 3

```
Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
```

 

**

---

## Constraints

**

	- `n == nums.length`

	- `1 <= n <= 2 * 10^5`

	- `-10^9 <= nums[i] <= 10^9`

---

## Problem Understanding

- Determine whether `nums` contains indices `i < j < k` such that `nums[i] < nums[k] < nums[j]` (a 132 pattern).

---

## Approach

### Optimized Approach (Prefix Minimum + Coordinate Compression + Fenwick Tree)
1. Precompute `left[i]` as the minimum element strictly to the left of index `i` (the best candidate for the `'1'` element `nums[i]`).
2. Coordinate-compress all unique values of `nums` into sorted array `s[0..m-1]` (1-indexed via binary search `search`).
3. Sweep `i` from right to left (`n - 1` down to `0`), treating `nums[i]` as the `'3'` element while the Binary Indexed Tree (`Fenwick Tree`) stores counts of all elements strictly to the right of `i`.
4. Query whether any right-side element lies strictly between `left[i]` and `nums[i]` by checking `x > y && tree.query(x - 1) > tree.query(y)`; if so, return `true`. Otherwise insert `x` into the BIT.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — sorting, coordinate compression, and $n$ BIT queries/updates each take $O(\log n)$.
- **Space Complexity:** $O(n)$ for the sorted unique array, prefix minimum array, and Binary Indexed Tree.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [456132-pattern.java](./456132-pattern.java) |

---

## Key Learnings

- Fixing the middle peak (`'3'`) with a prefix minimum on the left and a Fenwick Tree range-count query on the right cleanly checks whether any `'2'` value exists in the open interval `(left[i], nums[i])`.
