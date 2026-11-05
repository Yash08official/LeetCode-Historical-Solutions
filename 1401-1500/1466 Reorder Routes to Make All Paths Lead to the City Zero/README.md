---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
---

# 1466. Reorder Routes to Make All Paths Lead to the City Zero

**[View Problem on LeetCode](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1466` (`1466`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Graph Theory` |
| **Solution Language** | JavaScript |

---

## Problem Description

There are `n` cities numbered `0` through `n - 1` connected by `n - 1` roads such that ignoring road directions forms a single connected **tree** (exactly one undirected path between any two cities). Currently, every road is one-way: `connections[i] = [a, b]` allows travel only from `a` to `b`.

Because city `0` is hosting a major event, you need **every** city to be able to reach city `0` along directed roads. Return the **minimum number of road directions** you must reverse to achieve this.

---

## Examples

### Example 1

```text
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
```

### Example 2

```text
Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
```

### Example 3

```text
Input: n = 3, connections = [[1,0],[2,0]]
Output: 0
```

---

## Constraints

- `2 <= n <= 5 * 10^4`

- `connections.length == n - 1`

- `connections[i].length == 2`

- `0 <= a_i, b_i <= n - 1`

- `a_i != b_i`

---

## Problem Understanding

Because the underlying network has `n` vertices and `n - 1` connected edges, it is a **tree**:
- If we root this tree at city `0`, every other city `v` has a **unique** path to `0`.
- There is no choice of route! For every city to reach `0`, every single tree edge must ultimately point **upward toward the root `0`** (from child to parent).
- Conversely, if we traverse the tree **outward from `0`** (from parent to child), any edge that originally pointed *outward* (`parent -> child`) is pointing the **wrong way** and must be reversed (`cost = 1`), whereas any edge that originally pointed *inward* (`child -> parent`) already points toward `0` (`cost = 0`).

---

## Approach

### Brute Force Approach

Attempting to check reachability to `0` from each of the `n` cities via repeated graph searches or trying to orient edges iteratively without rooting at `0` could take `O(n^2)` time. Recognizing the tree structure rooted at `0` collapses the problem to a single linear-time traversal.

### Optimized Approach

The solution builds a **0/1-weighted undirected adjacency list `g`** and runs a single **DFS rooted at city `0`**:
- For each directed connection `[a, b]` (`a -> b`), add `[b, 1]` to `g[a]` (traversing `a -> b` away from `0` means the original edge points away from `0` and costs `1` flip) and add `[a, 0]` to `g[b]` (traversing `b -> a` away from `0` means the original edge `a -> b` already points toward `0` and costs `0` flips).
- Run `dfs(0, -1)` passing the parent node `fa` to avoid revisiting ancestors, summing edge costs across the entire tree.

### Step-by-Step Thinking Process

1. Treat the `n - 1` directed roads as an undirected tree rooted at `0` so we can actually reach and inspect every city starting from `0`.
2. Encode each original road `a -> b` as two opposite adjacency entries with reversal costs: `g[a].push([b, 1])` (original direction goes away from where we came) and `g[b].push([a, 0])` (original direction goes back toward where we came).
3. Start `dfs(0, -1)` at capital city `0` with parent `-1`.
4. For each neighbor `[b, c]` of `a`, skip `b === fa` (the parent we just came from) and add `c + dfs(b, a)` to `ans`.
5. Return the total accumulated cost from `dfs(0, -1)`.

### Algorithm / Intuition

In `minReorder(n, connections)`, `g` stores `[neighbor, reversalCost]` pairs. Because the graph is a tree, tracking only the immediate parent `fa` in `dfs(a, fa)` (`if (b !== fa)`) suffices to prevent cycles — no `visited` array is needed! Every one of the `n - 1` tree edges is crossed **away from `0`** exactly once during the DFS: if that outward step matches the original `[a, b]` orientation (`c === 1`), that road points away from city `0` and contributes `1` to `ans`; otherwise (`c === 0`) it already points toward city `0`.

---

## Dry Run

Trace on **Example 1**: `n = 6`, `connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]`

1. **Adjacency List `g`**:
   - `0`: `[[1, 1], [4, 0]]`
   - `1`: `[[0, 0], [3, 1]]`
   - `2`: `[[3, 1]]`
   - `3`: `[[1, 0], [2, 0]]`
   - `4`: `[[0, 1], [5, 1]]`
   - `5`: `[[4, 0]]`
2. **DFS from `0` (`dfs(0, -1)`)**:
   - Edge `0 -> 1` (`c = 1`): original `[0, 1]` points away from `0` (+1). Call `dfs(1, 0)`:
     - Edge `1 -> 3` (`c = 1`): original `[1, 3]` points away from `0` (+1). Call `dfs(3, 1)`:
       - Edge `3 -> 2` (`c = 0`): original `[2, 3]` already points toward `3 -> 1 -> 0` (+0). `dfs(2, 3)` returns `0`.
     - `dfs(3, 1)` returns `0`; `dfs(1, 0)` returns `1 + 0 = 1`.
   - Branch `1` contributes `1 + 1 = 2`.
   - Edge `0 -> 4` (`c = 0`): original `[4, 0]` already points into `0` (+0). Call `dfs(4, 0)`:
     - Edge `4 -> 5` (`c = 1`): original `[4, 5]` points away from `4 -> 0` (+1). `dfs(5, 4)` returns `0`.
     - `dfs(4, 0)` returns `1 + 0 = 1`.
   - Branch `4` contributes `0 + 1 = 1`.

Total reversals = `2 + 1 = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Building the adjacency list processes `n - 1` edges, and `dfs` visits each of the `n` nodes and `n - 1` tree edges once.
- **Space Complexity:** `O(n)` — The adjacency list `g` stores `2(n - 1)` pairs, and the recursion stack uses up to `O(n)` frames in a skewed tree.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1466reorder-routes-to-make-all-paths-lead-to-the-city-zero.js](./1466reorder-routes-to-make-all-paths-lead-to-the-city-zero.js) |

---

## Key Learnings

- Converting directed edges into bidirectional edges with `1` / `0` directional weights is a classic graph modeling trick for edge-reversal and 0-1 BFS problems.
- When traversing an undirected tree via DFS, passing the parent parameter `fa` (`b !== fa`) eliminates the need for a separate `visited` boolean array.
