---
comments: true
difficulty: Hard
tags:
  - Array
  - Depth-First Search
  - Breadth-First Search
  - Matrix
  - Simulation
---

# 749. Contain Virus

**[View Problem on LeetCode](https://leetcode.com/problems/contain-virus/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0749` (`749`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Matrix`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

A virus is spreading rapidly, and your task is to quarantine the infected area by installing walls.

The world is modeled as an m x n binary grid isInfected, where isInfected[i][j] == 0 represents uninfected cells, and isInfected[i][j] == 1 represents cells contaminated with the virus. A wall (and only one wall) can be installed between any two 4-directionally adjacent cells, on the shared boundary.

Every night, the virus spreads to all neighboring cells in all four directions unless blocked by a wall. Resources are limited. Each day, you can install walls around only one region (i.e., the affected area (continuous block of infected cells) that threatens the most uninfected cells the following night). There will never be a tie.

Return the number of walls used to quarantine all the infected regions. If the world will become fully infected, return the number of walls used.

 
Example 1:


Input: isInfected = [[0,1,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]]
Output: 10
Explanation: There are 2 contaminated regions.
On the first day, add 5 walls to quarantine the viral region on the left. The board after the virus spreads is:

On the second day, add 5 walls to quarantine the viral region on the right. The virus is fully contained.



Example 2:


Input: isInfected = [[1,1,1],[1,0,1],[1,1,1]]
Output: 4
Explanation: Even though there is only one cell saved, there are 4 walls built.
Notice that walls are only built on the shared boundary of two different cells.


Example 3:


Input: isInfected = [[1,1,1,0,0,0,0,0,0],[1,0,1,0,1,1,1,1,1],[1,1,1,0,0,0,0,0,0]]
Output: 13
Explanation: The region on the left only builds two new walls.


 
Constraints:


	m == isInfected.length
	n == isInfected[i].length
	1 <= m, n <= 50
	isInfected[i][j] is either 0 or 1.
	There is always a contiguous viral region throughout the described process that will infect strictly more uncontaminated squares in the next round.

---

## Problem Understanding

- Disjoint infected regions threaten uninfected neighboring cells.
- In each round, we identify all infected clusters, count the unique uninfected cells each threatens, and install walls around the cluster threatening the most uninfected cells.
- The remaining unquarantined clusters spread by 1 cell in all 4 cardinal directions.
- Repeat until no virus threatens new cells.

---

## Approach

### Optimized Approach (Connected Components DFS Simulation)

1. In each cycle:
   - Run DFS from each unvisited infected cell (`1`) to find each connected component (`areas`), calculate wall perimeter (`c`), and collect threatened 0-cells (`boundaries`).
   - If no components exist, terminate.
2. Find index `idx` of the component with the largest `boundaries.size()`.
3. Add `c[idx]` to total walls `ans`.
4. Quarantine component `idx` by marking its cells as `-1` (permanently contained).
5. For all other components, spread infection by setting threatened 0-neighbors to `1`.
6. Repeat until all clusters are neutralized.

---

## Dry Run

Each iteration:
1. Find all active viral clusters.
2. Greedily quarantine the most threatening cluster (maximizing uninfected cells saved).
3. Expand remaining active clusters.
4. Stop when no threatened boundaries remain.

---

## Complexity Analysis

- **Time Complexity:** $O((M \times N)^2)$ worst-case simulation across grid of size $M \times N$.
- **Space Complexity:** $O(M \times N)$ for visited arrays, boundary sets, and recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [749contain-virus.java](./749contain-virus.java) |

---

## Key Learnings

- Breaking multi-agent grid simulation into distinct phases (Scan/Measure -> Greedy Quarantine -> Spread) prevents race conditions and state corruption.
- Tracking unique boundary coordinates using hash sets avoids double-counting shared threatened cells.
