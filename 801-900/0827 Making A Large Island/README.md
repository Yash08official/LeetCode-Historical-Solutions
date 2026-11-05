---
comments: true
difficulty: Hard
tags:
  - Array
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Matrix
---

# 827. Making A Large Island

**[View Problem on LeetCode](https://leetcode.com/problems/making-a-large-island/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0827` (`827`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `n x n` binary matrix `grid` of `0`s (water) and `1`s (land). An **island** is a 4-directionally connected group of `1`s, and its size is the number of `1`s it contains.

You may flip **at most one** `0` cell to `1`. Return the area of the largest island achievable in `grid`.

---

## Examples

### Example 1

```text
Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
```

### Example 2

```text
Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
```

### Example 3

```text
Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.
```

---

## Constraints

- `n == grid.length`

- `n == grid[i].length`

- `1 <= n <= 500`

- `grid[i][j]` is either `0` or `1`.

---

## Problem Understanding

- Flipping a single `0` at `(i, j)` to `1` merges up to 4 neighboring islands into one connected component of size `1 + sum(distinct neighboring island sizes)`.
- Two neighbors of `(i, j)` (for example, up and right) might belong to the **same** existing island — we must deduplicate neighboring island IDs with a `Set` so we don't double-count an island's area!
- Edge case: if `grid` contains **no `0`s at all** (all `1`s), no flip happens and the answer is `n * n`, so we must initialize `ans` with the maximum existing island size.

---

## Approach

### Brute Force Approach

Flipping each `0` cell to `1` one by one and running a fresh `O(n^2)` DFS/BFS across the grid to measure the resulting island takes `O(n^4)` time in the worst case (`O(n^2)` zeros times `O(n^2)` per traversal), timing out for `n = 500` (`n^4 = 6.25 * 10^{10}`).

### Optimized Approach

Pre-label every existing connected island with a unique ID `root = 1, 2, ...` in `p[i][j]` and store its area in `cnt[root]` using DFS; then inspect every `0` cell, deduplicate the island IDs of its 4 neighbors in a `HashSet`, and take the maximum of `1 + sum(cnt[id])`.

### Step-by-Step Thinking Process

1. First pass: find all existing islands via `dfs(i, j)`, assigning each connected component a unique positive integer ID `root` (`1, 2, ...`) in `p[i][j]` and counting its cells in `cnt[root]`.
2. Update `ans = Math.max(ans, dfs(i, j))` during the first pass so grids with zero `0`s are already handled.
3. Notice water cells retain `p[x][y] == 0` and `cnt[0] == 0`.
4. Second pass: for every water cell (`grid[i][j] == 0`), collect `p[x][y]` of its valid 4-directional neighbors into a `HashSet<Integer> s`.
5. Sum `t = 1 + sum_{x in s} cnt[x]` (the flipped cell itself plus each distinct adjacent island's size) and update `ans = Math.max(ans, t)`.

### Algorithm / Intuition

In `largestIsland(int[][] grid)`:
- `p` (`n x n`) acts as an island-ID lookup table, and `cnt` (`n * n + 1`) maps each `root` ID to its exact cell count.
- Because `p[x][y] == 0` for water cells and `cnt[0] == 0`, inserting `p[x][y]` into `Set<Integer> s` without filtering out water neighbors is completely safe (`cnt[0]` adds `0` to `t`) and keeps the inner loop concise.
- Using `Set<Integer> s` ensures that if the same C-shaped island borders `(i, j)` from multiple sides, its `root` ID is added only once.

---

## Dry Run

Trace on **Example 1**: `grid = [[1, 0], [0, 1]]` (`n = 2`).

1. **Pass 1 (Label Islands)**:
   - `(0, 0)` is `1` (`p[0][0] == 0`): `++root -> 1`, `dfs(0, 0)` sets `p[0][0] = 1`, `cnt[1] = 1`, `ans = 1`.
   - `(1, 1)` is `1` (`p[1][1] == 0`): `++root -> 2`, `dfs(1, 1)` sets `p[1][1] = 2`, `cnt[2] = 1`, `ans = 1`.
   - Now `p = [[1, 0], [0, 2]]`, `cnt = [0, 1, 1, 0, 0]`.
2. **Pass 2 (Try Flipping Each `0`)**:
   - `(0, 1)`: neighbors `(1, 1)` (`p=2`) and `(0, 0)` (`p=1`) -> `s = {1, 2}` -> `t = 1 + cnt[1] + cnt[2] = 3` -> `ans = 3`.
   - `(1, 0)`: neighbors `(0, 0)` (`p=1`) and `(1, 1)` (`p=2`) -> `s = {1, 2}` -> `t = 3` -> `ans = 3`.

Returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Pass 1 visits each grid cell at most once in DFS, and Pass 2 does `O(1)` work (at most 4 neighbors) per `0` cell.
- **Space Complexity:** `O(n^2)` — Uses `O(n^2)` space for `p`, `cnt`, and worst-case DFS recursion stack depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [827making-a-large-island.java](./827making-a-large-island.java) |

---

## Key Learnings

- Precomputing connected component IDs and sizes reduces repeated 'what-if' grid queries from `O(n^2)` per query to `O(1)` per query.
- Deduplicating neighbor component IDs with a `Set` is essential whenever merging adjacent regions around a single cell.
- Keeping `ID = 0` with `cnt[0] = 0` for empty/water cells avoids extra conditional checks on neighbor lookups.
