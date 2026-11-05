---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
---

# 40. Combination Sum II

**[View Problem on LeetCode](https://leetcode.com/problems/combination-sum-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0040` (`40`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `candidates` (which **may contain duplicate numbers**) and a positive integer `target`, find all unique combinations of elements from `candidates` that sum to `target`.

Each element index in `candidates` may be used **at most once** in a combination, and the returned list must not contain duplicate combinations.

---

## Examples

### Example 1

```text
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

### Example 2

```text
Input: candidates = [2,5,2,1,2], target = 5
Output:
[
[1,2,2],
[5]
]
```

---

## Constraints

- `1 <= candidates.length <= 100`

- `1 <= candidates[i] <= 50`

- `1 <= target <= 30`

---

## Problem Understanding

- **Single use per index vs. duplicate values in input:** Unlike Combination Sum I, each array element can be picked only once (`j + 1`), *and* `candidates` can contain repeated numbers (e.g. `[10, 1, 2, 7, 6, 1, 5]` has two `1`s).
- **Allowed vs. forbidden duplicate usage:** Picking **both** `1`s in the *same* combination (`[1, 1, 6]`) is valid because they come from different indices (`0` and `1` after sorting), whereas picking the first `1` to form `[1, 7]` and separately picking the second `1` to form another `[1, 7]` creates a forbidden duplicate combination!

---

## Approach

### Brute Force Approach

Generating all `2^N` subsets that sum to `target`, sorting each subset, and inserting them into a `Set<List<Integer>>` deduplicates only *after* exploring identical subtrees repeatedly—leading to exponential blowup when `candidates` has many repeated values (such as thirty `1`s).

### Optimized Approach

The implemented Java solution **sorts `candidates`** and runs **backtracking with same-level duplicate skipping and sum pruning** (`dfs(i, s)`). At recursion start `i`, it stops early if `i >= candidates.length || s < candidates[i]`. Inside the loop `j = i .. candidates.length - 1`, `if (j > i && candidates[j] == candidates[j - 1]) continue;` skips duplicate values at the same recursion depth while `dfs(j + 1, s - candidates[j])` still allows picking equal values at deeper recursion levels.

### Step-by-Step Thinking Process

1. Sort `candidates` (`Arrays.sort(candidates)`) both to group identical numbers side-by-side and to enable monotonic sum pruning.
2. Define `dfs(int i, int s)` where `i` is the starting index for the next choice and `s` is the remaining target sum.
3. Base cases: if `s == 0`, add `new ArrayList<>(t)` to `ans` and return; if `i >= candidates.length || s < candidates[i]`, no valid completion is possible, so return.
4. Loop `j` from `i` to `candidates.length - 1`. If `j > i && candidates[j] == candidates[j - 1]`, we already tried this exact value as the current slot's choice in the previous iteration—`continue` to skip!
5. Add `candidates[j]` to `t`, recurse `dfs(j + 1, s - candidates[j])` so index `j` is used at most once, and remove the last element of `t` upon returning.

### Algorithm / Intuition

The condition `j > i && candidates[j] == candidates[j - 1]` is one of the most important patterns in backtracking. When `j == i`, `candidates[i]` is the **first** opportunity to extend our current prefix `t` at this depth—so even if `candidates[i] == candidates[i - 1]`, we allow it (letting `[1]` extend to `[1, 1]` via `dfs(1, ...)`). However, once `j > i` inside the *same* `for` loop, `candidates[j - 1]` was just tried and popped at this exact slot in `t`; trying an equal `candidates[j]` at the same slot would explore an identical subtree (or subset thereof) and produce duplicate combinations!

---

## Dry Run

Tracing Example 1: `candidates = [10, 1, 2, 7, 6, 1, 5]`, `target = 8`

1. **Sort `candidates`:** `[1, 1, 2, 5, 6, 7, 10]`.
2. **`dfs(0, 8)`:**
   - `j = 0` (`1`): `t = [1]`, calls `dfs(1, 7)`:
     - `j = 1` (`1`, `j == i` allowed!): `t = [1, 1]`, `dfs(2, 6)` -> finds `j = 4` (`6`) -> **`[1, 1, 6]`**.
     - `j = 2` (`2`): `t = [1, 2]`, `dfs(3, 5)` -> finds `j = 3` (`5`) -> **`[1, 2, 5]`**.
     - `j = 3` (`5`): `t = [1, 5]`, `dfs(4, 2)` -> `2 < candidates[4]` (`2 < 6`) -> pruned.
     - `j = 4` (`6`): `t = [1, 6]`, `dfs(5, 1)` -> `1 < 7` -> pruned.
     - `j = 5` (`7`): `t = [1, 7]`, `dfs(6, 0)` -> `s == 0` -> **`[1, 7]`**.
   - `j = 1` (`1`): **`j > 0 && candidates[1] == candidates[0]` -> SKIPPED!** (Prevents duplicate `[1, 2, 5]` and `[1, 7]`).
   - `j = 2` (`2`): `t = [2]`, `dfs(3, 6)` -> `j = 3` (`5`, pruned), `j = 4` (`6`) -> **`[2, 6]`**.
   - `j = 3..6` (`5, 6, 7, 10`): all pruned cleanly.

Final `ans = [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N * 2^N)` — Worst-case upper bound across `N = candidates.length` elements (at most `2^N` subsets explored and up to `O(N)` work copying valid combinations into `ans`), heavily pruned in practice by `s < candidates[i]` and `candidates[j] == candidates[j - 1]`.
- **Space Complexity:** `O(N)` — Excluding output `ans`, both the `dfs` call stack and temporary list `t` reach depth at most `N`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [40combination-sum-ii.java](./40combination-sum-ii.java) |

---

## Key Learnings

- After sorting, `if (j > i && candidates[j] == candidates[j - 1]) continue;` cleanly deduplicates branches at the same recursion level while permitting identical elements at different depths.
- Compare Combination Sum I (`dfs(j, ...)` -> `i` stays `< length`) vs. Combination Sum II (`dfs(j + 1, ...)` -> `i` can reach `candidates.length`, requiring the `i >= candidates.length` guard before indexing `candidates[i]`).
