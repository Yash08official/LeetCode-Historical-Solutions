---
comments: true
difficulty: Medium
tags:
  - Array
---

# 57. Insert Interval

**[View Problem on LeetCode](https://leetcode.com/problems/insert-interval/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0057` (`57`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` represent the start and the end of the `i-th` interval and `intervals` is sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Two intervals are considered overlapping if they share **at least** one point.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` *after the insertion*.

**Note** that you do not need to modify `intervals` in-place. You can make a new array and return it.

---

## Examples

### Example 1

```text
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Explanation: Because the new interval [2,5] overlaps with [1,3], they are merged into [1,5].
```

### Example 2

```text
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10], they merge into [3,10].
```

---

## Constraints

- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^5`
- `intervals` is sorted by `start_i` in **ascending** order.
- `newInterval.length == 2`
- `0 <= start <= end <= 10^5`

---

## Problem Understanding

- The original list `intervals` contains mutually disjoint, sorted intervals.
- Adding `newInterval` may:
  1. Lie completely before all existing intervals with no overlap.
  2. Lie completely after all existing intervals with no overlap.
  3. Fit cleanly between two intervals without overlap.
  4. Overlap with one or more consecutive intervals, merging them into a single larger interval $[\min(\text{starts}), \max(\text{ends})]$.
- When `intervals` is empty, the result is simply `[newInterval]`.

---

## Approach

### Brute Force Approach

Iterating and searching for the exact start and end insertion indices, splicing elements into the array, and then performing in-place shifts or array copies requires handling multiple corner cases (e.g. insertions at boundaries, partial vs. complete overlaps).

### Optimized Approach (Append & Merge)

Rather than maintaining custom insertion index pointers, leverage the general **Merge Intervals** paradigm:
1. Create an augmented array `newIntervals` of size `intervals.length + 1`.
2. Copy all original intervals from `intervals` into `newIntervals`, and append `newInterval` at the final slot `newIntervals[intervals.length]`.
3. Pass `newIntervals` to a helper function `merge(int[][] intervals)`:
   - Sort the array by start time: `Arrays.sort(intervals, (a, b) -> a[0] - b[0])`.
   - Maintain a dynamic list `ans` initialized with the first interval `intervals[0]`.
   - Iterate through the remaining intervals from index `1` to `intervals.length - 1`:
     - If the current interval's start `s` is strictly greater than the previous interval's end (`ans.get(ans.size() - 1)[1] < s`), there is no overlap: append `intervals[i]` to `ans`.
     - Otherwise, the intervals overlap: merge them by updating the previous interval's end to `Math.max(previous_end, e)`.
4. Convert `ans` to a 2D integer array and return.

### Step-by-Step Thinking Process

1. Append `newInterval` directly to the existing intervals list.
2. Sort all intervals based on their start coordinates `a[0] - b[0]`.
3. Initialize the merged result list with the first interval `intervals[0]`.
4. For each subsequent interval `[s, e]`:
   - If `last_merged.end < s`: No collision exists; add `[s, e]` as a new disjoint interval.
   - If `last_merged.end >= s`: Intervals collide; extend `last_merged.end = Math.max(last_merged.end, e)`.
5. Return the merged array.

### Algorithm / Intuition

By augmenting the array and sorting, the problem reduces directly to the classic interval merge pattern. Any overlaps introduced by `newInterval` become adjacent in the sorted order and are resolved in a single linear pass.

---

## Dry Run

Tracing **Example 1**: `intervals = [[1, 3], [6, 9]]`, `newInterval = [2, 5]`.
1. **Augment array:** `newIntervals = [[1, 3], [6, 9], [2, 5]]`.
2. **Sort by start time:** `[[1, 3], [2, 5], [6, 9]]`.
3. **Initialize:** `ans = [[1, 3]]`.
4. **Iteration 1 (`i = 1`, interval `[2, 5]`):**
   - Previous end = `3`, current start `s = 2`.
   - Since `3 >= 2` (overlap), update previous end: `max(3, 5) = 5`.
   - `ans = [[1, 5]]`.
5. **Iteration 2 (`i = 2`, interval `[6, 9]`):**
   - Previous end = `5`, current start `s = 6`.
   - Since `5 < 6` (no overlap), append `[6, 9]` to `ans`.
   - `ans = [[1, 5], [6, 9]]`.
6. **Result:** `[[1, 5], [6, 9]]`. Matches Example 1 output.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — Where $n$ is the number of intervals. Sorting $n + 1$ intervals dominates the linear $O(n)$ merge pass.
- **Space Complexity:** $O(n)$ — Auxiliary memory required for `newIntervals` and the output list `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [57insert-interval.java](./57insert-interval.java) |

---

## Key Learnings

- Reusing the general interval merging template simplifies code logic and avoids delicate index-tracking boundary conditions.
- When an array is already sorted except for one newly appended element, linear-time merging without full sorting ($O(n)$) is an alternative optimization, but sorting-based merging provides robust and readable code.
- Always handle the single-interval base case by initializing the merged list with the first sorted element.
