---
comments: true
difficulty: Medium
tags:
  - Bit Manipulation
---

# 3133. Minimum Array End

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-array-end/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3133` (`3133`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

We are given two positive integers `n` and `x`. We need to construct an array `nums` of `n` strictly increasing positive integers such that the bitwise AND of all elements in the array equals `x`.

Our objective is to return the minimum possible value of the last element, `nums[n - 1]`, as a 64-bit integer (`long`).

---

## Examples

### Example 1

**Input:** `n = 3, x = 4`

**Output:** `6`

**Explanation:**

`nums` can be `[4,5,6]` and its last element is 6.

### Example 2

**Input:** `n = 2, x = 7`

**Output:** `15`

**Explanation:**

`nums` can be `[7,15]` and its last element is 15.

---

## Constraints

- `1 <= n, x <= 10^8`

---

## Problem Understanding

Key mathematical and bitwise requirements:
- For the bitwise AND of all `nums[i]` to equal `x`, every single element `nums[i]` must have a 1 at every bit position where `x` has a 1.
- To minimize the last element `nums[n - 1]`, we must make each element in the strictly increasing sequence as small as possible.
- The smallest possible first element is `nums[0] = x`.
- For subsequent elements, all bits that are set in `x` must remain set to 1.
- The bits that are 0 in `x` are 'free' bit positions. To form `n` strictly increasing numbers with minimal values, we can simply place the binary counter values from `0` to `n - 1` into these free (0-bit) positions of `x`!
- Thus, the `(n - 1)`-th element `nums[n - 1]` is formed by taking `x` and embedding the binary representation of `n - 1` into the bit positions where `x` has a 0.

---

## Approach

### Brute Force Approach

A brute-force simulation would start with `nums[0] = x` and repeatedly increment by 1 while skipping any number whose bitwise AND with `x` is not `x`, counting up until `n` valid elements are found. Since `n` can be up to `10^8`, iterating through `10^8` or more numbers will cause severe Time Limit Exceeded.

### Optimized Approach

We decrement `n` by 1 (`--n`) so that `n` represents the index `n - 1` to be embedded.
- We initialize `ans = (long) x`.
- We iterate through bit positions `i` from `0` to `30`:
  - If bit `i` of `x` is 0 (`(x >> i & 1) == 0`):
    - We take the least significant bit of `n` (`n & 1`) and shift it to position `i`, setting it in `ans` via `ans |= (n & 1) << i`.
    - We right-shift `n` by 1 (`n >>= 1`).
- Any remaining higher-order bits of `n` are shifted by 31 and ORed into `ans`: `ans |= (long) n << 31`.
- Return `ans`.

### Step-by-Step Thinking Process

1. All elements must have `nums[i] & x == x`.
2. This means the 1-bits of `x` are immutable: they must be 1 in every element of `nums`.
3. The 0-bits of `x` can be freely set to 0 or 1.
4. To generate the smallest strictly increasing sequence starting at `x`, we iterate through binary values `0, 1, 2, ..., n - 1` and map their bits into the 0-bit slots of `x`.
5. The last element corresponds to the index `n - 1` mapped onto `x`.
6. We can extract bits of `n - 1` one by one and inject them into the zero positions of `x`.

### Algorithm / Intuition

The bit-packing mechanism operates as follows:
1. Decrement `n` (`--n`) to represent the offset `n - 1`.
2. Initialize `long ans = x`.
3. For `i` from `0` to `30`:
   - If `(x >> i & 1) == 0`:
     - OR the lowest bit of `n` into bit position `i`: `ans |= (n & 1) << i`.
     - Shift `n` right by 1: `n >>= 1`.
4. If `n` still has remaining bits beyond bit 30, place them at bit 31 and above: `ans |= (long) n << 31`.
5. Return `ans`.

---

## Dry Run

Trace on Example 1: `n = 3, x = 4`

- Initial values: `--n` gives `n = 2` (binary `10_2`). `x = 4` (binary `0100_2`). `ans = 4`.
- Iterating `i` from 0 to 30:
  - `i = 0`: bit 0 of `x` is 0. `(n & 1) = (2 & 1) = 0`. `ans |= 0 << 0` -> `ans = 4`. `n >>= 1` -> `n = 1`.
  - `i = 1`: bit 1 of `x` is 0. `(n & 1) = (1 & 1) = 1`. `ans |= 1 << 1` -> `ans |= 2` -> `ans = 6`. `n >>= 1` -> `n = 0`.
  - `i = 2`: bit 2 of `x` is 1 (`x >> 2 & 1 == 1`), condition false, skip.
  - For all higher `i`, `n == 0`, so `n & 1 == 0` adds nothing.
- After loop: `ans |= (long) 0 << 31` -> `ans = 6`.
- Return `ans = 6`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(1) — The loop runs for exactly 31 iterations, performing constant-time bitwise operations.
- **Space Complexity:** O(1) auxiliary space — Only primitive integer and long variables (`n`, `x`, `ans`, `i`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3133minimum-array-end.java](./3133minimum-array-end.java) |

---

## Key Learnings

- Preserving bitwise AND requirements amounts to freezing set bits and using the zero bits as independent binary counter channels.
- The `k`-th smallest number preserving mask `x` is obtained by projecting `k` onto the zero bits of `x`.
- Bit manipulation yields an `O(1)` closed-form solution where naive enumeration would timeout.
