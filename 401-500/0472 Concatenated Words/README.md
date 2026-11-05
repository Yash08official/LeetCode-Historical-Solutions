---
comments: true
difficulty: Hard
tags:
  - Array
  - String
  - Dynamic Programming
  - Depth-First Search
  - Trie
  - Sorting
---

# 472. Concatenated Words

**[View Problem on LeetCode](https://leetcode.com/problems/concatenated-words/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0472` (`472`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `String`, `Dynamic Programming`, `Depth-First Search`, `Trie`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an array `words` of unique lowercase strings, find and return all **concatenated words** in `words`.

A **concatenated word** is any string in `words` that can be formed completely by concatenating **two or more shorter strings** from `words` (the same shorter word may be reused multiple times).

---

## Examples

### Example 1

```text
Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats";
"dogcatsdog" can be concatenated by "dog", "cats" and "dog";
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
```

### Example 2

```text
Input: words = ["cat","dog","catdog"]
Output: ["catdog"]
```

---

## Constraints

- `1 <= words.length <= 10^4`

- `1 <= words[i].length <= 30`

- `words[i]` consists of only lowercase English letters.

- All the strings of `words` are **unique**.

- `1 <= sum(words[i].length) <= 10^5`

---

## Problem Understanding

- **At least two shorter words:** A word cannot match itself as a single 1-word "concatenation". Sorting `words` by ascending length guarantees that when we test a word `w`, only strictly shorter words (or equal-length words that cannot pair with another non-empty word to equal `w`'s length) have been processed so far!
- **Redundancy of concatenated words as building blocks:** Suppose `w` is itself a concatenation of shorter dictionary words `u + v`. Any future longer word that uses `w` can equivalently be decomposed using `u` followed by `v`! Thus, we **only need to insert primitive (non-concatenated) words** into our dictionary structure.
- **Short individual word lengths:** `words[i].length <= 30`, making prefix-tree (`Trie`) traversal fast along each word.

---

## Approach

### Brute Force Approach

Putting all words into a `HashSet` and recursively trying every possible substring split `w.substring(0, i)` and `w.substring(i)` without prefix pruning checks `O(L^2)` substrings per state and must track split counts to avoid matching `w` against itself as a single word.

### Optimized Approach

Use **Length-Sorted Incremental Trie + DFS Word Break**: sort `words` from shortest to longest; for each word `w`, run `dfs(w)` over the `Trie` of previously seen primitive words—adding `w` to `ans` if `dfs(w)` succeeds, or inserting `w` into the `Trie` otherwise.

### Step-by-Step Thinking Process

1. Sort `words` in ascending order of length (`Arrays.sort(words, (a, b) -> a.length() - b.length())`) so shorter candidate building blocks are always processed before any word they could form.
2. Maintain a `Trie` containing only non-concatenated base words seen so far.
3. For each non-empty word `w` in sorted order, check if `w` can be segmented into words already in `trie`: since `w` itself has not been inserted yet and all words in `trie` have length `<= w.length()` (and `words` has no duplicates!), any valid segmentation of `w` automatically uses **at least two** shorter words.
4. Implement `dfs(String w)` to walk down `trie` character by character; if a character edge is missing, prune immediately (`return false`). Whenever `node.isEnd` is `true`, recursively test the remaining suffix `dfs(w.substring(i + 1))`, with base case `"".equals(w)` returning `true`.
5. If `dfs(w)` returns `true`, add `w` to `ans`; otherwise `trie.insert(w)` so `w` becomes available as a primitive building block for longer words.

### Algorithm / Intuition

The code splits responsibilities cleanly between `Trie` and `Solution`:
- `Trie` uses a 26-way array `children` and boolean `isEnd` to store lowercase prefixes.
- `findAllConcatenatedWordsInADict` sorts `words` by length first. Because `words` contains no duplicates and `w` is tested *before* `trie.insert(w)`, `w` can never match itself as a 1-piece word.
- Notice the `if (dfs(w)) { ans.add(w); } else { trie.insert(w); }` branch: skipping `trie.insert(w)` for concatenated words keeps the `Trie` compact and reduces branching in `dfs` without losing any valid decompositions!

---

## Dry Run

Tracing **Example 1** with `words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]`:

1. **After sorting by length:** `["cat", "dog", "rat", "cats", "dogcatsdog", "catsdogcats", "ratcatdogcat", "hippopotamuses"]`.
2. **`"cat"`, `"dog"`, `"rat"` (len 3):** `trie` has no matching prefixes -> `dfs` returns `false` -> all three inserted into `trie`.
3. **`"cats"` (len 4):** `"cat"` has `isEnd = true`, calls `dfs("s")` -> `'s'` not in `trie` -> returns `false` -> `"cats"` inserted into `trie`.
4. **`"dogcatsdog"` (len 10):** Matches `"dog"` -> `dfs("catsdog")` matches `"cat"` (`dfs("sdog")` fails), continues to `"cats"` -> `dfs("dog")` matches `"dog"` -> `dfs("")` returns `true`! Added to `ans` (not inserted into `trie`).
5. **`"catsdogcats"` (len 11):** Matches `"cats"` -> `"dog"` -> `"cats"` -> `dfs("")` returns `true`! Added to `ans`.
6. **`"ratcatdogcat"` (len 12):** Matches `"rat"` -> `"cat"` -> `"dog"` -> `"cat"` -> `dfs("")` returns `true`! Added to `ans`.
7. **`"hippopotamuses"` (len 14):** `'h'` missing at root -> `dfs` immediately returns `false` -> inserted into `trie`.

Returns `ans` containing `"dogcatsdog"`, `"catsdogcats"`, and `"ratcatdogcat"`.

---

## Complexity Analysis

- **Time Complexity:** `O(N log N + N * 2^L)` worst-case (much faster on typical inputs via Trie pruning) — Sorting `N` words takes `O(N log N)` comparisons; for a word of length `L <= 30`, unmemoized `dfs` explores prefix splits in the `Trie` (up to `O(2^L)` in pathological cases like `"a", "aa", ...`, though omitting concatenated words from the `Trie` prevents `"aa"`, `"aaa"`, etc. from ever being inserted!).
- **Space Complexity:** `O(S)` — Where `S = sum(words[i].length) <= 10^5` is the total character count stored in the `Trie`, plus `O(L^2)` transient call-stack/substring space during `dfs` (`L <= 30`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [472concatenated-words.java](./472concatenated-words.java) |

---

## Key Learnings

- Sorting words by length before processing turns "concatenation of at least two shorter words" into standard Word Break without needing an extra word-count parameter.
- Omitting concatenated words from the `Trie` is both mathematically sound (by transitivity of concatenation) and a huge practical optimization against exponential `Trie` branching (e.g., if `"a"` is in `words`, `"aa"`, `"aaa"`, etc. are never added to `trie`!).
- Passing an integer start index `i` with a per-word `boolean[] memo` array is an easy extension if one wants a strict `O(N * L^2)` worst-case guarantee.
