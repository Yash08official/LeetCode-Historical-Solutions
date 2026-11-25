---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Backtracking
  - Bit Manipulation
---

# 491. Non-decreasing Subsequences

**[View Problem on LeetCode](https://leetcode.com/problems/non-decreasing-subsequences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0491` (`491`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Backtracking`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, return *all the different possible non-decreasing subsequences of the given array with at least two elements*. You may return the answer in **any order**.

---

## Examples

### Example 1

```text
**Input:** nums = [4,6,7,7]
**Output:** [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
```

### Example 2

```text
**Input:** nums = [4,4,3,2,1]
**Output:** [[4,4]]
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 15`
	
- `-100 <= nums[i] <= 100`

---

## Problem Understanding

- Return all distinct non-decreasing subsequences of `nums` with length at least `2`.

---

## Approach

### Optimized Approach (DFS Backtracking with Duplicate-Skip Pruning)
1. At index `u` with previous chosen value `last`:
   - Take `nums[u]` if `nums[u] >= last`.
   - Skip `nums[u]` ONLY if `nums[u] != last` — this prevents generating identical subsequences from equal consecutive choices without needing a `Set`!

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot 2^n)$.\n- **Space Complexity:** $O(n)$ recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [491non-decreasing-subsequences.java](./491non-decreasing-subsequences.java) |

---

## Key Learnings

- Guarding the "skip" branch with `nums[u] != last` deduplicates subsequences canonically (always picking the earlier occurrence when equal).
