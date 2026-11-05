---
comments: true
difficulty: Easy
tags:
  - Array
  - Math
---

# 3736. Minimum Moves to Equal Array Elements III

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3736` (`3736`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Math` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`.

In one move, you may choose any single element `nums[i]` and **increase** its value by 1.

Return the **minimum total number of moves** required so that all elements in `nums` become equal.

---

## Examples

### Example 1

**Input:** `nums = [2,1,3]`

**Output:** `3`

**Explanation:**

To make all elements equal:

- Increase `nums[0] = 2` by 1 to make it 3.

- Increase `nums[1] = 1` by 1 to make it 2.

- Increase the updated `nums[1] = 2` by 1 to make it 3.

Now, all elements of `nums` are equal to 3. The minimum total moves is 3.

### Example 2

**Input:** `nums = [4,4,5]`

**Output:** `2`

**Explanation:**

To make all elements equal:

- Increase `nums[0] = 4` by 1 to make it 5.

- Increase `nums[1] = 4` by 1 to make it 5.

Now, all elements of `nums` are equal to 5. The minimum total moves is 2.

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 100`

---

## Problem Understanding

Key observations and constraints:
1. **Only Increments Allowed**: You can only increase elements by 1; decreases are not permitted.
2. **Target Value Selection**:
   - Because no element can be decreased, the final equal value must be at least the maximum element in the original array, `mx = max(nums)`.
   - If all elements are equalized to some target `T >= mx`, the total moves required is:
     `total_moves(T) = sum_{i=0}^{n-1} (T - nums[i]) = n * T - sum(nums)`.
   - Since `n > 0`, `total_moves(T)` is strictly increasing with respect to `T`.
   - Therefore, the minimum moves is uniquely achieved when `T = mx = max(nums)`.
3. **Formula**:
   `Minimum Moves = mx * n - sum(nums)`.

---

## Approach

### Brute Force Approach

A naive simulation might increment the smallest element by 1 repeatedly until all elements equal `max(nums)`.
With constraints `nums[i] <= 100` and `n <= 100`, this naive simulation would take at most `100 * 100 = 10^4` steps, which passes for tiny constraints, but is mathematically redundant when the answer can be evaluated in a single mathematical pass.

### Optimized Approach

The implemented solution computes the result directly in a **single pass** using mathematical reduction:
1. Iterate through `nums`, maintaining:
   - `mx`: the maximum value seen so far (`mx = Math.max(mx, x)`).
   - `s`: the cumulative sum of all elements (`s += x`).
2. After the loop, the minimum total moves is exactly `mx * n - s`.
3. Return `mx * n - s`.

### Step-by-Step Thinking Process

1. Analyze the operation: each move increments one chosen element by 1.
2. Deduce that no element can ever decrease, so no element can end up lower than its initial value.
3. Conclude that the final uniform value `T` must satisfy `T >= nums[i]` for all `i`, meaning `T >= max(nums)`.
4. Recognize that every unit increase in `T` above `max(nums)` adds `n` extra moves across the array, so setting `T = max(nums)` is strictly optimal.
5. Compute `sum_{i} (max(nums) - nums[i]) = max(nums) * n - sum(nums)` in a single `O(n)` traversal.

### Algorithm / Intuition

In `Solution.minMoves`:
- `mx` starts at 0 (valid since `nums[i] >= 1`), and `s` tracks the running total of all elements.
- For every integer `x` in `nums`, `mx` is updated to `Math.max(mx, x)` and `x` is added to `s`.
- The expression `mx * n - s` algebraically evaluates the sum of deficits:
  `(mx - nums[0]) + (mx - nums[1]) + ... + (mx - nums[n - 1]) = mx * n - (nums[0] + ... + nums[n - 1])`.
- This executes in a single pass with zero extra space.

---

## Dry Run

Consider `nums = [2, 1, 3]`, `n = 3`:

1. **Initialization**:
   - `mx = 0`, `s = 0`, `n = 3`.
2. **Iteration**:
   - `x = 2`: `mx = max(0, 2) = 2`, `s = 0 + 2 = 2`.
   - `x = 1`: `mx = max(2, 1) = 2`, `s = 2 + 1 = 3`.
   - `x = 3`: `mx = max(2, 3) = 3`, `s = 3 + 3 = 6`.
3. **Calculation**:
   - `mx * n - s = 3 * 3 - 6 = 9 - 6 = 3`.
4. Return `3`. Matches Example 1.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single pass over the array of `n` elements computes both the maximum and the sum.
- **Space Complexity:** `O(1)` — Only a few primitive integer variables (`n`, `mx`, `s`) are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3736minimum-moves-to-equal-array-elements-iii.java](./3736minimum-moves-to-equal-array-elements-iii.java) |

---

## Key Learnings

- When an operation only allows unidirectional changes (increments only), the boundary element (maximum) dictates the minimum achievable target.
- Sum of differences from a constant can be expanded as `sum(C - x) = C * n - sum(x)`, allowing evaluation via running sum and maximum in a single pass.
- Look for algebraic simplifications to transform iterative simulation into `O(1)` arithmetic.
