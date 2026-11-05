---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Sorting
---

# 462. Minimum Moves to Equal Array Elements II

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0462` (`462`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` of length `n`, return the **minimum number of moves** required to make all elements equal, where a single move increments or decrements any one element by `1`.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3]
Output: 2
Explanation:
Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
```

### Example 2

```text
Input: nums = [1,10,2,9]
Output: 16
```

---

## Constraints

- `n == nums.length`

- `1 <= nums.length <= 10^5`

- `-10^9 <= nums[i] <= 10^9`

---

## Problem Understanding

- **L1 distance minimization:** If every element is transformed to some target integer `k`, each element `v` requires `|v - k|` moves, for a total cost of `sum(|v - k|)`.
- **Median optimality property:** Unlike minimizing squared distances `sum((v - k)^2)` (which chooses the arithmetic mean), minimizing absolute deviations `sum(|v - k|)` is achieved when `k` is a **median** of `nums`!
- **Odd vs. even `n`:** When sorted, if `n` is odd, `nums[n / 2]` is the unique median. If `n` is even, *any* integer in `[nums[n / 2 - 1], nums[n / 2]]` achieves the exact same minimum sum because pairing outer elements `(nums[i], nums[n - 1 - i])` always contributes `nums[n - 1 - i] - nums[i]` for any target `k` between them.

---

## Approach

### Brute Force Approach

Testing every element in `nums` as a candidate target `k` and computing `sum(|v - k|)` for each candidate takes `O(n^2)` time, which exceeds the time limit for `n = 10^5`.

### Optimized Approach

Use **Sorting + Median Selection**: sort `nums` in ascending order, pick the middle element `k = nums[nums.length >> 1]` as the median target, and accumulate `Math.abs(v - k)` across the array.

### Step-by-Step Thinking Process

1. Formulate the total move count for target `k` as `f(k) = sum_{v in nums} |v - k|`.
2. Imagine sliding `k` by `+1`: every element `<= k` increases its distance by `+1`, while every element `> k` decreases its distance by `-1`. Thus `f(k)` decreases until at least half the elements are `<= k`, and increases once more than half are `<= k`.
3. Sort `nums` so the median sits directly at index `nums.length >> 1` (`n / 2`).
4. Iterate through `nums` and sum `Math.abs(v - k)` (note the problem guarantees the total answer fits in a 32-bit `int`, and since `v` and `k` are both elements of `nums` sorted near the middle—wait: what if `v - k` overflows `int`? Wait: `-10^9 <= nums[i] <= 10^9`, so `|v - k| <= 2 * 10^9 < 2^31 - 1`, meaning `v - k` NEVER overflows a 32-bit signed integer!).

### Algorithm / Intuition

In `minMoves2(int[] nums)`:
1. `Arrays.sort(nums)` arranges the array in non-decreasing order.
2. `int k = nums[nums.length >> 1]` selects the upper-middle element (`nums[n / 2]`), which is a valid median for both odd and even array lengths.
3. The enhanced `for` loop accumulates `ans += Math.abs(v - k)`. Because `-10^9 <= v, k <= 10^9`, the difference `v - k` lies within `[-2 * 10^9, 2 * 10^9]`, safely inside Java's `int` range (`[-2147483648, 2147483647]`), and the problem guarantees the final `ans` also fits in `32`-bit `int`.

---

## Dry Run

Tracing **Example 1** with `nums = [1, 2, 3]`:

1. `Arrays.sort(nums)` -> `nums = [1, 2, 3]`.
2. `k = nums[3 >> 1] = nums[1] = 2`.
3. Accumulate moves:
   - `v = 1`: `ans += |1 - 2| = 1` (`ans = 1`).
   - `v = 2`: `ans += |2 - 2| = 0` (`ans = 1`).
   - `v = 3`: `ans += |3 - 2| = 1` (`ans = 2`).

Returns `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — `Arrays.sort(nums)` takes `O(n log n)` time, followed by an `O(n)` summation pass.
- **Space Complexity:** `O(log n)` — Auxiliary recursion stack space used by Java's Dual-Pivot Quicksort on primitive arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [462minimum-moves-to-equal-array-elements-ii.java](./462minimum-moves-to-equal-array-elements-ii.java) |

---

## Key Learnings

- The median minimizes the sum of absolute deviations (`L1` norm), whereas the mean minimizes the sum of squared deviations (`L2` norm).
- For even-length arrays, any value between the two middle elements `nums[n/2 - 1]` and `nums[n/2]` yields the exact same minimum `L1` sum.
- Alternatively, `Quickselect` can find the median in `O(n)` average time if sorting's `O(n log n)` cost ever becomes a bottleneck.
