---
comments: true
difficulty: Easy
tags:
  - Array
  - Prefix Sum
---

# 1480. Running Sum of 1d Array

**[View Problem on LeetCode](https://leetcode.com/problems/running-sum-of-1d-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1480` (`1480`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, compute and return its **running sum** array `runningSum`, where each entry `runningSum[i]` equals the sum of all elements from index `0` through index `i` inclusive (`nums[0] + nums[1] + ... + nums[i]`).

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].
```

### Example 2

```text
Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
Explanation: Running sum is obtained as follows: [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].
```

### Example 3

```text
Input: nums = [3,1,2,10,1]
Output: [3,4,6,16,17]
```

---

## Constraints

- `1 <= nums.length <= 1000`

- `-10^6 <= nums[i] <= 10^6`

---

## Problem Understanding

Consecutive running sums obey a simple recurrence relation:
- Base case (`i = 0`): `runningSum[0] = nums[0]`.
- Inductive step (`i >= 1`): `runningSum[i] = (nums[0] + ... + nums[i - 1]) + nums[i] = runningSum[i - 1] + nums[i]`.
- Because `nums.length <= 1000` and `|nums[i]| <= 10^6`, the maximum absolute running sum is at most `10^9`, well within safe integer precision (`2^{53} - 1` in JavaScript).

---

## Approach

### Brute Force Approach

Recomputing `nums[0] + nums[1] + ... + nums[i]` from index `0` with an inner loop for every position `i` performs `1 + 2 + ... + n = n(n + 1) / 2` additions, taking `O(n^2)` time instead of `O(n)`.

### Optimized Approach

The solution computes the **prefix sum array** iteratively in a single left-to-right pass:
- Initialize `runningSum = []` and set `runningSum[0] = nums[0]`.
- For `i = 1` to `nums.length - 1`, set `runningSum[i] = runningSum[i - 1] + nums[i]`.
- Return `runningSum`.

### Step-by-Step Thinking Process

1. Create an output array `runningSum` to store cumulative sums without mutating the caller's `nums` array.
2. Seed the base case `runningSum[0] = nums[0]` (valid since `nums.length >= 1`).
3. Iterate `i` from `1` to `nums.length - 1`, reusing the previous prefix sum `runningSum[i - 1]` and adding `nums[i]`.
4. Return the completed `runningSum` array.

### Algorithm / Intuition

Instead of summing `i + 1` numbers at index `i`, `runningSum[i - 1]` already caches the sum of the first `i` numbers. Adding `nums[i]` performs just **one addition** per element, turning repeated range summation into dynamic programming in its simplest 1D form.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 2, 3, 4]`

- **Base Case**: `runningSum[0] = nums[0] = 1` -> `[1]`
- **`i = 1`**: `runningSum[1] = runningSum[0] + nums[1] = 1 + 2 = 3` -> `[1, 3]`
- **`i = 2`**: `runningSum[2] = runningSum[1] + nums[2] = 3 + 3 = 6` -> `[1, 3, 6]`
- **`i = 3`**: `runningSum[3] = runningSum[2] + nums[3] = 6 + 4 = 10` -> `[1, 3, 6, 10]`

Returns `[1, 3, 6, 10]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single loop visits each of the `n` elements once, performing one addition per step.
- **Space Complexity:** `O(n)` — The output array `runningSum` stores `n` numbers (`O(1)` auxiliary space beyond the returned result).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1480running-sum-of-1d-array.js](./1480running-sum-of-1d-array.js) |

---

## Key Learnings

- Prefix sums (`P[i] = P[i - 1] + nums[i]`) are the foundational building block for answering arbitrary subarray sum queries `sum(l..r) = P[r] - P[l - 1]` in `O(1)` time.
- Returning a new array `runningSum` avoids mutating the input array `nums`, which is safer when callers still need the original data.
