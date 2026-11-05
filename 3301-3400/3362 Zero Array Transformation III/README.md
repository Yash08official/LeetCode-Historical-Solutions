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

# 3362. Zero Array Transformation III

**[View Problem on LeetCode](https://leetcode.com/problems/zero-array-transformation-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3362` (`3362`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Greedy`, `Sorting`, `Heap (Priority Queue)`, `Prefix Sum` |
| **Solution Language** | Python 3 |

---

## Problem Description

You are given an integer array `nums` of length `n` and a 2D integer array `queries`, where each `queries[i] = [l_i, r_i]`.

Each query allows you to choose any subset of indices in `nums[l_i..r_i]` and decrement each chosen element by at most 1.

You want to find the **maximum** number of queries that can be removed such that the remaining queries can still convert `nums` into a zero array.

If it is impossible to transform `nums` into a zero array even when using all original queries, return `-1`.

---

## Examples

### Example 1

**Input:** `nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]`

**Output:** `1`

**Explanation:**

After removing `queries[2]`, `nums` can still be converted to a zero array.

- Using `queries[0]`, decrement `nums[0]` and `nums[2]` by 1 and `nums[1]` by 0.

- Using `queries[1]`, decrement `nums[0]` and `nums[2]` by 1 and `nums[1]` by 0.

### Example 2

**Input:** `nums = [1,1,1,1], queries = [[1,3],[0,2],[1,3],[1,2]]`

**Output:** `2`

**Explanation:**

We can remove `queries[2]` and `queries[3]`.

### Example 3

**Input:** `nums = [1,2,3,4], queries = [[0,3]]`

**Output:** `-1`

**Explanation:**

`nums` cannot be converted to a zero array even after using all the queries.

---

## Constraints

- `1 <= nums.length <= 10^5`

- `0 <= nums[i] <= 10^5`

- `1 <= queries.length <= 10^5`

- `queries[i].length == 2`

- `0 <= l_i <= r_i < nums.length`

---

## Problem Understanding

- **Coverage Surplus (Allowed Slacks):** With all queries applied, let `current[i]` be the total number of queries covering index `i`. To successfully zero `nums[i]`, we need `current[i] >= nums[i]`. The slack at index `i` is `allowed[i] = current[i] - nums[i]`.
- **Feasibility Check:** If any `allowed[i] < 0`, even keeping every query cannot zero `nums[i]`, so we must return `-1`.
- **Query Removal Condition:** Removing a query `[l, r]` decreases the available slack of all indices in `[l, r]` by 1. Therefore, a query `[l, r]` can be safely removed if and only if the minimum slack across all indices in `[l, r]` is at least 1 (`min_{i \in [l, r]} allowed[i] >= 1`).
- **Segment Tree with Lazy Propagation:** We can maintain range minimum queries and range decrements over the `allowed` array using a segment tree.

---

## Approach

### Brute Force Approach

Checking all `2^m` subsets of queries to find the maximum removable subset takes exponential time. Even testing query removals greedily without a segment tree requires scanning and decrementing `O(n)` elements per query, leading to `O(m * n)` time. With `n, m <= 10^5`, `O(m * n)` reaches `10^{10}` operations, causing Time Limit Exceeded.

### Optimized Approach

First, compute total coverage using a difference array `prefix`. Compute `allowed[i] = current - nums[i]`; if any `allowed[i] < 0`, return `-1`. Sort queries by interval length `q[1] - q[0] + 1` (removing shorter queries first preserves slack for longer spans). Build a `SegmentTree` over `allowed` supporting range minimum queries (`query_min`) and lazy range decrements (`decrement_range`). Iterate through sorted queries: if `seg.query_min(1, 0, n - 1, l, r) >= 1`, we remove this query, apply `seg.decrement_range(1, 0, n - 1, l, r)`, and increment `cnt`. Finally, return `cnt`.

### Step-by-Step Thinking Process

1. Calculate total coverage of all queries using a prefix difference array.
2. Calculate available slack for each index: `allowed[i] = total_coverage[i] - nums[i]`. If any `allowed[i] < 0`, return `-1`.
3. Each query removal reduces the slack in `[l, r]` by 1.
4. To maximize removals, sort queries by length ascending `(q[1] - q[0] + 1)` so that removing narrower queries leaves maximum slack for wider ones.
5. Implement a Segment Tree with lazy propagation supporting range minimum query (`query_min`) and range subtraction (`decrement_range`).
6. For each query `[l, r]`, query the range minimum: if `>= 1`, decrement `[l, r]` by 1 and count it as removed.
7. Return total removed count `cnt`.

### Algorithm / Intuition

In `Solution.maxRemoval`: we compute `allowed[i]` using the difference array `prefix`. If any `allowed[i] < 0`, `-1` is immediately returned. We sort `queries` into `sq` by length `q[1] - q[0] + 1` and starting position. A `SegmentTree` `seg` is initialized with `allowed` values. For each interval `[l, r]` in `sq`, `seg.query_min(1, 0, n - 1, l, r)` returns the minimum slack in that window. If `mn >= 1`, all positions in the window have at least 1 spare query covering them, so this query is expendable: `seg.decrement_range(1, 0, n - 1, l, r)` reduces the slack across `[l, r]` by 1, and `cnt` is incremented. The segment tree efficiently handles each query in `O(log n)` time.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [2, 0, 2]`, `queries = [[0,2],[0,2],[1,1]]`, `n = 3`

- **Coverage Calculation:**
  - Query `[0, 2]`, `[0, 2]`, `[1, 1]`.
  - Coverage: index 0 covered by 2 queries, index 1 by 3 queries, index 2 by 2 queries.
  - `allowed = [2 - 2, 3 - 0, 2 - 2] = [0, 3, 0]`.
  - All `allowed[i] >= 0`, so conversion is possible.

- **Sort Queries by Length:**
  - `[1, 1]` has length 1.
  - `[0, 2]` has length 3.
  - `[0, 2]` has length 3.
  - `sq = [[1, 1], [0, 2], [0, 2]]`.

- **Segment Tree Queries:**
  - For query `[1, 1]`: `query_min(1, 1)` on `allowed` yields `allowed[1] = 3 >= 1`.
    - Safe to remove! `seg.decrement_range(1, 1)` updates `allowed[1]` to `2`. `cnt = 1`.
  - For first query `[0, 2]`: `query_min(0, 2)` yields `min(0, 2, 0) = 0 < 1`. Cannot remove.
  - For second query `[0, 2]`: `query_min(0, 2)` yields `0 < 1`. Cannot remove.

- **Result:** Return `cnt = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O(m log m + m log n)` — Sorting `m` queries takes `O(m log m)`. Building the segment tree takes `O(n)`, and each of the `m` range queries and updates takes `O(log n)`.
- **Space Complexity:** `O(n)` — The segment tree and lazy arrays require `4 * n` space, plus `O(n)` for the `allowed` array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Python 3** | [3362zero-array-transformation-iii.py](./3362zero-array-transformation-iii.py) |

---

## Key Learnings

- Invert maximum removal problems by calculating surplus slack (`allowed = total_coverage - requirement`) and checking if removing an operation keeps slack non-negative.
- Segment Trees with lazy propagation enable efficient dynamic range-minimum checks and range subtractions in `O(log n)` time.
