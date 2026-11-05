---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Prefix Sum
---

# 3356. Zero Array Transformation II

**[View Problem on LeetCode](https://leetcode.com/problems/zero-array-transformation-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3356` (`3356`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` of length `n` and a 2D integer array `queries`, where each `queries[i] = [l_i, r_i, val_i]`.

Each query allows you to choose any subset of indices in the subarray `nums[l_i..r_i]` and decrement each chosen element by any non-negative amount up to `val_i`.

Your goal is to find the minimum number `k` (`0 <= k <= queries.length`) such that applying the first `k` queries can convert `nums` into a zero array (where every element equals `0`). If it is impossible to transform `nums` into a zero array even after using all available queries, return `-1`.

---

## Examples

### Example 1

**Input:** `nums = [2,0,2], queries = [[0,2,1],[0,2,1],[1,1,3]]`

**Output:** `2`

**Explanation:**

- **For i = 0 (l = 0, r = 2, val = 1):** Decrement values at indices `[0, 1, 2]` by `[1, 0, 1]` respectively.

- The array will become `[1, 0, 1]`.

- **For i = 1 (l = 0, r = 2, val = 1):** Decrement values at indices `[0, 1, 2]` by `[1, 0, 1]` respectively.

- The array will become `[0, 0, 0]`, which is a Zero Array. Therefore, the minimum value of `k` is 2.

### Example 2

**Input:** `nums = [4,3,2,1], queries = [[1,3,2],[0,2,1]]`

**Output:** `-1`

**Explanation:**

- **For i = 0 (l = 1, r = 3, val = 2):** Decrement values at indices `[1, 2, 3]` by `[2, 2, 1]` respectively.

- The array will become `[4, 1, 0, 0]`.

- **For i = 1 (l = 0, r = 2, val = 1):** Decrement values at indices `[0, 1, 2]` by `[1, 1, 0]` respectively.

- The array will become `[3, 0, 0, 0]`, which is not a Zero Array.

---

## Constraints

- `1 <= nums.length <= 10^5`

- `0 <= nums[i] <= 5 * 10^5`

- `1 <= queries.length <= 10^5`

- `queries[i].length == 3`

- `0 <= l_i <= r_i < nums.length`

- `1 <= val_i <= 5`

---

## Problem Understanding

- **Independent Flexible Decrements:** Since each query allows decrementing any covered element by up to `val_i`, the maximum cumulative decrement that can be applied to element `nums[i]` using the first `k` queries is the sum of `val` across all queries whose range covers `i`.
- **Zeroability Condition:** An element `nums[i]` can be reduced to 0 if and only if the total allowable decrement covering index `i` is at least `nums[i]`.
- **Monotonicity for Binary Search:** If `k` queries provide enough decrement power to reduce all elements of `nums` to 0, then any `k' > k` queries will also suffice. This monotonic property allows binary searching for the minimal prefix `k` in the range `[0, queries.length]`.
- **Range Additions via Difference Array:** For a fixed `k`, checking whether all `nums[i]` can be zeroed can be validated in `O(n + k)` using a difference array.

---

## Approach

### Brute Force Approach

A linear search tests `k = 0, 1, 2, ..., m` sequentially. For each `k`, applying `k` queries to an array of size `n` and checking each element takes `O(k * n)` or `O(n + k)`. Running this across all `m` candidates sequentially takes `O(m * (n + m))` time. With `n, m <= 10^5`, this would require up to `10^{10}` operations, causing a Time Limit Exceeded error.

### Optimized Approach

We binary search for the minimum `k` in the range `[0, m + 1]`. For a candidate midpoint `mid`, helper function `check(mid)` constructs a difference array `d` of size `n + 1`. We iterate through the first `mid` queries, performing `d[l] += val` and `d[r + 1] -= val`. We then compute prefix sums `s` of `d`: if `nums[i] > s` for any `i`, `mid` queries are insufficient (`return false`). Otherwise, `check(mid)` returns `true`. If `l > m` at termination, no valid `k` exists, returning `-1`; otherwise, `l` is the answer.

### Step-by-Step Thinking Process

1. Notice that if `k` queries are sufficient, any larger number of queries is also sufficient (monotonicity).
2. Set binary search bounds: `l = 0`, `r = m + 1` where `m = queries.length`.
3. Implement `check(k)` to verify if the first `k` queries cover every `nums[i]` with at least `nums[i]` total capacity.
4. Use a difference array `d` of length `n + 1`: for each of the first `k` queries, do `d[l] += val` and `d[r + 1] -= val`.
5. Prefix-sum `d` to get effective capacity `s` at each index `i`. If `nums[i] > s`, return `false`.
6. If all indices satisfy `nums[i] <= s`, return `true`.
7. Binary search narrows `[l, r)`. If `l > m`, return `-1`; otherwise return `l`.

### Algorithm / Intuition

In `Solution.minZeroArray`: `l` is initialized to 0 and `r` to `m + 1`. While `l < r`, midpoint `mid = (l + r) >> 1` is tested via `check(mid)`. Inside `check(k)`, array `d` of size `n + 1` is populated using difference array updates `d[l] += val` and `d[r + 1] -= val` for the first `k` queries. In a single sweep `for (int i = 0, s = 0; i < n; ++i)`, running prefix sum `s += d[i]` yields the maximum decrement capacity at index `i`. If `nums[i] > s`, the capacity is insufficient to zero `nums[i]`, returning `false`. If all indices pass, `check` returns `true`, prompting `r = mid`. When `l == r`, if `l > m`, transforming to zero is impossible, returning `-1`; otherwise, `l` is the minimal query count.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [2, 0, 2]`, `queries = [[0,2,1],[0,2,1],[1,1,3]]`, `n = 3`, `m = 3`

- Initial search range: `l = 0, r = 4`.
- **Iteration 1:** `mid = (0 + 4) / 2 = 2`.
  - `check(2)` tests first 2 queries: `[0, 2, 1]` and `[0, 2, 1]`.
  - Query 0: `d[0] += 1, d[3] -= 1`
  - Query 1: `d[0] += 1, d[3] -= 1`
  - Difference array `d = [2, 0, 0, -2]`
  - Index 0: `s = 2`, `nums[0] = 2 <= 2` (OK)
  - Index 1: `s = 2`, `nums[1] = 0 <= 2` (OK)
  - Index 2: `s = 2`, `nums[2] = 2 <= 2` (OK)
  - `check(2)` returns `true` -> `r = 2`.
- **Iteration 2:** `mid = (0 + 2) / 2 = 1`.
  - `check(1)` tests query 0 only: `d = [1, 0, 0, -1]`.
  - Index 0: `s = 1`, `nums[0] = 2 > 1` (Fails).
  - `check(1)` returns `false` -> `l = mid + 1 = 2`.
- Search terminates: `l = 2 == r`.
- `l <= m` (`2 <= 3`), so return `2`.

---

## Complexity Analysis

- **Time Complexity:** `O((n + m) log m)` — Binary search performs `O(log m)` checks. Each check builds and scans a difference array of size `n` over at most `m` queries in `O(n + m)` time.
- **Space Complexity:** `O(n)` — The difference array `d` of size `n + 1` is allocated in each check invocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3356zero-array-transformation-ii.java](./3356zero-array-transformation-ii.java) |

---

## Key Learnings

- Range addition problems with monotonic verification naturally decompose into binary search over prefix lengths combined with difference arrays.
- Using a difference array allows verifying range accumulation across `n` indices in `O(n + k)` instead of `O(n * k)`.
