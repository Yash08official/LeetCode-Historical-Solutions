---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Queue
  - Sliding Window
  - Prefix Sum
---

# 3191. Minimum Operations to Make Binary Array Elements Equal to One I

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3191` (`3191`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Queue`, `Sliding Window`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given a binary array `nums` consisting only of `0`s and `1`s.

You can perform the following operation any number of times: choose any 3 consecutive elements in `nums` and flip all three of them (changing every `0` to `1` and every `1` to `0`).

Return the minimum number of operations required to make all elements in `nums` equal to `1`. If it is impossible to make all elements equal to `1`, return `-1`.

---

## Examples

### Example 1

**Input:** `nums = [0,1,1,1,0,0]`

**Output:** `3`

**Explanation:**

We can do the following operations:

- Choose the elements at indices 0, 1 and 2. The resulting array is `nums = [1,0,0,1,0,0]`.

- Choose the elements at indices 1, 2 and 3. The resulting array is `nums = [1,1,1,0,0,0]`.

- Choose the elements at indices 3, 4 and 5. The resulting array is `nums = [1,1,1,1,1,1]`.

### Example 2

**Input:** `nums = [0,1,1,1]`

**Output:** `-1`

**Explanation:**

It is impossible to make all elements equal to 1.

---

## Constraints

- `3 <= nums.length <= 10^5`

- `0 <= nums[i] <= 1`

---

## Problem Understanding

- **Independence and Order Invariance:** Flipping the same triplet twice cancels out, meaning each triplet starting at index `i` is flipped at most once. Furthermore, the order in which flips are applied does not change the final array.
- **Deterministic Left-to-Right Greedy:** To make `nums[0]` equal to 1, if it is currently 0, we have exactly one choice: flip the triplet starting at index 0 (`nums[0..2]`). No operation starting at index `> 0` can affect `nums[0]`.
- **Impossibility Condition:** Once we process indices `0` through `n - 3`, if either `nums[n - 2]` or `nums[n - 1]` is still 0, we cannot form another 3-element window, so reaching all 1s is impossible.

---

## Approach

### Brute Force Approach

There are `n - 2` valid starting positions for a triplet flip. A brute force search would explore whether to flip or not flip at each position, leading to `2^(n - 2)` states. With `n <= 10^5`, exponential search is completely infeasible.

### Optimized Approach

We iterate through `nums` from index `i = 0` to `n - 1`. Whenever `nums[i] == 0`, we are forced to flip the triplet starting at index `i`. If `i + 2 >= n`, a 3-element flip is impossible, so we return `-1`. Otherwise, we flip `nums[i + 1]` and `nums[i + 2]` using XOR (`^= 1`), increment our operation counter `ans`, and continue. Index `nums[i]` is implicitly flipped to 1 without needing an explicit write.

### Step-by-Step Thinking Process

1. Observe that the leftmost zero at index `i` cannot be fixed by any flip starting at index `> i`.
2. Therefore, whenever `nums[i] == 0`, flipping the triplet `[i, i + 1, i + 2]` is mandatory.
3. Check boundary: if `nums[i] == 0` and `i + 2 >= n`, we cannot perform a valid flip, so return `-1`.
4. If a flip is valid, toggle `nums[i + 1]` and `nums[i + 2]` via `^= 1` and increment `ans`.
5. Continue scanning to `n - 1`. If we successfully exit the loop, return `ans`.

### Algorithm / Intuition

In the provided `Solution.minOperations`: the variable `ans` counts completed flips, and `n = nums.length`. We loop `for (int i = 0; i < n; ++i)`. When `nums[i] == 0`, we check `if (i + 2 >= n)`: if true, there are fewer than 3 elements remaining to form a flip window, making it impossible to fix `nums[i]`, so we immediately return `-1`. Otherwise, we apply the flip to the next two elements: `nums[i + 1] ^= 1; nums[i + 2] ^= 1;` and increment `++ans;`. We do not need to update `nums[i]` because the loop will never inspect `nums[i]` again. This greedy forward propagation guarantees optimality.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [0, 1, 1, 1, 0, 0]`

| `i` | `nums[i]` | Condition | Action | Resulting `nums` | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | 0 | `0 + 2 < 6` | Flip `[0, 1, 2]`: `nums[1] ^= 1`, `nums[2] ^= 1` | `[0, 0, 0, 1, 0, 0]` | 1 |
| 1 | 0 | `1 + 2 < 6` | Flip `[1, 2, 3]`: `nums[2] ^= 1`, `nums[3] ^= 1` | `[0, 0, 1, 0, 0, 0]` | 2 |
| 2 | 1 | No flip | Move forward | `[0, 0, 1, 0, 0, 0]` | 2 |
| 3 | 0 | `3 + 2 < 6` | Flip `[3, 4, 5]`: `nums[4] ^= 1`, `nums[5] ^= 1` | `[0, 0, 1, 0, 1, 1]` | 3 |
| 4 | 1 | No flip | Move forward | `[0, 0, 1, 0, 1, 1]` | 3 |
| 5 | 1 | No flip | Move forward | `[0, 0, 1, 0, 1, 1]` | 3 |

Loop terminates. Return `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We make a single pass through the array `nums` of length `n`. At each index, we do `O(1)` constant work.
- **Space Complexity:** `O(1)` — Flips are performed in-place within `nums`, requiring only a few integer variables (`ans`, `n`, `i`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3191minimum-operations-to-make-binary-array-elements-equal-to-one-i.java](./3191minimum-operations-to-make-binary-array-elements-equal-to-one-i.java) |

---

## Key Learnings

- In binary toggle problems with fixed-width windows, left-to-right greedy assignment is uniquely determined because earlier positions cannot be affected by later choices.
- In-place bitwise XOR (`^= 1`) is an idiomatic way to toggle binary values between `0` and `1`.
