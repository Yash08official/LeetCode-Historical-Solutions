---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Counting
---

# 1497. Check If Array Pairs Are Divisible by k

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1497` (`1497`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `arr` of **even** length `n` and a positive integer `k`. Determine whether `arr` can be partitioned into `n / 2` disjoint pairs such that the **sum of every pair** is divisible by `k`.

Return `true` if such a pairing exists, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
Output: true
Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
```

### Example 2

```text
Input: arr = [1,2,3,4,5,6], k = 7
Output: true
Explanation: Pairs are (1,6),(2,5) and(3,4).
```

### Example 3

```text
Input: arr = [1,2,3,4,5,6], k = 10
Output: false
Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.
```

---

## Constraints

- `arr.length == n`

- `1 <= n <= 10^5`

- `n` is even.

- `-10^9 <= arr[i] <= 10^9`

- `1 <= k <= 10^5`

---

## Problem Understanding

By modular arithmetic, `(a + b)` is divisible by `k` if and only if `(a mod k + b mod k) mod k == 0`. Normalizing remainders `r = ((x % k) + k) % k` into `[0, k - 1]` reveals three cases:
1. **Remainder `0`**: An element with remainder `0` can only pair with *another* element of remainder `0`. Thus `freq[0]` must be **even**.
2. **Complementary remainders `r` and `k - r` (`1 <= r < k / 2`)**: Every element with remainder `r` must pair with an element of remainder `k - r`, so `freq[r]` must equal `freq[k - r]`.
3. **Midpoint remainder `k / 2` (when `k` is even)**: Elements with remainder `k / 2` must pair with each other (`freq[k / 2]` must be even). Remarkably, because total length `n` is even, `freq[0]` is even, and every `freq[r] + freq[k - r] = 2 * freq[r]` is even, **`freq[k / 2]` is automatically guaranteed to be even** whenever conditions (1) and (2) hold!

Watch out for **negative numbers** (`-10^9 <= arr[i] <= 10^9`): in Java, `-1 % 5` evaluates to `-1`, so we must normalize via `(x % k + k) % k`.

---

## Approach

### Brute Force Approach

Trying to match pairs greedily by scanning `arr` with a `boolean[] used` array takes `O(n^2)` time, and backtracking over arbitrary pairings is exponential.

### Optimized Approach

The solution uses **remainder frequency counting**:
1. Allocate `int[] freq = new int[k]` and tally normalized remainders `(x % k + k) % k` for every `x` in `arr`.
2. Verify `freq[0] % 2 == 0`.
3. Loop `i` from `1` to `k / 2` and verify `freq[i] == freq[k - i]`.

### Step-by-Step Thinking Process

1. Reduce each number `x` in `arr` to its non-negative remainder modulo `k` using `(x % k + k) % k`.
2. Count how many numbers fall into each remainder bucket `0..k - 1` in `freq`.
3. Check remainder `0` separately: if `freq[0]` is odd (`freq[0] % 2 != 0`), return `false`.
4. For each `i` from `1` to `k / 2`, check `freq[i] == freq[k - i]`; if any complementary pair has mismatched counts, return `false`.
5. If all checks pass, return `true`.

### Algorithm / Intuition

In `canArrange(int[] arr, int k)`, `(x % k + k) % k` maps every negative, zero, or positive `int` cleanly into `[0, k - 1]` without overflow (since `x % k` is in `[-(k - 1), k - 1]` and `k <= 10^5`). Then `if (freq[0] % 2 != 0) return false;` checks self-paired multiples of `k`, and `for (int i = 1; i <= k / 2; ++i)` enforces symmetry `freq[i] == freq[k - i]`. As noted earlier, when `k` is even and `i == k / 2`, `freq[k / 2]`'s evenness is already forced by `n` being even! (The solution file also includes a small `main` harness testing Example 1.)

---

## Dry Run

Trace on **Example 1**: `arr = [1, 2, 3, 4, 5, 10, 6, 7, 8, 9]`, `k = 5`

1. **Populate `freq[5]`**:
   - `1, 6` -> remainder `1` -> `freq[1] = 2`
   - `2, 7` -> remainder `2` -> `freq[2] = 2`
   - `3, 8` -> remainder `3` -> `freq[3] = 2`
   - `4, 9` -> remainder `4` -> `freq[4] = 2`
   - `5, 10` -> remainder `0` -> `freq[0] = 2`
   - `freq = [2, 2, 2, 2, 2]`
2. **Check `freq[0]`**: `2 % 2 == 0` -> valid.
3. **Check Complements (`1 <= i <= 2`)**:
   - `i = 1`: `freq[1] == freq[4]` (`2 == 2`) -> valid.
   - `i = 2`: `freq[2] == freq[3]` (`2 == 2`) -> valid.

Returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + k)` — Iterating over `arr` takes `O(n)` time, and allocating/checking the `freq` array takes `O(k)` time.
- **Space Complexity:** `O(k)` — The remainder frequency table `freq` uses an integer array of size `k`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1497check-if-array-pairs-are-divisible-by-k.java](./1497check-if-array-pairs-are-divisible-by-k.java) |

---

## Key Learnings

- In Java, C++, and JavaScript, `%` is a *remainder* operator (preserving the dividend's sign), not Euclidean modulo — always use `((x % k) + k) % k` when array elements can be negative.
- Pair-sum divisibility reduces each arbitrary integer to one of `k` equivalence classes modulo `k`.
- Parity conservation (`n` even, `freq[0]` even, `freq[i] + freq[k - i]` even) guarantees `freq[k / 2]` is automatically even when `k` is even.
