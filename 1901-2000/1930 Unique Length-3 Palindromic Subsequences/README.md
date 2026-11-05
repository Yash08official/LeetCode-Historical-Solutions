---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Bit Manipulation
  - Prefix Sum
---

# 1930. Unique Length-3 Palindromic Subsequences

**[View Problem on LeetCode](https://leetcode.com/problems/unique-length-3-palindromic-subsequences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1930` (`1930`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Bit Manipulation`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` of lowercase English letters, find how many **distinct** palindromic strings of **length 3** appear as a **subsequence** in `s`.

A subsequence is formed by deleting zero or more characters from `s` without reordering the remaining characters, and a palindrome reads identically forwards and backwards. Even if the same 3-letter palindrome can be formed from multiple index triples `(i, j, k)` with `i < j < k`, it is counted **only once**.

---

## Examples

### Example 1

```text
Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")
```

### Example 2

```text
Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".
```

### Example 3

```text
Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")
```

---

## Constraints

- `3 <= s.length <= 10^5`

- `s` consists of only lowercase English letters.

---

## Problem Understanding

- Any palindrome of length 3 has the exact structure `c x c`, where the first and third characters are the same letter `c` (`'a'` through `'z'`) and the middle character `x` can be any letter.
- Because `s` contains only lowercase English letters, there are at most `26 * 26 = 676` possible unique length-3 palindromes!
- For a fixed outer character `c`, choosing its **earliest** index `l` and **latest** index `r` in `s` maximizes the span `(l, r)` and therefore captures **every** possible middle character `x` that could ever sit between two occurrences of `c`.

---

## Approach

### Brute Force Approach

Checking all index triples `(i, j, k)` with `0 <= i < j < k < n` where `s[i] == s[k]` and storing `"" + s[i] + s[j] + s[k]` in a `HashSet<String>` takes `O(n^3)` time. With `n <= 10^5`, `n^3` reaches `10^15` operations and immediately times out.

### Optimized Approach

Iterate over all 26 possible outer characters `c` from `'a'` to `'z'`. For each `c`, locate its first occurrence `l = s.indexOf(c)` and last occurrence `r = s.lastIndexOf(c)`, collect all distinct characters strictly between `l` and `r` in a `HashSet<Character>`, and add the set's size to the total.

### Step-by-Step Thinking Process

1. Observe that a length-3 palindrome `c x c` is uniquely determined by its outer letter `c` and its middle letter `x`.
2. Instead of iterating over middle indices in `s`, fix the outer letter `c` across the small alphabet `'a'..'z'` (only 26 possibilities).
3. For a fixed `c`, any valid pair of outer indices `(i, k)` with `s[i] == s[k] == c` satisfies `l <= i < k <= r`, where `l` is the first occurrence of `c` and `r` is the last occurrence of `c`. Thus, a palindrome `c x c` exists if and only if `x` appears at least once in `s[l + 1 .. r - 1]`.
4. Note edge cases naturally handled by Java's `indexOf` / `lastIndexOf`: if `c` never appears (`l = -1, r = -1`) or appears only once (`l == r`), the loop `for (int i = l + 1; i < r; ++i)` executes zero times and adds `0`.
5. Sum `cs.size()` across all 26 letters `c` to get the exact count of unique `c x c` subsequences.

### Algorithm / Intuition

In `countPalindromicSubsequence`, the outer loop iterates `c` from `'a'` to `'z'`. Calling `s.indexOf(c)` finds the leftmost index `l` of `c`, and `s.lastIndexOf(c)` finds the rightmost index `r`. A fresh `HashSet<Character> cs` collects every distinct character `s.charAt(i)` for `l + 1 <= i < r`. Because `c` is fixed for the current iteration and each element in `cs` represents a distinct middle letter `x`, `cs.size()` equals the exact number of unique palindromes starting and ending with `c`. Accumulating `ans += cs.size()` over all 26 letters produces the final count without any cross-iteration duplicates.

---

## Dry Run

Tracing `s = "aabca"`:

| Outer `c` | `l = s.indexOf(c)` | `r = s.lastIndexOf(c)` | Indices Scanned `(l + 1 .. r - 1)` | `cs` Contents | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `'a'` | `0` | `4` | `i = 1, 2, 3` (`'a'`, `'b'`, `'c'`) | `{'a', 'b', 'c'}` (size `3` -> `"aaa"`, `"aba"`, `"aca"`) | `3` |
| `'b'` | `2` | `2` | none (`3 < 2` is false) | `{}` (size `0`) | `3` |
| `'c'` | `3` | `3` | none (`4 < 3` is false) | `{}` (size `0`) | `3` |
| `'d'..'z'` | `-1` | `-1` | none (`0 < -1` is false) | `{}` (size `0`) | `3` |

Returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(|Sigma| * n)` = `O(n)` — For each of the `|Sigma| = 26` lowercase English letters, `indexOf`, `lastIndexOf`, and the middle scan each take at most `O(n)` time (`26 * n` operations total).
- **Space Complexity:** `O(|Sigma|)` = `O(1)` — The `HashSet<Character> cs` holds at most 26 distinct lowercase letters at any time.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1930unique-length-3-palindromic-subsequences.java](./1930unique-length-3-palindromic-subsequences.java) |

---

## Key Learnings

- When output patterns come from a tiny alphabet (`26` letters), iterating over the **alphabet** rather than string indices often collapses `O(n^2)` or `O(n^3)` problems down to `O(26 * n)`.
- Greedy extreme endpoints: to maximize choices between two identical characters `c`, always pick the very first and very last occurrences of `c`.
