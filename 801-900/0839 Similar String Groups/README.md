---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - String
  - Union-Find
---

# 839. Similar String Groups

**[View Problem on LeetCode](https://leetcode.com/problems/similar-string-groups/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0839` (`839`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Union-Find` |
| **Solution Language** | Java |

---

## Problem Description

Two strings `X` and `Y` are similar if we can swap two letters (in different positions) of `X`, so that it equals `Y`. Also two strings `X` and `Y` are similar if they are equal.

We form groups of similar strings. If string `A` is similar to `B`, and `B` is similar to `C`, then `A` and `C` are in the same group (transitive similarity).

Given a list `strs` of strings where every string in `strs` is an anagram of every other string, return the number of groups.

---

## Problem Understanding

- Since all strings are anagrams of equal length $m$, two strings are similar if and only if they differ at at most 2 character positions (either identical `diff == 0` or single swap `diff == 2`).
- Connected components under similarity equivalence can be maintained efficiently using Disjoint Set Union (Union-Find).

---

## Approach

### Pairwise Comparison + Union-Find

1. Initialize a `UnionFind` data structure of size $n$, with initial component count `cnt = n`.
2. For every pair of strings $(i, j)$ with $0 \le j < i < n$:
   - Count the number of character mismatches `diff`.
   - If `diff <= 2`, merge groups $i$ and $j$ with `uf.union(i, j)`.
   - If the merge successfully combines two previously distinct components, decrement `cnt`.
3. Return the final component count `cnt`.

---

## Complexity Analysis

- **Time Complexity:** $O(N^2 \cdot M)$ where $N$ is the number of strings and $M$ is the string length.
- **Space Complexity:** $O(N)$ for the Union-Find parent and size arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [839similar-string-groups.java](./839similar-string-groups.java) |

---

## Key Learnings

- Equivalence relations and transitive similarity map naturally onto connected components in a graph.
- Union-Find with path compression and union-by-size provides nearly $O(1)$ amortized merge operations.
