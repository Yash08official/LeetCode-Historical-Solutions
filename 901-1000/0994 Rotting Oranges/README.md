---
comments: true
difficulty: Medium
tags:
  - Array
  - Breadth-First Search
  - Matrix
---

# 994. Rotting Oranges

**[View Problem on LeetCode](https://leetcode.com/problems/rotting-oranges/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0994` (`994`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Breadth-First Search`, `Matrix` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an `m x n` grid where each cell holds one of three values:
- `0`: an empty cell,
- `1`: a fresh orange,
- `2`: a rotten orange.

Each minute, every fresh orange that shares a **4-directional** edge (up, down, left, right) with any rotten orange becomes rotten simultaneously. Return the **minimum number of minutes** until zero fresh oranges remain, or `-1` if some fresh orange can never rot.

---

## Examples

### Example 1

```text
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

### Example 2

```text
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
```

### Example 3

```text
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
```

---

## Constraints

- `m == grid.length`

- `n == grid[i].length`

- `1 <= m, n <= 10`

- `grid[i][j]` is `0`, `1`, or `2`.

---

## Problem Understanding

- **Simultaneous Multi-Source Spread:** Multiple oranges may start rotten at minute `0`, and rot spreads outward at `1` grid step per minute from **all** of them in parallel—this is the exact model of **Multi-Source Breadth-First Search (BFS)**.
- **Zero Fresh Oranges Edge Case:** If `cnt === 0` at minute `0` (as in Example 3), `0` minutes are needed immediately even if rotten oranges exist.
- **Unreachable Fresh Oranges:** Any fresh orange isolated by empty cells (`0`) will never be reached by BFS; tracking the remaining fresh count `cnt` lets us detect this at termination (`cnt > 0 ? -1 : ans`).

---

## Approach

### Brute Force Approach

Repeatedly scanning the entire `m x n` grid each minute to find fresh oranges adjacent to rotten ones (into a copy grid) until a full scan makes zero changes takes `O((m * n)^2)` time in a snake-shaped grid of length `m * n`.

### Optimized Approach

Run **Multi-Source Level-Order BFS**: seed queue `q` with all initial rotten cells (`2`) while counting fresh cells (`1`) in `cnt`, then expand level-by-level while `q.length > 0 && cnt > 0`, mutating newly infected cells to `2` in-place.

### Step-by-Step Thinking Process

1. Scan the `m x n` grid once: increment `cnt` for every `1` (fresh) and push `[i, j]` to `q` for every `2` (rotten).
2. Use the compact 5-element direction array `dirs = [-1, 0, 1, 0, -1]` so `(dirs[d], dirs[d + 1])` for `d = 0..3` generates all `4` cardinal offsets.
3. Loop `while (q.length > 0 && cnt > 0)`: the `cnt > 0` guard both handles `cnt === 0` at start and stops immediately once the last fresh orange rots (preventing an extra trailing minute).
4. Process the exact snapshot size `k = q.length` of the current minute: dequeue `p`, infect valid neighbors with `grid[x][y] === 1` by setting `grid[x][y] = 2`, enqueue `[x, y]`, and decrement `cnt`.
5. Increment `ans` after each BFS wave, and finally return `cnt > 0 ? -1 : ans`.

### Algorithm / Intuition

In `orangesRotting`, `grid` itself serves as the visited set: flipping `grid[x][y]` from `1` to `2` the moment `[x, y]` is enqueued prevents duplicate pushes within the same minute.

Notice why `while (q.length > 0 && cnt > 0)` is cleaner than checking `q.length > 0` alone: in standard BFS without `cnt > 0`, the final wave of newly rotted oranges still sits in `q`, causing one extra `while` iteration that dequeues them, finds zero fresh neighbors, and would erroneously increment `ans` by `1` unless guarded. Stopping as soon as `cnt === 0` ensures `ans` counts only productive minutes.

---

## Dry Run

Trace on **Example 1**: `grid = [[2,1,1], [1,1,0], [0,1,1]]`

- **Initial Scan:** `q = [[0,0]]`, `cnt = 6`, `ans = 0`.

| Minute | Dequeued Wave | Newly Rotted (`1 -> 2`) | Remaining `cnt` | `ans` After Wave |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `[0,0]` | `[0,1]`, `[1,0]` | `4` | `1` |
| 2 | `[0,1]`, `[1,0]` | `[0,2]`, `[1,1]` | `2` | `2` |
| 3 | `[0,2]`, `[1,1]` | `[2,1]` | `1` | `3` |
| 4 | `[2,1]` | `[2,2]` | `0` | `4` |

- Loop terminates immediately because `cnt === 0` (even though `q = [[2,2]]` is non-empty).
- `cnt > 0` is `false` -> returns `ans = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` grid cell visits (`O((m * n)^2)` theoretical worst-case in JavaScript due to `q.shift()` shifting up to `m * n` elements, which is at most `100` elements given `m, n <= 10`).
- **Space Complexity:** `O(m * n)` — Queue `q` holds at most `m * n` coordinate pairs, while `grid` is updated in-place.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [994rotting-oranges.js](./994rotting-oranges.js) |

---

## Key Learnings

- Guarding level-order BFS with `&& cnt > 0` eliminates off-by-one errors on both `cnt === 0` initial grids and the final empty-expansion layer.
- The 5-element array `[-1, 0, 1, 0, -1]` encodes all four `(dx, dy)` neighbors `(dirs[d], dirs[d + 1])` without needing two separate arrays.
- For larger grids (`m * n > 10^4`) in JavaScript, using a `head` index pointer instead of `q.shift()` guarantees strict `O(m * n)` linear time.
