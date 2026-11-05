---
comments: true
difficulty: Medium
tags:
  - Greedy
  - Bit Manipulation
---

# 2429. Minimize XOR

**[View Problem on LeetCode](https://leetcode.com/problems/minimize-xor/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2429` (`2429`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Greedy`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given two positive integers `num1` and `num2`, find an integer `x` such that:
1. `x` has the same number of set bits (1s in binary) as `num2`.
2. The value `x XOR num1` is **minimal**.

Return the integer `x`. The problem guarantees that `x` is uniquely determined.

---

## Examples

### Example 1

```text
Input: num1 = 3, num2 = 5
Output: 3
Explanation:
The binary representations of num1 and num2 are 0011 and 0101, respectively.
The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.
```

### Example 2

```text
Input: num1 = 1, num2 = 12
Output: 3
Explanation:
The binary representations of num1 and num2 are 0001 and 1100, respectively.
The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.
```

---

## Constraints

- `1 <= num1, num2 <= 10^9`

---

## Problem Understanding

Let `cnt` be the number of set bits in `num2` (`Integer.bitCount(num2)`). We must construct `x` with exactly `cnt` set bits. The XOR difference `x ^ num1` has a 0 at bit position $i$ if $x$ and `num1` have the same bit at $i$, and a 1 if they differ. To minimize `x ^ num1`, we must make the most significant bits of `x` match `num1`:
- If `num1` has a 1 at bit $i$, setting bit $i$ in `x` causes $1 \oplus 1 = 0$, eliminating that high power of 2 from the XOR sum.
- Therefore, we greedily place 1s in `x` at positions where `num1` has a 1, moving from the most significant bit (MSB, bit 30) down to 0.
- If `cnt` bits remain after matching all set bits of `num1`, we must place the remaining 1s in `x` where `num1` has 0s. To keep `x ^ num1` as small as possible, we place these extra 1s at the least significant bit positions (LSB, bit 0 upwards).

---

## Approach

### Brute Force Approach

A naive brute force tests integers starting from 1 upwards, checking if `bitCount(x) == bitCount(num2)` and finding the one that minimizes `x ^ num1`. Since $num1, num2 \le 10^9$, searching the space of 30-bit integers is completely infeasible and would result in TLE.

### Optimized Approach

Use a two-pass greedy bit manipulation strategy over 31 bits ($0$ to $30$). In pass 1 (high to low), set bit $i$ of `x` whenever bit $i$ of `num1` is 1 and `cnt > 0`. In pass 2 (low to high), if `cnt > 0`, set bit $i$ of `x` whenever bit $i$ of `num1` is 0.

### Step-by-Step Thinking Process

1. Count the target number of set bits: `cnt = Integer.bitCount(num2)`.
2. Understand that higher bits have exponentially greater weight ($2^i$). Canceling a higher bit in `num1` via XOR is always better than canceling any combination of lower bits.
3. Pass 1: Traverse bits from $i = 30$ down to $0$. If bit $i$ of `num1` is 1, set bit $i$ of `x` and decrement `cnt`. Stop if `cnt == 0`.
4. Pass 2: If `cnt > 0` after pass 1 (meaning `num2` has more set bits than `num1`), we must distribute the remaining `cnt` bits into positions where `num1` has 0.
5. To minimize the added value, traverse bits from $i = 0$ upwards. When bit $i$ of `num1` is 0, set bit $i$ of `x` and decrement `cnt` until `cnt == 0`.

### Algorithm / Intuition

In the provided Java solution:

1. `cnt` is computed via `Integer.bitCount(num2)`, and `x` is initialized to `0`.
2. The first loop runs from `i = 30` down to `0`. If `(num1 >> i & 1) == 1`, bit `i` is set in `x` via `x |= 1 << i` and `cnt` is decremented. This cancels the largest possible set bits of `num1`.
3. The second loop runs from `i = 0` upwards while `cnt > 0`. If `(num1 >> i & 1) == 0`, bit `i` is set in `x` via `x |= 1 << i` and `cnt` is decremented. This minimizes the penalty from the leftover 1-bits.
4. Finally, `x` is returned.

---

## Dry Run

Consider Example 1: `num1 = 3 (0011_2)`, `num2 = 5 (0101_2)`

1. `cnt = bitCount(5) = 2`, `x = 0`.
2. **Pass 1 (i = 30 down to 0)**:
   - For $i > 1$, `num1 >> i & 1` is 0.
   - At $i = 1$: `(3 >> 1) & 1 == 1`. Set bit 1: `x |= 2` ($x = 2$), `cnt = 1`.
   - At $i = 0$: `(3 >> 0) & 1 == 1`. Set bit 0: `x |= 1` ($x = 3$), `cnt = 0`.
   - `cnt` is now 0; loop terminates.
3. **Pass 2**: `cnt > 0` is false, so pass 2 is skipped.

Final Return: `x = 3` (XOR is $3 \oplus 3 = 0$, minimal).

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — The algorithm inspects at most 31 bits twice, which is a constant number of operations.
- **Space Complexity:** `O(1)` — Only integer registers (`cnt`, `x`, loop counter `i`) are utilized.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2429minimize-xor.java](./2429minimize-xor.java) |

---

## Key Learnings

- Greedy bit manipulation from MSB to LSB minimizes bitwise differences effectively.
- When forced to introduce 1s into unused bit positions, choosing LSBs guarantees minimal magnitude increase.
- Fixed-width integer problems operate in $O(1)$ time and space by bounding iterations by bit width (30 or 32).
