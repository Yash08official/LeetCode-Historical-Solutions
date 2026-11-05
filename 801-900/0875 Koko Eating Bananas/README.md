---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 875. Koko Eating Bananas

**[View Problem on LeetCode](https://leetcode.com/problems/koko-eating-bananas/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0875` (`875`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `piles` where `piles[i]` is the number of bananas in the `i`-th pile, and an integer `h` representing the number of hours before the guards return.

Koko chooses a constant eating speed `k` (bananas per hour). Each hour, she picks one pile and eats up to `k` bananas from it; if the pile has fewer than `k` bananas, she finishes that pile and waits until the next hour before starting another pile. Return the **minimum integer** `k` that allows Koko to finish all piles within `h` hours.

---

## Examples

### Example 1

```text
Input: piles = [3,6,7,11], h = 8
Output: 4
```

### Example 2

```text
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

### Example 3

```text
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

---

## Constraints

- `1 <= piles.length <= 10^4`

- `piles.length <= h <= 10^9`

- `1 <= piles[i] <= 10^9`

---

## Problem Understanding

- **Per-Pile Time Formula:** At speed `k`, finishing a pile of size `x` takes `ceil(x / k)` hours because leftover time in an hour cannot be carried over to another pile.
- **Guaranteed Feasibility:** Since `h >= piles.length`, choosing `k = max(piles)` finishes every pile in `1` hour each (`<= h` hours total), so a valid speed in `[1, 10^9]` always exists.
- **Monotonicity Property:** If Koko can finish all bananas within `h` hours at speed `k`, she can also finish them at any speed `k' > k`. Conversely, if speed `k` is too slow (`> h` hours), every speed `< k` is also too slow.

---

## Approach

### Brute Force Approach

Testing `k = 1, 2, 3, ...` sequentially and computing `sum(ceil(x / k))` for each candidate takes `O(n * max(piles))` time. Because `piles[i]` can be as large as `10^9`, linear search over `k` can take up to `10^{13}` operations.

### Optimized Approach

Apply **Binary Search on the Answer** over the speed range `[1, 10^9]`. For each midpoint speed `mid`, sum `Math.ceil(x / mid)` across all piles to check in `O(n)` time whether `mid` finishes within `h` hours.

### Step-by-Step Thinking Process

1. Observe that total hours `f(k) = sum(ceil(piles[i] / k))` is monotonically non-increasing as `k` grows.
2. Set the search interval `[l, r]` to `[1, 10^9]`, covering the minimum possible integer speed (`1`) up to the constraint limit of `piles[i]` (`10^9`).
3. At each iteration while `l < r`, evaluate `mid = Math.floor((l + r) / 2)` and accumulate total hours `s` over `piles`.
4. If `s <= h`, `mid` is fast enough, so the minimum valid speed is at most `mid` (`r = mid`). Otherwise `mid` is too slow, so we must search strictly faster speeds (`l = mid + 1`).
5. When `l === r`, the interval converges to the smallest feasible integer speed `l`.

### Algorithm / Intuition

In `minEatingSpeed`, `l` starts at `1` and `r` starts at `Math.pow(10, 9)`. Inside the `while (l < r)` loop, `mid` is tested as a candidate speed.

The inner `for (let x of piles)` loop computes `s`, the exact hours needed at speed `mid`, by adding `Math.ceil(x / mid)` for every pile. Note that JavaScript `Number` safely represents integers up to `2^53 - 1` (`~9 * 10^15`), so even in the worst case (`10^4` piles of `10^9` at `mid = 1`, giving `s = 10^13`), `s` never overflows. Using the lower-bound binary search template (`r = mid` on `s <= h`, `l = mid + 1` otherwise) guarantees finding the minimum `k` satisfying `s <= h`.

---

## Dry Run

Trace on **Example 1**: `piles = [3, 6, 7, 11]`, `h = 8` (note `l` narrows from `[1, 10^9]`; below shows the decisive steps once `r` reaches small values, plus the exact initial steps):

| Iteration | `[l, r]` | `mid` | Hours per pile `ceil(x / mid)` | Total `s` | `s <= 8`? | New `[l, r]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `[1, 1000000000]` | `500000000` | `[1, 1, 1, 1]` | `4` | Yes | `[1, 500000000]` |
| ... | *(26 halvings where `mid >= 11`)* | `...` | `[1, 1, 1, 1]` | `4` | Yes | `[1, 8]` (at iter 27: `mid = 7 -> s = 6 -> [1, 7]`, etc.) |
| 28 | `[1, 7]` | `4` | `[1, 2, 2, 3]` | `8` | Yes | `[1, 4]` |
| 29 | `[1, 4]` | `2` | `[2, 3, 4, 6]` | `15` | No | `[3, 4]` |
| 30 | `[3, 4]` | `3` | `[1, 2, 3, 4]` | `10` | No | `[4, 4]` |

- Loop terminates at `l === r === 4`. Returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log M)` — Where `n` is `piles.length` and `M = 10^9` is the initial upper bound `r`. Binary search runs `ceil(log2(10^9)) = 30` iterations, each scanning all `n` piles in `O(n)` time.
- **Space Complexity:** `O(1)` — Uses only constant extra scalar variables (`l`, `r`, `mid`, `s`, `x`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [875koko-eating-bananas.js](./875koko-eating-bananas.js) |

---

## Key Learnings

- Binary Search on the Answer applies whenever you want the minimum (or maximum) threshold `k` for which a monotonic boolean predicate `canFinish(k)` holds.
- Setting `r = 10^9` (from constraints) instead of scanning for `Math.max(...piles)` trades at most a few extra binary search steps for simpler code, though `r = Math.max(...piles)` is an easy micro-optimization.
- In `while (l < r)` lower-bound binary search, pairing `mid = Math.floor((l + r) / 2)` with `r = mid` and `l = mid + 1` guarantees termination without infinite loops.
