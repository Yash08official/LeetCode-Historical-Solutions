---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - String
  - Trie
  - Hash Function
---

# 336. Palindrome Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/palindrome-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0336` (`336`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Trie`, `Hash Function` |
| **Solution Language** | Java |

---

## Problem Description

You are given a `0`-indexed array `words` of **unique** lowercase strings. Return all index pairs `[i, j]` (`i != j`) such that concatenating `words[i] + words[j]` produces a palindrome.

---

## Examples

### Example 1

```text
Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]
```

### Example 2

```text
Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["battab","tabbat"]
```

### Example 3

```text
Input: words = ["a",""]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["a","a"]
```

---

## Constraints

- `1 <= words.length <= 5000`

- `0 <= words[i].length <= 300`

- `words[i]` consists of lowercase English letters.

---

## Problem Understanding

- How can `words[i] + words[j]` form a palindrome when `words[i]` and `words[j]` may have different lengths? Let `w = words[i]` be the **longer** (or equal-length) string, split into a prefix `P` and suffix `S` (`w = P + S`):
  1. **`w` comes first (`P + S + words[j]`):** If middle piece `S` is already a palindrome and `words[j] == reverse(P)`, then `P + S + reverse(P)` is a palindrome (`[i, j]`).
  2. **`w` comes second (`words[k] + P + S`):** If middle piece `P` is already a palindrome and `words[k] == reverse(S)`, then `reverse(S) + P + S` is a palindrome (`[k, i]`).
- Watch out for equal-length pairs (`S` empty in Case 1 vs `P` empty in Case 2) and empty strings `""` so no pair `[a, b]` is emitted twice!

---

## Approach

### Brute Force Approach

Testing `isPalindrome(words[i] + words[j])` across all ordered pairs `i != j` takes `O(N^2 * L)` time (up to `2.5 * 10^7` pairs of length `600` -> `~1.5 * 10^10` character checks), causing Time Limit Exceeded.

### Optimized Approach

Insert all `words[i]` into a forward `Trie` storing terminal word indices `v`, then for every word `w = words[i]` and every split position `0 <= j <= w.length()`, check palindrome suffix/prefix slices (`isPalindrome`) and search the remaining slice **in reverse** (`trie.search`) to find matching partner indices.

### Step-by-Step Thinking Process

1. Build a 26-way `Trie` where `insert(words[i], i)` walks `words[i]` left-to-right and sets `node.v = i` at the end node (for `""`, `root.v` holds its index).
2. Implement `trie.search(w, start, end)` to walk `w` **backward** (`for (int k = end; k >= start; --k)`) from the `Trie` root, returning `node.v` (`null` if no word matches `reverse(w[start..end])`).
3. For each word `w = words[i]` of length `m` and each split `0 <= j <= m` (prefix `w[0..j-1]`, suffix `w[j..m-1]`):
4. Case 1: If `isPalindrome(w, j, m - 1)`, look up `k = trie.search(w, 0, j - 1)`. If `k != null && k != i`, add `[i, k]` (`w + words[k]`).
5. Case 2: If `j != 0 && isPalindrome(w, 0, j - 1)`, look up `k = trie.search(w, j, m - 1)`. If `k != null && k != i`, add `[k, i]` (`words[k] + w`). Guarding `j != 0` avoids duplicating equal-length pairs already captured at `j = m` in Case 1!

### Algorithm / Intuition

Why does guarding `j != 0` in Case 2 prevent duplicates while still capturing empty strings? Suppose `words = ["abcd", "dcba"]`:
- At `i = 0` (`"abcd"`), `j = 4` in Case 1 sees empty suffix `w[4..3]` (palindrome!) and reverses `"abcd"` -> finds `k = 1`, adding `[0, 1]`. At `i = 1` (`"dcba"`), `j = 4` in Case 1 similarly adds `[1, 0]`. Without `j != 0`, `j = 0` in Case 2 would *also* add `[1, 0]` and `[0, 1]` a second time!
- Meanwhile, if `words = ["a", ""]`: for `"a"` (`i = 0, m = 1`), `j = 0` in Case 1 checks `isPalindrome("a", 0, 0)` (`true`) and `search("a", 0, -1)` (stays at `root`, `v = 1`), adding `[0, 1]`; `j = 1` (`j != 0`) in Case 2 checks `isPalindrome("a", 0, 0)` (`true`) and `search("a", 1, 0)` (stays at `root`, `v = 1`), adding `[1, 0]`!

---

## Dry Run

Tracing **Example 1** (`words = ["abcd", "dcba", "lls", "s", "sssll"]`):

- `Trie` stores `0:"abcd"`, `1:"dcba"`, `2:"lls"`, `3:"s"`, `4:"sssll"`.
- `i = 0` (`"abcd"`, `m = 4`): at `j = 4`, `isPalindrome(4, 3)` is `true`, `search("abcd", 0, 3)` walks `'d'->'c'->'b'->'a'` -> `k = 1` -> adds **`[0, 1]`**.
- `i = 1` (`"dcba"`, `m = 4`): at `j = 4`, `search("dcba", 0, 3)` walks `'a'->'b'->'c'->'d'` -> `k = 0` -> adds **`[1, 0]`**.
- `i = 2` (`"lls"`, `m = 3`): at `j = 2` (`j != 0`), prefix `"ll"` (`0..1`) is palindrome, `search("lls", 2, 2)` walks `'s'` -> `k = 3` -> adds **`[3, 2]`** (`"s" + "lls" = "slls"`).
- `i = 3` (`"s"`, `m = 1`): no other single-char or empty match.
- `i = 4` (`"sssll"`, `m = 5`): at `j = 2` (`j != 0`), prefix `"ss"` (`0..1`) is palindrome, `search("sssll", 2, 4)` walks `'l'->'l'->'s'` -> `k = 2` -> adds **`[2, 4]`** (`"lls" + "sssll" = "llssssll"`).
- Final output: `[[0, 1], [1, 0], [3, 2], [2, 4]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N * L^2)` — More precisely `O(sum(m_i^2))` where `m_i = words[i].length()`: inserting all words takes `O(sum(m_i))`, and for each word of length `m_i`, `m_i + 1` splits each run `O(m_i)` palindrome checks and reverse Trie walks.
- **Space Complexity:** `O(S)` — Where `S = sum(words[i].length())`, the `Trie` allocates at most `S + 1` nodes (each with a 26-reference `children` array), excluding the output list `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [336palindrome-pairs.java](./336palindrome-pairs.java) |

---

## Key Learnings

- Searching a substring **backward** (`k = end` down to `start`) on a **forward** `Trie` checks for reversed counterparts in-place without allocating reversed `substring` objects!
- Passing index bounds `(w, start, end)` to `isPalindrome` and `trie.search` avoids creating `O(N * L)` temporary strings that would trigger GC thrashing or TLE.
- Guarding `j != 0` on one side of the prefix/suffix split cleanly deduplicates equal-length palindrome pairs while preserving empty-string matches.
