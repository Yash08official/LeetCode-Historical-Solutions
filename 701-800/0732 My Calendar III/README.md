---
comments: true
difficulty: Hard
tags:
  - Binary Search
  - Design
  - Segment Tree
  - Ordered Set
  - Prefix Sum
---

# 732. My Calendar III

**[View Problem on LeetCode](https://leetcode.com/problems/my-calendar-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0732` (`732`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Binary Search`, `Design`, `Segment Tree`, `Ordered Set`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

A k-booking happens when k events have some non-empty intersection (i.e., there is some time that is common to all k events.)

You are given some events [startTime, endTime), after each given event, return an integer k representing the maximum k-booking between all the previous events.

Implement the MyCalendarThree class:


	MyCalendarThree() Initializes the object.
	int book(int startTime, int endTime) Returns an integer k representing the largest integer such that there exists a k-booking in the calendar.


 
Example 1:


Input
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, 1, 1, 2, 3, 3, 3]

Explanation
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1
myCalendarThree.book(50, 60); // return 1
myCalendarThree.book(10, 40); // return 2
myCalendarThree.book(5, 15); // return 3
myCalendarThree.book(5, 10); // return 3
myCalendarThree.book(25, 55); // return 3



 
Constraints:


	0 <= startTime < endTime <= 109
	At most 400 calls will be made to book.

---

## Problem Understanding

- We need to book intervals `[start, end)` and return the maximum number of overlapping intervals across all booked events ($k$-booking).
- The coordinate range is up to $10^9$, making a dynamic / dynamically allocated segment tree with lazy propagation ideal.
- Adding an event `[start, end)` corresponds to adding $+1$ to the point range `[start + 1, end]` in 1-indexed discrete coordinates.

---

## Approach

### Optimized Approach (Dynamic Segment Tree with Lazy Propagation)

1. Model the coordinate space $[1, 10^9 + 1]$ using dynamically allocated nodes.
2. For each booking `[start, end)`:
   - Perform range addition `modify(start + 1, end, 1)` on the segment tree.
   - Nodes lazily propagate increments via `add` and maintain maximum point overlap via `v = max(left.v, right.v)`.
3. Query the root for the global maximum: `query(1, 10^9 + 1)`.

---

## Dry Run

Book `[10, 20)`: increments `[11, 20]` by 1. Max overlap = 1.
Book `[50, 60)`: increments `[51, 60]` by 1. Max overlap = 1.
Book `[10, 40)`: increments `[11, 40]` by 1. Intersection with `[11, 20]` has overlap 2. Max = 2.
Book `[5, 15)`: increments `[6, 15]` by 1. Overlap on `[11, 15]` is 3. Max = 3.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log C)$ where $N$ is the number of bookings and $C = 10^9$.
- **Space Complexity:** $O(N \log C)$ for nodes dynamically created in the segment tree.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [732my-calendar-iii.java](./732my-calendar-iii.java) |

---

## Key Learnings

- Dynamic node instantiation avoids pre-allocating an impractical $O(C)$ segment tree array when the coordinate domain is large.
- Lazy propagation ensures interval increments run in logarithmic time.
