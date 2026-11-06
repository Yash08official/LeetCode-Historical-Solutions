---
comments: true
difficulty: Hard
tags:
  - Array
  - Breadth-First Search
  - Heap (Priority Queue)
  - Matrix
---

# 675. Cut Off Trees for Golf Event

**[View Problem on LeetCode](https://leetcode.com/problems/cut-off-trees-for-golf-event/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0675` (`675`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Heap (Priority Queue)`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an `m x n` matrix. In this matrix:

- `0` means the cell cannot be walked through.
- `1` represents an empty cell that can be walked through.
- A number greater than `1` represents a tree in a cell that can be walked through, and this number is the tree's height.

In one step, you can walk in any of the four directions: north, east, south, and west. If you are standing in a cell with a tree, you can choose whether to cut it off.

You must cut off the trees in order from shortest to tallest. When you cut off a tree, the value at its cell becomes `1` (an empty cell).

Starting from `(0, 0)`, return the minimum steps you need to walk to cut off all the trees. If you cannot cut off all the trees, return `-1`.

---

## Examples

### Example 1

```text
Input: forest = [[1,2,3],[0,0,4],[7,6,5]]
Output: 6
Explanation: Following the path (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (2,1) -> (2,0) allows cutting trees in order 2, 3, 4, 5, 6, 7.
```

### Example 2

```text
Input: forest = [[1,2,3],[0,0,0],[7,6,5]]
Output: -1
Explanation: Trees in the bottom row cannot be reached due to obstacles.
```

---

## Constraints

- `m == forest.length`
- `n == forest[i].length`
- `1 <= m, n <= 50`
- `0 <= forest[i][j] <= 10^9`

---

## Problem Understanding

- Trees must be cut strictly in ascending order of their heights.
- Cutting a tree does not block the cell; it simply turns it into a walkable empty cell (`1`).
- Thus, the total minimum steps is the sum of the shortest paths between consecutive trees in the sorted list, beginning at $(0, 0)$.

---

## Approach

### Optimized Approach (Sorting + Sequential BFS)

1. Collect all tree cells $(i, j)$ with `forest[i][j] > 1` and sort them in ascending order of height.
2. Initialize starting position $(sx, sy) = (0, 0)$ and `ans = 0`.
3. For each tree $(tx, ty)$ in the sorted order:
   - Run a Breadth-First Search (BFS) to find the shortest distance from $(sx, sy)$ to $(tx, ty)$.
   - If the target is unreachable (BFS returns `-1`), return `-1`.
   - Add the step count to `ans`.
   - Update current position $(sx, sy) = (tx, ty)$.
4. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(T \cdot (m \cdot n))$ — Where $T \le m \cdot n$ is the number of trees (at most $2500$). Each BFS traverses at most $m \cdot n$ cells.
- **Space Complexity:** $O(m \cdot n)$ — For the BFS queue and visited matrix.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [675cut-off-trees-for-golf-event.java](./675cut-off-trees-for-golf-event.java) |

---

## Key Learnings

- Decoupling a global multi-target path problem into independent shortest-path segments simplifies graph exploration.
- Standard BFS guarantees the shortest path on unweighted grid graphs.
