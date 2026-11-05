---
comments: true
difficulty: Hard
tags:
  - Dynamic Programming
---

# 552. Student Attendance Record II

**[View Problem on LeetCode](https://leetcode.com/problems/student-attendance-record-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0552` (`552`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:
- `'A'`: Absent.
- `'L'`: Late.
- `'P'`: Present.

Any student is eligible for an attendance award if they meet **both** of the following criteria:
1. The student was absent (`'A'`) for **strictly fewer than 2 days total**.
2. The student was **never** late (`'L'`) for **3 or more consecutive days**.

Given an integer `n`, return *the number of possible attendance records of length `n` that make a student eligible for an attendance award*. The answer may be very large, so return it **modulo `10^9 + 7`**.

---

## Examples

### Example 1

```text
Input: n = 2
Output: 8
Explanation:
There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
```

### Example 2

```text
Input: n = 1
Output: 3
Explanation:
The valid records of length 1 are "P", "A", and "L". All 3 are eligible.
```

### Example 3

```text
Input: n = 10101
Output: 183236316
```

---

## Constraints

- `1 <= n <= 10^5`

---

## Problem Understanding

- Characters allowed: `'P'`, `'A'`, `'L'`.
- Rule 1: At most 1 `'A'` in the entire record of length `n` (i.e. count of `'A'` $\in \{0, 1\}$).
- Rule 2: No `'LLL'` substring anywhere (i.e. consecutive `'L'`s at the end of any prefix $\in \{0, 1, 2\}$).
- At day `i`, the state can be completely tracked by:
  - `j` $\in \{0, 1\}$: total number of `'A'`s seen so far.
  - `k` $\in \{0, 1, 2\}$: number of consecutive `'L'`s ending on day `i`.
- There are only $2 	imes 3 = 6$ possible valid states at each day.

---

## Approach

### Brute Force Approach

Generate all $3^n$ possible ternary strings of length `n` and filter those satisfying both conditions. For $n = 10^5$, $3^{100000}$ is astronomically large and results in Time Limit Exceeded.

### Optimized Approach (State Machine Dynamic Programming)

Define `dp[i][j][k]` as the number of valid sequences of length `i + 1` with `j` total `'A'`s and `k` consecutive ending `'L'`s modulo $10^9 + 7$:

1. **Base cases (`i = 0`, day 1):**
   - Place `'P'`: 0 absences, 0 consecutive lates -> `dp[0][0][0] = 1`.
   - Place `'L'`: 0 absences, 1 consecutive late -> `dp[0][0][1] = 1`.
   - Place `'A'`: 1 absence, 0 consecutive lates -> `dp[0][1][0] = 1`.
   - All other 3 states are `0`.

2. **Transitions for day `i` from day `i - 1`:**
   - **Appending `'P'`:** Resets consecutive `'L'` count to `0`. Keeps absence count unchanged:
     - `dp[i][0][0] = (dp[i-1][0][0] + dp[i-1][0][1] + dp[i-1][0][2]) % MOD`
     - `dp[i][1][0] += (dp[i-1][1][0] + dp[i-1][1][1] + dp[i-1][1][2]) % MOD`
   - **Appending `'L'`:** Increases consecutive `'L'` count by 1 (allowed if previous consecutive `'L'` < 2). Absence count unchanged:
     - `dp[i][0][1] = dp[i-1][0][0]`
     - `dp[i][0][2] = dp[i-1][0][1]`
     - `dp[i][1][1] = dp[i-1][1][0]`
     - `dp[i][1][2] = dp[i-1][1][1]`
   - **Appending `'A'`:** Allowed only if previous absence count was `0`. Resets consecutive `'L'` count to `0`, sets absence count to `1`:
     - `dp[i][1][0] = (dp[i-1][0][0] + dp[i-1][0][1] + dp[i-1][0][2]) % MOD`

3. **Total answer:** Sum of `dp[n - 1][j][k]` for all $j \in \{0, 1\}$ and $k \in \{0, 1, 2\}$, modulo $10^9 + 7$.

### Step-by-Step Thinking Process

1. Identify the minimal state descriptor: `(total absences j < 2, trailing consecutive lates k < 3)`.
2. Model transitions for appending `'A'`, `'L'`, or `'P'` at day `i`.
3. Apply modulo arithmetic at every addition step to prevent integer overflow.
4. Sum all 6 valid end states at index `n - 1`.

### Algorithm / Intuition

Because the validity of appending the next day depends solely on the total absences ($0$ or $1$) and the current streak of lates ($0, 1,$ or $2$), the system behaves as a 6-state Markov chain / finite automaton.

---

## Dry Run

Tracing **Example 1**: `n = 2`.
1. **Day 0 (`n = 1`):**
   - `dp[0][0][0] = 1` ("P")
   - `dp[0][0][1] = 1` ("L")
   - `dp[0][1][0] = 1` ("A")
2. **Day 1 (`n = 2`):**
   - **'A' transitions:** `dp[1][1][0] = (1 + 1 + 0) = 2` (records "PA", "LA")
   - **'L' transitions:**
     - `dp[1][0][1] = dp[0][0][0] = 1` ("PL")
     - `dp[1][0][2] = dp[0][0][1] = 1` ("LL")
     - `dp[1][1][1] = dp[0][1][0] = 1` ("AL")
     - `dp[1][1][2] = dp[0][1][1] = 0`
   - **'P' transitions:**
     - `dp[1][0][0] = (1 + 1 + 0) = 2` ("PP", "LP")
     - Add to `dp[1][1][0]`: `2 + (dp[0][1][0] + 0 + 0) = 2 + 1 = 3` (records "PA", "LA", "AP")
3. **Sum at Day 1:**
   - `j = 0`: `dp[1][0][0] (2) + dp[1][0][1] (1) + dp[1][0][2] (1) = 4` ("PP", "LP", "PL", "LL")
   - `j = 1`: `dp[1][1][0] (3) + dp[1][1][1] (1) + dp[1][1][2] (0) = 4` ("PA", "LA", "AP", "AL")
   - Total = `4 + 4 = 8`.
4. Matches Example 1 output exactly.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single loop runs `n` iterations with `6` constant-time state transitions per iteration. For $n = 10^5$, it runs in $pprox 5$ ms.
- **Space Complexity:** `O(n)` with the 3D table `dp[n][2][3]`, which can easily be optimized to `O(1)` space using two 2x3 arrays since day `i` only depends on day `i - 1`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [552student-attendance-record-ii.java](./552student-attendance-record-ii.java) |

---

## Key Learnings

- Any constraint based on bounded streaks (e.g. fewer than 3 consecutive occurrences) and bounded global counts (e.g. fewer than 2 total occurrences) maps directly to a small finite state machine.
- Explicitly separating the state by semantic attributes `[absences][trailing_lates]` makes transition equations obvious and eliminates off-by-one edge cases.
- Modulo operations must be applied during intermediate summations to prevent 64-bit integer overflow.
