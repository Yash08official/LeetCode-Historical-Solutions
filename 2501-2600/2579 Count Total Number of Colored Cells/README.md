---
comments: true
difficulty: Medium
tags:
  - Math
---

# 2579. Count Total Number of Colored Cells

**[View Problem on LeetCode](https://leetcode.com/problems/count-total-number-of-colored-cells/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2579` (`2579`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math` |
| **Solution Language** | Java |

---

## Problem Description

You are given a positive integer `n`.

There is an infinitely large 2D grid of uncolored unit cells. You perform the following process for `n` minutes:
- At minute 1, color any arbitrary unit cell blue.
- Every minute thereafter, color blue every uncolored unit cell that shares at least one edge with an already colored blue cell.

Return the total number of colored blue cells at the end of `n` minutes.

---

## Examples

### Example 1

```text
Input: n = 1
Output: 1
Explanation: After 1 minute, there is only 1 blue cell, so we return 1.
```

### Example 2

```text
Input: n = 2
Output: 5
Explanation: After 2 minutes, there are 4 colored cells on the boundary and 1 in the center, so we return 5.
```

---

## Constraints

- `1 <= n <= 10^5`

---

## Problem Understanding

At minute 1, 1 cell is colored. At minute 2, the 4 cells directly adjacent to the center cell (forming a diamond shape) are colored, bringing the total to $1 + 4 = 5$. At minute 3, 8 new cells around the perimeter are colored, bringing the total to $5 + 8 = 13$. At minute $k$, exactly $4(k - 1)$ cells are added to the outer boundary. We need to find the total sum after $n$ minutes.

---

## Approach

### Brute Force Approach

Simulate the grid expansion using Breadth-First Search (BFS) or a coordinate set. Starting with `{(0, 0)}`, expand to all 4-directional unvisited neighbors at each minute. Since $n$ can be up to $10^5$, the total colored area is on the order of $2 \times 10^{10}$ cells. A simulation would take $O(n^2)$ time and memory, resulting in immediate Out Of Memory and Time Limit Exceeded errors.

### Optimized Approach

Derive the closed-form mathematical expression for the total colored cells: $$\text{Total}(n) = 1 + \sum_{k=2}^n 4(k - 1) = 1 + 4 \sum_{j=1}^{n-1} j = 1 + 4 \cdot \frac{(n - 1)n}{2} = 2n(n - 1) + 1 = 2n^2 - 2n + 1$$
This closed-form formula can be computed in $O(1)$ time and $O(1)$ space using 64-bit integer arithmetic (`2L * n * (n - 1) + 1`).

### Step-by-Step Thinking Process

1. Observe the sequence of total colored cells for small values of $n$:
  - $n = 1$: 1
  - $n = 2$: $1 + 4 = 5$
  - $n = 3$: $5 + 8 = 13$
  - $n = 4$: $13 + 12 = 25$
  - $n = 5$: $25 + 16 = 41$
2. The difference between consecutive terms is $4, 8, 12, 16, \dots$, which is an arithmetic progression with common difference 4.
3. The sum of this sequence is $1 + 4 \cdot \frac{(n-1)n}{2} = 1 + 2n(n-1)$.
4. Alternatively, geometrically view the shape: it is a diamond consisting of $n^2 + (n - 1)^2$ unit squares. Expanding this gives $n^2 + n^2 - 2n + 1 = 2n^2 - 2n + 1 = 2n(n - 1) + 1$.
5. Because $n \le 10^5$, $n^2$ can reach $10^{10}$, requiring `long` to prevent 32-bit integer overflow.

### Algorithm / Intuition

The solution computes the closed formula directly: `2L * n * (n - 1) + 1`. Using `2L` ensures all intermediate multiplications are evaluated as 64-bit integers (`long`), completely preventing overflow.

---

## Dry Run

Trace with Example 1: `n = 1`:
- Formula: `2L * 1 * (1 - 1) + 1 = 2 * 0 + 1 = 1`.
Trace with Example 2: `n = 2`:
- Formula: `2L * 2 * (2 - 1) + 1 = 4 * 1 + 1 = 5`.
Trace with `n = 3`:
- Formula: `2L * 3 * (3 - 1) + 1 = 6 * 2 + 1 = 13`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — The solution performs three elementary arithmetic operations (multiplication, subtraction, addition) in constant time.
- **Space Complexity:** `O(1)` — No auxiliary memory is allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2579count-total-number-of-colored-cells.java](./2579count-total-number-of-colored-cells.java) |

---

## Key Learnings

- Grid expansion processes with uniform outward growth often correspond to standard geometric patterns (here, Manhattan-distance diamond / Delannoy numbers) that reduce to quadratic polynomials.
- Viewing the diamond as the union of overlapping grids or sum of concentric layers yields the formula $n^2 + (n - 1)^2 = 2n(n - 1) + 1$.
- Always use `2L` or 64-bit integer types when squaring constraints up to $10^5$ to avoid integer overflow.
