---
comments: true
difficulty: Medium
tags:
  - Array
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
---

# 2467. Most Profitable Path in a Tree

**[View Problem on LeetCode](https://leetcode.com/problems/most-profitable-path-in-a-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2467` (`2467`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

There is an unrooted undirected tree of $n$ nodes labeled from $0$ to $n - 1$, with node $0$ designated as the root. You are given an array of tree edges and an integer array `amount` of length $n$, where each even integer `amount[i]` represents the reward (if positive) or toll (if negative) to open the gate at node $i$.

Alice starts at node $0$ and travels along the unique simple path towards some leaf node. Bob starts at node `bob` and travels along the unique simple path towards node $0$.

Both players move simultaneously one edge per second:
- If a player reaches a gate first, they pay the full toll or collect the full reward, and the gate is left open permanently.
- If both reach a gate simultaneously, they split the reward or toll equally (`amount[i] / 2`).
- If a player arrives at a gate that was already opened by the other player, they receive or pay $0$.
- Bob stops moving once he reaches node $0$, while Alice stops moving once she reaches any leaf node.

Return the **maximum net income** Alice can obtain by choosing the optimal leaf node destination.

---

## Examples

### Example 1

```text
Input: edges = [[0,1],[1,2],[1,3],[3,4]], bob = 3, amount = [-2,4,2,-4,6]
Output: 6
Explanation:
The above diagram represents the given tree. The game goes as follows:
- Alice is initially on node 0, Bob on node 3. They open the gates of their respective nodes.
  Alice's net income is now -2.
- Both Alice and Bob move to node 1.
  Since they reach here simultaneously, they open the gate together and share the reward.
  Alice's net income becomes -2 + (4 / 2) = 0.
- Alice moves on to node 3. Since Bob already opened its gate, Alice's income remains unchanged.
  Bob moves on to node 0, and stops moving.
- Alice moves on to node 4 and opens the gate there. Her net income becomes 0 + 6 = 6.
Now, neither Alice nor Bob can make any further moves, and the game ends.
It is not possible for Alice to get a higher net income.
```

### Example 2

```text
Input: edges = [[0,1]], bob = 1, amount = [-7280,2350]
Output: -7280
Explanation:
Alice follows the path 0->1 whereas Bob follows the path 1->0.
Thus, Alice opens the gate at node 0 only. Hence, her net income is -7280.
```

---

## Constraints

- `2 <= n <= 10^5`

- `edges.length == n - 1`

- `edges[i].length == 2`

- `0 <= a_i, b_i < n`

- `a_i != b_i`

- `edges` represents a valid tree.

- `1 <= bob < n`

- `amount.length == n`

- `amount[i]` is an **even** integer in the range `[-10^4, 10^4]`.

---

## Problem Understanding

Because the graph is a tree, there is a unique simple path between any pair of nodes. Bob's path from `bob` to root $0$ is completely deterministic: Bob only moves along this single path, reaching each node on the path at an exact timestamp $t$. Bob never visits any node outside this path.

This allows us to decouple Bob's journey from Alice's:
1. First, trace Bob's path from `bob` to $0$ using DFS to record the exact arrival time `ts[u]` for every node $u$ on his path. For nodes not on Bob's path, set `ts[u] = \infty`.
2. Second, run a DFS for Alice starting from node $0$ at time $0$, trying all paths to leaf nodes. At each node $u$ reached by Alice at time $t$:
   - If $t < \text{ts}[u]$: Alice arrives before Bob, gaining `amount[u]`.
   - If $t == \text{ts}[u]$: Alice and Bob arrive simultaneously, gaining `amount[u] / 2`.
   - If $t > \text{ts}[u]$: Bob opened it earlier, Alice gains $0$.
3. When Alice reaches a leaf node, update the maximum profit.

---

## Approach

### Brute Force Approach

Simulating both players step-by-step simultaneously for every possible leaf choice would require exploring each root-to-leaf path independently. Since there can be up to $O(n)$ leaves and paths of length $O(n)$, naive simulation would take $O(n^2)$ time in the worst case (e.g., star or unbalanced tree). With $n = 10^5$, $O(n^2)$ is too slow and results in TLE.

### Optimized Approach

1. Construct the adjacency list `g`.
2. Run DFS 1 (`dfs1(bob, -1, 0)`) to locate the unique path from `bob` to $0$ and populate arrival times in array `ts` (initialized to $n$).
3. Run DFS 2 (`dfs2(0, -1, 0, 0)`) to explore all paths Alice can take to leaves, computing her accumulated income `v` based on arrival comparisons with `ts[i]`. Track the maximum leaf income in `ans`.

### Step-by-Step Thinking Process

1. Realize that Bob has no choices: there is only one path in a tree from `bob` to `0`.
2. Use a recursive DFS (`dfs1`) starting from `bob` to find node 0, recording the time step `t` when Bob reaches each node along this path.
3. Store Bob's arrival time in `ts[i]`. For nodes Bob never visits, `ts[i]` remains $n$ (effectively $\infty$).
4. Set `ts[bob] = 0` as Bob starts at node `bob` at time 0.
5. Traverse the tree from node 0 for Alice using `dfs2(i, fa, t, v)`.
6. Compare Alice's arrival time `t` with Bob's `ts[i]` to determine whether Alice receives full, half, or zero amount.
7. When reaching a leaf (a node with degree 1 whose only neighbor is its parent, except root if degree 0), record `ans = Math.max(ans, v)`.

### Algorithm / Intuition

In the provided Java solution:

1. Adjacency list `g` is initialized, and `ts` is filled with $n$ (representing infinity).
2. `dfs1(bob, -1, 0)` finds the simple path to node 0: when base case `i == 0` is reached, it returns `true`, and while unwinding, sets `ts[j] = Math.min(ts[j], t + 1)`. Then `ts[bob] = 0` is set.
3. `dfs2(0, -1, 0, 0)` carries Alice's current time `t` and profit `v`:
   - If `t == ts[i]`, Alice shares the gate: `v += amount[i] >> 1`.
   - Else if `t < ts[i]`, Alice gets full value: `v += amount[i]`.
   - If `t > ts[i]`, gate was already opened by Bob, so nothing is added.
   - If `g[i].size() == 1 && g[i].get(0) == fa`, node `i` is a leaf; `ans = Math.max(ans, v)`.
   - Otherwise, recursion continues to all non-parent neighbors.

---

## Dry Run

Consider Example 1: `edges = [[0,1],[1,2],[1,3],[3,4]]`, `bob = 3`, `amount = [-2, 4, 2, -4, 6]`

1. **Tree Structure**: 0 -- 1, 1 -- 2, 1 -- 3, 3 -- 4.
2. **Bob's Path (`dfs1`)**:
   - Bob path: $3 \to 1 \to 0$.
   - Times: `ts[3] = 0`, `ts[1] = 1`, `ts[0] = 2`. Nodes 2 and 4 have `ts = 5` (unvisited).

3. **Alice's Path (`dfs2`)**:
   - Start at node 0 ($t=0$): $t < ts[0]$ ($0 < 2$) -> `v = -2`.
   - Move to node 1 ($t=1$): $t == ts[1]$ ($1 == 1$) -> simultaneous! Split reward: `v = -2 + 4/2 = 0`.
   - Branch A: Move to node 2 ($t=2$): Leaf! $t < ts[2]$ ($2 < 5$) -> `v = 0 + 2 = 2`. `ans = max(-inf, 2) = 2`.
   - Branch B: Move to node 3 ($t=2$): $t > ts[3]$ ($2 > 0$) -> already opened, `v = 0`.
     - From node 3, move to node 4 ($t=3$): Leaf! $t < ts[4]$ ($3 < 5$) -> `v = 0 + 6 = 6`. `ans = max(2, 6) = 6`.

Final Return: `ans = 6`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Building the graph takes $O(n)$ time. `dfs1` traverses at most $n$ nodes to locate Bob's path, and `dfs2` visits every node and edge in the tree exactly once. Thus, total time is linear in the number of nodes $n$.
- **Space Complexity:** `O(n)` — Graph adjacency list `g`, timestamp array `ts`, and recursion call stacks for both DFS traversals all scale with $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2467most-profitable-path-in-a-tree.java](./2467most-profitable-path-in-a-tree.java) |

---

## Key Learnings

- In tree games where one player follows a fixed deterministic path, decouple that player's timeline first before optimizing for the other.
- Simultaneous arrival conditions can be modeled with exact arrival timestamps at each node.
- Checking if a tree node is a leaf in an undirected adjacency list is simply `g[i].size() == 1 && g[i].get(0) == parent`.
