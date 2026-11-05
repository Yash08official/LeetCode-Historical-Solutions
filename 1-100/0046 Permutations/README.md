---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
---

# 46. Permutations

**[View Problem on LeetCode](https://leetcode.com/problems/permutations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0046` (`46`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` containing **distinct** integers, generate and return all possible permutations of its elements. You may return the permutations in **any order**.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Example 2

```text
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

### Example 3

```text
Input: nums = [1]
Output: [[1]]
```

---

## Constraints

- `1 <= nums.length <= 6`

- `-10 <= nums[i] <= 10`

- All the integers of `nums` are **unique**.

---

## Problem Understanding

- **Factorial Count:** A set of `n` distinct elements has `n! = n * (n - 1) * ... * 1` unique arrangements. With `1 <= n <= 6`, `n! <= 720`, which is small enough to enumerate exhaustively.
- **No Duplicate Values:** Because every integer in `nums` is guaranteed unique, choosing different indices at any slot always produces distinct permutations—no deduplication logic is required.
- **Reference Copying Trap:** When recording a completed permutation into the result list, we must add a fresh snapshot (`new ArrayList<>(t)`) rather than adding `t` directly, because `t` is mutated during backtracking.

---

## Approach

### Brute Force Approach

A wasteful brute-force approach generates all `n^n` length-`n` sequences (allowing repeated picks) and filters out sequences that contain duplicate indices at the end, taking `O(n * n^n)` time. Even when generating only valid permutations, creating new sub-arrays and copied lists on every recursive call adds unnecessary allocation overhead compared to mutating a single shared path list with backtracking.

### Optimized Approach

Use **Depth-First Search (DFS) with Backtracking**: fill the permutation slot-by-slot from `i = 0` to `n - 1`, using a `boolean[] vis` array to track which indices of `nums` are already in the active path `t`, and undo both state changes immediately upon returning from each recursive branch.

### Step-by-Step Thinking Process

1. Model permutation building as a decision tree of depth `n`, where level `i` chooses which unused element occupies position `i` of the current list `t`.
2. Maintain `boolean[] vis` of length `nums.length` so we can check in `O(1)` time whether `nums[j]` has already been placed earlier in `t`.
3. At each depth `i < nums.length`, iterate `j` from `0` to `nums.length - 1`. If `!vis[j]`, mark `vis[j] = true`, append `nums[j]` to `t`, and recurse to `dfs(i + 1)`.
4. After `dfs(i + 1)` returns, restore the state (`t.remove(t.size() - 1)` and `vis[j] = false`) so the next candidate `j` sees the exact same prefix.
5. When `i == nums.length`, all `n` slots are filled; append `new ArrayList<>(t)` to `ans` and return.

### Algorithm / Intuition

In `Solution`, four instance fields coordinate the search:
- `ans`: collects all completed permutations (`List<List<Integer>>`).
- `t`: the mutable working permutation being built (`List<Integer>`).
- `vis`: `boolean[]` where `vis[j]` is `true` iff `nums[j]` is currently inside `t`.
- `nums`: reference to the input array.

`permute(nums)` initializes `vis = new boolean[nums.length]`, triggers `dfs(0)`, and returns `ans`. Inside `dfs(int i)`, `i` counts how many elements have been chosen so far. Once `i == nums.length`, `ans.add(new ArrayList<>(t))` snapshots the leaf state. Otherwise, the `for` loop scans all `j` in `[0, nums.length - 1]`, choosing every unvisited `nums[j]`, recursing deeper, and cleanly unmarking `t` and `vis[j]` afterward.

---

## Dry Run

**Input:** `nums = [1, 2, 3]` (`n = 3`)

Tracing the recursive tree from `dfs(0)`:
- `dfs(0)`: picks `j = 0` (`1`) -> `vis = [T, F, F]`, `t = [1]`
  - `dfs(1)`: picks `j = 1` (`2`) -> `vis = [T, T, F]`, `t = [1, 2]`
    - `dfs(2)`: picks `j = 2` (`3`) -> `vis = [T, T, T]`, `t = [1, 2, 3]`
      - `dfs(3)`: base case! Adds **`[1, 2, 3]`** to `ans`.
    - Backtracks `j = 2` -> `t = [1, 2]`, `vis = [T, T, F]`.
  - Backtracks `j = 1`, next picks `j = 2` (`3`) -> `vis = [T, F, T]`, `t = [1, 3]`
    - `dfs(2)`: picks `j = 1` (`2`) -> `t = [1, 3, 2]` -> `dfs(3)` adds **`[1, 3, 2]`**.
- Backtracks to `dfs(0)`, picks `j = 1` (`2`) -> generates **`[2, 1, 3]`** and **`[2, 3, 1]`**.
- Backtracks to `dfs(0)`, picks `j = 2` (`3`) -> generates **`[3, 1, 2]`** and **`[3, 2, 1]`**.

**Output:** `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

---

## Complexity Analysis

- **Time Complexity:** `O(n * n!)` — The recursion visits `n!` leaf states (copying `t` in `O(n)` time per leaf) and fewer than `e * n!` internal nodes (each scanning `n` indices in `vis`), totaling `O(n * n!)` operations.
- **Space Complexity:** `O(n)` auxiliary space — Excluding the `O(n * n!)` output list `ans`, the recursion stack, `vis` array, and working path `t` each use `O(n)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [46permutations.java](./46permutations.java) |

---

## Key Learnings

- The Choose -> Explore -> Unchoose (`add` / `dfs` / `remove`) template lets a single `ArrayList` explore an exponential state space using only `O(n)` working memory.
- Always wrap mutable backtracking buffers in `new ArrayList<>(t)` when saving results; storing `t` directly leaves `ans` filled with `n!` references to the same empty list after backtracking finishes.
- Using a `boolean[] vis` indexed by position runs in `O(1)` with minimal constant overhead compared to `t.contains(nums[j])` (`O(n)`) or a `HashSet`.
