---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Binary Search
  - Reservoir Sampling
  - Prefix Sum
  - Ordered Set
  - Randomized
---

# 497. Random Point in Non-overlapping Rectangles

**[View Problem on LeetCode](https://leetcode.com/problems/random-point-in-non-overlapping-rectangles/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0497` (`497`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Binary Search`, `Reservoir Sampling`, `Prefix Sum`, `Ordered Set`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of non-overlapping axis-aligned rectangles `rects` where `rects[i] = [a_i, b_i, x_i, y_i]` indicates that `(a_i, b_i)` is the bottom-left corner point of the `i^th` rectangle and `(x_i, y_i)` is the top-right corner point of the `i^th` rectangle. Design an algorithm to pick a random integer point inside the space covered by one of the given rectangles. A point on the perimeter of a rectangle is included in the space covered by the rectangle.

Any integer point inside the space covered by one of the given rectangles should be equally likely to be returned.

**Note** that an integer point is a point that has integer coordinates.

Implement the `Solution` class:

	
- `Solution(int[][] rects)` Initializes the object with the given rectangles `rects`.
	
- `int[] pick()` Returns a random integer point `[u, v]` inside the space covered by one of the given rectangles.

---

## Examples

### Example 1

```text
**Input**
["Solution", "pick", "pick", "pick", "pick", "pick"]
[[[[-2, -2, 1, 1], [2, 2, 4, 6]]], [], [], [], [], []]
**Output**
[null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]

**Explanation**
Solution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
solution.pick(); // return [1, -2]
solution.pick(); // return [1, -1]
solution.pick(); // return [-1, -2]
solution.pick(); // return [-2, -2]
solution.pick(); // return [0, 0]
```

 

**

---

## Constraints

**

	
- `1 <= rects.length <= 100`
	
- `rects[i].length == 4`
	
- `-10^9 <= a_i < x_i <= 10^9`
	
- `-10^9 <= b_i < y_i <= 10^9`
	
- `x_i - a_i <= 2000`
	
- `y_i - b_i <= 2000`
	
- All the rectangles do not overlap.
	
- At most `10^4` calls will be made to `pick`.

---

## Problem Understanding

- Uniformly sample an integer lattice point across a list of non-overlapping axis-aligned rectangles.

---

## Approach

### Optimized Approach (Lattice-Point Prefix Sum + Binary Search)
1. Count integer points in each rectangle `(x2 - x1 + 1) * (y2 - y1 + 1)` and build prefix sum array `s`.
2. On `pick()`, draw `v` in `[1, s[n]]`, binary search `s` to select rectangle `rect` proportional to its lattice-point count, then uniformly pick `(x, y)` inside `rect`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ constructor, $O(\log n)$ per `pick()`.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [497random-point-in-non-overlapping-rectangles.java](./497random-point-in-non-overlapping-rectangles.java) |

---

## Key Learnings

- Weighting by inclusive lattice points `(w + 1) * (h + 1)` rather than geometric area `w * h` ensures true uniform sampling over integer coordinates.
