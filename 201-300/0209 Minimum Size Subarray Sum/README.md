---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Sliding Window
  - Prefix Sum
---

# 209. Minimum Size Subarray Sum

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-size-subarray-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0209` (`209`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Sliding Window`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of positive integers `nums` and a positive integer `target`, return *the **minimal length** of a **subarray** whose sum is greater than or equal to* `target`. If there is no such subarray, return `0` instead.

---

## Examples

### Example 1

```text
**Input:** target = 7, nums = [2,3,1,2,4,3]
**Output:** 2
**Explanation:** The subarray [4,3] has the minimal length under the problem constraint.
```

### Example 2

```text
**Input:** target = 4, nums = [1,4,4]
**Output:** 1
```

### Example 3

```text
**Input:** target = 11, nums = [1,1,1,1,1,1,1,1]
**Output:** 0
```

 

**

---

## Constraints

**

	
- `1 <= target <= 10^9`
	
- `1 <= nums.length <= 10^5`
	
- `1 <= nums[i] <= 10^4`

 

**Follow up:** If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.

---

## Problem Understanding

- Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is $\ge \text{target}$, or `0` if none exists.

---

## Approach

### Brute-Force vs. Optimized Approach
- **Brute-Force:** Checking all $O(n^2)$ subarrays exceeds time limits for $n = 10^5$.
- **Optimized Approach (Variable-Size Sliding Window):**
  1. Because all numbers in `nums` are positive, expanding the right boundary `r` strictly increases window sum `s`, and shrinking the left boundary `l` strictly decreases `s`.
  2. Maintain `l = 0`, `s = 0`, and `ans = n + 1`.
  3. For each `r` from `0` to `n - 1`:
     - Add `nums[r]` to `s`.
     - While `s >= target`, update `ans = Math.min(ans, r - l + 1)` and shrink window via `s -= nums[l++]`.
  4. Return `ans > n ? 0 : ans`.

### Dry Run (`target = 7`, `nums = [2,3,1,2,4,3]`)
- Window `[2,3,1,2]` (`s = 8 >= 7`) -> `ans = 4`; shrink to `[3,1,2]` (`s = 6`).
- Expand to `[3,1,2,4]` (`s = 10`) -> shrink to `[1,2,4]` (`ans = 3`) -> `[2,4]` (`s = 6`).
- Expand to `[2,4,3]` (`s = 9`) -> shrink to `[4,3]` (`ans = 2`, `s = 7`) -> `[3]` (`s = 3`).
- Returns `2`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Both `l` and `r` move monotonically from `0` to `n - 1` at most once.
- **Space Complexity:** $O(1)$ — Constant auxiliary variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [209minimum-size-subarray-sum.java](./209minimum-size-subarray-sum.java) |

---

## Key Learnings

- Positivity of array elements guarantees monotonicity of window sums, enabling an optimal $O(n)$ two-pointer sliding window.
