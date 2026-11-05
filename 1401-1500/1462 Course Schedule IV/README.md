---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
  - Topological Sort
---

# 1462. Course Schedule IV

**[View Problem on LeetCode](https://leetcode.com/problems/course-schedule-iv/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1462` (`1462`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Graph Theory`, `Topological Sort` |
| **Solution Language** | Java |

---

## Problem Description

There are `numCourses` courses to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that course `a_i` must be taken before course `b_i` (a direct prerequisite).

You are also given an array `queries` where `queries[j] = [u_j, v_j]`. For each query, determine whether course `u_j` is a prerequisite (either direct or indirect) of course `v_j`.

Return a boolean list `ans` where `ans[j]` is the answer to the `j`-th query. The prerequisite graph has no cycles.

---

## Examples

### Example 1

```text
Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
Output: [false,true]
Explanation: The pair [1, 0] indicates that you have to take course 1 before you can take course 0.
Course 0 is not a prerequisite of course 1, but the opposite is true.
```

### Example 2

```text
Input: numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]
Output: [false,false]
Explanation: There are no prerequisites, and each course is independent.
```

### Example 3

```text
Input: numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
Output: [true,true]
```

---

## Constraints

- `2 <= numCourses <= 100`

- `0 <= prerequisites.length <= (numCourses * (numCourses - 1) / 2)`

- `prerequisites[i].length == 2`

- `0 <= a_i, b_i <= numCourses - 1`

- `a_i != b_i`

- All the pairs `[a_i, b_i]` are **unique**.

- The prerequisites graph has no cycles.

- `1 <= queries.length <= 10^4`

- `0 <= u_i, v_i <= numCourses - 1`

- `u_i != v_i`

---

## Problem Understanding

Key observations:
- Directed Acyclic Graph (DAG) with `numCourses` vertices where `2 <= numCourses <= 100`.
- The prerequisite relationship is transitive: if `u` is a prerequisite of `w` and `w` is a prerequisite of `v`, then `u` is a prerequisite of `v`.
- Queries can be frequent (`queries.length <= 10^4`), but `numCourses <= 100` is small.
- Precomputing all-pairs reachability (transitive closure) allows each query to be answered in `O(1)` time.

---

## Approach

### Brute Force Approach

For each query `[u, v]`, execute a BFS or DFS starting from `u` to see if `v` can be reached. With `Q = 10^4` queries, this takes `O(Q * (V + E))` time. For `V = 100` and `E <= 4950`, this approach would perform up to `5 * 10^7` operations.

### Optimized Approach

Floyd-Warshall transitive closure. Create an `n x n` boolean reachability matrix `f`. Initialize `f[a][b] = true` for all direct prerequisites `[a, b]`. Then run Floyd-Warshall with three nested loops `k`, `i`, `j` to compute `f[i][j] |= (f[i][k] && f[k][j])`. Each query `[u, v]` can then be answered in `O(1)` by looking up `f[u][v]`.

### Step-by-Step Thinking Process

1. Note `numCourses <= 100`, which makes an `O(n^3)` all-pairs reachability algorithm optimal.
2. Initialize a 2D boolean array `f[n][n]` to record reachability between any pair of courses.
3. Mark all direct edges from `prerequisites` as `true` in `f`.
4. Apply the Floyd-Warshall algorithm: for every intermediate vertex `k`, check if course `i` reaches `k` and `k` reaches `j`.
5. Answer each query `[u, v]` in `O(1)` using `f[u][v]` and append the result to `ans`.

### Algorithm / Intuition

The Java method `checkIfPrerequisite(int n, int[][] prerequisites, int[][] queries)`:
- Allocates `boolean[][] f = new boolean[n][n]`.
- Iterates through `prerequisites` setting `f[p[0]][p[1]] = true`.
- Runs three nested loops:
  ```java
  for (int k = 0; k < n; ++k) {
      for (int i = 0; i < n; ++i) {
          for (int j = 0; j < n; ++j) {
              f[i][j] |= f[i][k] && f[k][j];
          }
      }
  }
  ```
- Loops over `queries` and appends `f[q[0]][q[1]]` to `ans`.
- Returns `ans`.

---

## Dry Run

Walkthrough on Example 1: `numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]`.
- Matrix `f` of size `2 x 2` initialized to `false`.
- Direct edge: `f[1][0] = true`.
- Floyd-Warshall loops over `k = 0, 1`: no multi-hop paths exist.
- Query 0: `[0, 1]` -> `f[0][1]` is `false`.
- Query 1: `[1, 0]` -> `f[1][0]` is `true`.
- Output: `[false, true]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^3 + Q)` — Computing the transitive closure via Floyd-Warshall takes `O(n^3)` time (`100^3 = 10^6` operations). Answering `Q` queries takes `O(Q)` time with `O(1)` lookup each.
- **Space Complexity:** `O(n^2)` — The 2D boolean matrix `f` of size `n x n` requires `O(n^2)` space (excluding the returned list `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1462course-schedule-iv.java](./1462course-schedule-iv.java) |

---

## Key Learnings

- For dense reachability queries on graphs with small vertex counts (`V <= 100`), Floyd-Warshall transitive closure is cleaner and faster than repeated traversals.
- In Floyd-Warshall, the intermediate node loop (`k`) must always be the outermost loop.
