---
comments: true
difficulty: Hard
tags:
  - String
  - Rolling Hash
  - String Matching
  - Hash Function
  - Manacher
  - Z Algorithm
  - Knuth–Morris–Pratt Algorithm
---

# 214. Shortest Palindrome

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-palindrome/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0214` (`214`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Rolling Hash`, `String Matching`, `Hash Function`, `Manacher`, `Z Algorithm`, `Knuth–Morris–Pratt Algorithm` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a string `s` consisting of lowercase English letters. You may transform `s` into a palindrome only by prepending characters to the **front** of `s`.

Return the shortest possible palindrome that can be formed through this transformation.

---

## Examples

### Example 1

```text
Input: s = "aacecaaa"
Output: "aaacecaaa"
```

### Example 2

```text
Input: s = "abcd"
Output: "dcbabcd"
```

---

## Constraints

- `0 <= s.length <= 5 * 10^4`

- `s` consists of lowercase English letters only.

---

## Problem Understanding

Because we are only allowed to add characters in **front** of `s`, consider splitting `s` into a prefix `P = s[0..idx-1]` and a remaining suffix `R = s[idx..n-1]`. If `P` is already a palindrome, then prepending `reverse(R)` to `s` produces `reverse(R) + P + R`, which is guaranteed to be a palindrome! To minimize the number of added characters `|R|`, we must **maximize** the length `idx` of the **longest palindromic prefix** of `s`.

---

## Approach

### Brute Force Approach

Check every prefix `s[0..i]` from longest (`i = n - 1`) down to `0` to see if `s[0..i]` is a palindrome using a two-pointer scan, stopping at the first match and prepending the reverse of `s[i + 1..n - 1]`. For inputs like `"aaaa...aaab"`, almost every prefix check scans nearly the entire string before failing at the end, degrading to `O(n^2)` time across `n <= 5 * 10^4` characters.

### Optimized Approach

Use a single-pass polynomial rolling hash (Rabin-Karp) with `base = 131` and `mod = 10^9 + 7` to maintain both the forward hash (`prefix`) and reverse hash (`suffix`) of `s[0..i]` in `O(1)` per character, recording the longest prefix length `idx` where `prefix === suffix`.

### Step-by-Step Thinking Process

1. Reduce the problem to finding the longest prefix `s[0..idx - 1]` that reads the same forward and backward.
2. Map each character `'a'..'z'` to `1..26` (`t = s.charCodeAt(i) - 'a'.charCodeAt(0) + 1`) — avoiding `0` so `'a'` and `'aa'` cannot collide with leading-zero hashes.
3. Maintain the forward polynomial hash `prefix = (prefix * base + t) % mod`, which appends `t` as the lowest-order digit (`s[0]*B^i + s[1]*B^(i-1) + ... + s[i]`).
4. Simultaneously maintain the reverse polynomial hash `suffix = (suffix + t * mul) % mod` (with `mul = B^i % mod`), which appends `t` as the highest-order digit (`s[0] + s[1]*B + ... + s[i]*B^i`).
5. Whenever `prefix === suffix`, update `idx = i + 1`. After the loop, if `idx === n`, `s` is already a palindrome; otherwise prepend `s.substring(idx)` reversed onto `s`.

### Algorithm / Intuition

View `s[0..i]` as a base-`131` number modulo `10^9 + 7`:
- Reading left-to-right shifts existing digits up by `base`: `prefix = (prefix * 131 + t) % mod`.
- Reading right-to-left places the new character `t` at weight `mul = 131^i`: `suffix = (suffix + t * mul) % mod`.
Notice a crucial JavaScript numerical detail: since `mod = 10^9 + 7` and `base = 131`, the largest intermediate product `(mod - 1) * 131` or `26 * (mod - 1)` is at most `~1.31 * 10^11`, well below `Number.MAX_SAFE_INTEGER` (`9.007 * 10^15`), so JavaScript computes every step with 100% exact integer precision! Once the full pass identifies `idx`, `s.substring(idx).split('').reverse().join('') + s` mirrors the unmatched tail onto the front.

---

## Dry Run

Tracing Example 1: `s = "aacecaaa"` (`n = 8`, `base = 131`, `a=1, c=3, e=5`):

| `i` | `s[i]` (`t`) | Forward String | Reverse String | `prefix === suffix`? | `idx` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `'a'` (`1`) | `"a"` | `"a"` | Yes (`1 === 1`) | `1` |
| `1` | `'a'` (`1`) | `"aa"` | `"aa"` | Yes (`132 === 132`) | `2` |
| `2` | `'c'` (`3`) | `"aac"` | `"caa"` | No | `2` |
| `3` | `'e'` (`5`) | `"aace"` | `"ecaa"` | No | `2` |
| `4` | `'c'` (`3`) | `"aacec"` | `"cecaa"` | No | `2` |
| `5` | `'a'` (`1`) | `"aaceca"` | `"acecaa"` | No | `2` |
| `6` | `'a'` (`1`) | `"aacecaa"` | `"aacecaa"` | **Yes** | **`7`** |
| `7` | `'a'` (`1`) | `"aacecaaa"` | `"aaacecaa"` | No | `7` |

Loop finishes with `idx = 7` (`< 8`). `s.substring(7)` is `"a"`, reversed is `"a"`, and `"a" + "aacecaaa"` returns `"aaacecaaa"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single `O(n)` loop computes the rolling hashes, followed by `O(n)` string slicing, reversing, and concatenation.
- **Space Complexity:** `O(n)` — Reversing `s.substring(idx)` via `.split('').reverse().join('')` allocates an array of up to `n` characters and constructs the output string.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [214shortest-palindrome.js](./214shortest-palindrome.js) |

---

## Key Learnings

- Any problem asking for the shortest palindrome by prepending characters reduces to finding the longest palindromic prefix of `s`.
- Maintaining incremental forward (`prefix * B + t`) and backward (`suffix + t * B^i`) polynomial hashes compares a string against its reverse on-the-fly in `O(1)` extra variables.
- Always map `'a'` to `1` (not `0`) in rolling hashes; otherwise `'a'`, `'aa'`, and `'aaa'` all hash to `0`!
