---
comments: true
difficulty: Hard
tags:
  - Tree
  - Depth-First Search
---

# 2872. Maximum Number of K-Divisible Components

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-number-of-k-divisible-components/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2872` (`2872`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Tree`, `Depth-First Search` |
| **Solution Language** | Java |

---

## Problem Description

We are given an undirected tree with `n` nodes labeled `0` to `n - 1`, represented by an edge list `edges`. Each node `i` has an assigned integer value `values[i]`. We are also given an integer `k`.

We are guaranteed that the sum of all node values in the entire tree is divisible by `k`.

A **valid split** of the tree is obtained by removing zero or more edges such that in every resulting connected component, the sum of values of its nodes is divisible by `k`.

We need to return the **maximum number of components** possible in any valid split.

---

## Examples

### Example 1

```text
Input: n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
Output: 2
Explanation: We remove the edge connecting node 1 with 2. The resulting split is valid because:
- The value of the component containing nodes 1 and 3 is values[1] + values[3] = 12.
- The value of the component containing nodes 0, 2, and 4 is values[0] + values[2] + values[4] = 6.
It can be shown that no other valid split has more than 2 connected components.
```

### Example 2

```text
Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
Output: 3
Explanation: We remove the edge connecting node 0 with 2, and the edge connecting node 0 with 1. The resulting split is valid because:
- The value of the component containing node 0 is values[0] = 3.
- The value of the component containing nodes 2, 5, and 6 is values[2] + values[5] + values[6] = 9.
- The value of the component containing nodes 1, 3, and 4 is values[1] + values[3] + values[4] = 6.
It can be shown that no other valid split has more than 3 connected components.
```

---

## Constraints

- `1 <= n <= 3 * 10^4`

- `edges.length == n - 1`

- `edges[i].length == 2`

- `0 <= a_i, b_i < n`

- `values.length == n`

- `0 <= values[i] <= 10^9`

- `1 <= k <= 10^9`

- Sum of `values` is divisible by `k`.

- The input is generated such that `edges` represents a valid tree.

---

## Problem Understanding

Key observations:
- The graph is a tree (connected, acyclic, $n - 1$ edges).
- Total sum of all nodes is a multiple of $k$.
- In any tree, removing $C - 1$ edges splits the tree into $C$ connected components.
- If any subtree rooted at node $u$ has sum of values $S$ such that $S \equiv 0 \pmod k$, we can safely cut the edge connecting $u$ to its parent! The removed component has sum divisible by $k$, and the remainder of the tree still has sum divisible by $k$ (since $(Total - S) \equiv 0 - 0 \equiv 0 \pmod k$).
- Greedily cutting every subtree whose sum is divisible by $k$ produces the maximum possible number of valid components.

---

## Approach

### Brute Force Approach

A brute-force approach would test all $2^{n-1}$ subsets of edges to remove. For each subset, it would run connected component analysis (BFS/DFS) and verify if every component's sum is divisible by $k$, tracking the maximum component count. Since $n \le 3 \times 10^4$, $2^{30000}$ is astronomically large, making brute-force impossible.

### Optimized Approach

The solution uses post-order Tree DFS (bottom-up traversal):
1. Build adjacency list `g` for the undirected tree.
2. Root the tree arbitrarily at node 0 and call `dfs(0, -1)`.
3. In `dfs(i, fa)`: initialize subtree sum `s = values[i]`. Recursively add the subtree sums of all children `j != fa`.
4. If `s % k == 0`, this subtree can form an independent valid component! Increment `ans++`.
5. Return `s` to the parent caller.

### Step-by-Step Thinking Process

1. Because total sum is divisible by $k$, if a subtree sum is a multiple of $k$, separating it by cutting the parent edge leaves the rest of the tree still divisible by $k$.
2. This subproblem exhibits optimal substructure and greedy choice property: bottom-up cuts never prevent other valid cuts.
3. Use DFS to compute subtree sums in bottom-up (post-order) fashion.
4. Maintain a global counter `ans`.
5. At each node `i`, sum `values[i]` and all child subtree returns. If `s % k == 0`, increment `ans++`.
6. Note that node values can be up to $10^9$, so cumulative subtree sums can exceed 32-bit integer limits — use `long s`.
7. Return `ans`.

### Algorithm / Intuition

In `maxKDivisibleComponents`, we construct the adjacency list `g` and invoke `dfs(0, -1)`. The function `dfs(i, fa)` returns a `long` representing the sum of node values in the subtree rooted at `i`. For each neighbor `j != fa`, `s += dfs(j, i)`. Once all children are aggregated, we check `if (s % k == 0)`. If true, the entire subtree rooted at `i` can be partitioned off into its own component, so `ans++`. Whether it forms a cut or continues up, returning `s` allows the parent to account for any remaining values modulo $k$.

---

## Dry Run

We trace Example 1 with `n = 5`, `edges = [[0,2],[1,2],[1,3],[2,4]]`, `values = [1,8,1,4,4]`, `k = 6`:

- Adjacency: 0: [2]; 1: [2, 3]; 2: [0, 1, 4]; 3: [1]; 4: [2].
- Call `dfs(0, -1)`:
  - Node 0 calls child 2.
    - Node 2 calls child 1.
      - Node 1 calls child 3: leaf, `s = values[3] = 4`. `4 % 6 != 0`. `ans = 0`. Returns 4.
      - Node 1: `s = values[1] + 4 = 8 + 4 = 12`. `12 % 6 == 0`! `ans++` -> `ans = 1`. Returns 12.
    - Node 2 calls child 4: leaf, `s = values[4] = 4`. `4 % 6 != 0`. Returns 4.
    - Node 2: `s = values[2] + 12 + 4 = 1 + 16 = 17`. `17 % 6 = 5 != 0`. Returns 17.
  - Node 0: `s = values[0] + 17 = 1 + 17 = 18`. `18 % 6 == 0`! `ans++` -> `ans = 2`. Returns 18.
- Final answer `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Building the adjacency graph takes $O(n)$ time. The post-order DFS visits each node and traverses each edge exactly once.
- **Space Complexity:** `O(n)` — Storing the tree in an adjacency list takes $O(n)$ space, and the recursion call stack takes $O(n)$ depth in the worst case (skewed tree).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2872maximum-number-of-k-divisible-components.java](./2872maximum-number-of-k-divisible-components.java) |

---

## Key Learnings

- Post-order traversal (bottom-up DFS) is the canonical approach for subtree sum evaluation on trees.
- Subtree sum divisibility by $k$ is invariant under edge cuts because $(Total - S) \equiv 0 \pmod k$ whenever $S \equiv 0 \pmod k$.
- Always use `long` when summing node values that can each reach $10^9$ to avoid 32-bit integer overflow.
