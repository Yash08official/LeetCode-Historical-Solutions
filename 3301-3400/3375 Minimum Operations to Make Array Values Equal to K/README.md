---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
---

# 3375. Minimum Operations to Make Array Values Equal to K

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3375` (`3375`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` and an integer `k`.

An integer `h` is defined as **valid** if all values in `nums` that are strictly greater than `h` are identical.

In one operation, you can choose a valid integer `h` and set all values in `nums` that are strictly greater than `h` to `h`.

Return the minimum number of operations required to make every value in `nums` equal to `k`. If it is impossible to make all values equal to `k`, return `-1`.

---

## Examples

### Example 1

**Input:** `nums = [5,2,5,4,5], k = 2`

**Output:** `2`

**Explanation:**

The operations can be performed in order using valid integers 4 and then 2.

### Example 2

**Input:** `nums = [2,1,2], k = 2`

**Output:** `-1`

**Explanation:**

It is impossible to make all the values equal to 2.

### Example 3

**Input:** `nums = [9,7,5,3], k = 1`

**Output:** `4`

**Explanation:**

The operations can be performed using valid integers in the order 7, 5, 3, and 1.

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 100`

- `1 <= k <= 100`

---

## Problem Understanding

- **Monotonically Decreasing Operation:** Each operation sets elements strictly greater than `h` down to `h`. Elements can only decrease, never increase.
- **Impossibility:** If any element in `nums` is strictly less than `k` (`min(nums) < k`), it is impossible to make all elements equal to `k`, so we must return `-1`.
- **Valid `h` Implication:** To choose a valid `h`, all values strictly greater than `h` must be identical. This means `h` must be chosen such that only the current maximum unique value in the array is greater than `h`. In other words, each operation can reduce exactly one distinct value (the current maximum) down to the next largest value.
- **Counting Operations:** Every unique value strictly greater than `k` must eventually be flattened down. Each such unique value requires exactly one operation to be eliminated.
- Therefore, if `min(nums) >= k`, the answer is simply the number of distinct values in `nums` that are strictly greater than `k`.

---

## Approach

### Brute Force Approach

Simulate each reduction step explicitly: find the maximum value in `nums`, find the second maximum value (or `k`), and replace all occurrences of the maximum with the second maximum. Repeat until all elements equal `k`. Each step scans the array in `O(n)` time, taking `O(u * n)` total time where `u` is the number of unique elements. While acceptable for `n <= 100`, counting unique values directly is cleaner and faster.

### Optimized Approach

First, find `minValue = Arrays.stream(nums).min().getAsInt()`. If `minValue < k`, return `-1`. Otherwise, sort `nums` in ascending order. Iterate through `nums`: for each element `nums[i] > k`, increment `operationCount` and skip all identical duplicates using `while (i + 1 < nums.length && nums[i] == nums[i + 1]) ++i;`. Return `operationCount`.

### Step-by-Step Thinking Process

1. Can values ever increase? No, only decreased to `h`.
2. Hence, if `min(nums) < k`, making all elements `k` is impossible -> return `-1`.
3. What does the definition of valid `h` require? 'All values strictly greater than `h` are identical.'
4. This means `h` can only be set to reduce the single highest distinct value to the next highest distinct value.
5. Thus, each distinct value greater than `k` must be eliminated one by one in descending order.
6. Number of operations needed is exactly the number of unique elements in `nums` strictly greater than `k`.
7. Sort `nums`, count distinct values `> k`, and return.

### Algorithm / Intuition

In `Solution.minOperations`: `minValue` is obtained via `Arrays.stream(nums).min().getAsInt()`. If `minValue < k`, at least one value cannot reach `k`, so `-1` is returned. Next, `Arrays.sort(nums)` sorts the array in `O(n log n)`. We iterate `for (int i = 0; i < nums.length; ++i)`: whenever `nums[i] > k`, it represents a distinct level that must be reduced, so `++operationCount`. The inner while loop `while (i + 1 < nums.length && nums[i] == nums[i + 1]) ++i` advances past all duplicates of this value so it is only counted once. After the loop, `operationCount` is returned.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [5, 2, 5, 4, 5]`, `k = 2`

- `minValue = min([5, 2, 5, 4, 5]) = 2`. Since `2 >= k (2)`, operation is possible.
- Sorted `nums = [2, 4, 5, 5, 5]`.
- `i = 0`: `nums[0] = 2 <= k` -> skip.
- `i = 1`: `nums[1] = 4 > k` -> `++operationCount` (`count = 1`). No duplicate `4`s.
- `i = 2`: `nums[2] = 5 > k` -> `++operationCount` (`count = 2`). Inner while loop skips `nums[3] = 5` and `nums[4] = 5` (`i` becomes 4).
- Loop ends. Return `operationCount = 2` (operations: set 5s to 4 using `h = 4`, then set 4s to 2 using `h = 2`).

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Finding the minimum takes `O(n)`. Sorting `nums` of length `n` takes `O(n log n)`. The linear duplicate scan takes `O(n)`.
- **Space Complexity:** `O(1)` — In-place array sorting and counting uses `O(1)` auxiliary memory (or `O(log n)` stack space for sorting).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3375minimum-operations-to-make-array-values-equal-to-k.java](./3375minimum-operations-to-make-array-values-equal-to-k.java) |

---

## Key Learnings

- Carefully parse operation constraints: requiring all values greater than `h` to be identical forces a strict top-down reduction of distinct values.
- The problem reduces to counting distinct elements strictly greater than `k` once feasibility (`min >= k`) is verified.
