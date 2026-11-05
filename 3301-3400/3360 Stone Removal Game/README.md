---
comments: true
difficulty: Easy
tags:
  - Math
  - Simulation
---

# 3360. Stone Removal Game

**[View Problem on LeetCode](https://leetcode.com/problems/stone-removal-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3360` (`3360`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Simulation` |
| **Solution Language** | Python 3 |

---

## Problem Description

Alice and Bob play a turn-based game removing stones from a single pile containing `n` stones. Alice takes the first turn.

- On her first turn, Alice must remove exactly 10 stones.
- On each subsequent turn, the active player must remove exactly 1 fewer stone than the previous player removed.

The first player who cannot remove the exact required number of stones on their turn loses, and the other player wins.

Return `true` if Alice wins the game assuming both players play, and `false` if Bob wins.

---

## Examples

### Example 1

**Input:** `n = 12`

**Output:** `true`

**Explanation:**

- Alice removes 10 stones on her first turn, leaving 2 stones for Bob.

- Bob cannot remove 9 stones, so Alice wins.

### Example 2

**Input:** `n = 1`

**Output:** `false`

**Explanation:**

- Alice cannot remove 10 stones, so Alice loses.

---

## Constraints

- `1 <= n <= 50`

---

## Problem Understanding

- **Fixed Turn Quantities:** The game has no branching choices; the sequence of stone removals is fixed: turn 1 requires 10 stones (Alice), turn 2 requires 9 stones (Bob), turn 3 requires 8 stones (Alice), turn 4 requires 7 stones (Bob), and so forth.
- **Termination Condition:** As soon as the remaining number of stones `n` is strictly less than the current required removal amount `curr`, the current player cannot make a valid move and loses immediately.
- **Winner Parity:** If the total number of successful turns completed is odd, Alice made the final valid move, meaning Bob is faced with an insufficient pile and loses (Alice wins). If the count of completed turns is even, Bob made the final valid move, so Alice loses.

---

## Approach

### Brute Force Approach

Because the game has at most 10 total moves (the removal amount decreases from 10 to 1, totaling at most 55 stones, while `n <= 50`), simulating each turn step by step takes at most 10 iterations. The straightforward simulation is already the most direct and optimal approach.

### Optimized Approach

We simulate the game turns directly using a loop. We initialize `cnt = 0` (completed turns) and `curr = 10` (stones required for the current turn). While `n >= curr`, we decrement `n` by `curr`, decrement `curr` by `1`, and increment `cnt` by `1`. Once the loop breaks because `n < curr`, if `cnt` is odd, Alice made the last move, so we return `True`. If `cnt` is even, Bob made the last move, so we return `False`.

### Step-by-Step Thinking Process

1. The game is deterministic with stone requirements: 10 (Alice), 9 (Bob), 8 (Alice), 7 (Bob), 6 (Alice), 5 (Bob), etc.
2. Track the number of completed turns `cnt` and required stones `curr = 10`.
3. In each step, if `n >= curr`, subtract `curr` from `n`, reduce `curr` by 1, and increment `cnt`.
4. When `n < curr`, the player whose turn it is cannot move.
5. Odd `cnt` means Alice completed turn 1, 3, 5, etc., so Bob is stuck -> Alice wins (`True`).
6. Even `cnt` means Alice could not complete her move -> Bob wins (`False`).

### Algorithm / Intuition

In `Solution.canAliceWin`: `cnt` is initialized to 0 and `curr` to 10. The loop `while n >= curr` subtracts `curr` from `n`, decrements `curr` by 1, and increments `cnt` by 1. When `n < curr`, the active player cannot take the required stones. If `cnt` is odd (`cnt % 2 == 1`), an odd number of turns were successfully completed. Since Alice takes odd-numbered turns (turn 1, turn 3, etc.), Alice took the last valid turn and Bob has lost, returning `True`. Otherwise, an even number of turns were completed (or 0 turns if `n < 10`), meaning Alice is stuck on her turn, returning `False`.

---

## Dry Run

### Step-by-Step Execution on Example 1: `n = 12`

| Turn (`cnt` before) | Required `curr` | Pile `n` before | Can move? (`n >= curr`) | New `n` | New `curr` | New `cnt` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 0 (Alice) | 10 | 12 | Yes (12 >= 10) | `12 - 10 = 2` | 9 | 1 |
| 1 (Bob) | 9 | 2 | No (2 < 9) | Loop ends | - | 1 |

`cnt = 1` (odd). `cnt % 2 != 0` evaluates to `True`. Return `True` (Alice wins).

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — The loop runs at most 10 iterations because `curr` decreases from 10 down to 1.
- **Space Complexity:** `O(1)` — Only two scalar integer variables (`cnt`, `curr`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Python 3** | [3360stone-removal-game.py](./3360stone-removal-game.py) |

---

## Key Learnings

- In small deterministic subtraction games, direct turn simulation is both trivial to implement and executes in constant `O(1)` time.
- Turn parity (`cnt % 2`) directly identifies the winning player in alternating two-player games with no passing.
