---
comments: true
difficulty: Medium
tags:
  - String
  - Depth-First Search
  - Design
  - Trie
---

# 211. Design Add and Search Words Data Structure

**[View Problem on LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0211` (`211`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Depth-First Search`, `Design`, `Trie` |
| **Solution Language** | Java |

---

## Problem Description

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the `WordDictionary` class:

	
- `WordDictionary()` Initializes the object.
	
- `void addWord(word)` Adds `word` to the data structure, it can be matched later.
	
- `bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `'.'` where dots can be matched with any letter.

 

Example:

```text
**Input**
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
**Output**
[null,null,null,null,false,true,true,true]

**Explanation**
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
```

 

**Constraints:**

	
- `1 <= word.length <= 25`
	
- `word` in `addWord` consists of lowercase English letters.
	
- `word` in `search` consist of `'.'` or lowercase English letters.
	
- There will be at most `2` dots in `word` for `search` queries.
	
- At most `10^4` calls will be made to `addWord` and `search`.

---

## Examples

*(Refer to problem description on LeetCode)*

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Design a dictionary supporting `addWord(word)` and `search(word)` where `.` matches any single lowercase English letter.

---

## Approach

### Optimized Approach (Trie + Recursive DFS for Wildcards)
1. Store inserted words in a 26-way prefix tree (`Trie`), marking word endings with `isEnd = true`.
2. In `search(word, node)`:
   - For a normal character `c`, follow `node.children[c - 'a']` (return `false` if null).
   - For `.`, recursively try all non-null children on the remaining substring `word.substring(i + 1)`; return `true` if any branch succeeds.
3. After exhausting all characters, return `node.isEnd`.

---

## Complexity Analysis

- **Time Complexity:** `addWord`: $O(L)$; `search`: $O(L)$ without wildcards, worst-case $O(26^L)$ with wildcards.\n- **Space Complexity:** $O(N \cdot L)$ for Trie storage across $N$ words of average length $L$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [211design-add-and-search-words-data-structure.java](./211design-add-and-search-words-data-structure.java) |

---

## Key Learnings

- Combining a Trie with DFS cleanly supports both exact prefix lookups and wildcard branching.
