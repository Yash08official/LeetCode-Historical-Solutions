---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Heap (Priority Queue)
---

# 1942. The Number of the Smallest Unoccupied Chair

**[View Problem on LeetCode](https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1942` (`1942`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

A party is attended by `n` friends labeled `0` through `n - 1`, with an infinite supply of chairs numbered `0, 1, 2, ...`. Whenever a friend arrives, they immediately take the **lowest-numbered unoccupied chair** available.

You are given a **0-indexed** 2D array `times` where `times[i] = [arrival_i, leaving_i]` gives the arrival and departure times of friend `i`, along with an integer `targetFriend`. All arrival times are strictly distinct. If one friend leaves at time `t`, their chair becomes free instantly at time `t` and can be taken by someone arriving at time `t`.

Return the chair number assigned to `targetFriend`.

---

## Examples

### Example 1

```text
Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
Output: 1
Explanation:
- Friend 0 arrives at time 1 and sits on chair 0.
- Friend 1 arrives at time 2 and sits on chair 1.
- Friend 1 leaves at time 3 and chair 1 becomes empty.
- Friend 0 leaves at time 4 and chair 0 becomes empty.
- Friend 2 arrives at time 4 and sits on chair 0.
Since friend 1 sat on chair 1, we return 1.
```

### Example 2

```text
Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
Output: 2
Explanation:
- Friend 1 arrives at time 1 and sits on chair 0.
- Friend 2 arrives at time 2 and sits on chair 1.
- Friend 0 arrives at time 3 and sits on chair 2.
- Friend 1 leaves at time 5 and chair 0 becomes empty.
- Friend 2 leaves at time 6 and chair 1 becomes empty.
- Friend 0 leaves at time 10 and chair 2 becomes empty.
Since friend 0 sat on chair 2, we return 2.
```

---

## Constraints

- `n == times.length`

- `2 <= n <= 10^4`

- `times[i].length == 2`

- `1 <= arrival_i < leaving_i <= 10^5`

- `0 <= targetFriend <= n - 1`

- Each `arrival_i` time is **distinct**.

---

## Problem Understanding

- Events must be processed in chronological order of `arrival_i`, so we need to sort friends by arrival time **without losing** their original index `i` (so we know when `i == targetFriend`).
- Even though chairs are numbered up to infinity, at most `n` friends ever attend the party, so no friend will ever need a chair numbered higher than `n - 1`!
- When a friend arrives at time `a`, **all** occupied chairs with `leaving_time <= a` must be freed **before** picking the minimum-numbered available chair.

---

## Approach

### Brute Force Approach

After sorting arrivals, we could maintain an array `chairLeaveTime[0..n-1]` storing when each chair becomes free, and for each arriving friend scan linearly from chair `0` upward until finding the first `j` with `chairLeaveTime[j] <= arrival`. With `n <= 10^4`, scanning `O(n)` chairs for each of `n` friends takes `O(n^2)` (`~10^8` operations).

### Optimized Approach

Sort the friends by arrival time while preserving original indices, and coordinate seat assignments using **two min-heaps**: `q` storing available chair IDs (`0` to `n - 1` initially) ordered by chair number, and `busy` storing `[leavingTime, chairId]` pairs ordered by earliest departure time.

### Step-by-Step Thinking Process

1. Attach each friend's original ID `i` to their interval as `ts[i] = {times[i][0], times[i][1], i}`, since sorting `times` directly would erase who `targetFriend` is.
2. Pre-populate a min-heap `q` with chair numbers `0` through `n - 1`, because `n` chairs are always sufficient for `n` guests.
3. Maintain a second min-heap `busy` of `{leavingTime, chairNumber}` sorted by `leavingTime`.
4. Sort `ts` by arrival time `a`. For each arriving guest `{a, b, i}`, pop every entry from `busy` with `busy.peek()[0] <= a` and return its chair ID `busy.poll()[1]` back into `q`.
5. Poll the smallest available chair `c = q.poll()`. If `i == targetFriend`, return `c` immediately; otherwise record `{b, c}` in `busy`.

### Algorithm / Intuition

In `smallestChair`, `ts` augments each interval with its friend index `i`, while `q` starts with all `n` candidate chairs `[0, 1, ..., n - 1]`. After sorting `ts` by `arrival` (`a[0] - b[0]`), we sweep forward in arrival order. Because arrivals `a` strictly increase, once a guest in `busy` has `leavingTime <= a`, they have permanently left prior to or at this exact moment—so the `while` loop drains all expired `[leavingTime, chair]` pairs from `busy` and pushes their freed chairs back into `q`. Calling `q.poll()` then extracts the smallest free chair `c` in `O(log n)` time. As soon as `i == targetFriend`, we short-circuit and return `c`.

---

## Dry Run

Tracing `times = [[1, 4], [2, 3], [4, 6]]`, `targetFriend = 1` (`n = 3`):

- **Init:** `ts` sorted by arrival = `[[1, 4, 0], [2, 3, 1], [4, 6, 2]]`, `q = [0, 1, 2]`, `busy = []`.

| Step | Friend `t = [a, b, i]` | Freed from `busy` (`<= a`) | `q` Before Poll | Assigned `c = q.poll()` | `busy` After Step |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `[1, 4, 0]` | none | `[0, 1, 2]` | `0` (`i = 0 != 1`) | `[[4, 0]]` |
| 2 | `[2, 3, 1]` | none (`4 <= 2` false) | `[1, 2]` | `1` (`i = 1 == targetFriend`) | **returns `1`**! |

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting `n` intervals takes `O(n log n)`, initializing `q` takes `O(n log n)`, and each friend is pushed to and popped from `busy` and `q` at most once (`O(log n)` per heap operation).
- **Space Complexity:** `O(n)` — The array `ts` and the two priority queues `q` and `busy` each store at most `n` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1942the-number-of-the-smallest-unoccupied-chair.java](./1942the-number-of-the-smallest-unoccupied-chair.java) |

---

## Key Learnings

- The **Two-Heap Resource Allocation** pattern (one heap sorted by release time for active resources, one heap sorted by ID/priority for free resources) is the standard optimal template for server, room, and chair scheduling problems.
- Bounding an 'infinite' resource pool by `n` (the maximum number of events) lets us pre-fill the free-ID heap cleanly (or generate IDs lazily with a next-chair counter).
- Notice the `<=` check (`busy.peek()[0] <= a`): when departure and arrival at the exact same timestamp do not conflict, always release expiring intervals before allocating new ones.
