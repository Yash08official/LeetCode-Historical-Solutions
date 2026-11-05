---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Design
  - Heap (Priority Queue)
  - Ordered Set
---

# 2349. Design a Number Container System

**[View Problem on LeetCode](https://leetcode.com/problems/design-a-number-container-system/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2349` (`2349`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Design`, `Heap (Priority Queue)`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

Design a number container system that can do the following:
- Insert or replace a number at a given index in the system.
- Return the smallest index for a given number in the system.

Implement the `NumberContainers` class:
- `NumberContainers()`: Initializes the number container system.
- `void change(int index, int number)`: Fills the container at `index` with `number`. If there is already a number at that `index`, replace it.
- `int find(int number)`: Returns the smallest index for the given `number`, or `-1` if there is no index that currently contains that number.

---

## Examples

### Example 1

```text
Input
["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
[[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
Output
[null, -1, null, null, null, null, 1, null, 2]

Explanation
NumberContainers nc = new NumberContainers();
nc.find(10); // There is no index that is filled with number 10. Therefore, we return -1.
nc.change(2, 10); // Your container at index 2 will be filled with number 10.
nc.change(1, 10); // Your container at index 1 will be filled with number 10.
nc.change(3, 10); // Your container at index 3 will be filled with number 10.
nc.change(5, 10); // Your container at index 5 will be filled with number 10.
nc.find(10); // Number 10 is at the indices 1, 2, 3, and 5. Since the smallest index that is filled with 10 is 1, we return 1.
nc.change(1, 20); // Your container at index 1 will be filled with number 20. Note that index 1 was filled with 10 and then replaced with 20.
nc.find(10); // Number 10 is at the indices 2, 3, and 5. The smallest index that is filled with 10 is 2. Therefore, we return 2.
```

---

## Constraints

- `1 <= index, number <= 10^9`

- At most `10^5` calls will be made **in total** to `change` and `find`.

---

## Problem Understanding

Key observations and constraints:
- `1 <= index, number <= 10^9`.
- At most `10^5` calls will be made in total to `change` and `find`.
- We need two primary operations:
  1. Map an `index` to its current `number`, and support updating/replacing existing values.
  2. For any given `number`, maintain all indices currently holding that number, and quickly query the minimum index.
- Because an index can be overwritten, when `change(index, number)` is called on an existing `index`, that `index` must be removed from the previous number's index set.

---

## Approach

### Brute Force Approach

A naive approach could store entries in a list or simple hash map `index -> number`. `change` would take `O(1)`, but `find(number)` would have to scan all entries to find the smallest index, taking `O(N)` per query. With `10^5` queries, total time would be `O(N^2)`, leading to TLE.

### Optimized Approach

Use two synchronized data structures:
1. A hash map `d` (`Map<Integer, Integer>`) mapping `index -> number`.
2. A hash map `g` (`Map<Integer, TreeSet<Integer>>`) mapping `number -> TreeSet of indices`.

- In `change(index, number)`: if `d` contains `index`, retrieve the old number and remove `index` from `g.get(oldNumber)`. Update `d.put(index, number)`, and insert `index` into `g.get(number)` (creating the `TreeSet` if absent).
- In `find(number)`: fetch `g.get(number)`. If null or empty, return `-1`; otherwise return `ids.first()` in `O(1)`.

### Step-by-Step Thinking Process

1. We need index replacement and minimum index retrieval by number.
2. A map from `index -> number` tracks the current number at each index.
3. A map from `number -> sorted indices` keeps indices ordered.
4. In Java, `TreeSet` stores elements in sorted order and provides `first()` in `O(1)` time.
5. When replacing an existing index, look up its old number in `d` and remove `index` from the old number's `TreeSet`.
6. Add `index` to the new number's `TreeSet`.
7. For `find`, return `TreeSet.first()` or `-1` if empty.

### Algorithm / Intuition

In `NumberContainers`, `private Map<Integer, Integer> d` stores `index -> number`, and `private Map<Integer, TreeSet<Integer>> g` stores `number -> TreeSet<Integer>`.

In `change(index, number)`, we first check `if (d.containsKey(index))`. If true, we retrieve `int oldNumber = d.get(index)` and call `g.get(oldNumber).remove(index)` to maintain bidirectional consistency. Then we update `d.put(index, number)` and add `index` to the target number's set via `g.computeIfAbsent(number, k -> new TreeSet<>()).add(index)`.

In `find(number)`, `var ids = g.get(number)` retrieves the sorted set for that number. If `ids` is null or empty, it returns `-1`; otherwise `ids.first()` returns the minimum index in `O(1)`.

---

## Dry Run

Execution trace for Example 1:
- `nc = new NumberContainers()`.
- `find(10)`: `g.get(10)` is null -> returns `-1`.
- `change(2, 10)`: `d[2] = 10`, `g[10] = {2}`.
- `change(1, 10)`: `d[1] = 10`, `g[10] = {1, 2}`.
- `change(3, 10)`: `d[3] = 10`, `g[10] = {1, 2, 3}`.
- `change(5, 10)`: `d[5] = 10`, `g[10] = {1, 2, 3, 5}`.
- `find(10)`: `g[10].first()` is `1` -> returns `1`.
- `change(1, 20)`: `d.containsKey(1)` is True (`oldNumber = 10`). Remove `1` from `g[10]` -> `g[10] = {2, 3, 5}`. `d[1] = 20`, `g[20] = {1}`.
- `find(10)`: `g[10].first()` is `2` -> returns `2`.
- Matches Example 1 output: `[null, -1, null, null, null, null, 1, null, 2]`.

---

## Complexity Analysis

- **Time Complexity:** - `change(index, number)`: `O(log K)` where `K` is the number of indices associated with the number, due to `TreeSet.remove` and `TreeSet.add`.
- `find(number)`: `O(1)` to look up the map and call `TreeSet.first()`.
- Total time for `N` operations is `O(N log N)`.
- **Space Complexity:** `O(N)` — Where `N` is the number of distinct indices added to the system, stored across hash maps and tree sets.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2349design-a-number-container-system.java](./2349design-a-number-container-system.java) |

---

## Key Learnings

- Dual mapping (`index -> value` and `value -> sorted indices`) enables fast lookup in both directions.
- When updating an existing key, eagerly removing the stale reference from the secondary index preserves consistency.
- `TreeSet.first()` provides `O(1)` retrieval of the minimum element from a balanced binary search tree.
