---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Sorting
---

# 436. Find Right Interval

**[View Problem on LeetCode](https://leetcode.com/problems/find-right-interval/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0436` (`436`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of `intervals`, where `intervals[i] = [starti, endi]` and each `starti` is **unique**.

The **right interval** for an interval `i` is an interval `j` such that `startj >= endi` and `startj` is **minimized**. Note that `i` may equal `j`.

Return *an array of **right interval** indices for each interval `i`*. If no **right interval** exists for interval `i`, then put `-1` at index `i`.

---

## Examples

### Example 1

```
Input: intervals = [[1,2]]
Output: [-1]
Explanation: There is only one interval in the collection, so it outputs -1.
```

### Example 2

```
Input: intervals = [[3,4],[2,3],[1,2]]
Output: [-1,0,1]
Explanation: There is no right interval for [3,4].
The right interval for [2,3] is [3,4] since start0 = 3 is the smallest start that is >= end1 = 3.
The right interval for [1,2] is [2,3] since start1 = 2 is the smallest start that is >= end2 = 2.
```

### Example 3

```
Input: intervals = [[1,4],[2,3],[3,4]]
Output: [-1,2,-1]
Explanation: There is no right interval for [1,4] and [3,4].
The right interval for [2,3] is [3,4] since start2 = 3 is the smallest start that is >= end1 = 3.
```

 

**

---

## Constraints

**

	- `1 <= intervals.length <= 2 * 10^4`

	- `intervals[i].length == 2`

	- `-10^6 <= starti <= endi <= 10^6`

	- The start point of each interval is **unique**.

---

## Problem Understanding

- For each interval `i = [start_i, end_i]` (with unique `start_i`), find the index `j` of the interval with the smallest `start_j >= end_i`, or `-1` if none exists.

---

## Approach

### Optimized Approach (Sort Start Times + Binary Search)
1. Pair each interval's start value with its original index `[start_i, i]` and sort the pairs ascending by `start_i`.
2. For each interval `i`, binary search (`search`) for the leftmost index `j` in the sorted array whose start is `>= intervals[i][1]`.
3. Store `arr[j][1]` if `j < n`, otherwise `-1`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — sorting takes $O(n \log n)$ and $n$ binary searches take $O(n \log n)$.
- **Space Complexity:** $O(n)$ for the `[start, originalIndex]` array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [436find-right-interval.java](./436find-right-interval.java) |

---

## Key Learnings

- Preserving original indices alongside sorted keys allows lower-bound binary search to answer per-element queries without losing index mapping.
