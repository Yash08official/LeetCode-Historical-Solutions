---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Sliding Window
---

# 2461. Maximum Sum of Distinct Subarrays With Length K

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2461` (`2461`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` and an integer `k`.

Find the maximum subarray sum among all contiguous subarrays of length $k$ that contain only **distinct** elements. If no subarray of length $k$ has all distinct elements, return `0`.

---

## Examples

### Example 1

```text
Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions
```

### Example 2

```text
Input: nums = [4,4,4], k = 3
Output: 0
Explanation: The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.
```

---

## Constraints

- `1 <= k <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^5`

---

## Problem Understanding

A valid subarray must satisfy two conditions simultaneously:
1. Its length is exactly $k$.
2. All $k$ elements are unique (no duplicates).

Because the window length is fixed at $k$, we can slide a window of size $k$ across `nums`. To verify that all elements are distinct in $O(1)$ time per slide, we maintain a frequency map of elements in the window. When the map contains exactly $k$ unique keys (`cnt.size() == k`), the window has no duplicates, and its running sum is a candidate maximum.

---

## Approach

### Brute Force Approach

Check every subarray of length $k$. For each subarray starting at index $i$, insert elements into a hash set to check uniqueness and compute its sum. There are $n - k + 1$ subarrays, and inspecting each takes $O(k)$ time. The overall complexity is $O(n \cdot k)$. For $n = 10^5$ and $k = 10^5$, $n \cdot k = 10^{10}$ operations, resulting in TLE.

### Optimized Approach

Maintain a sliding window of fixed size $k$, a running sum `s` of type `long` (to prevent 32-bit integer overflow), and a frequency hash map `cnt`. When shifting the window from $i - 1$ to $i$, add `nums[i]` and remove `nums[i - k]`. Whenever `cnt.size() == k`, compare the running sum `s` against the best answer `ans`.

### Step-by-Step Thinking Process

1. Identify the fixed sliding window pattern of size $k$.
2. Maintain running sum `s` of elements currently inside the window.
3. Track element frequencies using a hash map `cnt`. The condition that all $k$ elements are distinct is equivalent to `cnt.size() == k`.
4. Initialize the window with the first $k$ elements ($i = 0$ to $k - 1$). If `cnt.size() == k`, initialize `ans = s`, else `ans = 0`.
5. Slide the window from $i = k$ to $n - 1$:
  - Insert incoming element `nums[i]` into `cnt` and add to `s`.
  - Decrement outgoing element `nums[i - k]` in `cnt`; if its frequency hits 0, remove it from `cnt`.
  - Subtract `nums[i - k]` from `s`.
  - If `cnt.size() == k`, update `ans = Math.max(ans, s)`.

### Algorithm / Intuition

In the provided Java solution:

1. `Map<Integer, Integer> cnt = new HashMap<>(k)` tracks frequencies of elements within the window, and `long s = 0` accumulates the sum.
2. The initial window ($0$ to $k - 1$) is populated using `cnt.merge(nums[i], 1, Integer::sum)`. If `cnt.size() == k`, `ans` is initialized to `s`.
3. For indices $i = k$ to $n - 1$:
   - `nums[i]` enters: `cnt.merge(nums[i], 1, Integer::sum)`.
   - `nums[i - k]` leaves: `if (cnt.merge(nums[i - k], -1, Integer::sum) == 0) cnt.remove(nums[i - k]);`.
   - Running sum updates: `s += nums[i] - nums[i - k]`.
   - Uniqueness check: `if (cnt.size() == k) ans = Math.max(ans, s)`.
4. Using `long` prevents integer overflow, as $k \times 10^5 \le 10^{10}$, which exceeds `Integer.MAX_VALUE`.

---

## Dry Run

Consider Example 1: `nums = [1, 5, 4, 2, 9, 9, 9]`, `k = 3`

1. **Initial Window ($i = 0, 1, 2$)**:
   - Elements: `[1, 5, 4]`. `cnt = {1:1, 5:1, 4:1}` (size 3). `s = 10`.
   - `cnt.size() == 3` -> `ans = 10`.

2. **Slide to $i = 3$ (add 2, remove 1)**:
   - Add 2, remove 1: `cnt = {5:1, 4:1, 2:1}` (size 3). `s = 10 + 2 - 1 = 11`.
   - `cnt.size() == 3` -> `ans = max(10, 11) = 11`.

3. **Slide to $i = 4$ (add 9, remove 5)**:
   - Add 9, remove 5: `cnt = {4:1, 2:1, 9:1}` (size 3). `s = 11 + 9 - 5 = 15`.
   - `cnt.size() == 3` -> `ans = max(11, 15) = 15`.

4. **Slide to $i = 5$ (add 9, remove 4)**:
   - Add 9, remove 4: `cnt = {2:1, 9:2}` (size 2 < 3). `s = 15 + 9 - 4 = 20`.
   - Not distinct -> `ans` remains 15.

5. **Slide to $i = 6$ (add 9, remove 2)**:
   - Add 9, remove 2: `cnt = {9:3}` (size 1 < 3). `s = 20 + 9 - 2 = 27`.
   - Not distinct -> `ans` remains 15.

Final Return: `15`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each element enters and exits the sliding window frequency map at most once, with $O(1)$ amortized hash map operations.
- **Space Complexity:** `O(k)` — The hash map `cnt` stores at most $k + 1$ distinct elements at any point.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2461maximum-sum-of-distinct-subarrays-with-length-k.java](./2461maximum-sum-of-distinct-subarrays-with-length-k.java) |

---

## Key Learnings

- A frequency map's size equals the number of distinct elements: if `map.size() == k` in a window of length $k$, all elements are distinct.
- Always use 64-bit integers (`long` in Java) for subarray sums when elements can sum to $\ge 2 \times 10^9$.
- `Map.merge` with removal on zero count enables concise and clean sliding window frequency management.
