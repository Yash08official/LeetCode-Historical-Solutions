---
comments: true
difficulty: Easy
tags:
  - Math
  - Brainteaser
  - Minimax
  - Game Theory
  - Nim Game
  - Impartial Game
---

# 292. Nim Game

**[View Problem on LeetCode](https://leetcode.com/problems/nim-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0292` (`292`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Brainteaser`, `Minimax`, `Game Theory`, `Nim Game`, `Impartial Game` |
| **Solution Language** | Java |

---

## Problem Description

You are playing the following Nim Game with your friend:

	
- Initially, there is a heap of stones on the table.
	
- You and your friend will alternate taking turns, and **you go first**.
	
- On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
	
- The one who removes the last stone is the winner.

Given `n`, the number of stones in the heap, return `true`* if you can win the game assuming both you and your friend play optimally, otherwise return *`false`.

---

## Examples

### Example 1

```text
**Input:** n = 4
**Output:** false
**Explanation:** These are the possible outcomes:
1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
In all outcomes, your friend wins.
```

### Example 2

```text
**Input:** n = 1
**Output:** true
```

### Example 3

```text
**Input:** n = 2
**Output:** true
```

 

**

---

## Constraints

**

	
- `1 <= n <= 2^31 - 1`

---

## Problem Understanding

- Two players alternate removing 1, 2, or 3 stones from a heap of `n`; the player taking the last stone wins. Return whether the first player wins with optimal play.

---

## Approach

### Optimized Approach (Impartial Game Theory / Nim Modulo 4)
1. Any multiple of `4` is a losing (P) position: whatever move $k \in \{1, 2, 3\}$ you take, the opponent can take $4 - k$ and return you to another multiple of `4`.
2. If `n % 4 != 0`, you can remove `n % 4` stones to force the opponent into a losing multiple of `4`.
3. Return `n % 4 != 0`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [292nim-game.java](./292nim-game.java) |

---

## Key Learnings

- Identifying P-positions (multiples of `maxMove + 1 = 4`) reduces an impartial subtraction game to a single modulo check.
