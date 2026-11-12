---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Breadth-First Search
---

# 815. Bus Routes

**[View Problem on LeetCode](https://leetcode.com/problems/bus-routes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0815` (`815`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Breadth-First Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `routes` representing bus routes where `routes[i]` is a bus route that the `i`-th bus repeats forever.
- For example, if `routes[0] = [1, 5, 7]`, this bus travels: $1 	o 5 	o 7 	o 1 	o 5 \dots$

You start at the bus stop `source` and want to reach `target`. You can travel between bus stops only by taking buses.

Return the least number of buses you must take to travel from `source` to `target`. If it is not possible, return `-1`.

---

## Problem Understanding

- We want the minimum number of **buses** taken, not the minimum number of stops visited.
- Treating each bus route as a graph component/hyperedge allows Breadth-First Search (BFS) to find the shortest path in terms of bus transfers.

---

## Approach

### Dual-Level BFS (Stop & Route Traversal)

1. **Edge Case:** If `source == target`, return `0` buses immediately.
2. **Inverted Indexing:** Map each bus stop to all bus route indices that pass through it: `Map<Stop, List<BusId>>`.
3. If either `source` or `target` does not appear in any route, return `-1`.
4. **Queue Initialization:** Enqueue `[source, 0]` representing `(current_stop, buses_taken)`.
5. Maintain two visited sets:
   - `visBus`: ensures each bus route is boarded at most once.
   - `visStop`: ensures each stop is enqueued at most once.
6. **BFS Level Traversal:**
   - Dequeue `[stop, busCount]`. If `stop == target`, return `busCount`.
   - For every unvisited bus passing through `stop`, mark the bus as visited and inspect all stops along that bus's route.
   - For every unvisited stop along that route, enqueue `[nextStop, busCount + 1]`.
7. If the queue empties without reaching `target`, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $O(\sum |routes[i]|)$ — Each bus route and each stop is explored at most once during the BFS traversal.
- **Space Complexity:** $O(\sum |routes[i]|)$ to store the graph mapping, queue, and visited sets.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [815bus-routes.java](./815bus-routes.java) |

---

## Key Learnings

- When optimizing transfers rather than edges, formulate the search state around route transitions.
- Tracking visited routes prevents exponential redundant stop expansions.
