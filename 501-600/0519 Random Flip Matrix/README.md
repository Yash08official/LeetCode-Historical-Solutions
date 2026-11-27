---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Math
  - Reservoir Sampling
  - Randomized
---

# 519. Random Flip Matrix

**[View Problem on LeetCode](https://leetcode.com/problems/random-flip-matrix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0519` (`519`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Math`, `Reservoir Sampling`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

There is an `m x n` binary grid `matrix` with all the values set `0` initially. Design an algorithm to randomly pick an index `(i, j)` where `matrix[i][j] == 0` and flips it to `1`. All the indices `(i, j)` where `matrix[i][j] == 0` should be equally likely to be returned.

Optimize your algorithm to minimize the number of calls made to the **built-in** random function of your language and optimize the time and space complexity.

Implement the `Solution` class:

	- `Solution(int m, int n)` Initializes the object with the size of the binary matrix `m` and `n`.

	- `int[] flip()` Returns a random index `[i, j]` of the matrix where `matrix[i][j] == 0` and flips it to `1`.

	- `void reset()` Resets all the values of the matrix to be `0`.

---

## Examples

### Example 1

```
Input
["Solution", "flip", "flip", "flip", "reset", "flip"]
[[3, 1], [], [], [], [], []]
Output
[null, [1, 0], [2, 0], [0, 0], null, [2, 0]]

Explanation
Solution solution = new Solution(3, 1);
solution.flip();  // return [1, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.
solution.flip();  // return [2, 0], Since [1,0] was returned, [2,0] and [0,0]
solution.flip();  // return [0, 0], Based on the previously returned indices, only [0,0] can be returned.
solution.reset(); // All the values are reset to 0 and can be returned.
solution.flip();  // return [2, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.
```

 

**

---

## Constraints

**

	- `1 <= m, n <= 10^4`

	- There will be at least one free cell for each call to `flip`.

	- At most `1000` calls will be made to `flip` and `reset`.

---

## Problem Understanding

- Uniformly pick random `0` cells in an `m x n` binary matrix to flip to `1` (`flip()`), supporting constant-time `reset()` without allocating an `m x n` grid.

---

## Approach

### Optimized Approach (Fisher-Yates Sparse Index Remapping)
1. Flatten coordinates `0..m*n - 1`, tracking the active remaining range size `total`.
2. Maintain sparse `HashMap<Integer, Integer> mp` mapping swapped positions after virtual Fisher-Yates swaps.
3. On `flip()`: pick random `x` in `[0, total)`, decrement `total`, read actual index `idx = mp.getOrDefault(x, x)`, redirect slot `x` to the swapped tail value `mp.getOrDefault(total, total)`, and return `[idx / n, idx % n]`.
4. On `reset()`: restore `total = m * n` and `mp.clear()`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ per `flip()` and $O(1)$ amortized per `reset()`.
- **Space Complexity:** $O(F)$ where $F$ is the number of `flip()` calls since the last reset (independent of `m * n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [519random-flip-matrix.java](./519random-flip-matrix.java) |

---

## Key Learnings

- Lazy Fisher-Yates mapping with a hash map shrinks virtual array selection to $O(1)$ time and $O(\text{flips})$ space even on $10^4 \times 10^4$ matrices.
