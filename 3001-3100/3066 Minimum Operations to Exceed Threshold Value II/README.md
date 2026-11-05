---
comments: true
difficulty: Medium
tags:
  - Array
  - Heap (Priority Queue)
  - Simulation
---

# 3066. Minimum Operations to Exceed Threshold Value II

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3066` (`3066`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Heap (Priority Queue)`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed integer array `nums` and an integer `k`. In a single operation, we can:
1. Select the two smallest numbers `x` and `y` from `nums`.
2. Remove both `x` and `y` from `nums`.
3. Insert a new number `(min(x, y) * 2 + max(x, y))` back into `nums`.

We want to find the minimum number of operations required so that every element in `nums` becomes greater than or equal to `k`. The problem guarantees that a valid sequence of operations always exists.

---

## Examples

### Example 1

**Input:** `nums = [2,11,10,1,3], k = 10`

**Output:** `2`

**Explanation:**

- In the first operation, we remove elements 1 and 2, then add `1 * 2 + 2` to `nums`. `nums` becomes equal to `[4, 11, 10, 3]`.

- In the second operation, we remove elements 3 and 4, then add `3 * 2 + 4` to `nums`. `nums` becomes equal to `[10, 11, 10]`.

At this stage, all the elements of nums are greater than or equal to 10 so we can stop.

It can be shown that 2 is the minimum number of operations needed so that all elements of the array are greater than or equal to 10.

### Example 2

**Input:** `nums = [1,1,2,4,9], k = 20`

**Output:** `4`

**Explanation:**

- After one operation, `nums` becomes equal to `[2, 4, 9, 3]`.

- After two operations, `nums` becomes equal to `[7, 4, 9]`.

- After three operations, `nums` becomes equal to `[15, 9]`.

- After four operations, `nums` becomes equal to `[33]`.

At this stage, all the elements of `nums` are greater than 20 so we can stop.

It can be shown that 4 is the minimum number of operations needed so that all elements of the array are greater than or equal to 20.

---

## Constraints

- `2 <= nums.length <= 2 * 10^5`

- `1 <= nums[i] <= 10^9`

- `1 <= k <= 10^9`

- The input is generated such that an answer always exists. That is, after performing some number of operations, all elements of the array are greater than or equal to `k`.

---

## Problem Understanding

Key properties and invariants:
- To reach the goal with minimum operations, we must greedily combine the two currently smallest elements at every step.
- If the smallest element in the collection is already `>= k`, then by definition all other elements are also `>= k`, and no further operations are needed.
- As long as the smallest element is `< k` and there are at least two elements, we must continue merging.
- Notice the formula `x * 2 + y`: since `x, y <= 10^9`, the intermediate value can easily exceed `2^31 - 1` (up to `3 * 10^9` or more across multiple operations). Using 64-bit integers (`long`) in the priority queue is mandatory to avoid integer overflow.

---

## Approach

### Brute Force Approach

A naive approach would repeatedly sort the array after every operation to find the two smallest elements. With up to `n` operations, sorting an array of size `n` at each step yields `O(n^2 log n)` time complexity, which will immediately time out for `n = 2 * 10^5`.

### Optimized Approach

We initialize a min-heap (`PriorityQueue<Long> pq`) with all numbers from `nums` cast to `long`.
- In a loop, while `pq.size() > 1` and `pq.peek() < k`, we increment our operation counter `ans`.
- We extract the two smallest elements `long x = pq.poll()` and `long y = pq.poll()` (where `x <= y`).
- We insert their combined value `x * 2 + y` back into `pq`.
- When `pq.peek() >= k`, all elements in the heap are at least `k`, so we return `ans`.

### Step-by-Step Thinking Process

1. We need repeated retrieval and extraction of the two smallest elements.
2. A min-heap (priority queue) provides `O(1)` minimum inspection and `O(log n)` extraction/insertion.
3. The stop condition is straightforward: once the smallest element (`pq.peek()`) is `>= k`, all elements meet the threshold.
4. Combine `x` and `y` via `x * 2 + y` and push the result back into the min-heap.
5. Cast elements to `long` to protect against 32-bit integer overflow during multiplication.

### Algorithm / Intuition

The algorithm follows a greedy simulation backed by a min-heap:
1. Instantiate `PriorityQueue<Long> pq = new PriorityQueue<>()` and offer each element `(long) x` from `nums`.
2. Initialize `ans = 0`.
3. Loop condition: `pq.size() > 1 && pq.peek() < k`.
   - In each iteration, increment `ans`.
   - Poll the two smallest values `x` and `y`.
   - Push `x * 2 + y` into `pq`.
4. Return `ans` once the loop terminates.

---

## Dry Run

Trace on Example 1: `nums = [2, 11, 10, 1, 3], k = 10`

- Min-heap contents initially: `[1, 2, 3, 10, 11]`.
- Iteration 1:
  - `pq.size() = 5 > 1` and `pq.peek() = 1 < 10`.
  - `++ans` -> `ans = 1`.
  - Poll `x = 1`, `y = 2`.
  - Offer `1 * 2 + 2 = 4`.
  - Heap now contains: `[3, 4, 10, 11]`.
- Iteration 2:
  - `pq.size() = 4 > 1` and `pq.peek() = 3 < 10`.
  - `++ans` -> `ans = 2`.
  - Poll `x = 3`, `y = 4`.
  - Offer `3 * 2 + 4 = 10`.
  - Heap now contains: `[10, 10, 11]`.
- Check condition:
  - `pq.peek() = 10 >= 10` -> loop terminates.
- Return `ans = 2`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n log n) — Building the min-heap takes O(n log n) (or O(n) with heapify). Each operation reduces the heap size by 1 and performs 3 heap operations (2 polls and 1 push), each taking O(log n). At most n operations occur, yielding O(n log n) total time.
- **Space Complexity:** O(n) — The min-heap stores up to n 64-bit integer elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3066minimum-operations-to-exceed-threshold-value-ii.java](./3066minimum-operations-to-exceed-threshold-value-ii.java) |

---

## Key Learnings

- Min-heaps are ideal for algorithms requiring dynamic selection and replacement of the smallest values.
- Always evaluate potential arithmetic overflow: intermediate sums `x * 2 + y` require 64-bit `long`.
- Checking `pq.peek() >= k` allows early termination as soon as the smallest element meets the threshold.
