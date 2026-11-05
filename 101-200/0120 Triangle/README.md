---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 120. Triangle

**[View Problem on LeetCode](https://leetcode.com/problems/triangle/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0120` (`120`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given a triangular 2D list of integers `triangle` where row `0` has `1` element, row `1` has `2` elements, and row `i` has `i + 1` elements, return the **minimum path sum** from the top (`triangle[0][0]`) down to the bottom row.

At each step from index `j` in row `i`, you may move only to index `j` or index `j + 1` in row `i + 1` directly below.

---

## Examples

### Example 1

```text
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
```

### Example 2

```text
Input: triangle = [[-10]]
Output: -10
```

---

## Constraints

- `1 <= triangle.length <= 200`

- `triangle[0].length == 1`

- `triangle[i].length == triangle[i - 1].length + 1`

- `-10^4 <= triangle[i][j] <= 10^4`

---

## Follow-up Questions

Could you do this using only `O(n)` extra space, where `n` is the total number of rows in the triangle?

While the current solution uses `O(n^2)` space with `int[][] f`, it can be compressed directly to **`O(n)` extra space** by replacing `f` with a 1D array `int[] f = new int[n + 1]`: iterating `j` left-to-right (`0 .. i`), `f[j] = Math.min(f[j], f[j + 1]) + triangle.get(i).get(j)` safely overwrites `f[j]` because `f[j]` is never needed by `j + 1` in the same row!

---

## Problem Understanding

- Moving **top-down** requires boundary checks at `j == 0` (no `j - 1` parent) and `j == i` (no `j` parent in row `i - 1`), plus a final scan to find the minimum across the last row.
- Moving **bottom-up** eliminates all of those special cases! From any cell `(i, j)`, both downward neighbors `(i + 1, j)` and `(i + 1, j + 1)` always exist, and the final answer lands directly at the apex `(0, 0)`.
- Values can be negative (`-10^4 <= triangle[i][j] <= 10^4`), so `0` is only valid as a base value *below* the bottom row.

---

## Approach

### Brute Force Approach

Exploring every top-to-bottom path via unmemoized DFS branches 2 ways at each of the `n - 1` row transitions, resulting in `O(2^n)` time complexity — completely infeasible for `n <= 200`.

### Optimized Approach

Compute a **bottom-up 2D Dynamic Programming** table `int[][] f = new int[n + 1][n + 1]` from row `n - 1` up to `0`, using the zero-initialized dummy row `f[n]` to avoid base-case branching.

### Step-by-Step Thinking Process

1. Let `n = triangle.size()`. Define `f[i][j]` as the minimum path sum starting at `(i, j)` and reaching the bottom of the triangle.
2. Allocate `int[][] f = new int[n + 1][n + 1]`. Because row `f[n]` defaults to `0`, row `n - 1` automatically computes `Math.min(0, 0) + triangle.get(n - 1).get(j)` without a separate initialization loop!
3. Iterate `i` from `n - 1` down to `0`, and `j` from `0` to `i`.
4. Set `f[i][j] = Math.min(f[i + 1][j], f[i + 1][j + 1]) + triangle.get(i).get(j)`.
5. Return `f[0][0]`, the minimum path sum starting from the top of the triangle.

### Algorithm / Intuition

In `minimumTotal(List<List<Integer>> triangle)`, padding `f` to `(n + 1) x (n + 1)` is an elegant implementation trick:
- Row `n` acts as a virtual floor of `0`s beneath the bottom row `n - 1`.
- On the first outer iteration (`i = n - 1`), `f[n - 1][j]` evaluates `Math.min(0, 0) + triangle.get(n - 1).get(j)`, copying the bottom row cleanly even when elements are negative.
- For every higher row `i`, `f[i][j]` picks the cheaper child path between `f[i + 1][j]` (down-left) and `f[i + 1][j + 1]` (down-right) and adds `triangle.get(i).get(j)`.
- When `i = 0` finishes, `f[0][0]` holds the global minimum path sum.

---

## Dry Run

Tracing Example 1 with `triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]` (`n = 4`):

- **Dummy row `f[4]`:** `[0, 0, 0, 0, 0]`
- **`i = 3` (`[4, 1, 8, 3]`):**
  - `f[3][0..3] = [4, 1, 8, 3]`
- **`i = 2` (`[6, 5, 7]`):**
  - `f[2][0] = min(4, 1) + 6 = 7`
  - `f[2][1] = min(1, 8) + 5 = 6`
  - `f[2][2] = min(8, 3) + 7 = 10`
- **`i = 1` (`[3, 4]`):**
  - `f[1][0] = min(7, 6) + 3 = 9`
  - `f[1][1] = min(6, 10) + 4 = 10`
- **`i = 0` (`[2]`):**
  - `f[0][0] = min(9, 10) + 2 = 11`

Returns `f[0][0] = 11` (corresponding to `2 -> 3 -> 5 -> 1`).

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Visits every one of the `1 + 2 + ... + n = n(n + 1) / 2` triangle elements once in `O(1)` time.
- **Space Complexity:** `O(n^2)` — Allocates an `(n + 1) x (n + 1)` integer matrix `f`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [120triangle.java](./120triangle.java) |

---

## Key Learnings

- Reversing a top-down tree/pyramid DP into a **bottom-up** convergence toward a single root `(0, 0)` eliminates edge-boundary checks (`j == 0`, `j == i`) and post-loop `min` scans.
- Adding a sentinel zero row `f[n]` avoids writing separate base-case initialization code while remaining 100% safe for negative grid values.
- Always verify index access order if compressing 2D DP to 1D.
