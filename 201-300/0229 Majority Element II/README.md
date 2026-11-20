---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Sorting
  - Counting
  - Boyer–Moore Majority Vote Algorithm
---

# 229. Majority Element II

**[View Problem on LeetCode](https://leetcode.com/problems/majority-element-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0229` (`229`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Sorting`, `Counting`, `Boyer–Moore Majority Vote Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array of size `n`, find all elements that appear more than `⌊n / 3⌋` times.

---

## Examples

### Example 1

```text
**Input:** nums = [3,2,3]
**Output:** [3]
```

### Example 2

```text
**Input:** nums = [1]
**Output:** [1]
```

### Example 3

```text
**Input:** nums = [1,2]
**Output:** [1,2]
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 5 * 10^4`
	
- `-10^9 <= nums[i] <= 10^9`

 

**Follow up:** Could you solve the problem in linear time and in `O(1)` space?

---

## Problem Understanding

- Find all elements in `nums` that appear strictly more than $\lfloor n / 3 \rfloor$ times (at most 2 such elements can exist).

---

## Approach

### Optimized Approach (Generalized Boyer–Moore Majority Vote Algorithm)
1. Maintain two candidate values (`m1`, `m2`) and vote counts (`n1`, `n2`).
2. Pass 1 (Cancellation): increment matching candidate's count, assign an empty slot if count is `0`, or decrement both counts when a third distinct value appears.
3. Pass 2 (Verification): recount exact occurrences of `m1` and `m2` and include those exceeding `nums.length / 3`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Two linear passes.\n- **Space Complexity:** $O(1)$ — Constant candidate counters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [229majority-element-ii.java](./229majority-element-ii.java) |

---

## Key Learnings

- At most $k - 1$ elements can appear more than $n/k$ times, so tracking 2 candidates suffices for $n/3$.
