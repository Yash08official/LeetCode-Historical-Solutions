---
comments: true
difficulty: Medium
tags:
  - Math
  - Recursion
---

# 390. Elimination Game

**[View Problem on LeetCode](https://leetcode.com/problems/elimination-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0390` (`390`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

You have a list `arr` of all integers in the range `[1, n]` sorted in a strictly increasing order. Apply the following algorithm on `arr`:

	
- Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.
	
- Repeat the previous step again, but this time from right to left, remove the rightmost number and every other number from the remaining numbers.
	
- Keep repeating the steps again, alternating left to right and right to left, until a single number remains.

Given the integer `n`, return *the last number that remains in* `arr`.

---

## Examples

### Example 1

```text
**Input:** n = 9
**Output:** 6
**Explanation:**
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
arr = [2, 4, 6, 8]
arr = [2, 6]
arr = [6]
```

### Example 2

```text
**Input:** n = 1
**Output:** 1
```

 

**

---

## Constraints

**

	
- `1 <= n <= 10^9`

---

## Problem Understanding

- Repeatedly remove every second number from `[1..n]`, alternating left-to-right and right-to-left, and return the last remaining number.

---

## Approach

### Optimized Approach (Arithmetic Progression Head Tracking)
1. The remaining numbers always form an arithmetic progression with first term `a1`, last term `an`, count `cnt`, and common difference `step` (doubling each round).
2. Left-to-right pass always advances `a1 += step`; right-to-left pass advances `a1 += step` only when `cnt` is odd.
3. Halve `cnt >>= 1` and double `step <<= 1` until `cnt == 1`; return `a1`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [390elimination-game.java](./390elimination-game.java) |

---

## Key Learnings

- Tracking only the head `a1` and step size of the arithmetic progression simulates $10^9$ eliminations in $\le 30$ iterations.
