---
comments: true
difficulty: Easy
tags:
  - Array
  - Sliding Window
---

# 1652. Defuse the Bomb

**[View Problem on LeetCode](https://leetcode.com/problems/defuse-the-bomb/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1652` (`1652`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given a circular array `code` of length `n` and an integer key `k` representing a bomb defusal code.

To decrypt the code, all numbers in the array are replaced simultaneously according to the value of `k`:
- If `k > 0`, replace each $i$-th element with the sum of the next $k$ elements.
- If `k < 0`, replace each $i$-th element with the sum of the previous $-k$ elements.
- If `k == 0`, replace every element with `0`.

Since the array is circular, indices wrap around seamlessly: the element following `code[n - 1]` is `code[0]`, and the element preceding `code[0]` is `code[n - 1]`. Return the decrypted array.

---

## Examples

### Example 1

```text
Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
Explanation: Each number is replaced by the sum of the next 3 numbers. The decrypted code is [7+1+4, 1+4+5, 4+5+7, 5+7+1]. Notice that the numbers wrap around.
```

### Example 2

```text
Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation: When k is zero, the numbers are replaced by 0.
```

### Example 3

```text
Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation: The decrypted code is [3+9, 2+3, 4+2, 9+4]. Notice that the numbers wrap around again. If k is negative, the sum is of the previous numbers.
```

---

## Constraints

- `n == code.length`

- `1 <= n <= 100`

- `1 <= code[i] <= 100`

- `-(n - 1) <= k <= n - 1`

---

## Problem Understanding

The array is circular, so all index calculations must be performed modulo $n$.
If $k == 0$, the output is simply an array of $n$ zeros.
If $k > 0$, the $i$-th element is replaced by $\sum_{j=1}^{k} \text{code}[(i + j) \pmod n]$.
If $k < 0$, the $i$-th element is replaced by the sum of $|k|$ previous elements: $\sum_{j=1}^{|k|} \text{code}[(i - j + n) \pmod n]$, which can also be written iterating $j$ from $i + k$ to $i - 1$ modulo $n$.

---

## Approach

### Brute Force Approach

For each index $i$ from 0 to $n - 1$, run an inner loop that sums the required $|k|$ elements using circular modulo indexing. Since $n \le 100$ and $|k| < n$, this direct simulation requires at most $100 \times 100 = 10,000$ operations, which executes in just a few milliseconds and easily passes within time limits.

### Optimized Approach

The provided solution implements the direct simulation: initialize an output array `ans` of size `n`. If `k == 0`, return `ans` immediately. For each index `i`, if `k > 0`, loop $j$ from $i + 1$ to $i + k$ and add `code[j % n]` to `ans[i]`. If `k < 0`, loop $j$ from $i + k$ to $i - 1$ and add `code[(j + n) % n]` to `ans[i]`.

### Step-by-Step Thinking Process

1. Handle the base case: if `k == 0`, every element becomes 0; initialize `ans = new int[n]` and return it directly.
2. For `k > 0`, for each index `i`, we need the sum of the next `k` circular elements: indices $i+1, i+2, \dots, i+k$. The loop `for (int j = i + 1; j < i + k + 1; ++j)` with `code[j % n]` accumulates these values.
3. For `k < 0`, for each index `i`, we need the sum of the previous $-k$ circular elements: indices $i+k, i+k+1, \dots, i-1$. The loop `for (int j = i + k; j < i; ++j)` with `code[(j + n) % n]` accumulates these values safely handling negative indices.
4. Assign each accumulated sum directly into `ans[i]` and return `ans`.

### Algorithm / Intuition

The solution uses direct circular array indexing. When $k > 0$, the inner loop index runs from $i + 1$ to $i + k$. Applying `% n` wraps indices that exceed $n - 1$ back to the beginning of the array. When $k < 0$, $j$ starts at negative or smaller offsets ($i + k$) and ends at $i - 1$. Adding $n$ before applying `% n` (`(j + n) % n`) ensures negative numbers wrap cleanly into positive indices in Java. This nested loop simulates the defusal rules faithfully without requiring extra sliding window state.

---

## Dry Run

Let's trace Example 1: `code = [5, 7, 1, 4]`, `k = 3`, `n = 4`
- `k > 0`, so we sum the next 3 elements for each $i$:
- `i = 0`:
  - $j = 1$: `code[1 % 4] = code[1] = 7`
  - $j = 2$: `code[2 % 4] = code[2] = 1`
  - $j = 3$: `code[3 % 4] = code[3] = 4`
  - `ans[0] = 7 + 1 + 4 = 12`.
- `i = 1`:
  - $j = 2, 3, 4$: `code[2] + code[3] + code[0] = 1 + 4 + 5 = 10` -> `ans[1] = 10`.
- `i = 2`:
  - $j = 3, 4, 5$: `code[3] + code[0] + code[1] = 4 + 5 + 7 = 16` -> `ans[2] = 16`.
- `i = 3`:
  - $j = 4, 5, 6$: `code[0] + code[1] + code[2] = 5 + 7 + 1 = 13` -> `ans[3] = 13`.
Result array: `[12, 10, 16, 13]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * |k|)` — For each of the `n` elements, the inner loop executes exactly `|k|` iterations. With $n \le 100$ and $|k| < n$, the maximum operation count is under $10^4$.
- **Space Complexity:** `O(1)` auxiliary space beyond the returned output array `ans` of size `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1652defuse-the-bomb.java](./1652defuse-the-bomb.java) |

---

## Key Learnings

- Circular indexing is easily achieved with modulo arithmetic: `j % n` for forward steps and `(j + n) % n` for backward steps.
- For very small constraints ($n \le 100$), straightforward nested iteration is clean, robust, and completely optimal in practice.
- A sliding window approach can optimize this to $O(n)$ time if $n$ and $k$ scale into large values.
