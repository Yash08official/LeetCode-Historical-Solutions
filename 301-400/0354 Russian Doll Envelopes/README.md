---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Dynamic Programming
  - Sorting
  - Longest Increasing Subsequence
---

# 354. Russian Doll Envelopes

**[View Problem on LeetCode](https://leetcode.com/problems/russian-doll-envelopes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0354` (`354`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Dynamic Programming`, `Sorting`, `Longest Increasing Subsequence` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `envelopes` where `envelopes[i] = [w_i, h_i]` specifies the width and height of the `i`-th envelope. Envelope `A` fits inside envelope `B` if and only if both `w_A < w_B` and `h_A < h_B` strictly. Rotating envelopes is not allowed.

Return the maximum number of envelopes you can nest one inside another (like Russian dolls).

---

## Examples

### Example 1

```text
Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
```

### Example 2

```text
Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
```

---

## Constraints

- `1 <= envelopes.length <= 10^5`

- `envelopes[i].length == 2`

- `1 <= w_i, h_i <= 10^5`

---

## Problem Understanding

We want the longest chain of envelopes `(w_{i_1}, h_{i_1}), ..., (w_{i_k}, h_{i_k})` such that widths strictly increase AND heights strictly increase. Because nesting is symmetric with respect to input order, we are free to sort `envelopes` first.

Key observations:
- Sorting widths in ascending order lines up potential outer envelopes from narrowest to widest, reducing the problem to finding a **Longest Increasing Subsequence (LIS)** on heights.
- **Crucial trap with equal widths:** If `[5, 4]` and `[5, 6]` appear in that order, a plain LIS on heights `[4, 6]` would pick both even though `5 < 5` is false! Sorting equal-width envelopes by **height descending** (`[5, 6]` before `[5, 4]`) guarantees at most one envelope per distinct width can ever participate in a strictly increasing height subsequence.

---

## Approach

### Brute Force Approach

After sorting `envelopes` by width ascending, standard dynamic programming computes `dp[i] = 1 + max(dp[j])` over all `0 <= j < i` where `w_j < w_i` and `h_j < h_i`.

Because `n` can be up to `10^5`, checking all `O(n^2)` pairs requires up to `10^{10}` operations and results in **Time Limit Exceeded (TLE)**.

### Optimized Approach

Sort `envelopes` by width **ascending** and, when widths tie, by height **descending**. Then compute the Longest Increasing Subsequence (LIS) of the heights in `O(n log n)` time using **Patience Sorting / Binary Search** with a 1-indexed monotonic tail array `d`.

### Step-by-Step Thinking Process

1. Sort `envelopes` using comparator `(a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]`.
2. Maintain a 1-indexed array `d` where `d[len]` stores the smallest possible ending height of an increasing subsequence of length `len`, and `size` tracks the longest length found so far.
3. Initialize `d[1] = envelopes[0][1]` and `size = 1`.
4. For each subsequent height `x = envelopes[i][1]`: if `x > d[size]`, extend the longest chain via `d[++size] = x`.
5. Otherwise, binary search `d[1..size]` for the first index `left` where `d[left] >= x` and lower that tail value to `x` (`d[p] = x`), keeping future extension opportunities as wide open as possible.
6. Return `size` after scanning all `n` envelopes.

### Algorithm / Intuition

Why does sorting ties by descending height (`b[1] - a[1]`) work? Suppose width `6` has heights `7` and `4`. Placed in order `[6, 7], [6, 4]`, height `7` is processed first, and then height `4` is `<= 7`, so `4` cannot extend any subsequence ending at `7`—instead, `4` can only overwrite `7` (or an earlier tail) at the same or shorter length!

Inside the loop, `d[1..size]` is always strictly increasing. When `x <= d[size]`, the binary search (`while (left < right)` with `mid = (left + right) >> 1` and `if (d[mid] >= x) right = mid; else left = mid + 1;`) finds the exact lower bound `d[left] >= x` and updates `d[p] = x`.

---

## Dry Run

Tracing `maxEnvelopes([[5,4],[6,4],[6,7],[2,3]])` (**Example 1**):

1. **Sort `(w asc, h desc)`:** `[[2,3], [5,4], [6,7], [6,4]]`
2. **Initialize:** `d[1] = 3`, `size = 1` (`d[1..size] = [3]`)

| `i` | Envelope | Height `x` | Comparison with `d[size]` | Action | `d[1..size]` | `size` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `[5, 4]` | `4` | `4 > 3` | `d[++size] = 4` | `[3, 4]` | `2` |
| `2` | `[6, 7]` | `7` | `7 > 4` | `d[++size] = 7` | `[3, 4, 7]` | `3` |
| `3` | `[6, 4]` | `4` | `4 <= 7` | Binary search `[1..3]` -> `left = 2` (`d[2] = 4`), set `d[2] = 4` | `[3, 4, 7]` | `3` |

Returns `size = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting `n` envelopes takes `O(n log n)` time, and each of the `n - 1` iterations performs at most one `O(log n)` binary search on `d`.
- **Space Complexity:** `O(n)` — The tail array `d` of length `n + 1` (plus `O(log n)` to `O(n)` sorting workspace in Java's `Arrays.sort`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [354russian-doll-envelopes.java](./354russian-doll-envelopes.java) |

---

## Key Learnings

- 2D strict partial-order chaining reduces to 1D Longest Increasing Subsequence when you sort the primary dimension ascending and tie-break the secondary dimension descending.
- In Java, since `1 <= w_i, h_i <= 10^5`, subtraction `a[0] - b[0]` cannot overflow `int`; for arbitrary 32-bit integers, prefer `Integer.compare(a[0], b[0])`.
- Note that `d[1..size]` stores minimal tail values for each length rather than the actual subsequence itself, while `size` always equals the exact LIS length.
