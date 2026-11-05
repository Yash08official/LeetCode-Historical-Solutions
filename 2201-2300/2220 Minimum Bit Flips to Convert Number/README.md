---
comments: true
difficulty: Easy
tags:
  - Bit Manipulation
---

# 2220. Minimum Bit Flips to Convert Number

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-bit-flips-to-convert-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2220` (`2220`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Bit Manipulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

A **bit flip** changes a single bit in an integer's binary representation from `0` to `1` or from `1` to `0` (including implicit leading zeros).

Given two non-negative integers `start` and `goal`, return the **minimum** number of bit flips needed to transform `start` into `goal`.

---

## Examples

### Example 1

```text
Input: start = 10, goal = 7
Output: 3
Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
- Flip the first bit from the right: 1010 -> 1011.
- Flip the third bit from the right: 1011 -> 1111.
- Flip the fourth bit from the right: 1111 -> 0111.
It can be shown we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.
```

### Example 2

```text
Input: start = 3, goal = 4
Output: 3
Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
- Flip the first bit from the right: 011 -> 010.
- Flip the second bit from the right: 010 -> 000.
- Flip the third bit from the right: 000 -> 100.
It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.
```

---

## Constraints

- `0 <= start, goal <= 10^9`

**Note:** This question is the same as 461: Hamming Distance.

---

## Problem Understanding

- **Bitwise Independence (Hamming Distance):** Flipping bit `k` affects only bit `k` and no other bit position. Therefore:
  - If `start` and `goal` already agree at bit `k`, flipping it is wasted effort.
  - If `start` and `goal` differ at bit `k`, we **must** flip bit `k` at least once (and once suffices).
- **XOR Isolates Differing Bits:** The bitwise XOR `t = start ^ goal` sets bit `k` to `1` if and only if `start` and `goal` differ at bit `k`. Thus, the answer is simply the **number of set bits (`1`s)** in `start ^ goal`!

---

## Approach

### Brute Force Approach

Converting both `start` and `goal` to binary strings via `.toString(2)`, padding the shorter string with leading `'0'`s with `.padStart(...)`, and comparing characters index by index allocates intermediate strings rather than operating directly on CPU registers.

### Optimized Approach

Compute `t = start ^ goal` to isolate all differing bit positions, then count the set bits (`1`s) in `t` by repeatedly adding `t & 1` and right-shifting `t >>= 1` until `t` reaches `0`.

### Step-by-Step Thinking Process

1. Compute `let t = start ^ goal` so every `1`-bit in `t` marks a position that requires a bit flip.
2. Initialize flip counter `let ans = 0`.
3. While `t !== 0`, inspect the least significant bit using `t & 1`, add it to `ans`, and shift `t` right by 1 bit (`t >>= 1`).
4. Return `ans` once all set bits have been shifted out.

### Algorithm / Intuition

Let's verify why `t >>= 1` works safely in JavaScript here:
- JavaScript bitwise operators convert numbers to signed 32-bit two's-complement integers.
- Because `0 <= start, goal <= 10^9 < 2^{30}`, bit `31` (the sign bit) of `t = start ^ goal` is always `0`, so `t` is strictly non-negative.
- Consequently, arithmetic right shift `t >>= 1` always shifts in `0` from the left, halving `t` each iteration until `t === 0` after at most `30` steps, while `t & 1` extracts `1` if the lowest bit is set and `0` otherwise.

---

## Dry Run

Trace on **Example 1**: `start = 10` (`1010_2`), `goal = 7` (`0111_2`).

1. **XOR:** `t = 10 ^ 7 = 13` (`1101_2`), `ans = 0`.
2. **Bit-counting loop:**

| Step | `t` (decimal / binary) | `t & 1` | `ans` after `+=` | `t` after `t >>= 1` |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `13` (`1101_2`) | `1` | `1` | `6` (`0110_2`) |
| 2 | `6` (`0110_2`) | `0` | `1` | `3` (`0011_2`) |
| 3 | `3` (`0011_2`) | `1` | `2` | `1` (`0001_2`) |
| 4 | `1` (`0001_2`) | `1` | `3` | `0` (`0000_2`) |

Loop ends (`t === 0`) and returns `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(log(max(start, goal)))` — The `while` loop shifts `t` right once per bit up to the highest differing bit (at most `30` iterations for values `<= 10^9`, i.e., `O(1)` bounded 32-bit operations).
- **Space Complexity:** `O(1)` — Only two scalar variables (`t` and `ans`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2220minimum-bit-flips-to-convert-number.js](./2220minimum-bit-flips-to-convert-number.js) |

---

## Key Learnings

- The minimum bit flips between two integers equals their **Hamming distance**, which is always `popcount(start ^ goal)`.
- In JavaScript, if inputs could ever have bit `31` set (`>= 2^{31}`), use unsigned right shift `t >>>= 1` instead of signed `t >>= 1` (or Brian Kernighan's `t &= (t - 1)` trick, which loops only once per `1`-bit!).
