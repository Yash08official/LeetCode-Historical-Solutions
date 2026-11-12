---
comments: true
difficulty: Hard
tags:
  - Dynamic Programming
  - Heuristic Search
---

# 818. Race Car

**[View Problem on LeetCode](https://leetcode.com/problems/race-car/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0818` (`818`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Dynamic Programming`, `Heuristic Search` |
| **Solution Language** | Java |

---

## Problem Description

Your car starts at position `0` and speed `+1` on an infinite number line. Your car can go into negative positions. Your car drives automatically according to a sequence of instructions `'A'` (accelerate) and `'R'` (reverse):

- `'A'`: `position += speed`, `speed *= 2`.
- `'R'`: `speed = speed > 0 ? -1 : 1` (position unchanged).

Given a target position `target`, return the length of the shortest sequence of instructions to reach `target`.

---

## Problem Understanding

- Taking $k$ consecutive accelerates reaches position $2^k - 1$ in $k$ steps.
- If $target = 2^k - 1$, the optimal answer is simply $k$ instructions (`A` $	imes k$).
- Otherwise, for any arbitrary target $i$, let $k$ be the number of bits such that $2^{k-1} - 1 < i < 2^k - 1$. There are two strategic choices:
  1. **Overshoot:** Accelerate $k$ times to $2^k - 1$, reverse (`R`), and then solve the subproblem to reach the target from behind ($2^k - 1 - i$).
     Cost: $k + 1 + dp[(2^k - 1) - i]$.
  2. **Undershoot:** Accelerate $k - 1$ times to $2^{k-1} - 1$, reverse (`R`), accelerate backward $j$ times ($0 \le j < k - 1$), reverse again (`R`) to face forward, and recursively reach the remaining distance.
     Cost: $(k - 1) + 1 + j + 1 + dp[i - (2^{k-1} - 1) + (2^j - 1)]$.

---

## Approach

### 1D Dynamic Programming

1. Initialize `dp[target + 1]`.
2. For each distance $i$ from 1 to `target`:
   - Determine $k$ as the bit length of $i$ (`32 - Integer.numberOfLeadingZeros(i)`).
   - If $i == 2^k - 1$, set `dp[i] = k`.
   - Otherwise, initialize `dp[i] = dp[(1 << k) - 1 - i] + k + 1` (overshoot strategy).
   - Loop over all valid reverse steps $j \in [0, k-1)$ (undershoot strategy) and minimize:
     `dp[i] = Math.min(dp[i], dp[i - (1 << (k - 1)) + (1 << j)] + k - 1 + j + 2)`.
3. Return `dp[target]`.

---

## Complexity Analysis

- **Time Complexity:** $O(	ext{target} \cdot \log(	ext{target}))$ — For each $i \le 	ext{target}$, the inner loop runs at most $\log_2(i)$ times.
- **Space Complexity:** $O(	ext{target})$ for the DP memoization table.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [818race-car.java](./818race-car.java) |

---

## Key Learnings

- Analyzing motion bounds reveals that optimal trajectories never overshoot beyond the next power-of-two position.
- Breaking decisions into overshoot vs. undershoot transforms an infinite state graph into clean 1D dynamic programming.
