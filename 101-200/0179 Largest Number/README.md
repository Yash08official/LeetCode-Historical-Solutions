---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Greedy
  - Sorting
---

# 179. Largest Number

**[View Problem on LeetCode](https://leetcode.com/problems/largest-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0179` (`179`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Greedy`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array of non-negative integers `nums`, reorder its elements so that concatenating their base-10 representations side by side produces the **largest possible integer**.

Because the concatenated number can easily exceed 64-bit integer limits (up to `100` integers of `10` digits each), return the final result as a **string** without leading zeroes (unless the number itself is `"0"`).

---

## Examples

### Example 1

```text
Input: nums = [10,2]
Output: "210"
```

### Example 2

```text
Input: nums = [3,30,34,5,9]
Output: "9534330"
```

---

## Constraints

- `1 <= nums.length <= 100`

- `0 <= nums[i] <= 10^9`

---

## Problem Understanding

- **Standard Lexicographical Sort Fails on Prefixes:** Plain string sorting puts `"30"` ahead of `"3"` (`"30" > "3"`), yielding `"303"`, whereas `"3" + "30" = "330"` is strictly larger!
- **Pairwise Concatenation Comparator:** Between two stringified numbers `a` and `b`, `a` should precede `b` if and only if concatenating `a + b` is lexicographically larger than `b + a` (which equals numerical comparison because `a + b` and `b + a` have the exact same character length!).
- **All-Zeroes Edge Case:** Input `nums = [0, 0]` sorts to `["0", "0"]` and joins to `"00"`, which is not a valid canonical integer representation—we must return `"0"` whenever the largest placed token is `"0"`.

---

## Approach

### Brute Force Approach

Generating all `n!` permutations of `nums`, joining each into a string, and tracking the maximum takes `O(n! * n * k)` time, which blows up immediately beyond `n = 10` (here `n <= 100`).

### Optimized Approach

Convert all numbers to strings (`vs`), **Greedy-Sort** them using the transitive custom comparator `(b + a).localeCompare(a + b)`, check if `vs[0] === "0"` to handle all-zero inputs, and join `vs` into a single string.

### Step-by-Step Thinking Process

1. Map every integer in `nums` to its string form in `vs = nums.map(v => v.toString())`.
2. Sort `vs` in descending concatenation order: compare `(b + a)` against `(a + b)` using `.localeCompare(...)`. Since `b + a` and `a + b` have identical string lengths (`a.length + b.length`), ASCII/lexicographical comparison matches exact numerical magnitude without BigInt parsing.
3. Because this relation is transitive (mathematically equivalent to comparing fractions `val(a) / (10^{len(a)} - 1)`), standard `Array.prototype.sort` reaches the globally optimal arrangement.
4. Guard the leading-zero trap: if `vs[0] === "0"`, every element in `vs` must also be `"0"`, so return `"0"`; otherwise return `vs.join("")`.

### Algorithm / Intuition

Why is comparing `a + b` vs `b + a` guaranteed to produce the globally largest concatenation and not just a local optimum? Algebraically, `a + b > b + a` holds if and only if `a * 10^{|b|} + b > b * 10^{|a|} + a`, which rearranges to `a / (10^{|a|} - 1) > b / (10^{|b|} - 1)` (comparing infinite repeating decimals `0.aaa...` vs `0.bbb...`). Because real-number `>` is strictly transitive, `vs.sort((a, b) => (b + a).localeCompare(a + b))` defines a valid total weak ordering. And if the highest-ranked string `vs[0]` is `"0"`, no positive integer exists anywhere in `nums`, making `"0"` the exact answer.

---

## Dry Run

Trace on **Example 1** (`nums = [10, 2]`) and **Example 2** (`nums = [3, 30, 34, 5, 9]`):

- **Example 1 (`nums = [10, 2]`):**
  1. `vs = ["10", "2"]`.
  2. Comparator on `a = "10", b = "2"`: `b + a = "210"`, `a + b = "102"`. `"210".localeCompare("102") > 0`, so `"2"` is placed before `"10"` -> `vs = ["2", "10"]`.
  3. `vs[0]` is `"2" !== "0"`.
  4. `vs.join("")` returns `"210"`.
- **Quick check on `"3"` vs `"30"` in Example 2:** `"330" > "303"`, placing `"3"` before `"30"`, yielding `["9", "5", "34", "3", "30"]` -> `"9534330"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * k * log n)` — Sorting `n` strings makes `O(n log n)` comparisons, and each `(b + a).localeCompare(a + b)` concatenates and compares up to `2k` characters (`k <= 10` digits).
- **Space Complexity:** `O(n * k)` — Storing the string array `vs` and joined output string of total length up to `n * k`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [179largest-number.js](./179largest-number.js) |

---

## Key Learnings

- Custom greedy sort comparators **must** satisfy transitivity (`a >= b` and `b >= c` implies `a >= c`)—here `a / (10^{|a|} - 1)` proves transitivity rigorously.
- Equal-length digit strings can always be compared numerically in `O(k)` via standard lexicographical comparison without risking 64-bit float/integer overflow.
- Always test `[0, 0]` on string-number formatting problems to ensure you don't return `"00"`.
