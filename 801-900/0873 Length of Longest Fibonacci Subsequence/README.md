---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Dynamic Programming
---

# 873. Length of Longest Fibonacci Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/length-of-longest-fibonacci-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0873` (`873`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **strictly increasing** integer array `arr` containing positive numbers. A sequence of at least `3` elements is called **Fibonacci-like** if every element from the third onward equals the sum of the two immediately preceding elements (`x_k + x_{k+1} == x_{k+2}`).

Your goal is to find the **length** of the longest Fibonacci-like subsequence that can be formed by deleting zero or more elements from `arr` without changing the relative order of the remaining elements. If no Fibonacci-like subsequence of length `3` or greater exists, return `0`.

---

## Examples

### Example 1

```text
Input: arr = [1,2,3,4,5,6,7,8]
Output: 5
Explanation: The longest subsequence that is fibonacci-like: [1,2,3,5,8].
```

### Example 2

```text
Input: arr = [1,3,7,11,12,14,18]
Output: 3
Explanation: The longest subsequence that is fibonacci-like: [1,11,12], [3,11,14] or [7,11,18].
```

---

## Constraints

- `3 <= arr.length <= 1000`

- `1 <= arr[i] < arr[i + 1] <= 10^9`

---

## Problem Understanding

- **Strict Monotonicity Implies Uniqueness:** Because `arr` is strictly increasing (`arr[0] < arr[1] < ... < arr[n - 1]`), every value appears at most once, and any subsequence automatically preserves increasing order.
- **Two Elements Determine the Rest:** In a Fibonacci-like sequence, knowing any two consecutive terms `(arr[j], arr[i])` with `j < i` uniquely fixes the required previous term as `t = arr[i] - arr[j]`.
- **Ordering Constraint on Previous Term:** For `t` to precede `arr[j]` in the subsequence, `t` must exist in `arr` at some index `k` strictly less than `j` (`k < j`, which is equivalent to `t < arr[j]`).
- **Minimum Valid Length:** Any pair of elements has length `2`, which is not yet a valid Fibonacci-like sequence. We must return `0` unless at least one triple `(arr[k], arr[j], arr[i])` is found.

---

## Approach

### Brute Force Approach

A naive approach chooses every possible starting pair `(arr[j], arr[i])` with `0 <= j < i < n` and repeatedly searches forward in `arr` (or in a hash set) for `arr[j] + arr[i]`, advancing the pair until the next sum is missing. Checking every pair with linear search takes `O(n^3)` time, and even with a hash set it takes `O(n^2 log(max(arr)))` time while re-traversing overlapping Fibonacci chains.

### Optimized Approach

We use **2D Dynamic Programming** combined with a **Hash Map** for `O(1)` value-to-index lookups. Specifically, we define `f[i][j]` (for `j < i`) as the length of the longest Fibonacci-like chain ending with `arr[j]` followed by `arr[i]`, transitioning from `f[j][k] + 1` whenever `arr[k] = arr[i] - arr[j]` exists with `k < j`.

### Step-by-Step Thinking Process

1. A standard 1D DP state `dp[i]` (longest sequence ending at `i`) is insufficient because knowing only the last element `arr[i]` does not tell us what the penultimate element was.
2. By tracking the last **two** indices `(j, i)` with `j < i` in a 2D table `f[i][j]`, the required predecessor value is uniquely determined: `t = arr[i] - arr[j]`.
3. Because `arr` has strictly increasing (unique) elements, we can store each value's index in a `HashMap` `d` (`arr[idx] -> idx`) to look up `t` in `O(1)` time.
4. Initialize every pair `f[i][j] = 2` for `0 <= j < i < n` as a base pair of two elements, while keeping `ans = 0` so pairs of length `2` are never mistakenly returned.
5. Iterate `i` from `2` to `n - 1` and `j` from `1` to `i - 1`: if `k = d.get(arr[i] - arr[j])` exists and satisfies `k < j`, extend the chain via `f[i][j] = Math.max(f[i][j], f[j][k] + 1)` and update `ans`.

### Algorithm / Intuition

In `lenLongestFibSubseq`, `d` maps each element `arr[i]` to its index `i`, and the `n x n` table `f` initializes `f[i][j] = 2` for all `j < i` during the setup loop.

In the main nested loops (`i` from `2` to `n - 1`, `j` from `1` to `i - 1`), we test whether `(arr[j], arr[i])` can extend an earlier pair `(arr[k], arr[j])`. We compute `t = arr[i] - arr[j]` and look up `Integer k = d.get(t)`. Checking `k != null && k < j` ensures both that `t` is present in `arr` and that `arr[k]` comes strictly before `arr[j]` (preventing reuse of `arr[j]` when `arr[i] == 2 * arr[j]` or out-of-order indices when `t > arr[j]`). When valid, `f[j][k]` already holds the best chain length ending at `(arr[k], arr[j])` (at least `2`), so `f[i][j]` becomes at least `3`, and `ans` records the maximum length seen.

---

## Dry Run

Trace on **Example 1**: `arr = [1, 2, 3, 4, 5, 6, 7, 8]` (`n = 8`)

- **Setup:** `d = {1:0, 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:7}`, all `f[i][j] = 2` (`j < i`), `ans = 0`.

| `i` (`arr[i]`) | `j` (`arr[j]`) | `t = arr[i] - arr[j]` | `k = d.get(t)` (`k < j`?) | Transition & Updated `f[i][j]` | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `2` (`3`) | `1` (`2`) | `1` | `k = 0` (Yes) | `f[2][1] = f[1][0] + 1 = 3` (`[1,2,3]`) | `3` |
| `3` (`4`) | `2` (`3`) | `1` | `k = 0` (Yes) | `f[3][2] = f[2][0] + 1 = 3` (`[1,3,4]`) | `3` |
| `4` (`5`) | `2` (`3`) | `2` | `k = 1` (Yes) | `f[4][2] = f[2][1] + 1 = 4` (`[1,2,3,5]`) | `4` |
| `4` (`5`) | `3` (`4`) | `1` | `k = 0` (Yes) | `f[4][3] = f[3][0] + 1 = 3` (`[1,4,5]`) | `4` |
| `5..6` (`6, 7`) | various | various | valid `k < j` | reaches max `4` (e.g. `[1,3,4,7]`, `[1,2,3]...`) | `4` |
| `7` (`8`) | `4` (`5`) | `3` | `k = 2` (Yes) | `f[7][4] = f[4][2] + 1 = 5` (`[1,2,3,5,8]`) | `5` |

- **Final Result:** Returns `ans = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Both the initialization loop and the main DP transition loops iterate over pairs `(i, j)` with `0 <= j < i < n`, doing `O(1)` average-time `HashMap` lookups per pair.
- **Space Complexity:** `O(n^2)` — The 2D integer array `f` requires `n * n` cells, and the `HashMap` `d` stores `n` key-value pairs.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [873length-of-longest-fibonacci-subsequence.java](./873length-of-longest-fibonacci-subsequence.java) |

---

## Key Learnings

- When a recurrence depends on the previous **two** elements (like Fibonacci or arithmetic progressions), parameterizing the DP state by the last pair of indices `f[i][j]` turns history dependence into a clean first-order transition.
- Checking `k < j` is essential: if `arr[i] = 2 * arr[j]`, `t` equals `arr[j]` (`k == j`), and if `arr[j] < arr[i] / 2`, `t > arr[j]` (`k > j`)—both must be rejected.
- Keeping `ans = 0` outside the base initialization `f[i][j] = 2` cleanly enforces the `length >= 3` requirement without post-processing.
