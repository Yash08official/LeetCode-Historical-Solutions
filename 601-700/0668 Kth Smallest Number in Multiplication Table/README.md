---
comments: true
difficulty: Hard
tags:
  - Math
  - Binary Search
---

# 668. Kth Smallest Number in Multiplication Table

**[View Problem on LeetCode](https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0668` (`668`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Nearly everyone has used the Multiplication Table. The multiplication table of size `m x n` is an integer matrix `mat` where `mat[i][j] == i * j` (1-indexed).

Given three integers `m`, `n`, and `k`, return the $k^{	ext{th}}$ smallest element in the `m x n` multiplication table.

---

## Examples

### Example 1

```text
Input: m = 3, n = 3, k = 5
Output: 3
Explanation:
The Multiplication Table:
1	2	3
2	4	6
3	6	9

The 5-th smallest number is 3 (1, 2, 2, 3, 3).
```

### Example 2

```text
Input: m = 2, n = 3, k = 6
Output: 6
Explanation:
The Multiplication Table:
1	2	3
2	4	6

The 6-th smallest number is 6 (1, 2, 2, 3, 4, 6).
```

---

## Constraints

- `1 <= m, n <= 3 * 10^4`
- `1 <= k <= m * n`

---

## Problem Understanding

- The full multiplication table has $m 	imes n$ values, which can be up to $9 	imes 10^8$. Explicitly generating or sorting the matrix is impossible within memory and time limits.
- The values are bounded between $1$ and $m 	imes n$.
- For any candidate value $x$, we can count how many table elements are $\le x$ in $O(m)$ time: in row $i$, the elements are $i, 2i, \dots, ni$, so exactly $\min(\lfloor x / i floor, n)$ elements are $\le x$.
- Since the count of elements $\le x$ is monotonically non-decreasing with respect to $x$, this problem can be solved by **Binary Search on the Answer**.

---

## Approach

### Optimized Approach (Binary Search on Value Range)

1. Set search range: `left = 1`, `right = m * n`.
2. While `left < right`:
   - Compute `mid = (left + right) >>> 1`.
   - Count elements $\le mid$:
     $$	ext{cnt} = \sum_{i=1}^m \min(\lfloor mid / i floor, n)$$
   - If `cnt >= k`, the $k^{	ext{th}}$ smallest element could be `mid` or smaller, so set `right = mid`.
   - Else (`cnt < k`), the target must be strictly greater than `mid`, so set `left = mid + 1`.
3. Return `left`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \log(m \cdot n))$ — Binary search over $[1, m \cdot n]$ performs $\log_2(m \cdot n) pprox 30$ iterations. Each iteration counts elements across $m$ rows in $O(m)$.
- **Space Complexity:** $O(1)$ — Only scalar pointers and loop variables are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [668kth-smallest-number-in-multiplication-table.java](./668kth-smallest-number-in-multiplication-table.java) |

---

## Key Learnings

- Binary search on the answer range is the gold standard when direct generation is intractable but validation/counting is monotonic and fast.
- Division $\lfloor mid / i floor$ gives instant counts of multiples without array iteration.
