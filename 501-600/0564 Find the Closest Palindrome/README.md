---
comments: true
difficulty: Hard
tags:
  - Math
  - String
---

# 564. Find the Closest Palindrome

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-closest-palindrome/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0564` (`564`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `n` representing an integer, return *the closest integer (not including itself), which is a palindrome*. If there is a tie, return *the smaller one*.

The closest is defined as the absolute difference minimized between two integers.

---

## Examples

### Example 1

```text
Input: n = "123"
Output: "121"
```

### Example 2

```text
Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
```

---

## Constraints

- `1 <= n.length <= 18`
- `n` consists of only digits.
- `n` does not have leading zeros.
- `n` is representing an integer in the range `[1, 10^18 - 1]`.

---

## Problem Understanding

- We seek a palindromic number $P
e n$ that minimizes $|P - n|$.
- If multiple palindromes achieve the same minimum absolute distance, the numerically smaller palindrome must be chosen.
- Key observation: A palindrome is completely determined by its first half (prefix of length $\lceil L/2
ceil$). Modifying the middle digits alters the value by smaller increments than modifying outer digits.
- Boundary transitions:
  - Decreasing the number of digits: e.g. from $100
ightarrow 99$ ($10^{L-1} - 1$).
  - Increasing the number of digits: e.g. from $99
ightarrow 101$ ($10^L + 1$).
- Candidates generated from the prefix:
  - Mirroring prefix without change: $d = 0$.
  - Mirroring prefix plus one: $d = +1$.
  - Mirroring prefix minus one: $d = -1$.

---

## Approach

### Brute Force Approach

Incrementing and decrementing by $1$ and checking `isPalindrome()` takes $O(10^{L/2})$ time in the worst case (e.g. for $n = 100000000000000000$, checking step-by-step is infeasible).

### Optimized Approach (Prefix Candidate Generation with BigInteger)

1. Compute length $l = n.	ext{length}()$.
2. Initialize candidate set `res`.
3. Add boundary candidates:
   - `10^(l - 1) - 1` (largest palindrome with $l - 1$ digits, e.g. `99...9`).
   - `10^l + 1` (smallest palindrome with $l + 1$ digits, e.g. `100...001`).
4. Extract the left half: `left = BigInteger(n.substring(0, (l + 1) / 2))`.
5. For each delta $d \in \{-1, 0, 1\}$:
   - Create candidate prefix $i = 	ext{left} + d$.
   - Mirror the digits: if $l$ is even, mirror all of $i$; if $l$ is odd, mirror $i / 10$.
   - Append mirrored digits in reverse order to $i$ and insert into `res`.
6. Remove the original number $x$ from `res` (a number cannot be its own closest palindrome).
7. Iterate over `res` to find $t$ minimizing $|t - x|$, tie-breaking on smaller $t$.
8. Return $ans.	ext{toString}()$.

### Step-by-Step Thinking Process

1. Recognize that only 5 candidate palindromes can ever be the closest to $n$:
   - The boundary above ($10^L + 1$).
   - The boundary below ($10^{L-1} - 1$).
   - The mirrored prefix, prefix $+ 1$, and prefix $- 1$.
2. Generate all 5 candidates explicitly using `BigInteger` to avoid 64-bit overflow on 18-digit inputs.
3. Exclude $x$ itself.
4. Scan the candidate set for minimum absolute difference with tie-breaking for smaller values.

### Algorithm / Intuition

Because higher place values carry exponentially more weight, the closest palindrome to $n$ must share as many leading digits as possible. Modifying only the central digits ($d \in \{-1, 0, 1\}$) or crossing the decade boundaries ($10^{L-1}-1$ and $10^L+1$) guarantees that the global minimum is among the evaluated set.

---

## Dry Run

Tracing **Example 1**: `n = "123"`, `l = 3`, `x = 123`.
1. Boundary candidates:
   - $10^2 - 1 = 99$
   - $10^3 + 1 = 1001$
2. Prefix of length $(3 + 1) / 2 = 2$: `left = 12`.
3. Candidate prefixes:
   - $d = -1
ightarrow 11$: odd length, mirror $1
ightarrow$ `111`.
   - $d = 0
ightarrow 12$: odd length, mirror $1
ightarrow$ `121`.
   - $d = +1
ightarrow 13$: odd length, mirror $1
ightarrow$ `131`.
4. Candidate set: `{99, 1001, 111, 121, 131}`.
5. Absolute distances to $123$:
   - $|99 - 123| = 24$
   - $|1001 - 123| = 878$
   - $|111 - 123| = 12$
   - $|121 - 123| = 2$
   - $|131 - 123| = 8$
6. Minimum distance is $2$ achieved by `121`. Result: `"121"`.

---

## Complexity Analysis

- **Time Complexity:** $O(L)$ — Generating and comparing at most 5 candidates of length $L \le 18$ takes constant/linear time with respect to the number of digits. Runs in $< 5$ ms.
- **Space Complexity:** $O(L)$ — Storage for candidate `BigInteger` objects and string slices.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [564find-the-closest-palindrome.java](./564find-the-closest-palindrome.java) |

---

## Key Learnings

- Palindrome proximity problems reduce to checking a constant number of candidate prefixes rather than searching large numeric ranges.
- Decade transition palindromes (`99...9` and `100...001`) must always be evaluated alongside prefix variations.
- Using `BigInteger` gracefully prevents numeric overflow when input bounds approach $10^{18}$.
