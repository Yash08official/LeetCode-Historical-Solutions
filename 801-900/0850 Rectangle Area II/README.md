---
comments: true
difficulty: Hard
tags:
  - Array
  - Segment Tree
  - Sweep Line
  - Ordered Set
---

# 850. Rectangle Area II

**[View Problem on LeetCode](https://leetcode.com/problems/rectangle-area-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0850` (`850`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Segment Tree`, `Sweep Line`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 2D array of axis-aligned `rectangles`. Each `rectangle[i] = [x1, y1, x2, y2]` denotes the `i`-th rectangle where `(x1, y1)` are the coordinates of the bottom-left corner, and `(x2, y2)` are the coordinates of the top-right corner.

Calculate the total area covered by all `rectangles` in the plane. Any area covered by two or more rectangles should only be counted once.

Return the total area modulo $10^9 + 7$.

---

## Problem Understanding & Sweep Line Algorithm

- Directly unioning 2D geometric regions is complex due to overlaps.
- Using a vertical **Sweep-Line** from left to right along the x-axis:
  - Each rectangle creates two vertical events: enter at $x_1$ with weight $+1$, and exit at $x_2$ with weight $-1$.
  - Between adjacent vertical event lines at $x_{i-1}$ and $x_i$, the width of the slice is $(x_i - x_{i-1})$.
  - The slice area is simply $(x_i - x_{i-1}) 	imes 	ext{active vertical length}$.
- The active vertical length can be tracked efficiently using coordinate compression and a **Segment Tree**.

---

## Approach

### Sweep Line + Coordinate Compression + Segment Tree

1. **Event Generation:**
   - For each rectangle $[x_1, y_1, x_2, y_2]$, generate two vertical segments: $[x_1, y_1, y_2, +1]$ and $[x_2, y_1, y_2, -1]$.
   - Collect all unique $y$-coordinates in a sorted set `ts` for coordinate compression.
2. **Sort Events:** Sort all vertical segment events by their $x$-coordinate.
3. **Segment Tree Construction:**
   - Map each unique $y$-coordinate to a compressed index.
   - Build a segment tree over elementary intervals $[nums[i], nums[i+1]]$.
   - Each node tracks coverage count `cnt` and active covered length `length`.
4. **Sweep:**
   - Iterate through sorted vertical segments.
   - For step $i > 0$, accumulate $(x_i - x_{i-1}) 	imes tree.query()$ into `ans`.
   - Update the segment tree for range $[m[y_1], m[y_2] - 1]$ with delta $k \in \{+1, -1\}$.
5. Return $ans \pmod{10^9 + 7}$.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ where $N$ is the number of rectangles — sorting $2N$ events and performing $2N$ segment tree modifications of depth $O(\log N)$.
- **Space Complexity:** $O(N)$ for the segment tree and coordinate mapping structures.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [850rectangle-area-ii.java](./850rectangle-area-ii.java) |

---

## Key Learnings

- Sweep-line reduces a 2D area problem to a sequence of 1D dynamic interval stabbing queries.
- Coordinate compression allows Segment Trees to handle large continuous coordinate ranges ($10^9$) within $O(N)$ space.
