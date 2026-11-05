---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 152. Maximum Product Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-product-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0152` (`152`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, find a non-empty contiguous **subarray** whose elements multiply to the largest possible value, and return that maximum product.

A single-element subarray's product is just that element itself, and the test inputs guarantee that the product of every subarray fits within a signed 32-bit integer.

---

## Examples

### Example 2

```text
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

---

## Constraints

- `1 <= nums.length <= 2 * 10^4`

- `-10 <= nums[i] <= 10`

- The product of any subarray of `nums` is **guaranteed** to fit in a **32-bit** integer.

---

## Problem Understanding

- **Sign Flipping Breaks Standard Kadane's:** Unlike Maximum Subarray Sum (Problem 53), multiplying a very negative product (e.g., `-12`) by a negative `nums[i]` (e.g., `-3`) suddenly jumps to a large positive product (`+36`). Conversely, multiplying a large positive product by a negative number makes it the smallest (most negative) product.
- **Zeros Reset Streaks:** Encountering `0` collapses any running product to `0`, effectively forcing subsequent subarrays to either start fresh after the `0` or have product `0`.
- **Dual State Requirement:** At every index `i`, the maximum product ending at `i` depends on **both** the maximum product ending at `i - 1` and the minimum (most negative) product ending at `i - 1`.

---

## Approach

### Brute Force Approach

Check all `n * (n + 1) / 2` contiguous subarrays `nums[i..j]` by maintaining a running product from `i` to `j` and tracking the global maximum. This requires `O(n^2)` time, which is slow for `nums.length <= 2 * 10^4`.

### Optimized Approach

Use **Space-Optimized Dynamic Programming** tracking two scalar states per index: `f` (maximum subarray product ending at `i`) and `g` (minimum subarray product ending at `i`), updating the global answer `ans` in a single `O(n)` pass.

### Step-by-Step Thinking Process

1. Define `f` as the maximum product of a contiguous subarray ending at the current index, and `g` as the minimum product ending at the current index.
2. Initialize `f = nums[0]`, `g = nums[0]`, and `ans = nums[0]`.
3. At each index `i` from `1` to `nums.length - 1`, snapshot the previous step's values into `ff = f` and `gg = g` before overwriting `f`!
4. A subarray ending at `i` either starts fresh at `nums[i]` alone, extends the previous max subarray (`ff * nums[i]`), or extends the previous min subarray (`gg * nums[i]`).
5. Therefore set `f = max(nums[i], ff * nums[i], gg * nums[i])`, `g = min(nums[i], ff * nums[i], gg * nums[i])`, and update `ans = Math.max(ans, f)`.

### Algorithm / Intuition

In `maxProduct(int[] nums)`, saving `int ff = f, gg = g;` is critical: if we updated `f` first and used the new `f` to compute `g`, `g` would corruptly multiply `nums[i]` twice! Taking `max` and `min` across all three candidates `{nums[i], ff * nums[i], gg * nums[i]}` automatically handles positive numbers, negative sign flips, and zeros without any `if/else` branching: when `nums[i] == 0`, all three candidates evaluate to `0`, cleanly resetting both `f` and `g` to `0` for the next index.

---

## Dry Run

Trace on **Example 1**: `nums = [2, 3, -2, 4]`

| Index `i` | `nums[i]` | `ff`, `gg` | Candidates `{nums[i], ff*x, gg*x}` | New `f` (max) | New `g` (min) | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `0` (Init) | `2` | — | — | `2` | `2` | `2` |
| `1` | `3` | `2`, `2` | `{3, 6, 6}` | `6` | `3` | `6` |
| `2` | `-2` | `6`, `3` | `{-2, -12, -6}` | `-2` | `-12` | `6` |
| `3` | `4` | `-2`, `-12` | `{4, -8, -48}` | `4` | `-48` | `6` |

Return `ans = 6` (from subarray `[2, 3]`).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Single loop from `i = 1` to `nums.length - 1` doing constant-time arithmetic and `Math.max`/`Math.min` comparisons.
- **Space Complexity:** `O(1)` — Only five scalar `int` variables (`f`, `g`, `ans`, `ff`, `gg`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [152maximum-product-subarray.java](./152maximum-product-subarray.java) |

---

## Key Learnings

- Whenever transitions can flip signs or reverse ordering (multiplication by negative numbers, negation operations), track **both** the local maximum (`f`) and local minimum (`g`) DP states.
- Always snapshot old DP variables (`ff = f, gg = g`) before updating in-place when two states mutually depend on each other's previous step.
- Including `nums[i]` itself among the three `max`/`min` candidates handles recovering from `0`s automatically without special-case resets.
