---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Heap (Priority Queue)
  - Matrix
---

# 778. Swim in Rising Water

**[View Problem on LeetCode](https://leetcode.com/problems/swim-in-rising-water/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0778` (`778`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Heap (Priority Queue)`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).

It starts raining, and water gradually rises over time. At time t, the water level is t, meaning any cell with elevation less than equal to t is submerged or reachable.

You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return the minimum time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).

 
Example 1:


Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.


Example 2:


Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation: The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.


 
Constraints:


	n == grid.length
	n == grid[i].length
	1 <= n <= 50
	0 <= grid[i][j] < n2
	Each value grid[i][j] is unique.

---

## Problem Understanding

- In an $N \times N$ grid with elevation permutations $0$ to $N^2 - 1$, water level rises to $t$ at time $t$.
- We can swim between adjacent cells if both cells have elevation $\le t$.
- We seek the minimum time $t$ such that $(0,0)$ and $(N-1, N-1)$ are connected.

---

## Approach

### Optimized Approach (Kruskal-Style Union-Find by Elevation)

1. Pre-sort all cells by elevation: since grid values are a permutation of $0..N^2-1$, map `hi[val] = (r * n + c)`.
2. Initialize DSU for $N^2$ cells.
3. Iterate time $t$ from $0$ to $N^2 - 1$:
   - Cell $(x, y) = hi[t]$ becomes accessible.
   - For each 4-directional neighbor $(nx, ny)$:
     - If neighbor elevation is $\le t$, union $(x, y)$ with $(nx, ny)$.
   - Check if `find(0) == find(N^2 - 1)`. If connected, return $t$.
4. Return $0$.

---

## Dry Run

For a 2x2 grid `[[0, 2], [1, 3]]`:
- $t=0$: cell $(0,0)$ unlocked.
- $t=1$: cell $(1,0)$ unlocked. Neighbors: $(0,0)$ has elev $0 \le 1$ -> union $(0,0)$ and $(1,0)$.
- $t=2$: cell $(0,1)$ unlocked. Union with $(0,0)$.
- $t=3$: cell $(1,1)$ unlocked. Union with $(1,0)$ and $(0,1)$. $(0,0)$ and $(1,1)$ are connected -> return 3.

---

## Complexity Analysis

- **Time Complexity:** $O(N^2 \alpha(N^2))$ — Almost linear in number of grid cells.
- **Space Complexity:** $O(N^2)$ for DSU and coordinate lookup arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [778swim-in-rising-water.java](./778swim-in-rising-water.java) |

---

## Key Learnings

- Permutation grids allow direct bucket-indexing without explicit sorting ($O(N^2)$ instead of $O(N^2 \log N)$).
- Modeling water rise as incremental edge additions turns minimax pathfinding into standard connectivity queries.
