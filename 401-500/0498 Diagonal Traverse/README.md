---
comments: true
difficulty: Medium
tags:
  - Array
  - Matrix
  - Simulation
---

# 498. Diagonal Traverse

**[View Problem on LeetCode](https://leetcode.com/problems/diagonal-traverse/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0498` (`498`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Matrix`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` matrix `mat`, return *an array of all the elements of the array in a diagonal order*.

---

## Examples

### Example 1

```text
**Input:** mat = [[1,2,3],[4,5,6],[7,8,9]]
**Output:** [1,2,4,7,5,3,6,8,9]
```

### Example 2

```text
**Input:** mat = [[1,2],[3,4]]
**Output:** [1,2,3,4]
```

 

**

---

## Constraints

**

	
- `m == mat.length`
	
- `n == mat[i].length`
	
- `1 <= m, n <= 10^4`
	
- `1 <= m * n <= 10^4`
	
- `-10^5 <= mat[i][j] <= 10^5`

---

## Problem Understanding

- Traverse an `m x n` matrix diagonally, alternating upward-right and downward-left directions.

---

## Approach

### Optimized Approach (Anti-Diagonal Grouping + Alternating Reversal)
1. There are `m + n - 1` anti-diagonals indexed by `k = i + j`.
2. For each `k`, start at `(i = k < n ? 0 : k - n + 1, j = k < n ? k : n - 1)` and collect elements moving down-left (`++i, --j`).
3. Reverse even-indexed diagonals (`k % 2 == 0`) to alternate direction, then append to `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \cdot n)$.\n- **Space Complexity:** $O(\min(m, n))$ for temporary diagonal list `t`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [498diagonal-traverse.java](./498diagonal-traverse.java) |

---

## Key Learnings

- Collecting every anti-diagonal uniformly down-left and reversing even `k` eliminates complex boundary-bounce state machines.
