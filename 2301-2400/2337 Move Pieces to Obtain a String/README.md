---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
---

# 2337. Move Pieces to Obtain a String

**[View Problem on LeetCode](https://leetcode.com/problems/move-pieces-to-obtain-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2337` (`2337`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

You are given two strings `start` and `target`, both of length `n`. Each string consists only of the characters `'L'`, `'R'`, and `'_'`:
- `'L'` and `'R'` represent movable pieces.
- `'L'` can move to the left only if there is an adjacent blank space `'_'` to its left.
- `'R'` can move to the right only if there is an adjacent blank space `'_'` to its right.
- `'_'` represents a blank space that can be occupied by a piece.

Pieces cannot jump over one another. Return `true` if it is possible to obtain the string `target` from `start` by moving pieces any number of times; otherwise, return `false`.

---

## Examples

### Example 1

```text
Input: start = "_L__R__R_", target = "L______RR"
Output: true
Explanation: We can obtain the string target from start by doing the following moves:
- Move the first piece one step to the left, start becomes equal to "L___R__R_".
- Move the last piece one step to the right, start becomes equal to "L___R___R".
- Move the second piece three steps to the right, start becomes equal to "L______RR".
Since it is possible to get the string target from start, we return true.
```

### Example 2

```text
Input: start = "R_L_", target = "__LR"
Output: false
Explanation: The 'R' piece in the string start can move one step to the right to obtain "_RL_".
After that, no pieces can move anymore, so it is impossible to obtain the string target from start.
```

### Example 3

```text
Input: start = "_R", target = "R_"
Output: false
Explanation: The piece in the string start can move only to the right, so it is impossible to obtain the string target from start.
```

---

## Constraints

- `n == start.length == target.length`

- `1 <= n <= 10^5`

- `start` and `target` consist of the characters `'L'`, `'R'`, and `'_'`.

---

## Problem Understanding

Key observations and constraints:
- `n == start.length == target.length` with `1 <= n <= 10^5`.
- Since pieces cannot jump over each other, the relative sequence of `'L'` and `'R'` pieces in `start` and `target` must be IDENTICAL when ignoring all `'_'` characters.
- Directional movement restrictions:
  - An `'L'` piece can only move to the left. Therefore, its position `i` in `start` must be greater than or equal to its position `j` in `target` (`i >= j`). If `i < j`, it would need to move right, which is forbidden.
  - An `'R'` piece can only move to the right. Therefore, its position `i` in `start` must be less than or equal to its position `j` in `target` (`i <= j`). If `i > j`, it would need to move left, which is forbidden.

---

## Approach

### Brute Force Approach

A brute-force approach would model all possible moves as transitions in a graph and perform BFS or DFS to determine if `target` is reachable from `start`. Because there are `O(3^n)` possible string states, this graph search approach is computationally impossible for `n = 10^5`.

### Optimized Approach

Use a two-pointer approach comparing pieces from left to right. Maintain pointer `i` for `start` and pointer `j` for `target`. In each iteration, advance `i` past all `'_'` in `start`, and advance `j` past all `'_'` in `target`. If both reach the end (`i == n && j == n`), return `true`. If only one reaches the end or `start[i] != target[j]`, return `false`. Check directional feasibility: if `start[i] == 'L' && i < j` or `start[i] == 'R' && i > j`, return `false`. Increment both pointers and repeat.

### Step-by-Step Thinking Process

1. Pieces cannot cross each other, meaning the sequence of non-blank characters must match exactly.
2. An `'L'` piece can only travel left ($i \ge j$).
3. An `'R'` piece can only travel right ($i \le j$).
4. Use two pointers $i$ and $j$ to skip `'_'` and find matching non-blank characters.
5. At each non-blank character, check: equality, `'L'` index condition, and `'R'` index condition.
6. If all pieces match and satisfy directional constraints, return `true`.

### Algorithm / Intuition

In `Solution.canChange`, pointers `i = 0` and `j = 0` traverse `start` and `target`. Inside `while (true)`:
1. Advance `i` while `i < n && start.charAt(i) == '_'`. Advance `j` while `j < n && target.charAt(j) == '_'`.
2. If `i == n && j == n`, both strings have been fully and validly matched, so return `true`.
3. If one reached the end while the other did not, or if the piece characters differ (`start.charAt(i) != target.charAt(j)`), return `false`.
4. Check movement validity: if piece is `'L'` and `i < j`, or piece is `'R'` and `i > j`, return `false`.
5. Advance both `++i` and `++j` to search for the next pieces.

---

## Dry Run

Consider `start = "_L__R__R_"`, `target = "L______RR"` with `n = 9`:
- Initial `i = 0, j = 0`.
- Skip blanks: `i` skips `_` to `1` (`start[1] = 'L'`). `j` is at `0` (`target[0] = 'L'`).
  - Both are `'L'`. Check `start[i] == 'L' && i < j` -> `1 < 0` is False (valid move left). Increment `i = 2, j = 1`.
- Skip blanks: `i` moves from `2` past `_` to `4` (`start[4] = 'R'`). `j` moves past `_` to `7` (`target[7] = 'R'`).
  - Both are `'R'`. Check `start[i] == 'R' && i > j` -> `4 > 7` is False (valid move right). Increment `i = 5, j = 8`.
- Skip blanks: `i` moves past `_` to `7` (`start[7] = 'R'`). `j` is at `8` (`target[8] = 'R'`).
  - Both are `'R'`. Check `7 > 8` is False (valid move right). Increment `i = 8, j = 9`.
- Skip blanks: `i` skips `_` to `9`. `j` is at `9`.
- `i == 9 && j == 9` evaluates to True -> return `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Both pointers `i` and `j` traverse the strings monotonically from `0` to `n`. Every character is examined at most a constant number of times.
- **Space Complexity:** `O(1)` — Only pointer variables `i`, `j`, and `n` are stored, requiring strictly constant memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2337move-pieces-to-obtain-a-string.java](./2337move-pieces-to-obtain-a-string.java) |

---

## Key Learnings

- In problems with non-crossing entities, matching characters using two pointers that skip blanks is an optimal `O(n)` paradigm.
- Directional movement translates directly into coordinate inequalities ($i \ge j$ for leftward, $i \le j$ for rightward).
- Checking both relative ordering and positional monotonicity completely characterizes state reachability.
