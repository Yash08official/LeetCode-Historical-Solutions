---
comments: true
difficulty: Hard
tags:
  - Array
  - Greedy
---

# 330. Patching Array

**[View Problem on LeetCode](https://leetcode.com/problems/patching-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0330` (`330`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given a sorted array of positive integers `nums` and a target upper bound `n`. You may insert ('patch') new positive integers into the array so that **every integer** in `[1, n]` can be expressed as the sum of some subset of elements in the patched array.

Return the **minimum number of patches** required.

---

## Examples

### Example 1

```text
Input: nums = [1,3], n = 6
Output: 1
Explanation:
Combinations of nums are [1], [3], [1,3], which form possible sums of: 1, 3, 4.
Now if we add/patch 2 to nums, the combinations are: [1], [2], [3], [1,3], [2,3], [1,2,3].
Possible sums are 1, 2, 3, 4, 5, 6, which now covers the range [1, 6].
So we only need 1 patch.
```

### Example 2

```text
Input: nums = [1,5,10], n = 20
Output: 2
Explanation: The two patches can be [2, 4].
```

### Example 3

```text
Input: nums = [1,2,2], n = 5
Output: 0
```

---

## Constraints

- `1 <= nums.length <= 1000`

- `1 <= nums[i] <= 10^4`

- `nums` is sorted in **ascending order**.

- `1 <= n <= 2^31 - 1`

---

## Problem Understanding

- Suppose the elements processed so far can already form **every** integer sum in the contiguous half-open interval `[0, x)` (i.e., `0, 1, 2, ..., x - 1`), so `x` is the smallest missing positive integer.
- If we next incorporate a number `v`, all new sums have the form `v + s` for `s in [0, x)`, spanning `[v, v + x)`.
- If `v <= x`, the intervals `[0, x)` and `[v, v + x)` overlap or touch (`v <= x`), merging into the seamless contiguous range `[0, x + v)`!
- Conversely, if the next available array element satisfies `nums[i] > x` (or no elements remain), then `x` **cannot** be formed without patching an element `<= x`. Patching `x` itself greedily maximizes the new upper boundary to `2x`!

---

## Approach

### Brute Force Approach

Tracking formable subset sums explicitly with boolean DP `dp[1..n]` fails completely because `n` can be as large as `2^31 - 1` (`~2.14 * 10^9`), making `O(n)` memory and time infeasible.

### Optimized Approach

Maintain `long x = 1` (the smallest unformable sum so far, meaning `[1, x - 1]` is completely covered) and pointer `i = 0` into sorted `nums`: while `x <= n`, consume `nums[i]` (`x += nums[i++]`) if `i < nums.length && nums[i] <= x`, or else greedily patch `x` (`++ans; x <<= 1`).

### Step-by-Step Thinking Process

1. Use `long x = 1` so doubling `x` or adding `nums[i]` near `n = 2^31 - 1` never overflows 32-bit `int`.
2. Loop while `x <= n` (once `x > n`, every integer in `[1, n]` is covered):
3. Case 1 (`i < nums.length && nums[i] <= x`): `nums[i]` extends our contiguous coverage without a gap, so update `x += nums[i++]`.
4. Case 2 (`i == nums.length || nums[i] > x`): a gap exists at `x`. Patching any smaller number `p < x` only reaches `x + p < 2x`, whereas patching `x` itself covers `x` and reaches `2x` (`[0, 2x)`), strictly dominating any smaller patch! Increment `++ans` and shift `x <<= 1`.
5. Return `ans`.

### Algorithm / Intuition

Why is patching `x` strictly optimal whenever `nums[i] > x`? First, *at least one* patch `p <= x` is mandatory—otherwise every subset either avoids new/remaining elements (summing to `< x`) or includes an element `>= nums[i] > x` (summing to `> x`), leaving `x` impossible. Among all valid patches `1 <= p <= x`, choosing `p = x` achieves the strictly largest contiguous reach `[0, 2x)`, which can only help (never hurt) all future thresholds.

---

## Dry Run

Tracing **Example 1** (`nums = [1, 3]`, `n = 6`):

- Start: `x = 1`, `i = 0`, `ans = 0` (covers `[1, 0]` = empty).
- Step 1 (`x = 1 <= 6`): `nums[0] = 1 <= 1` -> consume `nums[0]`: `x = 1 + 1 = 2`, `i = 1` (covers `[1, 1]`).
- Step 2 (`x = 2 <= 6`): `nums[1] = 3 > 2` -> gap at `2`! Patch `2`: `++ans -> 1`, `x = 2 << 1 = 4` (covers `[1, 3]`).
- Step 3 (`x = 4 <= 6`): `nums[1] = 3 <= 4` -> consume `nums[1]`: `x = 4 + 3 = 7`, `i = 2` (covers `[1, 6]`).
- Loop terminates (`x = 7 > 6`), returns `ans = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O(m + log n)` — Each iteration either advances `i` (at most `m = nums.length` times) or doubles `x` via `x <<= 1` (at most `31` times before exceeding `n <= 2^31 - 1`).
- **Space Complexity:** `O(1)` — Only scalar variables `x`, `ans`, and `i` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [330patching-array.java](./330patching-array.java) |

---

## Key Learnings

- Maintaining a contiguous reachable prefix `[0, x)` collapses an exponential subset-sum space into a single integer boundary `x`.
- Whenever `n` reaches `2^31 - 1`, any boundary variable satisfying `while (x <= n)` **must** be `long`, since the terminating value `x > Integer.MAX_VALUE` overflows `int` into a negative number (causing an infinite loop!).
