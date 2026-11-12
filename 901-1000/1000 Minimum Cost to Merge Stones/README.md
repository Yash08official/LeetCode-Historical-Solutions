---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Prefix Sum
---

# 1000. Minimum Cost to Merge Stones

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-cost-to-merge-stones/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1000` |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

There are `n` piles of `stones` arranged in a row. The `i`-th pile has `stones[i]` stones.

A move consists of merging exactly `k` consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these `k` piles.

Return the minimum cost to merge all piles of stones into one pile. If it is impossible, return `-1`.

---

## Problem Understanding

- Each merge operation reduces the total number of piles by $k - 1$.
- To end up with exactly $1$ pile, the total reduction must be $n - 1$.
- Hence, a solution is possible if and only if $(n - 1) \pmod{(k - 1)} == 0$.
- Because merges are done on consecutive subarrays, this is an **Interval Dynamic Programming** problem.

---

## Approach

### 3D Interval Dynamic Programming

1. **Parity Check:** If $(n - 1) \pmod{(K - 1)} 
eq 0$, return `-1` immediately.
2. **Prefix Sums:** Compute array $s$ where $s[i] = \sum_{m=0}^{i-1} stones[m]$ for $O(1)$ range sum queries.
3. **DP State:** Let $f[i][j][k]$ represent the minimum cost to merge subarray $stones[i \dots j]$ into $k$ piles.
4. **Base Case:** For each single pile ($l = 1$), $f[i][i][1] = 0$, all other entries initialized to infinity.
5. **Transitions:**
   - Iterate interval length $l$ from $2$ to $n$:
   - For interval $[i \dots j]$ where $j = i + l - 1$:
     - For $k \in [2 \dots K]$:
       $$f[i][j][k] = \min_{i \le h < j} (f[i][h][1] + f[h+1][j][k-1])$$
     - Merging $K$ piles into $1$ pile adds the sum of all elements in the interval:
       $$f[i][j][1] = f[i][j][K] + (s[j] - s[i-1])$$
6. Return $f[1][n][1]$.

---

## Complexity Analysis

- **Time Complexity:** $O(n^3 \cdot K)$ — Iterating over all intervals $O(n^2)$, split points $O(n)$, and pile counts $K$.
- **Space Complexity:** $O(n^2 \cdot K)$ for the 3D DP table.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1000minimum-cost-to-merge-stones.java](./1000minimum-cost-to-merge-stones.java) |

---

## Key Learnings

- Feasibility of $K$-ary tree merges depends strictly on $(n - 1) \pmod{K - 1} == 0$.
- Subproblem decomposition into $k$ piles allows clean transitions in interval DP before performing the final 1-pile reduction.
