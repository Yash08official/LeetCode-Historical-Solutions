---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Dynamic Programming
  - Longest Increasing Subsequence
---

# 300. Longest Increasing Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0300` (`300`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Dynamic Programming`, `Longest Increasing Subsequence` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, find and return the length of its longest **strictly increasing subsequence**.

A subsequence is formed by deleting zero or more elements from `nums` without changing the relative order of the remaining elements, and it is strictly increasing if every element is strictly greater than the element before it.

---

## Examples

### Example 1

```text
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
```

### Example 2

```text
Input: nums = [0,1,0,3,2,3]
Output: 4
```

### Example 3

```text
Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

---

## Constraints

- `1 <= nums.length <= 2500`

- `-10^4 <= nums[i] <= 10^4`

---

## Follow-up Questions

Can you come up with an algorithm that runs in `O(n log(n))` time complexity?

To achieve `O(n log n)` time, maintain a greedy array `tails` where `tails[k]` stores the **smallest possible tail element** of any increasing subsequence of length `k + 1` seen so far. Since `tails` is always strictly increasing, for each `x` in `nums` we can binary-search (`lower_bound`) for the first index in `tails` with `tails[idx] >= x`: replace `tails[idx] = x` if found, or append `x` to extend the maximum length by `1`.

---

## Problem Understanding

- Elements in the subsequence do not need to be contiguous in `nums`, only at strictly increasing indices `i_1 < i_2 < ... < i_k` with `nums[i_1] < nums[i_2] < ... < nums[i_k]`.
- Equal values (such as `[7, 7, 7]`) cannot extend a **strictly** increasing subsequence (`nums[j] < nums[i]`, not `<=`).
- With `nums.length <= 2500`, a quadratic `O(n^2)` dynamic programming approach performs at most `~3.1 * 10^6` comparisons, comfortably passing within time limits.

---

## Approach

### Brute Force Approach

Generating all `2^n` subsequences (choosing to include or exclude each element while tracking the previous chosen value) explores an exponential search tree in `O(2^n)` time, which times out well before `n = 2500`.

### Optimized Approach

Use bottom-up 1D Dynamic Programming where `f[i]` stores the length of the longest strictly increasing subsequence ending specifically at index `i`, computed by scanning all earlier indices `0 <= j < i` with `nums[j] < nums[i]`.

### Step-by-Step Thinking Process

1. Define state `f[i]` as the maximum length of a strictly increasing subsequence whose final element is `nums[i]`.
2. Initialize every entry of `f` to `1` (`Arrays.fill(f, 1)`) and `ans = 1`, since any single element by itself is a valid increasing subsequence of length `1`.
3. For each index `i` from `1` to `n - 1`, inspect every preceding index `j` from `0` to `i - 1`.
4. Whenever `nums[j] < nums[i]`, `nums[i]` can extend the best subsequence ending at `j`, giving transition `f[i] = Math.max(f[i], f[j] + 1)`.
5. Update global maximum `ans = Math.max(ans, f[i])` after finishing each `i`, because the overall LIS could end at any index.

### Algorithm / Intuition

If we fix `nums[i]` as the last element of an increasing subsequence, the second-to-last element must be some `nums[j]` with `j < i` and `nums[j] < nums[i]`. By optimal substructure, to maximize the total length ending at `i`, we should attach `nums[i]` to whichever valid predecessor `j` already achieves the largest `f[j]`. Computing `f[0], f[1], ..., f[n - 1]` left-to-right ensures all `f[j]` values are ready when we reach `i`.

---

## Dry Run

Tracing **Example 1** (`nums = [10, 9, 2, 5, 3, 7, 101, 18]`):

| `i` | `nums[i]` | Valid `j < i` with `nums[j] < nums[i]` | `f[i]` | `ans` |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `10` | — (initial) | `1` | `1` |
| `1` | `9` | none | `1` | `1` |
| `2` | `2` | none | `1` | `1` |
| `3` | `5` | `j=2 (2 < 5, f[2]=1)` | `2` | `2` |
| `4` | `3` | `j=2 (2 < 3, f[2]=1)` | `2` | `2` |
| `5` | `7` | `j=2 (f=1), j=3 (f=2), j=4 (f=2)` | `3` | `3` |
| `6` | `101` | `j=0..5` (max `f[5]=3`) | `4` | `4` |
| `7` | `18` | `j=0..5` (max `f[5]=3`) | `4` | `4` |

Returns `ans = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Two nested loops evaluate `n * (n - 1) / 2` index pairs `(j, i)` in `O(1)` time each.
- **Space Complexity:** `O(n)` — The DP array `f` allocates `n` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [300longest-increasing-subsequence.java](./300longest-increasing-subsequence.java) |

---

## Key Learnings

- Defining DP states as 'best valid structure **ending exactly at index `i`**' (`f[i]`) makes subsequence compatibility checks (`nums[j] < nums[i]`) trivial.
- Always track `ans = Math.max(ans, f[i])` across all `i` rather than returning `f[n - 1]`, because the longest subsequence need not include the last element of `nums`.
