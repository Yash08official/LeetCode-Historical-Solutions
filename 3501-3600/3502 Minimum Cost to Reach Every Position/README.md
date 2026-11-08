---
comments: true
difficulty: Easy
tags:
  - Array
---

# 3502. Minimum Cost to Reach Every Position

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-cost-to-reach-every-position/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3502` |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `cost` of size `n`. You are currently at position `n` (at the end of the line) in a line of `n + 1` people (numbered from `0` to `n`).

You wish to move forward in the line, but each person in front of you charges a specific amount to swap places. The cost to swap with person `i` is given by `cost[i]`.

You are allowed to swap places with people as follows:
- If they are in front of you, you must pay them `cost[i]` to swap with them.
- If they are behind you, they can swap with you for free.

Return an array `answer` of size `n`, where `answer[i]` is the **minimum total cost** to reach each position `i` in the line.

---

## Constraints

- `1 <= cost.length <= 10^5`
- `1 <= cost[i] <= 10^9`

---

## Problem Understanding

- You start at position $n$ and want to reach each target position $i \in [0, n - 1]$.
- Swapping with anyone in front costs $cost[i]$; swapping behind is free.
- To reach position $i$ with minimum cost, you simply pay the minimum cost person among the prefix $[0..i]$ and use free backward swaps.
- Hence, the answer for position $i$ is simply the prefix minimum: $\min_{0 \le j \le i} cost[j]$.

---

## Approach

### Optimized Approach (Prefix Minimum Scan)

1. Initialize running minimum `mi = cost[0]`.
2. Iterate $i$ from $0$ to $n - 1$:
   - Update `mi = Math.min(mi, cost[i])`.
   - Set `ans[i] = mi`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single linear pass over array of size $N$.
- **Space Complexity:** $O(1)$ — Beyond the result array, only a single scalar `mi` is maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3502minimum-cost-to-reach-every-position.java](./3502minimum-cost-to-reach-every-position.java) |

---

## Key Learnings

- Identifying prefix minimum invariance simplifies complex-sounding game/swap mechanics into a single linear scan.
