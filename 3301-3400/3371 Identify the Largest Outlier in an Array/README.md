---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Counting
  - Enumeration
---

# 3371. Identify the Largest Outlier in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/identify-the-largest-outlier-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3371` (`3371`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Counting`, `Enumeration` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`. This array contains `n` elements, where **exactly** `n - 2` elements are **special**** numbers**. One of the remaining **two** elements is the *sum* of these **special numbers**, and the other is an **outlier**.

An **outlier** is defined as a number that is *neither* one of the original special numbers *nor* the element representing the sum of those numbers.

**Note** that special numbers, the sum element, and the outlier must have **distinct** indices, but *may *share the **same** value.

Return the **largest**** **potential** outlier** in `nums`.

---

## Examples

### Example 1

**Input:** nums = [2,3,5,10]

**Output:** 10

**Explanation:**

The special numbers could be 2 and 3, thus making their sum 5 and the outlier 10.

### Example 2

**Input:** nums = [-2,-1,-3,-6,4]

**Output:** 4

**Explanation:**

The special numbers could be -2, -1, and -3, thus making their sum -6 and the outlier 4.

### Example 3

**Input:** nums = [1,1,1,1,1,5,5]

**Output:** 5

**Explanation:**

The special numbers could be 1, 1, 1, 1, and 1, thus making their sum 5 and the other 5 as the outlier.

 

**

---

## Constraints

**

	
- `3 <= nums.length <= 10^5`
	
- `-1000 <= nums[i] <= 1000`
	
- The input is generated such that at least **one** potential outlier exists in `nums`.

---

## Problem Understanding

- An array of $n$ elements contains $n - 2$ special numbers, 1 sum element equal to their sum, and 1 outlier.
- Find the largest potential outlier.

---

## Approach

### Optimized Approach (Frequency Map + Total Sum Parity Filter)

1. Compute total array sum $s$ and populate frequency map `cnt`.
2. Iterate through each unique number $x$ in `cnt` as candidate outlier:
   - Remaining sum is $t = s - x$.
   - If $t$ is odd (`t % 2 != 0`), it cannot be split into special sum and sum element.
   - Required sum element is $t / 2$.
   - If `cnt.containsKey(t / 2)` and either $x 
e t / 2$ or `v > 1`, valid configuration exists.
   - Update answer: `ans = Math.max(ans, x)`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass to compute sum and frequencies, followed by map iteration.
- **Space Complexity:** $O(n)$ — Hash map storage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3371identify-the-largest-outlier-in-an-array.java](./3371identify-the-largest-outlier-in-an-array.java) |

---

## Key Learnings

- Treating candidate outliers algebraically ($s - x = 2 	imes 	ext{sum}$) reduces search space from quadratic pair search to $O(1)$ hash map lookups.
