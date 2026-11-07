---
comments: true
difficulty: Medium
tags:
  - Array
  - Sorting
  - Quicksort
---

# 56. Merge Intervals

**[View Problem on LeetCode](https://leetcode.com/problems/merge-intervals/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0056` (`56`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Sorting`, `Quicksort` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.

---

## Examples

### Example 1

```text
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

### Example 2

```text
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

---

## Constraints

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

---

## Problem Understanding

- Two intervals $[s_1, e_1]$ and $[s_2, e_2]$ (with $s_1 \le s_2$) overlap if and only if $s_2 \le e_1$.
- Sorting intervals by start time ensures all potential overlapping candidates are contiguous.

---

## Approach

### Optimized Approach (Sort and Linear Merge)

1. Sort intervals by start time: `Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]))`.
2. Initialize active interval `[st, ed] = [intervals[0][0], intervals[0][1]]`.
3. Iterate through subsequent intervals:
   - If next start `s > ed`, no overlap occurs: append `[st, ed]` to result and update `[st, ed] = [s, e]`.
   - Else (`s <= ed`), overlap detected: extend end `ed = Math.max(ed, e)`.
4. Append the final interval `[st, ed]` to result.
5. Return result as 2D array.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ — Dominated by sorting $N$ intervals. The subsequent merge pass is $O(N)$.
- **Space Complexity:** $O(N)$ — Output array storing merged intervals.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [56merge-intervals.java](./56merge-intervals.java) |

---

## Key Learnings

- Sorting by interval start points reduces arbitrary multi-way overlaps to consecutive pairwise comparisons.
- `Math.max(ed, e)` properly handles cases where one interval completely contains another.
