---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 1358. Number of Substrings Containing All Three Characters

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1358` (`1358`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting exclusively of the characters `'a'`, `'b'`, and `'c'`, return the total number of **contiguous substrings** of `s` that contain **at least one** `'a'`, **at least one** `'b'`, and **at least one** `'c'`.

---

## Examples

### Example 1

```text
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).
```

### Example 2

```text
Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".
```

### Example 3

```text
Input: s = "abc"
Output: 1
```

---

## Constraints

- `3 <= s.length <= 5 x 10^4`

- `s` only consists of `'a'`, `'b'` or `'c'` characters.

---

## Problem Understanding

- Notice the monotonic property of substring validity: if substring `s[L..i]` contains `'a'`, `'b'`, and `'c'`, then **every longer substring ending at `i`**—namely `s[0..i], s[1..i], ..., s[L..i]`—also contains all three characters!
- For a fixed right endpoint `i`, what is the **largest** valid left index `L`? Every valid `s[L..i]` must cover the **most recent** occurrence of `'a'`, `'b'`, and `'c'` at or before `i`. Thus the largest valid `L` is `min(last_a, last_b, last_c)`.
- Once all three characters have appeared at least once, there are exactly `min(last_a, last_b, last_c) + 1` valid left endpoints `0, 1, ..., L` for right endpoint `i`.

---

## Approach

### Brute Force Approach

Enumerate every start index `i` and expand end index `j` from `i` to `n - 1`, maintaining counts of `'a'`, `'b'`, and `'c'` and incrementing the answer whenever all three counts are positive. Exploring all pairs `(i, j)` takes `O(n^2)` time, which exceeds time limits for `n = 5 * 10^4` (~`1.25 * 10^9` substrings).

### Optimized Approach

Track the latest seen index of `'a'`, `'b'`, and `'c'` in a 3-element array `d = {-1, -1, -1}`. In a single pass over `i = 0..s.length() - 1`, update `d[s.charAt(i) - 'a'] = i` and add `Math.min(d[0], Math.min(d[1], d[2])) + 1` to `ans`.

### Step-by-Step Thinking Process

1. Count valid substrings grouped by their **right endpoint** `i`.
2. Initialize `d = {-1, -1, -1}` where `d[0]`, `d[1]`, `d[2]` store the last index of `'a'`, `'b'`, `'c'` seen up to `i`.
3. At index `i`, update `d[c - 'a'] = i`.
4. Let `m = min(d[0], d[1], d[2])`. If any character has not yet appeared, `m == -1`, so `m + 1 == 0` is safely added to `ans`.
5. Otherwise, every start index `0, 1, ..., m` forms a valid substring `s[start..i]`, contributing `m + 1` valid substrings ending at `i`.

### Algorithm / Intuition

In `numberOfSubstrings`, initializing `d` to `{-1, -1, -1}` serves a dual purpose: `-1` represents "not seen yet" AND makes `Math.min(...) + 1` evaluate to `-1 + 1 = 0` automatically without an `if` guard! As soon as `'a'`, `'b'`, and `'c'` have all appeared in `s[0..i]`, `s[m..i]` (where `m = min(d[0], d[1], d[2])`) is the **minimal** valid suffix of `s[0..i]`: `s[m]` is the only copy of whichever character appeared furthest left among the three latest positions, so starting anywhere past `m` drops that character, while starting anywhere in `[0..m]` preserves all three.

---

## Dry Run

Tracing `s = "abcabc"` (**Example 1**):

| `i` | `c` | `d = [last_a, last_b, last_c]` | `min(d) + 1` | Valid substrings ending at `i` | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `'a'` | `[0, -1, -1]` | `0` | none | `0` |
| `1` | `'b'` | `[0, 1, -1]` | `0` | none | `0` |
| `2` | `'c'` | `[0, 1, 2]` | `0 + 1 = 1` | `"abc"` | `1` |
| `3` | `'a'` | `[3, 1, 2]` | `1 + 1 = 2` | `"abca"`, `"bca"` | `3` |
| `4` | `'b'` | `[3, 4, 2]` | `2 + 1 = 3` | `"abcab"`, `"bcab"`, `"cab"` | `6` |
| `5` | `'c'` | `[3, 4, 5]` | `3 + 1 = 4` | `"abcabc"`, `"bcabc"`, `"cabc"`, `"abc"` | `10` |

Return `ans = 10`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Performs a single pass over `s` of length `n`, doing `O(1)` array updates and `Math.min` calls per character.
- **Space Complexity:** `O(1)` — Only a fixed 3-element integer array `d` and scalar variables are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1358number-of-substrings-containing-all-three-characters.java](./1358number-of-substrings-containing-all-three-characters.java) |

---

## Key Learnings

- For "count substrings with **at least** X" problems, anchoring on right index `i` and finding the **rightmost valid left boundary** `m` immediately yields `m + 1` substrings per step.
- Initializing last-seen indices to `-1` lets `min_idx + 1` naturally evaluate to `0` before all required characters have appeared.
- Notice `ans` fits in a 32-bit `int` here? Wait: for `n = 5 * 10^4`, max substrings is `n * (n + 1) / 2 ≈ 1.25 * 10^9`, which fits inside Java's signed 32-bit `int` (`<= 2.14 * 10^9`), though for `n >= 65536` `long` would be required!
