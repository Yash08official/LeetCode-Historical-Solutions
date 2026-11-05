---
comments: true
difficulty: Easy
tags:
  - Array
  - String
  - Trie
---

# 14. Longest Common Prefix

**[View Problem on LeetCode](https://leetcode.com/problems/longest-common-prefix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0014` (`14`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `String`, `Trie` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of strings `strs`, find and return the **longest common prefix** shared by every string in `strs`. If the strings share no common starting characters, return an empty string `""`.

---

## Examples

### Example 1

```text
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

### Example 2

```text
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

---

## Constraints

- `1 <= strs.length <= 200`

- `0 <= strs[i].length <= 200`

- `strs[i]` consists of only lowercase English letters if it is non-empty.

---

## Problem Understanding

- **Upper bound on answer:** The common prefix of all strings can never be longer than `strs[0]` (or any shortest string in `strs`).
- **Empty string case:** `strs` has at least `1` string (`1 <= strs.length <= 200`), and individual strings may have length `0` (`""`), in which case the longest common prefix is immediately `""`.
- **Early exit opportunity:** Comparing column by column across all strings stops at the very first mismatched index `i`, avoiding scanning long suffixes when strings diverge early.

---

## Approach

### Brute Force Approach

Start with `prefix = strs[0]` and horizontally compare/trim `prefix` against `strs[1]`, `strs[2]`, ..., `strs[n - 1]` one full string at a time. If the first `n - 1` strings are `200` identical `'a'`s and the very last string `strs[n - 1]` is `""`, horizontal scanning wastes `O(n * m)` work comparing `200` characters across `n - 1` strings before discovering column `0` fails on the last string.

### Optimized Approach

Use **vertical scanning**: iterate character column `i` across `strs[0]`, verifying that every other string `strs[j]` (`1 <= j < n`) is long enough and matches `strs[0].charAt(i)`, returning `strs[0].substring(0, i)` on the first mismatch.

### Step-by-Step Thinking Process

1. Use `strs[0]` as the reference prefix candidate.
2. Loop column index `i` from `0` up to `strs[0].length() - 1`.
3. For each column `i`, loop string index `j` from `1` to `n - 1`.
4. If `strs[j]` has already ended (`strs[j].length() <= i`) or differs at column `i` (`strs[j].charAt(i) != strs[0].charAt(i)`), column `i` cannot belong to the prefix — immediately return `strs[0].substring(0, i)`.
5. If the outer loop completes without returning, the entire `strs[0]` is a prefix of every string, so return `strs[0]`.

### Algorithm / Intuition

In `14longest-common-prefix.java`, short-circuit order inside `if (strs[j].length() <= i || strs[j].charAt(i) != strs[0].charAt(i))` is critical: checking `strs[j].length() <= i` **first** prevents `StringIndexOutOfBoundsException` whenever `strs[j]` is shorter than `strs[0]` (such as `"flow"` vs `"flower"` at `i = 4`). Also note that if `strs[0]` itself is `""`, the outer loop `i < 0` executes zero times and returns `strs[0]` (`""`) directly.

---

## Dry Run

**Input:** `strs = ["flower", "flow", "flight"]` (`n = 3`)

| Column `i` | `strs[0].charAt(i)` | `j = 1` (`"flow"`) | `j = 2` (`"flight"`) | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `'f'` | `'f' == 'f'` (OK) | `'f' == 'f'` (OK) | Continue to `i = 1` |
| `1` | `'l'` | `'l' == 'l'` (OK) | `'l' == 'l'` (OK) | Continue to `i = 2` |
| `2` | `'o'` | `'o' == 'o'` (OK) | `'i' != 'o'` (**Mismatch!**) | Return `"flower".substring(0, 2)` -> `"fl"` |

**Output:** `"fl"`

---

## Complexity Analysis

- **Time Complexity:** `O(S)` worst case, `O(n * minLen)` best/early-mismatch case — Where `S` is the sum of lengths of all strings in `strs`, and `minLen` is the length of the shortest string.
- **Space Complexity:** `O(1)` auxiliary space — Only loop counters `n`, `i`, `j` are used (excluding the returned substring).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [14longest-common-prefix.java](./14longest-common-prefix.java) |

---

## Key Learnings

- Vertical scanning outperforms horizontal scanning whenever a short string or early mismatch sits near the end of `strs`.
- Always guard `strs[j].length() <= i` before calling `strs[j].charAt(i)`.
- Sorting `strs` and comparing only the first and last strings takes `O(S log n)` character comparisons — clever, though slower asymptotically than `O(S)` vertical scanning.
