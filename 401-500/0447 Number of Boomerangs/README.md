---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Math
---

# 447. Number of Boomerangs

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-boomerangs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0447` (`447`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Math` |
| **Solution Language** | Java |

---

## Problem Description

You are given `n` `points` in the plane that are all **distinct**, where `points[i] = [xi, yi]`. A **boomerang** is a tuple of points `(i, j, k)` such that the distance between `i` and `j` equals the distance between `i` and `k` **(the order of the tuple matters)**.

Return *the number of boomerangs*.

---

## Examples

### Example 1

```
Input: points = [[0,0],[1,0],[2,0]]
Output: 2
Explanation: The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].
```

### Example 2

```
Input: points = [[1,1],[2,2],[3,3]]
Output: 2
```

### Example 3

```
Input: points = [[1,1]]
Output: 0
```

 

**

---

## Constraints

**

	- `n == points.length`

	- `1 <= n <= 500`

	- `points[i].length == 2`

	- `-10^4 <= xi, yi <= 10^4`

	- All the points are **unique**.

---

## Problem Understanding

- Given `n` distinct 2D points, count ordered triples `(i, j, k)` such that the Euclidean distance between `points[i]` and `points[j]` equals the distance between `points[i]` and `points[k]`.

---

## Approach

### Optimized Approach (Per-Anchor Squared-Distance Frequency Map)
1. Fix each point `p1` as the boomerang apex (`i`).
2. Compute squared Euclidean distance $d = (x_1 - x_2)^2 + (y_1 - y_2)^2$ to every point `p2` and tally frequencies in a `HashMap` `cnt` (avoiding floating-point `sqrt` precision issues).
3. If `x` points lie at distance `d` from `p1`, they form $x(x - 1)$ ordered pairs `(j, k)`. Sum $x(x - 1)$ over all distance buckets for every anchor `p1`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ — for each of $n$ anchors, scan all $n$ points and iterate over at most $n$ distance buckets.
- **Space Complexity:** $O(n)$ for the per-anchor distance frequency map.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [447number-of-boomerangs.java](./447number-of-boomerangs.java) |

---

## Key Learnings

- Grouping by exact integer squared distances eliminates floating-point rounding bugs and converts an $O(n^3)$ triple enumeration into $O(n^2)$ combinatorics.
