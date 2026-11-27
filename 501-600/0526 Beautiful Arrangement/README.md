---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Backtracking
  - Bit Manipulation
  - Bitmask
---

# 526. Beautiful Arrangement

**[View Problem on LeetCode](https://leetcode.com/problems/beautiful-arrangement/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0526` (`526`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Backtracking`, `Bit Manipulation`, `Bitmask` |
| **Solution Language** | Java |

---

## Problem Description

Suppose you have `n` integers labeled `1` through `n`. A permutation of those `n` integers `perm` (**1-indexed**) is considered a **beautiful arrangement** if for every `i` (`1 <= i <= n`), **either** of the following is true:

	- `perm[i]` is divisible by `i`.

	- `i` is divisible by `perm[i]`.

Given an integer `n`, return *the **number** of the **beautiful arrangements** that you can construct*.

---

## Examples

### Example 1

```
Input: n = 2
Output: 2
Explanation: 
The first beautiful arrangement is [1,2]:
    - perm[1] = 1 is divisible by i = 1
    - perm[2] = 2 is divisible by i = 2
The second beautiful arrangement is [2,1]:
    - perm[1] = 2 is divisible by i = 1
    - i = 2 is divisible by perm[2] = 1
```

### Example 2

```
Input: n = 1
Output: 1
```

 

**

---

## Constraints

**

	- `1 <= n <= 15`

---

## Problem Understanding

- Count how many permutations of `1..N` satisfy `perm[s] % s == 0` or `s % perm[s] == 0` at every 1-based position `s`.

---

## Approach

### Optimized Approach (Iterative Bitmask Dynamic Programming)
1. Let `f[i]` be the number of valid partial permutations using the subset of numbers indicated by bitmask `i` (`0..(1 << N) - 1`), with `f[0] = 1`.
2. For each mask `i`, count its popcount `+ 1` to obtain the next 1-based position `s` being filled.
3. For every unused number `j` in `1..N` (`(i >> (j - 1) & 1) == 0`), if `s % j == 0 || j % s == 0`, transition `f[i | (1 << (j - 1))] += f[i]`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \cdot 2^N)$ where $N \le 15$.
- **Space Complexity:** $O(2^N)$ for the DP array `f`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [526beautiful-arrangement.java](./526beautiful-arrangement.java) |

---

## Key Learnings

- In permutation bitmask DP, the bitmask itself encodes which position `s = popcount(mask) + 1` is being filled next, eliminating an extra dimension.
