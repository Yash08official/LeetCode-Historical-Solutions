---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Simulation
---

# 2028. Find Missing Observations

**[View Problem on LeetCode](https://leetcode.com/problems/find-missing-observations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2028` (`2028`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

A 6-sided die (faces `1` through `6`) was rolled `n + m` times. You have the `m` known outcomes in the integer array `rolls`, `n` outcomes are missing, and you know the exact integer **average** `mean` across all `n + m` rolls.

Return **any** valid array of length `n` (with values in `1..6`) representing the missing rolls so that the overall average equals `mean`, or return an empty array `[]` if no valid combination exists.

---

## Examples

### Example 1

```text
Input: rolls = [3,2,4,3], mean = 4, n = 2
Output: [6,6]
Explanation: The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.
```

### Example 2

```text
Input: rolls = [1,5,6], mean = 3, n = 4
Output: [2,3,2,2]
Explanation: The mean of all n + m rolls is (1 + 5 + 6 + 2 + 3 + 2 + 2) / 7 = 3.
```

### Example 3

```text
Input: rolls = [1,2,3,4], mean = 6, n = 4
Output: []
Explanation: It is impossible for the mean to be 6 no matter what the 4 missing rolls are.
```

---

## Constraints

- `m == rolls.length`

- `1 <= n, m <= 10^5`

- `1 <= rolls[i], mean <= 6`

---

## Problem Understanding

- Since the average of `n + m` rolls is `mean`, the exact sum of **all** `n + m` rolls must be `totalSum = (n + m) * mean`.
- Subtracting the sum `sum` of the `m` known rolls gives the exact required sum of the `n` missing rolls: `remainingSum = totalSum - sum`.
- When can `n` dice (each between `1` and `6` inclusive) sum to `remainingSum`?
  - Minimum possible sum of `n` dice is `1 * n = n`.
  - Maximum possible sum of `n` dice is `6 * n`.
  - By discrete continuity (starting from `[1, 1, ..., 1]` and incrementing dice one pip at a time up to `[6, 6, ..., 6]`), **every** integer `remainingSum` in `[n, 6 * n]` is achievable, and **nothing** outside `[n, 6 * n]` is achievable!

---

## Approach

### Brute Force Approach

Using backtracking to try values `1..6` across `n` positions until hitting `remainingSum` explores up to `6^n` branches in the worst case (`n <= 10^5`), which fails immediately when direct math constructs an answer in `O(n)`.

### Optimized Approach

Compute `remainingSum = (n + m) * mean - sum(rolls)`. If `remainingSum < n || remainingSum > 6 * n`, return `new int[0]`. Otherwise distribute `remainingSum` evenly across `n` slots using quotient `base = remainingSum / n` and remainder `extra = remainingSum % n`, giving the first `extra` slots `base + 1` and the rest `base`.

### Step-by-Step Thinking Process

1. Calculate `totalSum = (n + m) * mean` and accumulate `sum` over `rolls` (max `totalSum` is `(2 * 10^5) * 6 = 1.2 * 10^6`, safely fitting in 32-bit `int`).
2. Compute `remainingSum = totalSum - sum`.
3. Check feasibility: if `remainingSum < n || remainingSum > 6 * n`, return an empty `int[0]`.
4. Compute `base = remainingSum / n` and `extra = remainingSum % n`.
5. Notice why `base + 1` never exceeds `6`: if `base == 6`, then `remainingSum >= 6 * n`, which given `remainingSum <= 6 * n` forces `remainingSum == 6 * n` and `extra == 0`! Thus every entry `base + (i < extra ? 1 : 0)` is guaranteed to lie in `[1, 6]`.

### Algorithm / Intuition

In `missingRolls`, once `remainingSum` is validated to lie within `[n, 6 * n]`, integer division `base = remainingSum / n` and modulo `extra = remainingSum % n` satisfy the identity `remainingSum == extra * (base + 1) + (n - extra) * base`. Assigning `base + 1` to indices `0 .. extra - 1` and `base` to indices `extra .. n - 1` produces `n` valid die values summing to `remainingSum` in a single pass with zero trial-and-error.

---

## Dry Run

Tracing Example 1 (`rolls = [3, 2, 4, 3], mean = 4, n = 2`) and Example 2 (`rolls = [1, 5, 6], mean = 3, n = 4`):

| Variable | Example 1 (`m = 4, n = 2, mean = 4`) | Example 2 (`m = 3, n = 4, mean = 3`) |
| :--- | :--- | :--- |
| `totalSum = (n + m) * mean` | `(2 + 4) * 4 = 24` | `(4 + 3) * 3 = 21` |
| `sum` of `rolls` | `3 + 2 + 4 + 3 = 12` | `1 + 5 + 6 = 12` |
| `remainingSum` | `24 - 12 = 12` (in `[2, 12]`) | `21 - 12 = 9` (in `[4, 24]`) |
| `base = remainingSum / n` | `12 / 2 = 6` | `9 / 4 = 2` |
| `extra = remainingSum % n` | `12 % 2 = 0` | `9 % 4 = 1` |
| Constructed `result` | `[6, 6]` | `[3, 2, 2, 2]` (`i = 0 < 1` gets `2 + 1 = 3`) |

---

## Complexity Analysis

- **Time Complexity:** `O(m + n)` — `O(m)` to sum the `m` known rolls plus `O(n)` to populate the `n` missing rolls in `result`.
- **Space Complexity:** `O(1)` auxiliary space (`O(n)` total space for the returned array `result`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2028find-missing-observations.java](./2028find-missing-observations.java) |

---

## Key Learnings

- Equitable distribution via quotient + remainder (`val = sum / n + (i < sum % n ? 1 : 0)`) is the cleanest way to partition an integer `sum` into `n` bounded parts.
- Always check feasibility using extreme bounds `[min_val * n, max_val * n]` before constructing an array.
