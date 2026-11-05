---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 1760. Minimum Limit of Balls in a Bag

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1760` (`1760`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` where `nums[i]` is the number of balls inside the `i`-th bag, along with an integer `maxOperations`.

Up to `maxOperations` times, you may pick any bag and split its balls into two new bags, each containing a **positive** integer number of balls.

Your **penalty** is defined as the maximum number of balls in any single bag after finishing your operations. Return the **minimum possible penalty** you can achieve.

---

## Examples

### Example 1

```text
Input: nums = [9], maxOperations = 2
Output: 3
Explanation:
- Divide the bag with 9 balls into two bags of sizes 6 and 3. [9] -> [6,3].
- Divide the bag with 6 balls into two bags of sizes 3 and 3. [6,3] -> [3,3,3].
The bag with the most number of balls has 3 balls, so your penalty is 3 and you should return 3.
```

### Example 2

```text
Input: nums = [2,4,8,2], maxOperations = 4
Output: 2
Explanation:
- Divide the bag with 8 balls into two bags of sizes 4 and 4. [2,4,8,2] -> [2,4,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,4,4,4,2] -> [2,2,2,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,4,4,2] -> [2,2,2,2,2,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,2,2,4,2] -> [2,2,2,2,2,2,2,2].
The bag with the most number of balls has 2 balls, so your penalty is 2, and you should return 2.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= maxOperations, nums[i] <= 10^9`

---

## Problem Understanding

- **Minimize the Maximum:** Phrases like "minimize the maximum bag size" strongly signal **Binary Search on the Answer**.
- **Monotonicity:** If we can ensure every bag has at most `mid` balls within `maxOperations` splits, we can certainly achieve any larger limit `mid' > mid` as well. Conversely, if `mid` requires too many splits, any smaller limit is also impossible.
- **Independent Split Cost:** To break a bag of `x` balls into pieces of size at most `mid`, we need `ceil(x / mid)` pieces. Since each split increases the number of bags by `1`, producing `k` pieces from `1` bag requires exactly `k - 1` operations, which in integer arithmetic equals `(x - 1) / mid`.

---

## Approach

### Brute Force Approach

A greedy max-heap simulation might repeatedly pop the largest bag and split it in half `maxOperations` times. However, two fatal flaws arise: first, `maxOperations` can be up to `10^9`, making simulation far too slow; second, splitting `9` in half (`9 -> 4 + 5 -> 4 + 2 + 3`, penalty `4`) is actually suboptimal compared to uneven splitting (`9 -> 3 + 6 -> 3 + 3 + 3`, penalty `3`)!

### Optimized Approach

Binary search for the minimum feasible penalty `mid` in the range `[1, max(nums)]`. For a candidate `mid`, sum `(x - 1) / mid` across all `x` in `nums` and check if total splits `cnt <= maxOperations`.

### Step-by-Step Thinking Process

1. Establish search bounds for the penalty: the smallest possible positive bag size is `left = 1`, and the largest needed without any operations is `right = max(nums)`.
2. Test a candidate maximum bag size `mid = (left + right) >> 1`.
3. For each bag of size `x`, compute the minimum splits required so no resulting piece exceeds `mid`: `(x - 1) / mid`. Accumulate into a `long cnt` to avoid integer overflow (`10^5` bags * `10^9` balls could reach `10^14` when `mid = 1`).
4. If `cnt <= maxOperations`, penalty `mid` is achievable, so narrow the upper bound: `right = mid`.
5. Otherwise, `mid` is too small and requires too many splits, so raise the lower bound: `left = mid + 1`.

### Algorithm / Intuition

Why does `(x - 1) / mid` give the exact minimum number of operations for a bag of `x` balls? Suppose `mid = 3`: if `x = 3`, `(3 - 1) / 3 = 0` splits; if `x = 4..6`, `(x - 1) / 3 = 1` split; if `x = 7..9`, `(x - 1) / 3 = 2` splits (peeling off groups of `3` one split at a time). Because operations on different bags do not interact, summing `(x - 1) / mid` in `cnt` tells us in `O(n)` time whether `mid` is feasible. The binary search loop `while (left < right)` converges onto the exact smallest feasible penalty `left`.

---

## Dry Run

Using **Example 1**: `nums = [9]`, `maxOperations = 2`

Initial bounds: `left = 1`, `right = 9`.

| Iteration | `left` | `right` | `mid` | `cnt = (9 - 1) / mid` | `cnt <= 2`? | Bound Update |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `1` | `9` | `5` | `8 / 5 = 1` | `true` | `right = 5` |
| 2 | `1` | `5` | `3` | `8 / 3 = 2` | `true` | `right = 3` |
| 3 | `1` | `3` | `2` | `8 / 2 = 4` | `false` | `left = 3` |

Loop terminates with `left == right == 3`. Return `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log M)` — Where `n = nums.length` and `M = max(nums) <= 10^9`. Finding `M` takes `O(n)`, and each of the `O(log M)` (~30) binary search steps scans `nums` in `O(n)` time.
- **Space Complexity:** `O(1)` — Only scalar variables (`left`, `right`, `mid`, `cnt`) are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1760minimum-limit-of-balls-in-a-bag.java](./1760minimum-limit-of-balls-in-a-bag.java) |

---

## Key Learnings

- Splitting a bag in half greedily fails here (e.g., splitting `9` with 2 operations needs `3 + 6` first rather than `4 + 5`), whereas binary searching the target upper bound `mid` trivially reveals optimal piece sizes.
- The integer division identity `ceil(x / mid) - 1 == (x - 1) / mid` (for positive integers `x, mid`) cleanly avoids floating-point precision issues.
- Always use a 64-bit integer (`long cnt`) when summing per-element operation counts that can each be up to `10^9`.
