---
comments: true
difficulty: Hard
tags:
  - Two Pointers
  - String
  - Dynamic Programming
---

# 466. Count The Repetitions

**[View Problem on LeetCode](https://leetcode.com/problems/count-the-repetitions/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0466` (`466`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Two Pointers`, `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Define `[s, n]` as the string formed by concatenating `n` copies of `s`. A string `a` can be **obtained from** string `b` if `a` is a subsequence of `b` (formed by deleting zero or more characters from `b`).

Given strings `s1`, `s2` and integers `n1`, `n2`, let `str1 = [s1, n1]` and `str2 = [s2, n2]`. Return the **maximum integer `M`** such that `[str2, M]` is a subsequence of `str1`.

---

## Examples

### Example 1

```text
Input: s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
Output: 2
```

### Example 2

```text
Input: s1 = "acb", n1 = 1, s2 = "acb", n2 = 1
Output: 1
```

---

## Constraints

- `1 <= s1.length, s2.length <= 100`

- `s1` and `s2` consist of lowercase English letters.

- `1 <= n1, n2 <= 10^6`

---

## Problem Understanding

- **Subsequence greedy matching:** Checking how many copies of `s2` fit inside `str1` as a subsequence is optimally done greedily from left to right—whenever the next character of `s1` matches the currently needed character `s2[j]`, advance `j` immediately (wrapping `j` back to `0` and incrementing the completed `s2` count each time `j == s2.length()`).
- **Converting `s2` count to `str2` count:** Since `[str2, M] = [s2, n2 * M]`, if `str1` contains at most `ans` disjoint-in-order copies of `s2`, then the maximum `M` is simply integer division `ans / n2`.
- **Why materialize `str1` fails:** `s1.length <= 100` and `n1 <= 10^6`, so `str1` can have up to `10^8` characters, making character-by-character scanning across all `n1` copies slow when done naively without precomputing block transitions.

---

## Approach

### Brute Force Approach

Explicitly building `str1` of length `s1.length() * n1` (up to `10^8` characters) or running nested loops over `n1 * s1.length()` characters wastes `O(n1 * m)` character comparisons.

Notice that `s2` only has `n = s2.length() <= 100` possible starting pointer positions `j` at the start of any copy of `s1`!

### Optimized Approach

Use **Jump-Table Precomputation (State Transition DP)**: for every possible starting index `i` (`0 <= i < s2.length()`) in `s2`, precompute `d[i] = {cnt, next_j}`—how many full copies of `s2` are completed and where pointer `j` lands after scanning one copy of `s1`—then step through `n1` blocks in `O(1)` per block and return `ans / n2`.

### Step-by-Step Thinking Process

1. Let `m = s1.length()` and `n = s2.length()`. At the beginning of any copy of `s1`, our greedy subsequence pointer into `s2` is at some index `j` in `0 .. n - 1`.
2. Because every copy of `s1` is identical, starting at pointer `i` in `s2` and scanning one copy of `s1` is completely deterministic: it always finishes `cnt` copies of `s2` and ends at pointer `next_j`.
3. Precompute `d[i] = new int[] {cnt, j}` for all `0 <= i < n` in `O(n * m)` time (at most `100 * 100 = 10,000` operations).
4. Simulate `n1` copies of `s1` starting from `j = 0`: in each of the `n1` steps, add `d[j][0]` to `ans` and transition `j = d[j][1]`.
5. Divide total matched `s2` copies `ans` by `n2` to obtain the maximum repetitions of `str2`.

### Algorithm / Intuition

In `getMaxRepetitions(String s1, int n1, String s2, int n2)`:
- **Phase 1 (Transition Table `d`):** For each starting state `i` (`0 <= i < n`), `j` is initialized to `i` and `cnt` to `0`. Scanning `k` from `0` to `m - 1`, whenever `s1.charAt(k) == s2.charAt(j)`, `j` advances; if `++j == n`, a full copy of `s2` was matched, so `j` resets to `0` and `++cnt`. The result `{cnt, j}` is saved in `d[i]`.
- **Phase 2 (Block Simulation):** Starting at `j = 0` and `ans = 0`, the loop runs `n1` times (`for (int j = 0; n1 > 0; --n1)`), jumping across an entire copy of `s1` per iteration via `ans += d[j][0]; j = d[j][1];`.
- Finally, `ans / n2` converts matched `s2` occurrences into matched `[s2, n2]` occurrences.

---

## Dry Run

Tracing **Example 1** with `s1 = "acb"`, `n1 = 4`, `s2 = "ab"`, `n2 = 2` (`m = 3`, `n = 2`):

**Phase 1 — Build `d`:**
- **`i = 0` (`j = 0`, `cnt = 0`):**
  - `k = 0` (`'a'`): matches `s2[0] = 'a'` -> `j = 1`.
  - `k = 1` (`'c'`): `!= s2[1] ('b')`.
  - `k = 2` (`'b'`): matches `s2[1] = 'b'` -> `++j == 2` -> `j = 0`, `cnt = 1`.
  - Stores `d[0] = {1, 0}`.
- **`i = 1` (`j = 1`, `cnt = 0`):**
  - `k = 0` (`'a'`), `k = 1` (`'c'`): no match with `'b'`.
  - `k = 2` (`'b'`): matches `s2[1] = 'b'` -> `++j == 2` -> `j = 0`, `cnt = 1`.
  - Stores `d[1] = {1, 0}`.

**Phase 2 — Simulate `n1 = 4` copies from `j = 0`:**
- Copy 1..4: Each step adds `d[0][0] = 1` and transitions `j = d[0][1] = 0`, yielding `ans = 4`.

**Return:** `ans / n2 = 4 / 2 = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * m + n1)` — Building `d` takes `O(n * m)` where `m = s1.length()` and `n = s2.length()`, and stepping through `n1` blocks takes `O(n1)`.
- **Space Complexity:** `O(n)` — The transition table `d` stores `n` two-element `int[]` arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [466count-the-repetitions.java](./466count-the-repetitions.java) |

---

## Key Learnings

- Precomputing how one periodic block `s1` transforms every starting state `0 .. |s2| - 1` compresses `O(|s1|)` work per block down to an `O(1)` table lookup.
- Greedy earliest-match scanning is always optimal for counting disjoint subsequence repetitions.
- If `n1` were even larger (e.g. `10^18`), `d` could be combined with cycle detection (Pigeonhole Principle over `n` states) or binary lifting to solve Phase 2 in `O(n)` or `O(log n1)`.
