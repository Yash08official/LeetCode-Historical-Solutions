---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Backtracking
  - Depth-First Search
  - Matrix
---

# 79. Word Search

**[View Problem on LeetCode](https://leetcode.com/problems/word-search/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0079` (`79`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Backtracking`, `Depth-First Search`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` grid of characters `board` and a string `word`, return `true` *if* `word` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

---

## Examples

### Example 1

```text
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

### Example 2

```text
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

### Example 3

```text
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

---

## Constraints

- `m == board.length`
- `n = board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` consist of only lowercase and uppercase English letters.

---

## Problem Understanding

- We must determine if a target word can be traced via adjacent orthogonal steps in a grid.
- Each cell can only be visited once per path.
- In-place modification of `board[i][j]` (e.g., setting to `'0'`) allows visited tracking with zero auxiliary matrix allocation.

---

## Approach

### Optimized Approach (DFS Backtracking with In-Place Grid Masking)

1. Iterate through every cell $(i, j)$ in the $m 	imes n$ grid. If `dfs(i, j, 0)` returns `true`, return `true`.
2. Define `dfs(i, j, k)`:
   - If `board[i][j] != word.charAt(k)`, character mismatch occurs; return `false`.
   - If $k == 	ext{word.length()} - 1$, the complete word has been matched; return `true`.
   - Save the original character `c = board[i][j]`.
   - Mark the cell as visited: `board[i][j] = '0'`.
   - Explore all 4 orthogonal directions using offsets `dirs = {-1, 0, 1, 0, -1}`.
     - For valid neighbors $(x, y)$ that are within bounds and not marked `'0'`:
       - If `dfs(x, y, k + 1)` is `true`, restore `board[i][j] = c` and return `true`.
   - Backtrack: restore `board[i][j] = c`.
   - Return `false`.
3. If no cell initiates a valid path, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n \cdot 3^L)$ — Where $L$ is the length of `word`. After the initial step, at most 3 directions are explored since the incoming edge is blocked.
- **Space Complexity:** $O(L)$ — Recursion call stack depth is bounded by the word length $L \le 15$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [79word-search.java](./79word-search.java) |

---

## Key Learnings

- Temporarily overwriting cell contents (`board[i][j] = '0'`) avoids allocating an auxiliary `visited` boolean matrix.
- Restoring the cell on backtrack guarantees clean state propagation for alternative search paths.
