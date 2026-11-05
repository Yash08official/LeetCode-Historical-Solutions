---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Dynamic Programming
  - Prefix Sum
---

# 1524. Number of Sub-arrays With Odd Sum

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1524` (`1524`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Dynamic Programming`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of positive integers `arr`, return the **number of contiguous subarrays** whose elements sum to an **odd** integer.

Because the total count can exceed 32-bit integer limits on large arrays, return the answer **modulo `10^9 + 7`**.

---

## Examples

### Example 1

```text
Input: arr = [1,3,5]
Output: 4
Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
All sub-arrays sum are [1,4,9,3,8,5].
Odd sums are [1,9,3,5] so the answer is 4.
```

### Example 2

```text
Input: arr = [2,4,6]
Output: 0
Explanation: All subarrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
All sub-arrays sum are [2,6,12,4,10,6].
All sub-arrays have even sum and the answer is 0.
```

### Example 3

```text
Input: arr = [1,2,3,4,5,6,7]
Output: 16
```

---

## Constraints

- `1 <= arr.length <= 10^5`

- `1 <= arr[i] <= 100`

---

## Problem Understanding

Using prefix sums `P[j] = arr[0] + ... + arr[j - 1]` (with `P[0] = 0`), the sum of subarray `arr[i..j - 1]` is `P[j] - P[i]`.

When is a difference `P[j] - P[i]` **odd**?
- `odd - even = odd`
- `even - odd = odd`
- (`even - even = even` and `odd - odd = even`)

Thus, a subarray ending at the current position has an **odd** sum if and only if the current prefix sum `s` and the earlier prefix sum `P[i]` have **opposite parity**!
- If current prefix sum `s` is **odd** (`s & 1 == 1`), every earlier **even** prefix sum forms an odd-sum subarray with `s`.
- If current prefix sum `s` is **even** (`s & 1 == 0`), every earlier **odd** prefix sum forms an odd-sum subarray with `s`.
- Don't forget the empty prefix `P[0] = 0`, which is **even** — so `cnt[0]` must start at `1`!

---

## Approach

### Brute Force Approach

Enumerating every subarray `(i, j)` (`0 <= i <= j < n`) and maintaining a running sum for each start `i` takes `O(n^2)` time. With `n = 10^5`, `n * (n + 1) / 2` is `~5 * 10^9` iterations, causing a Time Limit Exceeded error.

### Optimized Approach

The solution tracks **prefix sum parity counts (`cnt = {1, 0}`)** in a single `O(n)` pass with `O(1)` space:
- Initialize `cnt = {1, 0}` (`1` even prefix sum `0` seen initially, `0` odd prefix sums).
- Maintain running prefix sum `s` across `arr`.
- At each element `x`, add `x` to `s`, add the count of opposite-parity prefix sums `cnt[s & 1 ^ 1]` to `ans` modulo `10^9 + 7`, and increment `cnt[s & 1]`.

### Step-by-Step Thinking Process

1. Define `mod = (int) 1e9 + 7` and `int[] cnt = {1, 0}` where `cnt[0]` counts even prefix sums (seeded with `1` for `P[0] = 0`) and `cnt[1]` counts odd prefix sums.
2. Maintain running prefix sum `s = 0` (safe from `int` overflow because `arr.length <= 10^5` and `arr[i] <= 100` implies `s <= 10^7`).
3. For each `x` in `arr`, update `s += x` and extract current parity `s & 1`.
4. Look up the opposite parity via `(s & 1) ^ 1` (in Java, `&` has higher precedence than `^`, so `s & 1 ^ 1` parses as `(s & 1) ^ 1`) and update `ans = (ans + cnt[s & 1 ^ 1]) % mod`.
5. Record the current prefix sum parity with `++cnt[s & 1]` and return `ans` after the loop.

### Algorithm / Intuition

Every subarray `arr[l..r]` corresponds bijectively to a pair of prefix indices `(l, r + 1)`. By keeping `cnt[0]` (even prefixes seen so far) and `cnt[1]` (odd prefixes seen so far), `cnt[s & 1 ^ 1]` counts **all** valid left endpoints `l` for the current right endpoint in `O(1)` time! Seeding `cnt[0] = 1` ensures subarrays starting at index `0` (`arr[0..r]`, where `s` itself is odd) are counted seamlessly without special `if` branches.

---

## Dry Run

Trace on **Example 1**: `arr = [1, 3, 5]`

Initial state: `cnt = [1, 0]`, `s = 0`, `ans = 0`.

| Step | `x` | `s` | Parity `s & 1` | Opposite `s & 1 ^ 1` | Added `cnt[opp]` | `ans` | `cnt` after `++cnt[s & 1]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `1` | `1` | `1` (odd) | `0` (even) | `cnt[0] = 1` (`[1]`) | `1` | `[1, 1]` |
| 2 | `3` | `4` | `0` (even) | `1` (odd) | `cnt[1] = 1` (`[3]`) | `2` | `[2, 1]` |
| 3 | `5` | `9` | `1` (odd) | `0` (even) | `cnt[0] = 2` (`[1,3,5]`, `[5]`) | `4` | `[2, 2]` |

Returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Single pass through `arr` of length `n` with `O(1)` bitwise and arithmetic operations per element.
- **Space Complexity:** `O(1)` — Only the 2-element array `cnt` and scalar `int` variables (`mod`, `ans`, `s`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1524number-of-sub-arrays-with-odd-sum.java](./1524number-of-sub-arrays-with-odd-sum.java) |

---

## Key Learnings

- Counting subarrays with a modular sum property (`sum % k == target`) almost always reduces to counting earlier prefix sums in a frequency table — here `k = 2` needs just `int[2]`!
- Initializing `cnt[0] = 1` represents the empty prefix `P[0] = 0` and avoids writing separate logic for subarrays starting at index `0`.
- In Java/C/JS operator precedence, bitwise AND (`&`) binds tighter than bitwise XOR (`^`), so `s & 1 ^ 1` evaluates `(s & 1) ^ 1` (adding parentheses `(s & 1) ^ 1` can improve readability).
