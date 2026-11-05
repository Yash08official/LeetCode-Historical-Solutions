---
comments: true
difficulty: Easy
tags:
  - Array
  - Math
  - Heap (Priority Queue)
  - Simulation
---

# 3264. Final Array State After K Multiplication Operations I

**[View Problem on LeetCode](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3264` (`3264`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Math`, `Heap (Priority Queue)`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`, an integer `k`, and an integer `multiplier`.

You need to perform `k` operations on `nums`. In each operation:
1. Find the minimum value in `nums`. If there are multiple occurrences of the minimum value, select the one that appears first (smallest index).
2. Replace that minimum element `nums[i]` with `nums[i] * multiplier`.

Return the final state of `nums` after completing all `k` operations.

---

## Examples

### Example 1

**Input:** `nums = [2,1,3,5,6], k = 5, multiplier = 2`

**Output:** `[8,4,6,5,6]`

**Explanation:**

			Operation
			Result

			After operation 1
			[2, 2, 3, 5, 6]

			After operation 2
			[4, 2, 3, 5, 6]

			After operation 3
			[4, 4, 3, 5, 6]

			After operation 4
			[4, 4, 6, 5, 6]

			After operation 5
			[8, 4, 6, 5, 6]

### Example 2

**Input:** `nums = [1,2], k = 3, multiplier = 4`

**Output:** `[16,8]`

**Explanation:**

			Operation
			Result

			After operation 1
			[4, 2]

			After operation 2
			[4, 8]

			After operation 3
			[16, 8]

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 100`

- `1 <= k <= 10`

- `1 <= multiplier <= 5`

---

## Problem Understanding

- **Repeated Minimum Selection:** Each operation dynamically modifies an element, which may change which element is the minimum in subsequent steps.
- **Tie-Breaking Rule:** When multiple elements share the exact same minimum value, the element with the smallest index must be chosen.
- **Small Constraints:** In version I of this problem, `n <= 100`, `k <= 10`, and `multiplier <= 5`, making priority queue simulation straightforward and optimal.

---

## Approach

### Brute Force Approach

In each of the `k` operations, perform a linear scan over all `n` elements in `nums` to find the minimum value and its first occurrence index `i`, then multiply `nums[i] *= multiplier`. This takes `O(k * n)` time, which is roughly `10 * 100 = 1000` operations.

### Optimized Approach

We use a min-heap (`PriorityQueue<Integer>`) storing the indices of `nums`. The comparator orders indices by their corresponding values `nums[i] - nums[j]`, breaking ties by index `i - j`. We initially insert all indices `0 <= i < n` into the heap. For each of the `k` steps, we poll the top index `i`, multiply `nums[i] *= multiplier`, and re-insert `i` into the heap so it can be repositioned according to its new value. Finally, we return the mutated `nums`.

### Step-by-Step Thinking Process

1. We need repeated retrieval and extraction of the minimum element with a tie-breaker on index.
2. A min-heap / PriorityQueue over array indices is the canonical structure for this requirement.
3. Define comparator: `(i, j) -> nums[i] - nums[j] == 0 ? i - j : nums[i] - nums[j]`.
4. Offer all indices `0` to `nums.length - 1` into `pq`.
5. Loop `k` times: poll minimum index `i`, multiply `nums[i] *= multiplier`, and offer `i` back into `pq`.
6. Return `nums` directly.

### Algorithm / Intuition

In `Solution.getFinalState`: `pq` is instantiated with a custom comparator that compares `nums[i]` and `nums[j]`, falling back to `i - j` on equality to preserve index priority. All indices are loaded via `pq.offer(i)` in `O(n log n)` time. The loop `while (k-- > 0)` polls the smallest element index `i`, scales `nums[i] *= multiplier`, and re-offers `i` back into `pq`. Re-inserting `i` updates its position in `O(log n)` time. Because `nums` is updated in place, returning `nums` yields the exact final array state.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [2, 1, 3, 5, 6]`, `k = 5`, `multiplier = 2`

Initial heap order of indices: `[1, 0, 2, 3, 4]` (since `nums[1] = 1`, `nums[0] = 2`, `nums[2] = 3`, ...)

| Operation | Polled Index `i` | Old `nums[i]` | New `nums[i]` | Updated `nums` |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 1 | `1 * 2 = 2` | `[2, 2, 3, 5, 6]` |
| 2 | 0 (tie with 1, index 0 < 1) | 2 | `2 * 2 = 4` | `[4, 2, 3, 5, 6]` |
| 3 | 1 | 2 | `2 * 2 = 4` | `[4, 4, 3, 5, 6]` |
| 4 | 2 | 3 | `3 * 2 = 6` | `[4, 4, 6, 5, 6]` |
| 5 | 0 (tie with 1, index 0 < 1) | 4 | `4 * 2 = 8` | `[8, 4, 6, 5, 6]` |

End of operations. Return `[8, 4, 6, 5, 6]`.

---

## Complexity Analysis

- **Time Complexity:** `O((n + k) log n)` — Initial heap insertion of `n` indices takes `O(n log n)`. Each of the `k` multiplication steps performs a `poll()` and `offer()` taking `O(log n)` time.
- **Space Complexity:** `O(n)` — The PriorityQueue stores all `n` indices.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3264final-array-state-after-k-multiplication-operations-i.java](./3264final-array-state-after-k-multiplication-operations-i.java) |

---

## Key Learnings

- Storing indices rather than values inside a priority queue allows in-place array updates and enables natural tie-breaking by index.
- Min-heaps efficiently manage dynamic state updates where elements change value and must be repeatedly re-prioritized.
