---
comments: true
difficulty: Hard
tags:
  - Array
  - Greedy
  - Sorting
---

# 757. Set Intersection Size At Least Two

**[View Problem on LeetCode](https://leetcode.com/problems/set-intersection-size-at-least-two/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0757` (`757`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 2D integer array intervals where intervals[i] = [starti, endi] represents all the integers from starti to endi inclusively.

A containing set is an array nums where each interval from intervals has at least two integers in nums.


	For example, if intervals = [[1,3], [3,7], [8,9]], then [1,2,4,7,8,9] and [2,3,4,8,9] are containing sets.


Return the minimum possible size of a containing set.

 
Example 1:


Input: intervals = [[1,3],[3,7],[8,9]]
Output: 5
Explanation: let nums = [2, 3, 4, 8, 9].
It can be shown that there cannot be any containing array of size 4.


Example 2:


Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
Output: 3
Explanation: let nums = [2, 3, 4].
It can be shown that there cannot be any containing array of size 2.


Example 3:


Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
Output: 5
Explanation: let nums = [1, 2, 3, 4, 5].
It can be shown that there cannot be any containing array of size 4.


 
Constraints:


	1 <= intervals.length <= 3000
	intervals[i].length == 2
	0 <= starti < endi <= 108

---

## Problem Understanding

- We need to choose a minimum size set $S$ such that every interval $[a, b]$ contains at least two elements from $S$.
- Greedily placing elements at the far right end of each interval gives maximum opportunity to intersect future intervals.

---

## Approach

### Optimized Approach (Greedy Interval Sorting)

1. Sort intervals by right endpoint $b$ ascending; if right endpoints are equal, sort left endpoint $a$ descending.
2. Maintain the two largest selected points $s$ (second largest) and $e$ (largest), initialized to $-1$.
3. For each interval $[a, b]$:
   - If $a \le s$: the interval already contains both $s$ and $e$ (at least 2 points). Do nothing.
   - If $a > e$: the interval contains neither $s$ nor $e$. We must add 2 points: greedily choose $b - 1$ and $b$. Update `ans += 2`, $s = b - 1$, $e = b$.
   - Else ($s < a \le e$): the interval contains $e$ but not $s$ (only 1 point). We must add 1 point: choose $b$. Update `ans += 1`, $s = e$, $e = b$.
4. Return `ans`.

---

## Dry Run

Intervals: `[[1,3], [1,4], [2,5], [3,5]]`:
- `[1, 3]`: add 2 points -> {2, 3}. `s = 2, e = 3`.
- `[1, 4]`: $1 \le 2$ -> already contains {2, 3}.
- `[2, 5]`: $2 \le 2$ -> already contains {2, 3}.
- `[3, 5]`: $s < 3 \le e$ -> contains 3, add 5. `s = 3, e = 5`.
Result: 3 points {2, 3, 5}.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ — Sorting $N$ intervals dominates runtime.
- **Space Complexity:** $O(1)$ auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [757set-intersection-size-at-least-two.java](./757set-intersection-size-at-least-two.java) |

---

## Key Learnings

- Sorting intervals by end time ascending and tie-breaking by start time descending guarantees greedy choices at interval tails never violate earlier constraints.
