---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Sliding Window
  - Sorting
---

# 2779. Maximum Beauty of an Array After Applying Operation

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2779` (`2779`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Sliding Window`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed integer array `nums` and a non-negative integer `k`.

In a single operation, we can replace any `nums[i]` with any integer in the range `[nums[i] - k, nums[i] + k]`. Each index can be operated on at most once.

The **beauty** of the array is the length of the longest subsequence consisting of equal elements. We need to find the **maximum possible beauty** of `nums` after applying operations.

---

## Examples

### Example 1

```text
Input: nums = [4,6,1,2], k = 2
Output: 3
Explanation: In this example, we apply the following operations:
- Choose index 1, replace it with 4 (from range [4,8]), nums = [4,4,1,2].
- Choose index 3, replace it with 4 (from range [0,4]), nums = [4,4,1,4].
After the applied operations, the beauty of the array nums is 3 (subsequence consisting of indices 0, 1, and 3).
It can be proven that 3 is the maximum possible length we can achieve.
```

### Example 2

```text
Input: nums = [1,1,1,1], k = 10
Output: 4
Explanation: In this example we don't have to apply any operations.
The beauty of the array nums is 4 (whole array).
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `0 <= nums[i], k <= 10^5`

---

## Problem Understanding

Key insights:
- Choosing equal elements in a subsequence means finding a single target value `y` that can be formed by as many `nums[i]` as possible.
- An element `nums[i]` can become `y` if and only if $nums[i] - k \le y \le nums[i] + k$, which is equivalent to $|nums[i] - y| \le k$.
- Each `nums[i]` contributes an interval of valid target values: $[nums[i] - k, nums[i] + k]$.
- The problem is equivalent to finding the maximum number of overlapping intervals across all `nums[i]`.
- Shifting all intervals by $+k$ maps the valid target interval for `x = nums[i]` to $[x, x + 2k]$.

---

## Approach

### Brute Force Approach

A naive approach would test every possible target value `y` from $\min(nums) - k$ to $\max(nums) + k$. For each candidate `y`, iterate through all elements in `nums` to count how many satisfy $|nums[i] - y| \le k$. With $nums[i] \le 10^5$ and $n \le 10^5$, testing $10^5$ candidate values takes $O(N \cdot \text{range}) \approx 10^{10}$ operations, causing Time Limit Exceeded.

### Optimized Approach

The solution uses a difference array (sweep-line algorithm on an array):
1. Each element `x = nums[i]` covers range $[x, x + 2k]$ (using 0-shifted coordinates).
2. Allocate a difference array `d` of size `max(nums) + 2k + 2`.
3. For each `x` in `nums`, increment `d[x]++` and decrement `d[x + 2k + 1]--`.
4. Compute the prefix sum of `d` while tracking the maximum sum `ans`. The maximum prefix sum equals the maximum overlapping intervals.

### Step-by-Step Thinking Process

1. Formulate the problem as finding the maximum point overlap among intervals $[nums[i] - k, nums[i] + k]$.
2. Offset intervals by $+k$ so all coordinates are non-negative: $[nums[i], nums[i] + 2k]$.
3. Use a difference array `d` where starting an interval at `x` adds $+1$ and ending after `x + 2k` subtracts $-1$ (`d[x + 2k + 1]--`).
4. The maximum array size required is $\max(nums) + 2k + 2 \le 10^5 + 2 \times 10^5 + 2 = 300,002$, which easily fits in memory.
5. Iterate through `d`, maintaining a running sum `s += d[i]`, and update `ans = max(ans, s)`.
6. Return `ans`.

### Algorithm / Intuition

The difference array `d` records the boundaries of interval coverage. For each number `x` in `nums`, its shifted coverage interval is $[x, x + 2k]$. Marking `d[x]++` records the start of coverage, and marking `d[x + 2k + 1]--` cancels the coverage just after the interval ends. When we compute the prefix sum `s += x` across `d`, `s` at each coordinate represents the exact number of elements in `nums` that can be transformed into that coordinate's value. The maximum value attained by `s` is the maximum beauty.

---

## Dry Run

We trace Example 1 with `nums = [4, 6, 1, 2]` and `k = 2`:

- Length of coverage for each element is $2k = 4$.
- Elements and their shifted intervals $[x, x + 4]$:
  - `x = 4`: interval `[4, 8]` -> `d[4]++`, `d[9]--`
  - `x = 6`: interval `[6, 10]` -> `d[6]++`, `d[11]--`
  - `x = 1`: interval `[1, 5]` -> `d[1]++`, `d[6]--`
  - `x = 2`: interval `[2, 6]` -> `d[2]++`, `d[7]--`
- Computing running prefix sum `s`:
  - At 1: `s = 1`
  - At 2: `s = 2`
  - At 4: `s = 3` (intervals 1, 2, and 4 all cover point 4!)
  - Max `s` seen is `3`.
- Output `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + M + k)` where `n = nums.length` and `M = max(nums)`. Finding the maximum takes $O(n)$, updating the difference array takes $O(n)$, and prefix sum takes $O(M + k)$. For $M, k \le 10^5$, this is $\approx 3 \times 10^5$ operations, completing in milliseconds.
- **Space Complexity:** `O(M + k)` to store the difference array `d` of size up to $3 \times 10^5$ integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2779maximum-beauty-of-an-array-after-applying-operation.java](./2779maximum-beauty-of-an-array-after-applying-operation.java) |

---

## Key Learnings

- Transforming individual value ranges $[x - k, x + k]$ into a sweep-line interval overlap problem unifies the solution.
- Coordinate shifting by $+k$ eliminates negative array indices.
- Difference arrays allow range updates in $O(1)$ time and total overlap computation in a single linear prefix sum pass.
