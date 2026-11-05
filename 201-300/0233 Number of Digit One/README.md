---
comments: true
difficulty: Hard
tags:
  - Math
  - Dynamic Programming
  - Recursion
---

# 233. Number of Digit One

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-digit-one/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0233` (`233`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given a non-negative integer `n`, count the total number of times the digit `1` appears across the decimal representations of all integers from `0` to `n` inclusive.

---

## Examples

### Example 1

```text
Input: n = 13
Output: 6
```

### Example 2

```text
Input: n = 0
Output: 0
```

---

## Constraints

- `0 <= n <= 10^9`

---

## Problem Understanding

Notice two key facts:
1. A single integer can contribute **multiple** `1`s to the total (for example, `11` contributes two `1`s, and `111` contributes three `1`s).
2. The upper bound is huge: `0 <= n <= 10^9`. Iterating from `0` to `10^9` is completely infeasible within time limits, whereas `10^9` has at most `10` decimal digits! That tiny digit count (`m <= 10`) makes **Digit Dynamic Programming** ideal.

---

## Approach

### Brute Force Approach

Loop `x` from `1` to `n`, repeatedly extract `x % 10` and divide `x /= 10`, incrementing a counter whenever a digit equals `1`. This takes `O(n log10 n)` operations — around `10^10` steps for `n = 10^9`, causing a guaranteed Time Limit Exceeded.

### Optimized Approach

Use top-down **Digit DP** (`dfs(i, cnt, limit)`): convert `n` into a character array `s` of length `m`, build numbers digit-by-digit from most significant (`i = 0`) to least significant (`i = m - 1`) while counting `1`s placed so far (`cnt`), and memoize unconstrained states (`!limit`) in `Integer[][] f`.

### Step-by-Step Thinking Process

1. Convert `n` to decimal characters `s = String.valueOf(n).toCharArray()` with length `m = s.length`.
2. Design state `dfs(i, cnt, limit)` where `i` is the current digit index (`0..m`), `cnt` is how many `'1'` digits have been chosen in positions `0..i - 1`, and `limit` indicates whether the prefix chosen so far equals the prefix of `n`.
3. Base case: once `i >= m`, we have formed a complete number in `[0, n]`, so return its accumulated count of ones `cnt`.
4. Determine the maximum legal digit at position `i`: `int up = limit ? s[i] - '0' : 9`. Loop `j` from `0` to `up` and sum `dfs(i + 1, cnt + (j == 1 ? 1 : 0), limit && j == up)`.
5. Cache `f[i][cnt] = ans` whenever `!limit` (when `limit` is `false`, any suffix in `00..0` to `99..9` is valid, so the result depends solely on `(i, cnt)`).

### Algorithm / Intuition

Why don't leading zeros require a separate `isNum` boolean parameter here? Because padding a shorter number like `3` into `"03"` only prepends `'0'` digits, and `'0'` never increments `cnt` (`j == 1 ? 1 : 0`)! Every integer in `[0, n]` corresponds bijectively to one `m`-character zero-padded string from `"00...0"` to `s`.

Why only memoize when `!limit`? There is only **one** tight prefix at each index `i` (the exact prefix of `n`), so `limit == true` is visited at most `m` times total! Meanwhile, thousands of loose prefixes (`limit == false`) share identical `(i, cnt)` states and reuse `f[i][cnt]` in `O(1)`.

---

## Dry Run

Tracing Example 1: `n = 13` -> `s = ['1', '3']`, `m = 2`, `f = new Integer[2][2]`:

- Call `dfs(0, 0, true)`: `up = s[0] - '0' = 1`, tries `j = 0, 1`:
  - **`j = 0`** -> calls `dfs(1, 0, false)` (covers numbers `00..09`, i.e., `0..9`):
    - `limit` is `false`, so `up = 9`. Loops `j = 0..9`:
      - For `j = 1` (`"01"`): calls `dfs(2, 1, false)` -> base case returns `1`.
      - For the other nine `j` values (`0, 2..9`): calls `dfs(2, 0, false)` -> each returns `0`.
    - Stores `f[1][0] = 1` and returns `1`.
  - **`j = 1`** -> calls `dfs(1, 1, true)` (covers numbers `10..13`):
    - `limit` is `true`, so `up = s[1] - '0' = 3`. Loops `j = 0..3`:
      - `j = 0` (`"10"`): `dfs(2, 1, false)` -> returns `1`.
      - `j = 1` (`"11"`): `dfs(2, 2, false)` -> returns `2`.
      - `j = 2` (`"12"`): `dfs(2, 1, false)` -> returns `1`.
      - `j = 3` (`"13"`): `dfs(2, 1, true)` -> returns `1`.
    - Sum for `j = 1` branch: `1 + 2 + 1 + 1 = 5`.
- Total returned by `dfs(0, 0, true)`: `1 + 5 = 6`.

---

## Complexity Analysis

- **Time Complexity:** `O((log n)^2)` — Let `m = floor(log10 n) + 1 <= 10` be the number of digits. There are `O(m^2)` states `(i, cnt)` and each state loops over at most `10` digits (`~10 * 100 = 1000` operations max).
- **Space Complexity:** `O((log n)^2)` — The memoization table `f` has dimensions `m x m` (`<= 10 x 10`), and the recursion stack has depth `m`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [233number-of-digit-one.java](./233number-of-digit-one.java) |

---

## Key Learnings

- Digit DP (`dfs(i, state, limit)`) provides a reusable template for counting digits or digit properties across `[0, n]` in polylogarithmic time without error-prone combinatorics.
- Only memoize unconstrained states (`!limit`); memoizing constrained states inside the same `f[i][cnt]` table would corrupt unconstrained queries with truncated upper bounds.
- Leading zeros do not require special tracking when counting nonzero target digits (`1..9`), because `'0'` contributes `0` to the count.
