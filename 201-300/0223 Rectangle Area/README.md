---
comments: true
difficulty: Medium
tags:
  - Math
  - Geometry
---

# 223. Rectangle Area

**[View Problem on LeetCode](https://leetcode.com/problems/rectangle-area/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0223` (`223`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Geometry` |
| **Solution Language** | Java |

---

## Problem Description

Given the coordinates of two **rectilinear** rectangles in a 2D plane, return *the total area covered by the two rectangles*.

The first rectangle is defined by its **bottom-left** corner `(ax1, ay1)` and its **top-right** corner `(ax2, ay2)`.

The second rectangle is defined by its **bottom-left** corner `(bx1, by1)` and its **top-right** corner `(bx2, by2)`.

---

## Examples

### Example 1

```text
**Input:** ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
**Output:** 45
```

### Example 2

```text
**Input:** ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
**Output:** 16
```

 

**

---

## Constraints

**

	
- `-10^4 <= ax1 <= ax2 <= 10^4`
	
- `-10^4 <= ay1 <= ay2 <= 10^4`
	
- `-10^4 <= bx1 <= bx2 <= 10^4`
	
- `-10^4 <= by1 <= by2 <= 10^4`

---

## Problem Understanding

- Given two axis-aligned rectangles in 2D, return the total area covered by both rectangles.

---

## Approach

### Optimized Approach (Inclusion-Exclusion Geometry)
1. Compute individual areas `a` and `b`.
2. Compute overlap interval along X: `width = Math.min(ax2, bx2) - Math.max(ax1, bx1)` and along Y: `height = Math.min(ay2, by2) - Math.max(ay1, by1)`.
3. Clamp non-overlapping dimensions to `0` and return `a + b - Math.max(height, 0) * Math.max(width, 0)`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ — Constant arithmetic operations.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [223rectangle-area.java](./223rectangle-area.java) |

---

## Key Learnings

- 2D rectangle intersection decomposes cleanly into two independent 1D interval intersections.
