---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Matrix
  - Simulation
---

# 2352. Equal Row and Column Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/equal-row-and-column-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2352` (`2352`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Matrix`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a 0-indexed `n x n` integer matrix `grid`, return the number of pairs `(r_i, c_j)` such that row `r_i` and column `c_j` are equal.

A row and column pair is considered equal if they contain the exact same elements in the exact same sequence (i.e., as identical 1D arrays).

---

## Examples

### Example 1

```text
Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: There is 1 equal row and column pair:
- (Row 2, Column 1): [2,7,7]
```

### Example 2

```text
Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
Output: 3
Explanation: There are 3 equal row and column pairs:
- (Row 0, Column 0): [3,1,2,2]
- (Row 2, Column 2): [2,4,2,2]
- (Row 3, Column 2): [2,4,2,2]
```

---

## Constraints

- `n == grid.length == grid[i].length`

- `1 <= n <= 200`

- `1 <= grid[i][j] <= 10^5`

---

## Problem Understanding

Key observations and constraints:
- Matrix dimension `n` satisfies `1 <= n <= 200`, and `1 <= grid[i][j] <= 10^5`.
- There are `n` rows and `n` columns, resulting in `n^2` possible pairs `(r_i, c_j)`.
- Because `n <= 200`, `n^2 = 40000`. Comparing a row and a column takes `n` steps, so a direct 3-nested loop takes `O(n^3) = 200^3 = 8 * 10^6` operations, well within typical 1-second execution limits.
- Row `i` consists of elements `grid[i][0..n-1]`, while column `j` consists of elements `grid[0..n-1][j]`. Two vectors match if `grid[i][k] === grid[k][j]` for all `0 <= k < n`.

---

## Approach

### Brute Force Approach

The brute-force approach compares every row `i` directly against every column `j`. For each pair `(i, j)`, it scans index `k` from `0` to `n - 1`. If all `n` elements match, it increments a counter. This approach has a time complexity of `O(n^3)` and `O(1)` space complexity, which is well-suited for `n <= 200`.

### Optimized Approach

The implemented solution executes the straightforward `O(n^3)` comparison with early termination. It uses three nested loops:
- Outer loop `i` iterates over rows `0` to `n - 1`.
- Middle loop `j` iterates over columns `0` to `n - 1`.
- Inner loop `k` compares `grid[i][k]` with `grid[k][j]`. If any element differs, it sets flag `ok = 0` and breaks immediately.
- If all elements match (`ok === 1`), `ans` is incremented.
While hash-map-based row-serialization can achieve `O(n^2)` time, this direct comparison requires zero memory overhead and runs in only a few milliseconds for `n = 200`.

### Step-by-Step Thinking Process

1. We are tasked with counting identical row-column pairs in an `n x n` grid.
2. Inspect constraint: `n <= 200`. Total pairs to check is `200 * 200 = 40,000`.
3. Comparing a row of length `n` with a column of length `n` takes at most `n = 200` operations.
4. Total operations will be at most `200^3 = 8 * 10^6`, which is very fast in JavaScript.
5. Iterate `i` from `0` to `n - 1`, `j` from `0` to `n - 1`, and check element equality along `k` with early break on mismatch.

### Algorithm / Intuition

In `equalPairs`, `n = grid.length` captures matrix dimensions, and `ans = 0` tracks the matching count. An outer loop iterates row index `i` from `0` to `n - 1`, and an inner loop iterates column index `j` from `0` to `n - 1`.

A flag `let ok = 1` assumes row `i` matches column `j`. The innermost loop checks `grid[i][k] !== grid[k][j]` for `k` from `0` to `n - 1`. As soon as any mismatch occurs, `ok = 0` and the inner loop breaks early to save time. If all elements match, `ok` remains `1`, and `ans += ok` increments the total. Finally, `ans` is returned.

---

## Dry Run

Consider `grid = [[3,2,1],[1,7,6],[2,7,7]]` with `n = 3`:
- Rows: `R0 = [3,2,1]`, `R1 = [1,7,6]`, `R2 = [2,7,7]`.
- Columns: `C0 = [3,1,2]`, `C1 = [2,7,7]`, `C2 = [1,6,7]`.
- Comparing pairs:
  - `(R0, C0)`: `k=0` (3==3), `k=1` (2!=1) -> mismatch, `ok=0`.
  - `(R0, C1)`: `k=0` (3!=2) -> mismatch, `ok=0`.
  - `(R0, C2)`: `k=0` (3!=1) -> mismatch, `ok=0`.
  - `(R1, C0..C2)`: none match.
  - `(R2, C0)`: `k=0` (2!=3) -> mismatch, `ok=0`.
  - `(R2, C1)`: `k=0` (2==2), `k=1` (7==7), `k=2` (7==7) -> match! `ok=1`, `ans` becomes 1.
  - `(R2, C2)`: `k=0` (2!=1) -> mismatch, `ok=0`.
- Output: `1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^3)` — Checking all `n^2` row-column pairs with an inner loop of length `n`. Early loop termination reduces the average comparison cost substantially.
- **Space Complexity:** `O(1)` — Only scalar variables (`n`, `ans`, `i`, `j`, `k`, `ok`) are used, requiring zero additional memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2352equal-row-and-column-pairs.js](./2352equal-row-and-column-pairs.js) |

---

## Key Learnings

- Always inspect constraint sizes before over-engineering: for `n <= 200`, an `O(n^3)` solution executes in milliseconds with zero memory overhead.
- Accessing column elements via `grid[k][j]` avoids extracting or transposing column arrays into memory.
- Early break on mismatch significantly speeds up practical execution on non-uniform matrices.
