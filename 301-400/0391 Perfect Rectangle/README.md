---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Math
  - Geometry
  - Sweep Line
---

# 391. Perfect Rectangle

**[View Problem on LeetCode](https://leetcode.com/problems/perfect-rectangle/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0391` (`391`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Geometry`, `Sweep Line` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `rectangles` where each element `rectangles[i] = [x_i, y_i, a_i, b_i]` defines an axis-aligned rectangle from its bottom-left corner `(x_i, y_i)` to its top-right corner `(a_i, b_i)`.

Return `true` if and only if all the rectangles together form an **exact, gap-free, non-overlapping cover** of a single larger rectangular region.

---

## Examples

### Example 1

```text
Input: rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
Output: true
Explanation: All 5 rectangles together form an exact cover of a rectangular region.
```

### Example 2

```text
Input: rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
Output: false
Explanation: Because there is a gap between the two rectangular regions.
```

### Example 3

```text
Input: rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
Output: false
Explanation: Because two of the rectangles overlap with each other.
```

---

## Constraints

- `1 <= rectangles.length <= 2 * 10^4`

- `rectangles[i].length == 4`

- `-10^5 <= x_i < a_i <= 10^5`

- `-10^5 <= y_i < b_i <= 10^5`

---

## Problem Understanding

For a collection of small axis-aligned rectangles to tile one exact bounding rectangle `[minX, minY, maxX, maxY]`, two conditions might initially come to mind:
1. **Area conservation:** The sum of areas of all individual rectangles must equal `(maxX - minX) * (maxY - minY)`.

However, area equality alone is **not sufficient**—an overlap of area `+A` in one spot could cancel out an uncovered gap of area `-A` somewhere else! What distinguishes a valid tiling from overlapping/gapped pieces?
- At the **4 outer corners** of the bounding box `(minX, minY)`, `(minX, maxY)`, `(maxX, maxY)`, `(maxX, minY)`, exactly **1** small rectangle corner must appear.
- At **every other vertex** (either a T-junction along an edge where 2 corners meet, or a cross-junction in the interior where 4 corners meet), small rectangle corners must meet in even pairs of **2 or 4**!

---

## Approach

### Brute Force Approach

Checking every pair of rectangles `(i, j)` for intersection takes `O(n^2)` time to verify non-overlap, followed by comparing total area against the bounding box.

With `rectangles.length <= 2 * 10^4`, `O(n^2)` performs up to `4 * 10^8` pairwise comparisons, risking Time Limit Exceeded.

### Optimized Approach

In a single `O(n)` pass, compute the 64-bit sum of individual areas `area`, find the global bounding box `(minX, minY, maxX, maxY)`, and count how many times each corner `(x, y)` appears across all rectangles in `Map<Pair, Integer> cnt`. Then verify that `area` matches the bounding box area, the 4 outer corners each have count `1`, and every remaining point in `cnt` has count `2` or `4`.

### Step-by-Step Thinking Process

1. Define an immutable `Pair(first, second)` helper class with proper `equals` and `hashCode` overrides to represent 2D integer coordinates in a `HashMap`.
2. Initialize `area = 0L`, bounding extremes `minX, minY, maxX, maxY` from `rectangles[0]`, and `cnt = new HashMap<>()`.
3. For each rectangle `r = [x1, y1, x2, y2]`, add `(x2 - x1) * 1L * (y2 - y1)` to `area`, update `minX, minY, maxX, maxY`, and increment the counts of all four corners `(x1, y1)`, `(x1, y2)`, `(x2, y2)`, `(x2, y1)` in `cnt`.
4. Verify `area == (long) (maxX - minX) * (maxY - minY)` and check that each of the 4 bounding corners has count `== 1` in `cnt`; if not, return `false`.
5. Remove the 4 outer bounding corners from `cnt` and check `cnt.values().stream().allMatch(c -> c == 2 || c == 4)`.

### Algorithm / Intuition

Why do area equality + vertex counts `{1 at outer corners, 2 or 4 everywhere else}` guarantee zero overlaps and zero gaps?

Suppose two identical rectangles sat directly on top of each other inside the bounding box: their 4 shared corners would have count `2`, fooling a parity-only check, unless they sat at an outer corner (giving count `2 != 1`) or created a hole elsewhere whose corners would have odd count `1` or `3`! Even subtler, if two identical `1x1` rectangles overlapped (`count = 2` on their 4 corners) inside a region with an equal-sized `1x1` hole (`count = 1` on the hole's corners), the hole's corners would fail `c == 2 || c == 4` (or if the hole shared corners with the overlap, some corner would reach `3` or `> 4`). Checking `c == 2 || c == 4` (specifically excluding `6, 8, ...` which can only happen if rectangles overlap at a point!) together with exact area makes the test both necessary and sufficient.

---

## Dry Run

Tracing **Example 1**: `rectangles = [[1,1,3,3], [3,1,4,2], [3,2,4,4], [1,3,2,4], [2,3,3,4]]`

1. **Area & Bounding Box:**
   - Areas: `4 + 1 + 2 + 1 + 1 = 9`
   - Bounds: `minX = 1, minY = 1, maxX = 4, maxY = 4` -> Bounding area `(4 - 1) * (4 - 1) = 9` (Matches!)
2. **Corner Counts in `cnt`:**
   - Outer corners `(1,1): 1`, `(1,4): 1`, `(4,4): 1`, `(4,1): 1` -> All equal `1`! Removed from `cnt`.
   - Remaining interior/edge vertices:
     - `(3,1)`: in `[1,1,3,3]` & `[3,1,4,2]` -> count `2`
     - `(1,3)`: in `[1,1,3,3]` & `[1,3,2,4]` -> count `2`
     - `(3,2)`: in `[3,1,4,2]` & `[3,2,4,4]` -> count `2`
     - `(4,2)`: in `[3,1,4,2]` & `[3,2,4,4]` -> count `2`
     - `(2,3)`: in `[1,3,2,4]` & `[2,3,3,4]` -> count `2`
     - `(2,4)`: in `[1,3,2,4]` & `[2,3,3,4]` -> count `2`
     - `(3,4)`: in `[3,2,4,4]` & `[2,3,3,4]` -> count `2`
     - `(3,3)`: in `[1,1,3,3]`, `[3,2,4,4]`, `[2,3,3,4]`? Wait: `[3,2,4,4]` has corners `(3,2),(3,4),(4,4),(4,2)`, so `(3,3)` is in `[1,1,3,3]` and `[2,3,3,4]` -> count `2`!
3. Every remaining count in `cnt` is `2` (`c == 2 || c == 4` holds), returning `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We process `n` rectangles, performing 4 expected `O(1)` `HashMap` updates per rectangle, followed by a linear scan over at most `4n` entries in `cnt`.
- **Space Complexity:** `O(n)` — `cnt` stores at most `4n` distinct `Pair` keys.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [391perfect-rectangle.java](./391perfect-rectangle.java) |

---

## Key Learnings

- Exact geometric tiling can be validated in `O(n)` without a sweep-line segment tree by combining 64-bit area conservation with topological corner-degree invariants (`1` at outer corners, `2` or `4` internally).
- With coordinates in `[-10^5, 10^5]`, rectangle widths/heights reach `2 * 10^5` and single areas reach `4 * 10^{10}`, which overflows 32-bit `int`—multiplying by `1L` (`long`) is essential.
- Checking `c == 2 || c == 4` is strictly stronger than checking `c % 2 == 0`, because three overlapping rectangles sharing a corner could produce `c == 6`.
