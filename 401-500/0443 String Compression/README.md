---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
---

# 443. String Compression

**[View Problem on LeetCode](https://leetcode.com/problems/string-compression/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0443` (`443`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

You are given a character array `chars` and asked to compress consecutive runs of identical characters **in-place**.

For every maximal contiguous group of the same character:
- If the group contains just `1` character, write only the character itself.
- If the group contains `2` or more characters, write the character followed by the decimal digits of its count (for instance, a run of `12` `'b'` characters becomes `'b'`, `'1'`, `'2'`).

All compressed characters must overwrite `chars` starting from index `0` using `O(1)` extra space. Return the new compressed length; any leftover elements at or beyond the returned index are ignored.

---

## Examples

### Example 1

```text
Input: chars = ["a","a","b","b","c","c","c"]
Output: 6
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
After modifying the input array in-place, the first 6 characters of chars should be ["a","2","b","2","c","3"].
```

### Example 2

```text
Input: chars = ["a"]
Output: 1
Explanation: The only group is "a", which remains uncompressed since it is a single character.
After modifying the input array in-place, the first character of chars should be ["a"].
```

### Example 3

```text
Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: 4
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
After modifying the input array in-place, the first 4 characters of chars should be ["a","b","1","2"].
```

---

## Constraints

- `1 <= chars.length <= 2000`

- `chars[i]` is a lowercase English letter, uppercase English letter, digit, or symbol.

---

## Problem Understanding

- **In-place safety invariant:** Replacing a run of length `L` writes `1` character when `L == 1`, `2` characters when `2 <= L <= 9`, `3` characters when `10 <= L <= 99`, and so on. Because the written representation is never longer than `L` itself (`1 <= 1`, `2 <= L` for `L >= 2`), the write pointer will **never overtake** the read pointer.
- **Multi-digit counts:** Group sizes of `10` or greater cannot be stored in a single `char`; each digit of the decimal count must occupy its own array slot.
- **Single-character groups:** Runs of length `1` must **not** append `'1'` after the character.
- **Character domain:** `chars` can include uppercase letters, lowercase letters, digits, and symbols—even if digits appear as input characters, contiguous runs of identical digits are compressed by the exact same rule.

---

## Approach

### Brute Force Approach

A straightforward baseline scans `chars` to build a separate `StringBuilder` containing each character and its group count (when greater than `1`), then copies the resulting characters back into `chars` and returns the builder's length.

While this runs in `O(n)` time, allocating a separate buffer for the entire compressed output requires `O(n)` extra space, violating the strict constant extra space requirement.

### Optimized Approach

Use **Two Pointers (Read Group + Write Pointer)** directly on `chars`: scan each contiguous group `[i, j)` of identical characters with read pointers `i` and `j`, write the character and optional multi-digit length at write pointer `k`, and advance `i = j`.

### Step-by-Step Thinking Process

1. Maintain a write index `k = 0` that tracks where the next compressed character belongs in `chars`.
2. Use `i` to mark the start of the current character group and advance `j` forward while `j < n && chars[j] == chars[i]` to find the group's exclusive end.
3. The length of the current group is `j - i`. Since the compressed form uses at most `j - i` characters, `k` is guaranteed to stay at or behind `j`, making in-place writes completely safe.
4. Write `chars[i]` to `chars[k++]`, and if `j - i > 1`, convert `j - i` to its decimal string `cnt` and write each digit character into `chars[k++]`.
5. Advance `i = j` to start the next group and return `k` once `i` reaches `n`.

### Algorithm / Intuition

In `compress(char[] chars)`, three indices coordinate the in-place pass:
- `i` points to the first character of the current run.
- `j` scans ahead (`while (j < n && chars[j] == chars[i]) ++j;`) until it hits either the end of `chars` or a different character. Notice `j` is initialized to `i + 1` in the `for` header; on subsequent iterations after `i = j`, `chars[j] == chars[i]` holds on the first check and advances `j` across the entire new group.
- `k` writes the compressed output into `chars`.

For each group `[i, j)`, `chars[k++] = chars[i]` records the character. Whenever `j - i > 1`, `String.valueOf(j - i)` produces `cnt` (at most 4 characters because `n <= 2000`), and iterating over `cnt.toCharArray()` writes each digit sequentially into `chars[k++]`. Finally, `i = j` jumps to the next group.

---

## Dry Run

Tracing **Example 1** with `chars = ['a', 'a', 'b', 'b', 'c', 'c', 'c']` (`n = 7`):

| Group # | Start `i` | End `j` after `while` | Group `chars[i..j-1]` | Length `j - i` | Writes to `chars` | `chars` prefix `0..k-1` | Next `k` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `0` | `2` | `"aa"` | `2` | `'a'`, `'2'` | `['a', '2']` | `2` |
| 2 | `2` | `4` | `"bb"` | `2` | `'b'`, `'2'` | `['a', '2', 'b', '2']` | `4` |
| 3 | `4` | `7` | `"ccc"` | `3` | `'c'`, `'3'` | `['a', '2', 'b', '2', 'c', '3']` | `6` |

Loop ends when `i = 7 == n`, returning `k = 6`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Both `i` and `j` move monotonically from `0` to `n`, and each element is read and written a constant number of times.
- **Space Complexity:** `O(1)` — Compression happens in-place; `cnt` holds the decimal digits of `j - i`, which is bounded by at most 4 characters since `chars.length <= 2000`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [443string-compression.java](./443string-compression.java) |

---

## Key Learnings

- Two-pointer in-place array compaction works safely whenever the output produced per segment is guaranteed not to exceed the input segment's length.
- Grouping consecutive equal elements with a two-pointer `[i, j)` window cleanly avoids special-casing the final group after the loop.
- Splitting multi-digit counts via `String.valueOf(len)` handles arbitrary group lengths cleanly without manual modulo/reversal arithmetic.
