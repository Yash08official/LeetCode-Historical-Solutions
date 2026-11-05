---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - String
  - Dynamic Programming
  - Backtracking
  - Trie
  - Memoization
---

# 140. Word Break II

**[View Problem on LeetCode](https://leetcode.com/problems/word-break-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0140` (`140`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Dynamic Programming`, `Backtracking`, `Trie`, `Memoization` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` and a dictionary of unique words `wordDict`, insert spaces into `s` to form valid sentences where every word belongs to `wordDict`. Return **all** possible valid sentences in any order.

Words from `wordDict` may be reused arbitrarily many times in a single sentence. If no valid segmentation exists, return an empty list.

---

## Examples

### Example 1

```text
Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
```

### Example 2

```text
Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.
```

### Example 3

```text
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
```

---

## Constraints

- `1 <= s.length <= 20`

- `1 <= wordDict.length <= 1000`

- `1 <= wordDict[i].length <= 10`

- `s` and `wordDict[i]` consist of only lowercase English letters.

- All the strings of `wordDict` are **unique**.

- Input is generated in a way that the length of the answer doesn't exceed 10^5.

---

## Problem Understanding

- **Enumerating All Paths vs. Boolean Reachability:** Unlike Word Break I (Problem 139), we cannot stop at the first valid split—we must collect every distinct sequence of dictionary words that concatenates to `s`.
- **Small Input Length (`s.length <= 20`):** Because `s` has at most `20` characters, there are at most `2^{19}` ways to place spaces between characters, making recursive DFS over suffixes practical.
- **Prefix Lookup via Trie:** Inserting all words of `wordDict` into a `Trie` allows quick prefix/word validation over lowercase English letters (`'a'`–`'z'`).

---

## Approach

### Brute Force Approach

Generating all `2^{n-1}` possible space placements across `s` first and then validating every word of every candidate sentence against the dictionary list wastes time exploring branches whose very first word isn't even in `wordDict`.

### Optimized Approach

Insert all dictionary words into a custom **`Trie`** and run **Recursive Depth-First Search (`dfs`)** on suffixes of `s`. Only recurse on suffix `s.substring(i)` when prefix `s.substring(0, i)` is a valid word in the `Trie`, prepending the matched word to each returned sub-sentence list.

### Step-by-Step Thinking Process

1. Build a `Trie` class with `Trie[26] children` and `boolean isEnd`, supporting `insert(word)` and exact-word `search(word)`.
2. Populate `trie` with every word `w` from `wordDict`.
3. Define `dfs(String s)` returning `List<List<String>>`: all valid word-list segmentations of suffix `s`.
4. Base case: when `s` is `""`, return a list containing a single empty word list `[[]]` so callers can prepend matched words to it; if no split works, return `[]`.
5. For each split length `i` from `1` to `s.length()`, if `trie.search(s.substring(0, i))` is `true`, recurse on `s.substring(i)`, prepend `s.substring(0, i)` via `v.add(0, ...)`, and join each final word list with `" "` using Java Streams.

### Algorithm / Intuition

The solution separates dictionary indexing (`Trie`) from sentence assembly (`dfs`). In `dfs(String s)`, the base case `"".equals(s)` is crucial: returning a `res` with one empty `ArrayList<>()` distinguishes a successful end-of-string match (`[[]]`, 1 valid empty suffix) from a dead end (`[]`, 0 valid suffixes). When `trie.search(s.substring(0, i))` succeeds, `dfs(s.substring(i))` returns every valid decomposition of the remainder. If the remainder is unsegmentable, `dfs` returns an empty `res`, so the inner `for (List<String> v : ...)` loop executes zero times and naturally prunes that branch. Note that `dfs` here does not memoize suffix results and calls `v.add(0, ...)` on `ArrayList`, which relies on `s.length() <= 20` and bounded answer size to run fast.

---

## Dry Run

Trace on **Example 1**: `s = "catsanddog"`, `wordDict = ["cat", "cats", "and", "sand", "dog"]`

1. `trie` inserts `"cat"`, `"cats"`, `"and"`, `"sand"`, `"dog"`.
2. `dfs("catsanddog")` tests prefixes `s.substring(0, i)`:
   - `i = 3` (`"cat"` in `trie`): calls `dfs("sanddog")`
     - Inside `dfs("sanddog")`, `i = 4` (`"sand"` in `trie`) calls `dfs("dog")`
     - Inside `dfs("dog")`, `i = 3` (`"dog"` in `trie`) calls `dfs("")` -> returns `[[]]`
     - `dfs("dog")` prepends `"dog"` -> returns `[["dog"]]`
     - `dfs("sanddog")` prepends `"sand"` -> returns `[["sand", "dog"]]`
     - `dfs("catsanddog")` prepends `"cat"` -> adds `["cat", "sand", "dog"]`.
   - `i = 4` (`"cats"` in `trie`): calls `dfs("anddog")`
     - `i = 3` (`"and"` in `trie`) -> `dfs("dog")` -> `[["dog"]]`
     - `dfs("anddog")` returns `[["and", "dog"]]`
     - `dfs("catsanddog")` prepends `"cats"` -> adds `["cats", "and", "dog"]`.
3. Stream `String.join(" ", e)` converts `res` to `["cat sand dog", "cats and dog"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * k + n * 2^n)` — Inserting `m` words of max length `k` into the `Trie` takes `O(m * k)`. Because `dfs` is unmemoized and checks prefixes with `trie.search`, in the worst case it explores up to `2^{n - 1}` partitions (bounded here by `n <= 20`), doing `O(n)` substring/list work per step.
- **Space Complexity:** `O(m * k + n * 2^n)` — The `Trie` uses `O(m * k)` nodes, recursion stack depth is at most `O(n)`, and storing all valid word lists takes space proportional to the total output size.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [140word-break-ii.java](./140word-break-ii.java) |

---

## Key Learnings

- Returning `[[]]` (a list containing one empty list) for the empty-string base case vs. `[]` (an empty list) for dead ends cleanly separates valid completions from failed branches.
- Even with a `Trie`, calling `trie.search(s.substring(0, i))` inside the loop re-traverses from the root; walking a single `Trie` node pointer character-by-character as `i` advances eliminates repeated prefix scans.
- For larger `s.length()`, adding a `Map<String, List<List<String>>>` memoization table (while cloning lists before mutating) prevents recomputing shared suffixes.
