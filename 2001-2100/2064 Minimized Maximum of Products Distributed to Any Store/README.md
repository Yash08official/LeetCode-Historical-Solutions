---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Greedy
---

# 2064. Minimized Maximum of Products Distributed to Any Store

**[View Problem on LeetCode](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2064` (`2064`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You have `n` specialty retail stores and `m` product types given by a **0-indexed** array `quantities`, where `quantities[i]` is the inventory count of product type `i`.

All products must be distributed across the `n` stores under two rules:
- Each store may receive items of **at most one** product type (receiving `0` items is allowed).
- A store can receive any quantity of its single assigned product type.

Let `x` be the **maximum** number of products given to any store. Return the **smallest possible value of `x`** over all valid distributions.

---

## Examples

### Example 1

```text
Input: n = 6, quantities = [11,6]
Output: 3
Explanation: One optimal way is:
- The 11 products of type 0 are distributed to the first four stores in these amounts: 2, 3, 3, 3
- The 6 products of type 1 are distributed to the other two stores in these amounts: 3, 3
The maximum number of products given to any store is max(2, 3, 3, 3, 3, 3) = 3.
```

### Example 2

```text
Input: n = 7, quantities = [15,10,10]
Output: 5
Explanation: One optimal way is:
- The 15 products of type 0 are distributed to the first three stores in these amounts: 5, 5, 5
- The 10 products of type 1 are distributed to the next two stores in these amounts: 5, 5
- The 10 products of type 2 are distributed to the last two stores in these amounts: 5, 5
The maximum number of products given to any store is max(5, 5, 5, 5, 5, 5, 5) = 5.
```

### Example 3

```text
Input: n = 1, quantities = [100000]
Output: 100000
Explanation: The only optimal way is:
- The 100000 products of type 0 are distributed to the only store.
The maximum number of products given to any store is max(100000) = 100000.
```

---

## Constraints

- `m == quantities.length`

- `1 <= m <= n <= 10^5`

- `1 <= quantities[i] <= 10^5`

---

## Problem Understanding

- Notice the classic phrase **'minimize the maximum'**! Let's check if feasibility is **monotonic** in `x`:
  - Suppose every store is capped at `mid` items (`mid >= 1`).
  - Since a store cannot mix product types, distributing `v = quantities[i]` items of type `i` with at most `mid` items per store requires **at least `ceil(v / mid)` dedicated stores**.
  - Summing `ceil(v / mid)` across all `m` product types gives the minimum total stores `cnt` needed.
  - If `cnt <= n`, capping at `mid` is **feasible** (any leftover `n - cnt` stores simply receive `0` products!), and any cap `> mid` is also feasible. If `cnt > n`, `mid` is **infeasible**, and any cap `< mid` is also infeasible!
- Because `1 <= quantities[i] <= 10^5` and `m <= n`, the optimal `x` always lies in `[1, 10^5]`.

---

## Approach

### Brute Force Approach

Testing candidate caps `x = 1, 2, 3, ...` linearly up to `max(quantities)` and summing `ceil(v / x)` for each takes `O(m * max(quantities))` time, reaching `10^5 * 10^5 = 10^10` operations in the worst case.

### Optimized Approach

**Binary search on the answer** `mid` over `[1, 100000]`. For each candidate `mid`, compute total required stores `cnt = sum((v + mid - 1) / mid)`. If `cnt <= n`, narrow left (`right = mid`); otherwise narrow right (`left = mid + 1`).

### Step-by-Step Thinking Process

1. Set search bounds `left = 1` (since `quantities[i] >= 1`, at least 1 store gets `>= 1` item, and `mid = 0` would divide by zero) and `right = 100000` (upper bound on `quantities[i]`, always feasible because `m <= n`).
2. While `left < right`, pick `mid = (left + right) >> 1`.
3. Accumulate required stores `cnt` over `v` in `quantities` using integer ceiling division `(v + mid - 1) / mid` (note: even at `mid = 1`, max `cnt = 10^5 * 10^5 = 10^10`? Wait—let's check! Look closely at `int cnt` in `solution_code`! Why doesn't `cnt` overflow `int` in `solution_code`? Because in binary search starting at `left = 1, right = 100000`, `mid` ONLY approaches small values like `1` if earlier larger `mid`s had `cnt <= n <= 10^5`! Wait: what if `left = 1, right = 100000`? First `mid = 50000` (`cnt <= 2 * 10^5`), next `25000`, ..., even if `quantities` had `10^5` elements of `10^5`? Wait: `m <= n <= 10^5`, if `m = 10^5` and all `v = 10^5`, `cnt` at `mid = 50000` is `2 * 10^5 > n = 10^5`, so `left` immediately jumps **up** to `50001`! `mid` can NEVER become small when `sum(quantities)` is huge, because whenever `sum(quantities) / mid > n`, binary search moves `left = mid + 1`! Specifically, at every step `sum(quantities) <= n * right <= 10^5 * 10^5`? Wait: on the very first step `mid = 50000`, max `cnt = 10^5 * 2 = 200000`! And `mid` only halves (`right = mid`) when `cnt <= n <= 10^5`, so at the next step `mid >= right / 2`, meaning `cnt` at `mid` is at most `2 * n + m <= 3 * 10^5`! That's why `int cnt` NEVER exceeds `~300,000` and NEVER overflows `int`!).
4. If `cnt <= n`, `mid` works, so set `right = mid`; else set `left = mid + 1`.
5. When `left == right`, return `left`.

### Algorithm / Intuition

In `minimizedMaximum`, `while (left < right)` implements a lower-bound binary search for the smallest feasible store capacity. For a trial capacity `mid`, `(v + mid - 1) / mid` computes `ceil(v / (double) mid)` purely with fast integer arithmetic and zero floating-point precision risk. Notice also why `int cnt` is completely safe from 32-bit overflow here: initially `mid = 50,000` so `cnt <= 2 * 10^5`, and `right` is only lowered when `cnt <= n <= 10^5`, guaranteeing `cnt` never exceeds `~3 * 10^5` on any iteration! Once `left == right`, `left` is the minimum feasible maximum.

---

## Dry Run

Tracing Example 1: `n = 6`, `quantities = [11, 6]`:

| `left` | `right` | `mid` | `cnt = ceil(11/mid) + ceil(6/mid)` | `cnt <= 6`? | Bound Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `100000` | `50000` | `1 + 1 = 2` | Yes | `right = 50000` |
| ... | ... | *(halves down to `7`, `4`)* | ... | Yes | `right = 4` |
| `1` | `4` | `2` | `ceil(11/2) + ceil(6/2) = 6 + 3 = 9` | No (`9 > 6`) | `left = 3` |
| `3` | `4` | `3` | `ceil(11/3) + ceil(6/3) = 4 + 2 = 6` | Yes (`6 <= 6`) | `right = 3` |

Loop terminates at `left == right == 3`; returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(m log M)` — Runs `ceil(log_2(10^5)) = 17` binary-search iterations (`M = 10^5`), each scanning `m = quantities.length` elements in `O(m)` time.
- **Space Complexity:** `O(1)` — Uses only scalar integer variables (`left`, `right`, `mid`, `cnt`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2064minimized-maximum-of-products-distributed-to-any-store.java](./2064minimized-maximum-of-products-distributed-to-any-store.java) |

---

## Key Learnings

- **Minimize the Maximum / Maximize the Minimum** problems (like Koko Eating Bananas, Capacity To Ship Packages, Split Array Largest Sum) almost always reduce to **Binary Search on the Answer** with a greedy `O(m)` feasibility check.
- Use `(v + mid - 1) / mid` for exact integer ceiling division `ceil(v / mid)` when `v, mid > 0` (making sure `v + mid - 1` cannot overflow `int`).
