---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Dynamic Programming
  - Knapsack Problem
  - 0-1 Knapsack
---

# 474. Ones and Zeroes

**[View Problem on LeetCode](https://leetcode.com/problems/ones-and-zeroes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0474` (`474`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Dynamic Programming`, `Knapsack Problem`, `0-1 Knapsack` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of binary strings `strs` and two integers `m` and `n`.

Return *the size of the largest subset of `strs` such that there are **at most** *`m`* *`0`*'s and *`n`* *`1`*'s in the subset*.

A set `x` is a **subset** of a set `y` if all elements of `x` are also elements of `y`.

---

## Examples

### Example 1

```
Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
```

### Example 2

```
Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.
```

 

**

---

## Constraints

**

	- `1 <= strs.length <= 600`

	- `1 <= strs[i].length <= 100`

	- `strs[i]` consists only of digits `'0'` and `'1'`.

	- `1 <= m, n <= 100`

---

## Problem Understanding

- Given an array of binary strings `strs` and budgets `m` zeroes and `n` ones, find the size of the largest subset of `strs` containing at most `m` `'0'`s and `n` `'1'`s in total.

---

## Approach

### Optimized Approach (2D 0-1 Knapsack Dynamic Programming)
1. Treat each string as an item of value `1` with two resource costs: `cnt[0]` (number of `'0'`s) and `cnt[1]` (number of `'1'`s).
2. Maintain 2D DP table `f[m + 1][n + 1]`, where `f[i][j]` is the maximum subset size achievable using at most `i` zeroes and `j` ones.
3. For each string, iterate `i` downwards from `m` to `cnt[0]` and `j` downwards from `n` to `cnt[1]`, updating `f[i][j] = Math.max(f[i][j], f[i - cnt[0]][j - cnt[1]] + 1)` so each string is used at most once.

---

## Complexity Analysis

- **Time Complexity:** $O(L + k \cdot m \cdot n)$ where $k = \text{strs.length}$ and $L$ is the total length of all strings.
- **Space Complexity:** $O(m \cdot n)$ for the compressed 2D DP table.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [474ones-and-zeroes.java](./474ones-and-zeroes.java) |

---

## Key Learnings

- Reverse iteration over both capacity dimensions compresses a 3D 0-1 knapsack table into $O(m \cdot n)$ space while preserving single-use item semantics.
