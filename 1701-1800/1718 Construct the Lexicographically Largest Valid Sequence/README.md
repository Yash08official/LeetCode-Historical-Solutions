---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
---

# 1718. Construct the Lexicographically Largest Valid Sequence

**[View Problem on LeetCode](https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1718` (`1718`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n` (`1 <= n <= 20`), construct a sequence of length `2n - 1` containing integers from `1` to `n` such that:
- `1` appears **once**.
- Every integer `i` in `[2, n]` appears **twice**, and the index distance between its two occurrences is **exactly `i`** (`|idx2 - idx1| == i`).

Among all valid sequences, return the **lexicographically largest** one.

---

## Examples

### Example 1

```text
Input: n = 3
Output: [3,1,2,3,2]
Explanation: [2,3,2,1,3] is also a valid sequence, but [3,1,2,3,2] is the lexicographically largest valid sequence.
```

### Example 2

```text
Input: n = 5
Output: [5,3,1,4,3,5,2,4,2]
```

---

## Constraints

- `1 <= n <= 20`

---

## Problem Understanding

- Total elements to place = `1 + 2 * (n - 1) = 2n - 1`.
- Placing the first copy of `i` (`i >= 2`) at index `u` **uniquely forces** its second copy to go at index `u + i`!
- **Why greedy DFS finds the lexicographically largest answer first:** Lexicographical order compares sequences at the earliest differing index from left to right (`u = 1, 2, ..., 2n - 1`). If we always fill the leftmost empty slot `u` first, and try candidate numbers in **strictly descending order (`n, n - 1, ..., 2, 1`)**, the **very first complete valid sequence** discovered by DFS is mathematically guaranteed to be lexicographically largest!

---

## Approach

### Brute Force Approach

Generating all valid sequences without early termination and comparing them afterward, or trying positions for numbers `1..n` instead of trying largest numbers at the leftmost unfilled index `u`, wastes massive search effort when greedy descending DFS can halt on the first hit.

### Optimized Approach

Use 1-indexed backtracking (`dfs(u)` for `u = 1 .. 2n - 1`) with array `path = new int[2 * n]` and availability array `cnt` (`cnt[1] = 1`, `cnt[2..n] = 2`). If `path[u]` is already filled by an earlier pair, skip to `dfs(u + 1)`. Otherwise try placing `i` from `n` down to `2` at both `path[u]` and `path[u + i]` (when `u + i < 2n` and `path[u + i] == 0`), falling back to `1` at `path[u]` if needed, and return `true` on the first complete solution.

### Step-by-Step Thinking Process

1. Allocate `path = new int[n * 2]` (using indices `1` through `2n - 1`) and `cnt` tracking remaining placements (`cnt[1] = 1`, others `2`).
2. Start `dfs(1)` at the leftmost slot `u = 1`.
3. Base case: when `u == n * 2`, indices `1 .. 2n - 1` are all validly filled — return `true` immediately to stop all further search.
4. If `path[u] > 0` (already occupied by the second copy of a previously placed number), advance to `dfs(u + 1)`.
5. Otherwise, loop `i` from `n` down to `2`: if `i` hasn't been used (`cnt[i] > 0`) and slot `u + i` is in bounds (`< 2n`) and empty (`path[u + i] == 0`), place `i` at both `u` and `u + i`, mark `cnt[i] = 0`, and recurse `dfs(u + 1)`. Undo on failure.
6. If no `i >= 2` succeeded at `u` and `cnt[1] > 0`, try placing `1` alone at `path[u]` and recursing `dfs(u + 1)`.
7. Copy `path[1 .. 2n - 1]` into 0-indexed result array `ans` of length `2n - 1`.

### Algorithm / Intuition

In `Solution`, 1-based indexing in `path[1 .. 2n - 1]` makes `u == n * 2` the clean past-the-end base case. Notice why `1` is handled separately after the `for (int i = n; i > 1; --i)` loop: `1` only occupies **one** slot (`path[u] = 1`), whereas every `i >= 2` occupies **two** slots (`path[u] = i` and `path[u + i] = i`). Placing `1` last at `u` preserves the descending trial order `n, n - 1, ..., 2, 1` needed for lexicographical optimality.

---

## Dry Run

Tracing Example 1: `n = 3` (`2n - 1 = 5`, `path` indices `1..5`):

1. `dfs(1)` (`path = [_, 0, 0, 0, 0, 0]`):
   - Try `i = 3`: `1 + 3 = 4 < 6` and `path[4] == 0` -> set `path[1] = 3, path[4] = 3` (`[_, 3, 0, 0, 3, 0]`), call `dfs(2)`.
2. `dfs(2)`:
   - Try `i = 2`: `2 + 2 = 4 < 6`, **but `path[4] == 3 != 0`** (occupied!) -> skipped.
   - Loop ends; `cnt[1] > 0` -> set `path[2] = 1` (`[_, 3, 1, 0, 3, 0]`), call `dfs(3)`.
3. `dfs(3)`:
   - Try `i = 2`: `3 + 2 = 5 < 6` and `path[5] == 0` -> set `path[3] = 2, path[5] = 2` (`[_, 3, 1, 2, 3, 2]`), call `dfs(4)`.
4. `dfs(4)`: `path[4] == 3 > 0` -> skips to `dfs(5)`.
5. `dfs(5)`: `path[5] == 2 > 0` -> skips to `dfs(6)`.
6. `dfs(6)`: `u == 6 == n * 2` -> returns `true` all the way up!
7. Copy `path[1..5]` into `ans` -> `[3, 1, 2, 3, 2]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n!)` worst-case upper bound, heavily pruned in practice — Fixing both `u` and `u + i` simultaneously eliminates most branches immediately, and returning `true` on the first valid sequence finishes in < 1 ms for all `1 <= n <= 20`.
- **Space Complexity:** `O(n)` — Arrays `path`, `cnt`, `ans`, and the DFS call stack up to depth `2n` all scale linearly with `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1718construct-the-lexicographically-largest-valid-sequence.java](./1718construct-the-lexicographically-largest-valid-sequence.java) |

---

## Key Learnings

- To find the lexicographically largest (or smallest) valid configuration via backtracking, fill positions strictly left-to-right and iterate candidate values in descending (or ascending) order so the first valid leaf is optimal.
- Constraint propagation — immediately filling `path[u + i] = i` when placing `path[u] = i` — collapses the search tree compared to checking distances after the fact.
