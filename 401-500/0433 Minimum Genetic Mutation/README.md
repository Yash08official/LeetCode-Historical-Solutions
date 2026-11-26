---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Breadth-First Search
  - Bidirectional Search
---

# 433. Minimum Genetic Mutation

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-genetic-mutation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0433` (`433`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Breadth-First Search`, `Bidirectional Search` |
| **Solution Language** | Java |

---

## Problem Description

A gene string can be represented by an 8-character long string, with choices from `'A'`, `'C'`, `'G'`, and `'T'`.

Suppose we need to investigate a mutation from a gene string `startGene` to a gene string `endGene` where one mutation is defined as one single character changed in the gene string.

	- For example, `"AACCGGTT" --> "AACCGGTA"` is one mutation.

There is also a gene bank `bank` that records all the valid gene mutations. A gene must be in `bank` to make it a valid gene string.

Given the two gene strings `startGene` and `endGene` and the gene bank `bank`, return *the minimum number of mutations needed to mutate from *`startGene`* to *`endGene`. If there is no such a mutation, return `-1`.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

---

## Examples

### Example 1

```
Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1
```

### Example 2

```
Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
Output: 2
```

 

**

---

## Constraints

**

	- `0 <= bank.length <= 10`

	- `startGene.length == endGene.length == bank[i].length == 8`

	- `startGene`, `endGene`, and `bank[i]` consist of only the characters `['A', 'C', 'G', 'T']`.

---

## Problem Understanding

- Find the minimum number of single-character mutations needed to transform an 8-character gene string `startGene` into `endGene` using only intermediate strings present in `bank`.

---

## Approach

### Optimized Approach (Unweighted Shortest-Path BFS)
1. Model each valid gene string as a graph node, with an undirected edge between any two genes differing in at most 1 position.
2. Run level-by-level BFS from `startGene` using a queue `q` and visited set `vis`.
3. For each popped `gene`, if it equals `endGene`, return the current `depth`. Otherwise, scan `bank` for unvisited genes differing in 1 character (`c > 0` after decrementing from `2` on each mismatch), mark visited, and enqueue.

---

## Complexity Analysis

- **Time Complexity:** $O(B^2 \cdot L)$ where $B = \text{bank.length}$ and $L = 8$ — each of up to $B + 1$ states scans `bank` with an $O(L)$ Hamming distance check.
- **Space Complexity:** $O(B \cdot L)$ for the BFS queue and visited set.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [433minimum-genetic-mutation.java](./433minimum-genetic-mutation.java) |

---

## Key Learnings

- When `bank` is small and string length is fixed ($L = 8$), checking Hamming distance directly against `bank` is simpler and faster than generating all $4 \times 8$ candidate strings.
