---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
---

# 3693. Climbing Stairs II

**[View Problem on LeetCode](https://leetcode.com/problems/climbing-stairs-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3693` (`3693`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer `n` and an integer array `costs` of length `n`.

You are currently at step 0 and you want to reach step `n`.

In each step, you can jump either 1, 2, or 3 stairs forward. The cost of jumping from step `j` to step `i` is given by:

$$\text{cost} = \text{costs}[i - 1] + (i - j)^2$$

Return the **minimum** total cost to reach step `n`.

---

## Examples

### Example 1

```text
Input: n = 4, costs = [1,2,3,4]
Output: 13
Explanation:
- Step 0 to 1: cost = costs[0] + (1 - 0)^2 = 1 + 1 = 2
- Step 1 to 4: cost = costs[3] + (4 - 1)^2 = 4 + 9 = 13
Total cost = 15.
Alternatively:
- Step 0 to 2: cost = costs[1] + (2 - 0)^2 = 2 + 4 = 6
- Step 2 to 4: cost = costs[3] + (4 - 2)^2 = 4 + 4 = 8
Total cost = 14.
- Step 0 to 1: cost = 2
- Step 1 to 2: cost = 2 + 1 = 3
- Step 2 to 4: cost = 4 + 4 = 8
Total cost = 13.
Minimum cost is 13.
```

### Example 2

```text
Input: n = 3, costs = [5,1,3]
Output: 8
```

---

## Constraints

- `1 <= n <= 10^5`
- `costs.length == n`
- `1 <= costs[i] <= 10^4`

---

## Problem Understanding

- We start at step 0 with cost 0 and want to reach step $n$.
- At any step $i \in [1, n]$, we can arrive from step $j \in [\max(0, i - 3), i - 1]$.
- Transition cost from $j$ to $i$: $costs[i - 1] + (i - j)^2$.
- Find the minimum total cost $f[n]$.

---

## Approach

### Optimized Approach (1D Dynamic Programming)

1. Define DP array `f` of size $n + 1$, initialized to infinity (`inf = Integer.MAX_VALUE / 2`).
2. Set base case: `f[0] = 0`.
3. For each step $i$ from $1$ to $n$:
   - Current step base cost: `x = costs[i - 1]`.
   - Consider all valid preceding steps $j \in [\max(0, i - 3), i - 1]$:
     - `f[i] = Math.min(f[i], f[j] + x + (i - j) * (i - j))`.
4. Return `f[n]`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — For each step $i$, at most 3 predecessor steps are evaluated ($O(1)$ operations per step).
- **Space Complexity:** $O(N)$ — 1D array of size $n + 1$ (can be optimized to $O(1)$ by keeping the last 3 values).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3693climbing-stairs-ii.java](./3693climbing-stairs-ii.java) |

---

## Key Learnings

- Constrained jump sizes ($k \le 3$) reduce state transitions from an unbounded history to a constant $O(1)$ window, yielding linear runtime $O(N)$.
