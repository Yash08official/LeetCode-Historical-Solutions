---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Enumeration
  - Number Theory
  - Primality Test
  - Sieve Theory
  - Prime Number Sieve
---

# 204. Count Primes

**[View Problem on LeetCode](https://leetcode.com/problems/count-primes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0204` (`204`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Enumeration`, `Number Theory`, `Primality Test`, `Sieve Theory`, `Prime Number Sieve` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer `n`, return *the number of prime numbers that are strictly less than* `n`.

---

## Examples

### Example 1

```text
**Input:** n = 10
**Output:** 4
**Explanation:** There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
```

### Example 2

```text
**Input:** n = 0
**Output:** 0
```

### Example 3

```text
**Input:** n = 1
**Output:** 0
```

 

**

---

## Constraints

**

	
- `0 <= n <= 5 * 10^6`

---

## Problem Understanding

- Given an integer `n`, return the count of prime numbers strictly less than `n`.

---

## Approach

### Brute-Force vs. Optimized Approach
- **Brute-Force:** Testing each number $2 \dots n-1$ for primality via trial division takes $O(n\sqrt{n})$, which is too slow for $n = 5 \times 10^6$.
- **Optimized Approach (Sieve of Eratosthenes):**
  1. Allocate boolean array `primes` of length `n` initialized to `true`.
  2. Iterate `i` from `2` to `n - 1`:
     - If `primes[i]` is still `true`, increment `ans`.
     - Mark all multiples `j = i + i, i + 2i, ... < n` as `false`.
  3. Return `ans`.

### Dry Run (`n = 10`)
- `i = 2` (prime, `ans = 1`): marks `4, 6, 8` false.
- `i = 3` (prime, `ans = 2`): marks `6, 9` false.
- `i = 5` (prime, `ans = 3`), `i = 7` (prime, `ans = 4`).
- Returns `4` (`2, 3, 5, 7`).

---

## Complexity Analysis

- **Time Complexity:** $O(n \log \log n)$ — Harmonic sum over primes up to $n$.
- **Space Complexity:** $O(n)$ — Boolean sieve array of size `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [204count-primes.js](./204count-primes.js) |

---

## Key Learnings

- The Sieve of Eratosthenes eliminates composite numbers in bulk by crossing out multiples of each discovered prime.
