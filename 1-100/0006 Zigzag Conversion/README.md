---
comments: true
difficulty: Medium
tags:
  - String
---

# 6. Zigzag Conversion

**[View Problem on LeetCode](https://leetcode.com/problems/zigzag-conversion/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0006` (`6`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a string `s` and an integer `numRows`, imagine writing the characters of `s` vertically down `numRows` rows, then diagonally up-right back to the top row, repeating this zigzag wave across columns. Afterward, read all characters row by row from top to bottom and return the concatenated string.

---

## Examples

### Example 1

```text
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

### Example 2

```text
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

### Example 3

```text
Input: s = "A", numRows = 1
Output: "A"
```

---

## Constraints

- `1 <= s.length <= 1000`

- `s` consists of English letters (lower-case and upper-case), `','` and `'.'`.

- `1 <= numRows <= 1000`

---

## Problem Understanding

- **Exact column coordinates are irrelevant:** When reading row by row at the end, horizontal spaces between diagonal characters disappear; we only need the relative left-to-right order of characters landing in each row `0 .. numRows - 1`.
- **Single-row edge case:** When `numRows === 1`, moving `i += k` would go out of bounds (`-1` or `1`), and no zigzag occurs anyway — `s` itself is immediately the answer.
- **Bounce points:** The row index oscillates `0 -> 1 -> ... -> numRows - 1 -> numRows - 2 -> ... -> 0`, reversing direction strictly at row `0` and row `numRows - 1`.

---

## Approach

### Brute Force Approach

Allocate an explicit `numRows x s.length` 2D character matrix filled with spaces, calculate exact `(row, col)` coordinates while moving straight down and diagonally up-right, and then scan the entire `numRows * n` grid to collect non-space characters. For `n = 1000` and `numRows = 1000`, this wastes `O(numRows * n)` time and memory mostly scanning empty cells.

### Optimized Approach

Simulate only the active row index `i` and direction `k` (`+1` down, `-1` up), appending each character directly to its row bucket in `g[i]` before flattening and joining all buckets.

### Step-by-Step Thinking Process

1. Handle the degenerate case `numRows === 1` upfront by returning `s`.
2. Create `numRows` dynamic row arrays `g = [[], [], ...]`.
3. Track the current row `i = 0` and direction `k = -1`.
4. For each character `c` of `s`, push `c` into `g[i]`. Whenever `i` sits at an extreme row (`i === 0` or `i === numRows - 1`), flip the direction `k = -k` (so at `i = 0` on the very first step, `k` flips from `-1` to `+1`), then step `i += k`.
5. Concatenate all row arrays via `g.flat().join('')`.

### Algorithm / Intuition

In `6zigzag-conversion.js`, initializing `k = -1` before the loop is a neat trick: on the very first character at `i = 0`, the condition `if (i === 0 || i === numRows - 1)` triggers immediately and flips `k` from `-1` to `+1`, advancing `i` to `1`. Later, when `i` reaches `numRows - 1`, `k` flips back to `-1`, stepping upward until `i` hits `0` again. Note that `new Array(numRows).fill(_).map(() => [])` populates `numRows` independent empty arrays (relying on LeetCode's global `_` binding so `.map` visits every slot). Finally, `g.flat().join('')` merges the rows in `O(n)` time.

---

## Dry Run

**Input:** `s = "PAYPALISHIRING"`, `numRows = 3` (tracing first `7` chars `"PAYPALI"`)

| Char `c` | Row `i` (Push `g[i]`) | Boundary Hit? (`i==0` or `2`) | Direction `k` After Check | Next `i` (`i + k`) | Buckets `g` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `'P'` | `0` | Yes (`i == 0`) | `+1` | `1` | `[['P'], [], []]` |
| `'A'` | `1` | No | `+1` | `2` | `[['P'], ['A'], []]` |
| `'Y'` | `2` | Yes (`i == 2`) | `-1` | `1` | `[['P'], ['A'], ['Y']]` |
| `'P'` | `1` | No | `-1` | `0` | `[['P'], ['A','P'], ['Y']]` |
| `'A'` | `0` | Yes (`i == 0`) | `+1` | `1` | `[['P','A'], ['A','P'], ['Y']]` |
| `'L'` | `1` | No | `+1` | `2` | `[['P','A'], ['A','P','L'], ['Y']]` |
| `'I'` | `2` | Yes (`i == 2`) | `-1` | `1` | `[['P','A'], ['A','P','L'], ['Y','I']]` |

Continuing through `"SHIRING"` yields:
- `g[0] = ['P','A','H','N']`
- `g[1] = ['A','P','L','S','I','I','G']`
- `g[2] = ['Y','I','R']`

`g.flat().join('')` returns `"PAHNAPLSIIGYIR"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + numRows)` — Allocating `numRows` empty arrays takes `O(numRows)`, iterating over `s` takes `O(n)`, and flattening/joining `n` characters across `numRows` buckets takes `O(n + numRows)`.
- **Space Complexity:** `O(n + numRows)` — Stores `numRows` row arrays holding a total of `n` characters (plus the flattened array created by `g.flat()`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [6zigzag-conversion.js](./6zigzag-conversion.js) |

---

## Key Learnings

- Discarding unused column coordinates reduces a 2D grid simulation to `numRows` append-only lists.
- Starting with `k = -1` at `i = 0` lets a single boundary check `i === 0 || i === numRows - 1` govern all direction reversals.
- Outside LeetCode's environment (where `_` is globally defined), prefer `Array.from({ length: numRows }, () => [])` to avoid `ReferenceError`.
