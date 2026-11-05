---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sorting
  - Counting
---

# 1657. Determine if Two Strings Are Close

**[View Problem on LeetCode](https://leetcode.com/problems/determine-if-two-strings-are-close/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1657` (`1657`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sorting`, `Counting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Two strings `word1` and `word2` are considered **close** if one can be transformed into the other using any number of the following two operations:

1. **Swap any two existing characters**: For example, `"abcde" -> "aecdb"`.
2. **Transform every occurrence of one existing character into another existing character, and vice versa**: For example, `"aacabb" -> "bbcbaa"` (all `'a'`s become `'b'`s and all `'b'`s become `'a'`s).

Return `true` if `word1` and `word2` are close, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.
Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"
```

### Example 2

```text
Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
```

### Example 3

```text
Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.
Apply Operation 1: "cabbba" -> "caabbb"
Apply Operation 2: "caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"
```

---

## Constraints

- `1 <= word1.length, word2.length <= 10^5`

- `word1` and `word2` contain only lowercase English letters.

---

## Problem Understanding

Let's analyze the mathematical properties preserved by the two operations:
- **Operation 1 (Swapping)**: Allows arbitrary rearrangement of characters. This means the exact order of characters is irrelevant; only character counts matter.
- **Operation 2 (Frequency Swapping)**: Allows swapping the frequency counts of two existing characters, but cannot introduce new characters or eliminate existing characters.
Therefore, two strings are close if and only if:
1. They have the identical set of unique characters (if a character exists in `word1`, it must exist in `word2`, and vice-versa).
2. The multiset of character frequencies is identical (e.g., if `word1` has character counts `[1, 2, 3]`, `word2` must also have character counts `[1, 2, 3]`, regardless of which letter possesses which count).

---

## Approach

### Brute Force Approach

A brute force approach would search the transformation graph using BFS or DFS, applying all valid swaps of characters and all valid character transformations to see if `word2` is reachable from `word1`. Because there are $26!$ possible character permutations and countless reorderings, the state space is factorial and rapidly explodes, making brute force intractable.

### Optimized Approach

Count character frequencies for both strings in two 26-element arrays `freq1` and `freq2`. First, verify that both strings share the exact same set of characters: for each index $i \in [0, 25]$, check that `(freq1[i] > 0) === (freq2[i] > 0)`. Second, sort both `freq1` and `freq2` in ascending order and compare them element-by-element. If all counts match, return `true`; otherwise return `false`.

### Step-by-Step Thinking Process

1. Swapping characters freely means anagrams are equivalent; word position does not matter.
2. Character transformation (Operation 2) lets us swap frequencies between any two letters that both exist in the string.
3. Deduce invariant 1: The set of distinct characters present in `word1` must be identical to that in `word2`.
4. Deduce invariant 2: The sorted multiset of frequency counts must be identical between `word1` and `word2`.
5. Implement count arrays `freq1` and `freq2` of size 26.
6. Iterate through $0 \dots 25$ to confirm character existence matches (`freq1[i] > 0 && freq2[i] == 0` or vice versa returns `false`).
7. Sort both arrays and verify `freq1[i] === freq2[i]` across all indices.

### Algorithm / Intuition

The JavaScript solution computes character counts using `freq1` and `freq2` of length 26. The first check iterates over all 26 letters: if one word has a character (count > 0) and the other does not (count == 0), it immediately returns `false` because Operation 2 can only swap between existing characters. Then `freq1.sort((a, b) => a - b)` and `freq2.sort((a, b) => a - b)` sort the counts. Comparing sorted frequencies confirms whether the frequency distributions are identical. If all 26 counts match, Operation 2 can successfully reassign the frequencies to match letters, so it returns `true`.

---

## Dry Run

Let's trace Example 3: `word1 = "cabbba"`, `word2 = "abbccc"`
- Compute `freq1`: `'a': 2`, `'b': 3`, `'c': 1`. All other letters: 0.
- Compute `freq2`: `'a': 1`, `'b': 2`, `'c': 3`. All other letters: 0.
- Check character sets:
  - For 'a', 'b', 'c', both `freq1 > 0` and `freq2 > 0`. For others, both are 0. Check passes.
- Sort frequencies:
  - `freq1` sorted: `[0, ..., 0, 1, 2, 3]`
  - `freq2` sorted: `[0, ..., 0, 1, 2, 3]`
- Compare sorted elements: every index matches identically.
Result: `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(L_1 + L_2)` where $L_1$ and $L_2$ are the lengths of `word1` and `word2`. Populating the frequency arrays takes linear time, and sorting/comparing arrays of fixed size 26 takes $O(26 \log 26) = O(1)$ constant time.
- **Space Complexity:** `O(1)` — Only two fixed-size frequency arrays of size 26 are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1657determine-if-two-strings-are-close.js](./1657determine-if-two-strings-are-close.js) |

---

## Key Learnings

- Identify operation invariants: position swapping eliminates positional constraints; character replacement eliminates label constraints while preserving the frequency multiset.
- Always verify that both the character alphabet and the frequency spectrum match.
- Sorting a fixed alphabet array ($26 \log 26$) is effectively $O(1)$ time and memory.
