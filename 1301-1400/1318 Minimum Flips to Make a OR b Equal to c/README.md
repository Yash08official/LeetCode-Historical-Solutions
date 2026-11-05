---
comments: true
difficulty: Medium
tags:
  - Bit Manipulation
---

# 1318. Minimum Flips to Make a OR b Equal to c

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1318` (`1318`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Bit Manipulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given three positive integers `a`, `b`, and `c`, determine the **minimum number of single-bit flips** needed across the binary representations of `a` and `b` so that `(a OR b) == c`.

A single flip changes one bit in either `a` or `b` from `0` to `1` or from `1` to `0`.

---

## Examples

### Example 1

```text
Input: a = 2, b = 6, c = 5
Output: 3
Explanation: After flips a = 1 , b = 4 , c = 5 such that (a OR b == c)
```

### Example 2

```text
Input: a = 4, b = 2, c = 7
Output: 1
```

### Example 3

```text
Input: a = 1, b = 2, c = 3
Output: 0
```

---

## Constraints

- `1 <= a <= 10^9`

- `1 <= b <= 10^9`

- `1 <= c <= 10^9`

---

## Problem Understanding

- Bitwise `OR` operates **independently** on each bit position `i`—there are no carries between adjacent bits (unlike addition).
- Therefore, the global minimum number of flips is simply the sum of the minimum flips needed at each bit position `i`.
- Since `1 <= a, b, c <= 10^9` and `2^29 < 10^9 < 2^30`, every set bit lies within bit positions `0` through `29` (well inside 32 bits).
- At bit `i`, let `x`, `y`, `z` be the `i`-th bits of `a`, `b`, `c`:
  - If `z == 0`: we need `(x | y) == 0`, which forces **both** `x = 0` and `y = 0` (cost: `x + y` flips, which is `0`, `1`, or `2`).
  - If `z == 1`: we need `(x | y) == 1`, so at least one of `x, y` must be `1` (cost: `1` flip if `x == 0 && y == 0`, else `0` flips).

---

## Approach

### Brute Force Approach

Converting `a`, `b`, and `c` into binary strings via `.toString(2)`, padding all three strings to equal length with leading `'0'`s, and iterating over characters works, though it allocates temporary strings and arrays instead of inspecting bits directly in registers.

### Optimized Approach

Iterate bit index `i` from `0` to `31`, extract the `i`-th bits `x`, `y`, and `z` of `a`, `b`, and `c` using right-shift and bitwise AND `((num >> i) & 1)`, and accumulate the exact per-bit flip cost into `ans`.

### Step-by-Step Thinking Process

1. Recognize that bitwise `OR` has no cross-bit dependencies, so we can solve each bit position `i` greedily and independently.
2. Loop `i` from `0` to `31` to cover all 32-bit integer positions.
3. Extract bits `x = (a >> i) & 1`, `y = (b >> i) & 1`, and `z = (c >> i) & 1`.
4. If `z === 0`, any `1` in `x` or `y` makes `x | y = 1`, so every `1` must be flipped to `0` -> add `x + y`.
5. If `z === 1`, we only need a flip when both `x === 0` and `y === 0` (flipping either `a`'s bit or `b`'s bit to `1` suffices) -> add `1` if `x === 0 && y === 0`, else `0`.

### Algorithm / Intuition

In `minFlips`, the `for` loop examines all 32 bit positions `i = 0..31`. `(a >> i) & 1` shifts bit `i` down to the least-significant position and masks out higher bits, yielding `0` or `1`. The nested ternary `z === 0 ? x + y : (x === 0 && y === 0 ? 1 : 0)` concisely encodes all 8 truth-table combinations of `(x, y, z)`: when `z` is `0`, `(0,0)->0`, `(1,0)->1`, `(0,1)->1`, `(1,1)->2`; when `z` is `1`, `(0,0)->1` and `(1,0), (0,1), (1,1)->0`.

---

## Dry Run

Tracing `a = 2` (`010_2`), `b = 6` (`110_2`), `c = 5` (`101_2`) (**Example 1**):

| Bit `i` | `x = (a>>i)&1` | `y = (b>>i)&1` | `z = (c>>i)&1` | Cost added | Running `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `i = 0` | `0` | `0` | `1` | `z === 1` and `x=0, y=0` -> `+1` | `1` |
| `i = 1` | `1` | `1` | `0` | `z === 0` -> `x + y = 1 + 1 = +2` | `3` |
| `i = 2` | `0` | `1` | `1` | `z === 1` and `y=1` -> `+0` | `3` |
| `i = 3..31` | `0` | `0` | `0` | `z === 0` -> `0 + 0 = +0` | `3` |

Return `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — The loop always executes a fixed `32` iterations (equivalently `O(log(max(a, b, c)))` bit operations).
- **Space Complexity:** `O(1)` — Uses only a handful of scalar integer variables (`ans`, `i`, `x`, `y`, `z`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1318minimum-flips-to-make-a-or-b-equal-to-c.js](./1318minimum-flips-to-make-a-or-b-equal-to-c.js) |

---

## Key Learnings

- Bitwise equations involving only `&`, `|`, `^`, and `~` (without `+` or `-`) can always be decomposed into independent 1-bit subproblems.
- Notice the asymmetry of bitwise `OR`: turning `1 | 1` into `0` costs `2` flips, whereas turning `0 | 0` into `1` costs only `1` flip.
- An alternative bit-trick formulation uses popcount: `bitCount((a | b) ^ c) + bitCount(a & b & ~c)` (the second term adds the extra flip when `x = 1, y = 1, z = 0`).
