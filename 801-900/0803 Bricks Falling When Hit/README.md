---
comments: true
difficulty: Hard
tags:
  - Array
  - Union-Find
  - Matrix
---

# 803. Bricks Falling When Hit

**[View Problem on LeetCode](https://leetcode.com/problems/bricks-falling-when-hit/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0803` (`803`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Union-Find`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` binary `grid`, where each `1` represents a brick and `0` represents an empty space. A brick is **stable** if:
- It is directly connected to the top of the grid, or
- At least one other four-directionally adjacent brick is **stable**.

You are also given an array `hits` where `hits[i] = [row_i, col_i]` represents the brick to be erased at the `i`-th step.

Return an array `ans` where each `ans[i]` is the number of bricks that will fall after the `i`-th erasure is applied.

---

## Problem Understanding

- Directly simulating forward removal causes disconnections that require expensive graph connectivity recalculations.
- By **reversing time** (processing hits from the last to the first), brick deletions become brick additions.
- Connecting components and tracking component sizes dynamically is the canonical use case for **Disjoint Set Union (Union-Find)**.

---

## Approach

### Reverse Time + Disjoint Set Union (DSU)

1. **Virtual Ceiling Node:** Add a virtual node at index $m 	imes n$ representing the stable top row of the grid. Any brick connected to this virtual node is stable.
2. **Initial State (After All Hits):** Copy the grid and remove all bricks specified in `hits`.
3. **Build Components:**
   - Connect all remaining bricks in row `0` to the virtual ceiling node.
   - Connect adjacent remaining bricks throughout the grid using `union`.
4. **Reconstruct Backward:**
   - Iterate through `hits` in reverse order from $k = 	ext{hits.length} - 1$ down to $0$.
   - If the cell was originally empty (`grid[i][j] == 0`), no brick fell (`ans[k] = 0`).
   - Restore the brick `g[i][j] = 1`.
   - Measure the size of the stable component connected to the ceiling before adding connections (`prev`).
   - If the restored brick is on row 0, connect it to the ceiling node.
   - Connect it to all adjacent remaining valid bricks.
   - Measure the new size of the ceiling component (`curr`).
   - The number of fallen bricks is $\max(0, curr - prev - 1)$ (subtracting 1 for the restored brick itself).

---

## Complexity Analysis

- **Time Complexity:** $O((m \cdot n + q) \cdot lpha(m \cdot n))$ where $q$ is the number of hits and $lpha$ is the inverse Ackermann function.
- **Space Complexity:** $O(m \cdot n)$ for the DSU parent and component size arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [803bricks-falling-when-hit.java](./803bricks-falling-when-hit.java) |

---

## Key Learnings

- Offline reverse-time processing turns dynamic destruction problems into constructive connectivity problems easily handled by DSU.
- A virtual anchor node cleanly represents universal boundary stability (e.g. ceiling attachment).
