---
comments: true
difficulty: Medium
tags:
  - Array
  - Sorting
---

# 3169. Count Days Without Meetings

**[View Problem on LeetCode](https://leetcode.com/problems/count-days-without-meetings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3169` (`3169`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

An employee is available for work on days numbered from `1` to `days` (inclusive). We are given a 2D integer array `meetings` where `meetings[i] = [start_i, end_i]` represents the start and end days of a scheduled meeting (both inclusive). Meetings may overlap.

We must calculate the total number of days within the range `[1, days]` on which the employee has no meetings scheduled.

---

## Examples

### Example 1

**Input:** `days = 10, meetings = [[5,7],[1,3],[9,10]]`

**Output:** `2`

**Explanation:**

There is no meeting scheduled on the 4^th and 8^th days.

### Example 2

**Input:** `days = 5, meetings = [[2,4],[1,3]]`

**Output:** `1`

**Explanation:**

There is no meeting scheduled on the 5^thday.

### Example 3

**Input:** `days = 6, meetings = [[1,6]]`

**Output:** 0

**Explanation:**

Meetings are scheduled for all working days.

---

## Constraints

- `1 <= days <= 10^9`

- `1 <= meetings.length <= 10^5`

- `meetings[i].length == 2`

- `1 <= meetings[i][0] <= meetings[i][1] <= days`

---

## Problem Understanding

Key interval geometry and constraints:
- `days` can be up to `10^9`, so we CANNOT create a boolean array of days or iterate day-by-day.
- The number of meetings `m` is at most `10^5`.
- The problem asks for the complement of the union of intervals `[start_i, end_i]` within the universe `[1, days]`.
- If we sort the meeting intervals by start day, we can merge overlapping and adjacent intervals on the fly.
- Any gap between the end of the previous meeting (`last`) and the start of the next meeting (`st`) represents days without meetings: specifically, `st - last - 1` free days whenever `st > last + 1`.
- Any remaining days between the last meeting's end and `days` (`days - last`) are also free.

---

## Approach

### Brute Force Approach

Using a boolean array or hash set to mark individual days from each meeting interval takes `O(sum(end_i - start_i + 1))` time and memory, which fails completely when intervals span up to `10^9` days.

### Optimized Approach

We sort `meetings` in ascending order of start day: `Arrays.sort(meetings, (a, b) -> a[0] - b[0])`.
- We maintain `last = 0` (the furthest day covered by any meeting so far) and `ans = 0` (accumulated free days).
- For each meeting interval `[st, ed]`:
  - If `last < st`, there is a gap between `last` and `st`. The count of free days in this gap is `st - last - 1`. We add this to `ans`.
  - We update `last = Math.max(last, ed)`.
- After processing all meetings, any remaining days from `last + 1` up to `days` are free, so we add `days - last` to `ans`.
- We return `ans`.

### Step-by-Step Thinking Process

1. We need the number of uncovered days in `[1, days]`.
2. `days <= 10^9` implies we must work directly with interval endpoints.
3. Sorting intervals by start day allows linear sweeping.
4. Maintain `last`: the highest day index currently covered by prior meetings.
5. For each meeting `[st, ed]`: if `st > last`, days `last + 1` through `st - 1` have no meetings. Count = `st - last - 1`.
6. Update `last = max(last, ed)` to account for overlapping or extending meetings.
7. After all meetings, days `last + 1` to `days` are also free, contributing `days - last`.

### Algorithm / Intuition

The sweep-line interval accumulation works as follows:
1. Sort `meetings` ascending by `a[0]` using a comparator.
2. Initialize `int ans = 0`, `last = 0`.
3. For each interval `e` in `meetings`:
   - Let `st = e[0]`, `ed = e[1]`.
   - If `last < st`, accumulate gap: `ans += st - last - 1`.
   - Update coverage horizon: `last = Math.max(last, ed)`.
4. Account for trailing free days after the last meeting: `ans += days - last`.
5. Return `ans`.

---

## Dry Run

Trace on Example 1: `days = 10, meetings = [[5,7],[1,3],[9,10]]`

- Sort meetings by start day: `[[1, 3], [5, 7], [9, 10]]`.
- Initialize `ans = 0, last = 0`.
- Meeting 1: `[st = 1, ed = 3]`:
  - `last < st` (`0 < 1`) -> `ans += 1 - 0 - 1 = 0`.
  - `last = max(0, 3) = 3`.
- Meeting 2: `[st = 5, ed = 7]`:
  - `last < st` (`3 < 5`) -> gap exists! `ans += 5 - 3 - 1 = 1` (day 4 is free, `ans = 1`).
  - `last = max(3, 7) = 7`.
- Meeting 3: `[st = 9, ed = 10]`:
  - `last < st` (`7 < 9`) -> gap exists! `ans += 9 - 7 - 1 = 1` (day 8 is free, `ans = 2`).
  - `last = max(7, 10) = 10`.
- After loop:
  - Trailing days: `ans += days - last = 10 - 10 = 0`.
- Final `ans = 2` (days 4 and 8 are free), matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(m log m) — Where m = meetings.length. Sorting the meeting intervals takes O(m log m) time, followed by a single linear pass of O(m) to accumulate gaps.
- **Space Complexity:** O(log m) auxiliary space — Sorting meetings in-place requires logarithmic stack space for the sorting algorithm.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3169count-days-without-meetings.java](./3169count-days-without-meetings.java) |

---

## Key Learnings

- Interval gap accumulation `st - last - 1` computes complementary free periods without constructing explicit interval merges.
- Sorting by start time and maintaining a high-water mark (`last = Math.max(last, ed)`) handles nested and overlapping intervals naturally.
- Working with interval boundaries rather than discrete days is essential for scales where `days = 10^9`.
