---
comments: true
difficulty: Easy
tags:
  - Math
  - Dynamic Programming
  - Memoization
---

# 70. Climbing Stairs

**[View Problem on LeetCode](https://leetcode.com/problems/climbing-stairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0070` (`70`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Memoization` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are standing at the base of a staircase that has `n` steps to the top. On every move, you may climb either `1` step or `2` steps. Determine and return the total number of distinct step sequences that reach step `n`.

---

## Examples

### Example 1

```text
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

### Example 2

```text
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

---

## Constraints

- `1 <= n <= 45`

---

## Problem Understanding

- Reaching step `k` requires your final move to come from either step `k - 1` (via a 1-step hop) or step `k - 2` (via a 2-step hop).
- Because those two final moves are mutually exclusive and cover every valid sequence, the recurrence is `ways(k) = ways(k - 1) + ways(k - 2)`, which mirrors the Fibonacci sequence.
- With `1 <= n <= 45`, `ways(45) = 1,836,311,903`, which fits comfortably inside a standard 32-bit signed integer and JavaScript `Number` (`Number.MAX_SAFE_INTEGER` is `2^53 - 1`).

---

## Approach

### Brute Force Approach

A direct unmemoized recursive function `climb(n) = climb(n - 1) + climb(n - 2)` recomputes overlapping subproblems exponentially many times, resulting in `O(2^n)` time complexity and `O(n)` call-stack depth — far too slow once `n` approaches `45`.

### Optimized Approach

Use bottom-up iterative Dynamic Programming with two rolling variables (`a` and `b`) to compute Fibonacci-style step counts in `O(n)` time and `O(1)` extra space.

### Step-by-Step Thinking Process

1. Observe that any path to step `i + 1` is formed by appending `1` step to a path ending at `i`, or appending `2` steps to a path ending at `i - 1`.
2. Instead of allocating an array `dp[0..n]`, notice that computing the next count only requires the previous two counts.
3. Initialize `a = 0` and `b = 1` so the first iteration (`i = 0`) produces `c = 0 + 1 = 1` way for `n = 1`, and the second iteration (`i = 1`) produces `c = 1 + 1 = 2` ways for `n = 2`.
4. Loop `n` times, advancing the sliding two-state window `(a, b) -> (b, a + b)`, and return `b`.

### Algorithm / Intuition

In `climbStairs(n)`, variables `a` and `b` act as a rolling two-element DP state initialized to `a = 0` and `b = 1`. On each iteration `i` from `0` to `n - 1`:
- `const c = a + b;` computes the next Fibonacci number.
- `a = b;` shifts the previous current state back by one step.
- `b = c;` advances `b` to hold the number of distinct ways to climb `i + 1` steps.

Let's verify the alignment: after `1` iteration (`n = 1`), `b = 1`; after `2` iterations (`n = 2`), `b = 2`; after `3` iterations (`n = 3`), `b = 3`. Thus after all `n` iterations finish, `b` stores the exact count for `n` steps.

---

## Dry Run

Tracing Example 1 with `n = 2`:

- **Initial state:** `a = 0`, `b = 1`
- **Iteration `i = 0`:**
  - `c = a + b = 0 + 1 = 1`
  - `a = 1`, `b = 1` (ways to reach step `1` = `1`)
- **Iteration `i = 1`:**
  - `c = a + b = 1 + 1 = 2`
  - `a = 1`, `b = 2` (ways to reach step `2` = `2`)
- **Loop ends (`i = 2`):** Return `b = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The `for` loop executes `n` iterations, performing constant-time addition and variable assignments in each step.
- **Space Complexity:** `O(1)` — Only three scalar variables (`a`, `b`, `c`) are used regardless of `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [70climbing-stairs.js](./70climbing-stairs.js) |

---

## Key Learnings

- Combinatorial path-counting problems where each move depends on a fixed number of preceding states naturally reduce to linear recurrences.
- Space optimization from a 1D DP array `O(n)` down to `O(1)` rolling variables works whenever `dp[i]` depends only on a constant number of recent states (`dp[i - 1]` and `dp[i - 2]`).
- Seeding `(a, b) = (0, 1)` lets a uniform `0 .. n - 1` loop handle `n = 1` and larger `n` without special-case `if` branches.
