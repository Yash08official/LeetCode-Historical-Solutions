---
comments: true
difficulty: Hard
tags:
  - Array
  - Math
  - Geometry
  - Convex Hull
  - Polygons
---

# 587. Erect the Fence

**[View Problem on LeetCode](https://leetcode.com/problems/erect-the-fence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0587` (`587`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Math`, `Geometry`, `Convex Hull`, `Polygons` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `trees` where `trees[i] = [x_i, y_i]` represents the location of a tree in the garden.

Fence the entire garden using the minimum length of rope, as it is expensive. The garden is well-fenced only if **all the trees are enclosed**.

Return *the coordinates of trees that are exactly located on the fence perimeter*. You may return the answer in **any order**.

---

## Examples

### Example 1

```text
Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [[1,1],[2,0],[4,2],[3,3],[2,4]]
Explanation: All the trees will be on the perimeter of the fence except the tree at [2, 2], which will be inside the fence.
```

### Example 2

```text
Input: trees = [[1,2],[2,2],[4,2]]
Output: [[4,2],[2,2],[1,2]]
Explanation: The fence forms a line that passes through all the trees.
```

---

## Constraints

- `1 <= trees.length <= 3000`
- `trees[i].length == 2`
- `0 <= x_i, y_i <= 100`
- All the given positions are **unique**.

---

## Problem Understanding

- Finding the minimum perimeter fence enclosing a set of 2D points is the classical **Convex Hull** problem.
- Critical difference from standard convex hull: trees that lie strictly **collinear** along the boundary edges must also be included on the perimeter.
- If $n < 4$, all trees trivially lie on the perimeter.

---

## Approach

### Optimized Approach (Monotone Chain / Andrew's Algorithm)

1. Base case: If $n < 4$, return `trees`.
2. Sort trees primarily by $x$-coordinate, and secondarily by $y$-coordinate.
3. Compute the **lower hull**:
   - Iterate $i$ from $1$ to $n - 1$:
     - Use cross product: $	ext{cross}(p_1, p_2, p_3) = (p_2.x - p_1.x)(p_3.y - p_1.y) - (p_2.y - p_1.y)(p_3.x - p_1.x)$.
     - While $	ext{cross} < 0$ (indicating a clockwise turn / right turn violating convexity), pop the previous vertex and mark it unvisited.
     - Note that collinear points have $	ext{cross} == 0$, so using `< 0` retains collinear edge points!
     - Push $i$ onto stack and mark `vis[i] = true`.
4. Compute the **upper hull**:
   - Iterate $i$ from $n - 1$ down to $0$:
     - Skip if `vis[i]` is already part of the lower hull.
     - While $	ext{cross} < 0$, pop from stack.
     - Push $i$ onto stack.
5. Collect the vertices from the stack into `ans` (length `cnt - 1` because the starting vertex is touched at the end).

### Step-by-Step Thinking Process

1. Sort points lexicographically by coordinates.
2. Build lower hull from left to right.
3. Build upper hull from right to left.
4. Using `< 0` instead of `<= 0` in the cross-product check ensures collinear points on the convex hull boundary are retained.
5. Avoid duplicate vertices between lower and upper hulls via `vis[]` tracking.

### Algorithm / Intuition

Andrew's Monotone Chain algorithm partitions the convex hull into two halves (lower and upper chains), sweeping sorted points. The cross product of vectors $ec{BA} 	imes ec{CB}$ determines the turn direction; keeping all non-right turns ($	ext{cross} \ge 0$) naturally incorporates perimeter collinear points.

---

## Dry Run

Tracing **Example 2**: `trees = [[1, 2], [2, 2], [4, 2]]`, $n = 3$.
1. $n = 3 < 4$.
2. Directly returns `trees`: `[[1, 2], [2, 2], [4, 2]]`. Matches Example 2 output.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — Dominated by sorting $n$ points. Each point is pushed and popped from the monotonic hull stack at most twice ($O(n)$).
- **Space Complexity:** $O(n)$ — Stack array `stk` and boolean visited array `vis`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [587erect-the-fence.java](./587erect-the-fence.java) |

---

## Key Learnings

- Andrew's Monotone Chain algorithm is numerically stable and straightforward to adapt for inclusive collinear points by changing the turn condition from `<= 0` to `< 0`.
- Tracking visited points across the two sweep directions prevents duplicate corners in the convex hull output.
