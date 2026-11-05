---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Sliding Window
---

# 3097. Shortest Subarray With OR at Least K II

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3097` (`3097`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

We are given an array of non-negative integers `nums` and an integer `k`. A subarray is called special if the bitwise OR of all its elements is at least `k`.

We want to find the length of the shortest non-empty special subarray of `nums`. If no such subarray exists, return `-1`.

---

## Examples

### Example 1

**Input:** `nums = [1,2,3], k = 2`

**Output:** `1`

**Explanation:**

The subarray `[3]` has `OR` value of `3`. Hence, we return `1`.

### Example 2

**Input:** `nums = [2,1,8], k = 10`

**Output:** `3`

**Explanation:**

The subarray `[2,1,8]` has `OR` value of `11`. Hence, we return `3`.

### Example 3

**Input:** `nums = [1,2], k = 0`

**Output:** `1`

**Explanation:**

The subarray `[1]` has `OR` value of `1`. Hence, we return `1`.

---

## Constraints

- `1 <= nums.length <= 2 * 10^5`

- `0 <= nums[i] <= 10^9`

- `0 <= k <= 10^9`

---

## Problem Understanding

Key properties of the bitwise OR operation:
- Monotonicity: Including an extra number in a subarray can only set more bits (or leave bits unchanged), meaning bitwise OR never decreases when expanding a subarray.
- Because of this monotonicity, a sliding window (two pointers) approach can be used.
- However, unlike addition, bitwise OR does not have a simple inverse (you cannot simply subtract or XOR to remove an element when shrinking the window).
- To maintain the bitwise OR dynamically under window shrinking, we keep an array of bit counts `cnt[32]` tracking how many elements in the current window have the `h`-th bit set. A bit in the window's total OR `s` remains set as long as `cnt[h] > 0`, and is cleared when `cnt[h]` drops to 0.

---

## Approach

### Brute Force Approach

The brute-force solution checks all `O(n^2)` subarrays: for each start index `i`, expand `j` from `i` to `n - 1`, computing the running bitwise OR. As soon as OR `>= k`, update the minimum length. For `n = 2 * 10^5`, checking `O(n^2)` subarrays requires up to `4 * 10^{10}` operations, causing Time Limit Exceeded.

### Optimized Approach

We maintain a sliding window `[i, j]` with a bit-frequency array `cnt` of size 32 and running OR value `s`.
- When extending the right pointer `j`, we OR `nums[j]` into `s` and increment `cnt[h]` for every set bit `h` in `nums[j]`.
- Whenever `s >= k`, the current window is valid. We record `ans = Math.min(ans, j - i + 1)` and shrink from the left by removing `nums[i]`.
- When removing `nums[i]`, we decrement `cnt[h]` for each set bit. If `cnt[h]` reaches 0, we clear bit `h` from `s` using `s ^= 1 << h`.
- We advance `i` and continue shrinking as long as `s >= k`.
- If `ans` remains `> n`, no valid subarray exists, so we return `-1`; otherwise, return `ans`.

### Step-by-Step Thinking Process

1. We want the shortest subarray with `OR >= k`.
2. Expanding the window increases or maintains OR. Shrinking decreases or maintains OR. This sliding window structure is optimal.
3. To support window contractions, we maintain a frequency count for each bit position `0..31`.
4. Adding `x`: for each bit `h` set in `x`, `cnt[h]++` and `s |= (1 << h)`.
5. Removing `x`: for each bit `h` set in `x`, `cnt[h]--`. If `cnt[h] == 0`, `s ^= (1 << h)`.
6. While `s >= k`, update `ans` and shrink `i`.

### Algorithm / Intuition

The sliding window mechanics are implemented as:
1. Allocate `int[] cnt = new int[32]` and initialize `ans = n + 1`, `s = 0`, `i = 0`.
2. Loop `j` from `0` to `n - 1`:
   - `s |= nums[j]`.
   - For each bit `h` in `0..31`: if `(nums[j] >> h & 1) == 1`, `++cnt[h]`.
   - While `s >= k && i <= j`:
     - Update `ans = Math.min(ans, j - i + 1)`.
     - For each bit `h` in `0..31`: if `(nums[i] >> h & 1) == 1`, decrement `cnt[h]`. If `--cnt[h] == 0`, `s ^= 1 << h`.
     - `++i`.
3. Return `ans > n ? -1 : ans`.

---

## Dry Run

Trace on Example 1: `nums = [1, 2, 3], k = 2` (`n = 3`)

- `j = 0, nums[0] = 1 (01_2)`:
  - `s = 1`, `cnt[0] = 1`. `s < 2`, no shrinking.
- `j = 1, nums[1] = 2 (10_2)`:
  - `s = 3`, `cnt[1] = 1`. `s >= 2` is true!
  - Window `[0, 1]` length is 2. `ans = min(4, 2) = 2`.
  - Remove `nums[0] = 1`: decrement `cnt[0]` to 0 -> `s ^= 1` -> `s = 2`. Advance `i = 1`.
  - Still `s = 2 >= 2`! Window `[1, 1]` length is 1. `ans = min(2, 1) = 1`.
  - Remove `nums[1] = 2`: decrement `cnt[1]` to 0 -> `s ^= 2` -> `s = 0`. Advance `i = 2`.
  - `s < 2`, while loop ends.
- `j = 2, nums[2] = 3 (11_2)`:
  - `s = 3`, `cnt[0]=1, cnt[1]=1`. `s >= 2` is true.
  - Window `[2, 2]` length is 1. `ans = min(1, 1) = 1`.
  - Remove `nums[2] = 3` -> `s = 0`, `i = 3`.
- End of loop. Return `ans = 1`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n * 32) = O(n) — Both pointers i and j advance at most n times. For each advance, we inspect at most 32 bits.
- **Space Complexity:** O(1) auxiliary space — The bit counter array `cnt` has a fixed size of 32 integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3097shortest-subarray-with-or-at-least-k-ii.java](./3097shortest-subarray-with-or-at-least-k-ii.java) |

---

## Key Learnings

- A bit-frequency array `cnt[32]` enables reversible bitwise OR operations inside a sliding window.
- Bitwise OR monotonicity guarantees correctness of the two-pointer sliding window technique.
- Checking `ans > n` cleanly identifies instances where no valid subarray satisfies the condition.
