---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
---

# 216. Combination Sum III

**[View Problem on LeetCode](https://leetcode.com/problems/combination-sum-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0216` (`216`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking` |
| **Solution Language** | JavaScript |

---

## Problem Description

Find all unique combinations of `k` numbers that add up to `n`, subject to two rules:

- Only digits from `1` through `9` may be used.
- Each digit may be used **at most once** per combination.

Return a list of all valid combinations in any order.

---

## Examples

### Example 1

```text
Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.
```

### Example 2

```text
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.
```

### Example 3

```text
Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
```

---

## Constraints

- `2 <= k <= 9`

- `1 <= n <= 60`

---

## Problem Understanding

Our candidate pool is fixed and tiny: `{1, 2, 3, 4, 5, 6, 7, 8, 9}` (only 9 numbers!). Even the maximum possible sum of all 9 digits is `1 + 2 + ... + 9 = 45`, so any `n > 45` immediately yields `[]`. By considering digits in strictly increasing order `i = 1, 2, ..., 9`, we never produce duplicate permutations (like `[1, 2, 4]` vs `[2, 1, 4]`), and once `i` exceeds the remaining target sum `s`, no larger digit `> i` can possibly help either.

---

## Approach

### Brute Force Approach

Generate all `2^9 = 512` subsets of `{1..9}` without pruning (e.g., via bitmask `0..511`), compute the cardinality and sum of every subset, and keep those of size `k` and sum `n`. While `512` subsets is already fast enough to pass, unpruned enumeration still explores branches that have already exceeded `k` elements or overshot the target sum `n`.

### Optimized Approach

Use recursive backtracking (`dfs(i, s)`) making a binary include/exclude decision on each digit `i` from `1` to `9` while tracking the remaining sum `s` and pruning whenever `i > 9`, `i > s`, or `t.length >= k`.

### Step-by-Step Thinking Process

1. Maintain a temporary combination array `t` and output list `ans`, defining `dfs(i, s)` where `i` is the current digit under consideration (`1..9`) and `s` is the remaining sum needed.
2. Base case: when `s === 0`, check if we selected exactly `k` numbers (`t.length === k`); if so, push a shallow copy `t.slice()` into `ans`, and return regardless (since remaining digits are positive).
3. Prune dead branches early: if `i > 9` (out of digits), `i > s` (since `i` and all subsequent digits exceed remaining positive sum `s`), or `t.length >= k` (already picked `k` numbers while `s > 0`), return immediately.
4. Branch 1 (Include `i`): push `i` onto `t`, recurse `dfs(i + 1, s - i)`, then backtrack with `t.pop()`.
5. Branch 2 (Exclude `i`): recurse `dfs(i + 1, s)` to try building the remaining sum from digits `i + 1..9`.

### Algorithm / Intuition

In `combinationSum3(k, n)`, `t` acts as a mutable path stack shared across recursive calls:
- **Why `t.slice()`?** Pushing `t` directly into `ans` would store references to the same array that later mutates to `[]` via `t.pop()`. `t.slice()` snapshots the current valid combination.
- **Sharp pruning (`i > s`):** Because digits are processed in ascending order `1 -> 9`, as soon as `i > s` (with `s > 0`), neither `i` nor `i + 1, ..., 9` can sum to `s`, cutting off both the include and exclude subtrees in one check!

---

## Dry Run

Tracing Example 1: `k = 3, n = 7` (`dfs(1, 7)`):

- `dfs(1, 7)` -> picks `1` (`t = [1]`), calls `dfs(2, 6)`:
  - `dfs(2, 6)` -> picks `2` (`t = [1, 2]`), calls `dfs(3, 4)`:
    - `dfs(3, 4)` -> picks `3` (`t = [1, 2, 3]`), calls `dfs(4, 1)` -> pruned (`t.length >= 3` and `4 > 1`). Backtracks `3`.
    - Excludes `3`, calls `dfs(4, 4)`:
      - Picks `4` (`t = [1, 2, 4]`), calls `dfs(5, 0)` -> **`s === 0` and `t.length === 3`** -> pushes `[1, 2, 4]` to `ans`! Backtracks `4`.
      - Excludes `4`, calls `dfs(5, 4)` -> pruned (`5 > 4`).
  - Excludes `2` (`t = [1]`), calls `dfs(3, 6)`:
    - Picks `3` (`t = [1, 3]`), calls `dfs(4, 3)` -> pruned (`4 > 3`).
    - Excludes `3`, calls `dfs(4, 6)` -> picks `4` (`t = [1, 4]`), calls `dfs(5, 2)` -> pruned (`5 > 2`). Further exclusions prune at `7 > 6`.
- Excludes `1` (`t = []`), calls `dfs(2, 7)`:
  - Picks `2` (`t = [2]`) -> picks `3` (`t = [2, 3]`) -> `dfs(4, 2)` pruned (`4 > 2`).
  - Remaining branches similarly prune via `i > s`.
- Final `ans`: `[[1, 2, 4]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(C(9, k) * k)` — At most `C(9, k)` valid size-`k` combinations exist (bounded by `2^9 = 512` subset states), and cloning each valid combination via `t.slice()` takes `O(k)` time.
- **Space Complexity:** `O(k)` — Excluding the output array `ans`, `t` holds at most `k` digits and the recursion call stack reaches depth at most `10` (`O(1)` bounded by 9 digits).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [216combination-sum-iii.js](./216combination-sum-iii.js) |

---

## Key Learnings

- Exploring candidates in strictly ascending order (`1..9`) naturally prevents duplicate combinations without sorting or hashing.
- Pruning on `i > s` exploits monotonicity: when candidates are sorted ascending and positive, failing with `i` guarantees all subsequent candidates `> i` also overshoot `s`.
- Always clone the mutable path array (`t.slice()` or `[...t]`) when recording a backtracking solution.
