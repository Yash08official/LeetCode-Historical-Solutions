---
comments: true
difficulty: Easy
tags:
  - Dynamic Programming
  - Bit Manipulation
---

# 338. Counting Bits

**[View Problem on LeetCode](https://leetcode.com/problems/counting-bits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0338` (`338`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Dynamic Programming`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given a non-negative integer `n`, generate an integer array `ans` of size `n + 1` where each element `ans[i]` (for `0 <= i <= n`) equals the count of set bits (`1`s) in the binary representation of `i`.

Note that while the problem specification challenges you to avoid built-in population-count functions, the provided Java solution directly utilizes Java's standard library bit-counting utility.

---

## Examples

### Example 1

```text
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
```

### Example 2

```text
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```

---

## Constraints

- `0 <= n <= 10^5`

---

## Follow-up Questions

- It is very easy to come up with a solution with a runtime of `O(n log n)`. Can you do it in linear time `O(n)` and possibly in a single pass?

To achieve a single-pass `O(n)` solution **without** any built-in function like `Integer.bitCount`, observe that right-shifting `i` by 1 (`i >> 1`) drops its least significant bit and produces a smaller number whose bit count is already stored in `ans[i >> 1]`. Adding back the dropped bit `(i & 1)` gives the recurrence `ans[i] = ans[i >> 1] + (i & 1)` for `1 <= i <= n` (with `ans[0] = 0`). Alternatively, clearing the lowest set bit with `i & (i - 1)` gives `ans[i] = ans[i & (i - 1)] + 1`.

---

## Problem Understanding

Every non-negative integer `i` has a unique binary representation, and its Hamming weight (or population count) is the number of `1` bits in that representation. Since `0 <= n <= 10^5`, we need to compute this count for `n + 1` consecutive integers starting from `0`.

Key observations:
- `0` has zero `1` bits, so `ans[0]` is always `0` (even when `n = 0`, returning `[0]`).
- Since `n <= 10^5 < 2^{17}`, every integer fits comfortably within a standard 32-bit signed `int`.
- Computing the bit count for each number independently in constant or logarithmic time easily satisfies the `10^5` upper bound.

---

## Approach

### Brute Force Approach

A naive manual approach converts each integer `i` from `0` to `n` into a binary string (or repeatedly tests `i & 1` and shifts `i >>= 1` until `i == 0`) to count the `1` bits.

Because an integer `i` has `O(log i)` binary digits, looping through every bit of every number from `0` to `n` takes `O(n log n)` total time.

### Optimized Approach

The provided solution iterates from `0` to `n` and delegates each count to Java's `Integer.bitCount(i)`. Under the hood, `Integer.bitCount` uses a fixed sequence of parallel bitwise masks and shifts (SWAR — SIMD Within A Register) on a 32-bit word, computing each Hamming weight in `O(1)` operations and `O(n)` overall time.

### Step-by-Step Thinking Process

1. Allocate the output array `ans` of length `n + 1` to hold results for all integers in `[0, n]`.
2. Iterate `i` sequentially from `0` through `n`.
3. For each `i`, invoke `Integer.bitCount(i)` to obtain the exact number of set bits in `i`'s 32-bit two's-complement representation in constant time.
4. Store the count in `ans[i]` and return `ans` once the loop finishes.

### Algorithm / Intuition

In `countBits(int n)`, the array `ans` is initialized with `new int[n + 1]`. A single `for` loop runs `i` from `0` to `n` inclusive and assigns `ans[i] = Integer.bitCount(i)`.

In the OpenJDK standard library, `Integer.bitCount(int i)` does not loop over 32 bits; instead, it pairs adjacent bits, nibbles, bytes, and half-words using fixed bitmasks (`0x55555555`, `0x33333333`, `0x0f0f0f0f`) in roughly a dozen CPU instructions (and modern JVMs intrinsify it directly to a single hardware `POPCNT` instruction).

---

## Dry Run

Tracing `countBits(n)` with **Example 1** (`n = 2`):

| Step | `i` | Binary of `i` | `Integer.bitCount(i)` | `ans` State |
| :--- | :--- | :--- | :--- | :--- |
| Init | — | — | — | `[0, 0, 0]` |
| 1 | `0` | `0` | `0` | `[0, 0, 0]` |
| 2 | `1` | `1` | `1` | `[0, 1, 0]` |
| 3 | `2` | `10` | `1` | `[0, 1, 1]` |

The loop finishes and returns `[0, 1, 1]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The loop executes `n + 1` times, and `Integer.bitCount(i)` performs a fixed, constant number of bitwise operations on a 32-bit integer.
- **Space Complexity:** `O(1)` auxiliary space (`O(n)` including the returned array `ans` of size `n + 1`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [338counting-bits.java](./338counting-bits.java) |

---

## Key Learnings

- Java's `Integer.bitCount` computes the 32-bit Hamming weight in `O(1)` time via SWAR bitmasks and is JVM-intrinsified to hardware `POPCNT` on supported CPUs.
- When interviews forbid built-in popcount helpers, bit-level dynamic programming (`ans[i] = ans[i >> 1] + (i & 1)` or `ans[i] = ans[i & (i - 1)] + 1`) achieves true single-pass `O(n)` time.
- Always pay attention to inclusive bounds: inputs in `[0, n]` require an output array of length `n + 1`.
