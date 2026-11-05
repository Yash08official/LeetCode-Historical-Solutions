---
comments: true
difficulty: Medium
tags:
  - Array
  - Prefix Sum
---

# 2270. Number of Ways to Split Array

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-ways-to-split-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2270` (`2270`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed integer array `nums` of length `n`. A split at index `i` divides the array into two non-empty contiguous sections: a prefix spanning from index `0` to index `i`, and a suffix spanning from index `i + 1` to index `n - 1`.

A split at index `i` is considered a valid split if:
1. The sum of the first `i + 1` elements (prefix sum) is greater than or equal to the sum of the remaining `n - i - 1` elements (suffix sum).
2. There is at least one element to the right of index `i`, which means `0 <= i < n - 1`.

Your task is to compute and return the total number of valid splits in `nums`.

---

## Examples

### Example 1

```text
Input: nums = [10,4,-8,7]
Output: 2
Explanation:
There are three ways of splitting nums into two non-empty parts:
- Split nums at index 0. Then, the first part is [10], and its sum is 10. The second part is [4,-8,7], and its sum is 3. Since 10 >= 3, i = 0 is a valid split.
- Split nums at index 1. Then, the first part is [10,4], and its sum is 14. The second part is [-8,7], and its sum is -1. Since 14 >= -1, i = 1 is a valid split.
- Split nums at index 2. Then, the first part is [10,4,-8], and its sum is 6. The second part is [7], and its sum is 7. Since 6 < 7, i = 2 is not a valid split.
Thus, the number of valid splits in nums is 2.
```

### Example 2

```text
Input: nums = [2,3,1,0]
Output: 2
Explanation:
There are two valid splits in nums:
- Split nums at index 1. Then, the first part is [2,3], and its sum is 5. The second part is [1,0], and its sum is 1. Since 5 >= 1, i = 1 is a valid split.
- Split nums at index 2. Then, the first part is [2,3,1], and its sum is 6. The second part is [0], and its sum is 0. Since 6 >= 0, i = 2 is a valid split.
```

---

## Constraints

- `2 <= nums.length <= 10^5`

- `-10^5 <= nums[i] <= 10^5`

---

## Problem Understanding

Key observations and constraints:
- The array length `n` satisfies `2 <= n <= 10^5`, and each element satisfies `-10^5 <= nums[i] <= 10^5`.
- Because elements can be up to `10^5`, the total sum of `nums` can reach `10^5 * 10^5 = 10^10`, which exceeds the standard 32-bit signed integer maximum (`~2 * 10^9`). Therefore, prefix and total sums must be stored in 64-bit integers (`long` in Java) to prevent integer overflow.
- The split index `i` must strictly be less than `n - 1` to ensure the right part is non-empty.
- If we know the total sum `s` of the array and the prefix sum `t` up to index `i`, the suffix sum is simply `s - t`. The split condition is therefore `t >= s - t` (or equivalently `2 * t >= s`).

---

## Approach

### Brute Force Approach

A naive approach would iterate over every possible split index `i` from `0` to `n - 2`. For each index `i`, it would compute the prefix sum `nums[0..i]` using a loop of size `i + 1`, and the suffix sum `nums[i+1..n-1]` using another loop of size `n - i - 1`. Finally, it would compare the two sums.

This leads to an `O(n)` summation for each of the `n - 1` potential split points, yielding an overall time complexity of `O(n^2)`. With `n = 10^5`, `n^2 = 10^10` operations, which will result in Time Limit Exceeded (TLE).

### Optimized Approach

The optimal approach precomputes the total array sum `s` in a single pass using a 64-bit integer. Then, it iterates through `nums` from index `0` to `n - 2`, maintaining a running prefix sum `t`. At each index `i`, the suffix sum is derived in `O(1)` as `s - t`. If `t >= s - t`, the split is valid and an answer counter is incremented. This reduces the total time to `O(n)` while requiring only `O(1)` auxiliary space.

### Step-by-Step Thinking Process

1. Observe that a split partitions `nums` into prefix `nums[0..i]` and suffix `nums[i+1..n-1]`.
2. Notice that suffix sum is always equal to `total_sum - prefix_sum`. Thus, calculating prefix sum is sufficient to evaluate both parts.
3. Account for integer overflow: `10^5` elements each up to `10^5` can sum to `10^10`, requiring `long` variables.
4. Compute the total sum `s` in a first pass over `nums`.
5. Perform a second pass up to index `n - 2` maintaining running prefix sum `t`. At each index, evaluate `t >= s - t` and increment the valid split count `ans`.

### Algorithm / Intuition

In `Solution.waysToSplitArray`, we initialize `long s = 0` and iterate over `nums` to accumulate the total sum of all elements. We then declare a running prefix accumulator `long t = 0` and a counter `int ans = 0`.

We iterate index `i` from `0` with loop condition `i + 1 < nums.length`, which enforces `0 <= i < n - 1` so that the right partition is never empty. In each iteration, we add `nums[i]` to `t`. The sum of the remaining suffix elements is `s - t`. The ternary expression `t >= s - t ? 1 : 0` increments `ans` whenever the left sum is at least as large as the right sum. Once the loop finishes, `ans` contains the total number of valid splits.

---

## Dry Run

Consider `nums = [10, 4, -8, 7]` with length `n = 4`:
- Initial pass to compute total sum `s`:
  - `s = 10 + 4 + (-8) + 7 = 13`.
- Second pass over `i` from `0` to `2` (`i + 1 < 4`):
  - `i = 0`: `nums[0] = 10`. Update `t = 0 + 10 = 10`. Suffix sum = `s - t = 13 - 10 = 3`. Check `10 >= 3` (True) -> `ans = 1`.
  - `i = 1`: `nums[1] = 4`. Update `t = 10 + 4 = 14`. Suffix sum = `s - t = 13 - 14 = -1`. Check `14 >= -1` (True) -> `ans = 2`.
  - `i = 2`: `nums[2] = -8`. Update `t = 14 + (-8) = 6`. Suffix sum = `s - t = 13 - 6 = 7`. Check `6 >= 7` (False) -> `ans = 2`.
- Loop terminates as `i = 3` has `i + 1 = 4 < 4` (False).
- Output: `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The array is traversed twice: once to compute the total sum `s`, and once to evaluate the running prefix sum `t` across `n - 1` indices. Each step performs constant-time arithmetic.
- **Space Complexity:** `O(1)` — Only a constant number of scalar variables (`s`, `t`, `ans`, `i`) are used, requiring no extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2270number-of-ways-to-split-array.java](./2270number-of-ways-to-split-array.java) |

---

## Key Learnings

- Recognizing that `suffix_sum = total_sum - prefix_sum` avoids the need for an explicit prefix array or nested summation loops.
- Always assess numeric bounds when summing arrays: values up to `10^5` with length `10^5` will overflow a 32-bit signed integer, mandating 64-bit `long` accumulators.
- Boundary conditions like 'at least one element to the right' are cleanly enforced by iterating while `i + 1 < nums.length`.
