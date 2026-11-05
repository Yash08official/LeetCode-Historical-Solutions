---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Bit Manipulation
  - Prefix Sum
---

# 1371. Find the Longest Substring Containing Vowels in Even Counts

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1371` (`1371`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Bit Manipulation`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a lowercase English string `s`, return the length of the **longest contiguous substring** in which every vowel—`'a'`, `'e'`, `'i'`, `'o'`, and `'u'`—appears an **even** number of times (`0, 2, 4, ...` occurrences). Consonants may appear any number of times.

---

## Examples

### Example 1

```text
Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.
```

### Example 2

```text
Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e's.
```

### Example 3

```text
Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.
```

---

## Constraints

- `1 <= s.length <= 5 x 10^5`

- `s` contains only lowercase English letters.

---

## Problem Understanding

- Notice we do **not** care about exact vowel counts—only whether each of the 5 vowels has **even (`0`) or odd (`1`) parity**!
- With 5 vowels, there are only `2^5 = 32` possible parity combinations, which fit into a 5-bit integer `state` in `[0..31]`.
- **Key XOR Prefix Property:** A substring `s[L + 1 .. i]` has even counts for all 5 vowels if and only if the prefix parity bitmask at `i` is **identical** to the prefix parity bitmask at `L` (`state[i] == state[L]`), because `odd - odd = even` and `even - even = even`!
- To **maximize** `i - L`, we only need to remember the **earliest** (minimum) index `L` at which each of the `32` bitmasks first appeared.

---

## Approach

### Brute Force Approach

Check all `O(n^2)` substrings `s[i..j]` by maintaining a 5-bit mask or frequency count as `j` advances from `i` to `n - 1`. With `s.length <= 5 * 10^5`, `O(n^2)` performs up to `1.25 * 10^{11}` steps and will time out.

### Optimized Approach

Maintain a running 5-bit prefix parity mask `state` (toggling bit `j` via `state ^= (1 << j)` whenever `vowels[j]` is seen) and a fixed 32-element lookup array `pos` storing the earliest index of each `state` (with `pos[0] = -1`). At each index `i`, update `ans = Math.max(ans, i - pos[state])` and `pos[state] = Math.min(pos[state], i)`.

### Step-by-Step Thinking Process

1. Encode the parity of `'a', 'e', 'i', 'o', 'u'` in bits `0, 1, 2, 3, 4` of `state` (`0` = even count, `1` = odd count).
2. Before reading any characters (virtual index `-1`), all 5 vowels have count `0` (even), so `state = 0` first occurs at index `-1` (`pos[0] = -1`).
3. Initialize all other entries of `pos[0..31]` to `Number.MAX_VALUE` (`~1.79e308`, acting as `+Infinity` for "unseen").
4. Scan `i` from `0` to `s.length - 1`: if `s[i]` matches `vowels[j]`, flip bit `j` with `state ^= (1 << j)`.
5. Compute `i - pos[state]`: if `state` was unseen, `i - Number.MAX_VALUE` is huge and negative, leaving `ans` (`>= 0`) unchanged; if seen before, `i - pos[state]` gives the longest valid substring ending at `i`. Then record `pos[state] = Math.min(pos[state], i)`.

### Algorithm / Intuition

Why does initializing unseen states to `Number.MAX_VALUE` avoid an `if (pos[state] !== undefined)` branch? On the very first occurrence of a non-zero `state` at index `i`, `i - pos[state]` is roughly `-1.79e308`, so `Math.max(ans, i - pos[state])` keeps `ans` (`>= 0`) intact, and the next line `pos[state] = Math.min(Number.MAX_VALUE, i)` sets `pos[state] = i`. On every later occurrence `i' > i` of that same `state`, `i' - pos[state]` equals `i' - i` (the length of `s[i + 1 .. i']`), and `Math.min(i, i')` keeps `pos[state]` locked at the earliest index `i`!

---

## Dry Run

Tracing `s = "leetcodeisgreat"` (**Example 2**, shorter trace) and verifying **Example 1** (`"eleetminicoworoep"`):

On **Example 1** (`"eleetminicoworoep"`, `vowels = "aeiou"`, `'e'->bit 1 (2)`, `'i'->bit 2 (4)`, `'o'->bit 3 (8)`):
- Start: `pos[0] = -1`, `state = 0`, `ans = 0`.
- `i = 0` (`'e'`): `state = 0 ^ 2 = 2`. Unseen (`pos[2] = MAX_VALUE`) -> `ans = 0`, `pos[2] = 0`.
- `i = 1` (`'l'`): consonant -> `state = 2`. Seen at `pos[2] = 0` -> `ans = max(0, 1 - 0) = 1` (`"l"`).
- `i = 2` (`'e'`): `state = 2 ^ 2 = 0`. Seen at `pos[0] = -1` -> `ans = max(1, 2 - (-1)) = 3` (`"ele"`).
- `i = 3` (`'e'`): `state = 0 ^ 2 = 2`. Seen at `pos[2] = 0` -> `ans = max(3, 3 - 0) = 3` (`"lee"`).
- Continuing through `"...tminicowor"` up to `i = 13` (`'r'`):
  - Between `i = 1` and `i = 13` (`"leetminicowor"`), `'e'` appears twice, `'i'` appears twice, `'o'` appears twice -> net XOR is `0`, so `state` at `i = 13` returns to `2`!
  - `ans = max(ans, 13 - pos[2]) = 13 - 0 = 13`.
- Remaining indices `14..16` (`'o'`, `'e'`, `'p'`) do not exceed `13` -> returns `ans = 13`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates once over `s` of length `n`, checking the 5-character `vowels` string in `O(1)` time per character.
- **Space Complexity:** `O(1)` — `pos` is a fixed-size array of `32` numbers regardless of `s.length`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1371find-the-longest-substring-containing-vowels-in-even-counts.js](./1371find-the-longest-substring-containing-vowels-in-even-counts.js) |

---

## Key Learnings

- Whenever a subarray/substring constraint asks for **even/odd counts** of `K` distinct items (`K <= 20`), compress prefix parities into a `K`-bit bitmask and look for **equal** prefix masks.
- Setting `pos[0] = -1` is essential so valid prefixes starting at index `0` compute length `i - (-1) = i + 1` accurately.
- Using `Number.MAX_VALUE` with `Math.max` / `Math.min` eliminates branching inside hot loops while keeping `pos[state]` pinned to the earliest index.
