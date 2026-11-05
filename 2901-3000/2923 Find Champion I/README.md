---
comments: true
difficulty: Easy
tags:
  - Array
  - Matrix
---

# 2923. Find Champion I

**[View Problem on LeetCode](https://leetcode.com/problems/find-champion-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2923` (`2923`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

In a tournament with `n` teams labeled from `0` to `n - 1`, we are given an $n \times n$ boolean matrix `grid`.

For all $i \ne j$, `grid[i][j] == 1` indicates that team `i` is **stronger** than team `j`, and `grid[i][j] == 0` indicates that team `j` is stronger than team `i`. We are given that `grid[i][i] == 0` for all `i`, and the tournament satisfies transitivity (if team $a$ is stronger than $b$ and $b$ is stronger than $c$, then $a$ is stronger than $c$).

A team $a$ is the **champion** if no other team is stronger than team $a$. We must return the index of the champion team.

---

## Examples

### Example 1

```text
Input: grid = [[0,1],[0,0]]
Output: 0
Explanation: There are two teams in this tournament.
grid[0][1] == 1 means that team 0 is stronger than team 1. So team 0 will be the champion.
```

### Example 2

```text
Input: grid = [[0,0,1],[1,0,1],[0,0,0]]
Output: 1
Explanation: There are three teams in this tournament.
grid[1][0] == 1 means that team 1 is stronger than team 0.
grid[1][2] == 1 means that team 1 is stronger than team 2.
So team 1 will be the champion.
```

---

## Constraints

- `n == grid.length`

- `n == grid[i].length`

- `2 <= n <= 100`

- `grid[i][j]` is either `0` or `1`.

- For all `i grid[i][i]` is `0.`

- For all `i, j` that `i != j`, `grid[i][j] != grid[j][i]`.

- The input is generated such that if team `a` is stronger than team `b` and team `b` is stronger than team `c`, then team `a` is stronger than team `c`.

---

## Problem Understanding

Key properties from the constraints:
- Transitivity holds without cycles: the dominance relationship forms a tournament DAG (directed acyclic tournament).
- In a transitive tournament, there is a unique topological ordering and a unique champion team.
- The champion team defeats every other team! Therefore, the champion's row in `grid` contains a `1` for every other column $j \ne i$.
- The count of 1s in the champion's row must be exactly $n - 1$.

---

## Approach

### Brute Force Approach

A naive approach could build a full directed graph and compute indegrees of all nodes. The champion is the node with indegree 0 (meaning no edge enters it from a stronger team). Building the graph and counting indegrees takes $O(n^2)$ time and $O(n)$ space. The row-sum approach directly inspects `grid` in-place with $O(1)$ extra space.

### Optimized Approach

The solution iterates through each row `i` in `grid`:
1. Count how many other teams team `i` beats: for each column `j`, if `i != j && grid[i][j] == 1`, increment `cnt`.
2. If `cnt == n - 1`, team `i` is stronger than all other $n - 1$ teams. Team `i` is the unique champion, so return `i` immediately.

### Step-by-Step Thinking Process

1. Team `i` is the champion if no team `b` is stronger than `i`.
2. Due to transitivity and asymmetry in the tournament, the champion defeats every other team $j \ne i$.
3. This means in row `i`, `grid[i][j] == 1` for all $j \ne i$, meaning the row sum is $n - 1$.
4. Iterate through candidate teams `i = 0, 1, \dots`.
5. Count `grid[i][j] == 1` for all $j \ne i$.
6. Return the first `i` where `cnt == n - 1`.

### Algorithm / Intuition

In `findChampion(grid)`, the outer loop tests each team `i` starting from 0. The inner loop counts how many teams `j != i` have `grid[i][j] == 1`, storing the sum in `cnt`. Because the champion defeats every single opponent in the tournament, its victory count must equal $n - 1$. As soon as a row with `cnt == n - 1` is encountered, `return i` immediately returns the champion team.

---

## Dry Run

We trace Example 1 with `grid = [[0,1],[0,0]]`:

- `n = 2`.
- `i = 0`: `cnt = 0`.
  - `j = 0`: skipped (`i == j`).
  - `j = 1`: `grid[0][1] == 1` -> `++cnt` -> `cnt = 1`.
  - Check `cnt == n - 1` -> `1 == 2 - 1` is `true`.
  - Returns `0`.
- Final result: `0`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` in the worst case (or $O(n)$ if the champion is checked early, e.g. at index 0). For $n \le 100$, $n^2 = 10,000$ operations, which finishes instantaneously.
- **Space Complexity:** `O(1)` auxiliary space — Only uses a few primitive loop and counter variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2923find-champion-i.java](./2923find-champion-i.java) |

---

## Key Learnings

- In a transitive tournament with no cycles, the champion node has outdegree $n - 1$ and indegree 0.
- Checking whether row sum equals $n - 1$ is a direct and simple way to identify the tournament champion.
- Understanding DAG properties simplifies graph reachability problems to basic matrix row counting.
