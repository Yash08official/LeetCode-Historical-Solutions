---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
---

# 312. Burst Balloons

**[View Problem on LeetCode](https://leetcode.com/problems/burst-balloons/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0312` (`312`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `nums` of `n` balloons (`0` to `n - 1`), each painted with an integer value. Bursting balloon `i` awards `nums[left] * nums[i] * nums[right]` coins, where `left` and `right` are the nearest **unburst** balloons to its left and right (once a balloon is burst, its remaining neighbors become adjacent). Out-of-bounds positions act as virtual balloons with value `1`.

Return the maximum total coins you can collect by bursting all `n` balloons in an optimal order.

---

## Examples

### Example 1

```text
Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
```

### Example 2

```text
Input: nums = [1,5]
Output: 10
```

---

## Constraints

- `n == nums.length`

- `1 <= n <= 300`

- `0 <= nums[i] <= 100`

---

## Problem Understanding

- Thinking **forward** (choosing which balloon to burst *first*) breaks subproblem independence: bursting `nums[k]` causes `nums[k - 1]` and `nums[k + 1]` to become adjacent, coupling the left and right halves.
- Thinking **backward** (choosing which balloon `k` to burst **last** inside an open interval `(i, j)`) restores independence! If `k` is the very last balloon burst strictly between unburst boundary balloons `i` and `j`, then at the moment `k` bursts, its immediate neighbors are guaranteed to be `i` and `j`, yielding `arr[i] * arr[k] * arr[j]` coins, while intervals `(i, k)` and `(k, j)` never interact with each other.

---

## Approach

### Brute Force Approach

Simulating every possible bursting order tries `n` choices for the first balloon, `n - 1` for the second, and so on—yielding `O(n!)` permutations (or `O(n * 2^n)` with bitmask DP over remaining subsets), which is completely intractable for `n <= 300`.

### Optimized Approach

Pad `nums` with `1` at both ends into `arr` of size `n + 2`, and use bottom-up Interval Dynamic Programming where `f[i][j]` represents the maximum coins earned by bursting all balloons strictly inside open interval `(i, j)` (`i + 1 .. j - 1`).

### Step-by-Step Thinking Process

1. Create `arr` of length `n + 2` with `arr[0] = 1`, `arr[n + 1] = 1`, and `arr[1..n]` copied from `nums` via `System.arraycopy`.
2. Define `f[i][j]` as the maximum coins obtainable from bursting every balloon strictly between `i` and `j` (keeping `arr[i]` and `arr[j]` intact). Intervals with `j < i + 2` contain zero balloons inside `(i, j)` and naturally stay `0`.
3. For an open interval `(i, j)` with `j >= i + 2`, iterate over every candidate `k` (`i + 1 <= k < j`) to be the **last** balloon burst inside `(i, j)`.
4. Transition: `f[i][j] = Math.max(f[i][j], f[i][k] + f[k][j] + arr[i] * arr[k] * arr[j])`.
5. Iterate `i` downward from `n - 1` to `0` and `j` upward from `i + 2` to `n + 1` so smaller sub-intervals (`f[i][k]` with `k < j` and `f[k][j]` with `k > i`) are always computed before `f[i][j]`. Return `f[0][n + 1]`.

### Algorithm / Intuition

Notice why the loop order `for (int i = n - 1; i >= 0; i--)` and `for (int j = i + 2; j <= n + 1; j++)` works without needing an explicit interval-length loop: `f[i][j]` depends on `f[i][k]` (same row `i`, smaller column `k < j`, already computed in the inner `j` loop) and `f[k][j]` (larger row `k > i`, same column `j`, already computed in an earlier `i` iteration). Padding `arr[0] = arr[n + 1] = 1` eliminates all boundary checks, making `f[0][n + 1]` the exact answer for bursting all `n` original balloons.

---

## Dry Run

Tracing **Example 1** (`nums = [3, 1, 5, 8]`, `n = 4` -> `arr = [1, 3, 1, 5, 8, 1]`):

- Length-3 intervals (`j = i + 2`, single balloon `k = i + 1`):
  - `f[3][5]` (`k=4`, val `8`): `1 * 5 * 8 * 1` -> `5 * 8 * 1 = 40`
  - `f[2][4]` (`k=3`, val `5`): `1 * 5 * 8 = 40`
  - `f[1][3]` (`k=2`, val `1`): `3 * 1 * 5 = 15`
  - `f[0][2]` (`k=1`, val `3`): `1 * 3 * 1 = 3`
- Larger intervals build upward:
  - `f[2][5]` (`(2,5)` = `{5, 8}`): best is `k=4` (`f[2][4] + f[4][5] + 1*8*1 = 40 + 0 + 8 = 48`).
  - `f[1][4]` (`{1, 5}`): best is `k=3` (`f[1][3] + 0 + 3*5*8 = 15 + 120 = 135`).
  - `f[1][5]` (`{1, 5, 8}`): best is `k=4` (`f[1][4] + 0 + 3*8*1 = 135 + 24 = 159`).
  - `f[0][5]` (`{3, 1, 5, 8}`): trying `k = 1..4`, max is at `k = 4` (`val = 8` burst last): `f[0][4] + f[4][5] + 1*8*1 = 159 + 0 + 8 = 167`.
- Returns `f[0][5] = 167`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^3)` — Three nested loops iterate over `O(n^2)` intervals `(i, j)` and up to `n` split points `k` per interval.
- **Space Complexity:** `O(n^2)` — The DP table `f` of dimensions `(n + 2) x (n + 2)` dominates memory usage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [312burst-balloons.java](./312burst-balloons.java) |

---

## Key Learnings

- When removing elements mutates adjacency and breaks subproblem independence, reverse time: decide which element is processed **last** so outer boundaries `(i, j)` stay fixed.
- Using open intervals `(i, j)` padded with sentinel `1`s at `0` and `n + 1` avoids every off-by-one boundary special case.
- Iterating `i` downward and `j` upward computes all sub-intervals in topological order without an extra length loop.
