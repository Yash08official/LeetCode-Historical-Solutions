---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Backtracking
  - Counting
---

# 1079. Letter Tile Possibilities

**[View Problem on LeetCode](https://leetcode.com/problems/letter-tile-possibilities/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1079` (`1079`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Backtracking`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `tiles` of length `1` to `7` consisting of uppercase English letters, where each character represents a physical letter tile.

Return the total number of **distinct non-empty letter sequences** (of any length from `1` up to `tiles.length`) that can be formed using the available tiles.

---

## Examples

### Example 1

```text
Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
```

### Example 2

```text
Input: tiles = "AAABBC"
Output: 188
```

### Example 3

```text
Input: tiles = "V"
Output: 1
```

---

## Constraints

- `1 <= tiles.length <= 7`

- `tiles` consists of uppercase English letters.

---

## Problem Understanding

- **Subsets + Permutations with Duplicates:** Unlike standard permutations, sequences do not need to use all `n` tiles—sequences of length `1, 2, ..., n` all count. Furthermore, duplicate letters in `tiles` (like two `'A'`s in `"AAB"`) must not generate duplicate output sequences.
- **Small Constraint (`n <= 7`):** At `n = 7` with all distinct letters, the maximum possible number of non-empty sequences is `7 + 42 + 210 + 840 + 2520 + 5040 + 5040 = 13,699`, making backtracking over distinct choices very fast.
- **Frequency-Driven Deduplication:** Grouping identical tiles into a frequency array `cnt[26]` naturally prevents duplicate branches: at any position in the sequence, we try each available **letter value** (`'A'`–`'Z'`) at most once rather than each tile index.

---

## Approach

### Brute Force Approach

Generate all index permutations of lengths `1` to `n` using a `boolean[] used` array of size `n`, build each `String`, and insert every formed string into a `HashSet<String>` to filter duplicates. While acceptable for `n <= 7`, it explores duplicate branches (up to `n!` per length even when all letters are identical) and allocates thousands of temporary `String` objects.

### Optimized Approach

Count tile frequencies in an `int[26]` array `cnt` and run recursive backtracking `dfs(cnt)` that picks each available distinct letter (`cnt[i] > 0`), increments the sequence count immediately, recurses on the remaining counts, and restores `cnt[i]`.

### Step-by-Step Thinking Process

1. Count how many times each uppercase letter `'A'`..`'Z'` appears in `tiles` using `int[] cnt = new int[26]`.
2. Model sequence construction as a decision tree where the root is the empty string and each edge appends one letter `i` whose remaining count `cnt[i] > 0`.
3. Because sibling edges from any node correspond to distinct letters `'A'`..`'Z'`, every node visited below the root represents a unique non-empty sequence—no `HashSet` or string building is needed!
4. In `dfs(cnt)`, loop `i` from `0` to `25`: whenever `cnt[i] > 0`, count the new sequence (`++res`), consume one tile (`--cnt[i]`), add all longer extensions (`res += dfs(cnt)`), and backtrack (`++cnt[i]`).

### Algorithm / Intuition

`numTilePossibilities` first populates `cnt[c - 'A']` for every character `c` in `tiles`. Then `dfs(cnt)` counts how many non-empty sequences can extend the current prefix using the remaining tile inventory in `cnt`.

Inside `dfs`, `res` starts at `0`. Whenever `cnt[i] > 0`, choosing letter `i` forms one valid sequence right away (`++res`). Decrementing `--cnt[i]` updates the remaining pool before `res += dfs(cnt)` recursively counts all sequences that start with this new prefix and have at least one more character. Restoring `++cnt[i]` leaves `cnt` unchanged for the next letter choice in the loop.

---

## Dry Run

Using **Example 1** (`tiles = "AAB"` -> `cnt['A'] = 2, cnt['B'] = 1`):

- **Root `dfs([2, 1])`:**
  - Pick `'A'` (`++res` -> `1`, represents `"A"`), recurse `dfs([1, 1])`:
    - Pick `'A'` (`+1`, `"AA"`), recurse `dfs([0, 1])`:
      - Pick `'B'` (`+1`, `"AAB"`), recurse `dfs([0, 0])` -> returns `0`.
      - Returns `1`.
    - Pick `'B'` (`+1`, `"AB"`), recurse `dfs([1, 0])`:
      - Pick `'A'` (`+1`, `"ABA"`), recurse `dfs([0, 0])` -> returns `0`.
      - Returns `1`.
    - `dfs([1, 1])` returns `1 + 1 + 1 + 1 = 4`.
  - After `'A'` branch: root `res = 1 + 4 = 5`.
  - Pick `'B'` (`++res` -> `6`, represents `"B"`), recurse `dfs([2, 0])`:
    - Pick `'A'` (`+1`, `"BA"`), recurse `dfs([1, 0])`:
      - Pick `'A'` (`+1`, `"BAA"`), recurse `dfs([0, 0])` -> returns `0`.
      - Returns `1`.
    - `dfs([2, 0])` returns `1 + 1 = 2`.
  - Total `res = 6 + 2 = 8`.

---

## Complexity Analysis

- **Time Complexity:** `O(26 * S)` — Where `S` is the number of valid unique sequences (`S <= 13,699` for `n <= 7`). Each recursive call corresponds to a valid prefix and iterates over the fixed `26`-element `cnt` array.
- **Space Complexity:** `O(n)` — The `cnt` array uses a constant `26` integers (`O(1)`), and the recursion stack depth never exceeds `n = tiles.length` (`<= 7`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1079letter-tile-possibilities.java](./1079letter-tile-possibilities.java) |

---

## Key Learnings

- Counting frequencies in an array and branching per distinct character eliminates duplicate permutations at the source without needing a `HashSet`.
- Incrementing `res` at every valid branch transition counts sequences of all lengths (`1` through `n`) in a single traversal.
- Modifying `cnt` in place (`--cnt[i]` / `++cnt[i]`) avoids allocating strings or new arrays during backtracking.
