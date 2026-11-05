---
comments: true
difficulty: Hard
tags:
  - Array
  - Greedy
---

# 517. Super Washing Machines

**[View Problem on LeetCode](https://leetcode.com/problems/super-washing-machines/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0517` (`517`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You have `n` super washing machines on a line. Initially, each washing machine has some dresses or is empty.

For each move, you could choose any `m` (`1 <= m <= n`) washing machines, and pass one dress of each washing machine to one of its adjacent washing machines at the same time.

Given an integer array `machines` representing the number of dresses in each washing machine from left to right on the line, return *the minimum number of moves to make all the washing machines have the same number of dresses*. If it is not possible to do it, return `-1`.

---

## Examples

### Example 1

```text
Input: machines = [1,0,5]
Output: 3
Explanation:
1st move:    1     0 <-- 5    =>    1     1     4
2nd move:    1 <-- 1 <-- 4    =>    2     1     3
3rd move:    2     1 <-- 3    =>    2     2     2
```

### Example 2

```text
Input: machines = [0,3,0]
Output: 2
Explanation:
1st move:    0 <-- 3     0    =>    1     2     0
2nd move:    1     2 --> 0    =>    1     1     1
```

### Example 3

```text
Input: machines = [0,2,0]
Output: -1
Explanation:
It's impossible to make all three washing machines have the same number of dresses because total dresses = 2 cannot be divided equally among 3 machines.
```

---

## Constraints

- `n == machines.length`
- `1 <= n <= 10^4`
- `0 <= machines[i] <= 10^5`

---

## Problem Understanding

- **Even divisibility requirement:** If the total sum of dresses `s` across all `n` machines is not evenly divisible by `n` (`s % n != 0`), it is impossible to equalize them, so return `-1`.
- **Target dresses per machine:** `k = s / n`. Each machine needs a net change of `machines[i] - k`.
- **Bottleneck constraints:**
  1. **Net cross-boundary flow:** For any prefix `0..i`, the cumulative surplus or deficit `s = sum(machines[0..i] - k)` must flow across the boundary between machine `i` and machine `i + 1`. Since at most 1 dress can cross that boundary per move, `|s|` moves are strictly required.
  2. **Single machine export bottleneck:** A machine can pass at most 1 dress per move (either to the left OR to the right, but NOT both in the same step). Therefore, if a machine has a surplus `x = machines[i] - k > 0`, it needs at least `x` moves solely to offload its excess dresses.

---

## Approach

### Brute Force Approach

Simulating the step-by-step movement of dresses across the array requires determining optimal transfer directions at each round, which leads to exponential combinations and complex flow networks.

### Optimized Approach (Greedy / Prefix Sum Bottleneck Analysis)

1. Compute the sum `s` of all dresses. If `s % n != 0`, return `-1`.
2. Target per machine: `k = s / n`.
3. Maintain running cumulative surplus `s = 0` and running maximum answer `ans = 0`.
4. Iterate through each machine `x = machines[i]`:
   - Compute its individual net balance: `x = x - k`.
   - Update the prefix balance: `s += x`.
   - The minimum moves required is bounded from below by both:
     - `|s|`: Net dresses that must flow across the partition between index `i` and `i + 1`.
     - `x`: Dresses that this specific machine must export (if `x > 0`).
   - Update `ans = max(ans, max(|s|, x))`.
5. Return `ans`.

### Step-by-Step Thinking Process

1. Total sum check: If `sum % n != 0`, immediately return `-1`.
2. Convert each machine count to its relative difference `x - k`.
3. Running prefix sum `s` tracks net flux across cut `i | i+1`.
4. A machine with surplus `x > 0` cannot offload left and right concurrently in one step, so `x` moves are required.
5. Taking the maximum across all cuts and machines yields the exact minimum moves needed.

### Algorithm / Intuition

Because multiple non-conflicting transfers can occur simultaneously in one move across independent machines, the global minimum move count is strictly dictated by the single tightest local bottleneck in the entire line. That bottleneck is either the maximum net volume crossing any line divider (`|s|`) or the maximum single-machine outgoing throughput (`x`).

---

## Dry Run

Tracing **Example 1**: `machines = [1, 0, 5]`, `n = 3`.
1. `s = 1 + 0 + 5 = 6`. `s % 3 == 0`. Target `k = 6 / 3 = 2`.
2. Initial: `s = 0`, `ans = 0`.
3. **Machine 0 (`val = 1`):**
   - `x = 1 - 2 = -1`
   - `s = 0 + (-1) = -1`
   - `ans = max(0, max(|-1|, -1)) = max(0, 1) = 1`
4. **Machine 1 (`val = 0`):**
   - `x = 0 - 2 = -2`
   - `s = -1 + (-2) = -3`
   - `ans = max(1, max(|-3|, -2)) = max(1, 3) = 3`
5. **Machine 2 (`val = 5`):**
   - `x = 5 - 2 = 3`
   - `s = -3 + 3 = 0`
   - `ans = max(3, max(|0|, 3)) = max(3, 3) = 3`
6. Output: `3`. Matches Example 1 output.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single pass calculates total dresses, followed by a second single pass computing prefix flows and updating the bottleneck maximum.
- **Space Complexity:** `O(1)` — Only a few primitive scalar variables (`n`, `s`, `k`, `ans`, `x`) are used without allocating additional memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [517super-washing-machines.java](./517super-washing-machines.java) |

---

## Key Learnings

- Multi-agent coordination problems on a 1D line can often be solved by identifying the maximum bottleneck cut rather than simulating individual step trajectories.
- Directional transfer limits (passing at most 1 item per step out of a single source) create node bottlenecks `x`, while segment partitions create cut bottlenecks `|s|`.
- When all local lower bounds can be matched without introducing deadlocks, the maximum of all lower bounds is the exact optimal solution.
