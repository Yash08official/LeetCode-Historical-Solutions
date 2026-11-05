---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Greedy
  - Sorting
  - Heap (Priority Queue)
  - Prefix Sum
---

# 2406. Divide Intervals Into Minimum Number of Groups

**[View Problem on LeetCode](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2406` (`2406`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Greedy`, `Sorting`, `Heap (Priority Queue)`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a 2D integer array `intervals` where `intervals[i] = [left_i, right_i]` represents an inclusive interval.

You need to divide the intervals into one or more groups such that:
- Each interval belongs to exactly one group.
- No two intervals within the same group intersect (overlap).

Two intervals intersect if they share at least one common number (e.g., `[1, 5]` and `[5, 8]` intersect at `5`). Return the minimum number of groups needed.

---

## Examples

### Example 1

```text
Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation: We can divide the intervals into the following groups:
- Group 1: [1, 5], [6, 8].
- Group 2: [2, 3], [5, 10].
- Group 3: [1, 10].
It can be proven that it is not possible to divide the intervals into fewer than 3 groups.
```

### Example 2

```text
Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
Output: 1
Explanation: None of the intervals overlap, so we can put all of them in one group.
```

---

## Constraints

- `1 <= intervals.length <= 10^5`

- `intervals[i].length == 2`

- `1 <= left_i <= right_i <= 10^6`

---

## Problem Understanding

Key observations and constraints:
- `1 <= intervals.length <= 10^5`, and `1 <= left_i <= right_i <= 10^6`.
- Two intervals intersect if their intersection is non-empty. For example, `[1, 5]` and `[5, 8]` share the endpoint `5`, so they intersect and cannot be in the same group.
- By Dilworth's Theorem and interval scheduling theory, the minimum number of groups required so that no two intervals overlap in any group is exactly equal to the MAXIMUM NUMBER OF MUTUALLY OVERLAPPING INTERVALS at any single point in time (the peak concurrency).
- This problem is isomorphic to the classic 'Meeting Rooms II' problem.

---

## Approach

### Brute Force Approach

A brute-force approach would test all possible assignments of intervals to groups or check every integer coordinate along the timeline up to `10^6` to find the peak overlap. Checking every integer point takes `O(max_coord * n)`, which is too slow.

### Optimized Approach

Greedy interval scheduling using a min-heap (priority queue):
1. Sort the intervals in ascending order of their start times: `intervals.sort((a, b) => a[0] - b[0])`.
2. Maintain a min-heap `pq` storing the end times of the currently active groups.
3. For each interval `e = [start, end]`:
   - If the earliest-ending group finished strictly before `start` (`pq.front().element < e[0]`), that group can be reused to host the current interval, so remove its old end time (`pq.dequeue()`).
   - Enqueue the new interval's end time: `pq.enqueue(e[1])`.
4. After processing all intervals, the size of `pq` represents the total number of groups created.

### Step-by-Step Thinking Process

1. Intervals in the same group cannot overlap. If intervals intersect, they must be placed in different groups.
2. The minimum number of groups equals the maximum overlap of intervals at any point in time.
3. Sort intervals chronologically by their start times.
4. Track the end time of each group using a min-heap.
5. For each incoming interval, check if any existing group is already free (`min_end_time < current_start`).
6. If free, reuse that group (dequeue the old end time). If not, open a new group.
7. Push the current interval's end time into the heap.
8. Heap size at the end is the minimum number of groups required.

### Algorithm / Intuition

In `minGroups`, `intervals.sort((a, b) => a[0] - b[0])` orders intervals chronologically. A min-priority queue `let pq = new MinPriorityQueue()` tracks group availability by end time.

As we iterate through each interval `e`: `if (!pq.isEmpty() && pq.front().element < e[0]) pq.dequeue()`. Because `pq.front().element < e[0]` is strictly less than, there is no overlap at the boundary (e.g. end time 4 is compatible with start time 5). This reuses the group that freed up earliest. Then `pq.enqueue(e[1])` extends that group with the new end time (or creates a new group if none were free). At the end, `pq.size()` reflects the maximum concurrent groups required.

---

## Dry Run

Consider `intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]`:
- Sort by start time: `[1, 5], [1, 10], [2, 3], [5, 10], [6, 8]`.
- `[1, 5]`: `pq` empty -> enqueue 5. `pq = [5]`.
- `[1, 10]`: `pq.front() = 5 >= 1` (no reuse). Enqueue 10. `pq = [5, 10]`.
- `[2, 3]`: `pq.front() = 5 >= 2` (no reuse). Enqueue 3. `pq = [3, 5, 10]`.
- `[5, 10]`: `pq.front() = 3 < 5` (reuse group!). Dequeue 3, enqueue 10. `pq = [5, 10, 10]`.
- `[6, 8]`: `pq.front() = 5 < 6` (reuse group!). Dequeue 5, enqueue 8. `pq = [8, 10, 10]`.
- Final `pq.size()` is 3. Output: `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting the `n` intervals takes `O(n log n)`. Each of the `n` intervals performs at most one `enqueue` and one `dequeue` on the min-heap of size at most `n`, taking `O(log n)` per operation.
- **Space Complexity:** `O(n)` — Required for the priority queue storing at most `n` end times.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2406divide-intervals-into-minimum-number-of-groups.js](./2406divide-intervals-into-minimum-number-of-groups.js) |

---

## Key Learnings

- Min-heap greedy interval scheduling optimally solves group partitioning and peak concurrency problems.
- Boundary condition awareness: since intervals are inclusive, reuse requires `end < start`, NOT `end <= start`.
- Interval partitioning duality: minimum groups needed equals maximum simultaneous overlap.
