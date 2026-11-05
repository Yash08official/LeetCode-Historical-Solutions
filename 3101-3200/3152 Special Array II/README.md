---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Prefix Sum
---

# 3152. Special Array II

**[View Problem on LeetCode](https://leetcode.com/problems/special-array-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3152` (`3152`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

An array is considered special if every pair of its adjacent elements contains numbers of different parities (alternating even and odd). We are given an integer array `nums` and a 2D integer array `queries` where `queries[i] = [from_i, to_i]`.

For each query, we need to check whether the subarray `nums[from_i..to_i]` is special. We return a boolean array `ans` where `ans[i]` is `true` if the subarray is special, and `false` otherwise.

---

## Examples

### Example 1

**Input:** `nums = [3,4,1,2,6], queries = [[0,4]]`

**Output:** `[false]`

**Explanation:**

The subarray is `[3,4,1,2,6]`. 2 and 6 are both even.

### Example 2

**Input:** `nums = [4,3,1,6], queries = [[0,2],[2,3]]`

**Output:** `[false,true]`

**Explanation:**

- The subarray is `[4,3,1]`. 3 and 1 are both odd. So the answer to this query is `false`.

- The subarray is `[1,6]`. There is only one pair: `(1,6)` and it contains numbers with different parity. So the answer to this query is `true`.

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^5`

- `1 <= queries.length <= 10^5`

- `queries[i].length == 2`

- `0 <= queries[i][0] <= queries[i][1] <= nums.length - 1`

---

## Problem Understanding

Key properties and query efficiency requirements:
- The array length `n` and query count `m` can both be up to `10^5`.
- Linearly checking each query in `O(to - from)` would lead to `O(n * m) = 10^{10}` operations, causing Time Limit Exceeded.
- A subarray `nums[from..to]` is special if and only if NO adjacent pair within the range `[from, to]` has equal parity.
- If we compute for each index `i` the start index `d[i]` of the maximal special subarray that ends at index `i`, then the entire subarray `nums[from..to]` is special if and only if `d[to] <= from`!
- This enables `O(1)` query responses after an `O(n)` prefix precomputation.

---

## Approach

### Brute Force Approach

For each query `[from, to]`, loop `k` from `from + 1` to `to` and check if `nums[k] % 2 == nums[k - 1] % 2`. If any pair has identical parity, return `false`, else `true`. This naive method takes `O(m * n)` time, resulting in TLE.

### Optimized Approach

We precalculate an array `d` of length `n`, where `d[i]` denotes the leftmost index of the contiguous special subarray ending at `i`.
- Base case: `d[0] = 0`.
- For `i` from 1 to `n - 1`: if `nums[i] % 2 != nums[i - 1] % 2`, parity alternates, so the streak continues: `d[i] = d[i - 1]`. Otherwise, the streak is broken, and a new special segment begins at index `i`: `d[i] = i`.
- For each query `[from, to]`, the subarray is special if and only if `d[to] <= from`. We assign `ans[i] = (d[queries[i][1]] <= queries[i][0])` in `O(1)` time.

### Step-by-Step Thinking Process

1. We have range queries asking whether all adjacent pairs in `[from, to]` alternate in parity.
2. Parity violations are index positions `j` where `nums[j] % 2 == nums[j - 1] % 2`.
3. If we record the most recent violation, or equivalently the start of the current alternating segment, we can answer queries instantly.
4. Define `d[i]` as the earliest index from which elements continuously alternate parity up to index `i`.
5. If `nums[i] % 2 != nums[i - 1] % 2`, `d[i] = d[i - 1]`; else `d[i] = i`.
6. Then subarray `[from, to]` is valid if and only if `d[to] <= from`.

### Algorithm / Intuition

The algorithm combines DP-like streak tracking with constant-time query answering:
1. Allocate `int[] d = new int[n]`.
2. Loop `i` from `1` to `n - 1`:
   - If `nums[i] % 2 != nums[i - 1] % 2`, set `d[i] = d[i - 1]`.
   - Else, set `d[i] = i`.
3. Allocate `boolean[] ans = new boolean[m]`.
4. For each query `i` from `0` to `m - 1`:
   - Evaluate `ans[i] = d[queries[i][1]] <= queries[i][0]`.
5. Return `ans`.

---

## Dry Run

Trace on Example 1: `nums = [3, 4, 1, 2, 6], queries = [[0, 4]]`

- Precomputing `d` (`n = 5`):
  - `d[0] = 0`.
  - `i = 1`: `nums[1] (4) % 2 != nums[0] (3) % 2` -> `d[1] = d[0] = 0`.
  - `i = 2`: `nums[2] (1) % 2 != nums[1] (4) % 2` -> `d[2] = d[1] = 0`.
  - `i = 3`: `nums[3] (2) % 2 != nums[2] (1) % 2` -> `d[3] = d[2] = 0`.
  - `i = 4`: `nums[4] (6) % 2 == nums[3] (2) % 2` (both even!) -> `d[4] = 4`.
  - Array `d = [0, 0, 0, 0, 4]`.
- Query 0: `queries[0] = [0, 4]`:
  - Check `d[4] <= 0` -> `4 <= 0` is `false`.
  - `ans[0] = false`.
- Return `[false]`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n + m) — Precomputing `d` takes O(n) time, and each of the m queries is resolved in O(1) time.
- **Space Complexity:** O(n + m) — Array `d` of length n to store segment start positions, and `ans` of length m for the results.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3152special-array-ii.java](./3152special-array-ii.java) |

---

## Key Learnings

- Tracking the left boundary of contiguous valid properties transforms range validity queries into simple comparison tests (`d[to] <= from`).
- This left-boundary array approach is an elegant alternative to prefix sum arrays of violation indicators.
- Precomputing structural boundaries reduces query time from `O(n)` to `O(1)`.
