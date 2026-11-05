---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Breadth-First Search
  - Bidirectional Search
---

# 127. Word Ladder

**[View Problem on LeetCode](https://leetcode.com/problems/word-ladder/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0127` (`127`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Breadth-First Search`, `Bidirectional Search` |
| **Solution Language** | Java |

---

## Problem Description

Given two words `beginWord` and `endWord` and a dictionary `wordList` of equal-length lowercase words, return the **number of words** in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no valid transformation sequence exists.

Each step in the sequence changes **exactly one letter**, every word after `beginWord` must belong to `wordList`, and the final word must be `endWord`.

---

## Examples

### Example 1

```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
```

### Example 2

```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

---

## Constraints

- `1 <= beginWord.length <= 10`

- `endWord.length == beginWord.length`

- `1 <= wordList.length <= 5000`

- `wordList[i].length == beginWord.length`

- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.

- `beginWord != endWord`

- All the words in `wordList` are **unique**.

---

## Problem Understanding

- Notice the return value asks for the **number of words** in the sequence (not the number of edges/steps): e.g., `"hit" -> "hot" -> "dot" -> "dog" -> "cog"` has `4` transitions but **`5` words**.
- Modelling each word as a vertex and single-letter substitutions as unweighted edges turns this into an unweighted **Shortest Path** problem — solved optimally by **Breadth-First Search (BFS)**.
- With `wordList.length <= 5000` and word length `L <= 10`, checking all pairs of dictionary words takes `O(N^2 * L)` (`~2.5 * 10^8` operations), whereas trying `26 * L` character substitutions per word with a `HashSet` takes only `O(N * 26 * L^2)` (`~1.3 * 10^7` operations).

---

## Approach

### Brute Force Approach

Searching via Depth-First Search (DFS) must explore paths of all lengths (since the first path DFS finds to `endWord` is rarely the shortest), leading to exponential `O(26^L)` / `O(N!)` backtracking time.

### Optimized Approach

Run a **Level-Order Breadth-First Search (BFS)** starting from `beginWord` (`ans = 1`), using a `HashSet<String> words` for `O(L)` neighbor lookup and immediate visited-deletion, returning `ans` on first sight of `endWord`.

### Step-by-Step Thinking Process

1. Insert all `wordList` entries into `Set<String> words = new HashSet<>(wordList)` so membership checks and removals run in `O(L)` average time.
2. Enqueue `beginWord` into `Queue<String> q` and initialize `ans = 1` (counting `beginWord` itself).
3. Process the queue level by level: increment `++ans` to represent the sequence length of words discovered in the next layer, then loop `i = q.size()` down to `1`.
4. Convert polled word `s` into `char[] chars`, try mutating each position `j` through `'a'..'z'` to build `String t`, and restore `chars[j] = ch` afterward.
5. If `!words.contains(t)`, skip `t`; if `endWord.equals(t)`, return `ans` immediately; otherwise enqueue `t` and call `words.remove(t)` so `t` is never visited again. Return `0` if `q` empties without reaching `endWord`.

### Algorithm / Intuition

In `ladderLength(beginWord, endWord, wordList)`, `words` serves a **dual purpose**:
1. It validates dictionary membership (`!words.contains(t)`).
2. Calling `words.remove(t)` the moment `t` is enqueued acts as a `visited` set, guaranteeing every dictionary word enters `q` at most once!

Notice also that we don't even need a separate up-front `if (!words.contains(endWord))` check: if `endWord` is missing from `wordList`, `!words.contains(t)` will reject `endWord` whenever it is generated, so the function never hits `if (endWord.equals(t))` and cleanly returns `0` after exhausting reachable words.

---

## Dry Run

Tracing Example 1 with `beginWord = "hit"`, `endWord = "cog"`, `wordList = ["hot","dot","dog","lot","log","cog"]`:

- **Init:** `words = {hot, dot, dog, lot, log, cog}`, `q = ["hit"]`, `ans = 1`.
- **Level 1 (`++ans -> 2`, `q.size() = 1`):**
  - Poll `"hit"` -> mutating index `1` to `'o'` finds `"hot"` in `words` (not `"cog"`) -> `q.offer("hot")`, `words.remove("hot")`.
- **Level 2 (`++ans -> 3`, `q.size() = 1`):**
  - Poll `"hot"` -> finds `"dot"` and `"lot"` -> `q = ["dot", "lot"]`, `words = {dog, log, cog}`.
- **Level 3 (`++ans -> 4`, `q.size() = 2`):**
  - Poll `"dot"` -> finds `"dog"`; poll `"lot"` -> finds `"log"` -> `q = ["dog", "log"]`, `words = {cog}`.
- **Level 4 (`++ans -> 5`, `q.size() = 2`):**
  - Poll `"dog"` -> mutating index `0` to `'c'` generates `t = "cog"`: `words.contains("cog")` is `true`, and `endWord.equals("cog")` is `true` -> immediately **returns `ans = 5`**!

---

## Complexity Analysis

- **Time Complexity:** `O(N * L^2)` — Where `N = wordList.size()` and `L = beginWord.length()`. At most `N + 1` words are polled from `q`; for each word we test `26 * L` character replacements, each taking `O(L)` to allocate `new String(chars)` and hash into `words`.
- **Space Complexity:** `O(N * L)` — `HashSet<String> words` and `ArrayDeque<String> q` hold at most `N` strings of length `L`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [127word-ladder.java](./127word-ladder.java) |

---

## Key Learnings

- Removing a node from the unvisited `HashSet` **at enqueue time** (rather than at poll time) prevents duplicate entries from flooding the BFS queue within the same level.
- Generating `26 * L` single-letter mutations beats scanning `N` dictionary words whenever `26 * L < N` (here `26 * 10 = 260 << 5000`).
- For even larger search spaces, **Bidirectional BFS** expanding simultaneously from `beginWord` and `endWord` shrinks the search frontier dramatically.
