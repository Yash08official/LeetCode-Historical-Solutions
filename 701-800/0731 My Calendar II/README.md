---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Design
  - Segment Tree
  - Prefix Sum
  - Ordered Set
---

# 731. My Calendar II

**[View Problem on LeetCode](https://leetcode.com/problems/my-calendar-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0731` (`731`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Design`, `Segment Tree`, `Prefix Sum`, `Ordered Set` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design a `MyCalendarTwo` class that manages half-open interval bookings `[startTime, endTime)` while preventing **triple bookings**.

Double bookings (two events overlapping) are allowed, but a **triple booking** occurs when three events share at least one common point in time.

Implement:
- `MyCalendarTwo()`: Initializes the calendar.
- `book(start, end)`: Returns `true` and adds `[start, end)` if doing so causes no triple booking; otherwise returns `false` without adding the event.

---

## Examples

### Example 1

```text
Input
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, true, true, true, false, true, true]

Explanation
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked.
myCalendarTwo.book(50, 60); // return True, The event can be booked.
myCalendarTwo.book(10, 40); // return True, The event can be double booked.
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
```

---

## Constraints

- `0 <= start < end <= 10^9`

- At most `1000` calls will be made to `book`.

---

## Problem Understanding

- The intersection of two overlapping half-open intervals `[start, end)` and `[s, e)` is itself a non-empty half-open interval `[Math.max(start, s), Math.min(end, e))` whenever `Math.max(start, s) < Math.min(end, e)`.
- A new event causes a triple booking if and only if it overlaps with a time segment that is **already double-booked**.
- By Helly's theorem for 1D intervals, because no three accepted events share a common point, the intersection graph of accepted events is triangle-free and chordal (a forest), meaning `n` accepted events can produce **at most `n - 1` double-booked overlap intervals**!

---

## Approach

### Brute Force Approach

Checking every pair of previously booked events on each `book(start, end)` call to test three-way intersection `[start, end) ∩ E_i ∩ E_j` takes `O(n^2)` time per `book` call (`O(N^3)` across `N` calls).

### Optimized Approach

Maintain two lists: `this.events` (all accepted bookings) and `this.overlaps` (all pairwise intersections representing double-booked regions). On `book(start, end)`, first verify `[start, end)` does not intersect any interval in `this.overlaps`; if safe, record all new intersections with `this.events` into `this.overlaps`, append `[start, end)` to `this.events`, and return `true`.

### Step-by-Step Thinking Process

1. Separate single-booked knowledge (`this.events`) from double-booked knowledge (`this.overlaps`).
2. When `book(start, end)` is called, first scan `this.overlaps`: if `Math.max(start, s) < Math.min(end, e)` for any `[s, e]` in `this.overlaps`, adding this event would create a triple booking, so immediately return `false` without mutating either list.
3. Once validated, scan `this.events`: for every existing `[s, e]` where `Math.max(start, s) < Math.min(end, e)`, push the exact overlap `[Math.max(start, s), Math.min(end, e)]` into `this.overlaps`.
4. Finally push `[start, end]` into `this.events` and return `true`.

### Algorithm / Intuition

In `MyCalendarTwo`:
- Validation happens strictly **before** mutation: `this.overlaps` is checked in its entirety before anything is pushed into `this.overlaps` or `this.events`, ensuring rejected calls leave the calendar state untouched.
- Overlap detection uses `Math.max(start, s) < Math.min(end, e)`, which simultaneously tests whether the intersection `[maxStart, minEnd)` has positive length and gives its exact endpoints.
- Because triple overlaps are rejected, `this.overlaps` never grows quadratically — an interval graph with maximum clique size `2` is a forest with `< n` edges, keeping `this.overlaps.length < n`!

---

## Dry Run

Trace on **Example 1**:

| Call | Conflict in `overlaps`? | New `overlaps` Added | `events` After Call | Return |
| :--- | :--- | :--- | :--- | :--- |
| `book(10, 20)` | None | — | `[[10,20]]` | `true` |
| `book(50, 60)` | None | — | `[[10,20], [50,60]]` | `true` |
| `book(10, 40)` | None | `[10, 20]` | `..., [10,40]` | `true` |
| `book(5, 15)` | Hits `[10, 20]` (`max(5,10)=10 < min(15,20)=15`) | *(aborted)* | *(unchanged)* | `false` |
| `book(5, 10)` | `max(5,10)=10 < min(10,20)=10` is False | — | `..., [5,10]` | `true` |
| `book(25, 55)` | `max(25,10)=25 < min(55,20)=20` is False | `[25, 40]`, `[50, 55]` | `..., [25,55]` | `true` |

---

## Complexity Analysis

- **Time Complexity:** `O(n)` per `book` call — Both `this.events` and `this.overlaps` contain fewer than `n` intervals after `n` accepted bookings (`O(N^2)` total across `N` calls).
- **Space Complexity:** `O(n)` — `this.events` stores `n` intervals and `this.overlaps` stores at most `n - 1` double-booked intersection intervals.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [731my-calendar-ii.js](./731my-calendar-ii.js) |

---

## Key Learnings

- Explicitly tracking `k-1` overlap regions makes rejecting `k`-tuple bookings straightforward for small `k` (here `k = 3`).
- Always complete validation checks before mutating state arrays so failed operations do not corrupt stored intervals.
- For arbitrary `k`-booking limits (e.g., My Calendar III), sweep-line difference maps or lazy segment trees generalize cleanly.
