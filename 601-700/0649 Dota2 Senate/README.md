---
comments: true
difficulty: Medium
tags:
  - String
  - Greedy
  - Queue
---

# 649. Dota2 Senate

**[View Problem on LeetCode](https://leetcode.com/problems/dota2-senate/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0649` (`649`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Greedy`, `Queue` |
| **Solution Language** | Java |

---

## Problem Description

In the Dota2 Senate, senators belong to either the **Radiant** (`'R'`) or **Dire** (`'D'`) party, given in voting order as a string `senate` of length `n`.

Voting proceeds in rounds from left to right, skipping banned senators:
1. **Ban an opponent:** Permanently strip another senator of all voting rights in the current and all future rounds.
2. **Declare victory:** If all remaining active senators belong to the same party, declare victory.

Assuming every senator plays optimally for their party, return `"Radiant"` or `"Dire"` indicating the winning party.

---

## Examples

### Example 1

```text
Input: senate = "RD"
Output: "Radiant"
Explanation:
The first senator comes from Radiant and he can just ban the next senator's right in round 1.
And the second senator can't exercise any rights anymore since his right has been banned.
And in round 2, the first senator can just announce the victory since he is the only guy in the senate who can vote.
```

### Example 2

```text
Input: senate = "RDD"
Output: "Dire"
Explanation:
The first senator comes from Radiant and he can just ban the next senator's right in round 1.
And the second senator can't exercise any rights anymore since his right has been banned.
And the third senator comes from Dire and he can ban the first senator's right in round 1.
And in round 2, the third senator can just announce the victory since he is the only guy in the senate who can vote.
```

---

## Constraints

- `n == senate.length`

- `1 <= n <= 10^4`

- `senate[i]` is either `'R'` or `'D'`.

---

## Problem Understanding

- **Optimal Greedy Strategy:** Whom should an active senator ban? Banning a teammate never helps, and banning an opponent who has *already* voted in this round is strictly worse than banning the **earliest upcoming opponent** who has not yet voted! Why? Because an opponent upcoming in the current round (or earliest in the next round) gets to ban one of your teammates sooner than any later opponent.
- **Circular Turn Order via `+ n`:** Treating rounds as a continuous timeline of turn indices (`0, 1, ..., n - 1` for Round 1; `n, n + 1, ..., 2n - 1` for Round 2, etc.) models wrap-around order cleanly: a surviving senator at index `idx` simply re-queues at `idx + n`!

---

## Approach

### Brute Force Approach

Simulating rounds directly on a boolean `banned` array by scanning forward `(i + 1) % n` on every turn to find the next unbanned opposing senator takes `O(n)` per ban in the worst case (e.g., `"RRRR...DDDD"`), resulting in `O(n^2)` total time.

### Optimized Approach

Maintain two FIFO queues (`qr` for Radiant indices and `qd` for Dire indices) and repeatedly pit their front senators against each other: the smaller index bans the larger index and re-enters its queue at `index + n`.

### Step-by-Step Thinking Process

1. Create two queues `qr` and `qd` (`ArrayDeque<Integer>`) and push each senator's initial `0`-based index `i` (`0 <= i < n`) into the corresponding party queue.
2. Loop while both `!qr.isEmpty()` and `!qd.isEmpty()` (both parties still have active voters).
3. Compare `qr.peek()` and `qd.peek()`: the senator with the smaller turn index acts first and greedily bans the opponent at the front of the other queue.
4. Re-enqueue the winning senator for the next round with turn index `peek() + n`, then `poll()` both queues (removing the winner's current turn and permanently deleting the banned loser).
5. Once one queue becomes empty, return `"Dire"` if `qr.isEmpty()`, otherwise `"Radiant"`.

### Algorithm / Intuition

At any point in `predictPartyVictory`, `qr` and `qd` hold the upcoming turn timestamps of all surviving Radiant and Dire senators in strictly increasing order.

When we compare `r = qr.peek()` and `d = qd.peek()`, whichever timestamp is smaller is the very next senator to speak in the simulation, and the front of the opposing queue is the **nearest upcoming enemy** on the circular timeline! Adding `n` (`qr.offer(qr.peek() + n)`) places the acting senator behind everyone who still hasn't acted in the current round, preserving exact round-robin order in `O(1)` time.

---

## Dry Run

Tracing `senate = "RDD"` (`n = 3`), and briefly Example 1 (`"RD"`):

- **Example 1 (`senate = "RD"`, `n = 2`):**
  - Init: `qr = [0]`, `qd = [1]`.
  - Step 1: `qr.peek() (0) < qd.peek() (1)` -> `R` bans `D`, `qr.offer(0 + 2)` -> after `poll()` both: `qr = [2]`, `qd = []`.
  - `qd` is empty -> returns `"Radiant"`.
- **Example 2 (`senate = "RDD"`, `n = 3`):**
  - Init: `qr = [0]`, `qd = [1, 2]`.
  - Step 1: `0 < 1` -> `R(0)` bans `D(1)`, re-queues at `0 + 3 = 3` -> `qr = [3]`, `qd = [2]`.
  - Step 2: `qr.peek() (3) > qd.peek() (2)` -> `D(2)` acts in Round 1, bans `R(3)`, re-queues at `2 + 3 = 5` -> `qr = []`, `qd = [5]`.
  - `qr` is empty -> returns `"Dire"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Populating the queues takes `O(n)` time, and every `while` iteration permanently eliminates one senator (`qr.size() + qd.size()` shrinks by `1`), so at most `n` iterations occur at `O(1)` each.
- **Space Complexity:** `O(n)` — `qr` and `qd` together hold at most `n` integer indices at any time.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [649dota2-senate.java](./649dota2-senate.java) |

---

## Key Learnings

- Adding `+ n` to queue indices is a powerful pattern for modeling cyclic/round-robin turn order without explicit round loops or modulo wrap-around searches.
- In elimination games, greedy "ban the next immediate threat" works because future turns are symmetric within a party, making earlier turns strictly more valuable than later ones.
- Bounding loop iterations via a potential function (total active senators decreases by `1` every step) immediately proves `O(n)` time even though winners get re-pushed into the queue.
