---
comments: true
difficulty: Easy
tags:
  - Array
  - Dynamic Programming
---

# 118. Pascal's Triangle

**[View Problem on LeetCode](https://leetcode.com/problems/pascals-triangle/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0118` (`118`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer `numRows`, return the first `numRows` of **Pascal's triangle**.

In **Pascal's triangle**, each number is the sum of the two numbers directly above it.

---

## Examples

### Example 1

```text
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

### Example 2

```text
Input: numRows = 1
Output: [[1]]
```

---

## Constraints

- `1 <= numRows <= 30`

---

## Problem Understanding

- Row 0 is `[1]`.
- Row $i$ has $i + 1$ elements, with the first and last element always equal to $1$.
- Any internal element at position $j$ ($1 \le j < i$) satisfies:
  $$\text{row}[i][j] = \text{row}[i - 1][j - 1] + \text{row}[i - 1][j]$$

---

## Approach

### Optimized Approach (Iterative Row-by-Row Construction)

1. Initialize result array `f = [[1]]`.
2. For $i$ from $0$ to `numRows - 2`:
   - Initialize current row `g = [1]`.
   - For $j$ from $1$ to `f[i].length - 1`:
     - Append `f[i][j - 1] + f[i][j]` to `g`.
   - Append trailing $1$: `g.push(1)`.
   - Push `g` into `f`.
3. Return `f`.

---

## Complexity Analysis

- **Time Complexity:** $O(\text{numRows}^2)$ — Generating $N$ rows computes $\sum_{i=1}^{N} i = \frac{N(N+1)}{2}$ entries.
- **Space Complexity:** $O(1)$ auxiliary space beyond the required output matrix.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [118pascals-triangle.js](./118pascals-triangle.js) |

---

## Key Learnings

- Direct dynamic programming simulation follows Pascal's recurrence relation with minimal overhead.
