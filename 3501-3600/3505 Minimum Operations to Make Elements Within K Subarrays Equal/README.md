---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Math
  - Dynamic Programming
  - Sliding Window
  - Heap (Priority Queue)
---

# 3505. Minimum Operations to Make Elements Within K Subarrays Equal

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-operations-to-make-elements-within-k-subarrays-equal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3505` (`3505`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Dynamic Programming`, `Sliding Window`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` and two integers `x` and `k`.

In a single operation, you may increment or decrement any element of `nums` by 1.

Your goal is to find the **minimum total number of operations** required so that the array contains **at least `k` pairwise non-overlapping subarrays**, each of size **exactly `x`**, such that all elements within each of those `k` subarrays are identical. Elements outside these `k` selected subarrays do not need to be modified.

---

## Examples

### Example 1

**Input:** `nums = [5,-2,1,3,7,3,6,4,-1], x = 3, k = 2`

**Output:** `8`

**Explanation:**

- Use 3 operations to add 3 to `nums[1]` and use 2 operations to subtract 2 from `nums[3]`. The resulting array is `[5, 1, 1, 1, 7, 3, 6, 4, -1]`.

- Use 1 operation to add 1 to `nums[5]` and use 2 operations to subtract 2 from `nums[6]`. The resulting array is `[5, 1, 1, 1, 7, 4, 4, 4, -1]`.

- Now, all elements within each subarray `[1, 1, 1]` (from indices 1 to 3) and `[4, 4, 4]` (from indices 5 to 7) are equal. Since 8 total operations were used, 8 is the output.

### Example 2

**Input:** `nums = [9,-2,-2,-2,1,5], x = 2, k = 2`

**Output:** `3`

**Explanation:**

- Use 3 operations to subtract 3 from `nums[4]`. The resulting array is `[9, -2, -2, -2, -2, 5]`.

- Now, all elements within each subarray `[-2, -2]` (from indices 1 to 2) and `[-2, -2]` (from indices 3 to 4) are equal. Since 3 operations were used, 3 is the output.

---

## Constraints

- `2 <= nums.length <= 10^5`

- `-10^6 <= nums[i] <= 10^6`

- `2 <= x <= nums.length`

- `1 <= k <= 15`

- `2 <= k * x <= nums.length`

---

## Problem Understanding

Key observations and constraints:
1. **Window Size and Subarray Count**: Each chosen subarray must have length exactly `x`, and we must select `k` such disjoint subarrays. Since `k * x <= nums.length`, a valid selection is always possible.
2. **Median Minimizes L1 Cost**: For any fixed subarray of size `x`, the optimal target value that minimizes the sum of absolute deviations `sum(|val - target|)` is the **median** of the subarray elements.
3. **Sliding Window Median Maintenance**: As the window of length `x` slides over `nums`, we need to efficiently add the incoming element, remove the outgoing element, and compute the sum of absolute differences to the median.
4. **Dynamic Programming for Disjoint Selection**: We need to choose `k` disjoint windows of length `x` to minimize the total operations. Let `f[i][j]` be the minimum operations to form `j` valid subarrays using a prefix of length `i`. At index `i`, we can either skip element `nums[i - 1]` (`f[i - 1][j]`), or take the subarray ending at `i - 1` (`nums[i - x ... i - 1]`) with cost `w`, transitioning from `f[i - x][j - 1] + w`.

---

## Approach

### Brute Force Approach

A naive brute-force approach would:
1. Compute the cost for every possible window of length `x` by sorting its elements, picking the median, and computing absolute differences in `O(x log x)` or `O(x)` time per window, yielding `O(n * x)` preprocessing.
2. Recursively try all subsets of `k` non-overlapping intervals of length `x`. The number of ways to choose `k` disjoint intervals of length `x` from `n` elements is combinatorial, bounded by `O(binom(n - k * x + k, k))`, which would result in exponential time `O(n^k)` and cause a Time Limit Exceeded error given `n = 10^5` and `k <= 15`.

### Optimized Approach

The implemented solution combines a **two-TreeMap sliding window median tracker** with **dynamic programming**:
1. **Sliding Median Tracker (`MedianCost`)**:
   - Maintains two ordered frequency maps: `l` (storing the lower half of size `n1`) and `r` (storing the upper half of size `n2`), along with their running element sums `s1` and `s2`.
   - Balances sizes such that `n1 - n2` is either 0 or 1.
   - The median is `mid = l.lastKey()`. The total operations to convert all elements in the window to `mid` is given in `O(1)` by:
     `n1 * mid - s1 + s2 - n2 * mid`.
   - Adding or removing an element from the sliding window takes `O(log x)` time.
2. **Dynamic Programming (`f[i][j]`)**:
   - `f[i][j]` stores the minimum operations to form `j` non-overlapping subarrays using elements up to prefix index `i`.
   - As `i` advances from 1 to `n`, `nums[i - 1]` is added to `MedianCost`. Once `i >= x`, the current window cost `w = mc.query()` is used to update `f[i][j] = min(f[i - 1][j], f[i - x][j - 1] + w)` for all `j in [1, k]`.
   - The outgoing element `nums[i - x]` is then removed from `MedianCost`.
3. The final answer is `f[n][k]`.

### Step-by-Step Thinking Process

1. Recognize that within any single subarray of size `x`, the cost to make all elements equal to some value `T` is `sum |nums[t] - T|`. This L1 distance is minimized when `T` is the median of the subarray.
2. To quickly compute the median cost for every contiguous window of length `x`, use a dual-heap or dual-TreeMap structure (`l` for lower half, `r` for upper half) that tracks counts (`n1`, `n2`) and sums (`s1`, `s2`).
3. Formulate a DP state `f[i][j]` representing the minimum cost to form `j` non-overlapping subarrays of size `x` from prefix `nums[0 ... i - 1]`.
4. Establish transitions: at prefix index `i`, we either skip index `i - 1` with cost `f[i - 1][j]`, or if `i >= x` and `j >= 1`, we take the window `nums[i - x ... i - 1]` with cost `w = mc.query()`, giving `f[i - x][j - 1] + w`.
5. Slide the window incrementally: insert `nums[i - 1]`, query cost `w` when `i >= x`, update DP table for all `j <= k`, and remove `nums[i - x]` to keep the window size bounded by `x`.

### Algorithm / Intuition

In `MedianCost`:
- `l` stores numbers less than or equal to the median, and `r` stores numbers greater than or equal to the median.
- `adjust()` ensures that `n1` (size of `l`) is always equal to or exactly 1 greater than `n2` (size of `r`).
- Because elements in `l` are all `<= mid`, their contribution to the L1 cost is `sum(mid - v) = n1 * mid - s1`.
- Because elements in `r` are all `>= mid`, their contribution is `sum(v - mid) = s2 - n2 * mid`.
- Thus, `query()` returns `n1 * mid - s1 + s2 - n2 * mid` in `O(1)` time.

In `Solution.minOperations`:
- Array `f` of size `(n + 1) x (k + 1)` is initialized with `INF = Long.MAX_VALUE / 4` to prevent overflow on addition, with base case `f[0][0] = 0`.
- For each index `i` from 1 to `n`, `nums[i - 1]` enters `mc`.
- When `i >= x`, `w` is queried. For each count `j`, `f[i][j]` takes the minimum of skipping (`f[i - 1][j]`) and ending a subarray here (`f[i - x][j - 1] + w`).
- `nums[i - x]` is removed from `mc` so that the window continuously spans exactly `x` elements.

---

## Dry Run

Consider `nums = [5, -2, 1, 3, 7, 3, 6, 4, -1]`, `x = 3`, `k = 2`, `n = 9`:

- **Sliding Window Processing (`x = 3`)**:
  - `i = 1`: add `5`. Window `[5]`.
  - `i = 2`: add `-2`. Window `[5, -2]`.
  - `i = 3`: add `1`. Window `[5, -2, 1]`. Median = 1. Window cost `w = |5-1| + |-2-1| + |1-1| = 4 + 3 + 0 = 7`.
    - Update `f[3][1] = min(f[2][1], f[0][0] + 7) = 7`.
    - Remove `nums[0] = 5`.
  - `i = 4`: add `3`. Window `[-2, 1, 3]`. Median = 1. Window cost `w = |-2-1| + |1-1| + |3-1| = 3 + 0 + 2 = 5`.
    - Update `f[4][1] = min(f[3][1], f[1][0] + 5) = min(7, 5) = 5`.
    - Remove `nums[1] = -2`.
  - `i = 5`: add `7`. Window `[1, 3, 7]`. Median = 3. Cost `w = 6`. `f[5][1] = min(5, 6) = 5`. Remove `1`.
  - `i = 6`: add `3`. Window `[3, 7, 3]`. Median = 3. Cost `w = 4`.
    - `f[6][1] = min(f[5][1], f[3][0] + 4) = min(5, 4) = 4`.
    - `f[6][2] = min(f[5][2], f[3][1] + 4) = 7 + 4 = 11`.
    - Remove `nums[3] = 3`.
  - `i = 7`: add `6`. Window `[7, 3, 6]`. Median = 6. Cost `w = 4`. `f[7][1] = 4`, `f[7][2] = min(11, f[4][1] + 4) = min(11, 5 + 4) = 9`. Remove `7`.
  - `i = 8`: add `4`. Window `[3, 6, 4]`. Median = 4. Cost `w = |3-4| + |4-4| + |6-4| = 3`.
    - `f[8][1] = min(4, 3) = 3`.
    - `f[8][2] = min(9, f[5][1] + 3) = min(9, 5 + 3) = 8` (using `nums[1..3]` and `nums[5..7]`).
    - Remove `nums[5] = 3`.
  - `i = 9`: add `-1`. Window `[6, 4, -1]`. Median = 4. Cost `w = 7`.
    - `f[9][2] = min(f[8][2], f[6][1] + 7) = min(8, 4 + 7) = 8`.
- Result: `f[9][2] = 8`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * (log x + k))` — For each of the `n` elements, insertion and deletion in the dual `TreeMap` take `O(log x)` time, and the inner DP loop executes `k + 1` iterations of `O(1)` operations. With `k <= 15` and `x <= n <= 10^5`, this runs comfortably well within the 2-second time limit.
- **Space Complexity:** `O(n * k + x)` — The DP table `f` requires `(n + 1) * (k + 1)` space (up to `10^5 * 16` `long` values), and the `MedianCost` data structure holds at most `x` distinct entries across both `TreeMap` instances.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3505minimum-operations-to-make-elements-within-k-subarrays-equal.java](./3505minimum-operations-to-make-elements-within-k-subarrays-equal.java) |

---

## Key Learnings

- The median is the unique point that minimizes the sum of absolute deviations (`L1` norm), making median tracking standard for minimum equalizing operations.
- A dual-balanced structure (two heaps or two TreeMaps) maintaining count and running sum allows `O(log W)` insertion/deletion and `O(1)` median cost evaluation for sliding windows.
- When selecting `k` disjoint fixed-length intervals, combining a sliding-window precomputation/stream with standard interval DP `f[i][j] = min(f[i-1][j], f[i-x][j-1] + cost)` decouples window evaluation from interval selection.
