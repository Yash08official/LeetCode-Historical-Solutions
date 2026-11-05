---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Stack
  - Matrix
  - Monotonic Stack
---

# 85. Maximal Rectangle

**[View Problem on LeetCode](https://leetcode.com/problems/maximal-rectangle/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0085` (`85`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Stack`, `Matrix`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given a `rows x cols` 2D character matrix `matrix` containing only `'0'` and `'1'`, find the largest axis-aligned sub-rectangle made up exclusively of `'1'`s and return its area (number of `'1'` cells inside it).

---

## Examples

### Example 1

```text
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
```

### Example 2

```text
Input: matrix = [["0"]]
Output: 0
```

### Example 3

```text
Input: matrix = [["1"]]
Output: 1
```

---

## Constraints

- `rows == matrix.length`

- `cols == matrix[i].length`

- `1 <= rows, cols <= 200`

- `matrix[i][j]` is `'0'` or `'1'`.

---

## Problem Understanding

- Every valid rectangle of `'1'`s has some bottom row `i` (`0 <= i < rows`).
- Looking upward from row `i`, each column `j` has a consecutive streak of `'1'`s ending at `(i, j)` (if `matrix[i][j] == '0'`, that streak resets to `0`).
- Those column streaks `heights[0 .. cols - 1]` form a **1D histogram** sitting on row `i`! Thus, the 2D Maximal Rectangle problem reduces directly to running **Largest Rectangle in Histogram** (Problem 84) once per row.

---

## Approach

### Brute Force Approach

Enumerating every top-left corner `(r1, c1)` and bottom-right corner `(r2, c2)` and checking whether all cells inside are `'1'` takes `O(rows^3 * cols^3)` (or `O(rows^2 * cols^2)` with 2D prefix sums). Even for `200 x 200`, `O(rows^2 * cols^2)` performs roughly `1.6 * 10^9` operations, risking Time Limit Exceeded.

### Optimized Approach

Maintain a rolling column-height histogram `heights[cols]` row by row, invoking a monotonic-stack `largestRectangle(heights)` helper after updating each row to achieve `O(rows * cols)` total time.

### Step-by-Step Thinking Process

1. Allocate `int[] heights = new int[cols]` initialized to `0`.
2. Iterate through each row `i` from `0` to `rows - 1`: for each column `j`, increment `heights[j]` if `matrix[i][j] == '1'`, or reset `heights[j] = 0` if `matrix[i][j] == '0'`.
3. Pass `heights` to `largestRectangle(heights)` to compute the largest all-`'1'` rectangle anchored at bottom row `i`.
4. Inside `largestRectangle`, iterate `i` from `0` to `heights.length` inclusive, using a virtual sentinel height `curr = 0` at `i == heights.length` to flush all remaining bars from the monotonic stack `st`.
5. Track the global `maxArea` across all `rows` histogram evaluations.

### Algorithm / Intuition

In `maximalRectangle(char[][] matrix)`, `heights[j]` tracks how many consecutive `'1'`s stack vertically up from `(i, j)`. Whenever `matrix[i][j] == '0'`, `heights[j]` drops immediately to `0` because a rectangle of `'1'`s cannot bridge across a `'0'`.

In `largestRectangle(int[] heights)`, `Stack<Integer> st` stores column indices in non-decreasing height order:
- At `i == heights.length`, `curr` is set to `0`, forcing every positive height still on `st` to pop and compute its area.
- When `heights[st.peek()] > curr`, we pop index `top` with `height = heights[top]`. Because `st` is monotonic, the new `st.peek()` is the nearest bar to the left strictly shorter than `height` (if `st` is empty, `height` extends all the way to index `0`), and `i` is the first bar to the right strictly shorter than `height`.
- Therefore `width = st.isEmpty() ? i : i - st.peek() - 1`, and `maxArea` updates with `height * width`.

---

## Dry Run

Tracing Example 1 on the `4 x 5` matrix:

1. **Row `0` (`['1','0','1','0','0']`):**
   - `heights = [1, 0, 1, 0, 0]` -> `largestRectangle` returns `1` -> `maxArea = 1`.
2. **Row `1` (`['1','0','1','1','1']`):**
   - `heights = [2, 0, 2, 1, 1]` -> `largestRectangle` tests `2*1=2` (col 0), `2*1=2` (col 2), `1*3=3` (cols 2..4) -> returns `3` -> `maxArea = 3`.
3. **Row `2` (`['1','1','1','1','1']`):**
   - `heights = [3, 1, 3, 2, 2]` -> At `i = 5` (`curr = 0`), popping col `4` (`h=2`) then col `3` (`h=2`, after col `2` with `h=3` already popped at `i=3`): with `st.peek() = 1`, `width = 5 - 1 - 1 = 3`, `area = 2 * 3 = 6` (spanning rows `1..2`, cols `2..4`) -> returns `6` -> **`maxArea = 6`**.
4. **Row `3` (`['1','0','0','1','0']`):**
   - `heights = [4, 0, 0, 3, 0]` -> `largestRectangle` returns `4` (col 0, `4 * 1`) -> `maxArea = max(6, 4) = 6`.

Returns `6`.

---

## Complexity Analysis

- **Time Complexity:** `O(rows * cols)` — Updating `heights` takes `O(cols)` per row, and `largestRectangle(heights)` pushes and pops each of the `cols + 1` indices at most once (`O(cols)`), repeated over `rows` rows.
- **Space Complexity:** `O(cols)` — The `heights` array uses `cols` integers and the stack `st` holds at most `cols + 1` indices at any time.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [85maximal-rectangle.java](./85maximal-rectangle.java) |

---

## Key Learnings

- Decomposing a 2D grid problem row-by-row into consecutive vertical histograms (`heights[j]`) is a classic technique for submatrix optimization problems (such as Maximal Rectangle and Count Submatrices With All Ones).
- Appending a virtual `curr = 0` sentinel at `i == heights.length` eliminates duplicate stack-draining code after the loop.
- Resetting `heights[j] = 0` on `'0'` cells enforces the contiguity constraint vertically while the monotonic stack enforces contiguity horizontally.
