---
comments: true
difficulty: Easy
tags:
  - Array
  - Sorting
---

# 414. Third Maximum Number

**[View Problem on LeetCode](https://leetcode.com/problems/third-maximum-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0414` (`414`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`.

Return the **third distinct maximum** number in this array. If the third **maximum** does not exist, return the **maximum** number.

---

## Examples

### Example 1

```text
**Input:** nums = [3,2,1]
**Output:** 1
**Explanation:**
The first distinct maximum is 3.
The second distinct maximum is 2.
The third distinct maximum is 1.
```

### Example 2

```text
**Input:** nums = [1,2]
**Output:** 2
**Explanation:**
The first distinct maximum is 2.
The second distinct maximum is 1.
The third distinct maximum does not exist, so the maximum (2) is returned instead.
```

### Example 3

```text
**Input:** nums = [2,2,3,1]
**Output:** 1
**Explanation:**
The first distinct maximum is 3.
The second distinct maximum is 2 (both 2's are counted together since they have the same value).
The third distinct maximum is 1.
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^4`
	
- `-2^31 <= nums[i] <= 2^31 - 1`

 

**Follow up:** Can you find an `O(n)` solution?

---

## Problem Understanding

- Return the third distinct maximum number in `nums`, or the maximum if fewer than 3 distinct values exist.

---

## Approach

### Optimized Approach (Three `long` Sentinel Trackers)
1. Maintain `m1 > m2 > m3` initialized to `Long.MIN_VALUE` (strictly below `Integer.MIN_VALUE`).
2. Skip duplicates (`num == m1 || num == m2 || num == m3`) and cascade updates down `m1 -> m2 -> m3`.
3. Return `(int) (m3 != Long.MIN_VALUE ? m3 : m1)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [414third-maximum-number.java](./414third-maximum-number.java) |

---

## Key Learnings

- Using `Long.MIN_VALUE` as the empty sentinel avoids ambiguity when `Integer.MIN_VALUE` appears in `nums`.
