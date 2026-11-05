---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Greedy
  - Counting
---

# 1400. Construct K Palindrome Strings

**[View Problem on LeetCode](https://leetcode.com/problems/construct-k-palindrome-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1400` (`1400`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Greedy`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting of lowercase English letters and an integer `k`, determine whether it is possible to construct exactly `k` non-empty palindrome strings using all the characters of `s`.

Every character from `s` must be used, and each character must belong to exactly one of the `k` palindromes. Return `true` if such a construction is possible, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: s = "annabelle", k = 2
Output: true
Explanation: You can construct two palindromes using all characters in s.
Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"
```

### Example 2

```text
Input: s = "leetcode", k = 3
Output: false
Explanation: It is impossible to construct 3 palindromes using all the characters of s.
```

### Example 3

```text
Input: s = "true", k = 4
Output: true
Explanation: The only possible solution is to put each character in a separate string.
```

---

## Constraints

- `1 <= s.length <= 10^5`

- `s` consists of lowercase English letters.

- `1 <= k <= 10^5`

---

## Problem Understanding

Key observations:
- A palindrome can have at most one character with an odd frequency (which occupies the center position). All other characters must appear an even number of times within that palindrome.
- If the string `s` has `x` characters with odd frequencies in total, each of these `x` characters must be placed into the center of a separate palindrome. Therefore, we need at least `x` palindromes (`k >= x`).
- Since each palindrome must be non-empty, we cannot construct more palindromes than there are characters in `s`, which establishes the upper bound `k <= s.length()`.
- Any character with an even frequency can either remain together within one palindrome or be split across palindromes. Thus, whenever `x <= k <= s.length()`, it is guaranteed that `k` palindromes can be formed.

---

## Approach

### Brute Force Approach

A naive approach would attempt to generate all partitions of the multiset of characters in `s` into `k` non-empty subsets, and then verify if each subset can be rearranged into a palindrome. Given that `s.length <= 10^5`, the number of possible partitions is astronomical, resulting in an impossible exponential time complexity. The problem does not require constructing the palindromes, only checking mathematical feasibility.

### Optimized Approach

Count the frequencies of all 26 lowercase letters in `s` using an integer array. Sum the number of characters that have an odd frequency (let this count be `x`). Check the length constraint `s.length() >= k` and the odd count constraint `x <= k`. If both conditions hold, return `true`; otherwise, return `false`.

### Step-by-Step Thinking Process

1. Observe that each palindrome can host at most one character with an odd count.
2. Determine the minimum number of palindromes: if `x` characters have odd counts in `s`, we need at least `x` distinct palindromes to accommodate them (`k >= x`).
3. Determine the maximum number of palindromes: since every palindrome must be non-empty, we can create at most `n = s.length()` palindromes (`k <= n`).
4. Conclude that any integer `k` satisfying `x <= k <= n` is valid because paired characters can be freely distributed or split into length-1 palindromes.
5. Implement a single-pass frequency array of size 26 and count characters where `v & 1 == 1`.

### Algorithm / Intuition

The solution checks if `n = s.length() < k`; if so, it immediately returns `false` since there are not enough characters to form `k` non-empty strings. It allocates an array `int[] cnt = new int[26]` and increments `cnt[s.charAt(i) - 'a']` for each character in `s`. Then, it iterates through `cnt` and tallies `x += v & 1`, which adds 1 for every odd frequency. Finally, it returns `x <= k`.

---

## Dry Run

Walkthrough on Example 1: `s = "annabelle"`, `k = 2`.
- Length `n = 9`. Check `n < k` (`9 < 2` is `false`).
- Character frequencies: `'a': 2`, `'b': 1`, `'e': 2`, `'l': 2`, `'n': 2`. All others are 0.
- Parity count `x`:
  - `'a'`: `2 & 1 = 0`
  - `'b'`: `1 & 1 = 1` -> `x = 1`
  - `'e'`: `2 & 1 = 0`
  - `'l'`: `2 & 1 = 0`
  - `'n'`: `2 & 1 = 0`
- Final odd count `x = 1`.
- Check `x <= k`: `1 <= 2` is `true`. Return `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate through the string `s` of length `n` once to compute character frequencies, followed by scanning an array of fixed size 26.
- **Space Complexity:** `O(1)` — The frequency array `cnt` has a fixed size of 26 regardless of input length.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1400construct-k-palindrome-strings.java](./1400construct-k-palindrome-strings.java) |

---

## Key Learnings

- A string can be rearranged into a palindrome if and only if at most one character has an odd frequency.
- When partitioning into `k` palindromes, the number of odd-frequency characters `x` dictates the minimum number of palindromes needed.
- Bitwise AND (`v & 1`) provides a branchless way to check odd parity.
