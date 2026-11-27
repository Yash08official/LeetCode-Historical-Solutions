---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Two Pointers
  - Binary Search
  - Sorting
---

# 532. K-diff Pairs in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/k-diff-pairs-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0532` (`532`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of integers `nums` and an integer `k`, return *the number of **unique** k-diff pairs in the array*.

A **k-diff** pair is an integer pair `(nums[i], nums[j])`, where the following are true:

	- `0 <= i, j < nums.length`

	- `i != j`

	- `|nums[i] - nums[j]| == k`

**Notice** that `|val|` denotes the absolute value of `val`.

---

## Examples

### Example 1

```
Input: nums = [3,1,4,1,5], k = 2
Output: 2
Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
Although we have two 1s in the input, we should only return the number of unique pairs.
```

### Example 2

```
Input: nums = [1,2,3,4,5], k = 1
Output: 4
Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).
```

### Example 3

```
Input: nums = [1,3,1,5,4], k = 0
Output: 1
Explanation: There is one 0-diff pair in the array, (1, 1).
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 10^4`

	- `-10^7 <= nums[i] <= 10^7`

	- `0 <= k <= 10^7`

---

## Problem Understanding

- Count the number of **unique** pairs `(a, b)` in `nums` with `|a - b| == k` (`k >= 0`).

---

## Approach

### Optimized Approach (Single-Pass Complement Set + Canonical Pair Key Set)
1. Identify each unique `k`-diff pair `{m, m + k}` canonically by its **smaller value** `m` stored in set `ans`.
2. Maintain set `vis` of seen numbers while scanning `x` in `nums`:
   - If `x - k` is in `vis`, pair `(x - k, x)` exists — add `x - k` to `ans`.
   - If `x + k` is in `vis`, pair `(x, x + k)` exists — add `x` to `ans`.
   - Add `x` to `vis`.
3. Return `ans.size()`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ expected — single pass with $O(1)$ hash set lookups.
- **Space Complexity:** $O(n)$ for sets `vis` and `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [532k-diff-pairs-in-an-array.java](./532k-diff-pairs-in-an-array.java) |

---

## Key Learnings

- Keying each unordered pair `{m, m + k}` by its smaller endpoint `m` deduplicates pairs naturally in one pass without sorting or special-casing `k == 0`.
