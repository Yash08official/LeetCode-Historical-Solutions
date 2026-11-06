---
comments: true
difficulty: Hard
tags:
  - Array
  - Segment Tree
  - Ordered Set
---

# 699. Falling Squares

**[View Problem on LeetCode](https://leetcode.com/problems/falling-squares/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0699` (`699`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Segment Tree`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

There are several squares being dropped onto the X-axis of a 2D plane.

You are given a 2D integer array `positions` where `positions[i] = [left_i, sideLength_i]` represents the $i^{	ext{th}}$ square with a side length of `sideLength_i` that is dropped with its left edge aligned with X-coordinate `left_i`.

Each square falls downward until it lands on the top side of another square or on the X-axis. A square brushing the left/right side of another square does not count as landing on it. Once it lands, it freezes in place.

After each square is dropped, you must record the height of the current tallest stack of squares.

Return an integer array `ans` where `ans[i]` represents the height described above after dropping the $i^{	ext{th}}$ square.

---

## Examples

### Example 1

```text
Input: positions = [[1,2],[2,3],[6,1]]
Output: [2,5,5]
Explanation:
Drop square 1 at [1, 2] -> height becomes 2.
Drop square 2 at [2, 3] -> lands on square 1, height becomes 2 + 3 = 5.
Drop square 3 at [6, 1] -> lands on X-axis, height is 1, max remains 5.
```

### Example 2

```text
Input: positions = [[100,100],[200,100]]
Output: [100,100]
Explanation:
Drop 1 at [100, 100] -> height 100.
Drop 2 at [200, 100] -> brushes edge at x=200, lands on X-axis with height 100.
```

---

## Constraints

- `1 <= positions.length <= 1000`
- `1 <= left_i <= 10^8`
- `1 <= sideLength_i <= 10^6`

---

## Problem Understanding

- Each dropped square covers an open interval $[l, r) = [left, left + sideLength)$, corresponding to integer endpoints $[l, r - 1]$.
- Landing height equals the maximum current height over interval $[l, r - 1]$ plus $sideLength$.
- We then update the height of all points in $[l, r - 1]$ to this new height.
- Coordinates extend up to $10^8 + 10^6 pprox 10^9$, requiring a **Dynamic Segment Tree with Lazy Propagation**.

---

## Approach

### Optimized Approach (Dynamic Segment Tree with Lazy Propagation)

1. Use a dynamic segment tree covering range $[1, 10^9]$. Nodes are instantiated dynamically on demand during traversal.
2. For each square `[left, sideLength]`:
   - Define interval $[l, r] = [left, left + sideLength - 1]$.
   - Query the maximum height in $[l, r]$ via `tree.query(l, r)`.
   - Calculate new height $h = 	ext{query}(l, r) + sideLength$.
   - Update running maximum `mx = Math.max(mx, h)` and record it.
   - Range-update $[l, r]$ to $h$ via `tree.modify(l, r, h)`.
3. Return recorded list of maximum heights.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log C)$ — Where $N \le 1000$ and $C = 10^9$. Each query and modification traverses $O(\log C) pprox 30$ levels in the segment tree. Total time $< 20$ ms.
- **Space Complexity:** $O(N \log C)$ — Dynamically created nodes allocate memory only along active paths.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [699falling-squares.java](./699falling-squares.java) |

---

## Key Learnings

- Dynamic segment trees allow handling massive coordinate ranges ($10^9$) without coordinate discretization overhead.
- Careful definition of closed intervals $[left, left + sideLength - 1]$ prevents false collisions on boundaries.
