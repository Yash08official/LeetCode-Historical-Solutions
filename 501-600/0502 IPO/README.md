---
comments: true
difficulty: Hard
tags:
  - Array
  - Greedy
  - Sorting
  - Heap (Priority Queue)
---

# 502. IPO

**[View Problem on LeetCode](https://leetcode.com/problems/ipo/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0502` (`502`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You start with initial capital `w` and may complete **at most `k` distinct projects** chosen from `n` available projects.

Project `i` requires at least `capital[i]` capital on hand to start, and upon completion adds pure profit `profits[i]` to your capital (note: starting a project does **not** consume or deduct `capital[i]`—`capital[i]` is purely a minimum threshold requirement!).

Return the **maximum final capital** achievable after completing at most `k` projects.

---

## Examples

### Example 1

```text
Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
```

### Example 2

```text
Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6
```

---

## Constraints

- `1 <= k <= 10^5`

- `0 <= w <= 10^9`

- `n == profits.length`

- `n == capital.length`

- `1 <= n <= 10^5`

- `0 <= profits[i] <= 10^4`

- `0 <= capital[i] <= 10^9`

---

## Problem Understanding

- **Capital never decreases:** Because `profits[i] >= 0` and `capital[i]` is only a prerequisite check (not spent), your capital `w` is monotonically non-decreasing! Any project that becomes affordable at capital `w` **remains affordable forever**.
- **Greedy dominance:** Among all currently affordable projects (`capital[i] <= w`), picking the one with the **largest profit** strictly dominates picking a smaller-profit project: it yields higher capital immediately and unlocks a superset of future projects!

---

## Approach

### Brute Force Approach

In each of the `k` rounds, scanning all `n` projects linearly to find the uncompleted project with `capital[i] <= w` and maximum `profits[i]` takes `O(k * n)` time.

With `k <= 10^5` and `n <= 10^5`, `O(k * n)` reaches `10^10` operations and times out.

### Optimized Approach

Use **Two Priority Queues (Min-Heap of Locked Projects `q1` + Max-Heap of Affordable Profits `q2`)**: store locked `(capital, profit)` pairs in min-heap `q1`, unlock all projects with `capital <= w` into profit max-heap `q2` before each pick, and greedily poll the highest profit from `q2` up to `k` times.

### Step-by-Step Thinking Process

1. Separate projects into two dynamic pools: **locked** projects (`capital[i] > w`) and **affordable** projects (`capital[i] <= w`).
2. Store locked projects `[capital[i], profits[i]]` in a min-heap `q1` ordered by required capital (`(a, b) -> a[0] - b[0]`) so we can efficiently detect newly unlocked projects whenever `w` grows.
3. Store the profits of unlocked projects in a max-heap `q2` (`(a, b) -> b - a`) so we can pick the most profitable available project in `O(log n)` time.
4. Repeat up to `k` times (`while (k-- > 0)`): move every project with `q1.peek()[0] <= w` from `q1` to `q2`; if `q2` is empty, no affordable projects remain so `break`; otherwise add `w += q2.poll()`.

### Algorithm / Intuition

In `findMaximizedCapital(int k, int w, int[] profits, int[] capital)`:
- `q1` orders `{capital[i], profits[i]}` by ascending `capital[i]`. Note `0 <= capital[i] <= 10^9`, so `a[0] - b[0]` lies in `[-10^9, 10^9]` and never overflows 32-bit `int`.
- Inside `while (k-- > 0)`, the inner `while (!q1.isEmpty() && q1.peek()[0] <= w)` transfers newly unlocked profits into `q2`. Because `w` never shrinks, projects in `q2` never become locked again—each project moves from `q1` to `q2` at most once across the entire run!
- If `q2.isEmpty()`, even our current capital `w` cannot unlock the cheapest remaining project in `q1`, so breaking early avoids wasted iterations.

---

## Dry Run

Tracing **Example 1** with `k = 2`, `w = 0`, `profits = [1, 2, 3]`, `capital = [0, 1, 1]`:

1. **Initialize `q1`:** `[(0, 1), (1, 2), (1, 3)]`, `q2 = []`.
2. **Iteration 1 (`k: 2 -> 1`, `w = 0`):**
   - Unlock `q1.peek()[0] <= 0`: polls `(0, 1)`, offers `1` to `q2`. (`q1 = [(1, 2), (1, 3)]`, `q2 = [1]`).
   - Pick best profit: `w += q2.poll()` -> `w = 0 + 1 = 1` (`q2 = []`).
3. **Iteration 2 (`k: 1 -> 0`, `w = 1`):**
   - Unlock `q1.peek()[0] <= 1`: polls `(1, 2)` and `(1, 3)`, offers `2` and `3` to `q2`. (`q1 = []`, `q2 = [3, 2]`).
   - Pick best profit: `w += q2.poll()` -> `w = 1 + 3 = 4` (`q2 = [2]`).
4. Loop finishes (`k == 0`); returns `w = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O((n + k) log n)` — Offering `n` projects to `q1` takes `O(n log n)`, moving each project from `q1` to `q2` at most once takes `O(n log n)`, and polling `q2` at most `min(k, n)` times takes `O(min(k, n) log n)`.
- **Space Complexity:** `O(n)` — Heaps `q1` and `q2` store at most `n` project entries combined.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [502ipo.java](./502ipo.java) |

---

## Key Learnings

- The "Two Heaps (Locked Min-Heap + Available Max-Heap)" pattern applies whenever resource thresholds monotonically unlock items from which you greedily pick the best reward.
- Alternatively, sorting an array of `(capital, profit)` pairs once in `O(n log n)` can replace the min-heap `q1` with a simple pointer `idx`.
