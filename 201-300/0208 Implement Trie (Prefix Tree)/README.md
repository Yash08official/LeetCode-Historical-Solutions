---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Design
  - Trie
---

# 208. Implement Trie (Prefix Tree)

**[View Problem on LeetCode](https://leetcode.com/problems/implement-trie-prefix-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0208` (`208`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Design`, `Trie` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design and implement a **Trie** (prefix tree) data structure for storing and querying lowercase English strings. Your `Trie` class must support four operations:

- `Trie()`: Initializes an empty trie object.
- `insert(word)`: Inserts the string `word` into the trie.
- `search(word)`: Returns `true` if the exact string `word` was previously inserted into the trie, or `false` otherwise.
- `startsWith(prefix)`: Returns `true` if at least one previously inserted word starts with `prefix`, or `false` otherwise.

---

## Examples

### Example 1

```text
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
```

---

## Constraints

- `1 <= word.length, prefix.length <= 2000`

- `word` and `prefix` consist only of lowercase English letters.

- At most `3 * 10^4` calls **in total** will be made to `insert`, `search`, and `startsWith`.

---

## Problem Understanding

Observe the key distinction between `search(word)` and `startsWith(prefix)`: if `"apple"` is inserted, `"app"` exists as a path of characters from the root (`startsWith("app") === true`), yet `"app"` itself has not been inserted as a complete word (`search("app") === false`). Therefore, every node needs both outgoing character links and a boolean flag (`isEnd`) indicating whether a full word terminates at that node. Since inputs contain only `'a'`–`'z'`, each node has at most `26` outgoing transitions.

---

## Approach

### Brute Force Approach

Storing inserted words in a plain array requires scanning every stored word on `search` and `startsWith`, costing `O(N * L)` per query for `N` words of length `L`. Using a `Set` makes exact `search(word)` `O(L)`, but `startsWith(prefix)` still requires either scanning all `N` keys in the set or inserting all `L` prefixes of every word into a secondary hash set (which blows up string hashing memory to `O(N * L^2)` characters).

### Optimized Approach

Represent each Trie node with a fixed-size `Array(26)` for child pointers (`children`) and a boolean terminal marker (`isEnd`), sharing a common `searchPrefix(s)` traversal helper between `search` and `startsWith`.

### Step-by-Step Thinking Process

1. Since strings consist strictly of lowercase letters `'a'` through `'z'`, map each character to index `0..25` using `c - 'a'.charCodeAt(0)`.
2. Let each `Trie` instance double as a tree node holding `this.children = new Array(26)` and `this.isEnd = false`.
3. For `insert(word)`, walk from the root `this` character by character, lazily allocating `new Trie()` whenever `node.children[idx] == null`, and set `node.isEnd = true` on the final node.
4. Factor out `searchPrefix(s)` to walk `s` from the root and return either the destination `Trie` node or `null` as soon as a missing link is encountered.
5. Implement `search(word)` as `node != null && node.isEnd`, and `startsWith(prefix)` as `node != null`.

### Algorithm / Intuition

Every path from the root `Trie` object spells out a prefix shared by all words in its subtree:
- `insert(word)` creates missing `Trie` nodes along `word`'s character indices (`idx = word.charCodeAt(i) - 97`) and marks the final node's `isEnd = true`.
- `searchPrefix(s)` performs a read-only walk along `s`. If any character link `node.children[idx]` is `null` or `undefined` (`== null` catches both in JavaScript!), the prefix does not exist and it returns `null`; otherwise it returns the node reached after the last character.
- `search(word)` requires both reaching a non-null node and confirming `node.isEnd === true`, whereas `startsWith(prefix)` only checks `node != null`.

---

## Dry Run

Tracing Example 1 operations:

1. `new Trie()`: Root created (`isEnd = false`, `children` has 26 empty slots).
2. `insert("apple")`: Creates chain `root -> 'a' -> 'p' -> 'p' -> 'l' -> 'e'`; sets `'e'.isEnd = true`.
3. `search("apple")`: `searchPrefix("apple")` lands on `'e'` node; `'e' != null && 'e'.isEnd` -> **`true`**.
4. `search("app")`: `searchPrefix("app")` lands on second `'p'` node; `'p'.isEnd` is `false` -> **`false`**.
5. `startsWith("app")`: `searchPrefix("app")` lands on second `'p'` node; `node != null` -> **`true`**.
6. `insert("app")`: Walks existing `'a' -> 'p' -> 'p'` nodes without allocating new nodes; sets second `'p'.isEnd = true`.
7. `search("app")`: `searchPrefix("app")` lands on second `'p'` node; `'p'.isEnd` is now `true` -> **`true`**.

---

## Complexity Analysis

- **Time Complexity:** `O(L)` per operation — `insert`, `search`, and `startsWith` each inspect at most `L` characters (where `L` is the length of `word` or `prefix`), doing `O(1)` array indexing per step.
- **Space Complexity:** `O(T)` — Where `T` is the total number of `Trie` nodes created across all insertions (at most the sum of lengths of all inserted words), with each node holding a fixed 26-slot `children` array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [208implement-trie-prefix-tree.js](./208implement-trie-prefix-tree.js) |

---

## Key Learnings

- Extracting a `searchPrefix(s)` helper eliminates duplicate traversal code between `search` and `startsWith`.
- Using loose equality `node.children[idx] == null` in JavaScript concisely matches `undefined` slots in `new Array(26)`.
- Tries compress shared prefixes into single paths, making prefix queries `O(L)` independent of how many total words are stored.
