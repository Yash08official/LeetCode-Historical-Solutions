---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 2594. Minimum Time to Repair Cars

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-time-to-repair-cars/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2594` (`2594`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `ranks` representing the ranks of several mechanics, where `ranks[i]` is the rank of the $i$-th mechanic. A mechanic with rank $r$ can repair $n$ cars in $r \cdot n^2$ minutes.

You are also given an integer `cars` representing the total number of cars that must be repaired.

All mechanics can work on repairing cars simultaneously. Each mechanic repairs whole cars independently.

Return the **minimum** amount of time needed to repair all `cars`.

---

## Examples

### Example 1

```text
Input: ranks = [4,2,3,1], cars = 10
Output: 16
Explanation:
- The first mechanic will repair two cars. The time required is 4 * 2 * 2 = 16 minutes.
- The second mechanic will repair two cars. The time required is 2 * 2 * 2 = 8 minutes.
- The third mechanic will repair two cars. The time required is 3 * 2 * 2 = 12 minutes.
- The fourth mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.​​​​​
```

### Example 2

```text
Input: ranks = [5,1,8], cars = 6
Output: 16
Explanation:
- The first mechanic will repair one car. The time required is 5 * 1 * 1 = 5 minutes.
- The second mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
- The third mechanic will repair one car. The time required is 8 * 1 * 1 = 8 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.​​​​​
```

---

## Constraints

- `1 <= ranks.length <= 10^5`

- `1 <= ranks[i] <= 100`

- `1 <= cars <= 10^6`

---

## Problem Understanding

All mechanics work concurrently. If given a total time $t$, how many cars can mechanic $i$ with rank $r$ repair? Since repairing $n$ cars takes $r \cdot n^2$ minutes, we have $r \cdot n^2 \le t \iff n \le \lfloor \sqrt{t / r} \rfloor$. Thus, in time $t$, mechanic $i$ can repair $\lfloor \sqrt{t / r_i} \rfloor$ cars. The total cars repaired by all mechanics in time $t$ is $\sum_{r \in ranks} \lfloor \sqrt{t / r} \rfloor$. This sum is monotonically non-decreasing with respect to $t$. Therefore, we can use binary search on the minimum time $t$.

---

## Approach

### Brute Force Approach

Simulating car repairs minute by minute or car by car using a min-heap to assign each car to whichever mechanic finishes earliest would take $O(\text{cars} \cdot \log(\text{ranks.length}))$. With `cars` up to $10^6$, heap simulation requires millions of operations, which is significantly slower than binary search and can TLE.

### Optimized Approach

Binary search on the total time `mid` within the range `[0, ranks[0] * cars^2]`. For a candidate time `mid`, calculate total cars that can be repaired: `cnt = sum((long) Math.sqrt(mid / r) for r in ranks)`. If `cnt >= cars`, then time `mid` is sufficient, so we attempt to find a smaller time (`right = mid`). Otherwise, more time is required (`left = mid + 1`). When `left == right`, `left` is the minimum time needed.

### Step-by-Step Thinking Process

1. We need to find the minimum time $T$ such that $\sum_{i} n_i \ge \text{cars}$ where each $r_i n_i^2 \le T$.
2. Express $n_i$ in terms of $T$: $n_i = \lfloor \sqrt{T / r_i} \rfloor$.
3. The total cars function $C(T) = \sum_{i} \lfloor \sqrt{T / r_i} \rfloor$ is monotonic in $T$: as $T$ increases, $C(T)$ never decreases.
4. Upper bound: If mechanic 0 repairs all `cars` alone, it takes $\text{ranks}[0] \times \text{cars}^2$. For $\text{ranks}[0] \le 100$ and $\text{cars} \le 10^6$, this upper bound is $\le 100 \times 10^{12} = 10^{14}$, which fits safely within a 64-bit signed integer (`long`).
5. Binary search over $[0, 10^{14}]$ takes only $\approx 47$ iterations, with each iteration scanning `ranks` in $O(n)$ time.

### Algorithm / Intuition

`left` is set to 0 and `right` is initialized to `1L * ranks[0] * cars * cars`. In the `while (left < right)` loop, `mid = (left + right) >> 1` is evaluated. A loop over `ranks` accumulates `cnt += Math.sqrt(mid / r)`. If `cnt >= cars`, we narrow the upper bound with `right = mid`. Otherwise, we raise the lower bound with `left = mid + 1`. The loop terminates when `left == right`, yielding the exact minimal time.

---

## Dry Run

Trace with Example 1: `ranks = [4, 2, 3, 1]`, `cars = 10`.
- Initial upper bound: `right = 4 * 10 * 10 = 400`. `left = 0`.
- When testing `mid = 16`:
  - `r = 4`: `sqrt(16 / 4) = sqrt(4) = 2`
  - `r = 2`: `sqrt(16 / 2) = sqrt(8) = 2`
  - `r = 3`: `sqrt(16 / 3) = sqrt(5.33) = 2`
  - `r = 1`: `sqrt(16 / 1) = sqrt(16) = 4`
  - Total `cnt = 2 + 2 + 2 + 4 = 10 >= 10`. Valid! `right = 16`.
- When testing `mid = 15`:
  - `r = 4`: `sqrt(15 / 4) = 1`
  - `r = 2`: `sqrt(15 / 2) = 2`
  - `r = 3`: `sqrt(15 / 3) = 2`
  - `r = 1`: `sqrt(15 / 1) = 3`
  - Total `cnt = 1 + 2 + 2 + 3 = 8 < 10`. Infeasible! `left = 16`.
- Search terminates with `left = 16`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log(max_time))` where `n = ranks.length` and `max_time = min(ranks) * cars^2 <= 10^{14}`. Binary search requires around $\log_2(10^{14}) \approx 47$ steps. Each step does a linear pass of length `n`. Total time is `O(n log(max_time))`.
- **Space Complexity:** `O(1)` — Only a few 64-bit integer variables (`left`, `right`, `mid`, `cnt`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2594minimum-time-to-repair-cars.java](./2594minimum-time-to-repair-cars.java) |

---

## Key Learnings

- Inverting the work formula ($t = r \cdot n^2 \implies n = \lfloor \sqrt{t/r} \rfloor$) converts an otherwise difficult allocation problem into an easily verifiable predicate.
- Monotonicity of total production over time makes binary search on answer the optimal technique.
- Always use `1L * ...` when computing upper bounds like $r \cdot cars^2$ to avoid silent 32-bit overflow.
