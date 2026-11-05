---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Trie
---

# 386. Lexicographical Numbers

**[View Problem on LeetCode](https://leetcode.com/problems/lexicographical-numbers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0386` (`386`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Trie` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a positive integer `n`, return an array containing every integer from `1` to `n` ordered **lexicographically** (dictionary order, as if each number were converted to a decimal string).

Your algorithm must run in `O(n)` time and use `O(1)` extra space (beyond the returned array).

---

## Examples

### Example 1

```text
Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
```

### Example 2

```text
Input: n = 2
Output: [1,2]
```

---

## Constraints

- `1 <= n <= 5 * 10^4`

---

## Problem Understanding

In lexicographical order, `'10'` comes right after `'1'` and before `'2'`, `'100'` comes right after `'10'` and before `'101'`, and `'19'` is followed by `'2'` (if `190 > n`). Structurally, `[1, n]` forms an implicit **10-ary prefix tree (Trie)** rooted at digits `1..9`, where node `v` has children `10*v, 10*v + 1, ..., 10*v + 9` (for values `<= n`), and lexicographical order is simply a **pre-order DFS traversal** of this tree!

Key requirement: Even recursive DFS uses `O(log_{10} n)` call-stack frames; an iterative state transition achieves strict `O(1)` extra space.

---

## Approach

### Brute Force Approach

Generating `[1, 2, ..., n]`, converting each number to a string (or using JavaScript's default `Array.prototype.sort()`, which sorts elements as UTF-16 strings!), and returning the sorted array takes `O(n log n * log_{10} n)` time and `O(n)` string-conversion overhead, violating both the `O(n)` time and `O(1)` space constraints.

### Optimized Approach

Simulate an iterative pre-order traversal of the implicit 10-ary tree using a single integer cursor `v = 1`. Over `n` steps, push `v` to `ans`, try descending to its first child (`v * 10 <= n`), and if we cannot descend, climb back up (`v = Math.floor(v / 10)`) past finished subtrees (`v % 10 === 9` or `v === n`) before advancing to the next sibling (`++v`).

### Step-by-Step Thinking Process

1. Initialize `ans = []` and start at the lexicographically smallest integer `v = 1`.
2. Repeat `n` times (`for (let i = 0; i < n; ++i)`): first record `ans.push(v)`.
3. Attempt to go deeper in the prefix tree: if `v * 10 <= n`, multiply `v *= 10` (first child).
4. Otherwise `v` has no valid children `<= n`, so we must move to the next sibling or ancestor's sibling: while `v % 10 === 9` (last digit `9` has no next sibling without carrying into another prefix!) or `v === n` (incrementing `v` would exceed `n`), strip the last digit via `v = Math.floor(v / 10)`.
5. Once stripped to a prefix that can safely advance, increment `++v`.
6. After `n` iterations, every integer in `[1, n]` has been visited exactly once; return `ans`.

### Algorithm / Intuition

Think of `v` as a cursor walking a tree without parent pointers—because in decimal, the parent of any node `v` is simply `Math.floor(v / 10)`!

Why does `while (v % 10 === 9 || v === n)` work? If `v * 10 > n`, we want `v + 1`. Two things can block `v + 1`:
1. `v === n`: `v + 1` would be `n + 1 > n`, so we must step up to `Math.floor(n / 10)` first (and if that parent ends in `9`, e.g., `n = 199 -> 19 -> 1`, the `while` loop keeps climbing until `1`, then `++v` produces `2`!).
2. `v % 10 === 9`: all siblings `...0` through `...9` under `Math.floor(v / 10)` are exhausted, so we climb up until the last digit is `< 9`, then `++v` moves to the ancestor's next sibling.

---

## Dry Run

Tracing `lexicalOrder(13)` (**Example 1**):

| `i` | Pushed `v` | `v * 10 <= 13`? | Backtrack / Advance (`while` + `++v`) | Next `v` |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `1` | `10 <= 13` (Yes) | `v *= 10` | `10` |
| `1..3` | `10, 11, 12` | `100..120 <= 13` (No) | Not `%10===9` and `!== 13` -> `++v` | `11 -> 12 -> 13` |
| `4` | `13` | `130 <= 13` (No) | `v === 13` -> `v = floor(13/10) = 1`; then `++v` | `2` |
| `5..11` | `2..8` | `20..80 <= 13` (No) | `++v` each step | `3..9` |
| `12` | `9` | `90 <= 13` (No) | `v % 10 === 9` -> `v = 0`; `++v` -> `1` (loop ends) | — |

Output `ans`: `[1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The outer loop runs `n` times. Every `v = Math.floor(v / 10)` division undoes a prior digit extension (plus at most `O(log_{10} n)` steps on the final iteration), so total inner `while` steps across the entire run are bounded by `O(n)`.
- **Space Complexity:** `O(1)` auxiliary space — Only scalar variables `v` and `i` are used outside the required output array `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [386lexicographical-numbers.js](./386lexicographical-numbers.js) |

---

## Key Learnings

- Decimal numbers in `[1, n]` form an implicit 10-ary Trie where `v * 10` descends to the first child and `Math.floor(v / 10)` ascends to the parent in `O(1)` space.
- Whenever a tree's parent and next-sibling transitions are computable arithmetically from the node value itself, recursive DFS can be flattened into an `O(1)`-space state machine.
- Amortized analysis is key here: an inner `while` loop does not make the algorithm `O(n log n)` because each digit pushed via `* 10` can be popped via `/ 10` at most once.
