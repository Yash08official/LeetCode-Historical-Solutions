---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Dynamic Programming
  - Sorting
  - Heap (Priority Queue)
---

# 2054. Two Best Non-Overlapping Events

**[View Problem on LeetCode](https://leetcode.com/problems/two-best-non-overlapping-events/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2054` (`2054`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Dynamic Programming`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** 2D array `events`, where `events[i] = [startTime_i, endTime_i, value_i]`. Endpoints are **inclusive**: if you attend an event ending at time `t`, any subsequent event you attend must start strictly after `t` (i.e., `startTime >= t + 1`).

You may attend **at most two** non-overlapping events (`1` event alone or `2` compatible events). Return the **maximum possible sum of values** you can earn.

---

## Examples

### Example 1

```text
Input: events = [[1,3,2],[4,5,2],[2,4,3]]
Output: 4
Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.
```

### Example 2

```text
Input: events = [[1,3,2],[4,5,2],[1,5,5]]
Output: 5
Explanation: Choose event 2 for a sum of 5.
```

### Example 3

```text
Input: events = [[1,5,3],[1,5,1],[6,6,5]]
Output: 8
Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.
```

---

## Constraints

- `2 <= events.length <= 10^5`

- `events[i].length == 3`

- `1 <= startTime_i <= endTime_i <= 10^9`

- `1 <= value_i <= 10^6`

---

## Problem Understanding

- Attending **only one** event is explicitly allowed (`at most two`), which matters when a single long high-value event beats any compatible pair (see Example 2).
- Because endpoints are inclusive, two events `e` and `next` do not overlap (assuming `e` comes first) **if and only if** `next.startTime > e.endTime`.
- If `events` is sorted by `startTime`, then for any chosen first event `e`, **all** valid second events form a **contiguous suffix** `events[left .. n - 1]` starting at the first index `left` where `events[left][0] > e[1]`!

---

## Approach

### Brute Force Approach

Checking every single event (`O(n)`) and every pair of events `(i, j)` for non-overlap (`events[i][1] < events[j][0] || events[j][1] < events[i][0]`) takes `O(n^2)` time. For `n = 10^5`, `10^10` pair comparisons exceed the time limit.

### Optimized Approach

Sort `events` ascending by `startTime`, precompute a **suffix maximum array** `f` where `f[i]` stores the largest `value` among `events[i .. n - 1]`, and for each event `e` use **binary search** (upper bound on `e[1]`) to find the earliest compatible second event index `left` and maximize `e[2] + f[left]`.

### Step-by-Step Thinking Process

1. Sort `events` by `startTime` (`Arrays.sort(events, (a, b) -> a[0] - b[0])`; safe from overflow since `1 <= startTime <= 10^9`).
2. Allocate `int[] f = new int[n + 1]` (`f[n] = 0`) and fill right-to-left: `f[i] = Math.max(f[i + 1], events[i][2])`, so `f[left]` answers 'what is the best single event in `events[left .. n - 1]`?' in `O(1)` time.
3. For each event `e`, start with single-event score `v = e[2]`.
4. Binary search `left = 0, right = n` for the smallest index `left` satisfying `events[mid][0] > e[1]`.
5. If `left < n`, add the best compatible second event `v += f[left]`, and update `ans = Math.max(ans, v)` (since `value_i >= 1`, adding `f[left]` always improves `v` when a second event exists; if `left == n`, `v` stays `e[2]`, covering the 1-event case!).

### Algorithm / Intuition

In `maxTwoEvents`, sorting by `startTime` aligns compatibility with array indices: every event at or after the binary-search boundary `left` starts strictly after `e[1]` (`events[idx][0] >= events[left][0] > e[1]`), so **every** event in `events[left .. n - 1]` can legally follow `e`! Precomputing the suffix maximum `f[left]` lets us pick the highest-valued partner in `O(1)` once `left` is found via `O(log n)` binary search (`mid = (left + right) >> 1`). Meanwhile, maximum sum `<= 2 * 10^6`, fitting easily in 32-bit `int`.

---

## Dry Run

Tracing Example 1: `events = [[1,3,2],[4,5,2],[2,4,3]]` (`n = 3`):

1. **Sort by `startTime`:** `events = [[1, 3, 2], [2, 4, 3], [4, 5, 2]]`.
2. **Suffix max `f`:** `f[3] = 0`, `f[2] = 2`, `f[1] = max(2, 3) = 3`, `f[0] = max(3, 2) = 3` -> `f = [3, 3, 2, 0]`.
3. **Evaluate each first event `e`:**

| Event `e` | First `left` with `start > e[1]` | `left < 3`? | Candidate `v` | `ans` |
| :--- | :--- | :--- | :--- | :--- |
| `[1, 3, 2]` | `e[1] = 3` -> `left = 2` (`events[2][0] = 4 > 3`) | Yes (`f[2] = 2`) | `2 + 2 = 4` | `4` |
| `[2, 4, 3]` | `e[1] = 4` -> `left = 3` (none have `start > 4`) | No | `3` | `4` |
| `[4, 5, 2]` | `e[1] = 5` -> `left = 3` (none have `start > 5`) | No | `2` | `4` |

Returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting `n` events takes `O(n log n)`, building suffix array `f` takes `O(n)`, and running `n` binary searches takes `O(n log n)`.
- **Space Complexity:** `O(n)` — The suffix maximum array `f` uses `n + 1` integers (plus `O(log n)` to `O(n)` auxiliary sort space).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2054two-best-non-overlapping-events.java](./2054two-best-non-overlapping-events.java) |

---

## Key Learnings

- **Sort + Suffix Max + Binary Search** is a foundational pattern whenever you need to pair each interval `i` with the single best non-overlapping interval after `i`.
- Pay close attention to inclusive vs exclusive interval endpoints: inclusive `[start, end]` requires strict inequality `events[mid][0] > e[1]` in binary search!
