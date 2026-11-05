---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Longest Increasing Subsequence
---

# 334. Increasing Triplet Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/increasing-triplet-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0334` (`334`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Longest Increasing Subsequence` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, return `true` if there exist three indices `i < j < k` such that `nums[i] < nums[j] < nums[k]`. If no such strictly increasing triplet subsequence exists, return `false`.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.
```

### Example 2

```text
Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.
```

### Example 3

```text
Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: One of the valid triplet is (1, 4, 5), because nums[1] == 1 < nums[4] == 4 < nums[5] == 6.
```

---

## Constraints

- `1 <= nums.length <= 5 * 10^5`

- `-2^31 <= nums[i] <= 2^31 - 1`

---

## Follow-up Questions

Could you implement a solution that runs in `O(n)` time complexity and `O(1)` space complexity?

The implemented `increasingTriplet` method already satisfies the follow-up requirement directly: it runs in `O(n)` single-pass time and `O(1)` auxiliary space without allocating prefix-minimum or suffix-maximum arrays.

---

## Problem Understanding

- This is the fixed-length `L = 3` special case of **Longest Increasing Subsequence (LIS)**: we only need to decide whether an increasing subsequence of length `3` exists.
- With `nums.length <= 5 * 10^5`, an `O(n^2)` DP scan would time out; we need a single `O(n)` pass.
- Instead of storing a dynamic `tails` array like general `O(n log n)` LIS, for length `3` we only need two scalar thresholds: `first` (smallest tail of length `1`) and `second` (smallest tail of length `2`).

---

## Approach

### Brute Force Approach

Checking all triples `(i, j, k)` takes `O(n^3)` time, and even fixing the middle index `j` while scanning left for `< nums[j]` and right for `> nums[j]` takes `O(n^2)` time (or `O(n)` extra space if precomputing prefix-min and suffix-max arrays).

### Optimized Approach

In `increasingTriplet` (note: the source file also contains an uncalled `productExceptSelf` method above it, which is unused here), maintain two greedy thresholds `first = Integer.MAX_VALUE` and `second = Integer.MAX_VALUE` in a single pass: update `first` if `num <= first`, else update `second` if `num <= second`, else immediately return `true`.

### Step-by-Step Thinking Process

1. Return `false` early if `nums.length < 3`.
2. Initialize `first = Integer.MAX_VALUE` (smallest single element seen) and `second = Integer.MAX_VALUE` (smallest second element of any valid increasing pair seen).
3. For each `num` in `nums`, test `if (num <= first)` first (using `<=` so values equal to `first` never spill into `second`!).
4. Otherwise `num > first`, meaning `(first, num)` forms a valid increasing pair; test `else if (num <= second)` to lower `second = num` (again using `<=` so duplicates of `second` don't trigger `true`).
5. Otherwise `num > second`, which guarantees an increasing triplet exists—return `true`. If the loop ends, return `false`.

### Algorithm / Intuition

A subtle question often arises: *What if `first` gets updated to a smaller number **after** `second` was set—doesn't `first` now sit at an index after `second`?* Consider `nums = [2, 5, 1, 6]`: after `[2, 5]`, `first = 2, second = 5`. At `1`, `first` updates to `1` while `second` stays `5`. When `6` arrives (`6 > second = 5`), `(1, 5, 6)` has out-of-order indices—**but** `second = 5` could only have been set because an earlier `old_first = 2 < 5` existed before `5`! Thus `(2, 5, 6)` is a genuine valid triplet, while lowering `first = 1` simultaneously prepares for future pairs like `[2, 5, 1, 2, 3]`!

---

## Dry Run

Tracing **Example 1** (`nums = [1, 2, 3, 4, 5]`):

- Initial: `first = MAX_VALUE`, `second = MAX_VALUE`.
- `num = 1`: `1 <= first` -> `first = 1`.
- `num = 2`: `2 > 1` and `2 <= second` -> `second = 2`.
- `num = 3`: `3 > 1` and `3 > 2` -> hits `else`, immediately returns **`true`**!

*(On `[2, 1, 5, 0, 4, 6]`: `first=2` -> `first=1` -> `second=5` -> `first=0` -> `second=4` -> `6 > 4` returns `true`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — `increasingTriplet` scans `nums` at most once, performing at most two integer comparisons per element.
- **Space Complexity:** `O(1)` — `increasingTriplet` uses only two `int` variables (`first` and `second`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [334increasing-triplet-subsequence.java](./334increasing-triplet-subsequence.java) |

---

## Key Learnings

- Using `<=` instead of `<` in `if (num <= first)` and `else if (num <= second)` is essential so equal elements replace the same threshold rather than advancing to the next length.
- `first` and `second` store optimal **thresholds** for subsequence lengths `1` and `2`, not necessarily the exact indices of the final triplet—if you needed to reconstruct the actual triplet indices, you would also save `first_at_second` when updating `second`.
