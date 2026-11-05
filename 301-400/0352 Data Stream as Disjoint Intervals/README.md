---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - Binary Search
  - Union-Find
  - Design
  - Data Stream
  - Ordered Set
---

# 352. Data Stream as Disjoint Intervals

**[View Problem on LeetCode](https://leetcode.com/problems/data-stream-as-disjoint-intervals/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0352` (`352`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `Binary Search`, `Union-Find`, `Design`, `Data Stream`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

Design a `SummaryRanges` data structure that receives an ongoing stream of non-negative integers and summarizes all numbers seen so far as a sorted list of disjoint, contiguous closed intervals `[start_i, end_i]`.

You need to implement:
- `SummaryRanges()`: Initializes an empty stream.
- `void addNum(int val)`: Inserts `val` into the stream.
- `int[][] getIntervals()`: Returns the current disjoint intervals sorted in ascending order by `start_i`.

---

## Examples

### Example 1

```text
Input
["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
[[], [1], [], [3], [], [7], [], [2], [], [6], []]
Output
[null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]

Explanation
SummaryRanges summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);      // arr = [1]
summaryRanges.getIntervals(); // return [[1, 1]]
summaryRanges.addNum(3);      // arr = [1, 3]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3]]
summaryRanges.addNum(7);      // arr = [1, 3, 7]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
summaryRanges.getIntervals(); // return [[1, 3], [7, 7]]
summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
summaryRanges.getIntervals(); // return [[1, 3], [6, 7]]
```

---

## Constraints

- `0 <= value <= 10^4`

- At most `3 * 10^4` calls will be made to `addNum` and `getIntervals`.

- At most `10^2` calls will be made to `getIntervals`.

---

## Follow-up Questions

What if there are lots of merges and the number of disjoint intervals is small compared to the size of the data stream?

When there are lots of merges and the number of disjoint intervals `m` stays much smaller than the stream size `n` (`m << n`), this `TreeMap` interval design shines: `mp` holds only `m` entries instead of `n` elements, `addNum` runs in `O(log m)` time, `getIntervals` runs in `O(m)` time, and memory usage stays `O(m)` regardless of how many millions of duplicate or contiguous values arrive.

---

## Problem Understanding

Two integers `x` and `x + 1` belong to the same interval because no integer gap separates them. Whenever a newly added `val` lands inside an existing interval `[a, b]`, nothing changes; if `val == b + 1` or `val == a - 1`, it extends an existing interval; if it equals both `b_1 + 1` and `a_2 - 1` for two adjacent intervals `[a_1, b_1]` and `[a_2, b_2]`, it merges them into `[a_1, b_2]`.

Key observations from constraints:
- Up to `3 * 10^4` calls are made in total, while `getIntervals` is called at most `100` times.
- Maintaining intervals dynamically in a balanced BST (`TreeMap`) keeps `addNum` logarithmic in the number of active intervals.

---

## Approach

### Brute Force Approach

A naive implementation stores every incoming integer in a `HashSet` or boolean array of size `10001`. On each `getIntervals()` call, it either sorts the set (`O(n log n)`) or scans the entire `[0, 10000]` range (`O(U)`) to group consecutive numbers into intervals.

If the value domain were unbounded or `getIntervals()` were called frequently when very few intervals exist, scanning all elements or sorting repeatedly becomes a bottleneck.

### Optimized Approach

We maintain disjoint intervals in a `TreeMap<Integer, int[]> mp`, where each entry maps an anchor key inside the interval to its `[start, end]` bounds. Using `floorKey(val)` and `ceilingKey(val)` in `O(log m)` time (where `m` is the number of intervals), `addNum` checks neighboring intervals to bridge, extend, ignore duplicates, or insert `[val, val]`.

### Step-by-Step Thinking Process

1. Store active disjoint intervals in `TreeMap<Integer, int[]> mp` so keys stay ordered and neighbor lookups take `O(log m)` time.
2. When `addNum(val)` is called, find `l = mp.floorKey(val)` (largest key `<= val`) and `r = mp.ceilingKey(val)` (smallest key `>= val`).
3. Check the four mutually exclusive possibilities in priority order: (1) `val` bridges `l` and `r` (`mp.get(l)[1] + 1 == val` and `mp.get(r)[0] - 1 == val`), merging `r` into `l` and removing `r`; (2) `val <= mp.get(l)[1] + 1`, absorbing `val` into `l` or extending `l`'s end; (3) `val >= mp.get(r)[0] - 1`, absorbing `val` into `r` or extending `r`'s start leftward; (4) `val` is isolated, inserting `val -> [val, val]`.
4. For `getIntervals()`, iterate through `mp.values()` in ascending key order and copy each `int[]` interval into the result array.

### Algorithm / Intuition

A subtle invariant makes `SummaryRanges` work cleanly even though Case 3 (`mp.get(r)[0] = Math.min(val, mp.get(r)[0])`) lowers an interval's start without re-keying `r` in `mp`: every map key `k` always lies inside its own interval `[start, end]` (`start <= k <= end`), and all intervals in `mp` are strictly disjoint (`end_1 + 1 < start_2`).

Why does `floorKey`/`ceilingKey` remain exact when `start < r`? Suppose `r` maps to `[start, end]` with `start <= r`. For any new `val`:
- If `val >= r`, `floorKey(val)` finds `r` (or a later interval), and Case 2 checks `val <= end + 1`.
- If `val < r`, `ceilingKey(val)` MUST be `r` whenever `val >= start - 1` (since no other interval's key can exist in `[start - 1, r - 1]` without overlapping `[start, end]`). Thus Case 3 (`val >= mp.get(r)[0] - 1`) catches duplicates in `[start, r - 1]` and left-extensions at `start - 1`, while Case 1 catches exact bridges when `mp.get(l)[1] + 1 == val` and `mp.get(r)[0] - 1 == val`!

---

## Dry Run

Tracing **Example 1** (`addNum`: `1, 3, 7, 2, 6`):

| Operation | `l` (`floorKey`) | `r` (`ceilingKey`) | Branch Taken | `mp` Entries (`key: [start, end]`) | Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `addNum(1)` | `null` | `null` | Case 4 (new) | `{1: [1, 1]}` | — |
| `getIntervals()` | — | — | — | `{1: [1, 1]}` | `[[1, 1]]` |
| `addNum(3)` | `1` (`[1,1]`) | `null` | Case 4 (new) | `{1: [1, 1], 3: [3, 3]}` | — |
| `getIntervals()` | — | — | — | `{1: [1, 1], 3: [3, 3]}` | `[[1, 1], [3, 3]]` |
| `addNum(7)` | `3` (`[3,3]`) | `null` | Case 4 (new) | `{1: [1, 1], 3: [3, 3], 7: [7, 7]}` | — |
| `addNum(2)` | `1` (`[1,1]`) | `3` (`[3,3]`) | Case 1 (bridge `1` & `3`) | `{1: [1, 3], 7: [7, 7]}` | — |
| `getIntervals()` | — | — | — | `{1: [1, 3], 7: [7, 7]}` | `[[1, 3], [7, 7]]` |
| `addNum(6)` | `1` (`[1,3]`) | `7` (`[7,7]`) | Case 3 (extend `7` left) | `{1: [1, 3], 7: [6, 7]}` | — |
| `getIntervals()` | — | — | — | `{1: [1, 3], 7: [6, 7]}` | `[[1, 3], [6, 7]]` |

---

## Complexity Analysis

- **Time Complexity:** `O(log m)` per `addNum` and `O(m)` per `getIntervals`, where `m` is the current number of disjoint intervals (`m <= n`).
- **Space Complexity:** `O(m)` — `mp` stores one `int[2]` entry per disjoint interval.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [352data-stream-as-disjoint-intervals.java](./352data-stream-as-disjoint-intervals.java) |

---

## Key Learnings

- `TreeMap.floorKey` and `TreeMap.ceilingKey` let you inspect immediate predecessor and successor intervals in `O(log m)` time without manual binary search.
- Always check the two-sided merge condition (`l` and `r` both adjacent to `val`) before checking single-sided extensions, otherwise `val` would extend `l` while leaving `r` unmerged.
- Storing intervals directly rather than individual values scales gracefully when streams are dense and collapse into few intervals.
