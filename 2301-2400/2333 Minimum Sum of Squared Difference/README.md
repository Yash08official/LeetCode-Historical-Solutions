---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Greedy
  - Sorting
  - Heap (Priority Queue)
---

# 2333. Minimum Sum of Squared Difference

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-sum-of-squared-difference/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2333` (`2333`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Greedy`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given two positive 0-indexed integer arrays `nums1` and `nums2`, both of length `n`. The sum of squared difference between `nums1` and `nums2` is defined as the sum of `(nums1[i] - nums2[i])^2` for each `0 <= i < n`.

You are also given two non-negative integers `k1` and `k2`. You can increment or decrement any element in `nums1` at most `k1` times, and any element in `nums2` at most `k2` times.

Return the minimum possible sum of squared difference after modifying the arrays at most `k1` and `k2` times.

---

## Examples

### Example 1

```text
Input: nums1 = [1,2,3,4], nums2 = [2,10,20,19], k1 = 0, k2 = 0
Output: 579
Explanation: The elements in nums1 and nums2 cannot be modified because k1 = 0 and k2 = 0.
The sum of square difference will be: (1 - 2)^2+ (2 - 10)^2+ (3 - 20)^2+ (4 - 19)^2 = 579.
```

### Example 2

```text
Input: nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1
Output: 43
Explanation: One way to obtain the minimum sum of square difference is:
- Increase nums1[0] once.
- Increase nums2[2] once.
The minimum of the sum of square difference will be:
(2 - 5)^2+ (4 - 8)^2+ (10 - 7)^2+ (12 - 9)^2 = 43.
Note that, there are other ways to obtain the minimum of the sum of square difference, but there is no way to obtain a sum smaller than 43.
```

---

## Constraints

- `n == nums1.length == nums2.length`

- `1 <= n <= 10^5`

- `0 <= nums1[i], nums2[i] <= 10^5`

- `0 <= k1, k2 <= 10^9`

---

## Problem Understanding

Key observations and constraints:
- `n == nums1.length == nums2.length` with `1 <= n <= 10^5`.
- `0 <= nums1[i], nums2[i] <= 10^5`, and `0 <= k1, k2 <= 10^9`.
- Incrementing `nums1[i]` by 1 or decrementing `nums2[i]` by 1 has the exact same effect on their absolute difference `|nums1[i] - nums2[i]|`. Thus, we have a combined total of `k = k1 + k2` operations to reduce the non-negative differences `diff[i] = |nums1[i] - nums2[i]|`.
- If total operations `k >= sum(diff)`, we can reduce all differences to `0`, yielding a minimum sum of squared differences of `0`.
- Because the square function `f(x) = x^2` is convex and grows quadratically, reducing larger differences yields much greater reductions in squared sum than reducing smaller differences. We should greedily decrease the largest differences first (i.e. 'shave off' the peaks).

---

## Approach

### Brute Force Approach

A simulation using a max-heap (priority queue) that decrements the largest difference by 1 in each step would take `O(k log n)` time. Because `k = k1 + k2` can be up to `2 * 10^9`, this approach would perform billions of operations and immediately exceed the time limit.

### Optimized Approach

Binary search on the optimal ceiling threshold. Let `diff[i] = |nums1[i] - nums2[i]|`. We want to find the smallest integer `threshold` such that capping all differences at `threshold` requires at most `k` decrements. That is, `sum(max(0, diff[i] - threshold)) <= k`.

Using binary search over `[0, maxDiff]`, we find this minimum achievable `threshold` in `O(n log(maxDiff))` time. After capping all differences at `threshold`, any remaining operations (`remaining = k - used`) can be distributed by decrementing differences that equal `threshold` down to `threshold - 1`. Finally, compute the sum of squared differences.

### Step-by-Step Thinking Process

1. Observe that `k1` and `k2` combine into `k = (long) k1 + k2` decrements to be applied to `diff[i] = |nums1[i] - nums2[i]|`.
2. If `k >= total_sum(diff)`, answer is `0L`.
3. To minimize `sum(d_i^2)`, we must minimize the maximum difference (leveling the peaks).
4. Binary search for the minimum `threshold` in range `[0, maxDiff]` such that the needed operations `need = sum(max(0, d - mid))` is `<= k`.
5. Set `threshold = low`. Calculate `ans` with values clamped to `min(d, threshold)` and track `used` operations.
6. Distribute remaining `remaining = k - used` operations by decrementing some elements from `threshold` to `threshold - 1`.
7. Accumulate into a 64-bit integer (`long`) to avoid overflow.

### Algorithm / Intuition

In `Solution.minSumSquareDiff`, `k = (long) k1 + k2` combines both operation budgets. An array `diff` records `Math.abs(nums1[i] - nums2[i])`, tracking `maxDiff` and `total`. If `k >= total`, we immediately return `0L`.

A binary search over `[low = 0, high = maxDiff]` checks `mid`. For each element, `if (d > mid) need += d - mid`. If `need <= k`, `high = mid`; otherwise `low = mid + 1`. This converges on `threshold = low`.

Next, we iterate through `diff`: for each `d`, `value = Math.min(d, threshold)`, we track `used += d - value`, and accumulate `ans += (long) value * value`. Finally, `remaining = k - used` operations are spent by reducing elements where `d >= threshold` from `threshold` to `threshold - 1` (updating `ans -= threshold^2; ans += (threshold - 1)^2`), decreasing `remaining` until 0. The final `ans` is returned.

---

## Dry Run

Consider `nums1 = [1, 2, 3, 4]`, `nums2 = [2, 10, 20, 19]`, `k1 = 0, k2 = 0`:
- `k = 0 + 0 = 0`.
- `diff = [|1-2|, |2-10|, |3-20|, |4-19|] = [1, 8, 17, 15]`. `maxDiff = 17`, `total = 41`.
- `k < total`, so binary search runs over `[0, 17]`:
  - For `mid = 17`: `need = 0 <= 0` -> `high = 17`.
  - For any `mid < 17`: `need > 0 > k` -> `low` moves up to 17.
  - Loop terminates with `threshold = 17`.
- Calculate squared sum with `threshold = 17`:
  - `diff[0] = 1`: `value = 1`, `ans += 1^2 = 1`.
  - `diff[1] = 8`: `value = 8`, `ans += 8^2 = 64` (ans = 65).
  - `diff[2] = 17`: `value = 17`, `ans += 17^2 = 289` (ans = 354).
  - `diff[3] = 15`: `value = 15`, `ans += 15^2 = 225` (ans = 579).
- `used = 0`, `remaining = 0`.
- Output: `579`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log(maxDiff))` — Computing differences takes `O(n)`. Binary search takes `log(10^5) ~ 17` iterations, each taking `O(n)` to verify `need`. Post-processing takes two `O(n)` passes. Overall time is strictly `O(n log(maxDiff))`.
- **Space Complexity:** `O(n)` — Required for the integer array `diff` of size `n` to store the absolute differences.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2333minimum-sum-of-squared-difference.java](./2333minimum-sum-of-squared-difference.java) |

---

## Key Learnings

- When operation counts `k` are very large (up to `2 * 10^9`), simulation with heaps TLEs; binary searching the final maximum level solves the problem efficiently.
- Because `x^2` is strictly convex, minimizing sum of squares is equivalent to leveling out the highest values as evenly as possible.
- Discrete integer constraints require two-phase resolution: binary search for the threshold, then greedy distribution of leftover operations.
