---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Two Pointers
  - String
  - Sliding Window
---

# 567. Permutation in String

**[View Problem on LeetCode](https://leetcode.com/problems/permutation-in-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0567` (`567`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Two Pointers`, `String`, `Sliding Window` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two lowercase English strings `s1` and `s2`, determine whether `s2` contains any permutation of `s1` as a contiguous substring. Return `true` if at least one substring of `s2` is a rearrangement of `s1`, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
```

### Example 2

```text
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

---

## Constraints

- `1 <= s1.length, s2.length <= 10^4`

- `s1` and `s2` consist of lowercase English letters.

---

## Problem Understanding

- **Permutation Equivalence:** Two strings of equal length are permutations of each other if and only if they have the exact same character frequency counts for every letter `'a'` through `'z'`.
- **Fixed Window Length:** Any substring of `s2` that is a permutation of `s1` must have length exactly `n = s1.length`.
- **Edge Condition:** If `s1.length > s2.length` (`n > m`), `s2` is too short to hold all characters of `s1`, so the answer is immediately `false`.

---

## Approach

### Brute Force Approach

Generating all `n!` permutations of `s1` and searching for each in `s2` takes `O(n! * m)` time, which explodes even for `n = 15`. A slightly better naive approach extracts every length-`n` substring of `s2`, sorts it, and compares it with `s1` sorted, taking `O((m - n) * n log n)` time — still slow when `n` and `m` are up to `10^4`.

### Optimized Approach

Use a **Fixed-Size Sliding Window** of length `n = s1.length` across `s2`, maintaining two 26-element character frequency arrays (`cnt1` and `cnt2`) and updating `cnt2` in `O(1)` per step as the window slides.

### Step-by-Step Thinking Process

1. Let `n = s1.length` and `m = s2.length`. If `n > m`, return `false` immediately.
2. Allocate two frequency arrays `cnt1` and `cnt2` of size `26` initialized with zeros to track counts of `'a'` through `'z'`.
3. Populate `cnt1` for `s1` and `cnt2` for the initial window `s2[0..n-1]`, then check if `arraysEqual(cnt1, cnt2)` is already `true`.
4. Slide the window right index `i` from `n` to `m - 1`: add the entering character `s2[i]` to `cnt2` and subtract the leaving character `s2[i - n]` from `cnt2`.
5. After each slide, compare `cnt1` and `cnt2` in `26` steps via `arraysEqual`; return `true` on the first match, or `false` if the loop finishes without a match.

### Algorithm / Intuition

Instead of recomputing character counts from scratch for every substring of length `n`, the solution maintains a rolling window over `s2`. `cnt1` holds the target histogram of `s1`, while `cnt2` holds the histogram of the current window `s2[i - n + 1 .. i]`.

When the window advances by one position to index `i`, only two characters change: `s2[i]` enters on the right (`cnt2[...]++`) and `s2[i - n]` exits on the left (`cnt2[...]--`). The helper `arraysEqual(cnt1, cnt2)` checks all `26` lowercase letter slots; whenever every count aligns, the current window is guaranteed to be a permutation of `s1`.

---

## Dry Run

Tracing `s1 = "ab"` (`n = 2`), `s2 = "eidbaooo"` (`m = 8`):

- **Target `cnt1` (`"ab"`):** `{a: 1, b: 1}` (all other letters `0`).
- **Initial window `[0..1]` (`"ei"`):** `cnt2 = {e: 1, i: 1}` -> `arraysEqual` is `false`.
- **`i = 2` (window `"id"`):** `+ 'd'`, `- 'e'` -> `cnt2 = {d: 1, i: 1}` -> `arraysEqual` is `false`.
- **`i = 3` (window `"db"`):** `+ 'b'`, `- 'i'` -> `cnt2 = {b: 1, d: 1}` -> `arraysEqual` is `false`.
- **`i = 4` (window `"ba"`):** `+ 'a'`, `- 'd'` -> `cnt2 = {a: 1, b: 1}` -> `arraysEqual(cnt1, cnt2)` is **`true`**!
- **Return:** `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(m)` — Initializing the first window takes `O(n)` time (with `n <= m`), and each of the `m - n` sliding steps updates two counts and checks `26` array entries (`O(n + 26 * (m - n)) = O(m)`).
- **Space Complexity:** `O(1)` — Both `cnt1` and `cnt2` have a fixed length of `26` regardless of input string lengths.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [567permutation-in-string.js](./567permutation-in-string.js) |

---

## Key Learnings

- Substring anagram/permutation problems reduce to comparing character frequency histograms over a fixed-length sliding window.
- Updating the incoming and outgoing characters in `O(1)` eliminates redundant `O(n)` recounting per window.
- Because the alphabet size (`26`) is small and constant, `arraysEqual` runs in `O(1)` time and is simple and bug-free compared to maintaining a separate `matches` counter.
