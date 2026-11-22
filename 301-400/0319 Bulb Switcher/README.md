---
comments: true
difficulty: Medium
tags:
  - Math
  - Brainteaser
---

# 319. Bulb Switcher

**[View Problem on LeetCode](https://leetcode.com/problems/bulb-switcher/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0319` (`319`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Brainteaser` |
| **Solution Language** | Java |

---

## Problem Description

There are `n` bulbs that are initially off. You first turn on all the bulbs, then you turn off every second bulb.

On the third round, you toggle every third bulb (turning on if it's off or turning off if it's on). For the `i^th` round, you toggle every `i` bulb. For the `n^th` round, you only toggle the last bulb.

Return *the number of bulbs that are on after `n` rounds*.

---

## Examples

### Example 1

```text
**Input:** n = 3
**Output:** 1
**Explanation:** At first, the three bulbs are [off, off, off].
After the first round, the three bulbs are [on, on, on].
After the second round, the three bulbs are [on, off, on].
After the third round, the three bulbs are [on, off, off]. 
So you should return 1 because there is only one bulb is on.
```

### Example 2

```text
**Input:** n = 0
**Output:** 0
```

### Example 3

```text
**Input:** n = 1
**Output:** 1
```

 

**

---

## Constraints

**

	
- `0 <= n <= 10^9`

---

## Problem Understanding

- Starting with `n` bulbs off, toggle every `k`-th bulb on round `k` (`k = 1..n`). Return how many bulbs remain on.

---

## Approach

### Optimized Approach (Number Theory — Perfect Squares)
1. Bulb `i` is toggled once for each positive divisor of `i`.
2. Divisors pair up except when `i` is a perfect square, so only perfect squares have an odd number of divisors and remain ON.
3. The count of perfect squares $\le n$ is `(int) Math.sqrt(n)`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [319bulb-switcher.java](./319bulb-switcher.java) |

---

## Key Learnings

- Parity of divisor count equals `1` if and only if a number is a perfect square.
