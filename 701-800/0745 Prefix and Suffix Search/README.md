---
comments: true
difficulty: Hard
tags:
  - String
  - Design
  - Trie
---

# 745. Prefix and Suffix Search

**[View Problem on LeetCode](https://leetcode.com/problems/prefix-and-suffix-search/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0745` (`745`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Design`, `Trie` |
| **Solution Language** | Java |

---

## Problem Description

Design a special dictionary that searches the words in it by a prefix and a suffix.

Implement the WordFilter class:


	WordFilter(string[] words) Initializes the object with the words in the dictionary.
	f(string pref, string suff) Returns the index of the word in the dictionary, which has the prefix pref and the suffix suff. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return -1.


 
Example 1:


Input
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
Output
[null, 0]
Explanation
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // return 0, because the word at index 0 has prefix = "a" and suffix = "e".


 
Constraints:


	1 <= words.length <= 104
	1 <= words[i].length <= 7
	1 <= pref.length, suff.length <= 7
	words[i], pref and suff consist of lowercase English letters only.
	At most 104 calls will be made to the function f.

---

## Problem Understanding

- We need to efficiently find the largest index of a word having a given prefix and suffix.
- A dual Trie structure (one for prefixes, one for reversed suffixes) allows querying all matching word indices.
- Storing sorted index lists at each Trie node enables a two-pointer intersection to find the maximum shared index.

---

## Approach

### Optimized Approach (Dual Prefix and Suffix Tries with Two-Pointer Intersection)

1. Build two 26-ary Tries:
   - `p`: inserts each word and stores index $i$ in the node's `indexes` list.
   - `s`: inserts the reversed word and stores index $i$ in its `indexes` list.
2. Query `f(pref, suff)`:
   - Search `pref` in `p` to get candidate list `a`.
   - Search reversed `suff` in `s` to get candidate list `b`.
   - Since indices in `a` and `b` are inserted in strictly increasing order, use two pointers starting from the back ($i = |a|-1, j = |b|-1$):
     - If $a[i] == b[j]$, return this maximum index.
     - Else decrement the pointer pointing to the larger index.
   - If no match, return `-1`.

---

## Dry Run

Words: `["apple"]` (index 0).
- `p` stores 0 at prefixes `"a"`, `"ap"`, `"app"`, `"appl"`, `"apple"`.
- `s` stores 0 at reversed suffixes `"e"`, `"el"`, `"elp"`, `"elpp"`, `"elppa"`.
- Query `pref = "a"`, `suff = "e"`:
  `a = [0]`, `b = [0]`. $a[0] == b[0] == 0$ -> returns `0`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \cdot L)$ build time; query time $O(P + S + N)$ where $P = |pref|$, $S = |suff|$, $N$ = number of words.
- **Space Complexity:** $O(N \cdot L)$ memory for dual Trie nodes and index lists.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [745prefix-and-suffix-search.java](./745prefix-and-suffix-search.java) |

---

## Key Learnings

- Reversing suffixes converts suffix search into standard Trie prefix matching.
- Maintaining monotonic index lists allows finding the maximum common index in linear two-pointer time without set hashing.
