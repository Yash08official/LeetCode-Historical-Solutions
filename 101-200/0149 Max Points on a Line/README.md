---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Math
  - Geometry
  - Euclidean Algorithm
  - Greatest Common Divisor
---

# 149. Max Points on a Line

**[View Problem on LeetCode](https://leetcode.com/problems/max-points-on-a-line/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0149` (`149`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Geometry`, `Euclidean Algorithm`, `Greatest Common Divisor` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `points` of unique 2D integer coordinates `points[i] = [x_i, y_i]` on the Cartesian X-Y plane. Find and return the **maximum number of points** from the input that all lie on a single straight line.

---

## Examples

### Example 1

```text
Input: points = [[1,1],[2,2],[3,3]]
Output: 3
```

### Example 2

```text
Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
```

---

## Constraints

- `1 <= points.length <= 300`

- `points[i].length == 2`

- `-10^4 <= x_i, y_i <= 10^4`

- All the `points` are **unique**.

---

## Problem Understanding

- **Unique Points & Small `n`:** All points are guaranteed distinct, and `1 <= points.length <= 300`. If `n == 1`, the answer is `1`; for any `n >= 2`, at least `2` points always lie on a line.
- **Floating-Point & Vertical-Line Pitfalls:** Computing slope as `(y2 - y1) / (x2 - x1)` fails on vertical lines (`x2 == x1`, division by zero) and risks floating-point precision issues.
- **Exact Collinearity via Cross-Multiplication:** Three points `(x1, y1)`, `(x2, y2)`, and `(x3, y3)` are collinear if and only if `(y2 - y1) * (x3 - x1) == (y3 - y1) * (x2 - x1)`. With coordinates in `[-10^4, 10^4]`, the maximum product is `20000 * 20000 = 4 * 10^8`, which safely fits inside a signed 32-bit `int` (`<= 2.14 * 10^9`) without overflow.

---

## Approach

### Brute Force Approach

Enumerating all pairs of points `(i, j)` to define a candidate line and scanning a third index `k` to count collinear points takes `O(n^3)` time. Because `n <= 300`, at most `300 * 299 * 298 / 6 ≈ 4.47 * 10^6` inner iterations occur—making this direct `O(n^3)` geometric enumeration fast enough in Java while using `O(1)` extra space! (A hash map of reduced GCD slope fractions can optimize time further to `O(n^2 log M)` at the cost of `O(n)` space.)

### Optimized Approach

The solution implements **Direct Pairwise Line Enumeration with Cross-Product Collinearity (`O(n^3)` time, `O(1)` space)**. Fix pairs `(i, j)` (`i < j`), start `cnt = 2`, scan only `k > j` (since any line's earliest two points `(i, j)` uniquely anchor all remaining points after `j`), and check `(y2 - y1) * (x3 - x1) == (y3 - y1) * (x2 - x1)`.

### Step-by-Step Thinking Process

1. Initialize `ans = 1` so the single-point edge case (`n = 1`) immediately returns `1` after the outer loops skip.
2. Notice that if a line contains `m` points at sorted indices `idx_1 < idx_2 < ... < idx_m`, when the outer two loops hit `i = idx_1` and `j = idx_2`, all remaining `m - 2` points on that line lie at indices `k > j`.
3. Therefore, the innermost loop only needs to start at `k = j + 1` rather than `0`, cutting constant-factor work by `6x` (`n(n-1)(n-2)/6` triplets).
4. Check collinearity with integer cross-multiplication `a = (y2 - y1) * (x3 - x1)` and `b = (y3 - y1) * (x2 - x1)` to handle vertical, horizontal, and diagonal lines uniformly without division.
5. Update `ans = Math.max(ans, cnt)` for every pair `(i, j)`.

### Algorithm / Intuition

In `maxPoints`, every line containing at least two points is uniquely represented when `(i, j)` matches the **first two points** of that line in array order. Starting `cnt = 2` and scanning `k = j + 1 .. n - 1` counts every subsequent point collinear with `(x1, y1)` and `(x2, y2)`. Even if later pairs `(i', j')` on the same line obtain smaller counts because they skip earlier indices, the maximum count was already captured at `(idx_1, idx_2)`. Cross-multiplying slope differences avoids `double` rounding errors and division-by-zero exceptions cleanly.

---

## Dry Run

Trace on **Example 1**: `points = [[1, 1], [2, 2], [3, 3]]`, `n = 3`

1. Initialize `ans = 1`.
2. **`i = 0` (`(1, 1)`), `j = 1` (`(2, 2)`):**
   - `cnt = 2`.
   - `k = 2` (`(3, 3)`):
     - `a = (2 - 1) * (3 - 1) = 1 * 2 = 2`
     - `b = (3 - 1) * (2 - 1) = 2 * 1 = 2`
     - `a == b` (`2 == 2`) -> `++cnt` -> `cnt = 3`.
   - `ans = Math.max(1, 3) = 3`.
3. **`i = 0` (`(1, 1)`), `j = 2` (`(3, 3)`):** `cnt = 2`, inner loop `k = 3 < 3` skips -> `ans = Math.max(3, 2) = 3`.
4. **`i = 1` (`(2, 2)`), `j = 2` (`(3, 3)`):** `cnt = 2`, inner loop `k = 3 < 3` skips -> `ans = Math.max(3, 2) = 3`.
5. Return `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^3)` — The three nested loops (`0 <= i < j < k < n`) evaluate `n * (n - 1) * (n - 2) / 6` point triplets, each doing `O(1)` integer arithmetic.
- **Space Complexity:** `O(1)` — Only scalar integer variables (`x1`, `y1`, `x2`, `y2`, `x3`, `y3`, `a`, `b`, `cnt`, `ans`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [149max-points-on-a-line.java](./149max-points-on-a-line.java) |

---

## Key Learnings

- Always prefer integer cross-multiplication `(y2 - y1) * (x3 - x1) == (y3 - y1) * (x2 - x1)` over floating-point division when testing 2D collinearity—just verify product bounds against 32-bit `int` overflow first!
- Restricting `k` to `j + 1 .. n - 1` works because the earliest two indices `(idx_1, idx_2)` on any optimal line will still encounter all `m - 2` remaining points after `idx_2`.
- If `n` were larger (e.g., `n <= 5000`), grouping slopes `(dy / g, dx / g)` reduced by `gcd` in a hash map per anchor `i` reduces time complexity from `O(n^3)` to `O(n^2 log(maxCoord))`.
