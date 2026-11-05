---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Design
  - Segment Tree
  - Ordered Set
---

# 729. My Calendar I

**[View Problem on LeetCode](https://leetcode.com/problems/my-calendar-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0729` (`729`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Design`, `Segment Tree`, `Ordered Set` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design a `MyCalendar` class that manages event bookings without allowing **double bookings**.

Each event is specified as a half-open interval `[startTime, endTime)` covering all real numbers `x` with `startTime <= x < endTime`. A double booking occurs whenever two events share a non-empty intersection.

Implement:
- `MyCalendar()`: Initializes an empty calendar.
- `book(start, end)`: Returns `true` and records the interval `[start, end)` if it does not overlap with any previously booked event; otherwise returns `false` without modifying the calendar.

---

## Examples

### Example 1

```text
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
```

---

## Constraints

- `0 <= start < end <= 10^9`

- At most `1000` calls will be made to `book`.

---

## Problem Understanding

- Intervals are **half-open** `[start, end)`, meaning `[10, 20)` and `[20, 30)` do **not** overlap because point `20` is excluded from the first interval.
- Two half-open intervals `[start, end)` and `[s, e)` are disjoint if and only if one ends on or before the other begins: `end <= s` or `e <= start`.
- Coordinates can be as large as `10^9`, ruling out direct boolean array indexing over time units, while at most `1000` calls are made to `book`.

---

## Approach

### Brute Force Approach

Because time coordinates range up to `10^9`, marking individual integer time slots `[start .. end - 1]` in an array or hash set would take up to `O(10^9)` time and memory on a single wide interval, immediately failing. Instead, storing intervals directly and scanning existing bookings on each `book` call is the clean baseline approach.

### Optimized Approach

Maintain an array `this.calendar` of accepted `[start, end]` pairs; on each `book(start, end)` call, linearly check all stored intervals for overlap (`!(end <= item[0] || item[1] <= start)`), returning `false` on conflict or appending `[start, end]` and returning `true`.

### Step-by-Step Thinking Process

1. Initialize `this.calendar = []` inside the `MyCalendar` constructor to store accepted bookings.
2. Determine the exact condition for two half-open intervals `[start, end)` and `[item[0], item[1])` to NOT overlap: either the new event finishes before `item` starts (`end <= item[0]`), or `item` finishes before the new event starts (`item[1] <= start`).
3. Iterate through every `item` in `this.calendar`: if the non-overlap condition holds, `continue`; otherwise, an overlap exists, so immediately `return false`.
4. If the loop completes with zero conflicts, push `[start, end]` into `this.calendar` and `return true`.

### Algorithm / Intuition

In `MyCalendar.prototype.book(start, end)`:
- For each stored interval `item = [s, e]` in `this.calendar`, `if (end <= item[0] || item[1] <= start) continue;` skips disjoint events (including touching boundary endpoints like `end === item[0]`).
- Reaching `return false;` inside the loop means both `end > item[0]` and `item[1] > start` hold simultaneously — the classic necessary and sufficient condition for two half-open intervals to intersect.
- Since JavaScript lacks a built-in balanced binary search tree and at most `1000` calls occur, scanning `this.calendar` takes at most a few hundred comparisons per call.

---

## Dry Run

Trace on **Example 1**:

1. `new MyCalendar()`: `this.calendar = []`.
2. `book(10, 20)`: `this.calendar` is empty -> push `[10, 20]`, `this.calendar = [[10, 20]]`, return `true`.
3. `book(15, 25)`: Check `item = [10, 20]`: `25 <= 10` (false) and `20 <= 15` (false) -> conflict detected! Return `false` (`this.calendar` unchanged).
4. `book(20, 30)`: Check `item = [10, 20]`: `30 <= 10` (false), `20 <= 20` (**true** -> `continue`). Loop finishes -> push `[20, 30]`, `this.calendar = [[10, 20], [20, 30]]`, return `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` per `book` call — Checks against at most `n` previously accepted events (`O(N^2)` total across `N <= 1000` calls).
- **Space Complexity:** `O(n)` — Stores up to `n` booked intervals in `this.calendar`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [729my-calendar-i.js](./729my-calendar-i.js) |

---

## Key Learnings

- Two half-open intervals `[a, b)` and `[c, d)` are disjoint iff `b <= c || d <= a`, and overlap iff `Math.max(a, c) < Math.min(b, d)`.
- When query counts are small (`N <= 1000`) in languages without native ordered sets/maps, a simple interval list is fast and bug-free; for larger `N`, a self-balancing BST or dynamic segment tree lowers per-call time to `O(log N)`.
