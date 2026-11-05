---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Brainteaser
---

# 2419. Longest Subarray With Maximum Bitwise AND

**[View Problem on LeetCode](https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2419` (`2419`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Brainteaser` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `nums` of size `n`.

Consider all possible non-empty contiguous subarrays of `nums` and determine the maximum possible bitwise AND value among them. Let this maximum value be $k$.

Return the length of the **longest** contiguous subarray whose bitwise AND equals $k$.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation:
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.
```

### Example 2

```text
Input: nums = [1,2,3,4]
Output: 1
Explanation:
The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^6`

---

## Problem Understanding

The fundamental property of bitwise AND is that for any non-negative integers $a$ and $b$, $a \text{ AND } b \le \min(a, b)$. Bitwise AND can only clear bits, never set them. Consequently, the bitwise AND of any subarray cannot exceed the largest individual number in that subarray, and the maximum possible bitwise AND across all subarrays is simply the maximum value in the entire array, $\max(\text{nums})$.

Furthermore, if any element in a subarray is strictly smaller than this maximum value, the bitwise AND of that subarray will strictly be smaller than the maximum. Therefore, a subarray has bitwise AND equal to $\max(\text{nums})$ if and only if **all** of its elements equal $\max(\text{nums})$. The problem thus reduces to finding the length of the longest contiguous sequence of the maximum element in `nums`.

---

## Approach

### Brute Force Approach

A brute-force solution evaluates all $O(n^2)$ possible contiguous subarrays, computes their bitwise AND in $O(1)$ incrementally, finds the global maximum AND value $k$, and records the maximum subarray length achieving $k$. For $n = 10^5$, an $O(n^2)$ approach requires $10^{10}$ operations, which causes a Time Limit Exceeded (TLE).

### Optimized Approach

Perform two linear passes over `nums`: the first pass determines the maximum element `mx`, and the second pass scans the array to track and maximize the length of consecutive occurrences of `mx`.

### Step-by-Step Thinking Process

1. Analyze bitwise AND properties: $a \& b \le a$ and $a \& b \le b$. The AND of any set of numbers cannot exceed the maximum element present.
2. Deduce that the maximum possible subarray bitwise AND must be $mx = \max(nums)$.
3. Observe that including any number $v < mx$ in a subarray will clear at least one bit present in $mx$, making the resulting AND strictly less than $mx$.
4. Conclude that only subarrays containing exclusively $mx$ can achieve the bitwise AND equal to $mx$.
5. Reduce the problem to: find the maximum number of consecutive occurrences of $mx$ in `nums`.

### Algorithm / Intuition

In the provided JavaScript solution:

1. In the first loop, `mx` is calculated by finding `Math.max(mx, v)` across all numbers in `nums`.
2. In the second loop, two variables are maintained: `cnt` (the current consecutive streak of `mx`) and `ans` (the maximum streak found so far).
3. For each value `v`: if `v === mx`, we increment `cnt` and update `ans = Math.max(ans, cnt)`. If `v !== mx`, the streak is broken, so `cnt` resets to `0`.
4. At the end, `ans` holds the length of the longest subarray with bitwise AND equal to `mx`.

---

## Dry Run

Consider Example 1: `nums = [1, 2, 3, 3, 2, 2]`

1. **Pass 1 (Find max)**:
   - Elements scanned: `1, 2, 3, 3, 2, 2` -> `mx = 3`.

2. **Pass 2 (Track streak of 3)**:
   - `v = 1`: `v !== 3` -> `cnt = 0`, `ans = 0`.
   - `v = 2`: `v !== 3` -> `cnt = 0`, `ans = 0`.
   - `v = 3`: `v === 3` -> `cnt = 1`, `ans = max(0, 1) = 1`.
   - `v = 3`: `v === 3` -> `cnt = 2`, `ans = max(1, 2) = 2`.
   - `v = 2`: `v !== 3` -> `cnt = 0`, `ans = 2`.
   - `v = 2`: `v !== 3` -> `cnt = 0`, `ans = 2`.

Final Return: `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate through the array `nums` twice: once to find the maximum value, and once to find the longest consecutive streak of that maximum.
- **Space Complexity:** `O(1)` — Only scalar variables (`mx`, `ans`, `cnt`) are used, requiring strictly constant extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2419longest-subarray-with-maximum-bitwise-and.js](./2419longest-subarray-with-maximum-bitwise-and.js) |

---

## Key Learnings

- Mathematical and bitwise properties can dramatically simplify seemingly complex subarray problems.
- Bitwise AND is non-increasing under subset inclusion: $A \subseteq B \implies \text{AND}(B) \le \text{AND}(A)$.
- Two simple linear passes achieve optimal $O(n)$ time and $O(1)$ space without any auxiliary arrays or sliding window data structures.
