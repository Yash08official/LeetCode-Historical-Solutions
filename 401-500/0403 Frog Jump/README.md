---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
---

# 403. Frog Jump

**[View Problem on LeetCode](https://leetcode.com/problems/frog-jump/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0403` (`403`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

A frog wants to cross a river using stones placed at strictly increasing integer unit positions given in `stones` (`stones[0] == 0`). Starting on the first stone (`0`), the frog's very first jump must be `1` unit. Thereafter, if the frog's previous jump covered `k` units, its next jump must cover `k - 1`, `k`, or `k + 1` units strictly forward (`> 0`), landing only on positions that contain a stone.

Return `true` if the frog can land on the last stone (`stones[n - 1]`), or `false` otherwise.

---

## Examples

### Example 1

```text
Input: stones = [0,1,3,5,6,8,12,17]
Output: true
Explanation: The frog can jump to the last stone by jumping 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 2 units to the 4th stone, then 3 units to the 6th stone, 4 units to the 7th stone, and 5 units to the 8th stone.
```

### Example 2

```text
Input: stones = [0,1,2,3,4,8,9,11]
Output: false
Explanation: There is no way to jump to the last stone as the gap between the 5th and 6th stone is too large.
```

---

## Constraints

- `2 <= stones.length <= 2000`

- `0 <= stones[i] <= 2^31 - 1`

- `stones[0] == 0`

- `stones` is sorted in a strictly increasing order.

---

## Problem Understanding

Whether the frog can finish from stone `i` depends not just on `i`, but also on the jump size `k` used to arrive at `i`.

Key bound on `k`:
- Starting at stone `0` with virtual prior jump `k = 0`, each jump increases `k` by **at most `1`**, and every jump moves forward by at least `1` stone index.
- Therefore, upon reaching stone index `i`, `k` can never exceed `i` (`0 <= k < n`), bounding the state space `(i, k)` to `n * n` instead of `n * 2^{31}`!

---

## Approach

### Brute Force Approach

Pure recursive backtracking explores up to 3 candidate jump sizes (`k - 1`, `k`, `k + 1`) from every stone without caching visited `(stoneIndex, lastJump)` pairs.

When stones are closely spaced (e.g., `[0, 1, 2, 3, ...]`), many distinct jump sequences arrive at the same stone `i` with the same speed `k`, causing exponential `O(3^n)` recomputation.

### Optimized Approach

Use **Top-Down Memoized DFS** over state `(i, k)` stored in `Boolean[][] f = new Boolean[n][n]`, combined with a `HashMap<Integer, Integer> pos` mapping each stone coordinate `stones[i]` to its array index `i` for `O(1)` landing checks.

### Step-by-Step Thinking Process

1. Populate `pos` mapping `stones[i] -> i` for all `0 <= i < n`, and allocate memoization table `Boolean[][] f = new Boolean[n][n]` (`null` means uncomputed).
2. Start the search at `dfs(0, 0)` (on stone index `0` with prior jump `0`).
3. Base case: if `i == n - 1`, the frog has reached the final stone; return `true`.
4. Memoization lookup: if `f[i][k] != null`, return the cached boolean `f[i][k]`.
5. Try candidate jump lengths `j` from `k - 1` to `k + 1`: if `j > 0` and target coordinate `h = stones[i] + j` exists in `pos`, recursively test `dfs(pos.get(h), j)`; if `true`, cache and return `f[i][k] = true`.
6. If none of the candidate jumps succeed, cache and return `f[i][k] = false`.

### Algorithm / Intuition

Look at how cleanly `dfs(0, 0)` enforces the special first-jump rule without extra `if` logic: at `i = 0, k = 0`, the loop tests `j` in `{-1, 0, 1}`. The condition `if (j > 0)` automatically filters out `-1` and `0`, leaving **only `j = 1`** (`h = 0 + 1 = 1`) as a legal first jump! If `1` is not in `pos` (i.e., `stones[1] != 1`), `dfs(0, 0)` immediately returns `false`.

Using boxed `Boolean[][] f` lets `null` distinguish unvisited states from visited states that evaluated to `false`.

---

## Dry Run

Tracing `canCross([0, 1, 3, 5, 6, 8, 12, 17])` (**Example 1**, `n = 8`):

`pos = {0:0, 1:1, 3:2, 5:3, 6:4, 8:5, 12:6, 17:7}`

- `dfs(0, 0)` -> tries `j = 1` (`h = 1`, index `1`): calls `dfs(1, 1)`
- `dfs(1, 1)` -> `j = 1` (`h = 2` miss), `j = 2` (`h = 3`, index `2`): calls `dfs(2, 2)`
- `dfs(2, 2)` -> `j = 1` (`h = 4` miss), `j = 2` (`h = 5`, index `3`): calls `dfs(3, 2)`
  - `dfs(3, 2)` -> `j = 1` (`h = 6`, index `4`): calls `dfs(4, 1)`
    - `dfs(4, 1)` -> `j = 1` (`h = 7` miss), `j = 2` (`h = 8`, index `5`): calls `dfs(5, 2)`
      - `dfs(5, 2)` -> `j in {1,2,3}` (`h in {9,10,11}` all miss) -> `f[5][2] = false`
    - `f[4][1] = false`
  - Back in `dfs(3, 2)` -> next `j = 2` (`h = 7` miss), next `j = 3` (`h = 8`, index `5`): calls `dfs(5, 3)`
    - `dfs(5, 3)` -> `j = 2, 3` (`h = 10, 11` miss), `j = 4` (`h = 12`, index `6`): calls `dfs(6, 4)`
      - `dfs(6, 4)` -> `j = 3, 4` (`h = 15, 16` miss), `j = 5` (`h = 17`, index `7`): calls `dfs(7, 5)` -> `i == 7 == n - 1` returns `true`!

Unwinds and returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — There are at most `n^2` reachable `(i, k)` states, and each state loops over 3 jump lengths performing `O(1)` `HashMap` lookups.
- **Space Complexity:** `O(n^2)` — The memoization table `f` uses `n x n` `Boolean` references, `pos` stores `n` entries, and the recursion stack has depth at most `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [403frog-jump.java](./403frog-jump.java) |

---

## Key Learnings

- Even when stone coordinates reach `2^{31} - 1`, indexing DP states by stone index `i` (`< 2000`) and noticing `k <= i < n` compresses an apparently huge coordinate problem into `n x n` states.
- Starting at `dfs(0, 0)` with `j > 0` unifies the initial `1`-unit jump constraint with the general `{k - 1, k, k + 1}` transition.
- Java's wrapper array `Boolean[][]` provides tri-state (`null`, `true`, `false`) memoization with zero boilerplate initialization.
