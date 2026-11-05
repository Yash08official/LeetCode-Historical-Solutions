---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
---

# 39. Combination Sum

**[View Problem on LeetCode](https://leetcode.com/problems/combination-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0039` (`39`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of **distinct** positive integers `candidates` and a positive integer `target`, return a list of all unique combinations of numbers from `candidates` that sum to `target`, in any order.

You may pick the **same** number from `candidates` an unlimited number of times. Two combinations are considered distinct if the frequency of at least one chosen number differs.

---

## Examples

### Example 1

```text
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

### Example 2

```text
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

### Example 3

```text
Input: candidates = [2], target = 1
Output: []
```

---

## Constraints

- `1 <= candidates.length <= 30`

- `2 <= candidates[i] <= 40`

- All elements of `candidates` are **distinct**.

- `1 <= target <= 40`

---

## Problem Understanding

- **Combinations vs. permutations:** `[2, 2, 3]` and `[2, 3, 2]` represent the same combination! Enforcing a non-decreasing index order during search (once at index `j`, never look back at indices `< j`) guarantees each unique combination is generated once.
- **Unlimited reuse:** Passing `j` (rather than `j + 1`) into the recursive call allows `candidates[j]` to be chosen again.
- **Sorted pruning:** Because `2 <= candidates[i]`, sorting `candidates` upfront lets us immediately abandon a branch whenever the remaining sum `s` is strictly smaller than `candidates[i]`.

---

## Approach

### Brute Force Approach

Exploring all sequences of numbers summing to `<= target` without index ordering generates duplicate permutations like `[2,2,3]`, `[2,3,2]`, and `[3,2,2]`, requiring sorting and hashing each list to deduplicate, and failing to prune early when remaining sum `s` drops below available candidates.

### Optimized Approach

The implemented Java solution **sorts `candidates` first** and runs **pruned DFS backtracking** (`dfs(i, s)`), where `i` is the earliest allowed candidate index and `s` is the remaining target sum. If `s == 0`, it records a copy of `t` into `ans`; if `s < candidates[i]`, it prunes immediately; otherwise it loops `j` from `i` to `candidates.length - 1`, appending `candidates[j]` and recursing on `dfs(j, s - candidates[j])`.

### Step-by-Step Thinking Process

1. Sort `candidates` in ascending order (`Arrays.sort(candidates)`) to enable monotonic early pruning.
2. Define `dfs(int i, int s)` with `t` holding the current combination and `s` holding how much sum is still needed.
3. Base case: if `s == 0`, we hit `target` exactly—append `new ArrayList(t)` to `ans` and return.
4. Pruning check: if `s < candidates[i]`, then since `candidates` is sorted, `candidates[j] > s` for every `j >= i` as well—return immediately without looping!
5. Iterate `j` from `i` to `candidates.length - 1`: add `candidates[j]` to `t`, recurse `dfs(j, s - candidates[j])` (reusing `j` allowed), and remove the last element of `t` to backtrack.

### Algorithm / Intuition

Look closely at why `if (s < candidates[i]) return;` never throws an `ArrayIndexOutOfBoundsException`: `combinationSum` calls `dfs(0, target)` (with `candidates.length >= 1`), and inside the loop `j` is always `< candidates.length`, so `dfs(j, ...)` always receives a valid index `0 <= i < candidates.length`. Sorting `candidates` upfront means that as soon as `s < candidates[i]`, we save scanning the remaining `candidates.length - i` elements at every failing leaf of the search tree.

---

## Dry Run

Tracing Example 1: `candidates = [2, 3, 6, 7]`, `target = 7`

- `dfs(0, 7)`, `t = []`:
  - `j = 0` (`2`): `t = [2]`, `dfs(0, 5)`
    - `j = 0` (`2`): `t = [2, 2]`, `dfs(0, 3)`
      - `j = 0` (`2`): `t = [2, 2, 2]`, `dfs(0, 1)` -> `1 < candidates[0]` (`1 < 2`) -> **pruned!**
      - `j = 1` (`3`): `t = [2, 2, 3]`, `dfs(1, 0)` -> `s == 0` -> **add `[2, 2, 3]`**!
      - `j = 2` (`6`): `t = [2, 2, 6]`, `dfs(2, -3)` -> `-3 < 6` -> **pruned!**
      - `j = 3` (`7`): `t = [2, 2, 7]`, `dfs(3, -4)` -> `-4 < 7` -> **pruned!**
    - `j = 1` (`3`): `t = [2, 3]`, `dfs(1, 2)` -> `2 < candidates[1]` (`2 < 3`) -> **pruned!**
    - `j = 2` (`6`), `j = 3` (`7`): pruned immediately.
  - `j = 1` (`3`): `t = [3]`, `dfs(1, 4)` -> tries `3` (`dfs(1, 1)` pruned), `6`, `7` (pruned).
  - `j = 2` (`6`): `t = [6]`, `dfs(2, 1)` -> `1 < 6` -> **pruned!**
  - `j = 3` (`7`): `t = [7]`, `dfs(3, 0)` -> `s == 0` -> **add `[7]`**!

Final `ans = [[2, 2, 3], [7]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N^(T / M + 1))` — Let `N = candidates.length`, `T = target`, and `M` be the smallest candidate (`M >= 2`); the recursion tree has depth at most `T / M` and branching factor at most `N` (heavily reduced in practice by `s < candidates[i]` pruning).
- **Space Complexity:** `O(T / M)` — Excluding the output list `ans`, both the recursion call stack and temporary list `t` grow to at most `T / M` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [39combination-sum.java](./39combination-sum.java) |

---

## Key Learnings

- Passing `j` (not `0`) into `dfs(j, s - candidates[j])` eliminates permutation duplicates while still permitting unlimited reuse of `candidates[j]`.
- Sorting `candidates` costs negligible `O(N log N)` time (`N <= 30`) and unlocks strong `s < candidates[i]` subtree pruning.
- Always snapshot `new ArrayList(t)` when adding to `ans`, since `t` is mutated in-place throughout backtracking.
