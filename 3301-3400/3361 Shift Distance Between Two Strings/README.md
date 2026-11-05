---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Prefix Sum
---

# 3361. Shift Distance Between Two Strings

**[View Problem on LeetCode](https://leetcode.com/problems/shift-distance-between-two-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3361` (`3361`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Prefix Sum` |
| **Solution Language** | Python 3 |

---

## Problem Description

You are given two strings `s` and `t` of the same length, along with two integer arrays `nextCost` and `previousCost`, each of size 26.

In one operation, you can choose any index `i` of `s` and perform either of the following shifts:
1. Shift `s[i]` to the next letter in the alphabet (wrapping `'z'` to `'a'`). This costs `nextCost[c - 'a']`, where `c` is the letter before shifting.
2. Shift `s[i]` to the previous letter in the alphabet (wrapping `'a'` to `'z'`). This costs `previousCost[c - 'a']`, where `c` is the letter before shifting.

Return the minimum total cost to transform string `s` into string `t`.

---

## Examples

### Example 1

**Input:** `s = "abab", t = "baba", nextCost = [100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], previousCost = [1,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]`

**Output:** `2`

**Explanation:**

- We choose index `i = 0` and shift `s[0]` 25 times to the previous character for a total cost of 1.

- We choose index `i = 1` and shift `s[1]` 25 times to the next character for a total cost of 0.

- We choose index `i = 2` and shift `s[2]` 25 times to the previous character for a total cost of 1.

- We choose index `i = 3` and shift `s[3]` 25 times to the next character for a total cost of 0.

### Example 2

**Input:** `s = "leet", t = "code", nextCost = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], previousCost = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]`

**Output:** `31`

**Explanation:**

- We choose index `i = 0` and shift `s[0]` 9 times to the previous character for a total cost of 9.

- We choose index `i = 1` and shift `s[1]` 10 times to the next character for a total cost of 10.

- We choose index `i = 2` and shift `s[2]` 1 time to the previous character for a total cost of 1.

- We choose index `i = 3` and shift `s[3]` 11 times to the next character for a total cost of 11.

---

## Constraints

- `1 <= s.length == t.length <= 10^5`

- `s` and `t` consist only of lowercase English letters.

- `nextCost.length == previousCost.length == 26`

- `0 <= nextCost[i], previousCost[i] <= 10^9`

---

## Problem Understanding

- **Character Independence:** Transforming `s[i]` into `t[i]` is completely independent for each index `i`. Total cost is the sum of minimum shift costs across all indices `0 <= i < n`.
- **Two Directional Paths:** For any pair of characters `s[i] = a` and `t[i] = b`:
  1. Forward shifting: moves `a -> a+1 -> ... -> b` wrapping around `'z'` to `'a'` if necessary.
  2. Backward shifting: moves `a -> a-1 -> ... -> b` wrapping around `'a'` to `'z'` if necessary.
- **Prefix Sum Optimization:** With 26 letters, range sum costs across circular intervals can be queried in `O(1)` using prefix sum arrays of `nextCost` and `previousCost`.

---

## Approach

### Brute Force Approach

For each character `i` in `s`, simulate stepping forward from `s[i]` to `t[i]` by summing `nextCost`, and simulate stepping backward from `s[i]` to `t[i]` by summing `previousCost`. Since the alphabet size is 26, stepping takes at most 26 operations per character. While this takes `O(26 * n)` time, using prefix sums provides instant `O(1)` range queries.

### Optimized Approach

We construct prefix sum arrays `pre1` for `nextCost` and `pre2` for `previousCost` of size 27. For each index `i`, let `a = ord(s[i]) - 97` and `b = ord(t[i]) - 97`. If `a == b`, cost is 0. If `a < b`, the forward cost is `pre1[b] - pre1[a]`, and the backward cost is `pre2[a + 1] + pre2[-1] - pre2[b + 1]`. If `a > b`, the backward cost is `pre2[a + 1] - pre2[b + 1]`, and the forward cost is `pre1[-1] - pre1[a] + pre1[b]`. We add `min(forward, backward)` to `ans` and return `ans`.

### Step-by-Step Thinking Process

1. Each character position is decoupled: `totalCost = sum(minCost(s[i] -> t[i]))`.
2. For each character, the distance can only be traveled forward (clockwise) or backward (counter-clockwise) on the 26-letter ring.
3. Precompute prefix sums `pre1` of `nextCost` and `pre2` of `previousCost` to allow `O(1)` interval sums.
4. When `a < b`:
  - Forward cost = `pre1[b] - pre1[a]`.
  - Backward cost = `(pre2[a+1] - pre2[0]) + (pre2[26] - pre2[b+1])`.
5. When `a > b`:
  - Backward cost = `pre2[a+1] - pre2[b+1]`.
  - Forward cost = `(pre1[26] - pre1[a]) + (pre1[b] - pre1[0])`.
6. Accumulate the minimum of the two directional costs for each position `i`.

### Algorithm / Intuition

In `Solution.shiftDistance`: `pre1` stores prefix sums of `nextCost` and `pre2` stores prefix sums of `previousCost`. For every index `i`, characters are converted to 0-indexed integers `a` and `b`. If `a == b`, no shift is needed. When `a < b`, forward motion is direct from `a` to `b`, with cost `pre1[b] - pre1[a]`. Backward motion goes from `a` down to `0` (cost `pre2[a + 1]`) and wraps from `25` down to `b` (cost `pre2[-1] - pre2[b + 1]`). When `a > b`, backward motion is direct from `a` down to `b`, with cost `pre2[a + 1] - pre2[b + 1]`, while forward motion traverses `a` up to `25` (cost `pre1[-1] - pre1[a]`) and wraps from `0` to `b` (cost `pre1[b]`). The smaller of the two costs is added to `ans`, producing the exact minimum total cost.

---

## Dry Run

### Step-by-Step Execution on Example 1: `s = "abab"`, `t = "baba"`

`nextCost`: `nextCost[0] = 100`, others = 0. `previousCost`: `previousCost[0] = 1`, `previousCost[1] = 100`, others = 0.

- `i = 0`: `s[0] = 'a' (0)`, `t[0] = 'b' (1)`. `a < b`.
  - Forward cost (`0 -> 1`): `pre1[1] - pre1[0] = nextCost[0] = 100`.
  - Backward cost (`0 -> 25 -> ... -> 1`): `pre2[1] + pre2[26] - pre2[2] = 1 + 0 = 1`.
  - Min cost = 1. `ans = 1`.

- `i = 1`: `s[1] = 'b' (1)`, `t[1] = 'a' (0)`. `a > b`.
  - Backward cost (`1 -> 0`): `previousCost[1] = 100`.
  - Forward cost (`1 -> 2 -> ... -> 25 -> 0`): all zero except wrapping. Sum of `nextCost[1..25]` = 0. Cost = 0.
  - Min cost = 0. `ans = 1 + 0 = 1`.

- `i = 2`: `'a' -> 'b'`, same as `i = 0`, min cost = 1. `ans = 2`.
- `i = 3`: `'b' -> 'a'`, same as `i = 1`, min cost = 0. `ans = 2`.

Result: `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Building prefix arrays of size 26 takes `O(1)` time. Processing `n` characters requires `O(1)` arithmetic operations per character.
- **Space Complexity:** `O(1)` — Auxiliary prefix arrays `pre1` and `pre2` have fixed size 27.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Python 3** | [3361shift-distance-between-two-strings.py](./3361shift-distance-between-two-strings.py) |

---

## Key Learnings

- On circular modular rings (like the 26-letter alphabet), the shortest path between two points can be taken either clockwise or counter-clockwise.
- Precomputing prefix sums on the cost arrays turns circular interval cost evaluations into `O(1)` expressions.
