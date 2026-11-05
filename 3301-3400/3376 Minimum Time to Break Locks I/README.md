---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Backtracking
  - Bit Manipulation
  - Breadth-First Search
  - Bitmask
---

# 3376. Minimum Time to Break Locks I

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-time-to-break-locks-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3376` (`3376`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Backtracking`, `Bit Manipulation`, `Breadth-First Search`, `Bitmask` |
| **Solution Language** | Java |

---

## Problem Description

Bob is trapped in a dungeon and must break `n` locks to escape. The energy required to break the `i`-th lock is given by `strength[i]`.

Bob accumulates energy at a rate of `X` energy units per minute. Initially, Bob has `0` energy and `X = 1`.

Rules for breaking locks:
1. Bob waits until his accumulated energy is greater than or equal to `strength[i]`.
2. To break lock `i` at the current rate `X`, it takes `ceil(strength[i] / X)` minutes.
3. Once lock `i` is broken, Bob's accumulated energy resets to `0`, and his rate increases by `K`: `X = X + K`.

Bob can break the locks in any order. Return the minimum total time (in minutes) required to break all `n` locks.

---

## Examples

### Example 1

**Input:** `strength = [3,4,1], k = 1`

**Output:** `4`

**Explanation:**

			Time
			Energy
			x
			Action
			Updated x

			0
			0
			1
			Nothing
			1

			1
			1
			1
			Break 3^rd Lock
			2

			2
			2
			2
			Nothing
			2

			3
			4
			2
			Break 2^nd Lock
			3

			4
			3
			3
			Break 1^st Lock
			3

The locks cannot be broken in less than 4 minutes; thus, the answer is 4.

### Example 2

**Input:** `strength = [2,5,4], k = 2`

**Output:** `5`

**Explanation:**

			Time
			Energy
			x
			Action
			Updated x

			0
			0
			1
			Nothing
			1

			1
			1
			1
			Nothing
			1

			2
			2
			1
			Break 1^st Lock
			3

			3
			3
			3
			Nothing
			3

			4
			6
			3
			Break 2^n^d Lock
			5

			5
			5
			5
			Break 3^r^d Lock
			7

The locks cannot be broken in less than 5 minutes; thus, the answer is 5.

---

## Constraints

- `n == strength.length`

- `1 <= n <= 8`

- `1 <= k <= 10`

- `1 <= strength[i] <= 10^6`

---

## Problem Understanding

- **Small Constraints (`n <= 8`):** Since `n` is at most 8, the total number of permutations of lock orders is `8! = 40,320`, making bitmask dynamic programming or brute-force permutation search feasible.
- **State Representation:** The subset of locks already broken can be captured by a bitmask of length `n` (`0 <= mask < 2^n`).
- **Energy Rate Determinism:** After breaking `c` locks, Bob's energy rate is always `X = 1 + c * K`. Since `c` is simply the number of set bits in `mask` (`Integer.bitCount(mask)`), `X` is uniquely determined by `mask`.
- **Transition:** From state `mask`, we can choose any unbroken lock `i` (`(mask & (1 << i)) == 0`). The time needed is `ceil(strength[i] / X)`, and the next state is `mask | (1 << i)` with rate `X + K`.
- **Base Case:** When all locks are broken (`mask == (1 << n) - 1`), the remaining time is 0.

---

## Approach

### Brute Force Approach

Generating all `n!` permutations of lock orders and computing the total time for each takes `O(n! * n)` time. For `n = 8`, `8! * 8 = 40,320 * 8 = 322,560` operations, which easily runs within time limits. Bitmask DP optimizes this further by caching subproblem results.

### Optimized Approach

We implement top-down dynamic programming with memoization table `memo[1 << n][100]`. Function `dp(mask, X)` checks if all locks are broken (`mask == (1 << n) - 1`); if so, it returns 0. If `memo[mask][X] != -1`, it returns the cached result. Otherwise, it loops through all `n` locks: for each unbroken lock `i`, it calculates time `t = ceil(strength[i] / X)` and recursively calls `t + dp(mask | (1 << i), X + K)`. It memoizes and returns the minimum total time.

### Step-by-Step Thinking Process

1. Since `n <= 8`, state can be encoded as a bitmask of broken locks.
2. At rate `X`, the time to accumulate `strength[i]` energy is `ceil(strength[i] / X)`.
3. After breaking lock `i`, the new rate is `X + K` and lock `i` is added to the mask.
4. Define `dp(mask, X)`: minimum time to break remaining locks given current broken mask and rate `X`.
5. Memoize states in a 2D array `memo[1 << n][100]` initialized to -1.
6. Base case: `mask == (1 << n) - 1 -> return 0`.
7. Return `dp(0, 1)`.

### Algorithm / Intuition

In `Solution.findMinimumTime`: `strength` and `K` are assigned to instance fields, and `memo` table of dimension `[1 << n][100]` is filled with `-1`. Function `dp(mask, X)` iterates through `i = 0` to `n - 1`. If `(mask & (1 << i)) == 0`, lock `i` is available. The time required is computed using `long t = (long) Math.ceil((double) strength.get(i) / X)`. The transition tries breaking lock `i` next: `totalTime = t + dp(mask | (1 << i), X + K)`. Taking the minimum over all available locks finds the optimal sequence. The starting call `dp(0, 1)` begins with no locks broken and initial rate `X = 1`.

---

## Dry Run

### Step-by-Step Execution on Example 1: `strength = [3, 4, 1]`, `K = 1`, `n = 3`

- Initial state: `mask = 0b000`, `X = 1`.
- **Option 1: Break lock 2 (`strength = 1`) first:**
  - Time: `ceil(1 / 1) = 1` minute.
  - Next state: `mask = 0b100`, `X = 1 + 1 = 2`.
  - From `0b100`, remaining locks are 0 (`str = 3`) and 1 (`str = 4`).
    - Sub-option A: Break lock 1 next: time `ceil(4 / 2) = 2` min. `X` becomes 3. Then lock 0: `ceil(3 / 3) = 1` min. Total = `1 + 2 + 1 = 4`.
    - Sub-option B: Break lock 0 next: time `ceil(3 / 2) = 2` min. `X` becomes 3. Then lock 1: `ceil(4 / 3) = 2` min. Total = `1 + 2 + 2 = 5`.
- **Option 2: Break lock 0 first (`strength = 3`):**
  - Time: `ceil(3 / 1) = 3`. Next `X = 2`. Break lock 2: `ceil(1 / 2) = 1`. Then lock 1: `ceil(4 / 3) = 2`. Total = `3 + 1 + 2 = 6`.
- **Option 3: Break lock 1 first (`strength = 4`):**
  - Time: `ceil(4 / 1) = 4 > 4`. Inferior.
- Optimal sequence: Break lock 2 (1 min) -> lock 1 (2 min) -> lock 0 (1 min). Total time = 4 minutes.

---

## Complexity Analysis

- **Time Complexity:** `O(n * 2^n)` — There are `2^n` mask states. For each state, we iterate over `n` possible locks. With `n = 8`, `8 * 256 = 2048` operations.
- **Space Complexity:** `O(2^n * (1 + n * K))` — The 2D memoization table `memo[1 << n][100]` requires `O(2^n * 100)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3376minimum-time-to-break-locks-i.java](./3376minimum-time-to-break-locks-i.java) |

---

## Key Learnings

- Small problem sizes (`n <= 8`) are a strong signal for bitmask dynamic programming or permutation search.
- Rate acceleration after each action creates dependencies where earlier fast completions benefit all future steps.
