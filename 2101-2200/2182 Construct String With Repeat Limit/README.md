---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Greedy
  - Heap (Priority Queue)
  - Counting
---

# 2182. Construct String With Repeat Limit

**[View Problem on LeetCode](https://leetcode.com/problems/construct-string-with-repeat-limit/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2182` (`2182`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Greedy`, `Heap (Priority Queue)`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

Given a lowercase English string `s` and an integer `repeatLimit`, build a new string using characters from `s` (you do not have to use all of them) such that **no character appears more than `repeatLimit` times consecutively**.

Return the **lexicographically largest** valid string that can be constructed.

---

## Examples

### Example 1

```text
Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
```

### Example 2

```text
Input: s = "aababab", repeatLimit = 2
Output: "bbabaa"
Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa".
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.
```

---

## Constraints

- `1 <= repeatLimit <= s.length <= 10^5`

- `s` consists of lowercase English letters.

---

## Problem Understanding

- **Lexicographical Greedy Priority:** To make a string lexicographically as large as possible, earlier characters matter infinitely more than later ones (e.g., `"z..."` beats `"yzzzz..."`), and if one valid string is a prefix of another, the longer string wins.
- **Chunk-and-Separator Strategy:** Suppose `'z'` is the largest remaining character:
  - We should immediately place `'z'` up to `min(cnt['z'], repeatLimit)` times.
  - If all `'z'`s are used up, we simply move down to the next largest available letter.
  - If `'z'`s **still remain** (`cnt['z'] > 0`), we cannot place another `'z'` right away. To resume placing `'z'` as soon as possible while maximizing the separator position, we must insert **just `1` copy** of the **second-largest available character** (say `'y'`), and then immediately go back to placing up to `repeatLimit` more `'z'`s!
  - If no smaller character exists at all (`j < 0`), any remaining `'z'`s must be discarded because appending them would violate `repeatLimit`.

---

## Approach

### Brute Force Approach

Generating permutations or backtracking over character choices while tracking the current run length explores an exponential number of strings (`O(26^n)`), which is impossible for `s.length() <= 10^5`. Even a naive simulation that rescans or resorts remaining characters on every single character append adds unnecessary heap/sorting overhead compared to a 26-letter frequency array.

### Optimized Approach

Count frequencies of `'a'..'z'` in `int[] cnt = new int[26]` and use **two downward pointers** (`i` for the largest available character and `j` for the largest available separator `< i`) to greedily append batches of up to `repeatLimit` copies of `i` interleaved with single copies of `j`.

### Step-by-Step Thinking Process

1. Count the frequency of every character `'a'..'z'` in `cnt[26]`.
2. Maintain primary pointer `i` scanning from `25` (`'z'`) down to `0` (`'a'`), and secondary separator pointer `j` initialized to `24` and clamped via `j = Math.min(j, i - 1)`.
3. While `cnt[i] > 0`, append `min(cnt[i], repeatLimit)` copies of `(char) ('a' + i)` to `ans` and decrement `cnt[i]`.
4. If `cnt[i]` reaches `0`, break to advance `i` downward; otherwise decrement `j` until `j < 0` or `cnt[j] > 0`.
5. If `j < 0`, no smaller separator exists so break (dropping leftover `cnt[i]` and finishing); otherwise append **one** `(char) ('a' + j)`, decrement `cnt[j]`, and repeat the inner loop for `i`.

### Algorithm / Intuition

Notice how the two pointers `i` and `j` interact without ever moving backward to the right:
- `i` always points to the largest character index that might still have remaining copies.
- Whenever `cnt[i]` hits the `repeatLimit` wall with copies still left, we only append **a single** `(char) ('a' + j)`—never `repeatLimit` copies of `j`—because our top priority is to get back to placing the larger character `i` at the very next index!
- Because `j` only decreases (`j = Math.min(j, i - 1)` and `while (j >= 0 && cnt[j] == 0) --j;`), across the **entire** execution `j` traverses from `24` down to `-1` at most once rather than scanning all `26` letters repeatedly.

---

## Dry Run

Trace on **Example 1**: `s = "cczazcc"`, `repeatLimit = 3`.

1. **Frequencies:** `cnt['a' (0)] = 1`, `cnt['c' (2)] = 4`, `cnt['z' (25)] = 2`; all others `0`.
2. **`i = 25 ('z')`, `j = 24`:**
   - Append `min(cnt[25], 3) = 2` copies of `'z'` -> `ans = "zz"`, `cnt[25] = 0`.
   - `cnt[25] == 0` -> break inner loop.
3. **`i = 24 .. 3`:** `cnt[i] == 0`, each appends `0` chars and breaks immediately.
4. **`i = 2 ('c')`, `j = Math.min(j, 1) = 1`:**
   - Iteration 1: append `min(4, 3) = 3` copies of `'c'` -> `ans = "zzccc"`, `cnt[2] = 1`.
   - `cnt[2] > 0`: decrement `j` while `cnt[j] == 0`: `j = 1` (`cnt[1] == 0`) -> `--j` -> `j = 0` (`cnt[0] == 1 > 0`).
   - Append 1 separator `'a'` (`j = 0`) -> `ans = "zzccca"`, `cnt[0] = 0`.
   - Iteration 2: append `min(1, 3) = 1` copy of `'c'` -> `ans = "zzcccac"`, `cnt[2] = 0` -> break.
5. **`i = 1, 0`:** `cnt` is `0` -> break.
6. **Return `ans.toString()`:** `"zzcccac"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Counting characters takes `O(n)` where `n = s.length()`, each character in `s` is appended at most once, and both pointers `i` and `j` decrement across the `26`-letter alphabet at most `26` times (`O(n + 26) = O(n)`).
- **Space Complexity:** `O(1)` auxiliary space (`O(n)` including the `StringBuilder` output buffer) — The frequency table `cnt` has a fixed size of `26` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2182construct-string-with-repeat-limit.java](./2182construct-string-with-repeat-limit.java) |

---

## Key Learnings

- When breaking a consecutive-character limit to maximize lexicographical order, always insert **only 1** copy of the next-largest character as a separator—never exhaust the separator—so you can immediately resume placing the larger character.
- On a small fixed alphabet (`26` lowercase letters), a frequency array with monotonic two pointers (`i` and `j`) runs faster and uses less memory than a `PriorityQueue` (max-heap).
