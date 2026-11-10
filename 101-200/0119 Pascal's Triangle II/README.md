---
comments: true
difficulty: Easy
tags:
  - Array
  - Dynamic Programming
---

# 119. Pascal's Triangle II

**[View Problem on LeetCode](https://leetcode.com/problems/pascals-triangle-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0119` (`119`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer `rowIndex`, return the `rowIndex`$^{\text{th}}$ (**0-indexed**) row of the **Pascal's triangle**.

In **Pascal's triangle**, each number is the sum of the two numbers directly above it.

---

## Examples

### Example 1

```text
Input: rowIndex = 3
Output: [1,3,3,1]
```

### Example 2

```text
Input: rowIndex = 0
Output: [1]
```

### Example 3

```text
Input: rowIndex = 1
Output: [1,1]
```

---

## Constraints

- `0 <= rowIndex <= 33`

---

## Problem Understanding

- We only need to return a single specific row `rowIndex` of Pascal's triangle.
- We must optimize space to use only $O(\text{rowIndex})$ extra memory rather than generating all previous rows.

---

## Approach

### Optimized Approach (1D Array In-Place Reverse Update)

1. Initialize a 1D array `f` of size `rowIndex + 1`, filled with $1$.
2. For row index $i$ from $2$ to `rowIndex`:
   - Update from right to left ($j = i - 1$ down to $1$):
     - `f[j] += f[j - 1]`.
   - Iterating in reverse prevents overwriting the previous row's value `f[j - 1]` before it is used.
3. Return `f`.

---

## Complexity Analysis

- **Time Complexity:** $O(K^2)$ where $K = \text{rowIndex}$ — Two nested loops performing $O(K^2)$ total additions.
- **Space Complexity:** $O(K)$ — Only a single 1D array of size $K + 1$ is used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [119pascals-triangle-ii.js](./119pascals-triangle-ii.js) |

---

## Key Learnings

- Reverse iteration in 1D DP arrays allows in-place state compression without clobbering states required by subsequent calculations.
