---
comments: true
difficulty: Hard
tags:
  - Design
  - Segment Tree
  - Ordered Set
---

# 715. Range Module

**[View Problem on LeetCode](https://leetcode.com/problems/range-module/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0715` (`715`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Design`, `Segment Tree`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as **half-open intervals** and query about them.

A **half-open interval** `[left, right)` denotes all real numbers `x` where `left <= x < right`.

Implement the `RangeModule` class:

- `RangeModule()` Initializes the object of the data structure.
- `void addRange(int left, int right)` Adds the half-open interval `[left, right)`, tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval `[left, right)` that are not already tracked.
- `boolean queryRange(int left, int right)` Returns `true` if every real number in the interval `[left, right)` is currently being tracked, and `false` otherwise.
- `void removeRange(int left, int right)` Stops tracking every real number in the half-open interval `[left, right)`.

---

## Examples

### Example 1

```text
Input
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
Output
[null, null, null, true, false, true]

Explanation
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
```

---

## Constraints

- `1 <= left < right <= 10^9`
- At most `10^4` calls will be made to `addRange`, `queryRange`, and `removeRange`.

---

## Problem Understanding

- Range operations operate over integer/real intervals up to $10^9$.
- Half-open interval $[left, right)$ can be mapped to discrete integer indices $[left, right - 1]$.
- Queries must determine whether an entire queried segment $[left, right - 1]$ is fully covered ($v = true$).

---

## Approach

### Optimized Approach (Dynamic Segment Tree with Lazy Propagation)

1. Model the coordinate space $[1, 10^9]$ using a dynamically instantiated segment tree (`SegmentTree`).
2. Each node holds:
   - `left`, `right`: child pointers.
   - `v`: boolean indicating whether the current segment is completely covered.
   - `add`: lazy update flag ($1$ for add, $-1$ for remove, $0$ for no pending update).
3. `modify(left, right - 1, val)`:
   - If current interval is completely within range, set `node.v = (val == 1)` and `node.add = val`.
   - Otherwise, `pushdown(node)` to allocate/propagate children, recursively update overlapping halves, and `pushup(node)` (`node.v = left.v && right.v`).
4. `query(left, right - 1)`:
   - Returns whether all subsegments spanning the query interval are fully tracked.

---

## Complexity Analysis

- **Time Complexity:** $O(\log C)$ per call (`addRange`, `removeRange`, `queryRange`), where coordinate range $C = 10^9$. For $Q$ operations, total time is $O(Q \log C)$.
- **Space Complexity:** $O(Q \log C)$ dynamic nodes allocated across updates.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [715range-module.java](./715range-module.java) |

---

## Key Learnings

- Dynamic node allocation in a Segment Tree allows handling sparse coordinates up to $10^9$ without offline coordinate compression.
- Lazy propagation ensures interval additions and deletions run in $O(\log C)$ time per update.
