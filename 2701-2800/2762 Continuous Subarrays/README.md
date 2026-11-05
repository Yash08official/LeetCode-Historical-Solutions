---
comments: true
difficulty: Medium
tags:
  - Array
  - Queue
  - Sliding Window
  - Heap (Priority Queue)
  - Ordered Set
  - Monotonic Queue
---

# 2762. Continuous Subarrays

**[View Problem on LeetCode](https://leetcode.com/problems/continuous-subarrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2762` (`2762`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Queue`, `Sliding Window`, `Heap (Priority Queue)`, `Ordered Set`, `Monotonic Queue` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed integer array `nums`. A subarray of `nums` is called **continuous** if for every pair of indices in the subarray, the absolute difference between their elements is at most 2: `0 <= |nums[i1] - nums[i2]| <= 2`.

In other words, the difference between the maximum and minimum elements in the subarray must not exceed 2.

We need to return the total number of continuous subarrays in `nums`.

---

## Examples

### Example 1

```text
Input: nums = [5,4,2,4]
Output: 8
Explanation:
Continuous subarray of size 1: [5], [4], [2], [4].
Continuous subarray of size 2: [5,4], [4,2], [2,4].
Continuous subarray of size 3: [4,2,4].
There are no subarrys of size 4.
Total continuous subarrays = 4 + 3 + 1 = 8.
It can be shown that there are no more continuous subarrays.
```

### Example 2

```text
Input: nums = [1,2,3]
Output: 6
Explanation:
Continuous subarray of size 1: [1], [2], [3].
Continuous subarray of size 2: [1,2], [2,3].
Continuous subarray of size 3: [1,2,3].
Total continuous subarrays = 3 + 2 + 1 = 6.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

---

## Problem Understanding

Key properties and insights:
- Array length `nums.length` is up to $10^5$, meaning an $O(n^2)$ pairwise subarray check will exceed time limits. We need an $O(n)$ or $O(n \log n)$ solution.
- Subarray condition: $\max(subarray) - \min(subarray) \le 2$.
- Monotonic window property: If a window `nums[i..j]` is valid, any subsegment within it is also valid. If expanding `j` violates the condition, we must increment `i` until $\max - \min \le 2$.
- Number of valid continuous subarrays ending at index `j` is exactly `j - i + 1`.

---

## Approach

### Brute Force Approach

A brute-force solution checks all $O(n^2)$ subarrays. For each start index `i` and end index `j`, it tracks the running minimum and maximum. As soon as `max - min > 2`, it breaks for that `i`. In the worst case (e.g., an array of identical elements), this examines all $\frac{n(n+1)}{2}$ subarrays, resulting in $O(n^2)$ time ($10^{10}$ operations for $n = 10^5$), which times out.

### Optimized Approach

The solution uses a two-pointer sliding window `[i, j]` combined with a `TreeMap<Integer, Integer>` `tm` to track element frequencies in the current window:
1. Expand the right boundary `j` from `0` to `n - 1`, adding `nums[j]` to `tm` with `tm.merge(nums[j], 1, Integer::sum)`.
2. While the window condition is violated (`tm.lastEntry().getKey() - tm.firstEntry().getKey() > 2`), shrink from the left: decrement the count of `nums[i]` in `tm`, remove it if its count reaches 0, and increment `i`.
3. Once valid, add `j - i + 1` to `ans` (the number of continuous subarrays ending at `j`).

### Step-by-Step Thinking Process

1. Condition $\max - \min \le 2$ has monotonicity: shrinking the window never increases the difference between max and min.
2. Use a sliding window with left pointer `i` and right pointer `j`.
3. Maintain the dynamic min and max of window `nums[i..j]`. A `TreeMap` allows retrieving `firstEntry()` (min) and `lastEntry()` (max) easily.
4. Because $\max - \min \le 2$, the `TreeMap` will hold at most 3 distinct values at any time during a valid state!
5. When `lastEntry() - firstEntry() > 2`, shrink window by removing `nums[i]` and advancing `i++`.
6. For each `j`, the number of continuous subarrays ending at `j` is `j - i + 1`. Accumulate into `ans` (using `long` to prevent integer overflow).

### Algorithm / Intuition

In `continuousSubarrays(nums)`, `tm` acts as a frequency map of elements in the sliding window `[i, j]`. At each step, `nums[j]` is inserted via `tm.merge(nums[j], 1, Integer::sum)`. The `while` loop checks `tm.lastEntry().getKey() - tm.firstEntry().getKey() > 2`. If the gap exceeds 2, `nums[i]` is removed from the window and `i` advances. Once the difference is $\le 2$, every subarray starting at any index from `i` to `j` and ending at `j` is continuous. The count of such subarrays is `j - i + 1`, which is added to `ans`.

---

## Dry Run

We trace Example 1 with `nums = [5, 4, 2, 4]`:

- Initialize: `ans = 0`, `i = 0`, `tm = {}`.
- `j = 0`, `nums[0] = 5`: `tm = {5: 1}`. `5 - 5 = 0 <= 2`. `ans += (0 - 0 + 1) = 1` -> `ans = 1`.
- `j = 1`, `nums[1] = 4`: `tm = {4: 1, 5: 1}`. `5 - 4 = 1 <= 2`. `ans += (1 - 0 + 1) = 2` -> `ans = 3`.
- `j = 2`, `nums[2] = 2`: `tm = {2: 1, 4: 1, 5: 1}`. Max - min = `5 - 2 = 3 > 2`.
  - While loop: decrement `nums[0] = 5` -> `tm = {2: 1, 4: 1}`, `i = 1`.
  - Now `4 - 2 = 2 <= 2`. While loop exits.
  - `ans += (2 - 1 + 1) = 2` -> `ans = 5`.
- `j = 3`, `nums[3] = 4`: `tm = {2: 1, 4: 2}`. `4 - 2 = 2 <= 2`. `ans += (3 - 1 + 1) = 3` -> `ans = 8`.
- Return `ans = 8`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` amortized — Although a `TreeMap` generally has $O(\log k)$ operations, here the number of distinct keys in `tm` is at most 3 (since values differ by at most 2, plus at most 1 temporary extra during expansion). Thus $k \le 4$, making `TreeMap` operations effectively $O(1)$. Each element is inserted once and removed at most once.
- **Space Complexity:** `O(1)` auxiliary space — The `TreeMap` stores at most 4 distinct keys at any instant regardless of `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2762continuous-subarrays.java](./2762continuous-subarrays.java) |

---

## Key Learnings

- Sliding window counts subarrays ending at index `j` with `j - i + 1` whenever the validity condition is monotonic.
- Recognizing that the spread $\le 2$ strictly bounds the number of distinct elements in the window to at most 3 makes ordered map operations effectively $O(1)$.
- Always use `long` for subarray counting accumulators to prevent 32-bit signed integer overflow when $n = 10^5$.
