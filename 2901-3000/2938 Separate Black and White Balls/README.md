---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
  - Greedy
---

# 2938. Separate Black and White Balls

**[View Problem on LeetCode](https://leetcode.com/problems/separate-black-and-white-balls/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2938` (`2938`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

We are given a binary string `s` of length `n`, where `'1'` represents a black ball and `'0'` represents a white ball. In one operation, we can swap any two adjacent balls.

Our objective is to group all black balls (`'1'`) to the right and all white balls (`'0'`) to the left using the minimum number of adjacent swaps. We need to return this minimum number of operations as a 64-bit integer (`long`).

---

## Examples

### Example 1

```text
Input: s = "101"
Output: 1
Explanation: We can group all the black balls to the right in the following way:
- Swap s[0] and s[1], s = "011".
Initially, 1s are not grouped together, requiring at least 1 step to group them to the right.
```

### Example 2

```text
Input: s = "100"
Output: 2
Explanation: We can group all the black balls to the right in the following way:
- Swap s[0] and s[1], s = "010".
- Swap s[1] and s[2], s = "001".
It can be proven that the minimum number of steps needed is 2.
```

### Example 3

```text
Input: s = "0111"
Output: 0
Explanation: All the black balls are already grouped to the right.
```

---

## Constraints

- `1 <= n == s.length <= 10^5`

- `s[i]` is either `'0'` or `'1'`.

---

## Problem Understanding

Key insights and constraints:
- Swapping adjacent elements is identical to the fundamental operation of bubble sort, where the minimum number of swaps equals the number of inversions between `'1'`s and `'0'`s.
- Every black ball `'1'` must end up after every white ball `'0'`.
- Therefore, each `'1'` must cross every `'0'` that currently lies to its right.
- Because `n` can be up to `10^5`, the total number of swaps can reach `O(n^2)` in the worst case (e.g., `s` has `50,000` `'1'`s followed by `50,000` `'0'`s gives `2.5 * 10^9` swaps). This requires a 64-bit integer `long` to avoid integer overflow, and an `O(n)` linear algorithm.

---

## Approach

### Brute Force Approach

A brute-force simulation would repeatedly find adjacent pairs `"10"` and swap them into `"01"` until no `'1'` precedes any `'0'`. In the worst-case scenario where all `'1'`s start before all `'0'`s, this requires `O(n^2)` individual swaps, which exceeds time limits for `n = 10^5`.

### Optimized Approach

We iterate from right to left (index `n - 1` down to `0`). We maintain a counter `cnt` of the number of `'1'`s already encountered to the right. When we encounter a `'1'` at index `i`, it must be placed at the rightmost available slot among the black balls, which is index `(n - 1) - (cnt - 1) = n - cnt`. The number of swaps needed to move this ball past the remaining `'0'`s is `(n - 1 - i) - (cnt - 1) = n - i - cnt`. We accumulate this into `ans`.

### Step-by-Step Thinking Process

1. The problem asks for the minimum swaps of adjacent elements to move all `'1'`s to the right of all `'0'`s.
2. Each adjacent swap changes the relative order of two elements. The minimum number of adjacent swaps to sort a binary array is the total number of pairs `(i, j)` such that `i < j`, `s[i] == '1'`, and `s[j] == '0'`.
3. Equivalently, traversing backwards from `n - 1` down to `0`: each time we encounter `'1'`, how far does it need to travel? It needs to move past all `'0'`s to its right.
4. The number of `'0'`s to the right of index `i` is the total elements to the right `(n - 1 - i)` minus the number of `'1'`s already seen to the right (`cnt - 1`). Thus, the distance is `n - i - cnt`.
5. Accumulate this value into a 64-bit variable `ans`.

### Algorithm / Intuition

Let `cnt` track how many `'1'`s we have processed from the right end of the string:
1. Initialize `ans = 0` and `cnt = 0`.
2. Loop `i` from `n - 1` down to `0`:
   - If `s.charAt(i) == '1'`, we increment `cnt`. Now this ball is the `cnt`-th black ball from the right.
   - The number of white balls to its right equals `(n - 1 - i) - (cnt - 1) = n - i - cnt`.
   - Each of those white balls must be crossed by this black ball, contributing `n - i - cnt` swaps to `ans`.
3. Return `ans`.

---

## Dry Run

Trace on Example 1: `s = "101"` (`n = 3`)

- Initialize `ans = 0`, `cnt = 0`.
- `i = 2`: `s[2] == '1'`. `++cnt` -> `cnt = 1`. `ans += 3 - 2 - 1 = 0`. (`ans = 0`).
- `i = 1`: `s[1] == '0'`. No operation.
- `i = 0`: `s[0] == '1'`. `++cnt` -> `cnt = 2`. `ans += 3 - 0 - 2 = 1`. (`ans = 1`).
- Loop ends. Return `ans = 1`.

---

## Complexity Analysis

- **Time Complexity:** O(n) — We traverse the string `s` of length `n` backwards in a single pass, doing O(1) arithmetic operations per character.
- **Space Complexity:** O(1) — Only a few primitive integer and long variables (`ans`, `cnt`, `n`, `i`) are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2938separate-black-and-white-balls.java](./2938separate-black-and-white-balls.java) |

---

## Key Learnings

- Adjacent swap sorting problems on binary sequences are equivalent to counting inversions.
- Instead of simulating physical swaps, inversion counting can be computed in a single linear pass.
- Accumulated swap counts can exceed `2^31 - 1`, requiring a 64-bit integer (`long`) accumulator.
