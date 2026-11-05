---
comments: true
difficulty: Easy
tags:
  - Array
  - Heap (Priority Queue)
  - Simulation
---

# 2558. Take Gifts From the Richest Pile

**[View Problem on LeetCode](https://leetcode.com/problems/take-gifts-from-the-richest-pile/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2558` (`2558`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Heap (Priority Queue)`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `gifts` where each element represents the number of gifts in a pile, and an integer `k`.

Every second for `k` seconds, you must perform the following operation:
1. Pick the pile containing the maximum number of gifts.
2. If multiple piles tie for the maximum, pick any one of them.
3. Leave behind $\lfloor \sqrt{\text{gifts}} \rfloor$ gifts in that pile (i.e., replace the pile's count with the integer square root of its current value).

Return the total number of gifts remaining across all piles after `k` seconds.

---

## Examples

### Example 1

```text
Input: gifts = [25,64,9,4,100], k = 4
Output: 29
Explanation:
The gifts are taken in the following way:
- In the first second, the last pile is chosen and 10 gifts are left behind.
- Then the second pile is chosen and 8 gifts are left behind.
- After that the first pile is chosen and 5 gifts are left behind.
- Finally, the last pile is chosen again and 3 gifts are left behind.
The final remaining gifts are [5,8,9,4,3], so the total number of gifts remaining is 29.
```

### Example 2

```text
Input: gifts = [1,1,1,1], k = 4
Output: 4
Explanation:
In this case, regardless which pile you choose, you have to leave behind 1 gift in each pile.
That is, you can't take any pile with you.
So, the total gifts remaining are 4.
```

---

## Constraints

- `1 <= gifts.length <= 10^3`

- `1 <= gifts[i] <= 10^9`

- `1 <= k <= 10^3`

---

## Problem Understanding

At each step, we must identify the current largest pile and replace its value with `floor(sqrt(pile))`. This operation must be repeated exactly `k` times. Because pile sizes can be up to $10^9$, their total sum after $k$ operations can easily exceed the 32-bit signed integer maximum ($2^{31}-1$), so we must accumulate the answer using a 64-bit integer (`long`).

---

## Approach

### Brute Force Approach

A naive approach performs a linear scan over the array `gifts` during each of the `k` seconds to locate the maximum value, replaces it with its square root, and repeats. This takes $O(k \cdot n)$ time. For $n, k \le 10^3$, this takes around $10^6$ operations, which passes, but is inefficient compared to using a priority queue.

### Optimized Approach

Use a max-heap (`PriorityQueue` with comparator `(a, b) -> b - a`). Insert all pile counts into the heap. In each of the `k` steps, extract the maximum element with `poll()`, calculate its integer square root `(int) Math.sqrt(v)`, and push the reduced count back into the heap. Finally, sum all elements remaining in the heap into a `long`.

### Step-by-Step Thinking Process

1. We need repeated access to the maximum element across multiple rounds of modification.
2. A max-heap supports extracting the maximum and reinserting the modified value in $O(\log n)$ time.
3. Initialize the max-heap with all initial piles in $O(n \log n)$ time.
4. Execute the `k` reduction steps: `pq.offer((int) Math.sqrt(pq.poll()))`.
5. Iterate through the heap elements to sum the final values, taking care to prevent integer overflow.

### Algorithm / Intuition

The priority queue `pq` is configured with `(a, b) -> b - a` to order elements in descending order. We populate `pq` with each gift pile. The `while (k-- > 0)` loop repeatedly removes the current top element via `pq.poll()`, computes `(int) Math.sqrt(...)`, and reinserts it via `pq.offer(...)`. After `k` iterations, a enhanced for-loop iterates over all elements remaining in `pq`, accumulating them into `ans` typed as `long`.

---

## Dry Run

Trace with Example 1: `gifts = [25, 64, 9, 4, 100]`, `k = 4`.
- Heap initialized: `[100, 64, 25, 4, 9]`.
- Step 1 (`k=4->3`): Poll `100`. Compute `floor(sqrt(100)) = 10`. Offer `10`. Heap max is `64`.
- Step 2 (`k=3->2`): Poll `64`. Compute `floor(sqrt(64)) = 8`. Offer `8`. Heap max is `25`.
- Step 3 (`k=2->1`): Poll `25`. Compute `floor(sqrt(25)) = 5`. Offer `5`. Heap max is `10`.
- Step 4 (`k=1->0`): Poll `10`. Compute `floor(sqrt(10)) = 3`. Offer `3`.
- Loop ends. Remaining elements in `pq`: `[9, 8, 5, 4, 3]`.
- Accumulate sum: `9 + 8 + 5 + 4 + 3 = 29`.
Return `ans = 29`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n + k log n)` — Inserting `n` elements into the priority queue takes `O(n log n)` time. Each of the `k` operations involves a `poll()` and an `offer()`, each taking `O(log n)` time. Summing the heap takes `O(n)`. Total time is `O((n + k) log n)`.
- **Space Complexity:** `O(n)` — The priority queue stores exactly `n` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2558take-gifts-from-the-richest-pile.java](./2558take-gifts-from-the-richest-pile.java) |

---

## Key Learnings

- A max-heap is the standard data structure for simulating multi-step dynamic maximum reduction processes.
- Even when element values fit in a 32-bit integer, their sum can exceed $2^{31}-1$, requiring the accumulator to be a 64-bit `long`.
- `(int) Math.sqrt(v)` efficiently truncates the floating-point square root to the required floor integer value.
