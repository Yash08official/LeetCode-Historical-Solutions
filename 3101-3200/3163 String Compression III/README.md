---
comments: true
difficulty: Medium
tags:
  - String
---

# 3163. String Compression III

**[View Problem on LeetCode](https://leetcode.com/problems/string-compression-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3163` (`3163`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `word`, compress it using the following algorithm:
1. Start with an empty string `comp`.
2. While `word` is not empty:
   - Remove a prefix of maximal length consisting of a single character `c` repeating at most 9 times.
   - Append the length of this prefix followed by the character `c` to `comp`.

Return the resulting compressed string `comp`.

---

## Examples

### Example 1

**Input:** `word = "abcde"`

**Output:** `"1a1b1c1d1e"`

**Explanation:**

Initially, `comp = ""`. Apply the operation 5 times, choosing `"a"`, `"b"`, `"c"`, `"d"`, and `"e"` as the prefix in each operation.

For each prefix, append `"1"` followed by the character to `comp`.

### Example 2

**Input:** `word = "aaaaaaaaaaaaaabb"`

**Output:** `"9a5a2b"`

**Explanation:**

Initially, `comp = ""`. Apply the operation 3 times, choosing `"aaaaaaaaa"`, `"aaaaa"`, and `"bb"` as the prefix in each operation.

- For prefix `"aaaaaaaaa"`, append `"9"` followed by `"a"` to `comp`.

- For prefix `"aaaaa"`, append `"5"` followed by `"a"` to `comp`.

- For prefix `"bb"`, append `"2"` followed by `"b"` to `comp`.

---

## Constraints

- `1 <= word.length <= 2 * 10^5`

- `word` consists only of lowercase English letters.

---

## Problem Understanding

Key algorithmic requirements:
- Run-length encoding variant with a maximum run length limit of 9.
- If a character repeats more than 9 consecutive times (say 14 times), it must be split into multiple chunks: a chunk of 9 followed by a chunk of 5 (e.g. `"9a5a"`).
- If a character repeats fewer than 9 times (e.g. 3 times), it produces a single chunk of that length (e.g. `"3a"`).
- String concatenation inside a loop must use `StringBuilder` to avoid quadratic `O(n^2)` string recreation overhead.

---

## Approach

### Brute Force Approach

A naive implementation might physically slice and mutate substrings using `word = word.substring(len)`. Creating new string slices in each iteration yields an `O(n^2)` time complexity, which will timeout on strings of length `2 * 10^5`.

### Optimized Approach

We iterate through `word` using two pointers `i` and `j`:
- For each character at index `i`, we advance `j` while `j < n` and `word.charAt(j) == word.charAt(i)` to find the full run length `k = j - i`.
- While `k > 0`, we take a chunk of size `x = Math.min(9, k)`, append `x` and `word.charAt(i)` to a `StringBuilder ans`, and decrement `k -= x`.
- We advance `i = j` to the next distinct character group.
- We return `ans.toString()`.

### Step-by-Step Thinking Process

1. We need to compress identical consecutive character runs, capping each chunk at 9.
2. Two pointers `i` and `j` can identify the entire contiguous block of identical characters in `O(run_length)`.
3. Once block size `k = j - i` is known, break it down greedily into chunks of `min(9, k)`.
4. Append each `[count][char]` to a `StringBuilder`.
5. Every character is examined once by `j` and processed in chunks, yielding `O(n)` overall time.

### Algorithm / Intuition

The two-pointer chunking operates as follows:
1. Initialize `StringBuilder ans = new StringBuilder()` and `n = word.length()`.
2. Loop `i` from `0` to `n - 1`:
   - Find the end of identical characters: `j = i + 1`, and while `j < n && word.charAt(j) == word.charAt(i)`, `++j`.
   - Let total count `k = j - i`.
   - While `k > 0`:
     - `int x = Math.min(9, k)`.
     - `ans.append(x).append(word.charAt(i))`.
     - `k -= x`.
   - Set `i = j`.
3. Return `ans.toString()`.

---

## Dry Run

Trace on Example 1: `word = "abcde"` (`n = 5`)

- `i = 0`: character `'a'`.
  - `j` stops at 1. `k = 1 - 0 = 1`.
  - `x = min(9, 1) = 1` -> append `"1a"`. `k = 0`. `i = 1`.
- `i = 1`: character `'b'`.
  - `j` stops at 2. `k = 1` -> append `"1b"`. `i = 2`.
- `i = 2`: character `'c'`.
  - `j` stops at 3. `k = 1` -> append `"1c"`. `i = 3`.
- `i = 3`: character `'d'`.
  - `j` stops at 4. `k = 1` -> append `"1d"`. `i = 4`.
- `i = 4`: character `'e'`.
  - `j` stops at 5. `k = 1` -> append `"1e"`. `i = 5`.
- Returns `"1a1b1c1d1e"`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n) — Each character in `word` of length n is visited once by the pointer `j`, and the inner chunking loop executes `ceil(k / 9)` times, which sums to at most O(n) total operations.
- **Space Complexity:** O(n) — A `StringBuilder` of size at most 2n is constructed to store the resulting compressed string.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3163string-compression-iii.java](./3163string-compression-iii.java) |

---

## Key Learnings

- Two-pointer run-length segmentation cleanly separates sequence identification from output formatting.
- Chunking using `Math.min(limit, remaining)` gracefully handles arbitrarily long runs with minimal code.
- Always use `StringBuilder` for repetitive string assembly to maintain linear runtime.
