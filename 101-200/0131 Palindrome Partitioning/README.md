---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
  - Backtracking
---

# 131. Palindrome Partitioning

**[View Problem on LeetCode](https://leetcode.com/problems/palindrome-partitioning/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0131` (`131`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**. Return *all possible palindrome partitioning of *`s`.

---

## Examples

### Example 1

```text
**Input:** s = "aab"
**Output:** [["a","a","b"],["aa","b"]]
```

### Example 2

```text
**Input:** s = "a"
**Output:** [["a"]]
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 16`
	
- `s` contains only lowercase English letters.

---

## Problem Understanding

- We need to partition string `s` such that every substring in the partition is a palindrome.
- All valid partition configurations must be returned, making backtracking with palindrome validation ideal.
- Substring palindrome queries can be precomputed using 2D Dynamic Programming to avoid redundant $O(N)$ checks during search.

---

## Approach

### Optimized Approach (DP Palindrome Precomputation + Backtracking DFS)

1. Precompute a 2D boolean table `f[i][j]` indicating whether substring `s[i..j]` is a palindrome:
   - Base: single characters and empty intervals are palindromic.
   - Transition: `f[i][j] = (s[i] == s[j]) && f[i + 1][j - 1]`, evaluated from $i = n - 1$ down to $0$.
2. Backtracking DFS starting at index $0$:
   - For current start index $i$, iterate end index $j$ from $i$ to $n - 1$.
   - If `f[i][j]` is `true`, append `s[i..j]` to the current path list `t` and recurse on $j + 1$.
   - Backtrack by popping the last substring from `t`.
3. When start index reaches $n$, add a snapshot of path list `t` to the results.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot 2^n)$ — $O(n^2)$ for precomputing the DP table and $O(n \cdot 2^n)$ in the worst case to explore all $2^{n-1}$ partitions and copy substrings.
- **Space Complexity:** $O(n^2)$ — For the 2D boolean palindrome table `f` and $O(n)$ recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [131palindrome-partitioning.java](./131palindrome-partitioning.java) |

---

## Key Learnings

- Decoupling palindrome checking from backtracking search using a DP lookup table reduces redundant computations.
- Evaluating the DP table backwards ($i$ descending, $j$ ascending) ensures dependent subproblems `f[i+1][j-1]` are already solved.
