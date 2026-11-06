---
comments: true
difficulty: Hard
tags:
  - Array
  - Greedy
  - Sorting
  - Heap (Priority Queue)
---

# 630. Course Schedule III

**[View Problem on LeetCode](https://leetcode.com/problems/course-schedule-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0630` (`630`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

There are `n` different online courses numbered from `1` to `n`. You are given an array `courses` where `courses[i] = [duration_i, lastDay_i]` indicate that the $i^{	ext{th}}$ course should be taken continuously for `duration_i` days and must be finished before or on `lastDay_i`.

You will start on the $1^{	ext{st}}$ day and you cannot take two or more courses simultaneously.

Return the maximum number of courses that you can take.

---

## Examples

### Example 1

```text
Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
Output: 3
Explanation:
There are totally 4 courses, but you can take 3 courses at most:
First, take the 1st course, it costs 100 days so you will finish it on the 100th day, and ready to take the next course on the 101st day.
Second, take the 3rd course, it costs 1000 days so you will finish it on the 1100th day, and ready to take the next course on the 1101st day.
Third, take the 2nd course, it costs 200 days so you will finish it on the 1300th day.
The 4th course cannot be taken because it costs 2000 days and will be finished on the 3100th day, which exceeds the closed day 3200th day.
```

### Example 2

```text
Input: courses = [[1,2]]
Output: 1
```

### Example 3

```text
Input: courses = [[3,2],[4,3]]
Output: 0
```

---

## Constraints

- `1 <= courses.length <= 10^4`
- `1 <= duration_i, lastDay_i <= 10^4`

---

## Problem Understanding

- We want to maximize the count of completed courses without exceeding individual deadlines.
- If we consider courses in increasing order of their deadlines `lastDay`, it is always optimal to tackle earlier-deadline courses first.
- If at any point the cumulative time exceeds the deadline of the current course, we should greedily drop the course with the largest duration seen so far to free up the most time for future courses.

---

## Approach

### Optimized Approach (Greedy + Max-Heap)

1. Sort all courses in ascending order of `lastDay`: `Arrays.sort(courses, (a, b) -> a[1] - b[1])`.
2. Initialize a max-heap (priority queue) to track the durations of courses currently taken, and a variable `s = 0` for the total accumulated time.
3. For each course `[duration, lastDay]`:
   - Add `duration` to `s` and push `duration` into the max-heap.
   - If `s > lastDay`:
     - Pop the largest duration from the heap and subtract it from `s`.
4. At the end of the iteration, the size of the max-heap represents the maximum number of courses that can be completed.

### Step-by-Step Thinking Process

1. Sorting by `lastDay` ensures that any time freed by replacing a previously taken course with a shorter or equal one does not violate the deadlines of other accepted courses.
2. Evicting the largest duration whenever an infeasibility occurs preserves the maximum possible future slack while maintaining the count.

### Algorithm / Intuition

Replacing a previously scheduled long course with a shorter course never increases total time, thereby monotonically improving schedule feasibility.

---

## Dry Run

Tracing `courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]`:
1. Sorted order:
   - `[100, 200]`: `s = 100 <= 200`, heap = `[100]`
   - `[1000, 1250]`: `s = 1100 <= 1250`, heap = `[1000, 100]`
   - `[200, 1300]`: `s = 1300 <= 1300`, heap = `[1000, 200, 100]`
   - `[2000, 3200]`: `s = 3300 > 3200` $ightarrow$ pop `2000` $ightarrow$ `s = 1300`, heap = `[1000, 200, 100]`
2. Final heap size = 3.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ — Sorting the array of $N$ courses takes $O(N \log N)$, and each of the $N$ courses performs at most one heap push and one heap pop in $O(\log N)$.
- **Space Complexity:** $O(N)$ — The priority queue stores at most $N$ course durations.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [630course-schedule-iii.java](./630course-schedule-iii.java) |

---

## Key Learnings

- Deadline scheduling problems often combine sorting by deadline with greedy replacement via a priority queue.
- Evicting the worst bottleneck (largest duration) maximizes slack for subsequent constraints.
