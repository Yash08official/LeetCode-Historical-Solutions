---
comments: true
difficulty: Medium
tags:
  - String
  - Recursion
  - Simulation
---

# 1545. Find Kth Bit in Nth Binary String

**[View Problem on LeetCode](https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1545` (`1545`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Recursion`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two positive integers `n` and `k`, binary strings are generated via a recursive expansion rule:

- Base string: $S_1 = "0"$
- For each $i > 1$: $S_i = S_{i-1} + "1" + \text{reverse}(\text{invert}(S_{i-1}))$

Here, `+` denotes string concatenation, `reverse(x)` reverses the order of characters in string `x`, and `invert(x)` flips all `'0'`s to `'1'`s and `'1'`s to `'0'`s.

Given `n` and `k`, return the $k$-th bit of $S_n$ (using 1-based indexing). It is guaranteed that $k$ is within $[1, 2^n - 1]$.

---

## Examples

### Example 1

```text
Input: n = 3, k = 1
Output: "0"
Explanation: S_3 is "0111001".
The 1^st bit is "0".
```

### Example 2

```text
Input: n = 4, k = 11
Output: "1"
Explanation: S_4 is "011100110110001".
The 11^th bit is "1".
```

---

## Constraints

- `1 <= n <= 20`

- `1 <= k <= 2^n - 1`

---

## Problem Understanding

We generate a sequence of binary strings $S_n$ using recursive construction: $S_1 = "0"$, and for $i > 1$, $S_i = S_{i-1} + "1" + \text{reverse}(\text{invert}(S_{i-1}))$. We must find the $k$-th bit (1-indexed) of $S_n$ without materializing the entire string, which has length $2^n - 1$ (up to $2^{20} - 1 \approx 10^6$ characters).

---

## Approach

### Brute Force Approach

A brute force approach iteratively constructs strings $S_1, S_2, \dots, S_n$ by explicitly simulating string concatenation, inversion, and reversal at each step. While feasible for $n \le 12$, string length doubles at each step ($2^n - 1$). For $n = 20$, the string has $1,048,575$ characters, consuming substantial memory and runtime allocating temporary strings.

### Optimized Approach

Use divide-and-conquer recursion: the string $S_n$ has length $L = 2^n - 1$. The exact middle character at position $\text{middle} = \lfloor L / 2 \rfloor + 1$ is always `'1'`. If $k < \text{middle}$, the bit is identical to the $k$-th bit of $S_{n-1}$. If $k > \text{middle}$, the bit corresponds to the $(L - k + 1)$-th bit of $S_{n-1}$, but inverted.

### Step-by-Step Thinking Process

1. Observe the symmetric structure: $S_n$ consists of three parts: left half $S_{n-1}$ of length $2^{n-1}-1$, center `'1'` at index $2^{n-1}$, and right half $\text{reverse}(\text{invert}(S_{n-1}))$.
2. Notice that if $k$ equals the middle index $2^{n-1}$, the character is definitively `'1'`.
3. Notice that if $k < 2^{n-1}$, $k$ falls in the left half, which is identical to finding the $k$-th bit in $S_{n-1}$.
4. Notice that if $k > 2^{n-1}$, $k$ falls in the right half. The reversed index in $S_{n-1}$ is $1 + \text{len} - k$, and the bit is inverted.
5. Formulate a recursive helper `recur(len, k)` that reduces `len` by half on each call until `len === 1`, where the only bit is `'0'`.

### Algorithm / Intuition

The helper function `recur(len, k)` avoids all string building. It calculates `half = Math.floor(len / 2)` and `middle = half + 1`. If `k === middle`, it immediately returns `'1'`. If `k < middle`, it recurses with `recur(half, k)`. If `k > middle`, the symmetric counterpart index from the end is `1 + len - k`. It fetches `recur(half, 1 + len - k)` and flips the bit (`ans === '0' ? '1' : '0'`). This logarithmic descent visits at most $n$ recursive frames.

---

## Dry Run

Let's trace Example 1: `n = 3, k = 1`
- Initial `len = Math.pow(2, 3) - 1 = 7`. Call `recur(7, 1)`.
  - `half = 3`, `middle = 4`.
  - `k = 1 < 4` (left half). Recurse with `recur(3, 1)`.
- In `recur(3, 1)`:
  - `half = 1`, `middle = 2`.
  - `k = 1 < 2` (left half). Recurse with `recur(1, 1)`.
- In `recur(1, 1)`:
  - Base case reached: `len === 1`. Return `'0'`.
- Propagates back: `recur(3, 1)` returns `'0'`, `recur(7, 1)` returns `'0'`.
Final result: `'0'`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each recursive step halves the search space, reducing `len` from $2^n - 1$ down to 1 in at most `n` function calls.
- **Space Complexity:** `O(n)` — Required for the recursive call stack depth of at most `n` frames.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1545find-kth-bit-in-nth-binary-string.js](./1545find-kth-bit-in-nth-binary-string.js) |

---

## Key Learnings

- Recursive string constructions often exhibit reflection and inversion symmetries that allow $O(\log(\text{length}))$ query resolution.
- By mapping the index $k > \text{middle}$ to $1 + \text{len} - k$, we invert both the order and the bit value directly.
- Avoid string instantiation entirely when only a single character at a known index is requested.
