---
comments: true
difficulty: Hard
tags:
  - Array
  - String
  - Binary Search
  - Segment Tree
---

# 3501. Maximize Active Section with Trade II

**[View Problem on LeetCode](https://leetcode.com/problems/maximize-active-section-with-trade-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3501` |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `String`, `Binary Search`, `Segment Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given a binary string `s` of length `n`, where:
- `'1'` represents an active section.
- `'0'` represents an inactive section.

You can perform at most one trade to maximize the number of active sections in `s`. In a trade, you:
- Convert a contiguous block of `'1'`s that is surrounded by `'0'`s to all `'0'`s.
- Afterward, convert a contiguous block of `'0'`s that is surrounded by `'1'`s to all `'1'`s.

Additionally, you are given a 2D array `queries`, where `queries[i] = [li, ri]` represents a substring `s[li...ri]`.

For each query, determine the maximum possible number of active sections in `s` after making the optimal trade on the substring `s[li...ri]`.

---

## Constraints

- `1 <= s.length <= 10^5`
- `s` consists only of `'0'` and `'1'`.
- `1 <= queries.length <= 10^5`
- `queries[i] = [li, ri]` with `0 <= li <= ri < s.length`.

---

## Problem Understanding

- Trading flips an isolated block of `'1'`s surrounded by `'0'`s into `'0'`s, and then flips an isolated block of `'0'`s into `'1'`s.
- The net gain in active sections comes from merging adjacent blocks of `'0'`s within the query window $[l_i, r_i]$.
- Using a Sparse Table over consecutive zero-block lengths allows $O(1)$ Range Maximum Queries (RMQ).

---

## Approach

### Optimized Approach (Sparse Table RMQ on Zero-Block Lengths)

1. Precompute all consecutive blocks of `'0'`s, storing their starting indices and lengths.
2. Build an index mapping `idx[i]` from each string position $i$ to its corresponding zero block.
3. Build a Sparse Table `st` over the sum of adjacent zero block lengths `zeros[i][1] + zeros[i + 1][1]`.
4. For each query $[L, R]$:
   - Identify boundary zero blocks covering $L$ and $R$.
   - Query the Sparse Table for the maximum internal adjacent zero-block pair in range $[start, end - 1]$.
   - Evaluate boundary cases where $L$ and $R$ partially truncate endpoint zero blocks.
   - Return the maximum active section count achievable.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n + q)$ — $O(n \log n)$ to construct the Sparse Table, and $O(1)$ per query for $q$ queries.
- **Space Complexity:** $O(n \log n)$ — Sparse Table memory structure.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3501maximize-active-section-with-trade-ii.java](./3501maximize-active-section-with-trade-ii.java) |

---

## Key Learnings

- Sparse Table RMQ enables static range maximum queries in $O(1)$ per query.
- Careful handling of partial boundary blocks ensures correctness when interval endpoints cut through zero sequences.
