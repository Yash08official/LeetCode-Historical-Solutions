---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Backtracking
  - Breadth-First Search
  - Bidirectional Search
---

# 126. Word Ladder II

**[View Problem on LeetCode](https://leetcode.com/problems/word-ladder-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0126` (`126`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Backtracking`, `Breadth-First Search`, `Bidirectional Search` |
| **Solution Language** | Java |

---

## Problem Description

Given `beginWord`, `endWord`, and a dictionary `wordList` of equal-length lowercase words, return **all shortest transformation sequences** from `beginWord` to `endWord` (or `[]` if `endWord` cannot be reached).

In a valid transformation sequence `[beginWord, s_1, ..., s_k]`, every adjacent pair differs in **exactly one character**, every intermediate/final word `s_1 .. s_k` belongs to `wordList` (`beginWord` itself need not be in `wordList`), and `s_k == endWord`.

---

## Examples

### Example 1

```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"
```

### Example 2

```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

---

## Constraints

- `1 <= beginWord.length <= 5`

- `endWord.length == beginWord.length`

- `1 <= wordList.length <= 500`

- `wordList[i].length == beginWord.length`

- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.

- `beginWord != endWord`

- All the words in `wordList` are **unique**.

- The **sum** of all shortest transformation sequences does not exceed `10^5`.

---

## Problem Understanding

- Unlike Word Ladder I (which only needs the minimum step count), here we must reconstruct **every** shortest path without blowing up memory or traversing exponentially many non-shortest / dead-end paths.
- **Pitfall 1 (Queueing full paths in BFS):** Storing entire `List<String>` paths inside the BFS queue duplicates prefixes exponentially and often causes Memory/Time Limit Exceeded.
- **Pitfall 2 (Premature visited removal):** If two words `p1` and `p2` at step `step - 1` both transform into `t` at step `step`, **both** `p1` and `p2` are valid shortest-path parents of `t`! Removing `t` from `words` on first sight is fine *only if* we still check `dist.get(t) == step` to record additional parents from the same BFS level.
- **Pitfall 3 (Forward vs Backward DFS):** Reconstructing paths **backward** from `endWord` to `beginWord` using parent map `prev` guarantees every DFS branch is part of a shortest path from `beginWord`, avoiding forward dead ends that never reach `endWord`!

---

## Approach

### Brute Force Approach

Exploring all simple paths from `beginWord` to `endWord` via backtracking DFS without first finding shortest distances checks paths of arbitrary length up to `N = 500`, taking `O(N!)` worst-case time.

### Optimized Approach

Use a two-phase **Level-Order BFS + Backward Backtracking DFS**: first build a Shortest-Path Directed Acyclic Graph (`prev` parent map and `dist` level map) via BFS stopping right after the level where `endWord` is found, then reconstruct all shortest sequences backward from `endWord` to `beginWord`.

### Step-by-Step Thinking Process

1. Load `wordList` into `HashSet<String> words`; if `!words.contains(endWord)`, return `[]` immediately. Remove `beginWord` from `words`.
2. Run level-by-level BFS (`step = 1, 2, ...`) while `!q.isEmpty() && !found`, tracking each word's shortest distance in `dist` and shortest-path predecessors in `Map<String, Set<String>> prev`.
3. When mutating `p` to neighbor `t`: if `dist.getOrDefault(t, 0) == step`, `t` was already discovered earlier in **this same** BFS level, so add `p` to `prev.get(t)` to preserve all tied shortest paths.
4. If `words.contains(t)` (first discovery of `t`), add `p` to `prev[t]`, remove `t` from `words`, enqueue `t`, set `dist.put(t, step)`, and set `found = true` if `t.equals(endWord)` (finishing the current level before stopping BFS).
5. If `found`, run backtracking `dfs(path, beginWord, cur)` starting from `endWord`, prepending each `precursor` in `prev.get(cur)` via `Deque.addFirst` until `cur.equals(beginWord)`.

### Algorithm / Intuition

In `findLadders(beginWord, endWord, wordList)`, look closely at how `dist`, `words`, and `prev` cooperate inside the character-mutation loop:
- When `t` is discovered for the **first** time (at BFS depth `step`), `words.contains(t)` is `true`: `prev` records `p`, `words.remove(t)` prevents `t` from ever being re-enqueued, and `dist.put(t, step)` stamps its shortest level.
- When `t` is reached **again** by another word `p'` in the **same** BFS level `step`, `dist.getOrDefault(t, 0) == step` triggers first and executes `prev.get(t).add(p')`, then `!words.contains(t)` skips re-enqueueing `t`!
- When `t` was already visited in an **earlier** level (`< step`), `dist.get(t) < step` AND `!words.contains(t)`, so longer paths to `t` are completely ignored.

Once the level containing `endWord` completes (`!found` terminates the `while`), `dfs` walks `prev` backward from `endWord` to `beginWord` using an `ArrayDeque<String> path` (`addFirst` / `removeFirst` in `O(1)` time), copying `new ArrayList<>(path)` into `ans` at `beginWord`.

---

## Dry Run

Tracing Example 1 with `beginWord = "hit"`, `endWord = "cog"`, `wordList = ["hot","dot","dog","lot","log","cog"]`:

1. **Init:** `words = {hot, dot, dog, lot, log, cog}`, `dist = {hit: 0}`, `q = [hit]`.
2. **BFS `step = 1` (poll `"hit"`):**
   - Finds `"hot"` in `words` -> `prev[hot] = {hit}`, `dist[hot] = 1`, `q = [hot]`.
3. **BFS `step = 2` (poll `"hot"`):**
   - Finds `"dot"` and `"lot"` -> `prev[dot] = {hot}`, `prev[lot] = {hot}`, `dist[dot] = dist[lot] = 2`, `q = [dot, lot]`.
4. **BFS `step = 3` (poll `"dot"`, `"lot"`):**
   - From `"dot"`: finds `"dog"` (`prev[dog] = {dot}`, `dist[dog] = 3`) (`"lot"` has `dist = 2 != 3`, skipped).
   - From `"lot"`: finds `"log"` (`prev[log] = {lot}`, `dist[log] = 3`). `q = [dog, log]`.
5. **BFS `step = 4` (poll `"dog"`, `"log"`):**
   - From `"dog"`: finds `"cog"` -> `prev[cog] = {dog}`, `dist[cog] = 4`, `words.remove("cog")`, **`found = true`**.
   - From `"log"`: generates `"cog"` -> `dist.get("cog") == 4 == step` triggers **`prev.get("cog").add("log")`** -> `prev[cog] = {dog, log}`!
6. **Backward DFS from `"cog"`:**
   - `cog -> dog -> dot -> hot -> hit` -> adds `["hit","hot","dot","dog","cog"]`
   - `cog -> log -> lot -> hot -> hit` -> adds `["hit","hot","lot","log","cog"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N * L^2 + P * L)` — Where `N = wordList.size()` (`<= 500`), `L = beginWord.length()` (`<= 5`), and `P` is the total number of words across all shortest sequences (`<= 10^5`). BFS dequeues each word at most once and tests `26 * L` mutations of `O(L)` string construction/hashing cost; backward DFS visits only valid shortest-path edges.
- **Space Complexity:** `O(N * L + P)` — `words`, `dist`, `q`, and the `prev` parent DAG store `O(N)` words/sets (at most `O(N * 26 * L)` parent links), plus `O(P)` for the output list `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [126word-ladder-ii.java](./126word-ladder-ii.java) |

---

## Key Learnings

- To extract **all** shortest paths in an unweighted graph, build a shortest-path parent DAG with BFS (`dist[v] == dist[u] + 1`) rather than storing full path copies inside the BFS queue.
- Always reconstruct paths **backward from the target (`endWord`)** rather than forward from `beginWord` — every edge in `prev` reachable from `endWord` is guaranteed to reach `beginWord` without dead ends.
- Finishing the entire current BFS level after setting `found = true` is essential so sibling nodes at the same optimal depth can also attach to `endWord`.
