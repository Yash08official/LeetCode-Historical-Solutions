---
comments: true
difficulty: Medium
tags:
  - Bit Manipulation
---

# 201. Bitwise AND of Numbers Range

**[View Problem on LeetCode](https://leetcode.com/problems/bitwise-and-of-numbers-range/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0201` (`201`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Bit Manipulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two integers `left` and `right` that represent the range `[left, right]`, return *the bitwise AND of all numbers in this range, inclusive*.

---

## Examples

### Example 1

```text
**Input:** left = 5, right = 7
**Output:** 4
```

### Example 2

```text
**Input:** left = 0, right = 0
**Output:** 0
```

### Example 3

```text
**Input:** left = 1, right = 2147483647
**Output:** 0
```

 

**

---

## Constraints

**

	
- `0 <= left <= right <= 2^31 - 1`

---

## Problem Understanding

- Given two integers `left` and `right` representing the inclusive range `[left, right]`, return the bitwise AND of all numbers in this range.
- Whenever any bit position flips from `0` to `1` across the range, that bit in the final bitwise AND becomes `0`. Thus the result is simply the **common binary prefix** of `left` and `right` padded with trailing zeros.

---

## Approach

### Brute-Force vs. Optimized Approach
- **Brute-Force:** Iterating from `left` to `right` and computing `ans &= i` takes $O(\text{right} - \text{left})$ time, which times out when `right` is up to $2^{31} - 1$.
- **Optimized Approach (Brian Kernighan's Algorithm):**
  1. Repeatedly clear the lowest set bit of `right` using `right &= right - 1` while `left < right`.
  2. Each operation strips a differing lower bit from `right` until `right <= left`, leaving only the common binary prefix shared by all integers in `[left, right]`.
  3. Return `right`.

### Dry Run (`left = 5`, `right = 7`)
- Binary: `left = 101`, `right = 111`.
- Iteration 1: `5 < 7` -> `right = 111 & 110 = 110` (`6`).
- Iteration 2: `5 < 6` -> `right = 110 & 101 = 100` (`4`).
- Now `5 < 4` is false -> return `4` (`100`).

---

## Complexity Analysis

- **Time Complexity:** $O(\log(\text{right}))$ — At most 31 iterations (one per set bit cleared in a 32-bit integer).
- **Space Complexity:** $O(1)$ — Only constant scalar variables used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [201bitwise-and-of-numbers-range.js](./201bitwise-and-of-numbers-range.js) |

---

## Key Learnings

- The bitwise AND of a contiguous range `[left, right]` equals the longest common binary prefix of `left` and `right`.
- Brian Kernighan's trick `x &= x - 1` efficiently strips the least significant set bit in $O(1)$.
