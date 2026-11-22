---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 377. Combination Sum IV

**[View Problem on LeetCode](https://leetcode.com/problems/combination-sum-iv/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0377` (`377`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of **distinct** integers `nums` and a target integer `target`, return *the number of possible combinations that add up to* `target`.

The test cases are generated so that the answer can fit in a **32-bit** integer.

---

## Examples

### Example 1

```text
**Input:** nums = [1,2,3], target = 4
**Output:** 7
**Explanation:**
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
```

### Example 2

```text
**Input:** nums = [9], target = 3
**Output:** 0
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 200`
	
- `1 <= nums[i] <= 1000`
	
- All the elements of `nums` are **unique**.
	
- `1 <= target <= 1000`

 

**Follow up:** What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?

---

## Problem Understanding

- Count the number of ordered sequences (permutations) of elements from `nums` that sum to `target`.

---

## Approach

### Optimized Approach (Order-Sensitive Complete Knapsack DP)
1. Set `f[0] = 1` and iterate sum `i` in the outer loop (`1..target`) and each `x` in `nums` in the inner loop.
2. Accumulate `f[i] += f[i - x]` whenever `i >= x`.

---

## Complexity Analysis

- **Time Complexity:** $O(\text{target} \cdot n)$.\n- **Space Complexity:** $O(\text{target})$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [377combination-sum-iv.java](./377combination-sum-iv.java) |

---

## Key Learnings

- Putting target sum in the outer loop and items in the inner loop counts ordered permutations rather than unordered combinations.
