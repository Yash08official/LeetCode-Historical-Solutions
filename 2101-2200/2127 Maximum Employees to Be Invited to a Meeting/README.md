---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Depth-First Search
  - Graph Theory
  - Topological Sort
  - Kosaraju's Algorithm
  - Tarjan's SCC Algorithm
---

# 2127. Maximum Employees to Be Invited to a Meeting

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2127` (`2127`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Depth-First Search`, `Graph Theory`, `Topological Sort`, `Kosaraju's Algorithm`, `Tarjan's SCC Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

A company wants to invite as many of its `n` employees (numbered `0` to `n - 1`) as possible to sit around a single large **circular** table.

You are given a **0-indexed** array `favorite` where `favorite[i]` (`favorite[i] != i`) is the favorite person of employee `i`. An employee will attend the meeting **if and only if** they are seated immediately adjacent (either to the left or to the right) to their favorite person.

Return the **maximum number of employees** that can be invited.

---

## Examples

### Example 1

```text
Input: favorite = [2,2,1,2]
Output: 3
Explanation:
The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
The maximum number of employees that can be invited to the meeting is 3.
```

### Example 2

```text
Input: favorite = [1,2,0]
Output: 3
Explanation:
Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
The seating arrangement will be the same as that in the figure given in example 1:
- Employee 0 will sit between employees 2 and 1.
- Employee 1 will sit between employees 0 and 2.
- Employee 2 will sit between employees 1 and 0.
The maximum number of employees that can be invited to the meeting is 3.
```

### Example 3

```text
Input: favorite = [3,0,1,4,1]
Output: 4
Explanation:
The above figure shows how the company will invite employees 0, 1, 3, and 4, and seat them at the round table.
Employee 2 cannot be invited because the two spots next to their favorite employee 1 are taken.
So the company leaves them out of the meeting.
The maximum number of employees that can be invited to the meeting is 4.
```

---

## Constraints

- `n == favorite.length`

- `2 <= n <= 10^5`

- `0 <= favorite[i] <= n - 1`

- `favorite[i] != i`

---

## Problem Understanding

- **Functional Graph Structure:** Direct an edge `i -> favorite[i]` for every employee `i`. Because every node has **out-degree exactly `1`** (and no self-loops since `favorite[i] != i`), each weakly connected component is a **pseudotree**: exactly **one directed cycle** of length `>= 2` with directed trees (chains) rooted on cycle vertices pointing *into* the cycle.
- **Two Distinct Seating Configurations Around a Circular Table:**
  1. **A Directed Cycle of Length `>= 3`:** If `k >= 3` employees form a cycle `u_1 -> u_2 -> ... -> u_k -> u_1`, they must occupy the entire circular table in order (`u_i` sits between `u_{i-1}` and `u_{i+1}`). No extra tree branch can attach because both neighbors of every `u_i` are already occupied, and no other component can share the table. Score = **maximum cycle length**.
  2. **Mutual Pairs (Cycles of Length `2`):** If `u` and `v` are each other's favorites (`u <-> v`), `u` already satisfies `v` and `v` already satisfies `u` using just **one** shared adjacency! That leaves `u`'s other side free to attach the **longest incoming chain** `... -> a_2 -> a_1 -> u`, and `v`'s other side free to attach the **longest incoming chain** `v <- b_1 <- b_2 <- ...`! Even better, each such linear block `[chain_u ... u, v ... chain_v]` is completely self-contained at its endpoints, so **all** mutual pairs (along with their two longest incoming arms) can be placed side-by-side around the circular table simultaneously!

---

## Approach

### Brute Force Approach

Trying subsets or permutations of `n` employees around the circular table and checking whether every seated employee sits next to `favorite[i]` takes `O(n! * n)` time, which only works for `n <= 10` whereas `n` can be `10^5`.

### Optimized Approach

Compute the answer as the maximum of two `O(n)` graph routines: `maxCycle(favorite)` (finding the largest directed cycle) and `topologicalSort(favorite)` (pruning non-cycle tree branches via Kahn's algorithm while propagating longest incoming chain lengths `dist[i]` into all 2-cycles `i == fa[fa[i]]` and summing them).

### Step-by-Step Thinking Process

1. Classify valid circular seating into two mutually exclusive cases: one big cycle of length `>= 3`, or the union of all 2-cycles (`i == fa[fa[i]]`) each extended by its two longest incoming non-cycle chains.
2. Implement `maxCycle(fa)`: walk unvisited chains using `boolean[] vis` and local list `cycle`; when hitting an already-visited node `j`, check if `j` appeared in the *current* walk `cycle` at index `k`, and if so update `ans = Math.max(ans, cycle.size() - k)`.
3. Implement `topologicalSort(fa)`: initialize `dist[i] = 1` for all nodes and compute `indeg` counts; enqueue all nodes with `indeg[i] == 0` (tree leaves).
4. During Kahn's BFS, peel off non-cycle nodes `i` and relax their parent's longest chain `dist[fa[i]] = Math.max(dist[fa[i]], dist[i] + 1)`, enqueueing `fa[i]` if `--indeg[fa[i]] == 0`.
5. Sum `dist[i]` over every node `i` belonging to a 2-cycle (`i == fa[fa[i]]`), which adds `dist[u] + dist[v]` for each mutual pair `{u, v}`, and return `Math.max(maxCycle, topologicalSort)`.

### Algorithm / Intuition

Let's examine how both helper methods work together cleanly:

1. **`maxCycle(int[] fa)`:** Starting from each unvisited node `i`, we record the path in `cycle` and mark `vis[j] = true` as we follow `j = fa[j]`. When `vis[j]` becomes `true`, either:
   - `j` was visited in an *earlier* outer-loop iteration (meaning our walk merged into an already-processed component), so `j` is not in `cycle` and the `for (int k ...)` scan safely does nothing; or
   - `j` was visited in *this* walk at `cycle.get(k) == j`, meaning `cycle[k .. cycle.size() - 1]` is the exact newly discovered cycle of length `cycle.size() - k`!
2. **`topologicalSort(int[] fa)`:** Every node initially has `dist[i] = 1` (counting itself). Kahn's algorithm strips away all directed tree nodes pointing into cycles while never popping cycle nodes (since cycle nodes maintain `indeg >= 1`). Each stripped node `i` updates `dist[fa[i]] = Math.max(dist[fa[i]], dist[i] + 1)`. Once the queue empties, for any mutual pair `u <-> v` (`u == fa[fa[u]]`), `dist[u]` equals `1` plus the length of the longest tree branch ending at `u` (excluding `v`, since `v` was never popped from `q`!), and `dist[v]` equals `1` plus the longest branch ending at `v`. Summing `dist[i]` for all `i` with `i == fa[fa[i]]` totals all augmented 2-cycle blocks.

---

## Dry Run

Trace on **Example 1**: `favorite = [2, 2, 1, 2]` (`n = 4`).

1. **`maxCycle([2, 2, 1, 2])`:**
   - `i = 0`: walk `0 -> 2 -> 1 -> 2` (`vis[2]` is already `true`). `cycle = [0, 2, 1]`, stops at `j = 2`.
   - Scan `cycle`: `cycle.get(1) == 2`, so cycle length = `3 - 1 = 2` -> `ans = 2`.
   - `i = 1, 2`: already `vis == true` -> skipped.
   - `i = 3`: walk `3 -> 2` (`vis[2]` is `true`). `cycle = [3]`, `j = 2` is not in `cycle` -> `ans` stays `2`.
   - `maxCycle` returns `2`.
2. **`topologicalSort([2, 2, 1, 2])`:**
   - `indeg = [0, 1, 3, 0]`, `dist = [1, 1, 1, 1]`.
   - Initial queue `q = [0, 3]` (leaves with `indeg == 0`).
   - Poll `0` (`fa[0] = 2`): `dist[2] = max(1, 1 + 1) = 2`; `--indeg[2]` becomes `2` (`!= 0`).
   - Poll `3` (`fa[3] = 2`): `dist[2] = max(2, 1 + 1) = 2`; `--indeg[2]` becomes `1` (`!= 0`).
   - Queue is empty. Final `dist = [1, 1, 2, 1]`.
   - Sum `dist[i]` where `i == fa[fa[i]]`:
     - `i = 0`: `fa[fa[0]] = fa[2] = 1 != 0`
     - `i = 1`: `fa[fa[1]] = fa[2] = 1 == 1` -> `ans += dist[1] (1)` -> `ans = 1`
     - `i = 2`: `fa[fa[2]] = fa[1] = 2 == 2` -> `ans += dist[2] (2)` -> `ans = 3`
     - `i = 3`: `fa[fa[3]] = fa[2] = 1 != 3`
   - `topologicalSort` returns `3` (corresponding to seating `[0, 2, 1]` or `[3, 2, 1]`).
3. **Final Answer:** `Math.max(2, 3) = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Both `maxCycle` (which marks each node visited once and scans each local `cycle` list once) and `topologicalSort` (Kahn's BFS over `n` nodes and `n` edges) run in `O(n)` time.
- **Space Complexity:** `O(n)` — Auxiliary arrays `vis`, `indeg`, `dist`, list `cycle`, and queue `q` each take `O(n)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2127maximum-employees-to-be-invited-to-a-meeting.java](./2127maximum-employees-to-be-invited-to-a-meeting.java) |

---

## Key Learnings

- A graph where every vertex has out-degree `1` is a **functional graph (pseudoforest)**: every connected component has exactly one cycle with incoming trees.
- Kahn's topological sort on a functional graph is an elegant way to strip all incoming trees and compute longest tree depths into cycle vertices via DP (`dist[fa[i]] = max(dist[fa[i]], dist[i] + 1)`) without ever needing to reverse the graph edges!
- Notice why 2-cycles behave fundamentally differently from `>= 3`-cycles: a 2-cycle uses only one adjacency between `u` and `v`, leaving two open ends to attach chains and combine multiple blocks.
