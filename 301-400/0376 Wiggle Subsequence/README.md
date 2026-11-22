---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Greedy
---

# 376. Wiggle Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/wiggle-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0376` (`376`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

A **wiggle sequence** is a sequence where the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with one element and a sequence with two non-equal elements are trivially wiggle sequences.

	
- For example, `[1, 7, 4, 9, 2, 5]` is a **wiggle sequence** because the differences `(6, -3, 5, -7, 3)` alternate between positive and negative.
	
- In contrast, `[1, 4, 7, 2, 5]` and `[1, 7, 4, 5, 5]` are not wiggle sequences. The first is not because its first two differences are positive, and the second is not because its last difference is zero.

A **subsequence** is obtained by deleting some elements (possibly zero) from the original sequence, leaving the remaining elements in their original order.

Given an integer array `nums`, return *the length of the longest **wiggle subsequence** of *`nums`.

---

## Examples

### Example 1

```text
**Input:** nums = [1,7,4,9,2,5]
**Output:** 6
**Explanation:** The entire sequence is a wiggle sequence with differences (6, -3, 5, -7, 3).
```

### Example 2

```text
**Input:** nums = [1,17,5,10,13,15,10,5,16,8]
**Output:** 7
**Explanation:** There are several subsequences that achieve this length.
One is [1, 17, 10, 13, 10, 16, 8] with differences (16, -7, 3, -3, 6, -8).
```

### Example 3

```text
**Input:** nums = [1,2,3,4,5,6,7,8,9]
**Output:** 2
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 1000`
	
- `0 <= nums[i] <= 1000`

 

**Follow up:** Could you solve this in `O(n)` time?

---

## Problem Understanding

- Find the length of the longest subsequence whose consecutive differences strictly alternate between positive and negative.

---

## Approach

### Approach (Dual-State Up/Down Dynamic Programming)
1. Maintain `f[i]` (longest wiggle ending at `i` with an upward step) and `g[i]` (ending at `i` with a downward step), initialized to `1`.
2. For each `j < i`: if `nums[j] < nums[i]`, update `f[i] = max(f[i], g[j] + 1)`; if `nums[j] > nums[i]`, update `g[i] = max(g[i], f[j] + 1)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [376wiggle-subsequence.java](./376wiggle-subsequence.java) |

---

## Key Learnings

- Splitting subsequence state into alternating up (`f`) and down (`g`) arrays enforces strict sign alternation.
