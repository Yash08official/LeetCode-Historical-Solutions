---
comments: true
difficulty: Hard
tags:
  - Array
  - String
  - Backtracking
  - Trie
  - Matrix
---

# 212. Word Search II

**[View Problem on LeetCode](https://leetcode.com/problems/word-search-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0212` (`212`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `String`, `Backtracking`, `Trie`, `Matrix` |
| **Solution Language** | Java |

---

## Problem Description

You are given an `m x n` grid of lowercase English characters `board` and an array of unique strings `words`. Return all strings from `words` that can be formed on the board.

A word is formed by starting at any cell and moving sequentially to horizontally or vertically adjacent cells (`up`, `down`, `left`, `right`). Within a single word's path, the same board cell cannot be visited more than once.

---

## Examples

### Example 1

```text
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

### Example 2

```text
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
```

---

## Constraints

- `m == board.length`

- `n == board[i].length`

- `1 <= m, n <= 12`

- `board[i][j]` is a lowercase English letter.

- `1 <= words.length <= 3 * 10^4`

- `1 <= words[i].length <= 10`

- `words[i]` consists of lowercase English letters.

- All the strings of `words` are unique.

---

## Problem Understanding

Look closely at the constraints: the board is small (`1 <= m, n <= 12` and `words[i].length <= 10`), whereas the dictionary can be very large (`words.length <= 3 * 10^4`). Running a separate backtracking search for each of the `30,000` words repeats identical board explorations thousands of times for words sharing prefixes. Conversely, exploring the board once guided by a **Trie** of all `words` prunes dead-end paths immediately when no dictionary word starts with the current character sequence.

---

## Approach

### Brute Force Approach

For each word in `words` (`W` words), scan every cell `(i, j)` of the `m x n` board and launch a 4-directional backtracking DFS up to length `L`. This takes `O(W * m * n * 4 * 3^(L - 1))` time — with `W = 3 * 10^4`, `m = n = 12`, and `L = 10`, that easily exceeds `10^10` operations and times out.

### Optimized Approach

Insert all `words` into a `Trie` whose terminal nodes store the word's array index `ref`, then run backtracking `dfs` from every board cell simultaneously walking the board and the `Trie`, resetting `node.ref = -1` upon finding a word to avoid duplicates.

### Step-by-Step Thinking Process

1. Build a `Trie` over `words` where each node has `Trie[] children = new Trie[26]` and `int ref = -1` storing the index `i` of the word in `words` rather than copying the string.
2. Start a DFS from every cell `(i, j)` of `board` paired with the `Trie` root `tree`.
3. At cell `(i, j)`, compute `idx = board[i][j] - 'a'`; if `node.children[idx] == null`, no word in `words` matches this prefix, so prune immediately.
4. Advance `node = node.children[idx]`. If `node.ref != -1`, we matched `words[node.ref]`! Append it to `ans` and set `node.ref = -1` so the same word is never added again from another board path.
5. Mark `board[i][j] = '#'` in-place to block revisiting the cell in the current path, recurse to valid 4-neighbors using `dirs = {-1, 0, 1, 0, -1}`, and restore `board[i][j] = c` when backtracking.

### Algorithm / Intuition

This algorithm fuses Trie traversal with grid backtracking:
- **Prefix pruning:** Instead of searching for one word at a time, a single DFS step from `(i, j)` simultaneously advances all candidate words sharing the prefix along `node = node.children[idx]`. If `node.children[idx] == null`, the search stops in `O(1)`.
- **Zero-set deduplication:** A word like `"eat"` might appear in multiple places on the board. Storing `int ref` on the terminal Trie node and resetting `node.ref = -1` the first time it is collected guarantees each word is added to `ans` at most once without needing a `HashSet`.
- **In-place visited tracking:** Temporarily overwriting `board[i][j] = '#'` avoids allocating a `boolean[][] visited` matrix, since `'#'` checked before recursing (`board[x][y] != '#'`) prevents re-entering active path cells.

---

## Dry Run

Tracing Example 1: `words = ["oath", "pea", "eat", "rain"]` (`ref = 0, 1, 2, 3` in `tree`) on the `4 x 4` board:

- `i = 0, j = 0` (`'o'`): `tree.children['o']` exists -> advances to `'o'`, marks `(0,0) = '#'`, explores `(0,1) 'a'` -> `(1,1) 't'` -> `(2,1) 'h'`. At `'h'`, `node.ref == 0`: appends `"oath"` to `ans`, sets `node.ref = -1`. Backtracks and restores `'h'`, `'t'`, `'a'`, `'o'`.
- Cells `(0,1)..(1,2)` prune quickly because no Trie root children match or paths end without `ref != -1`.
- `i = 1, j = 3` (`'e'`): `tree.children['e']` exists -> advances to `'e'` -> moves left to `(1,2) 'a'` -> moves left to `(1,1) 't'`. At `'t'`, `node.ref == 2`: appends `"eat"` to `ans`, sets `node.ref = -1`. Backtracks and restores cells.
- Remaining cells finish with no further `node.ref != -1` hits.
- Final `ans`: `["oath", "eat"]` (valid in any order).

---

## Complexity Analysis

- **Time Complexity:** `O(W * L + m * n * 4 * 3^(L - 1))` — Building the Trie takes `O(W * L)` for `W` words of max length `L` (`<= 10`), and each of the `m * n` starting cells branches in at most `4` directions first and `3` unvisited directions thereafter up to depth `L`.
- **Space Complexity:** `O(W * L)` — The `Trie` stores at most `W * L` nodes, while the DFS recursion stack reaches depth at most `O(L)` (`<= 10`) since the Trie has no nodes deeper than `L`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [212word-search-ii.java](./212word-search-ii.java) |

---

## Key Learnings

- Storing the word index `int ref` inside terminal Trie nodes avoids string concatenation during DFS and enables `O(1)` deduplication by flipping `node.ref = -1`.
- The compact direction array `int[] dirs = {-1, 0, 1, 0, -1}` encodes all 4 cardinal offsets `(dirs[k], dirs[k + 1])` without two separate arrays.
- Using a sentinel character `board[i][j] = '#'` on the input grid provides `O(1)` extra-space visited tracking during backtracking.
