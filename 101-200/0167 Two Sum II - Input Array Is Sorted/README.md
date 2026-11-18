---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Binary Search
---

# 167. Two Sum II - Input Array Is Sorted

**[View Problem on LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0167` (`167`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**.

Find **two** numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index_1]` and `numbers[index_2]` where `1 <= index_1 < index_2 <= numbers.length`.

Return the indices of the two numbers `index_1` and `index_2` as an integer array `[index_1, index_2]` of length 2.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only constant extra space.

---

## Examples

### Example 1

```text
**Input:** numbers = [2,7,11,15], target = 9
**Output:** [1,2]
**Explanation:** The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

### Example 2

```text
**Input:** numbers = [2,3,4], target = 6
**Output:** [1,3]
**Explanation:** The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
```

### Example 3

```text
**Input:** numbers = [-1,0], target = -1
**Output:** [1,2]
**Explanation:** The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

 

**

---

## Constraints

**

	
- `2 <= numbers.length <= 3 * 10^4`
	
- `-1000 <= numbers[i] <= 1000`
	
- `numbers` is sorted in **non-decreasing order**.
	
- `-1000 <= target <= 1000`
	
- The tests are generated such that there is **exactly one solution**.

---

## Problem Understanding

- Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers that add up to `target`.
- Must use only constant $O(1)$ extra space.

---

## Approach

### Optimized Approach (Two Pointers on Sorted Array)

1. Initialize two pointers: left pointer `i = 0` and right pointer `j = numbers.length - 1`.
2. In each iteration, compute sum `x = numbers[i] + numbers[j]`:
   - If `x === target`, return 1-based indices `[i + 1, j + 1]`.
   - If `x < target`, the sum is too small; increment `i` to increase the sum.
   - If `x > target`, the sum is too large; decrement `j` to decrease the sum.
3. Because the array is sorted, this eliminates an entire row/column of candidate pairs each step.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Pointers `i` and `j` move towards each other, visiting at most $n$ elements.
- **Space Complexity:** $O(1)$ — Only two index pointers used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [167two-sum-ii-input-array-is-sorted.js](./167two-sum-ii-input-array-is-sorted.js) |

---

## Key Learnings

- Sorting converts quadratic pair search into an optimal linear two-pointer convergence.
