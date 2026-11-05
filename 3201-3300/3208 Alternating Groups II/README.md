---
comments: true
difficulty: Medium
tags:
  - Array
  - Sliding Window
---

# 3208. Alternating Groups II

**[View Problem on LeetCode](https://leetcode.com/problems/alternating-groups-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3208` (`3208`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

There is a circle of red and blue tiles represented by an integer array `colors` and an integer `k`. A value of `colors[i] == 0` represents a red tile, and `colors[i] == 1` represents a blue tile.

An alternating group is defined as a contiguous sequence of `k` tiles in the circle where adjacent tiles alternate in color (each tile has a different color from its neighbors).

Because the tiles form a circle, tile `colors[n - 1]` is adjacent to tile `colors[0]`. Return the total number of distinct alternating groups of size `k`.

---

## Examples

### Example 1

**Input:** `colors = [0,1,0,1,0], k = 3`

**Output:** `3`

**Explanation:**

Alternating groups:

### Example 2

**Input:** `colors = [0,1,0,0,1,0,1], k = 6`

**Output:** `2`

**Explanation:**

Alternating groups:

### Example 3

**Input:** `colors = [1,1,0,1], k = 4`

**Output:** `0`

**Explanation:**

---

## Constraints

- `3 <= colors.length <= 10^5`

- `0 <= colors[i] <= 1`

- `3 <= k <= colors.length`

---

## Problem Understanding

- **Circular Contiguity:** A contiguous sequence of `k` elements can wrap around from the end of `colors` to the beginning. We can conceptually view the array extended to length `2 * n` using modular indexing `i % n`.
- **Alternating Condition:** A block of `k` tiles is alternating if and only if every adjacent pair within the block satisfies `colors[j] != colors[j - 1]`.
- **Window Counting:** If we maintain a running count `cnt` of consecutive alternating tiles, every time `cnt >= k`, the window of size `k` ending at the current position is a valid alternating group.
- To count all distinct starting positions without duplicate counting, we evaluate `i` up to `2 * n - 1` and only increment our answer for windows ending in the second cycle (`i >= n`).

---

## Approach

### Brute Force Approach

For each of the `n` possible starting indices `0 <= start < n`, check whether the `k - 1` consecutive pairs `colors[(start + j) % n] != colors[(start + j + 1) % n]` hold. Checking each of the `n` windows takes `O(k)` time, leading to an overall time complexity of `O(n * k)`. With `n, k <= 10^5`, `O(n * k)` can take up to `10^10` operations, resulting in Time Limit Exceeded.

### Optimized Approach

We simulate a sliding scan over `2 * n` steps using a single counter `cnt`. We initialize `cnt = 0` and `ans = 0`. At each step `i` from `0` to `2 * n - 1`, if `i > 0` and `colors[i % n] == colors[(i - 1) % n]`, the alternation is broken, so `cnt` resets to `1`. Otherwise, `cnt` increments by `1`. Whenever `i >= n` and `cnt >= k`, the group of `k` tiles ending at `i % n` is alternating, so we add `1` to `ans`. This guarantees each group is counted exactly once.

### Step-by-Step Thinking Process

1. Unwrapping a circular array of size `n` means we can process indices `0` through `2 * n - 1` using `i % n`.
2. Instead of checking all pairs in every window of size `k`, track the current run length `cnt` of alternating adjacent elements.
3. When `colors[i % n] == colors[(i - 1) % n]`, the alternating streak resets: `cnt = 1`. Otherwise, the streak continues: `++cnt`.
4. When does a streak represent a full alternating window? When `cnt >= k`.
5. To avoid double-counting windows and ensure the circular wrap is properly warmed up, count valid groups only when `i >= n`.
6. Since each index `i` from `n` to `2 * n - 1` corresponds to a unique ending tile `i % n`, every valid window of size `k` is counted exactly once.

### Algorithm / Intuition

In `Solution.numberOfAlternatingGroups`: `n` is `colors.length`. The loop runs for `i < (n << 1)` (i.e. `2 * n`). For `i = 0`, `cnt` becomes 1. For each subsequent step `i > 0`, the current tile `colors[i % n]` is compared to the previous tile `colors[(i - 1) % n]`. If they are equal, the alternating property fails, so `cnt = 1`; otherwise, `++cnt`. The condition `ans += i >= n && cnt >= k ? 1 : 0` checks if we have completed at least one full cycle (`i >= n`) and whether the current alternating chain has length at least `k`. Because `i` covers `[n, 2 * n - 1]`, each index `i % n` from `0` to `n - 1` is evaluated exactly once as the right endpoint of a window.

---

## Dry Run

### Step-by-Step Execution on Example 1: `colors = [0, 1, 0, 1, 0]`, `k = 3`, `n = 5`

Loop runs `i` from 0 to 9 (`2 * n - 1`):

| `i` | `i % n` | `colors[i % n]` | Equal to prev? | `cnt` | `i >= n && cnt >= 3` | `ans` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | 0 | 0 | - | 1 | No (`i < 5`) | 0 |
| 1 | 1 | 1 | No | 2 | No (`i < 5`) | 0 |
| 2 | 2 | 0 | No | 3 | No (`i < 5`) | 0 |
| 3 | 3 | 1 | No | 4 | No (`i < 5`) | 0 |
| 4 | 4 | 0 | No | 5 | No (`i < 5`) | 0 |
| 5 | 0 | 0 | Yes (`c[0]==c[4]==0`) | 1 | No (`cnt < 3`) | 0 |
| 6 | 1 | 1 | No | 2 | No (`cnt < 3`) | 0 |
| 7 | 2 | 0 | No | 3 | Yes | 1 |
| 8 | 3 | 1 | No | 4 | Yes | 2 |
| 9 | 4 | 0 | No | 5 | Yes | 3 |

Final `ans = 3`. The three valid alternating groups of size 3 are indices `[0,1,2]`, `[1,2,3]`, and `[2,3,4]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The loop executes exactly `2 * n` iterations, performing `O(1)` constant-time comparisons and arithmetic operations per step.
- **Space Complexity:** `O(1)` — Only scalar variables (`n`, `ans`, `cnt`, `i`) are used, requiring no extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3208alternating-groups-ii.java](./3208alternating-groups-ii.java) |

---

## Key Learnings

- Circular array problems can often be unwrapped by iterating up to `2 * n` with modulo indexing `i % n`.
- Tracking a continuous run length avoids re-evaluating full `k`-length windows from scratch, transforming an `O(n * k)` problem into an `O(n)` scan.
