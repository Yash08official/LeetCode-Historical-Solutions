---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Backtracking
  - Breadth-First Search
  - Memoization
  - Matrix
  - Heuristic Search
  - Bidirectional Search
  - A* Search
---

# 773. Sliding Puzzle

**[View Problem on LeetCode](https://leetcode.com/problems/sliding-puzzle/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0773` (`773`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Backtracking`, `Breadth-First Search`, `Memoization`, `Matrix`, `Heuristic Search`, `Bidirectional Search`, `A* Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given a `2 x 3` grid `board` containing five numbered tiles (`1` through `5`) and one empty space (`0`). In a single move, you may swap `0` with any 4-directionally adjacent tile (up, down, left, or right).

The puzzle is solved when `board` reaches `[[1, 2, 3], [4, 5, 0]]`. Return the **minimum number of moves** required to reach the solved state, or `-1` if the solved configuration is unreachable.

---

## Examples

### Example 1

```text
Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap the 0 and the 5 in one move.
```

### Example 2

```text
Input: board = [[1,2,3],[5,4,0]]
Output: -1
Explanation: No number of moves will make the board solved.
```

### Example 3

```text
Input: board = [[4,1,2],[5,0,3]]
Output: 5
Explanation: 5 is the smallest number of moves that solves the board.
An example path:
After move 0: [[4,1,2],[5,0,3]]
After move 1: [[4,1,2],[0,5,3]]
After move 2: [[0,1,2],[4,5,3]]
After move 3: [[1,0,2],[4,5,3]]
After move 4: [[1,2,0],[4,5,3]]
After move 5: [[1,2,3],[4,5,0]]
```

---

## Constraints

- `board.length == 2`

- `board[i].length == 3`

- `0 <= board[i][j] <= 5`

- Each value `board[i][j]` is **unique**.

---

## Problem Understanding

- Every board configuration is a permutation of `{0, 1, 2, 3, 4, 5}`, so the entire state space has at most `6! = 720` configurations (in fact, half of them — `360` — are reachable due to permutation inversion parity).
- Finding the **minimum** number of unweighted moves from a start state to a target state in a state graph is a textbook application of **Breadth-First Search (BFS)**.
- Serializing the `2 x 3` matrix into a 6-character `String` (with target `"123450"`) allows `O(1)` hashing in a `HashSet` to avoid revisiting states.

---

## Approach

### Brute Force Approach

Depth-First Search (DFS) without iterative deepening or shortest-distance pruning may explore long cyclic paths among the `360` reachable board configurations and revisit states suboptimally, failing to guarantee the shortest path first.

### Optimized Approach

Serialize `2 x 3` board states as 6-character strings and run **level-order Breadth-First Search (BFS)** starting from the initial state toward `"123450"`, tracking visited states in a `HashSet<String>`.

### Step-by-Step Thinking Process

1. Encode any `2 x 3` board in row-major order as a 6-character string (e.g., `[[1,2,3],[4,5,0]]` -> `"123450"`).
2. Check the immediate edge case: if `start` already equals `"123450"`, return `0` moves.
3. Initialize a BFS queue `q` and a visited set `vis` containing `start`, with move counter `ans = 0`.
4. Process the queue level by level: increment `ans`, reconstruct the `2 x 3` grid via `setb(x)`, locate `0` via `find0()`, and generate up to 4 neighbor strings in `next()` by swapping `0` with adjacent tiles and swapping back.
5. As soon as a neighbor `y` equals `"123450"`, return `ans`; if BFS exhausts all reachable states without finding `end`, return `-1`.

### Algorithm / Intuition

The `Solution` class modularizes state transitions cleanly:
- `gets()` flattens `board[i][j]` into `t[i * 3 + j]` and joins it into a 6-character `String`.
- `setb(String s)` unpacks a string back into `this.board` using `s.charAt(i * 3 + j) - '0'`.
- `next()` calls `find0()` to get `(i, j)` of the blank tile, iterates 4 directions via `dirs = {-1, 0, 1, 0, -1}`, checks bounds `0 <= x < 2 && 0 <= y < 3`, swaps `(i, j)` with `(x, y)`, snapshots `gets()`, and restores `board` with a second `swap`.
- Level-order BFS (`for (int n = q.size(); n > 0; --n)`) ensures the first time `y.equals(end)` triggers, `ans` is the exact minimum move count.

---

## Dry Run

Trace on **Example 1**: `board = [[1, 2, 3], [4, 0, 5]]`.

1. `start = gets()` -> `"123405"`, `end = "123450"`. Not equal.
2. `q = ["123405"]`, `vis = {"123405"}`, `ans = 0`.
3. **BFS Level 1** (`++ans` -> `ans = 1`, `n = 1`):
   - Poll `x = "123405"`, `setb(x)` sets `board = [[1,2,3],[4,0,5]]`.
   - `find0()` returns `{1, 1}`.
   - `next()` tests 4 neighbors of `(1, 1)`:
     - Up `(0, 1)`: swaps `0` and `2` -> `"103425"`
     - Right `(1, 2)`: swaps `0` and `5` -> `"123450"`
     - Down `(2, 1)`: out of bounds
     - Left `(1, 0)`: swaps `0` and `4` -> `"123045"`
   - Iterating `next()` results:
     - `y = "103425"`: not `end`, added to `vis` and `q`.
     - `y = "123450"`: `y.equals(end)` is **true** -> immediately returns `ans = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O((R * C)! * (R * C))` — For fixed `R = 2, C = 3`, at most `6! / 2 = 360` states are visited with `O(6)` serialization work per state (`O(1)` bounded constant time).
- **Space Complexity:** `O((R * C)! * (R * C))` — `vis` and `q` store at most `360` 6-character strings (`O(1)` bounded constant memory).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [773sliding-puzzle.java](./773sliding-puzzle.java) |

---

## Key Learnings

- Small grid puzzles (`2 x 3` or `3 x 3`) can be modeled as unweighted shortest-path graphs where vertices are serialized board strings.
- Checking `y.equals(end)` upon neighbor generation (rather than upon polling) saves one full BFS queue round-trip (provided `start.equals(end)` is checked upfront).
- Swapping in place and immediately swapping back avoids allocating a fresh `int[2][3]` array for every neighbor.
