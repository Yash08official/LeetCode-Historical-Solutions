---
comments: true
difficulty: Medium
tags:
  - Math
  - Dynamic Programming
  - Tree
  - Binary Search Tree
  - Binary Tree
---

# 96. Unique Binary Search Trees

**[View Problem on LeetCode](https://leetcode.com/problems/unique-binary-search-trees/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0096` (`96`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Tree`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return *the number of structurally unique **BST**'s (binary search trees) which has exactly* `n` *nodes of unique values from* `1` *to* `n`.

---

## Examples

### Example 1

```text
Input: n = 3
Output: 5
```

### Example 2

```text
Input: n = 1
Output: 1
```

---

## Constraints

- `1 <= n <= 19`

---

## Problem Understanding

- Let $f[i]$ be the number of unique BSTs with $i$ distinct nodes.
- For an empty tree ($i = 0$), $f[0] = 1$.
- For any root chosen out of $i$ nodes, if the left subtree has $j$ nodes ($0 \le j < i$), the right subtree has $i - j - 1$ nodes.
- Thus, $f[i] = \sum_{j=0}^{i-1} f[j] \times f[i - j - 1]$, which is the Catalan recurrence relation.

---

## Approach

### Optimized Approach (Dynamic Programming — Catalan Numbers)

1. Initialize DP table `f = new int[n + 1]`.
2. Base case: `f[0] = 1`.
3. For $i$ from $1$ to $n$:
   - For $j$ from $0$ to $i - 1$:
     - `f[i] += f[j] * f[i - j - 1]`.
4. Return `f[n]`.

---

## Dry Run

For `n = 3`:
- `f[0] = 1`
- `f[1] = f[0]*f[0] = 1`
- `f[2] = f[0]*f[1] + f[1]*f[0] = 1 + 1 = 2`
- `f[3] = f[0]*f[2] + f[1]*f[1] + f[2]*f[0] = 2 + 1 + 2 = 5`
Output: `5`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ — Double nested loop computing Catalan numbers up to $n$.
- **Space Complexity:** $O(n)$ — 1D DP table of size $n + 1$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [96unique-binary-search-trees.java](./96unique-binary-search-trees.java) |

---

## Key Learnings

- Structural tree counting often maps directly to Catalan numbers $C_n = \frac{1}{n+1}\binom{2n}{n}$.
- DP tabulation cleanly computes polynomial convolutions in $O(n^2)$ time with zero recursion overhead.
