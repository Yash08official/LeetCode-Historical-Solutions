---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
---

# 4001. Aggregate Two Time Series

**[View Problem on LeetCode](https://leetcode.com/problems/aggregate-two-time-series/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4001` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

You are given two sorted 2D integer arrays `series1` and `series2` representing time series data, where `series1[i] = [time_i, value_i]` and `series2[j] = [time_j, value_j]`.

Aggregate the two time series by combining readings across time points using two pointers.

---

## Problem Understanding

- Both input time series are sorted chronologically by timestamp.
- We need to merge them in sorted order:
  - If timestamps match ($t_1 == t_2$), sum the values and advance both pointers.
  - If one timestamp is smaller, process the smaller timestamp and advance its pointer.
  - Flush any remaining elements from either time series.

---

## Approach

### Two Pointers Merge

1. Initialize pointers $i = 0$ for `series1` and $j = 0$ for `series2`.
2. While both pointers are within bounds:
   - If $t_1 == t_2$: record $[t_1, v_1 + v_2]$, advance $i$ and $j$.
   - If $t_1 < t_2$: record $[t_1, v_1 + v_2]$, advance $i$.
   - If $t_2 < t_1$: record $[t_2, v_1 + v_2]$, advance $j$.
3. Flush remaining items from `series1` and `series2`.
4. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(M + N)$ — Linear scan merging two sorted lists.
- **Space Complexity:** $O(1)$ auxiliary space excluding output list.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4001aggregate-two-time-series.java](./4001aggregate-two-time-series.java) |

---

## Key Learnings

- Two-pointer merge generalizes Merge Sort to handle timestamp-aligned aggregations.
