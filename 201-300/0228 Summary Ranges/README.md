---
comments: true
difficulty: Easy
tags:
  - Array
---

# 228. Summary Ranges

**[View Problem on LeetCode](https://leetcode.com/problems/summary-ranges/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0228` (`228`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **sorted unique** integer array `nums`.

A **range** `[a,b]` is the set of all integers from `a` to `b` (inclusive).

Return *the **smallest sorted** list of ranges that **cover all the numbers in the array exactly***. That is, each element of `nums` is covered by exactly one of the ranges, and there is no integer `x` such that `x` is in one of the ranges but not in `nums`.

Each range `[a,b]` in the list should be output as:

	
- `"a->b"` if `a != b`
	
- `"a"` if `a == b`

---

## Examples

### Example 1

```text
**Input:** nums = [0,1,2,4,5,7]
**Output:** ["0->2","4->5","7"]
**Explanation:** The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

### Example 2

```text
**Input:** nums = [0,2,3,4,6,8,9]
**Output:** ["0","2->4","6","8->9"]
**Explanation:** The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
```

 

**

---

## Constraints

**

	
- `0 <= nums.length <= 20`
	
- `-2^31 <= nums[i] <= 2^31 - 1`
	
- All the values of `nums` are **unique**.
	
- `nums` is sorted in ascending order.

---

## Problem Understanding

- Given a sorted unique integer array `nums`, compress consecutive runs into `"a->b"` (or `"a"` for singletons).

---

## Approach

### Optimized Approach (Two-Pointer Run Grouping)
1. Start a new range at index `i`, advance `j` while `j + 1 < n && nums[j + 1] == nums[j] + 1`.
2. Format range `[i, j]` via helper `f(nums, i, j)` and jump `i = j + 1`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each element is visited once.\n- **Space Complexity:** $O(1)$ auxiliary (excluding output list).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [228summary-ranges.java](./228summary-ranges.java) |

---

## Key Learnings

- Grouping maximal contiguous runs with `i = j + 1` keeps loop logic clean and free of post-loop tail handling.
