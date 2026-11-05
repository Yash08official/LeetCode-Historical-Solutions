---
comments: true
difficulty: Medium
tags:
  - Array
  - Divide and Conquer
  - Dynamic Programming
---

# 53. Maximum Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0053` (`53`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Divide and Conquer`, `Dynamic Programming` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, find the contiguous non-empty **subarray** whose elements have the largest sum, and return that maximum sum.

---

## Examples

### Example 1

```text
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

### Example 2

```text
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

### Example 3

```text
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-10^4 <= nums[i] <= 10^4`

---

## Follow-up Questions

If you have figured out the `O(n)` solution, try coding another solution using the **divide and conquer** approach, which is more subtle.

**Divide and Conquer Approach:** Split any range `[l, r]` at `mid = (l + r) >> 1`. A maximum subarray in `[l, r]` lies entirely in `[l, mid]`, entirely in `[mid + 1, r]`, or crosses `mid` (`bestSuffix(left) + bestPrefix(right)`). If each recursive call returns a 4-tuple `(totalSum, maxPrefix, maxSuffix, maxSubarray)` computed in `O(1)` from its two halves (`T(n) = 2T(n/2) + O(1)`), the divide-and-conquer tree actually runs in **`O(n)` time** (with `O(log n)` recursion stack space) and forms the exact node-merging blueprint used in **Segment Trees** for dynamic range maximum-subarray queries with point updates!

---

## Problem Understanding

- **Non-Empty Subarray Requirement:** At least one element must be included. If every number in `nums` is negative (for instance, `[-5, -2, -8]`), the answer is the largest single element (`-2`), **not** `0`.
- **Contiguity & Local Choice:** Any contiguous subarray ends at some index `i`. When standing at `nums[i]`, the best subarray ending at `i` either extends the best subarray ending at `i - 1` (if that previous sum `f` was positive) or starts fresh at `nums[i]` alone (if `f <= 0`, since carrying a negative prefix sum only drags the total down).

---

## Approach

### Brute Force Approach

Checking every possible start index `i` and end index `j >= i` and summing `nums[i..j]` takes `O(n^3)` time, or `O(n^2)` if we maintain a running sum as `j` advances. With `nums.length` up to `10^5`, `O(n^2)` performs up to `5 * 10^9` operations and exceeds the time limit.

### Optimized Approach

Use **Kadane's Algorithm (space-optimized 1D Dynamic Programming)**: track `f`, the maximum subarray sum ending at the current index, alongside `ans`, the overall maximum sum seen anywhere so far, updating `f = Math.max(f, 0) + nums[i]` and `ans = Math.max(ans, f)` in one linear pass.

### Step-by-Step Thinking Process

1. Define DP state `f[i]` as the maximum sum among all non-empty contiguous subarrays that **end right at index `i`**.
2. Base case: `f[0] = nums[0]`.
3. Transition for `i >= 1`: adding `f[i - 1]` helps iff `f[i - 1] > 0`; otherwise we discard the prefix and start fresh with `0 + nums[i]`. Thus `f[i] = Math.max(f[i - 1], 0) + nums[i]`.
4. Notice `f[i]` depends only on `f[i - 1]`, so compress the array `f[]` into a single scalar variable `f`.
5. Seed both `ans` and `f` with `nums[0]` (handling all-negative arrays automatically) and update `ans = Math.max(ans, f)` at every index `i = 1..n-1`.

### Algorithm / Intuition

In `maxSubArray(nums)`:
- Destructuring initialization `let [ans, f] = [nums[0], nums[0]];` sets both the global best sum `ans` and the active subarray sum ending at index `0` (`f`) to the first element.
- The loop `for (let i = 1; i < nums.length; ++i)` advances one element at a time:
  - `f = Math.max(f, 0) + nums[i];` drops the prior running sum if it became negative (`Math.max(f, 0)` evaluates to `0`), or extends it if positive, then adds `nums[i]`.
  - `ans = Math.max(ans, f);` records the highest subarray sum ending at any index seen so far.
- Returning `ans` yields the global maximum contiguous subarray sum.

---

## Dry Run

**Input:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

- **Init (`i = 0`):** `f = -2`, `ans = -2`

| `i` | `nums[i]` | `Math.max(prev f, 0) + nums[i]` -> New `f` | New `ans = Math.max(ans, f)` | Active Subarray |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `1` | `max(-2, 0) + 1 = 1` | `max(-2, 1) = 1` | `[1]` |
| `2` | `-3` | `max(1, 0) + (-3) = -2` | `max(1, -2) = 1` | `[1, -3]` |
| `3` | `4` | `max(-2, 0) + 4 = 4` | `max(1, 4) = 4` | `[4]` |
| `4` | `-1` | `max(4, 0) + (-1) = 3` | `max(4, 3) = 4` | `[4, -1]` |
| `5` | `2` | `max(3, 0) + 2 = 5` | `max(4, 5) = 5` | `[4, -1, 2]` |
| `6` | `1` | `max(5, 0) + 1 = 6` | `max(5, 6) = 6` | `[4, -1, 2, 1]` |
| `7` | `-5` | `max(6, 0) + (-5) = 1` | `max(6, 1) = 6` | `[4, -1, 2, 1, -5]` |
| `8` | `4` | `max(1, 0) + 4 = 5` | `max(6, 5) = 6` | `[4, -1, 2, 1, -5, 4]` |

**Output:** `6`

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate through `nums` once from index `1` to `n - 1`, doing two `Math.max` calls and one addition per step.
- **Space Complexity:** `O(1)` — Only two scalar variables (`ans` and `f`) and loop index `i` are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [53maximum-subarray.js](./53maximum-subarray.js) |

---

## Key Learnings

- Fixing the endpoint (`best subarray ending exactly at index i`) turns an unstructured `O(n^2)` interval problem into a clean `O(n)` recurrence.
- Initializing `ans = nums[0]` (instead of `0`) is essential so arrays containing exclusively negative integers return the least-negative element rather than an invalid empty-subarray sum of `0`.
- Rolling scalar state compression (`f[i] -> f`) reduces `O(n)` DP memory to `O(1)` whenever each state only reads its immediate predecessor.
