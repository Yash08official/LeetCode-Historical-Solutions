---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
  - Backtracking
  - Bracket Sequences
---

# 22. Generate Parentheses

**[View Problem on LeetCode](https://leetcode.com/problems/generate-parentheses/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0022` (`22`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Backtracking`, `Bracket Sequences` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n` representing the number of pairs of parentheses, generate and return a list of all possible strings of length `2 * n` that form valid, properly nested combinations of `'('` and `')'`.

---

## Examples

### Example 1

```text
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

### Example 2

```text
Input: n = 1
Output: ["()"]
```

---

## Constraints

- `1 <= n <= 8`

---

## Problem Understanding

- **Validity rules for bracket prefixes:** A string of `n` pairs is well-formed if and only if:
  1. It contains exactly `n` opening `'('` characters and `n` closing `')'` characters.
  2. In every prefix of the string, the count of closing `')'` never exceeds the count of opening `'('`.
- **Small constraint (`1 <= n <= 8`):** For `n = 8`, the 8th Catalan number is `1430`, making exhaustive backtracking over valid prefixes completely feasible.

---

## Approach

### Brute Force Approach

A naive approach generates all `2^(2n)` possible strings of `'('` and `')'` of length `2n`, and checks each string for balanced parentheses using a counter in `O(n)` time. This takes `O(n * 2^(2n))` time and wastes huge effort exploring invalid prefixes like `")("` that can never become balanced.

### Optimized Approach

The implemented Java solution uses **pruned backtracking** (`backtrack`) with a mutable `StringBuilder current` and two counters: `open` (number of `'('` placed so far) and `close` (number of `')'` placed so far). It only appends `'('` when `open < n` and only appends `')'` when `close < open`, guaranteeing every explored branch leads to at least one valid string.

### Step-by-Step Thinking Process

1. Maintain a `List<String> result` for completed strings and a single reusable `StringBuilder current` to build prefixes in-place.
2. Track `open` and `close` counts alongside `current`. When `current.length() == 2 * n`, record `current.toString()` in `result` and return.
3. Choice 1: If `open < n`, we still have opening parentheses left to place—append `'('`, recurse with `open + 1`, and delete the last character upon returning.
4. Choice 2: If `close < open`, there is at least one unmatched `'('` currently open—append `')'`, recurse with `close + 1`, and delete the last character upon returning.

### Algorithm / Intuition

Inside `backtrack(result, current, open, close, n)`, the two guards `open < n` and `close < open` act as exact invariants for Dyck paths (Catalan bracket sequences). Because `current` is mutated via `current.append(...)` before the recursive call and restored via `current.deleteCharAt(current.length() - 1)` right after, the entire recursion tree shares a single `StringBuilder` buffer instead of allocating intermediate `String` objects at every internal node.

---

## Dry Run

Tracing `n = 2` (abbreviated from Example 1's `n = 3` to show every leaf clearly; for `n = 3`, the exact same rules produce `["((()))", "(()())", "(())()", "()(())", "()()()"]`):

- Start: `current = ""`, `open = 0`, `close = 0`
  - `open < 2` -> append `'('`: `"("` (`open=1, close=0`)
    - `open < 2` -> append `'('`: `"(("` (`open=2, close=0`)
      - `open < 2` is false; `close < open` (`0 < 2`) -> append `')'`: `"(()"` (`open=2, close=1`)
        - `close < open` (`1 < 2`) -> append `')'`: `"(())"` (`length == 4`) -> **add `"(())"`**
    - Backtrack to `"("`, `close < open` (`0 < 1`) -> append `')'`: `"()"` (`open=1, close=1`)
      - `open < 2` -> append `'('`: `"()("` (`open=2, close=1`)
        - `close < open` (`1 < 2`) -> append `')'`: `"()()"` (`length == 4`) -> **add `"()()"`**

For Example 1 (`n = 3`), `backtrack` visits the 5 leaves in exact lexicographical order: `"((()))"`, `"(()())"`, `"(())()"`, `"()(())"`, and `"()()()"`.

---

## Complexity Analysis

- **Time Complexity:** `O(4^n / sqrt(n))` — Only valid prefixes are explored; the number of valid sequences is the `n`-th Catalan number `C_n = O(4^n / n^(3/2))`, and copying `current.toString()` of length `2n` at each leaf yields `O(n * C_n) = O(4^n / sqrt(n))`.
- **Space Complexity:** `O(n)` — Excluding the output list `result`, the recursion call stack reaches depth `2n` and `StringBuilder current` stores at most `2n` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [22generate-parentheses.java](./22generate-parentheses.java) |

---

## Key Learnings

- Pruning invalid states early (`open < n` and `close < open`) reduces the search space from `2^(2n)` down to the `n`-th Catalan number.
- Reusing a single `StringBuilder` with `append` and `deleteCharAt(current.length() - 1)` avoids `O(n)` string concatenation overhead at every step of the recursion.
- Exploring `'('` before `')'` naturally generates all valid parenthesis combinations in lexicographical order.
