---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 3. Longest Substring Without Repeating Characters

**[View Problem on LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0003` (`3`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting of English letters, digits, symbols, and spaces, determine the length of the **longest contiguous substring** that contains no duplicate characters.

---

## Examples

### Example 1

```text
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
```

### Example 2

```text
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

### Example 3

```text
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

---

## Constraints

- `0 <= s.length <= 10^5`

- `s` consists of English letters, digits, symbols and spaces.

---

## Problem Understanding

- **Substring vs. Subsequence:** Characters in the chosen window `s[i..j]` must be contiguous; skipping characters (like `"pwke"` in `"pwwkew"`) is invalid.
- **Character set:** All characters in `s` are standard ASCII characters (codes `0` through `127`), which lets us use a fixed-size `boolean[128]` lookup table instead of a boxed `HashSet<Character>`.
- **Scale:** `s.length()` can be up to `10^5` (and can also be `0`), requiring a linear-time `O(n)` approach.

---

## Approach

### Brute Force Approach

Enumerate every possible substring `s[i..j]` (`0 <= i <= j < n`) and check whether all characters inside it are unique using a boolean array or set. Checking uniqueness from scratch takes `O(n^3)` worst-case time, or `O(n^2)` if extended incrementally from each start index `i` — still too slow for `n = 10^5` across diverse inputs.

### Optimized Approach

Maintain a sliding window `[i, j]` backed by a `boolean[128]` ASCII presence array `ss`, expanding `j` rightward and shrinking `i` whenever a duplicate character is encountered.

### Step-by-Step Thinking Process

1. Represent the active window `s[i..j]` with two pointers `i` (left) and `j` (right), plus a boolean array `ss` of size `128` indicating which ASCII characters are currently inside the window.
2. Advance `j` one character `c = s.charAt(j)` at a time.
3. If `ss[c]` is already `true`, adding `c` would create a duplicate; repeatedly unmark `ss[s.charAt(i)] = false` and increment `i` until the previous occurrence of `c` leaves the window.
4. Mark `ss[c] = true` and update `ans = Math.max(ans, j - i + 1)` with the valid window's length.

### Algorithm / Intuition

In `3longest-substring-without-repeating-characters.java`, `ss` acts as a direct-address table indexed by Java `char` values (`0..127`). For each right endpoint `j`, `c = s.charAt(j)` is inspected. The `while (ss[c])` loop shrinks the window from the left (`ss[s.charAt(i++)] = false`) until the earlier copy of `c` is evicted. Once `ss[c]` is `false`, we set `ss[c] = true` — restoring the invariant that `s[i..j]` contains only unique characters — and compare `j - i + 1` against `ans`.

---

## Dry Run

**Input:** `s = "abcabcbb"`

| `j` | `c` | `while (ss[c])` Shrinking Action | Window `[i..j]` (`"substr"`) | `j - i + 1` | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `'a'` | None | `[0..0]` (`"a"`) | `1` | `1` |
| `1` | `'b'` | None | `[0..1]` (`"ab"`) | `2` | `2` |
| `2` | `'c'` | None | `[0..2]` (`"abc"`) | `3` | `3` |
| `3` | `'a'` | Evict `'a'` at `i=0` -> `i=1` | `[1..3]` (`"bca"`) | `3` | `3` |
| `4` | `'b'` | Evict `'b'` at `i=1` -> `i=2` | `[2..4]` (`"cab"`) | `3` | `3` |
| `5` | `'c'` | Evict `'c'` at `i=2` -> `i=3` | `[3..5]` (`"abc"`) | `3` | `3` |
| `6` | `'b'` | Evict `'a'` (`i=3`), `'b'` (`i=4`) -> `i=5` | `[5..6]` (`"cb"`) | `2` | `3` |
| `7` | `'b'` | Evict `'c'` (`i=5`), `'b'` (`i=6`) -> `i=7` | `[7..7]` (`"b"`) | `1` | `3` |

**Output:** `3`

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Both `j` and `i` only move forward from `0` to `n - 1`, so each character is added to `ss` once and removed at most once (`<= 2n` operations).
- **Space Complexity:** `O(1)` — The `boolean[] ss = new boolean[128]` array uses a fixed `128` bytes regardless of the input string length.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3longest-substring-without-repeating-characters.java](./3longest-substring-without-repeating-characters.java) |

---

## Key Learnings

- Monotonic two-pointer sliding windows achieve `O(n)` amortized time even with a nested `while` loop because the left pointer `i` never moves backward.
- When characters belong to standard ASCII, a `boolean[128]` array outperforms `HashSet<Character>` by avoiding autoboxing and hashing overhead.
- Storing last-seen indices in an `int[128]` array is an alternative optimization that lets `i` jump directly past the duplicate instead of stepping one by one.
