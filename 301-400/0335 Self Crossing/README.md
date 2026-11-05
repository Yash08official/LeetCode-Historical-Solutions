---
comments: true
difficulty: Hard
tags:
  - Array
  - Math
  - Geometry
---

# 335. Self Crossing

**[View Problem on LeetCode](https://leetcode.com/problems/self-crossing/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0335` (`335`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Math`, `Geometry` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `distance` of positive step lengths. Starting at `(0, 0)` on the 2D Cartesian plane, you walk `distance[0]` units **North**, `distance[1]` units **West**, `distance[2]` units **South**, `distance[3]` units **East**, and continue cycling counter-clockwise (`N -> W -> S -> E -> ...`).

Return `true` if your path ever intersects or touches any previously visited point, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: distance = [2,1,1,2]
Output: true
Explanation: The path crosses itself at the point (0, 1).
```

### Example 2

```text
Input: distance = [1,2,3,4]
Output: false
Explanation: The path does not cross itself at any point.
```

### Example 3

```text
Input: distance = [1,1,1,2,1]
Output: true
Explanation: The path crosses itself at the point (0, 0).
```

---

## Constraints

- `1 <= distance.length <= 10^5`

- `1 <= distance[i] <= 10^5`

---

## Problem Understanding

- With up to `10^5` segments, a non-crossing path can only behave in two topological regimes: an **outward-expanding spiral** (`d[i] > d[i - 2]`), an **inward-shrinking spiral** (`d[i] < d[i - 2]`), or a **single transition** from outward-expanding to inward-shrinking (once shrinking inward inside a closed box, it can never expand outward again without crossing the enclosing wall!).
- Because older spiral turns are completely shielded behind the outermost/innermost active walls, any self-intersection **must** occur between segment `i` and one of its recent parallel/perpendicular segments within a window of at most **6 steps** (`i - 3`, `i - 4`, or `i - 5`).

---

## Approach

### Brute Force Approach

Converting every step into an explicit horizontal or vertical line segment `(x1, y1) - (x2, y2)` and testing intersection against all previous segments takes `O(n^2)` time (`~5 * 10^9` checks for `n = 10^5`), while sweep-line + balanced BST (`O(n log n)`) adds substantial geometric boilerplate.

### Optimized Approach

Scan `i` from `3` to `d.length - 1` (aliasing `d = distance`) and check the exhaustive three local geometric crossing patterns: `i` crossing `i - 3` (4-segment loop), `i` meeting `i - 4` (5-segment closed loop), and `i` crossing `i - 5` (6-segment spiral transition).

### Step-by-Step Thinking Process

1. Fewer than 4 segments (`d.length < 4`) can never cross, so start the loop at `i = 3`.
2. Pattern 1 (`i` crosses `i - 3`, `4` segments): segment `i` reaches at least as far as `i - 2` (`d[i] >= d[i - 2]`) while perpendicular segment `i - 1` stayed inside `i - 3` (`d[i - 1] <= d[i - 3]`). Return `true`.
3. Pattern 2 (`i` overlaps/touches `i - 4`, `5` segments, `i >= 4`): parallel segments `i - 1` and `i - 3` have equal length (`d[i - 1] == d[i - 3]`), aligning segment `i` collinearly with segment `i - 4`, and their combined length bridges `d[i - 2]` (`d[i] + d[i - 4] >= d[i - 2]`). Return `true`.
4. Pattern 3 (`i` crosses `i - 5`, `6` segments, `i >= 5`): spiral expanded at `i - 2` (`d[i - 2] >= d[i - 4]`), shrank inward at `i - 1` (`d[i - 1] <= d[i - 3]`), `i - 1` stayed far enough out to overlap `i - 5`'s span (`d[i - 1] + d[i - 5] >= d[i - 3]`), and `i` reaches across the gap `d[i - 2] - d[i - 4]` (`d[i] >= d[i - 2] - d[i - 4]`). Return `true`.
5. If no `i` triggers any of the three conditions, return `false`.

### Algorithm / Intuition

Because every `90`-degree counter-clockwise turn is rotationally symmetric, relative segment lengths `d[i], d[i-1], ..., d[i-5]` are **rotation-invariant**! Whether segment `i` points East, North, West, or South, its geometric relationship to segments `i - 1 .. i - 5` is identical up to a `90`-degree rotation of the plane—so those exact three algebraic inequalities work at every index `i` without tracking `(x, y)` coordinates or compass directions!

---

## Dry Run

Tracing **Example 1** (`distance = [2, 1, 1, 2]`):

- `d = [2, 1, 1, 2]`, loop starts at `i = 3`:
  - Check Pattern 1: `d[3] >= d[1]` (`2 >= 1` is `true`) **and** `d[2] <= d[0]` (`1 <= 2` is `true`).
  - Immediately returns **`true`**! *(Visually: `(0,0) -> (0,2) -> (-1,2) -> (-1,1) -> (1,1)`, crossing the first North segment `(0,0)-(0,2)` at `(0,1)`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single loop from `i = 3` to `n - 1` performs `O(1)` arithmetic comparisons per step.
- **Space Complexity:** `O(1)` — Only reference alias `d` and loop counter `i` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [335self-crossing.java](./335self-crossing.java) |

---

## Key Learnings

- Rotational symmetry (`90`-degree counter-clockwise turns every step) makes local crossing conditions purely a function of relative window lengths `d[i - 5 .. i]`, independent of absolute coordinates.
- Any valid non-crossing orthogonal spiral is unimodal: outward expansion followed by inward contraction, bounding active boundary interactions to a 6-segment window.
