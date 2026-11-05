---
comments: true
difficulty: Medium
tags:
  - Array
  - Linked List
  - Matrix
  - Simulation
---

# 2326. Spiral Matrix IV

**[View Problem on LeetCode](https://leetcode.com/problems/spiral-matrix-iv/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2326` (`2326`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Linked List`, `Matrix`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integers `m` and `n`, representing the dimensions of an `m x n` matrix. You are also given the `head` of a singly linked list of integers.

You need to generate an `m x n` matrix that contains the integers from the linked list placed in spiral order (clockwise), starting from the top-left cell `(0, 0)`.

If there are remaining empty spaces in the matrix after exhausting the linked list, fill them with `-1`. Return the generated matrix.

---

## Examples

### Example 1

```text
Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
Explanation: The diagram above shows how the values are printed in the matrix.
Note that the remaining spaces in the matrix are filled with -1.
```

### Example 2

```text
Input: m = 1, n = 4, head = [0,1,2]
Output: [[0,1,2,-1]]
Explanation: The diagram above shows how the values are printed from left to right in the matrix.
The last space in the matrix is set to -1.
```

---

## Constraints

- `1 <= m, n <= 10^5`

- `1 <= m * n <= 10^5`

- The number of nodes in the list is in the range `[1, m * n]`.

- `0 <= Node.val <= 1000`

---

## Problem Understanding

Key observations and constraints:
- Matrix dimensions satisfy `1 <= m, n <= 10^5` with `1 <= m * n <= 10^5`.
- The number of nodes in the linked list is between `1` and `m * n`.
- Spiral traversal proceeds clockwise in 4 repeating directions: Right `(0, +1)`, Down `(+1, 0)`, Left `(0, -1)`, and Up `(-1, 0)`.
- Initializing all matrix cells to `-1` handles the requirement that remaining empty cells must contain `-1`, and also acts as a visited flag (since node values are `0 <= Node.val <= 1000`, so `-1` strictly represents an unvisited cell).

---

## Approach

### Brute Force Approach

Direct simulation of the spiral traversal is already the most straightforward and optimal method. Trying to compute the exact coordinate of the `k`-th node algebraically using ring boundaries is more complex and has the same `O(m * n)` asymptotic complexity.

### Optimized Approach

Initialize an `m x n` matrix filled with `-1`. Use a compact direction array `dirs = {0, 1, 0, -1, 0}` where direction index `k` gives movement offsets `(dirs[k], dirs[k + 1])`. Start at `(i, j) = (0, 0)` with direction `k = 0` (Right).

At each step, assign `ans[i][j] = head.val` and advance `head = head.next`. If `head == null`, stop immediately. Otherwise, compute the candidate next position `(x, y) = (i + dirs[k], j + dirs[k + 1])`. If `(x, y)` is out of bounds or `ans[x][y] != -1` (already filled), rotate clockwise by setting `k = (k + 1) % 4`. Repeat until finding an unfilled neighbor, then update `(i, j) = (x, y)`.

### Step-by-Step Thinking Process

1. We must place linked list nodes into an `m x n` grid in clockwise spiral order.
2. Pre-fill the entire grid with `-1` so unfilled cells automatically hold `-1` upon termination.
3. Use direction offsets `dirs = {0, 1, 0, -1, 0}` to cycle through Right, Down, Left, Up.
4. While walking, if the next cell is out of bounds or not `-1`, turn clockwise (`k = (k + 1) % 4`).
5. Stop walking as soon as `head.next == null` after placing `head.val`.

### Algorithm / Intuition

In `Solution.spiralMatrix`, `int[][] ans = new int[m][n]` is allocated, and each row is pre-populated with `-1` using `Arrays.fill(row, -1)`. Coordinates `i = 0, j = 0` and direction index `k = 0` are tracked.

In the outer loop, `ans[i][j]` is populated with `head.val`, and `head` is advanced. If `head` becomes null, all nodes have been placed and the loop breaks. Otherwise, an inner `while (true)` checks candidate coordinates `x = i + dirs[k]` and `y = j + dirs[k + 1]`. If `x` and `y` are inside `[0, m) x [0, n)` and `ans[x][y] == -1`, the position is valid: we update `i = x; j = y;` and break out of the turn loop. If invalid or already occupied, we turn clockwise with `k = (k + 1) % 4` and recheck. Finally, `ans` is returned.

---

## Dry Run

Consider `m = 3, n = 5`, list values `[3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0]`:
- Matrix initialized with `-1` for all 15 cells.
- `(0, 0) = 3`, move Right to `(0, 1) = 0`, `(0, 2) = 2`, `(0, 3) = 6`, `(0, 4) = 8`.
- From `(0, 4)`, moving Right hits column boundary `y = 5`. Direction cycles to Down (`k = 1`).
- Move Down: `(1, 4) = 1`, `(2, 4) = 7`.
- From `(2, 4)`, moving Down hits row boundary `x = 3`. Direction cycles to Left (`k = 2`).
- Move Left: `(2, 3) = 9`, `(2, 2) = 4`, `(2, 1) = 2`, `(2, 0) = 5`.
- From `(2, 0)`, moving Left hits column boundary `y = -1`. Direction cycles to Up (`k = 3`).
- Move Up: `(1, 0) = 5`.
- From `(1, 0)`, moving Up hits `(0, 0)` which is not `-1`. Direction cycles to Right (`k = 0`).
- Move Right: `(1, 1) = 0`. List is now exhausted (`head == null`).
- Remaining cells `(1, 2)` and `(1, 3)` remain `-1`.
- Output matches Example 1.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Every matrix cell is visited at most once to place a node or check boundary conditions. Each turn check takes `O(1)`.
- **Space Complexity:** `O(m * n)` — Required for the resulting `m x n` matrix `ans`. No extra auxiliary data structures are used beyond scalar variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2326spiral-matrix-iv.java](./2326spiral-matrix-iv.java) |

---

## Key Learnings

- The 5-element array `dirs = {0, 1, 0, -1, 0}` compactly encodes all 4 cardinal 2D movements via index pairs `(k, k + 1)`.
- Pre-populating default values (`-1`) eliminates edge cases for early termination when the linked list is shorter than `m * n`.
- Checking `ans[x][y] == -1` doubles as boundary collision detection against previously visited cells.
