---
comments: true
difficulty: Hard
tags:
  - Math
  - Binary Search
---

# 483. Smallest Good Base

**[View Problem on LeetCode](https://leetcode.com/problems/smallest-good-base/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0483` (`483`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n` (`3 <= n <= 10^18`) formatted as a decimal string, find and return (as a string) the **smallest good base** `k >= 2` of `n`.

An integer base `k >= 2` is called a **good base** of `n` if `n`'s representation in base `k` consists solely of the digit `1` (`11...1_k`).

---

## Examples

### Example 1

```text
Input: n = "13"
Output: "3"
Explanation: 13 base 3 is 111.
```

### Example 2

```text
Input: n = "4681"
Output: "8"
Explanation: 4681 base 8 is 11111.
```

### Example 3

```text
Input: n = "1000000000000000000"
Output: "999999999999999999"
Explanation: 1000000000000000000 base 999999999999999999 is 11.
```

---

## Constraints

- `n` is an integer in the range `[3, 10^18]`.

- `n` does not contain any leading zeros.

---

## Problem Understanding

- **Geometric series equation:** Writing `n` as `len` consecutive `1`s in base `k` (`radix`) means `n = 1 + k + k^2 + ... + k^(len - 1)`.
- **Inverse monotonicity between `k` and `len`:** For a fixed `n`, a **smaller** base `k` produces a **longer** representation `len`! Therefore, testing `len` from its maximum possible value downward guarantees the first valid `k` found is the smallest good base.
- **Tight upper bound on `len`:** Since `k >= 2` and `n <= 10^18 < 2^60`, `len` cannot exceed `63` (the bit-width of a signed `long`). And `len = 2` (`1 + k = n` -> `k = n - 1`) is *always* a valid fallback good base (`11` in base `n - 1`).

---

## Approach

### Brute Force Approach

Testing every candidate base `k = 2, 3, ..., n - 1` and dividing `n` repeatedly by `k` to check if every remainder equals `1` takes `O(n log n)` time, which is completely impossible for `n = 10^18`.

### Optimized Approach

Use **Length Enumeration + Overflow-Safe Binary Search**: iterate `len` from `63` down to `2`, and for each `len`, binary search `radix` in `[2, num - 1]` using overflow-clamped polynomial evaluation `calc(mid, len)`.

### Step-by-Step Thinking Process

1. Parse `n` into a 64-bit integer `long num = Long.parseLong(n)` (since `10^18 < Long.MAX_VALUE` which is `~9.22 * 10^18`).
2. Because smaller `radix` corresponds to larger `len`, iterate `len` from `63` down to `2`.
3. For a fixed `len`, the function `calc(radix, len) = 1 + radix + ... + radix^(len - 1)` is strictly increasing with respect to `radix >= 2`, so we can binary search `l = 2, r = num - 1` for `calc(radix, len) == num`.
4. When `mid^i` or the running sum would overflow `Long.MAX_VALUE` (for instance `mid = 10^9` and `len = 60`), guard additions with `Long.MAX_VALUE - sum < p` and multiplications with `Long.MAX_VALUE / p < radix`, saturating at `Long.MAX_VALUE` so `calc(mid, len) >= num` cleanly steers `r = mid`!
5. Return the first `radix != -1` as a string (falling back to `num - 1` if needed).

### Algorithm / Intuition

The code consists of three clean methods:
- `smallestGoodBase`: parses `num` and loops `for (int len = 63; len >= 2; --len)`. Finding a match at the largest feasible `len` automatically minimizes `radix`.
- `getRadix(int len, long num)`: performs lower-bound binary search over `[2, num - 1]` using unsigned midpoint shift `long mid = l + r >>> 1` (since `l + r <= 2 * 10^18 < Long.MAX_VALUE`, `l + r` never overflows 63 bits). After `l == r`, it verifies exact equality `calc(r, len) == num`.
- `calc(long radix, int len)`: accumulates `sum += p` and advances `p *= radix` across `len` terms, clamping to `Long.MAX_VALUE` before any 64-bit signed overflow can corrupt the comparison.

---

## Dry Run

Tracing **Example 1** with `n = "13"` (`num = 13`):

1. **`len = 63` down to `4`:** In `getRadix(len, 13)`, even at the minimum base `2`, `calc(2, len) >= 1 + 2 + 4 + 8 = 15 > 13`. Binary search narrows `[2, 12]` down to `r = 2`, checks `calc(2, len) == 13` (`false`), and returns `-1`.
2. **`len = 3`:** `getRadix(3, 13)` searches `l = 2, r = 12`:
   - `mid = 7`: `calc(7, 3) = 1 + 7 + 49 = 57 >= 13` -> `r = 7`.
   - `mid = 4`: `calc(4, 3) = 1 + 4 + 16 = 21 >= 13` -> `r = 4`.
   - `mid = 3`: `calc(3, 3) = 1 + 3 + 9 = 13 >= 13` -> `r = 3`.
   - `mid = 2`: `calc(2, 3) = 1 + 2 + 4 = 7 < 13` -> `l = 3`.
   - Loop ends (`l == r == 3`); `calc(3, 3) == 13` holds -> returns `radix = 3`.
3. `smallestGoodBase` immediately returns `"3"`.

---

## Complexity Analysis

- **Time Complexity:** `O(log^3(n))` — At most `62` values of `len` (`O(log n)`), each running a binary search of `O(log n)` steps (`<= 60` iterations), with each `calc` taking `O(len) = O(log n)` time (~`62 * 60 * 63` <= `2.3 * 10^5` primitive operations).
- **Space Complexity:** `O(1)` — Uses only primitive `long` and `int` variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [483smallest-good-base.java](./483smallest-good-base.java) |

---

## Key Learnings

- Flipping the search axis—fixing the small output length `len <= 63` instead of the huge base `k <= 10^18`—turns an intractable search into monotonic binary search.
- Saturating arithmetic (`return Long.MAX_VALUE` on overflow) is an essential pattern whenever binary-searching high-degree polynomials in fixed-width integers.
- Every integer `n >= 3` trivially has good base `n - 1` (`11` in base `n - 1`), guaranteeing a valid answer always exists.
