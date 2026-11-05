---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Sorting
---

# 2563. Count the Number of Fair Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/count-the-number-of-fair-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2563` (`2563`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed integer array `nums` of length `n` and two integers `lower` and `upper`.

A pair of indices `(i, j)` is called **fair** if it satisfies the following two conditions:
1. `0 <= i < j < n`
2. `lower <= nums[i] + nums[j] <= upper`

Return the total number of fair pairs.

---

## Examples

### Example 1

```text
Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
Output: 6
Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).
```

### Example 2

```text
Input: nums = [1,7,9,2,5], lower = 11, upper = 11
Output: 1
Explanation: There is a single fair pair: (2,3).
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `nums.length == n`

- `-10^9 <= nums[i] <= 10^9`

- `-10^9 <= lower <= upper <= 10^9`

---

## Problem Understanding

We need to count pairs `(i, j)` with $i < j$ whose sum falls in `[lower, upper]`. Because addition is commutative, the original indices do not matter for the pair sum, meaning we can sort the array. Once sorted, for each fixed element `nums[i]`, we need to find how many elements `nums[j]` to its right ($j > i$) satisfy:
$$lower - nums[i] \le nums[j] \le upper - nums[i]$$
This contiguous range in the sorted array can be located efficiently using binary search.

---

## Approach

### Brute Force Approach

Check every pair `(i, j)` with two nested loops: for `i` from `0` to `n - 1`, and `j` from `i + 1` to `n - 1`, evaluate whether `lower <= nums[i] + nums[j] <= upper`. This takes $O(n^2)$ time. For $n = 10^5$, $n^2 / 2 \approx 5 \times 10^9$ operations, leading to Time Limit Exceeded.

### Optimized Approach

Sort the array `nums` in ascending order. Iterate through each index `i` from `0` to `n - 1`. For a fixed `nums[i]`, valid elements `nums[j]` (with $j > i$) must lie in the range $[lower - nums[i], upper - nums[i]]$. Use binary search `search(nums, x, left)` to find the first index $\ge x$ in the subarray `[i + 1, n)`. The lower bound index is $j = \text{search}(nums, lower - nums[i], i + 1)$ and the upper bound index is $k = \text{search}(nums, upper - nums[i] + 1, i + 1)$. The number of valid pairs for index `i` is simply $k - j$.

### Step-by-Step Thinking Process

1. Pair sum order invariance: sorting `nums` does not change the set of valid unordered pairs.
2. After sorting, for any `nums[i]`, the valid `nums[j]` form a contiguous segment $[j, k)$ in indices $j > i$.
3. The lower end of this segment is the first element $\ge lower - nums[i]$.
4. The upper end (exclusive) is the first element $\ge upper - nums[i] + 1$.
5. Both boundary indices can be found via binary search in $O(\log n)$ time per element `i`, reducing total time to $O(n \log n)$.

### Algorithm / Intuition

`Arrays.sort(nums)` puts elements into non-decreasing order. Helper method `search(nums, x, left)` implements a standard lower-bound binary search over `[left, nums.length)`, returning the smallest index whose value is $\ge x$. For each `i`, `search(nums, lower - nums[i], i + 1)` finds the start index `j` of elements that sum with `nums[i]` to at least `lower`. `search(nums, upper - nums[i] + 1, i + 1)` finds the index `k` where sum exceeds `upper`. The difference `k - j` gives the count of fair pairs formed with `nums[i]`. Adding `k - j` to `ans` across all `i` gives the total count.

---

## Dry Run

Trace with Example 1: `nums = [0,1,7,4,4,5]`, `lower = 3`, `upper = 6`.
- Sorted `nums = [0, 1, 4, 4, 5, 7]`, `n = 6`.
- `i = 0` (`nums[0] = 0`): Target range `[3 - 0, 6 - 0] = [3, 6]`.
  - `j = search(nums, 3, 1)` -> first index $\ge 3$ in `[1..6)` is index 2 (`nums[2] = 4`).
  - `k = search(nums, 7, 1)` -> first index $\ge 7$ in `[1..6)` is index 5 (`nums[5] = 7`).
  - `ans += 5 - 2 = 3` (pairs: (0,4), (0,4), (0,5)).
- `i = 1` (`nums[1] = 1`): Target range `[3 - 1, 6 - 1] = [2, 5]`.
  - `j = search(nums, 2, 2)` -> index 2 (`nums[2] = 4`).
  - `k = search(nums, 6, 2)` -> index 5 (`nums[5] = 7`).
  - `ans += 5 - 2 = 3` (pairs: (1,4), (1,4), (1,5)).
- `i = 2` (`nums[2] = 4`): Target range `[-1, 2]`.
  - `j = search(nums, -1, 3)` -> index 3.
  - `k = search(nums, 3, 3)` -> index 3.
  - `ans += 3 - 3 = 0`.
- Subsequent `i` also contribute 0.
Total returned `ans = 6`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting the array takes `O(n log n)`. Iterating `i` from `0` to `n - 1` performs two binary searches each taking `O(log n)` time. Overall time complexity is `O(n log n)`.
- **Space Complexity:** `O(log n)` — Auxiliary space used by Java's Dual-Pivot Quicksort recursion stack for sorting primitive `int[]`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2563count-the-number-of-fair-pairs.java](./2563count-the-number-of-fair-pairs.java) |

---

## Key Learnings

- When the order of indices does not impact the mathematical condition on pair sums, sorting the array unlocks binary search or two-pointer techniques.
- Range queries of the form $A \le x \le B$ in sorted arrays are cleanly solved by two lower-bound queries: `lower_bound(B + 1) - lower_bound(A)`.
- The total number of fair pairs can reach $\approx n^2 / 2 \approx 5 \times 10^9$, requiring `ans` to be stored in a 64-bit integer (`long`).
