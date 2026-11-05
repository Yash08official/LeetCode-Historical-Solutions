---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Queue
  - Sliding Window
  - Heap (Priority Queue)
  - Prefix Sum
  - Monotonic Queue
---

# 862. Shortest Subarray with Sum at Least K

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0862` (`862`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Queue`, `Sliding Window`, `Heap (Priority Queue)`, `Prefix Sum`, `Monotonic Queue` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` (which may contain negative, zero, and positive integers) and a positive integer `k`, return the length of the **shortest non-empty contiguous subarray** of `nums` whose sum is **at least `k`**.

If no subarray sums to `k` or more, return `-1`.

---

## Examples

### Example 1

```text
Input: nums = [1], k = 1
Output: 1
```

### Example 2

```text
Input: nums = [1,2], k = 4
Output: -1
```

### Example 3

```text
Input: nums = [2,-1,2], k = 3
Output: 3
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-10^5 <= nums[i] <= 10^5`

- `1 <= k <= 10^9`

---

## Problem Understanding

- If all elements were positive, a standard two-pointer sliding window would work in `O(n)`. However, **negative numbers** (`-10^5 <= nums[i] <= 10^5`) break monotonicity: shrinking from the left can actually *increase* the window sum, and extending right can *decrease* it.
- Using prefix sums `s[0 .. n]` where `s[i] = nums[0] + ... + nums[i - 1]`, a subarray `nums[j .. i - 1]` has sum `>= k` iff `s[i] - s[j] >= k` (with `0 <= j < i`), and its length is `i - j`.
- Two key dominance rules let us maintain candidate left endpoints `j` in a **monotonic increasing deque**:
  1. If `s[i] - s[front] >= k`, `front` has found its shortest possible right partner `i` — any future `i' > i` would give a strictly longer subarray `i' - front > i - front`, so `front` can be popped permanently!
  2. If `s[back] >= s[i]` for `back < i`, `i` is both further right (shorter distance) and has a smaller-or-equal prefix sum (easier to satisfy `s[future] - s[i] >= k`), rendering `back` strictly useless!

---

## Approach

### Brute Force Approach

Checking all subarray pairs `(j, i)` with `0 <= j < i <= n` using prefix sums `s[i] - s[j] >= k` takes `O(n^2)` time, which exceeds the time limit for `n = 10^5`.

### Optimized Approach

Precompute a `long[]` prefix sum array `s` of length `n + 1`, then sweep `i` from `0` to `n` using a **monotonic increasing `ArrayDeque<Integer>`** `q`: pop valid left indices from the front (`s[i] - s[q.peek()] >= k`) to minimize `ans`, pop dominated indices from the back (`s[q.peekLast()] >= s[i]`), and append `i`.

### Step-by-Step Thinking Process

1. Compute 64-bit prefix sums `long[] s = new long[n + 1]` so `s[i] - s[j]` never overflows 32-bit `int` (sums can reach `10^10`).
2. Initialize `ans = n + 1` (sentinel for 'not found') and an empty `Deque<Integer> q`.
3. Sweep prefix index `i` from `0` to `n` and first shrink from the front: while `q` is non-empty and `s[i] - s[q.peek()] >= k`, update `ans = Math.min(ans, i - q.poll())`.
4. Next maintain monotonicity at the back: while `q` is non-empty and `s[q.peekLast()] >= s[i]`, discard `q.pollLast()` so prefix sums of indices in `q` stay strictly increasing.
5. Append `q.offer(i)`, and after the sweep return `ans > n ? -1 : ans`.

### Algorithm / Intuition

In `shortestSubarray(int[] nums, int k)`:
- Because the back loop enforces `s[q_0] < s[q_1] < ...` inside `q`, the front element `q.peek()` always has the **smallest** prefix sum among all active candidates — so checking `s[i] - s[q.peek()] >= k` from the front never misses a valid match!
- Once `q.poll()` pairs `j = q.peek()` with `i`, `i` is the earliest right endpoint for `j`, so `i - j` is guaranteed minimal for `j`.
- Using `long[] s` prevents integer overflow when `n = 10^5` and `nums[i] = -10^5`.

---

## Dry Run

Trace on **Example 1** (`nums = [1], k = 1`) and **Example 3** (`nums = [2, -1, 2], k = 3`):

**Example 1 (`nums = [1], k = 1`):** `s = [0, 1]`, `ans = 2`.
- `i = 0` (`s[0] = 0`): `q = [0]`.
- `i = 1` (`s[1] = 1`): `s[1] - s[0] = 1 >= 1` -> pop `0`, `ans = Math.min(2, 1 - 0) = 1`; push `1` -> `q = [1]`.
- Returns `1`.

**Example 3 (`nums = [2, -1, 2], k = 3`):** `s = [0, 2, 1, 3]`, `ans = 4`.
- `i = 0` (`s[0] = 0`): `q = [0]`.
- `i = 1` (`s[1] = 2`): `2 - 0 < 3`; `2 > 0` -> `q = [0, 1]`.
- `i = 2` (`s[2] = 1`): `1 - 0 < 3`; back `s[1] = 2 >= s[2] = 1` -> `pollLast()` removes `1`; push `2` -> `q = [0, 2]`.
- `i = 3` (`s[3] = 3`): front `s[3] - s[0] = 3 >= 3` -> `poll()` removes `0`, `ans = Math.min(4, 3 - 0) = 3`; next front `s[3] - s[2] = 2 < 3`; push `3` -> `q = [2, 3]`.
- Returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Computing `s` takes `O(n)`, and each of the `n + 1` prefix indices enters and leaves `q` at most once.
- **Space Complexity:** `O(n)` — Prefix sum array `s` and deque `q` each hold up to `n + 1` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [862shortest-subarray-with-sum-at-least-k.java](./862shortest-subarray-with-sum-at-least-k.java) |

---

## Key Learnings

- When negative numbers break standard two-pointer sliding windows, combining **prefix sums** with a **monotonic deque** restores `O(n)` time.
- Dominated candidates (`j < i` with `s[j] >= s[i]`) are worse in both length and sum, justifying `pollLast()`.
- Always use 64-bit `long` for prefix sums when `n * max(|nums[i]|)` exceeds `2 * 10^9`.
