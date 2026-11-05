---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 1014. Best Sightseeing Pair

**[View Problem on LeetCode](https://leetcode.com/problems/best-sightseeing-pair/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1014` (`1014`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `values` where `values[i]` is the rating of the `i`-th sightseeing spot. For any pair of spots `(i, j)` with `i < j`, their sightseeing score is defined as:

`values[i] + values[j] + i - j`

(the sum of both ratings minus the distance `j - i` between them). Return the **maximum score** achievable across all pairs `i < j`.

---

## Examples

### Example 1

```text
Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11
```

### Example 2

```text
Input: values = [1,2]
Output: 2
```

---

## Constraints

- `2 <= values.length <= 5 * 10^4`

- `1 <= values[i] <= 1000`

---

## Problem Understanding

- **Algebraic Decoupling:** Regroup `values[i] + values[j] + i - j` by index:
  `(values[i] + i) + (values[j] - j)`.
  Notice that the `i` term `(values[i] + i)` depends **only** on `i`, and the `j` term `(values[j] - j)` depends **only** on `j`!
- **Prefix Maximum Reduction:** For a fixed right spot `j`, maximizing `(values[i] + i) + (values[j] - j)` over all `0 <= i < j` simply means picking the maximum value of `values[i] + i` seen before index `j`.

---

## Approach

### Brute Force Approach

Evaluating `values[i] + values[j] + i - j` over all `O(n^2)` pairs `0 <= i < j < n` requires up to `1.25 * 10^9` operations for `n = 5 * 10^4`, resulting in Time Limit Exceeded.

### Optimized Approach

Maintain a running prefix maximum `mx` of `values[i] + i` in a single pass over `j`, updating `ans = Math.max(ans, mx + values[j] - j)` before updating `mx = Math.max(mx, values[j] + j)`.

### Step-by-Step Thinking Process

1. Rewrite the objective `max_{i < j} (values[i] + values[j] + i - j)` as `max_j [ (max_{i < j} (values[i] + i)) + (values[j] - j) ]`.
2. Keep a single variable `mx` storing `max_{0 <= i < j} (values[i] + i)` as `j` scans left to right.
3. At each index `j`, first update `ans` using the prior `mx` (`mx + values[j] - j`) so `i < j` is respected, then fold `j` into `mx` (`Math.max(mx, values[j] + j)`) for future indices.
4. Verify the `j = 0` boundary: starting with `ans = 0, mx = 0` sets `ans = values[0]` and `mx = values[0]` at `j = 0`, and since `values.length >= 2` and `values[1] >= 1`, at `j = 1` the genuine pair `(0, 1)` scores `values[0] + values[1] - 1 >= values[0]`, always matching or beating the `j = 0` placeholder!

### Algorithm / Intuition

In `maxScoreSightseeingPair`, separating `i` and `j` turns a 2D pair search into a 1D prefix-max scan.

Look closely at why starting the loop at `j = 0` with `mx = 0` is safe even though `j = 0` has no valid `i < 0`: at `j = 0`, `ans` temporarily becomes `0 + values[0] - 0 = values[0]`, and `mx` becomes `values[0] + 0 = values[0]`. Immediately at `j = 1` (which always exists since `values.length >= 2`), `mx + values[1] - 1 = values[0] + values[1] - 1`. Because constraints guarantee `values[1] >= 1`, `values[1] - 1 >= 0`, so `values[0] + values[1] - 1 >= values[0]`. Thus the dummy `j = 0` score can never exceed the true pair `(0, 1)`!

---

## Dry Run

Trace on **Example 1**: `values = [8, 1, 5, 2, 6]`

| `j` | `values[j]` | `mx` (before `j`) | Candidate `mx + values[j] - j` | `ans` | Updated `mx = max(mx, values[j] + j)` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `8` | `0` | `0 + 8 - 0 = 8` | `8` | `max(0, 8 + 0) = 8` |
| `1` | `1` | `8` | `8 + 1 - 1 = 8` (`i=0, j=1`) | `8` | `max(8, 1 + 1) = 8` |
| `2` | `5` | `8` | `8 + 5 - 2 = 11` (`i=0, j=2`) | `11` | `max(8, 5 + 2) = 8` |
| `3` | `2` | `8` | `8 + 2 - 3 = 7` (`i=0, j=3`) | `11` | `max(8, 2 + 3) = 8` |
| `4` | `6` | `8` | `8 + 6 - 4 = 10` (`i=0, j=4`) | `11` | `max(8, 6 + 4) = 10` |

- **Final Result:** Returns `ans = 11`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates through `values` once with two `Math.max` calls per element.
- **Space Complexity:** `O(1)` — Uses only two integer variables (`ans` and `mx`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1014best-sightseeing-pair.java](./1014best-sightseeing-pair.java) |

---

## Key Learnings

- Whenever a pairwise formula over `i < j` mixes indices and values additively (e.g., `A[i] + A[j] + i - j` or `|i - j|`), group all `i`-dependent terms together and all `j`-dependent terms together to unlock an `O(n)` prefix-extremum pass.
- Note: If `values[i]` could be `0` or negative, initializing `mx = values[0] + 0` and starting `j = 1` avoids any reliance on `values[1] >= 1`.
