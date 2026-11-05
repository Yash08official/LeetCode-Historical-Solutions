---
comments: true
difficulty: Easy
tags:
  - Array
  - Bit Manipulation
---

# 136. Single Number

**[View Problem on LeetCode](https://leetcode.com/problems/single-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0136` (`136`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Bit Manipulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a non-empty integer array `nums` in which every value occurs **exactly twice**, except for one unique value that occurs **only once**. Find and return that single unpaired integer.

Your solution must run in `O(n)` linear time and use `O(1)` constant auxiliary memory.

---

## Examples

### Example 1

**Input:** `nums = [2,2,1]`

**Output:** `1`

### Example 2

**Input:** `nums = [4,1,2,1,2]`

**Output:** `4`

### Example 3

**Input:** `nums = [1]`

**Output:** `1`

---

## Constraints

- `1 <= nums.length <= 3 * 10^4`

- `-3 * 10^4 <= nums[i] <= 3 * 10^4`

- Each element in the array appears twice except for one element which appears only once.

---

## Problem Understanding

- **Exact Pairing Guarantee:** Every duplicate element has multiplicity `2` (an even count), while the target element has multiplicity `1`.
- **Memory Constraint:** Sorting (`O(n log n)` time) or using a hash set/frequency map (`O(n)` space) violates the strict `O(n)` time and `O(1)` space requirement.
- **Bitwise XOR Cancellation:** Bitwise XOR (`^`) satisfies three algebraic properties that match this structure: self-inverse (`x ^ x = 0`), identity (`x ^ 0 = x`), and commutativity/associativity (order of operations does not matter).

---

## Approach

### Brute Force Approach

A brute-force nested scan checks every element `nums[i]` against all other indices `j != i` to see whether a duplicate exists, taking `O(n^2)` time and `O(1)` space. Alternatively, inserting/removing elements in a `Set` reduces time to `O(n)` but consumes `O(n)` extra space.

### Optimized Approach

Fold the entire `nums` array with the **Bitwise XOR (`^`)** operator via `nums.reduce((a, b) => a ^ b)`. All paired numbers cancel out to `0`, leaving only the single unpaired number.

### Step-by-Step Thinking Process

1. We need an operation that combines all elements in one pass without storing previously seen values.
2. Notice that XORing two identical integers flips every matching `1` bit back to `0` (`x ^ x = 0`).
3. Because XOR is both commutative and associative, `a ^ b ^ a` can be regrouped as `(a ^ a) ^ b = 0 ^ b = b` regardless of how far apart duplicates sit in the array.
4. Applying `Array.prototype.reduce` without an extra data structure accumulates the running XOR in `O(1)` space and returns the lone value.

### Algorithm / Intuition

In `singleNumber(nums)`, `nums.reduce((a, b) => a ^ b)` uses the first element `nums[0]` as the initial accumulator `a` (which is safe because `nums` is guaranteed to be non-empty) and XORs each subsequent element `b` into `a`. At the bit level, each bit position counts the parity (modulo 2) of `1` bits across all numbers in `nums`. Every duplicated number contributes two identical bits (even parity `0`), so the final bit pattern in the accumulator equals the exact 32-bit two's complement representation of the unique integer.

---

## Dry Run

Trace on **Example 1**: `nums = [2, 2, 1]`

| Step | `a` (Accumulator) | `b` (Current) | Binary `a ^ b` | New Accumulator |
| :--- | :--- | :--- | :--- | :--- |
| Init | `2` (`10`) | — | — | `2` |
| 1 | `2` (`10`) | `2` (`10`) | `10 ^ 10 = 00` | `0` |
| 2 | `0` (`00`) | `1` (`01`) | `00 ^ 01 = 01` | `1` |

`reduce` finishes and returns `1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — `nums.reduce` visits each of the `n` elements once, performing an `O(1)` bitwise XOR per step.
- **Space Complexity:** `O(1)` — Only the scalar accumulator inside `reduce` is maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [136single-number.js](./136single-number.js) |

---

## Key Learnings

- Bitwise XOR (`^`) is an abelian group operation where every integer is its own inverse (`x ^ x = 0`), making it ideal for parity and missing/duplicate element problems.
- Calling `nums.reduce((a, b) => a ^ b)` without an initial value works safely when `nums.length >= 1`, returning `nums[0]` directly on a 1-element array.
- JavaScript bitwise operators convert operands to signed 32-bit integers, which comfortably covers the constraint `-3 * 10^4 <= nums[i] <= 3 * 10^4`.
