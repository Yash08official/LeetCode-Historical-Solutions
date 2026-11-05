---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Matrix
---

# 1072. Flip Columns For Maximum Number of Equal Rows

**[View Problem on LeetCode](https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1072` (`1072`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` binary matrix `matrix` where every cell contains `0` or `1`. You may select any subset of columns and flip every bit in each chosen column (`0` becomes `1` and `1` becomes `0`).

Return the **maximum** number of rows that can simultaneously have all identical values (either an all-`0` row or an all-`1` row) after performing column flips.

---

## Examples

### Example 1

```text
Input: matrix = [[0,1],[1,1]]
Output: 1
Explanation: After flipping no values, 1 row has all values equal.
```

### Example 2

```text
Input: matrix = [[0,1],[1,0]]
Output: 2
Explanation: After flipping values in the first column, both rows have equal values.
```

### Example 3

```text
Input: matrix = [[0,0,0],[0,0,1],[1,1,0]]
Output: 2
Explanation: After flipping values in the first two columns, the last two rows have equal values.
```

---

## Constraints

- `m == matrix.length`

- `n == matrix[i].length`

- `1 <= m, n <= 300`

- `matrix[i][j]` is either `0` or `1`.

---

## Problem Understanding

- **Equivalence of Rows Under Column Flips:** Suppose a specific choice of column flips makes row `A` all `0`s (or all `1`s). Which other row `B` will also become uniform under that exact same set of flips? Only a row `B` that is either **identical** to `A` (`B[j] == A[j]` for all `j`) or the **bitwise complement** of `A` (`B[j] == 1 - A[j]` for all `j`, meaning `B` becomes all `1`s when `A` becomes all `0`s).
- **Canonical Row Normalization:** We can map both a row and its bitwise complement to the exact same canonical signature by XORing every element `row[i]` with the row's first element `row[0]`. This forces the normalized pattern to always start with `0`.
- **Counting Equivalence Classes:** The problem reduces to finding the largest frequency of any canonical row pattern across all `m` rows.

---

## Approach

### Brute Force Approach

Trying all `2^n` subsets of column flips is infeasible for `n <= 300`. A polynomial brute-force approach picks each row `r1` (`m` choices), determines the column flips needed to make `r1` all zeros, and checks every other row `r2` across all `n` columns to count how many rows match `r1` or its complement. That pairwise comparison runs in `O(m^2 * n)` time.

### Optimized Approach

Normalize each row into a `char[]` pattern of length `n` via `cs[i] = (char) (row[0] ^ row[i])`, convert it to a `String`, and count pattern frequencies in a `HashMap<String, Integer>` in a single `O(m * n)` pass.

### Step-by-Step Thinking Process

1. Realize that any row can be made uniform by flipping either all columns where `row[i] == 1` (making it all `0`s) or all columns where `row[i] == 0` (making it all `1`s).
2. Notice two rows can be made uniform simultaneously if and only if `rowA` equals `rowB` or `rowA` equals the bitwise negation of `rowB`.
3. Normalize each row relative to its leading bit `row[0]` using XOR: `row[0] ^ row[i]`. For `[0, 1, 0]` this gives `[0, 1, 0]`, and for its complement `[1, 0, 1]` this also gives `[0, 1, 0]`.
4. Insert each normalized `String` key into a `HashMap` `cnt` using `cnt.merge(...)` and track the highest count `ans`.

### Algorithm / Intuition

In `maxEqualRowsAfterFlips`, `cnt` is a `HashMap<String, Integer>` mapping each normalized row signature to how many rows belong to that equivalence class.

For each `row` in `matrix`, we allocate `char[] cs = new char[n]` and populate `cs[i] = (char) (row[0] ^ row[i])`. Note that `row[0] ^ row[i]` evaluates to integer `0` (if `row[i]` matches `row[0]`) or `1` (if `row[i]` differs from `row[0]`), stored directly as character codes `'\u0000'` and `'\u0001'`. `String.valueOf(cs)` turns this `char[]` into an immutable hashable `String` key. Calling `cnt.merge(String.valueOf(cs), 1, Integer::sum)` increments the pattern's count and returns the updated frequency, allowing `ans = Math.max(ans, ...)` to maintain the maximum group size on the fly.

---

## Dry Run

Using **Example 1** (`matrix = [[0, 1], [1, 1]]`, `n = 2`):

1. **Row 0 (`[0, 1]`):**
   - `row[0] = 0`.
   - `i = 0`: `cs[0] = (char) (0 ^ 0)` -> `(char) 0`.
   - `i = 1`: `cs[1] = (char) (0 ^ 1)` -> `(char) 1`.
   - Key pattern `[0, 1]` merged into `cnt` -> count becomes `1`; `ans = max(0, 1) = 1`.
2. **Row 1 (`[1, 1]`):**
   - `row[0] = 1`.
   - `i = 0`: `cs[0] = (char) (1 ^ 1)` -> `(char) 0`.
   - `i = 1`: `cs[1] = (char) (1 ^ 1)` -> `(char) 0`.
   - Key pattern `[0, 0]` merged into `cnt` -> count becomes `1`; `ans = max(1, 1) = 1`.
3. **Return:** `ans = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — For each of the `m` rows, we compute `n` XOR operations, construct a `String` of length `n`, and hash it into `cnt` in `O(n)` time.
- **Space Complexity:** `O(m * n)` — In the worst case where all `m` rows have distinct normalized patterns, `cnt` stores `m` `String` keys each of length `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1072flip-columns-for-maximum-number-of-equal-rows.java](./1072flip-columns-for-maximum-number-of-equal-rows.java) |

---

## Key Learnings

- XORing every element of a binary array with its first element (`row[0] ^ row[i]`) is a classic canonicalization trick that collapses `x` and `~x` into the same representation.
- Java's `Map.merge(key, 1, Integer::sum)` concisely increments a frequency map entry and returns the new count in one expression.
- Converting global column-flip optimization into row equivalence classes reduces an exponential `2^n` search space to linear `O(m * n)` hashing.
