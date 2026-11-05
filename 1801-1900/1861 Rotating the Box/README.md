---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Matrix
---

# 1861. Rotating the Box

**[View Problem on LeetCode](https://leetcode.com/problems/rotating-the-box/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1861` (`1861`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` character matrix `box` (`boxGrid`) depicting the side view of a box where:
- `'#'` represents a movable stone,
- `'*'` represents a fixed stationary obstacle, and
- `'.'` represents an empty cell.

The box is rotated **90 degrees clockwise**, after which gravity pulls every stone straight down its column until it rests on the bottom of the box, an obstacle `'*'`, or another settled stone `'#'`. Return the resulting `n x m` matrix.

---

## Examples

### Example 1

```text
Input: boxGrid = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
```

### Example 2

```text
Input: boxGrid = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
```

### Example 3

```text
Input: boxGrid = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]
```

---

## Constraints

- `m == boxGrid.length`

- `n == boxGrid[i].length`

- `1 <= m, n <= 500`

- `boxGrid[i][j]` is either `'#'`, `'*'`, or `'.'`.

---

## Problem Understanding

- **Clockwise 90-Degree Coordinate Mapping:** An `m x n` grid rotates into an `n x m` grid where cell `(i, j)` moves to `(j, m - 1 - i)` (row `0` becomes the rightmost column `m - 1`, and row `m - 1` becomes column `0`).
- **Column-Independent Gravity:** After rotation, stones only fall vertically within their own column `j`. Equally, before rotation, rightward gravity along each row is identical to downward gravity after rotation.
- **Obstacle Reset:** An obstacle `'*'` never moves and blocks any stone above it from falling into empty spaces below it.

---

## Approach

### Brute Force Approach

After rotating the grid, repeatedly scanning from bottom to top and bubbling each stone `'#'` down one cell at a time while the cell beneath it is `'.'` can take `O(n^2)` steps per column, resulting in `O(m * n^2)` total time.

### Optimized Approach

First rotate `box` into an `n x m` matrix `ans` via `ans[j][m - i - 1] = box[i][j]`. Then scan each column `j` from bottom (`i = n - 1`) to top (`i = 0`), maintaining a queue `q` (`ArrayDeque<Integer>`) of available empty row indices below the current scan position.

### Step-by-Step Thinking Process

1. Allocate `char[][] ans = new char[n][m]` and copy every cell `(i, j)` to `ans[j][m - i - 1]` to perform the 90-degree clockwise rotation.
2. For each column `j` (`0 <= j < m`), instantiate a `Deque<Integer> q = new ArrayDeque<>()` to track empty `'.'` slots ordered from lowest (bottom-most) to highest.
3. Traverse rows upward from `i = n - 1` down to `0`:
  - If `ans[i][j] == '*'`, no stone above `i` can reach slots below `i`, so call `q.clear()`.
  - Else if `ans[i][j] == '.'`, record this empty row with `q.offer(i)`.
  - Else (`ans[i][j] == '#'`), if `!q.isEmpty()`, drop the stone into the lowest available empty row `q.pollFirst()`, mark `ans[i][j] = '.'`, and enqueue `i` (`q.offer(i)`) since row `i` is now vacant!

### Algorithm / Intuition

Scanning upward from `n - 1` to `0`, `q` acts as a FIFO queue of empty cells reachable below the current row without crossing an obstacle. The front of `q` (`q.pollFirst()`) is always the **lowest** (largest row index) empty cell available. When a stone `'#'` at row `i` falls into `q.pollFirst()`, row `i` itself becomes empty `'.'`, so pushing `i` onto the back of `q` (`q.offer(i)`) preserves the exact bottom-to-top ordering of empty slots! Hitting `'*'` immediately invalidates all lower empty slots via `q.clear()`.

---

## Dry Run

Using **Example 1**: `box = [['#', '.', '#']]` (`m = 1, n = 3`)

1. **Rotate 90° Clockwise (`ans` of size `3 x 1`):**
   - `ans[0][0] = '#'`, `ans[1][0] = '.'`, `ans[2][0] = '#'`.
2. **Gravity on Column `j = 0` (`i = 2` down to `0`):**
   - `i = 2`: `ans[2][0] == '#'`, `q` is empty -> stone stays at row `2`.
   - `i = 1`: `ans[1][0] == '.'` -> `q.offer(1)` (`q = [1]`).
   - `i = 0`: `ans[0][0] == '#'`, `!q.isEmpty()` -> pop `1`, set `ans[1][0] = '#'`, `ans[0][0] = '.'`, `q.offer(0)` (`q = [0]`).

Final `ans`: `[['.'], ['#'], ['#']]`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Rotation visits `m * n` cells once, and during gravity simulation each cell is offered to and polled from `q` at most once.
- **Space Complexity:** `O(n)` auxiliary space for the `Deque<Integer> q` holding at most `n` row indices per column (`O(m * n)` including the required `n x m` return matrix `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1861rotating-the-box.java](./1861rotating-the-box.java) |

---

## Key Learnings

- Clockwise 90° matrix rotation maps `(i, j)` in an `m x n` matrix to `(j, m - 1 - i)` in an `n x m` matrix.
- Note: Instead of a queue `q`, you can also track a single integer write-pointer `bottom` initialized to `n - 1` (resetting `bottom = i - 1` on `'*'` and decrementing `bottom--` on `'#'`) for `O(1)` auxiliary space.
