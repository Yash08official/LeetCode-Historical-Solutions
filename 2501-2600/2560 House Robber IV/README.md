---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Dynamic Programming
  - Greedy
---

# 2560. House Robber IV

**[View Problem on LeetCode](https://leetcode.com/problems/house-robber-iv/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2560` (`2560`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

There are several consecutive houses along a street, each represented by an integer in array `nums` denoting the amount of money in that house.

A robber wants to steal from at least `k` houses. However, security alarms will trigger if the robber steals from two **adjacent** houses.

The **capability** of the robber is defined as the maximum amount of money stolen from any single house among those chosen.

Return the **minimum** capability of the robber such that they can steal from at least `k` non-adjacent houses.

---

## Examples

### Example 1

```text
Input: nums = [2,3,5,9], k = 2
Output: 5
Explanation:
There are three ways to rob at least 2 houses:
- Rob the houses at indices 0 and 2. Capability is max(nums[0], nums[2]) = 5.
- Rob the houses at indices 0 and 3. Capability is max(nums[0], nums[3]) = 9.
- Rob the houses at indices 1 and 3. Capability is max(nums[1], nums[3]) = 9.
Therefore, we return min(5, 9, 9) = 5.
```

### Example 2

```text
Input: nums = [2,7,9,3,1], k = 2
Output: 2
Explanation: There are 7 ways to rob the houses. The way which leads to minimum capability is to rob the house at index 0 and 4. Return max(nums[0], nums[4]) = 2.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

- `1 <= k <= (nums.length + 1)/2`

---

## Problem Understanding

We want to minimize a maximum value (the capability). This minimax structure strongly suggests binary search on the answer. If a capability `x` is sufficient to steal from at least `k` non-adjacent houses, any larger capability `x' > x` is also sufficient. Conversely, if `x` cannot provide `k` non-adjacent houses, no smaller capability can. Hence, the feasibility function is monotonic with respect to the capability threshold `x`.

---

## Approach

### Brute Force Approach

A brute force approach would explore all subsets of non-adjacent houses of size $\ge k$, compute the maximum house value in each valid subset, and take the minimum over all subsets. Generating all valid subsets takes exponential time $O(2^n)$, which is completely infeasible for $n = 10^5$.

### Optimized Approach

Binary search on the capability range `[0, 10^9]`. For a candidate capability `mid`, evaluate whether it is possible to choose at least `k` non-adjacent houses each having value `nums[i] <= mid`. To maximize the count of chosen houses under capability `mid`, use a greedy strategy: iterate from left to right, and whenever `nums[i] <= mid` and house `i` is not adjacent to the previously chosen house (`i != j + 1`), greedily rob house `i`. If the greedy count is $\ge k$, try smaller capabilities (`right = mid`); otherwise, increase capability (`left = mid + 1`).

### Step-by-Step Thinking Process

1. We need to find the smallest capability $C$ such that $\ge k$ non-adjacent houses have value $\le C$.
2. Checking whether a fixed capability $C$ is valid can be done in $O(n)$ time: we want to find the maximum independent set in a line graph where node weights are filtered by $\le C$.
3. A greedy scan from left to right is optimal: if house `i` has value $\le C$ and wasn't preceded by house `i - 1`, picking house `i` leaves the maximum possible remaining houses for future choices.
4. Because feasibility is monotonic with respect to $C$, binary search on $C \in [0, 10^9]$ finds the minimum valid capability in $O(n \log(\max(nums)))$.

### Algorithm / Intuition

The search range is `[left, right] = [0, 1e9]`. In each step, `mid = (left + right) >> 1` is tested with helper function `f(nums, mid)`. In `f(nums, x)`, we track the last robbed house index `j` (initialized to -2 so house 0 can be robbed). For each house `i`, if `nums[i] > x` or `i == j + 1`, we skip it. Otherwise, we rob it: increment `cnt` and update `j = i`. If `cnt >= k`, `mid` is achievable, so we narrow the search to `right = mid`. Otherwise, `left = mid + 1`.

---

## Dry Run

Trace with Example 1: `nums = [2,3,5,9]`, `k = 2`.
- Range starts at `left = 0, right = 10^9`.
- When testing `mid = 5`:
  - `f(nums, 5)`: `cnt = 0, j = -2`.
  - `i = 0`: `nums[0] = 2 <= 5`, `0 != -2 + 1`. Rob house 0! `cnt = 1, j = 0`.
  - `i = 1`: `i == j + 1` (1 == 1). Skip.
  - `i = 2`: `nums[2] = 5 <= 5`, `2 != 0 + 1`. Rob house 2! `cnt = 2, j = 2`.
  - `i = 3`: `i == j + 1` (3 == 3). Skip.
  - Total `cnt = 2 >= k (2)`. Feasible! `right = 5`.
- When testing `mid = 4`:
  - `i = 0`: `nums[0] = 2 <= 4`. Rob house 0! `cnt = 1, j = 0`.
  - `i = 1`: adjacent, skip.
  - `i = 2`: `nums[2] = 5 > 4`. Skip.
  - `i = 3`: `nums[3] = 9 > 4`. Skip.
  - `cnt = 1 < 2`. Not feasible! `left = mid + 1 = 5`.
- Search terminates with `left = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log(max_val))` — The helper function `f` performs a single linear pass over `nums` of length `n` in `O(n)` time. Binary search over the range `[0, 10^9]` takes at most $\log_2(10^9) \approx 30$ iterations. Total time is `O(n log(10^9))`.
- **Space Complexity:** `O(1)` — Only a few primitive integer variables (`left`, `right`, `mid`, `cnt`, `j`) are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2560house-robber-iv.java](./2560house-robber-iv.java) |

---

## Key Learnings

- Minimizing a maximum value is the classic signature of binary search on answer.
- Greedy selection (taking the first available valid non-adjacent house) is provably optimal for maximizing the count of chosen non-adjacent items in a linear array.
- Initializing the last chosen index to `-2` elegantly avoids special boundary checks for the first element (`i = 0`).
