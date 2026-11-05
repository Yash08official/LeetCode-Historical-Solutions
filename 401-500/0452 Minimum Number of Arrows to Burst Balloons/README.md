---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Sorting
---

# 452. Minimum Number of Arrows to Burst Balloons

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0452` (`452`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a 2D array `points`, where each `points[i] = [x_start, x_end]` represents the horizontal span of a balloon taped to a wall.

When an arrow is shot vertically upward at coordinate `x`, it bursts every balloon whose interval covers `x` inclusively (`x_start <= x <= x_end`). Determine the **minimum number of arrows** required to burst all balloons.

---

## Examples

### Example 1

```text
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
```

### Example 2

```text
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
```

### Example 3

```text
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
```

---

## Constraints

- `1 <= points.length <= 10^5`

- `points[i].length == 2`

- `-2^31 <= x_start < x_end <= 2^31 - 1`

---

## Problem Understanding

- **Interval stabbing equivalence:** Each arrow corresponds to choosing a point `x` on the real line that intersects a group of overlapping intervals `[x_start, x_end]`.
- **Inclusive endpoints:** Touching endpoints overlap—if one balloon ends at `x = 2` and another starts at `x = 2`, a single arrow at `x = 2` bursts both.
- **Coordinate bounds:** Endpoints span the full 32-bit signed integer range `[-2^31, 2^31 - 1]`. In JavaScript, numbers are IEEE-754 doubles (safe integers up to `+/- 9 * 10^15`), so `a[1] - b[1]` and `Number.MIN_SAFE_INTEGER` (`-9007199254740991 < -2^31`) do not suffer from 32-bit integer overflow!

---

## Approach

### Brute Force Approach

Trying all subsets of candidate arrow positions (such as every balloon endpoint) or using dynamic programming after sorting pairs of overlapping intervals takes exponential time or `O(n^2)` time, which times out for `points.length <= 10^5`.

### Optimized Approach

Use **Greedy Interval Scheduling Sorted by Right Endpoint**: sort balloons in ascending order of `x_end`, shoot an arrow at the right endpoint `b` of the first unburst balloon (`last = b`), and reuse that arrow for all subsequent balloons whose `x_start <= last`.

### Step-by-Step Thinking Process

1. Consider the balloon that ends earliest (smallest `x_end`, say `b_0`). At least one arrow must be shot somewhere inside `[a_0, b_0]` to burst it.
2. Shooting that arrow as far right as possible—at `x = b_0`—still bursts this earliest-ending balloon while maximizing the chance of overlapping future balloons that start at or before `b_0`.
3. Sort `points` by `x_end` ascending (`points.sort((a, b) => a[1] - b[1])`).
4. Track `last`, the `x`-coordinate of the most recently fired arrow (initialized to `Number.MIN_SAFE_INTEGER` so the first balloon always triggers a new shot).
5. For each balloon `[a, b]`, if `a <= last`, the arrow at `last` already bursts it (since `last <= b` by sorted order); if `a > last`, increment `ans` and fire a new arrow at `last = b`.

### Algorithm / Intuition

In `findMinArrowShots(points)`:
1. `points.sort((a, b) => a[1] - b[1])` orders intervals by right endpoint.
2. `last` starts at `Number.MIN_SAFE_INTEGER` (`-(2^53 - 1)`), which is strictly less than the minimum possible `x_start` (`-2^31`), guaranteeing that the first interval enters `if (a > last)`.
3. When scanning `[a, b]`, because `points` is sorted by `b`, every interval encountered after setting `last` satisfies `b >= last`. Thus, `[a, b]` contains `last` if and only if `a <= last`. Whenever `a > last`, the current balloon misses the previous arrow, so `++ans` shoots a new arrow at `last = b`.

---

## Dry Run

Tracing **Example 1** with `points = [[10, 16], [2, 8], [1, 6], [7, 12]]`:

1. **After sorting by `p[1]`:** `[[1, 6], [2, 8], [7, 12], [10, 16]]`.
2. **Initialize:** `ans = 0`, `last = -9007199254740991`.

| Balloon `p = [a, b]` | Check `a > last` | Action | `ans` | `last` |
| :--- | :--- | :--- | :--- | :--- |
| `[1, 6]` | `1 > -9007199254740991` (`true`) | Shoot arrow at `6` | `1` | `6` |
| `[2, 8]` | `2 > 6` (`false`) | Already burst by arrow at `6` | `1` | `6` |
| `[7, 12]` | `7 > 6` (`true`) | Shoot arrow at `12` | `2` | `12` |
| `[10, 16]` | `10 > 12` (`false`) | Already burst by arrow at `12` | `2` | `12` |

Returns `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting the `n` intervals dominates the runtime; the subsequent greedy pass runs in `O(n)` time.
- **Space Complexity:** `O(log n)` — Auxiliary space used by the runtime's sorting algorithm (only `O(1)` extra scalar variables `ans`, `last`, `a`, `b` are allocated).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [452minimum-number-of-arrows-to-burst-balloons.js](./452minimum-number-of-arrows-to-burst-balloons.js) |

---

## Key Learnings

- Sorting intervals by right endpoint (`x_end`) is the canonical greedy strategy for interval stabbing and maximum non-overlapping interval selection.
- In JavaScript, `a[1] - b[1]` is safe for 32-bit integer coordinates because JS numbers have 53 bits of integer precision, whereas in Java/C++ one must use `Integer.compare(a[1], b[1])` to avoid subtraction overflow.
- Initializing `last = Number.MIN_SAFE_INTEGER` avoids needing a separate boolean flag for the first interval because `-2^53 + 1 < -2^31`.
