---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Simulation
  - Prefix Sum
---

# 1894. Find the Student that Will Replace the Chalk

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-student-that-will-replace-the-chalk/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1894` (`1894`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Simulation`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

A class has `n` students indexed `0` to `n - 1`, and the teacherinitially holds `k` pieces of chalk.

Starting from student `0`, students take turns solving problems cyclically (`0, 1, ..., n - 1, 0, 1, ...`). Student `i` consumes `chalk[i]` pieces of chalk on their turn. However, if the remaining chalk before their turn is **strictly less** than `chalk[i]`, student `i` cannot finish and must **replace** the chalk.

Return the index of the student who will replace the chalk.

---

## Examples

### Example 1

```text
Input: chalk = [5,1,5], k = 22
Output: 0
Explanation: The students go in turns as follows:
- Student number 0 uses 5 chalk, so k = 17.
- Student number 1 uses 1 chalk, so k = 16.
- Student number 2 uses 5 chalk, so k = 11.
- Student number 0 uses 5 chalk, so k = 6.
- Student number 1 uses 1 chalk, so k = 5.
- Student number 2 uses 5 chalk, so k = 0.
Student number 0 does not have enough chalk, so they will have to replace it.
```

### Example 2

```text
Input: chalk = [3,4,1,2], k = 25
Output: 1
Explanation: The students go in turns as follows:
- Student number 0 uses 3 chalk so k = 22.
- Student number 1 uses 4 chalk so k = 18.
- Student number 2 uses 1 chalk so k = 17.
- Student number 3 uses 2 chalk so k = 15.
- Student number 0 uses 3 chalk so k = 12.
- Student number 1 uses 4 chalk so k = 8.
- Student number 2 uses 1 chalk so k = 7.
- Student number 3 uses 2 chalk so k = 5.
- Student number 0 uses 3 chalk so k = 2.
Student number 1 does not have enough chalk, so they will have to replace it.
```

---

## Constraints

- `chalk.length == n`

- `1 <= n <= 10^5`

- `1 <= chalk[i] <= 10^5`

- `1 <= k <= 10^9`

---

## Problem Understanding

- **Periodic Rounds:** Every complete pass through all `n` students consumes exactly `s = chalk[0] + chalk[1] + ... + chalk[n - 1]` pieces of chalk.
- **Large `k`, Small `chalk[i]` Fallback:** If `k = 10^9` and `chalk = [1]`, simulating one turn at a time takes `10^9` iterations! Modulo reduction `k %= s` skips all full rounds instantly, leaving `0 <= k < s` chalk for the final partial round.
- **64-Bit Sum Required:** With `n <= 10^5` and `chalk[i] <= 10^5`, the round sum `s` can reach `10^{10}`, exceeding Java's 32-bit `int` max (`~2.14 * 10^9`), so `s` **must** be stored in a `long`.

---

## Approach

### Brute Force Approach

Directly simulating the cyclic process (`while (k >= chalk[i]) { k -= chalk[i]; i = (i + 1) % n; }`) takes `O(k / min(chalk))` steps — up to `10^9` loop iterations when `n = 1` and `chalk[0] = 1`, risking Time Limit Exceeded.

### Optimized Approach

Sum all elements of `chalk` into a 64-bit `long s`, reduce `k %= s` to jump directly to the final incomplete round, and linearly scan `chalk` to find the first student `i` where `k < chalk[i]`.

### Step-by-Step Thinking Process

1. Accumulate the total chalk needed per full cycle into `long s = 0`.
2. Apply compound modulo `k %= s` (in Java, `k %= s` safely casts `(k % s)` back to `int` because `0 <= k % s <= k <= 10^9`).
3. Because `k` is now strictly less than `s`, the chalk is guaranteed to run out during the very next pass through `0 .. n - 1`.
4. Iterate `i` starting at `0`: if `k < chalk[i]`, return `i`; otherwise subtract `k -= chalk[i]`.

### Algorithm / Intuition

Full rounds of `s` chalk always bring the turn right back to student `0`. Taking `k %= s` strips away `floor(k / s)` full rounds in `O(1)` arithmetic, leaving `k < s`. Because the remaining chalk is strictly smaller than the sum of `chalk[0 .. n - 1]`, the loop `for (int i = 0;; ++i)` doesn't even need an `i < chalk.length` bounds check — mathematically, some student `i < n` is guaranteed to satisfy `k < chalk[i]`!

---

## Dry Run

Using **Example 1**: `chalk = [5, 1, 5]`, `k = 22`

1. **Cycle Sum:** `s = 5 + 1 + 5 = 11`.
2. **Modulo Reduction:** `k = 22 % 11 = 0` (2 complete rounds skip 22 pieces).
3. **Final Round Scan:**
   - `i = 0`: `k < chalk[0]` (`0 < 5`) is `true` -> immediately returns `0`.

*(On Example 2 with `chalk = [3, 4, 1, 2]` and `k = 25`: `s = 10`, `k = 25 % 10 = 5`. `i = 0`: `5 >= 3 -> k = 2`; `i = 1`: `2 < 4` -> returns `1`.)*

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — One pass of length `n` to compute `s` and at most one pass of length `n` to find the student.
- **Space Complexity:** `O(1)` — Only a single `long s` and loop index `i` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1894find-the-student-that-will-replace-the-chalk.java](./1894find-the-student-that-will-replace-the-chalk.java) |

---

## Key Learnings

- Whenever a simulation repeats identically over fixed-cost cycles, use `k % cycle_sum` to collapse arbitrarily large budgets into less than one cycle.
- Watch out for integer overflow on array sums: `10^5 * 10^5 = 10^{10}` overflows 32-bit `int` even when `k <= 10^9` fits in `int`.
- Note: If you stop the first sum loop early as soon as `s > k`, you can even avoid modulo altogether when a single round already exceeds `k`.
