---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 983. Minimum Cost For Tickets

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-cost-for-tickets/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0983` (`983`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given a strictly increasing integer array `days` (with values in `1..365`) listing the exact days of the year on which you must travel by train, along with a 3-element array `costs` representing ticket prices:
- `costs[0]`: a **1-day** pass covering `1` day of travel,
- `costs[1]`: a **7-day** pass covering `7` consecutive calendar days (`d` through `d + 6`),
- `costs[2]`: a **30-day** pass covering `30` consecutive calendar days (`d` through `d + 29`).

Return the **minimum total cost** needed to cover every travel day in `days`.

---

## Examples

### Example 1

```text
Input: days = [1,4,6,7,8,20], costs = [2,7,15]
Output: 11
Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
In total, you spent $11 and covered all the days of your travel.
```

### Example 2

```text
Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
Output: 17
Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
In total, you spent $17 and covered all the days of your travel.
```

---

## Constraints

- `1 <= days.length <= 365`

- `1 <= days[i] <= 365`

- `days` is in strictly increasing order.

- `costs.length == 3`

- `1 <= costs[i] <= 1000`

---

## Problem Understanding

- **Buy Only When Needed:** Buying a pass earlier than the next uncovered travel day `days[i]` never covers more travel days than buying it right on `days[i]`, so optimal decisions only occur at indices `i` of `days`.
- **Cheaper Longer Passes:** Constraints do **not** guarantee `costs[0] < costs[1] < costs[2]` (a 7-day or 30-day pass could even cost less than a 1-day pass!), so all `3` pass options must always be evaluated.
- **Next Uncovered Index:** A pass of duration `valid[k]` bought on `days[i]` covers through calendar day `days[i] + valid[k] - 1`. Thus the next uncovered travel day is the first `days[j] >= days[i] + valid[k]`.

---

## Approach

### Brute Force Approach

Branching recursively into all `3` ticket choices at each travel day `i` without memoization explores a ternary decision tree of depth `n`, taking `O(3^n)` time (up to `3^{365}` calls).

### Optimized Approach

Use **Top-Down Dynamic Programming (Memoization)** over the `days` index `i` (`Integer[] f`), combined with `Arrays.binarySearch` to jump directly to the next uncovered travel day `j` for each pass duration in `{1, 7, 30}`.

### Step-by-Step Thinking Process

1. Define `dfs(i)` as the minimum cost to cover all remaining travel days `days[i .. n - 1]`, with base case `dfs(i) = 0` when `i >= n`.
2. Cache computed states in `Integer[] f = new Integer[n]` so each index `i` is solved only once.
3. Store pass durations in `valid = {1, 7, 30}` corresponding to `costs[0..2]`.
4. For each pass `k` in `0..2`, find the first index `j` where `days[j] >= days[i] + valid[k]` using `Arrays.binarySearch(days, days[i] + valid[k])`.
5. Decode Java's `binarySearch` return value (`j = j < 0 ? -j - 1 : j`) and minimize `f[i]` over `dfs(j) + costs[k]`.

### Algorithm / Intuition

In `mincostTickets`, `dfs(i)` decides which pass to purchase on `days[i]`.

Notice how `Arrays.binarySearch(days, days[i] + valid[k])` locates the exact next state `j`:
- Because `days` is strictly increasing, every element appears at most once.
- If calendar day `days[i] + valid[k]` is in `days`, `binarySearch` returns its exact non-negative index `j`.
- If `days[i] + valid[k]` is **not** in `days`, `binarySearch` returns `-(insertionPoint) - 1` (`< 0`), so `-j - 1` recovers `insertionPoint`—which is the exact index of the first travel day strictly greater than `days[i] + valid[k]` (or `n` if the pass covers the rest of the year)!

Memoizing `f[i]` collapses the `3^n` recursion tree into `n` distinct states.

---

## Dry Run

Trace on **Example 1**: `days = [1, 4, 6, 7, 8, 20]` (`n = 6`), `costs = [2, 7, 15]`

Evaluating `f[i]` (shown bottom-up in dependency order as memoized by `dfs(0)`):
- **`i = 5` (`day 20`):**
  - `1`-day (`target 21` -> `j = 6`): `0 + 2 = 2`
  - `7`-day (`target 27` -> `j = 6`): `0 + 7 = 7`
  - `30`-day (`target 50` -> `j = 6`): `0 + 15 = 15` -> **`f[5] = 2`** (\$2)
- **`i = 4` (`day 8`):** `1`-day -> `f[5] + 2 = 4`; `7`-day (`target 15` -> `j = 5`) -> `f[5] + 7 = 9`; `30`-day (`target 38` -> `j = 6`) -> `15` -> **`f[4] = 4`**
- **`i = 3` (`day 7`):** `1`-day -> `f[4] + 2 = 6`; `7`-day (`target 14` -> `j = 5`) -> `f[5] + 7 = 9`; `30`-day -> `15` -> **`f[3] = 6`**
- **`i = 2` (`day 6`):** `1`-day -> `f[3] + 2 = 8`; `7`-day (`target 13` -> `j = 5`) -> `f[5] + 7 = 9`; `30`-day -> `15` -> **`f[2] = 8`**
- **`i = 1` (`day 4`):**
  - `1`-day (`target 5` -> `j = 2`): `f[2] + 2 = 10`
  - `7`-day (`target 11` -> `j = 5`, covers days `4, 6, 7, 8`!): `f[5] + 7 = 2 + 7 = 9`
  - `30`-day (`target 34` -> `j = 6`): `0 + 15 = 15` -> **`f[1] = 9`** (\$9)
- **`i = 0` (`day 1`):**
  - `1`-day (`target 2` -> `j = 1`): `f[1] + 2 = 9 + 2 = 11`
  - `7`-day (`target 8` -> `j = 4`): `f[4] + 7 = 4 + 7 = 11`
  - `30`-day (`target 31` -> `j = 6`): `0 + 15 = 15` -> **`f[0] = 11`** (\$11)

- **Final Result:** Returns `11`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Each of the `n` states (`n <= 365`) is computed once, performing `3` binary searches of `O(log n)` time over `days`.
- **Space Complexity:** `O(n)` — Memoization array `f` holds `n` `Integer` references, and the recursion stack reaches at most depth `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [983minimum-cost-for-tickets.java](./983minimum-cost-for-tickets.java) |

---

## Key Learnings

- Decoding `Arrays.binarySearch` via `j = j < 0 ? -j - 1 : j` acts as C++ `std::lower_bound` whenever all array elements are strictly unique.
- Parameterizing DP over the **active travel days** (`n` states) rather than all calendar days (`1..365`) scales cleanly even if calendar days ranged up to `10^9`.
