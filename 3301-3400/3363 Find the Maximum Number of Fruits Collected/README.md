---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Matrix
---

# 3363. Find the Maximum Number of Fruits Collected

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3363` (`3363`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Matrix` |
| **Solution Language** | Python 3 |

---

## Problem Description

There is an `n x n` grid where room `(i, j)` contains `fruits[i][j]` fruits. Three children start at different rooms and make exactly `n - 1` moves to reach the bottom-right room `(n - 1, n - 1)`:
- **Child 1** starts at `(0, 0)`. In each move, Child 1 goes diagonally down-right to `(i + 1, j + 1)`.
- **Child 2** starts at `(0, n - 1)`. In each move, Child 2 goes to `(i + 1, j - 1)`, `(i + 1, j)`, or `(i + 1, j + 1)`.
- **Child 3** starts at `(n - 1, 0)`. In each move, Child 3 goes to `(i - 1, j + 1)`, `(i, j + 1)`, or `(i + 1, j + 1)`.

Rules state that Child 1 stays strictly on the main diagonal `(i, i)`. Child 2 must stay strictly above the main diagonal (`i < j`) until reaching `(n - 1, n - 1)`. Child 3 must stay strictly below the main diagonal (`i > j`) until reaching `(n - 1, n - 1)`.

When a child enters an unvisited room, they collect all fruits in it. Since their paths do not overlap until the destination, each child collects from disjoint rooms, except room `(n - 1, n - 1)` which is counted once.

Return the maximum total fruits collected by all three children.

---

## Examples

### Example 1

**Input:** `fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]`

**Output:** `100`

**Explanation:**

In this example:

- The 1^st child (green) moves on the path `(0,0) -> (1,1) -> (2,2) -> (3, 3)`.

- The 2^nd child (red) moves on the path `(0,3) -> (1,2) -> (2,3) -> (3, 3)`.

- The 3^rd child (blue) moves on the path `(3,0) -> (3,1) -> (3,2) -> (3, 3)`.

In total they collect `1 + 6 + 11 + 16 + 4 + 8 + 12 + 13 + 14 + 15 = 100` fruits.

### Example 2

**Input:** `fruits = [[1,1],[1,1]]`

**Output:** `4`

**Explanation:**

In this example:

- The 1^st child moves on the path `(0,0) -> (1,1)`.

- The 2^nd child moves on the path `(0,1) -> (1,1)`.

- The 3^rd child moves on the path `(1,0) -> (1,1)`.

In total they collect `1 + 1 + 1 + 1 = 4` fruits.

---

## Constraints

- `2 <= n == fruits.length == fruits[i].length <= 1000`

- `0 <= fruits[i][j] <= 1000`

---

## Problem Understanding

- **Disjoint Paths:** Because Child 1 moves solely along `i == j`, Child 2 moves strictly in `i < j`, and Child 3 moves strictly in `i > j`, the rooms visited by the three children are completely pairwise disjoint prior to reaching `(n - 1, n - 1)`.
- **Child 1 Path is Fixed:** Child 1 has no choices: every step must be `(i + 1, i + 1)`. The fruits collected by Child 1 are precisely the sum of the main diagonal: `sum(fruits[i][i] for i in range(n))`.
- **Independent Optimizations:** Because the paths are disjoint, we can independently maximize fruits collected by Child 2 and Child 3:
  - Child 2: Starts at `(0, n - 1)`. At row `i`, moves to row `i + 1` with column choice `j - 1`, `j`, or `j + 1`, maintaining `i < j` until destination.
  - Child 3: Starts at `(n - 1, 0)`. At col `j`, moves to col `j + 1` with row choice `i - 1`, `i`, or `i + 1`, maintaining `i > j` until destination.
- Total maximum fruits = `diagonal_sum + solve1(0, n - 1) + solve2(n - 1, 0)`.

---

## Approach

### Brute Force Approach

Exploring all possible move sequences for Child 2 and Child 3 would test `3^(n - 1)` paths for each child. For `n = 1000`, `3^{999}` is astronomical and cannot be enumerated. Dynamic programming / memoization is required.

### Optimized Approach

We solve Child 2 and Child 3 paths using memoized dynamic programming (`@lru_cache`). Child 1 collects `sum(fruits[i][i])` along the diagonal. For Child 2, `solve1(i, j)` transitions from row `i` to `i + 1` choosing `j - 1, j, j + 1` within `i < j`. When reaching `i == j == n - 1`, it returns 0 (destination fruit is already counted in the diagonal sum). For Child 3, `solve2(i, j)` transitions from column `j` to `j + 1` choosing `i - 1, i, i + 1` within `i > j`. We return the sum of all three components.

### Step-by-Step Thinking Process

1. Child 1 moves along the main diagonal `(i, i)` for all `0 <= i < n`. There are no choices: sum all `fruits[i][i]`.
2. Child 2 starts at `(0, n - 1)` and stays strictly above diagonal (`i < j`). Destination `(n - 1, n - 1)` fruit is already counted in the diagonal sum, so base case returns 0.
3. Transitions for Child 2: `(i + 1, j)`, `(i + 1, j + 1)`, `(i + 1, j - 1)`.
4. Child 3 starts at `(n - 1, 0)` and stays strictly below diagonal (`i > j`). Transitions: `(i, j + 1)`, `(i + 1, j + 1)`, `(i - 1, j + 1)`.
5. Use `@lru_cache(None)` for both recursive functions `solve1` and `solve2`.
6. Combine results: `sum(fruits[i][i]) + solve1(0, n - 1) + solve2(n - 1, 0)`.

### Algorithm / Intuition

In `Solution.maxCollectedFruits`: `sum([fruits[i][i] for i in range(n)])` gathers all fruits along the diagonal, including destination `(n - 1, n - 1)`. Function `solve1(i, j)` finds Child 2's optimal path: base case `i == j == n - 1` returns 0; invalid branch `i >= j` returns `-sys.maxsize`. It takes `fruits[i][j]` and tries transitions to row `i + 1` with columns `j`, `j + 1`, and `j - 1`. Similarly, `solve2(i, j)` evaluates Child 3's path: base case `i == j == n - 1` returns 0; invalid branch `i <= j` returns `-sys.maxsize`. It takes `fruits[i][j]` and tries transitions to column `j + 1` with rows `i`, `i + 1`, and `i - 1`. The memoization ensures each cell is computed at most once.

---

## Dry Run

### Step-by-Step Execution on Example 1: `fruits` of size `4 x 4`

```
[ [ 1,  2,  3,  4],
  [ 5,  6,  8,  7],
  [ 9, 10, 11, 12],
  [13, 14, 15, 16] ]
```

- **Child 1 (Diagonal):** `fruits[0][0] + fruits[1][1] + fruits[2][2] + fruits[3][3] = 1 + 6 + 11 + 16 = 34`.
- **Child 2 (Above Diagonal):** Starts at `(0, 3)` (`val = 4`).
  - `(0, 3)` -> moves to `(1, 2)` (`val = 8`).
  - `(1, 2)` -> moves to `(2, 3)` (`val = 12`).
  - `(2, 3)` -> moves to `(3, 3)` (destination reached, returns 0).
  - Total for Child 2: `4 + 8 + 12 = 24`.
- **Child 3 (Below Diagonal):** Starts at `(3, 0)` (`val = 13`).
  - `(3, 0)` -> moves to `(3, 1)` (`val = 14`).
  - `(3, 1)` -> moves to `(3, 2)` (`val = 15`).
  - `(3, 2)` -> moves to `(3, 3)` (destination reached, returns 0).
  - Total for Child 3: `13 + 14 + 15 = 42`.
- **Combined Total:** `34 + 24 + 42 = 100`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Child 1 sums `n` diagonal elements in `O(n)`. Both `solve1` and `solve2` visit at most `n^2 / 2` states, spending `O(1)` time per state transition with memoization.
- **Space Complexity:** `O(n^2)` — The memoization cache stores up to `O(n^2)` states across the upper and lower triangular matrices.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Python 3** | [3363find-the-maximum-number-of-fruits-collected.py](./3363find-the-maximum-number-of-fruits-collected.py) |

---

## Key Learnings

- When multi-agent grid path problems guarantee non-overlapping paths, the total objective cleanly decomposes into independent dynamic programming subproblems.
- Counting shared destination points once in the primary diagonal sum allows secondary subproblems to treat the terminal state with a value of 0.
