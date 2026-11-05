---
comments: true
difficulty: Easy
tags:
  - Array
---

# 1800. Maximum Ascending Subarray Sum

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-ascending-subarray-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1800` (`1800`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of **positive** integers `nums`, return the **maximum possible sum** of a strictly increasing contiguous subarray in `nums`.

---

## Examples

### Example 1

```text
Input: nums = [10,20,30,5,10,50]
Output: 65
Explanation: [5,10,50] is the ascending subarray with the maximum sum of 65.
```

### Example 2

```text
Input: nums = [10,20,30,40,50]
Output: 150
Explanation: [10,20,30,40,50] is the ascending subarray with the maximum sum of 150.
```

### Example 3

```text
Input: nums = [12,17,15,13,10,11,12]
Output: 33
Explanation: [10,11,12] is the ascending subarray with the maximum sum of 33.
```

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 100`

---

## Problem Understanding

- **Strictly Increasing Condition:** Every adjacent pair in the subarray must satisfy `nums[i - 1] < nums[i]`; equal adjacent values (`nums[i - 1] == nums[i]`) break the ascending run.
- **All Positive Elements:** Because `nums[i] >= 1`, extending a valid strictly increasing subarray **always** increases its sum — we never want to stop early while the run continues to ascend.
- **Maximal Runs Partition the Array:** `nums` naturally partitions into maximal strictly increasing runs, and the answer is simply the largest run sum.

---

## Approach

### Brute Force Approach

Checking every starting index `i` and extending `j >= i` while `nums[j] > nums[j - 1]` recomputes overlapping suffixes of ascending runs, taking `O(n^2)` time in the worst case (e.g., when the entire array is strictly increasing).

### Optimized Approach

Scan `nums` once while tracking the current ascending subarray sum `t` and the best sum `ans`. Extend `t += nums[i]` when `i == 0` or `nums[i] > nums[i - 1]`; otherwise reset `t = nums[i]`.

### Step-by-Step Thinking Process

1. Maintain `t` for the sum of the current strictly increasing subarray ending at index `i`, and `ans` for the global maximum.
2. At `i = 0` or whenever `nums[i] > nums[i - 1]`, append `nums[i]` to the active run (`t += nums[i]`) and update `ans = Math.max(ans, t)`.
3. Whenever `nums[i] <= nums[i - 1]`, the ascending streak breaks, so start a fresh run with `t = nums[i]`.
4. Subtle correctness check: why doesn't `else { t = nums[i]; }` need `ans = Math.max(ans, t)`? Because `i >= 1` in the `else` branch and `nums[i] <= nums[i - 1]`, while `ans` is already at least `nums[i - 1]` from earlier steps!

### Algorithm / Intuition

Because all integers in `nums` are positive, we greedily extend the current ascending run as far as possible. At `i = 0`, `i == 0` triggers the `if` branch, setting `t = nums[0]` and `ans = nums[0]`. For `i >= 1`, if `nums[i] > nums[i - 1]`, `t` grows by `nums[i]` and updates `ans`. If `nums[i] <= nums[i - 1]`, `t` resets to `nums[i]`; since `ans >= nums[i - 1] >= nums[i]`, `t` cannot beat `ans` on the reset step itself (and if subsequent elements ascend above `nums[i]`, the `if` branch will update `ans` then).

---

## Dry Run

Using **Example 1**: `nums = [10, 20, 30, 5, 10, 50]`

Initially: `ans = 0`, `t = 0`.

| `i` | `nums[i]` | Condition `i == 0 || nums[i] > nums[i - 1]` | `t` | `ans` |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `10` | `i == 0` (`true`) | `10` | `10` |
| `1` | `20` | `20 > 10` (`true`) | `30` | `30` |
| `2` | `30` | `30 > 20` (`true`) | `60` | `60` |
| `3` | `5` | `5 > 30` (`false`) | `5` | `60` |
| `4` | `10` | `10 > 5` (`true`) | `15` | `60` |
| `5` | `50` | `50 > 10` (`true`) | `65` | `65` |

Final return value: `65`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Single pass through `nums` with `O(1)` operations per element.
- **Space Complexity:** `O(1)` — Only two integer accumulators (`ans` and `t`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1800maximum-ascending-subarray-sum.java](./1800maximum-ascending-subarray-sum.java) |

---

## Key Learnings

- When array values are strictly positive, maximal valid segments always dominate any sub-segments inside them.
- Understanding invariants (`ans >= nums[i - 1] >= nums[i]` on a non-increasing step) lets us verify why updating `ans` only on ascending steps is completely bug-free.
