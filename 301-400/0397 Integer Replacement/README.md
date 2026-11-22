---
comments: true
difficulty: Medium
tags:
  - Dynamic Programming
  - Greedy
  - Bit Manipulation
  - Memoization
---

# 397. Integer Replacement

**[View Problem on LeetCode](https://leetcode.com/problems/integer-replacement/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0397` (`397`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Dynamic Programming`, `Greedy`, `Bit Manipulation`, `Memoization` |
| **Solution Language** | Java |

---

## Problem Description

Given a positive integer `n`, you can apply one of the following operations:

	
- If `n` is even, replace `n` with `n / 2`.
	
- If `n` is odd, replace `n` with either `n + 1` or `n - 1`.

Return *the minimum number of operations needed for* `n` *to become* `1`.

---

## Examples

### Example 1

```text
**Input:** n = 8
**Output:** 3
**Explanation:** 8 -> 4 -> 2 -> 1
```

### Example 2

```text
**Input:** n = 7
**Output:** 4
**Explanation: **7 -> 8 -> 4 -> 2 -> 1
or 7 -> 6 -> 3 -> 2 -> 1
```

### Example 3

```text
**Input:** n = 4
**Output:** 2
```

 

**

---

## Constraints

**

	
- `1 <= n <= 2^31 - 1`

---

## Problem Understanding

- Find the minimum number of operations to reduce positive integer `n` to `1` (`n / 2` if even, `n + 1` or `n - 1` if odd).

---

## Approach

### Optimized Approach (Bitwise Greedy Trailing-Zeros Maximization)
1. If `n` is even, unsigned shift `n >>>= 1` (handles `Integer.MAX_VALUE + 1` overflow safely!).
2. If `n` is odd: when `n != 3 && (n & 3) == 3` (ends in `...11`), `++n` creates at least two trailing zeros (faster halving); otherwise `--n`.
3. Count steps until `n == 1`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [397integer-replacement.java](./397integer-replacement.java) |

---

## Key Learnings

- Using unsigned right shift `>>>= 1` prevents infinite loops when `Integer.MAX_VALUE` increments to `Integer.MIN_VALUE`.
