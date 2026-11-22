---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Dynamic Programming
  - Sorting
---

# 368. Largest Divisible Subset

**[View Problem on LeetCode](https://leetcode.com/problems/largest-divisible-subset/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0368` (`368`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Dynamic Programming`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given a set of **distinct** positive integers `nums`, return the largest subset `answer` such that every pair `(answer[i], answer[j])` of elements in this subset satisfies:

	
- `answer[i] % answer[j] == 0`, or
	
- `answer[j] % answer[i] == 0`

If there are multiple solutions, return any of them.

---

## Examples

### Example 1

```text
**Input:** nums = [1,2,3]
**Output:** [1,2]
**Explanation:** [1,3] is also accepted.
```

### Example 2

```text
**Input:** nums = [1,2,4,8]
**Output:** [1,2,4,8]
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 1000`
	
- `1 <= nums[i] <= 2 * 10^9`
	
- All the integers in `nums` are **unique**.

---

## Problem Understanding

- Find the largest subset of distinct positive integers `nums` where every pair `(a, b)` satisfies `a % b == 0` or `b % a == 0`.

---

## Approach

### Optimized Approach (Sort + LIS-Style DP + Backtracking Reconstruction)
1. Sort `nums` ascending; divisibility is transitive, so appending `nums[i]` only requires `nums[i] % nums[j] == 0`.
2. Compute `f[i]` = max divisible subset size ending at `i`, tracking argmax index `k`.
3. Scan backward from `k`, collecting elements `nums[i]` where `nums[k] % nums[i] == 0 && f[i] == m` and decrementing `m`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [368largest-divisible-subset.java](./368largest-divisible-subset.java) |

---

## Key Learnings

- Sorting turns pairwise divisibility into a chain condition identical to Longest Increasing Subsequence.
