---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
  - Stack
  - Breadth-First Search
  - Memoization
---

# 488. Zuma Game

**[View Problem on LeetCode](https://leetcode.com/problems/zuma-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0488` (`488`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Stack`, `Breadth-First Search`, `Memoization` |
| **Solution Language** | Java |

---

## Problem Description

In this single-row variation of **Zuma**, `board` represents an initial row of colored balls (`'R'`, `'Y'`, `'B'`, `'G'`, `'W'`), and `hand` represents the balls available for you to shoot.

On each turn, you choose one ball from `hand` and insert it anywhere into `board` (between adjacent balls or at either end). Whenever **3 or more consecutive balls of the same color** exist on the board, that entire contiguous group disappears immediately—potentially causing remaining neighbors to touch and trigger cascading removals until no group of `>= 3` identical balls remains.

Return the **minimum number of balls** you must insert to completely clear `board`, or `-1` if clearing the board is impossible.

---

## Examples

### Example 1

```text
Input: board = "WRRBBW", hand = "RB"
Output: -1
Explanation: It is impossible to clear all the balls. The best you can do is:
- Insert 'R' so the board becomes WRRRBBW. WRRRBBW -> WBBW.
- Insert 'B' so the board becomes WBBBW. WBBBW -> WW.
There are still balls remaining on the board, and you are out of balls to insert.
```

### Example 2

```text
Input: board = "WWRRBBWW", hand = "WRBRW"
Output: 2
Explanation: To make the board empty:
- Insert 'R' so the board becomes WWRRRBBWW. WWRRRBBWW -> WWBBWW.
- Insert 'B' so the board becomes WWBBBWW. WWBBBWW -> WWWW -> empty.
2 balls from your hand were needed to clear the board.
```

### Example 3

```text
Input: board = "G", hand = "GGGGG"
Output: 2
Explanation: To make the board empty:
- Insert 'G' so the board becomes GG.
- Insert 'G' so the board becomes GGG. GGG -> empty.
2 balls from your hand were needed to clear the board.
```

---

## Constraints

- `1 <= board.length <= 16`

- `1 <= hand.length <= 5`

- `board` and `hand` consist of the characters `'R'`, `'Y'`, `'B'`, `'G'`, and `'W'`.

- The initial row of balls on the board will **not** have any groups of three or more consecutive balls of the same color.

---

## Problem Understanding

- **Shortest-path nature:** Because each turn inserts `1` ball and we want the **minimum** turns to reach an empty board, level-by-level **Breadth-First Search (BFS)** guarantees the first empty board discovered uses the fewest balls.
- **Compact bitmask encoding:** Only 5 colors exist (`1..5`, with `0` marking empty slots), requiring `3` bits per ball. Since `board.length <= 16` (`48` bits, or `51` bits during a single-ball insertion) and `hand.length <= 5` (`15` bits), both `board` and `hand` pack cleanly into 64-bit `long` primitives!
- **Subtle Zuma splitting rule:** Sometimes you *cannot* clear a board by only matching same-colored balls—you must insert a *different*-colored ball between two identical balls (e.g. turning `RR` into `R W R`) so that once `W` is cleared later, the separated `R`s reunite cleanly or avoid premature collapse!

---

## Approach

### Brute Force Approach

Trying every permutation of `hand` (`5!`) and inserting into every position (`<= 17` slots per step) using `String` concatenation and repeated regex/substring passes allocates thousands of intermediate `String` objects and explores symmetric duplicate states, easily timing out.

### Optimized Approach

Use **Bit-Packed Level-Order BFS with Neighbor Pruning (`record Zuma(long board, long hand)`)**: encode each ball in 3 bits inside `long` integers, deduplicate hand choices via sorting, prune unproductive insertions in `pruningCheck`, and resolve cascading collapses in `updateBoard` via a bit-level stack.

### Step-by-Step Thinking Process

1. Encode colors `'R', 'G', 'B', 'W', 'Y'` into 3-bit integers `1..5` (`0` = empty). Pack `board` directly into a `long`, and sort `hand` before packing so duplicate colors in `hand` sit side by side.
2. Run recursive level-by-level `bfs(curr, k, visited)` where `k` is the number of balls used so far and `visited` (`HashSet<Long>`) memoizes seen `board` bitmasks.
3. To expand a `Zuma` state in `getNextLevel`, `buildHandList()` extracts each *distinct* ball color in `hand` paired with the remaining hand bitmask, while `buildBoardList()` prepares bitmasks with a 3-bit gap shifted open at every slot `0 .. size - 1`.
4. Apply `pruningCheck(insBoard, ball, pos, depth)` inspecting left neighbor `L` and right neighbor `R`: only allow inserting `ball` when `ball == R` (extending/matching a color without trying both ends of the same run) OR, on the initial move (`depth == 0`), `L == R` (splitting an adjacent identical pair).
5. Simulate chain-reaction collapses in `updateBoard(rawBoard)` using a 64-bit `stack` (3 bits per slot): whenever the incoming ball `curr` differs from `top` and the top 3 slots of `stack` match (`(stack & 0x3F) == ((stack >> 3) & 0x3F)`), pop those 3 balls (`stack >>= 9`) plus a 4th matching ball if present (`if ((stack & 0x7) == top) stack >>= 3`). If `nextBoard == 0`, return `null` to signal victory in `k + 1` steps!

### Algorithm / Intuition

Every operation in `record Zuma(long board, long hand)` runs in register-level bit arithmetic without allocating strings:
- **3-bit packing (`encode`):** Shifting by `3` bits (`stateBits << 3`) stores up to 21 balls in one signed 64-bit `long`.
- **Hand deduplication (`buildHandList`):** Because `hand` was sorted at creation, comparing `currBall != prevBall` skips duplicate hand colors in one pass, and bitmask `((this.hand >> 3) & ~ballMask) | (this.hand & ballMask)` excises the chosen 3-bit slot.
- **Bit-stack chain collapse (`updateBoard`):** Reading `board` 3 bits at a time (`curr`), before pushing `curr` (including the terminating `curr == 0` sentinel!), it checks whether `curr != top` and the top 3 balls on `stack` have identical colors: `(stack & 0x3F) == ((stack >> 3) & 0x3F)` verifies `slot0 == slot1` and `slot1 == slot2` simultaneously! Popping them before pushing `curr` naturally handles cascading merges when `curr` then matches the newly exposed `stack` top.
- **Terminal & dead-end handling:** In `getNextLevel`, `nextBoard == 0` returns `null` so `bfs` immediately returns `k + 1`; if `pair[1] == 0` (no balls left in hand) and `nextBoard != 0`, that state cannot make further moves and is skipped.

---

## Dry Run

Tracing **Example 1** with `board = "WRRBBW"`, `hand = "RB"`:

1. **Initialization (`k = 0`):** `Zuma.create` encodes `board` (`WRRBBW`) and sorted `hand` (`BR`). `visited` stores `WRRBBW`.
2. **Level `k = 0` (`getNextLevel`):**
   - `buildHandList` produces `('R', hand="B")` and `('B', hand="R")`.
   - Using `'R'` (`hand="B"`): inserting next to `'R'` forms `WRRRBBW` -> `updateBoard` pops `RRR` -> `WBBW` (`!= 0`), added to `next` as `Zuma(WBBW, B)`. Also at `depth == 0`, splitting `BB` (`L == R == 'B'`) forms `WRRBRBW`, added as `Zuma(WRRBRBW, B)`.
   - Using `'B'` (`hand="R"`): inserting next to `'B'` forms `WRRBBBW` -> `updateBoard` pops `BBB` -> `WRRW`, added as `Zuma(WRRW, R)`, plus split state `Zuma(WRBRBBW, R)`.
3. **Level `k = 1`:**
   - Expanding `Zuma(WBBW, B)` inserts `'B'` -> `WBBBW` -> `updateBoard` collapses `BBB` -> `WW` (`nextBoard != 0`). Remaining hand `pair[1] == 0`, so `if (pair[1] == 0 || ...) continue;` drops it.
   - Expanding `Zuma(WRRW, R)` similarly collapses to `WW` with `pair[1] == 0`, and the split states also leave non-empty boards with `pair[1] == 0`.
   - `next` is empty.
4. **Level `k = 2`:** `curr.isEmpty()` is `true` -> `bfs` returns `-1`.

---

## Complexity Analysis

- **Time Complexity:** `O(S * H * B^2)` — Where `B <= 16` is the board length, `H <= 5` is the hand size, and `S` is the number of distinct pruned reachable board bitmasks; each transition performs `O(B)` bit shifts inside `updateBoard` across `O(H * B)` candidate insertions.
- **Space Complexity:** `O(S)` — For the `visited` `HashSet<Long>` and BFS frontier lists `curr` and `next`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [488zuma-game.java](./488zuma-game.java) |

---

## Key Learnings

- Packing small-alphabet bounded sequences (`length <= 16`, `5` symbols -> 3 bits/symbol) into 64-bit `long` primitives eliminates string allocation overhead and speeds up hashing/equality checks dramatically.
- Checking `(stack & 0x3F) == ((stack >> 3) & 0x3F)` is a slick bitwise trick to verify three adjacent `k`-bit fields are equal (`a == b && b == c`) in a single comparison.
- In Zuma, pruning must still permit inserting a different-colored ball *between* two same-colored balls (`L == R`), as breaking a pair can be necessary to trigger a winning chain reaction later.
