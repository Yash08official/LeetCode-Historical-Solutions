---
comments: true
difficulty: Hard
tags:
  - Array
  - Greedy
---

# 135. Candy

**[View Problem on LeetCode](https://leetcode.com/problems/candy/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0135` (`135`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You have `n` children standing side by side in a single line, where the `i`-th child is given an integer rating `ratings[i]`. You want to distribute candies to every child while obeying two strict rules:

- Every child must receive **at least `1` candy**.
- Any child whose rating is strictly higher than an immediate neighbor's rating (`i - 1` or `i + 1`) must receive strictly more candies than that neighbor.

 Note that two adjacent children with **equal** ratings have no constraint relative to each other—one can receive fewer candies than the other as long as both receive at least `1`. Return the **minimum total number of candies** required to satisfy these rules.

---

## Examples

### Example 1

```text
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
```

### Example 2

```text
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
```

---

## Constraints

- `1 <= n == ratings.length <= 5 * 10^4`

- `0 <= ratings[i] <= 5 * 10^4`

---

## Problem Understanding

- **Local Neighbor Dependency:** Child `i`'s candy count depends on both `ratings[i - 1]` (left neighbor) and `ratings[i + 1]` (right neighbor). Trying to satisfy both directions simultaneously in a single pass is tricky because a decreasing run of ratings to the right dictates how high the peak before it must be.
- **Equal Ratings Reset Streaks:** When `ratings[i] == ratings[i - 1]`, child `i` does **not** need to match child `i - 1`'s candy count; dropping right back down to `1` candy is valid and optimal.
- **Decomposition Invariant:** If child `i` needs at least `left[i]` candies to satisfy all left-neighbor rising constraints and at least `right[i]` candies to satisfy all right-neighbor rising constraints, giving child `i` `max(left[i], right[i])` candies simultaneously satisfies both sides with the minimum possible allocation.

---

## Approach

### Brute Force Approach

A naive iterative relaxation approach initializes every child with `1` candy and repeatedly scans the array, incrementing `candies[i] = candies[i - 1] + 1` whenever `ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]` (and similarly for `i + 1`) until a full pass makes zero changes. On a strictly decreasing array of length `n`, updates propagate one step per pass, degrading to `O(n^2)` time, which is too slow for `n <= 5 * 10^4`.

### Optimized Approach

Use a **Two-Pass Greedy Strategy** with two auxiliary arrays (`left` and `right`). Sweep left-to-right to satisfy strictly increasing left-neighbor relationships, sweep right-to-left to satisfy strictly increasing right-neighbor relationships, and sum `Math.max(left[i], right[i])` across all indices.

### Step-by-Step Thinking Process

1. Split the two-sided neighbor rule into two independent one-sided rules: (1) if `ratings[i] > ratings[i - 1]`, child `i` gets more candies than child `i - 1`; (2) if `ratings[i] > ratings[i + 1]`, child `i` gets more candies than child `i + 1`.
2. Initialize both `left` and `right` arrays of length `n` with `1` so every child meets the baseline requirement of at least one candy.
3. Sweep left-to-right (`i = 1` to `n - 1`): whenever `ratings[i] > ratings[i - 1]`, greedily set `left[i] = left[i - 1] + 1`; otherwise leave `left[i]` as `1`.
4. Sweep right-to-left (`i = n - 2` down to `0`): whenever `ratings[i] > ratings[i + 1]`, greedily set `right[i] = right[i + 1] + 1`; otherwise leave `right[i]` as `1`.
5. At each index `i`, taking `Math.max(left[i], right[i])` preserves strict inequalities against both neighbors while keeping the candy count as small as possible.

### Algorithm / Intuition

In `candy(int[] ratings)`, we allocate `int[] left = new int[n]` and `int[] right = new int[n]`, filling both with `1` via `Arrays.fill`. During the forward loop, `left[i]` tracks the length of the strictly increasing rating run ending at `i`. During the backward loop, `right[i]` tracks the length of the strictly increasing rating run starting from the right and moving leftward to `i` (i.e., a strictly decreasing run left-to-right). At a local peak `i` where `ratings[i] > ratings[i - 1]` and `ratings[i] > ratings[i + 1]`, `Math.max(left[i], right[i])` is strictly greater than both `left[i - 1]` (which equals the neighbor's final value on an ascending slope) and `right[i + 1]` (which equals the neighbor's final value on a descending slope). Summing these maxima into `ans` yields the exact minimum total.

---

## Dry Run

Trace on **Example 1**: `ratings = [1, 0, 2]`, `n = 3`

1. **Initialization:** `left = [1, 1, 1]`, `right = [1, 1, 1]`.
2. **Left-to-Right Pass (`i = 1..2`):**
   - `i = 1`: `ratings[1] (0) > ratings[0] (1)` is false -> `left[1]` stays `1`.
   - `i = 2`: `ratings[2] (2) > ratings[1] (0)` is true -> `left[2] = left[1] + 1 = 2`.
   - After pass: `left = [1, 1, 2]`.
3. **Right-to-Left Pass (`i = 1..0`):**
   - `i = 1`: `ratings[1] (0) > ratings[2] (2)` is false -> `right[1]` stays `1`.
   - `i = 0`: `ratings[0] (1) > ratings[1] (0)` is true -> `right[0] = right[1] + 1 = 2`.
   - After pass: `right = [2, 1, 1]`.
4. **Combine (`ans` accumulation):**
   - `i = 0`: `Math.max(1, 2) = 2`
   - `i = 1`: `Math.max(1, 1) = 1`
   - `i = 2`: `Math.max(2, 1) = 2`
   - Total `ans = 2 + 1 + 2 = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We initialize two arrays and perform three linear passes of length `n` (`n = ratings.length`).
- **Space Complexity:** `O(n)` — Two integer arrays `left` and `right` of size `n` are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [135candy.java](./135candy.java) |

---

## Key Learnings

- Bidirectional adjacent constraints on 1D arrays can often be decoupled into a forward greedy pass and a backward greedy pass combined with `max` or `min`.
- Pay close attention to strict vs. non-strict inequality in problem specs: equal adjacent ratings (`ratings[i] == ratings[i - 1]`) reset the required candy count to `1`.
- While an `O(1)` space slope-counting solution exists, the two-array `O(n)` greedy pattern is far less error-prone and generalizes cleanly to similar prefix/suffix problems.
