---
comments: true
difficulty: Hard
tags:
  - Array
  - Math
  - Bit Manipulation
  - Brainteaser
---

# 810. Chalkboard XOR Game

**[View Problem on LeetCode](https://leetcode.com/problems/chalkboard-xor-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0810` (`810`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Math`, `Bit Manipulation`, `Brainteaser` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of integers `nums` written on a chalkboard. Alice and Bob take turns erasing numbers, with Alice going first.

If the bitwise XOR of all remaining numbers on the board is equal to `0`, the current player wins immediately. If a player erases a number such that the bitwise XOR of all remaining numbers becomes `0`, they lose (unless they were in the winning condition at the start of their turn).

Assuming both players play optimally, return `true` if Alice wins, or `false` otherwise.

---

## Problem Understanding & Game Theory Insight

- Let $S = nums[0] \oplus nums[1] \oplus \dots \oplus nums[n-1]$.
- If $S = 0$ initially, Alice wins immediately before making a move.
- Suppose $S 
eq 0$:
  - If Alice erases $x$, the remaining XOR sum becomes $S \oplus x$.
  - Alice loses if for every choice of $x$, $S \oplus x = 0 \implies x = S$.
  - For $S \oplus x$ to be $0$ for all available numbers, every remaining number must equal $S$.
  - If the array length $n$ is **even**, Alice can always find at least one element $x$ such that $S \oplus x 
eq 0$, leaving Bob with an odd number of elements and a non-zero XOR sum. Bob will eventually be forced into a losing state.
  - Conversely, if $n$ is **odd** and $S 
eq 0$, Alice faces an odd parity position and Bob can maintain the winning strategy, causing Alice to lose.

---

## Approach

### Parity & XOR Invariant Check

1. Compute the XOR sum of all elements in `nums`.
2. If the initial XOR sum is $0$, Alice wins immediately (`true`).
3. If the array length $n$ is even, Alice can always force a win (`true`).
4. Otherwise, Alice loses (`false`).

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass to compute the XOR sum of the array.
- **Space Complexity:** $O(1)$ auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [810chalkboard-xor-game.java](./810chalkboard-xor-game.java) |

---

## Key Learnings

- Game theory problems with symmetric operations often hinge on the parity of the turn count / array size.
- A player holding an even-length board with non-zero XOR sum is never forced to leave a zero XOR sum.
