---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 213. House Robber II

**[View Problem on LeetCode](https://leetcode.com/problems/house-robber-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0213` (`213`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle.** That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

---

## Examples

### Example 1

```text
**Input:** nums = [2,3,2]
**Output:** 3
**Explanation:** You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
```

### Example 2

```text
**Input:** nums = [1,2,3,1]
**Output:** 4
**Explanation:** Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

### Example 3

```text
**Input:** nums = [1,2,3]
**Output:** 3
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 100`
	
- `0 <= nums[i] <= 1000`

---

## Problem Understanding

- Houses are arranged in a circle so the first (`0`) and last (`n - 1`) houses are adjacent and cannot both be robbed.

---

## Approach

### Optimized Approach (Circular Split into Two Linear House Robber Subproblems)
1. If `n == 1`, return `nums[0]`.
2. Split into two linear ranges that exclude one endpoint each: `[0, n - 2]` and `[1, n - 1]`.
3. Solve each linear range with $O(1)$-space DP (`f` = best without robbing current house, `g` = best robbing current house) and return the maximum.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Two linear scans.\n- **Space Complexity:** $O(1)$ — Constant rolling DP variables `f` and `g`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [213house-robber-ii.java](./213house-robber-ii.java) |

---

## Key Learnings

- Breaking a circular dependency by fixing exclusion of either endpoint reduces cyclic DP to standard linear DP.
