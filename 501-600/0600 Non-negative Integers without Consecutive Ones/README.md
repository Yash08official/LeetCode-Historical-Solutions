---
comments: true
difficulty: Hard
tags:
  - Dynamic Programming
---

# 600. Non-negative Integers without Consecutive Ones

**[View Problem on LeetCode](https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0600` (`600`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given a positive integer `n`, return the number of the integers in the range `[0, n]` whose binary representations **do not** contain consecutive ones.

---

## Examples

### Example 1

```text
Input: n = 5
Output: 5
Explanation:
Here are the non-negative integers <= 5 with their corresponding binary representations:
0 : 0
1 : 1
2 : 10
3 : 11
4 : 100
5 : 101
Among them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule.
```

### Example 2

```text
Input: n = 1
Output: 2
```

### Example 3

```text
Input: n = 2
Output: 3
```

---

## Constraints

- `1 <= n <= 10^9`

---

## Problem Understanding

- We must count all non-negative integers $x \in [0, n]$ such that no two adjacent bits in $x$'s binary representation are both $1$.
- Range $n \le 10^9$ fits within a 32-bit signed integer (highest set bit $\le 29$).
- This is a canonical **Digit Dynamic Programming** problem in base 2.

---

## Approach

### Optimized Approach (Digit DP on Binary Representation)

1. Find the highest bit position: $m = 32 - 	ext{numberOfLeadingZeros}(n)$.
2. Define memoization table `f[m][2]`, where `f[i][pre]` caches the count of valid binary suffixes of length $i + 1$ given previous bit `pre` when the tight prefix constraint (`limit`) is relaxed.
3. Define `dfs(i, pre, limit)`:
   - **Base case:** If $i < 0$, a complete valid number has been constructed, return $1$.
   - **Memoization check:** If `!limit && f[i][pre] != null`, return cached `f[i][pre]`.
   - **Upper bound bit:** `up = limit ? ((n >> i) & 1) : 1`.
   - **Transitions:** Iterate bit $j \in [0, up]$:
     - If $j == 1$ and $pre == 1$, skip (consecutive ones constraint).
     - Otherwise, accumulate `dfs(i - 1, j, limit && j == up)`.
   - **Memoize:** If `!limit`, store `f[i][pre] = ans`.
4. Call `dfs(m - 1, 0, true)`.

### Step-by-Step Thinking Process

1. Determine total bits of $n$.
2. Traverse from MSB to LSB.
3. At each bit position, choose $0$ or $1$ (if allowed by `limit`).
4. Reject paths where $j == 1$ and $pre == 1$.
5. Memoize states independent of `limit` ($O(\log n)$ total states).

### Algorithm / Intuition

Because without tight prefix limits the number of valid bit sequences without consecutive ones follows the Fibonacci sequence, Digit DP effectively counts matching paths along the prefix tree of $n$.

---

## Dry Run

Tracing **Example 1**: $n = 5$ (`101` in binary), $m = 3$.
1. Bit 2: `limit = true`, `up = 1`.
   - Choose $j = 0$: `dfs(1, 0, false)`:
     - Bit 1: choose $0$ or $1$.
       - $0
ightarrow$ bit 0 chooses $0$ or $1
ightarrow 2$ paths (`000`, `001`).
       - $1
ightarrow$ bit 0 chooses $0
ightarrow 1$ path (`010`).
     - Total = $3$ paths (`0`, `1`, `2`).
   - Choose $j = 1$: `dfs(1, 1, true)`:
     - Bit 1: `up = (5 >> 1) & 1 = 0`.
     - Choose $j = 0$: `dfs(0, 0, true)`:
       - Bit 0: `up = (5 >> 0) & 1 = 1`.
       - Choose $j = 0
ightarrow 1$ path (`100` = 4).
       - Choose $j = 1
ightarrow 1$ path (`101` = 5).
     - Total = $2$ paths.
2. Grand Total = $3 + 2 = 5$. Matches Example 1 output.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ — At most $30 	imes 2 = 60$ states, each computing $2$ transitions in $O(1)$. Execution time is $< 2$ ms.
- **Space Complexity:** $O(\log n)$ — Recursion call stack and memo table `f[30][2]`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [600non-negative-integers-without-consecutive-ones.java](./600non-negative-integers-without-consecutive-ones.java) |

---

## Key Learnings

- Base-2 Digit DP naturally maps bit constraints (like no adjacent ones) to a single preceding-bit state variable `pre`.
- `Integer.numberOfLeadingZeros()` efficiently identifies the exact MSB index to avoid processing unnecessary leading zeros.
