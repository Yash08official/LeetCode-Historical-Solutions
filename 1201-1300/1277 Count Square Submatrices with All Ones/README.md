---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 1277. Count Square Submatrices with All Ones

**[View Problem on LeetCode](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1277` (`1277`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an `m x n` binary matrix `matrix` filled with `0`s and `1`s. Count and return the total number of **square** submatrices (of any side length `1 x 1`, `2 x 2`, `3 x 3`, etc.) whose cells contain **only** `1`s.

---

## Examples

### Example 1

```text
Input: matrix =
[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
Output: 15
Explanation:
There are 10 squares of side 1.
There are 4 squares of side 2.
There is  1 square of side 3.
Total number of squares = 10 + 4 + 1 = 15.
```

### Example 2

```text
Input: matrix =
[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
Output: 7
Explanation:
There are 6 squares of side 1.
There is 1 square of side 2.
Total number of squares = 6 + 1 = 7.
```

---

## Constraints

- `1 <= arr.length <= 300`

- `1 <= arr[0].length <= 300`

- `0 <= arr[i][j] <= 1`

---

## Problem Understanding

- Every single cell with `matrix[i][j] == 1` is itself a valid `1 x 1` square submatrix.
- A `k x k` square of all `1`s with bottom-right corner at `(i, j)` exists if and only if `matrix[i][j] == 1` AND `(i - 1, j)`, `(i, j - 1)`, and `(i - 1, j - 1)` can each serve as the bottom-right corner of at least a `(k - 1) x (k - 1)` square of all `1`s.
- Crucially, if the **largest** all-ones square ending at `(i, j)` has side length `s`, then `(i, j)` is the bottom-right corner of **exactly `s`** all-ones squares (of sizes `1 x 1`, `2 x 2`, ..., `s x s`).
- With `1 <= m, n <= 300`, `m * n <= 90,000`, making an `O(m * n)` dynamic programming solution ideal.

---

## Approach

### Brute Force Approach

For every possible top-left corner `(i, j)` and every possible side length `k` from `1` to `min(m - i, n - j)`, iterate over all `k^2` cells inside the candidate square to verify they are all `1`s. In an `n x n` matrix of all ones, this takes `O(n^5)` (or `O(m * n * min(m, n)^3)`) operations, which easily times out for `300 x 300`.

### Optimized Approach

Use 2D Dynamic Programming where `f[i][j]` denotes the side length of the largest square of all `1`s with bottom-right corner at `(i, j)`. Compute `f[i][j]` from its top, left, and top-left neighbors in `O(1)` time, and accumulate `ans += f[i][j]` over all cells.

### Step-by-Step Thinking Process

1. Group all valid square submatrices uniquely by their **bottom-right** corner `(i, j)` so no square is counted twice.
2. Notice that if `matrix[i][j] === 0`, zero all-ones squares can end at `(i, j)` (`f[i][j] = 0`).
3. If `matrix[i][j] === 1` and `(i, j)` lies on the top row (`i === 0`) or leftmost column (`j === 0`), only a `1 x 1` square can end there (`f[i][j] = 1`).
4. For interior cells `(i > 0, j > 0)` with `matrix[i][j] === 1`, expanding a square upward and leftward is bottlenecked by the smallest of the three adjacent DP states: `f[i - 1][j - 1]`, `f[i - 1][j]`, and `f[i][j - 1]`. Adding `(i, j)` extends that bottleneck by `1`.
5. Add `f[i][j]` directly to `ans` because side length `f[i][j]` implies valid squares of every integer side length `1, 2, ..., f[i][j]` ending at `(i, j)`.

### Algorithm / Intuition

In `countSquares`, `f` is an `m x n` zero-initialized DP table. Scanning row by row (`i = 0..m-1`) and column by column (`j = 0..n-1`) guarantees that when we reach `(i, j)`, `f[i - 1][j - 1]`, `f[i - 1][j]`, and `f[i][j - 1]` are already finalized. Zero cells are skipped via `continue` (`f[i][j]` stays `0`). Border `1`-cells set `f[i][j] = 1`, while interior `1`-cells compute `Math.min(f[i - 1][j - 1], Math.min(f[i - 1][j], f[i][j - 1])) + 1`. Visually, the three `k x k` squares ending at `(i - 1, j - 1)`, `(i - 1, j)`, and `(i, j - 1)` together cover every cell of the `(k + 1) x (k + 1)` square ending at `(i, j)` except `(i, j)` itself.

---

## Dry Run

Tracing `matrix = [[0,1,1,1], [1,1,1,1], [0,1,1,1]]` (**Example 1**, `m = 3`, `n = 4`):

| Row `i` | Computed row `f[i]` | Row sum added to `ans` | Running `ans` |
| :--- | :--- | :--- | :--- |
| `i = 0` | `[0, 1, 1, 1]` (first row base cases where `matrix[0][j] === 1`) | `0 + 1 + 1 + 1 = 3` | `3` |
| `i = 1` | `j=0`: `1` (first col)<br>`j=1`: `min(0, 1, 1) + 1 = 1`<br>`j=2`: `min(1, 1, 1) + 1 = 2`<br>`j=3`: `min(1, 1, 2) + 1 = 2` -> `[1, 1, 2, 2]` | `1 + 1 + 2 + 2 = 6` | `9` |
| `i = 2` | `j=0`: `0` (skipped)<br>`j=1`: `min(1, 1, 0) + 1 = 1`<br>`j=2`: `min(1, 2, 1) + 1 = 2`<br>`j=3`: `min(2, 2, 2) + 1 = 3` -> `[0, 1, 2, 3]` | `0 + 1 + 2 + 3 = 6` | `15` |

Return `ans = 15`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Every cell in the `m x n` matrix is visited once with `O(1)` transitions.
- **Space Complexity:** `O(m * n)` — The 2D DP table `f` allocates `m * n` numbers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1277count-square-submatrices-with-all-ones.js](./1277count-square-submatrices-with-all-ones.js) |

---

## Key Learnings

- Counting sub-shapes by fixing a canonical anchor point (such as the bottom-right corner `(i, j)`) partitions all valid submatrices into disjoint, easily countable sets.
- The exact same recurrence `min(top, left, topLeft) + 1` powers both Largest Square (`LeetCode 221`, taking `max(f[i][j])`) and Count Squares (`LeetCode 1277`, taking `sum(f[i][j])`).
- If space needs further optimization, `f` can be compressed to a 1D rolling array of size `n` (or updated in-place inside `matrix` if mutation is permitted).
