---
comments: true
difficulty: Medium
tags:
  - Math
  - Number Theory
  - Primality Test
  - Sieve Theory
  - Prime Number Sieve
---

# 2523. Closest Prime Numbers in Range

**[View Problem on LeetCode](https://leetcode.com/problems/closest-prime-numbers-in-range/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2523` (`2523`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Number Theory`, `Primality Test`, `Sieve Theory`, `Prime Number Sieve` |
| **Solution Language** | Java |

---

## Problem Description

Given two positive integers `left` and `right`, find two prime numbers `num1` and `num2` such that:
1. `left <= num1 < num2 <= right`
2. Both `num1` and `num2` are prime numbers.
3. The difference `num2 - num1` is the minimum possible among all prime pairs in the range.
4. If there are multiple pairs with the same minimum difference, return the pair with the smallest `num1`.

If fewer than two prime numbers exist in the range, return `[-1, -1]`.

---

## Examples

### Example 1

```text
Input: left = 10, right = 19
Output: [11,13]
Explanation: The prime numbers between 10 and 19 are 11, 13, 17, and 19.
The closest gap between any pair is 2, which can be achieved by [11,13] or [17,19].
Since 11 is smaller than 17, we return the first pair.
```

### Example 2

```text
Input: left = 4, right = 6
Output: [-1,-1]
Explanation: There exists only one prime number in the given range, so the conditions cannot be satisfied.
```

---

## Constraints

- `1 <= left <= right <= 10^6`

.spoilerbutton {display:block; border:dashed; padding: 0px 0px; margin:10px 0px; font-size:150%; font-weight: bold; color:#000000; background-color:cyan; outline:0;
}
.spoiler {overflow:hidden;}
.spoiler > div {-webkit-transition: all 0s ease;-moz-transition: margin 0s ease;-o-transition: all 0s ease;transition: margin 0s ease;}
.spoilerbutton[value="Show Message"] + .spoiler > div {margin-top:-500%;}
.spoilerbutton[value="Hide Message"] + .spoiler {padding:5px;}

---

## Problem Understanding

The problem asks for the twin primes or closest adjacent primes within $[\text{left}, \text{right}]$. Notice that the minimum difference between adjacent primes $\ge 3$ can be as small as 2 (or 1 for pair `[2, 3]`). Because $\text{right} \le 10^6$, we can precompute all primes up to $\text{right}$ using an efficient sieve. Once primes are gathered in sorted order, we identify primes falling in $[\text{left}, \text{right}]$ and scan consecutive pairs to find the one with the minimal gap.

---

## Approach

### Brute Force Approach

Testing primality for every integer in $[\text{left}, \text{right}]$ using trial division takes $O(\sqrt{N})$ per number, leading to $O((R - L) \sqrt{R})$. For $R = 10^6$, this can take hundreds of millions of operations, leading to TLE. A linear sieve is vastly faster and runs in $O(R)$ time.

### Optimized Approach

1. Use Euler's linear sieve up to `right` to generate all primes $\le \text{right}$ in strictly $O(\text{right})$ time.
2. Find the range of indices $[i, j]$ in the `prime` array that satisfy $\text{left} \le \text{prime}[k] \le \text{right}$.
3. If fewer than 2 primes exist ($i == -1$ or $i == j$), return `[-1, -1]`.
4. Scan adjacent primes from $k = i$ to $j - 1$, tracking the minimal difference `d = prime[k + 1] - prime[k]`, updating `ans = [prime[k], prime[k + 1]]`.

### Step-by-Step Thinking Process

1. Determine the upper bound: `right <= 10^6`. A linear sieve up to $10^6$ takes $\approx 10^6$ operations, which executes in ~15ms in Java.
2. Implement Euler's sieve (linear sieve):
  - `boolean[] st` tracks composite numbers; `int[] prime` stores primes; `cnt` counts primes.
  - For $i = 2 \dots right$, if `!st[i]`, add to `prime`.
  - Mark multiples `st[prime[j] * i] = true`, breaking when `i % prime[j] == 0`.
3. Locate the first prime index $i$ and last prime index $j$ within $[left, right]$.
4. If $i == -1$ or $i == j$, fewer than 2 primes exist in the range, return `[-1, -1]`.
5. Iterate $k$ from $i$ to $j - 1$: if `prime[k + 1] - prime[k] < mi`, update minimum gap `mi` and answer pair.
6. Return `ans`.

### Algorithm / Intuition

In the provided Java solution:

1. Euler's linear sieve initializes `st` (composites flag) and `prime` array. The inner loop breaks when `i % prime[j] == 0`, ensuring each composite is marked by its smallest prime factor in $O(R)$ time.
2. Pointers `i` and `j` identify the segment of primes falling within $[\text{left}, \text{right}]$.
3. If $i == j$ or $i == -1$, at most one prime exists, returning `[-1, -1]`.
4. Variable `mi = 1 << 30` tracks the minimum difference. The loop checks consecutive primes `prime[k]` and `prime[k + 1]`. Strict inequality `d < mi` guarantees that ties naturally preserve the earlier pair (smallest `num1`).

---

## Dry Run

Consider Example 1: `left = 10`, `right = 19`

1. Primes $\le 19$: `[2, 3, 5, 7, 11, 13, 17, 19]`.
2. Filter for $[10, 19]$: indices $k = 4, 5, 6, 7$ with values `[11, 13, 17, 19]` ($i = 4, j = 7$).
3. **Compare consecutive pairs**:
   - $k = 4$: pair `[11, 13]`, difference $13 - 11 = 2$. `mi = 2`, `ans = [11, 13]`.
   - $k = 5$: pair `[13, 17]`, difference $17 - 13 = 4 > 2$.
   - $k = 6$: pair `[17, 19]`, difference $19 - 17 = 2 == 2$ (not strictly less, so `ans` remains `[11, 13]`).

Final Return: `[11, 13]`.

---

## Complexity Analysis

- **Time Complexity:** `O(\text{right})` — Euler's linear sieve visits each number up to `right` a constant number of times, running in $O(\text{right})$ time. Filtering and scanning the primes in range takes $O(\pi(\text{right})) = O(\text{right} / \ln(\text{right}))$ time.
- **Space Complexity:** `O(\text{right})` — Storage for boolean composite flags `st` and prime array `prime` up to $\text{right} + 1$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2523closest-prime-numbers-in-range.java](./2523closest-prime-numbers-in-range.java) |

---

## Key Learnings

- Euler's linear sieve guarantees exact $O(N)$ prime generation by marking each composite exclusively with its smallest prime factor.
- Adjacent primes in a sorted prime list always yield the minimal difference; non-adjacent primes can never be closer.
- Using `<` instead of `<=` when updating the minimal gap ensures tie-breaking in favor of the smallest first element.
