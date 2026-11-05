---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
---

# 453. Minimum Moves to Equal Array Elements

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-moves-to-equal-array-elements/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0453` (`453`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` of length `n`, find the **minimum number of moves** required to make all elements equal.

In a single move, you must choose `n - 1` elements of the array and increment each of them by `1`.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3]
Output: 3
Explanation: Only three moves are needed (remember each move increments two elements):
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
```

### Example 2

```text
Input: nums = [1,1,1]
Output: 0
```

---

## Constraints

- `n == nums.length`

- `1 <= nums.length <= 10^5`

- `-10^9 <= nums[i] <= 10^9`

- The answer is guaranteed to fit in a **32-bit** integer.

---

## Problem Understanding

- **Relative difference invariance:** Adding `+1` to `n - 1` elements while leaving one element unchanged alters the pairwise differences between elements in the **exact same way** as subtracting `-1` from that single unchosen element!
- **Equivalent dual problem:** "Minimum moves where `n - 1` elements increase by `1`" is mathematically identical to "Minimum moves where `1` element decreases by `1` until all elements are equal."
- **Optimal target in the dual view:** Since you can only decrease elements in the dual problem, you never need to decrease the minimum element `mi` further—every element `x` simply needs `x - mi` decrements to reach `mi`.
- **Overflow caution:** Individual elements lie in `[-10^9, 10^9]` and `n <= 10^5`, so the raw array sum `s` can reach `10^14`, requiring a 64-bit `long` accumulator even though the final difference fits in a 32-bit `int`.

---

## Approach

### Brute Force Approach

Simulating each move directly—finding the current maximum element, incrementing the other `n - 1` elements by `1`, and repeating until all elements match—can take up to `O(n * (max - min))` operations.

With `max - min` as large as `2 * 10^9`, simulation will time out immediately.

### Optimized Approach

Use **Mathematical Duality (Single-Pass Sum & Minimum)**: compute the array's 64-bit sum `s` and minimum value `mi` in one pass, and return `s - (long) mi * nums.length`.

### Step-by-Step Thinking Process

1. Observe that only relative differences between elements matter when checking if all elements are equal.
2. Incrementing `n - 1` elements by `1` is equivalent to incrementing *all* `n` elements by `1` (which shifts every element uniformly without changing equality) and then decrementing `1` chosen element by `1`.
3. Thus, making all elements equal in the minimum number of moves equals the minimum number of single-element `-1` decrements needed to equalize `nums`.
4. To minimize decrements, reduce every element down to the initial minimum `mi = min(nums)`. Element `x` takes `x - mi` moves.
5. Summing `(x - mi)` over all `n` elements gives `sum(nums) - mi * n`.

### Algorithm / Intuition

In `minMoves(int[] nums)`:
- `long s = 0` accumulates the total sum safely in 64-bit precision.
- `int mi = nums[0]` tracks the smallest element seen during the `for (int x : nums)` loop via `mi = Math.min(mi, x)`.
- Instead of doing a second pass to sum `x - mi`, the algebraic identity `sum(x - mi) = s - (long) mi * nums.length` computes the exact answer in `O(1)` at the end and casts back to `int`.

---

## Dry Run

Tracing **Example 1** with `nums = [1, 2, 3]` (`nums.length = 3`):

1. Initialize `s = 0`, `mi = 1`.
2. `x = 1`: `s = 1`, `mi = min(1, 1) = 1`.
3. `x = 2`: `s = 3`, `mi = min(1, 2) = 1`.
4. `x = 3`: `s = 6`, `mi = min(1, 3) = 1`.
5. Compute `s - (long) mi * nums.length = 6 - 1 * 3 = 3`.

Returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single linear scan computes both the total sum `s` and the minimum element `mi`.
- **Space Complexity:** `O(1)` — Only two scalar variables (`s` and `mi`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [453minimum-moves-to-equal-array-elements.java](./453minimum-moves-to-equal-array-elements.java) |

---

## Key Learnings

- Reframing bulk updates on `n - 1` elements as an inverse single-element update (`-1` on the remaining element) turns a tricky simulation into trivial arithmetic.
- Even when a problem guarantees the final output fits in a 32-bit integer, intermediate sums like `sum(nums)` and `mi * n` can exceed `Integer.MAX_VALUE` and must use `long`.
