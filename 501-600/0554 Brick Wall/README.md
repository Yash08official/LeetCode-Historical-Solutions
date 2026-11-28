---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
---

# 554. Brick Wall

**[View Problem on LeetCode](https://leetcode.com/problems/brick-wall/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0554` (`554`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | Java |

---

## Problem Description

There is a rectangular brick wall in front of you with `n` rows of bricks. The `i^th` row has some number of bricks each of the same height (i.e., one unit) but they can be of different widths. The total width of each row is the same.

Draw a vertical line from the top to the bottom and cross the least bricks. If your line goes through the edge of a brick, then the brick is not considered as crossed. You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.

Given the 2D array `wall` that contains the information about the wall, return *the minimum number of crossed bricks after drawing such a vertical line*.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2025/01/17/a.png)

```
Input: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
Output: 2
```

### Example 2

```
Input: wall = [[1],[1],[1]]
Output: 3
```

 

**

---

## Constraints

**

	- `n == wall.length`

	- `1 <= n <= 10^4`

	- `1 <= wall[i].length <= 10^4`

	- `1 <= sum(wall[i].length) <= 2 * 10^4`

	- `sum(wall[i])` is the same for each row `i`.

	- `1 <= wall[i][j] <= 2^31 - 1`

---

## Problem Understanding

- Given a brick wall represented as rows of brick widths, find the minimum number of crossed bricks by drawing a vertical line from top to bottom (excluding the wall's left and right outer boundaries).

---

## Approach

### Optimized Approach (Brick Edge Prefix Frequency Map)
1. Crossing the minimum number of bricks is equivalent to passing through the maximum number of brick edges (cut lines).
2. For each row in `wall`, compute running prefix sum `s` of brick widths excluding the final brick in the row (the outer boundary).
3. Count edge frequencies in a hash map `cnt`.
4. Find the maximum frequency `mx` of aligned edges across all rows.
5. The answer is `wall.size() - mx`.

---

## Complexity Analysis

- **Time Complexity:** $O(B)$ where $B$ is the total number of bricks across all rows.
- **Space Complexity:** $O(W)$ where $W$ is the number of distinct edge positions.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [554brick-wall.java](./554brick-wall.java) |

---

## Key Learnings

- Duality transformation: minimizing cuts through brick bodies is equivalent to maximizing passes through brick boundaries.
