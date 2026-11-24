---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Knapsack Problem
  - 0-1 Knapsack
---

# 416. Partition Equal Subset Sum

**[View Problem on LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0416` (`416`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Knapsack Problem`, `0-1 Knapsack` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, return `true` *if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or *`false`* otherwise*.

---

## Examples

### Example 1

```text
**Input:** nums = [1,5,11,5]
**Output:** true
**Explanation:** The array can be partitioned as [1, 5, 5] and [11].
```

### Example 2

```text
**Input:** nums = [1,2,3,5]
**Output:** false
**Explanation:** The array cannot be partitioned into equal sum subsets.
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 200`
	
- `1 <= nums[i] <= 100`

---

## Problem Understanding

- Determine if `nums` can be partitioned into two subsets with equal sum.

---

## Approach

### Optimized Approach (0-1 Subset Sum Knapsack DP)
1. Compute total sum `s`; if `s` is odd, return `false`. Target is `m = s / 2`.
2. Define `f[i][j]` = whether a subset of the first `i` elements sums to `j`, with `f[0][0] = true`.
3. Transition: `f[i][j] = f[i - 1][j] || (j >= x && f[i - 1][j - x])`. Return `f[n][m]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot m)$ where $m = \text{sum}/2$.\n- **Space Complexity:** $O(n \cdot m)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [416partition-equal-subset-sum.java](./416partition-equal-subset-sum.java) |

---

## Key Learnings

- Equal-sum partitioning reduces directly to a classic boolean 0-1 knapsack with capacity `sum / 2`.
