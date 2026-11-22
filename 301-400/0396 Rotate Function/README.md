---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Dynamic Programming
---

# 396. Rotate Function

**[View Problem on LeetCode](https://leetcode.com/problems/rotate-function/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0396` (`396`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` of length `n`.

Assume `arr_k` to be an array obtained by rotating `nums` by `k` positions clock-wise. We define the **rotation function** `F` on `nums` as follow:

	
- `F(k) = 0 * arr_k[0] + 1 * arr_k[1] + ... + (n - 1) * arr_k[n - 1].`

Return *the maximum value of* `F(0), F(1), ..., F(n-1)`.

The test cases are generated so that the answer fits in a **32-bit** integer.

---

## Examples

### Example 1

```text
**Input:** nums = [4,3,2,6]
**Output:** 26
**Explanation:**
F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.
```

### Example 2

```text
**Input:** nums = [100]
**Output:** 0
```

 

**

---

## Constraints

**

	
- `n == nums.length`
	
- `1 <= n <= 10^5`
	
- `-100 <= nums[i] <= 100`

---

## Problem Understanding

- Maximize the weighted rotation sum $F(k) = \sum_{i=0}^{n-1} i \cdot B_k[i]$ over all $n$ clockwise rotations of `nums`.

---

## Approach

### Optimized Approach (O(1) Recurrence Relation Between Rotations)
1. Compute total sum `s` and initial `f = F(0)`.
2. Moving from rotation `i - 1` to `i` shifts every element's weight up by `+1` (`+s`) except the wrapped element `nums[n - i]` whose weight drops from `n - 1` to `0` (`-n * nums[n - i]`):
   `f = f + s - 1L * n * nums[n - i]`.
3. Track the maximum `f` over all rotations.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [396rotate-function.java](./396rotate-function.java) |

---

## Key Learnings

- Relating consecutive rotations algebraically turns an $O(n^2)$ simulation into a single $O(n)$ recurrence.
