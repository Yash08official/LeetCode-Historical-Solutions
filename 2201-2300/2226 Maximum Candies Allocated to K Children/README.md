---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 2226. Maximum Candies Allocated to K Children

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-candies-allocated-to-k-children/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2226` (`2226`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** integer array `candies`, where `candies[i]` is the size of the `i`-th candy pile, and a `long` integer `k` representing the number of children.

You may split any pile into smaller sub-piles of any positive integer sizes, **cannot** merge different piles together, and may leave leftover candies unused. Every one of the `k` children must receive **the exact same number** of candies taken from a single sub-pile.

Return the **maximum** number of candies each child can receive (or `0` if it is impossible to give every child at least `1` candy).

---

## Examples

### Example 1

```text
Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.
```

### Example 2

```text
Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0.
```

---

## Constraints

- `1 <= candies.length <= 10^5`

- `1 <= candies[i] <= 10^7`

- `1 <= k <= 10^12`

---

## Problem Understanding

- **Monotonic Feasibility Predicate:** Suppose we test whether each child can receive `mid` candies (`mid >= 1`):
  - Pile `x` can supply at most `floor(x / mid)` children (since piles cannot be merged).
  - Across all piles, we can serve `cnt = sum(x / mid)` children.
  - If `cnt >= k`, giving `mid` candies per child is **feasible**; if `cnt < k`, `mid` is **too large**, and every value `> mid` will also fail!
- **Search Bounds & Overflow Care:**
  - Lower bound `l = 0` (always feasible—when `k` exceeds the total sum of candies, the answer is `0`).
  - Upper bound `r = max(candies)` (no child can ever get more than the largest single pile since merging is forbidden).
  - `cnt` can be as large as `10^5 * 10^7 = 10^{12}` (when `mid = 1`), and `k <= 10^{12}`, so `cnt` **must** be stored in a 64-bit `long`!

---

## Approach

### Brute Force Approach

Testing every candidate candy count `c` linearly from `1` up to `max(candies)` (`<= 10^7`) and summing `x / c` across `n <= 10^5` piles takes `O(n * max(candies))` (`~10^{12}` operations), resulting in `Time Limit Exceeded`.

### Optimized Approach

Binary search for the largest feasible per-child candy count in `[0, max(candies)]`, using upper-midpoint `mid = (l + r + 1) >> 1` and checking whether `sum(x / mid) >= k` in `O(n)` per step.

### Step-by-Step Thinking Process

1. Identify the monotonic search range `[l, r] = [0, max(candies)]`.
2. While `l < r`, pick the upper midpoint `int mid = (l + r + 1) >> 1` so `mid` is strictly `>= 1` (preventing division by zero when `l = 0` and preventing infinite loops when setting `l = mid`).
3. Accumulate `long cnt = 0` by adding `x / mid` for each pile `x` in `candies`.
4. If `cnt >= k`, `mid` is achievable so move the lower bound up (`l = mid`); otherwise `mid` is too large so shrink the upper bound (`r = mid - 1`).
5. When `l == r`, return `l`.

### Algorithm / Intuition

Two subtle implementation details make this binary search completely bug-free:
1. **Upper Midpoint `(l + r + 1) >> 1`:** When searching for the *maximum* valid value where the `true` branch updates `l = mid`, standard floor division `(l + r) / 2` would get stuck in an infinite loop whenever `r == l + 1` (and would evaluate `mid = 0` when `l = 0, r = 1`, causing `ArithmeticException: / by zero`!). Biasing `mid` upward with `+ 1` guarantees `mid >= 1` for `l < r` and ensures `[l, r]` strictly shrinks every iteration.
2. **Unsigned/Bitwise Shift Safety:** Since `r <= 10^7`, `l + r + 1 <= 2 * 10^7 + 1`, which is far below `Integer.MAX_VALUE`, so `(l + r + 1) >> 1` cannot overflow.

---

## Dry Run

Trace on **Example 1**: `candies = [5, 8, 6]`, `k = 3`.

- Initial bounds: `l = 0`, `r = max(5, 8, 6) = 8`.

| Iter | `l` | `r` | `mid = (l + r + 1) >> 1` | `cnt = 5/mid + 8/mid + 6/mid` | `cnt >= 3`? | Updated `[l, r]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `0` | `8` | `4` | `1 + 2 + 1 = 4` | `true` | `[4, 8]` |
| 2 | `4` | `8` | `6` | `0 + 1 + 1 = 2` | `false` | `[4, 5]` |
| 3 | `4` | `5` | `5` | `1 + 1 + 1 = 3` | `true` | `[5, 5]` |

- Loop terminates (`l == r == 5`) and returns `5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log M)` — Finding `M = max(candies)` takes `O(n)` time, and each of the `O(log M)` binary search iterations (`<= 24` steps for `M <= 10^7`) scans `candies` in `O(n)` time.
- **Space Complexity:** `O(1)` — Only a handful of primitive variables (`l`, `r`, `mid`, `cnt`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2226maximum-candies-allocated-to-k-children.java](./2226maximum-candies-allocated-to-k-children.java) |

---

## Key Learnings

- Whenever `l = mid` is used in binary search for a maximum feasible answer, **always** compute the upper midpoint `(l + r + 1) >>> 1` to avoid infinite loops at `r = l + 1` (and here, to avoid `mid = 0` division-by-zero!).
- Always check accumulator types in binary search predicates: summing `10^5` quotients up to `10^7` requires a `long` (`cnt`), even though the returned answer fits in an `int`.
