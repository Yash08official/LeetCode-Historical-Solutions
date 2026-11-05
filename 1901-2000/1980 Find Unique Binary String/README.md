---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - String
  - Backtracking
---

# 1980. Find Unique Binary String

**[View Problem on LeetCode](https://leetcode.com/problems/find-unique-binary-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1980` (`1980`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `nums` containing `n` **distinct** binary strings, where every string has length **exactly** `n` and consists only of `'0'` and `'1'`.

Return **any** binary string of length `n` that does **not** appear anywhere in `nums`.

---

## Examples

### Example 1

```text
Input: nums = ["01","10"]
Output: "11"
Explanation: "11" does not appear in nums. "00" would also be correct.
```

### Example 2

```text
Input: nums = ["00","01"]
Output: "11"
Explanation: "11" does not appear in nums. "10" would also be correct.
```

### Example 3

```text
Input: nums = ["111","011","001"]
Output: "101"
Explanation: "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.
```

---

## Constraints

- `n == nums.length`

- `1 <= n <= 16`

- `nums[i].length == n`

- `nums[i]`is either `'0'` or `'1'`.

- All the strings of `nums` are **unique**.

---

## Problem Understanding

- There are `2^n` possible binary strings of length `n`, and `nums` only contains `n` of them (`1 <= n <= 16`). Since `2^n > n` for all `n >= 1`, at least one missing string always exists.
- Look at a neat **Pigeonhole Principle** property based on the **number of `'1'`s** (popcount) in a length-`n` binary string:
  - Any binary string of length `n` has a `'1'`-count `cnt` in the range `0, 1, 2, ..., n`—that is **`n + 1` distinct possible `'1'`-counts** (pigeonholes)!
  - Because `nums` has only **`n` strings** (pigeons), **at least one `'1'`-count `i` in `[0, n]` cannot appear in ANY string of `nums`!**
- Even better: since `n <= 16`, we can record all observed `'1'`-counts inside a single 32-bit integer bitmask `mask`!

---

## Approach

### Brute Force Approach

Inserting all `n` strings into a `HashSet<String>` and iterating through integers `0` to `2^n - 1` formatted as `n`-bit binary strings until finding one absent from the set takes `O(n * 2^n)` worst-case time if done carelessly (though at most `n + 1` checks actually suffice) and `O(n^2)` hash table memory.

### Optimized Approach

Use the **Pigeonhole Principle on `'1'`-counts** with a bitmask `mask`: count the number of `'1'`s (`cnt`) in each string of `nums` and set bit `cnt` in `mask`. Then find the first `i` (`0 <= i <= n`) whose bit in `mask` is `0`, and construct `"1".repeat(i) + "0".repeat(n - i)`.

### Step-by-Step Thinking Process

1. Observe that `n` strings can cover at most `n` distinct `'1'`-counts out of the `n + 1` possible counts `{0, 1, ..., n}`.
2. Since `n <= 16`, bits `0..16` fit comfortably inside a standard 32-bit `int mask = 0`.
3. For each string `x` in `nums`, count how many characters equal `'1'` (`cnt`) and mark that count as present via `mask |= 1 << cnt`.
4. Scan `i = 0, 1, ...` until finding an unset bit `((mask >> i & 1) == 0)`. By the Pigeonhole Principle, this loop is **guaranteed** to terminate at some `i <= n`!
5. Return any length-`n` binary string containing `i` ones—specifically `"1".repeat(i) + "0".repeat(nums.length - i)`. Because no string in `nums` has `i` ones, this string cannot equal any element of `nums`!

### Algorithm / Intuition

In `findDifferentBinaryString`, `mask` acts as a boolean set over `{0, 1, ..., n}`. For each string `x`, the inner loop computes its Hamming weight `cnt` (number of `'1'`s) and sets bit `cnt` in `mask`. Next, `for (int i = 0;; ++i)` doesn't even need an explicit upper bound `i <= nums.length` because `mask` has at most `n` set bits among positions `0..n`, guaranteeing at least one `0` bit in `[0, n]`. Once `((mask >> i & 1) == 0)` triggers, `"1".repeat(i) + "0".repeat(nums.length - i)` builds a string of length `n` with `i` ones and `n - i` zeros, which differs in `'1'`-count from **every** string in `nums`.

---

## Dry Run

Tracing Example 1: `nums = ["01", "10"]` (`n = 2`):

| Step | String / Check | Details | `mask` (binary) |
| :--- | :--- | :--- | :--- |
| Init | — | `mask = 0` | `000_2` (`0`) |
| String 1 | `x = "01"` | `cnt = 1` (`'1'` at index `1`) -> `mask \|= 1 << 1` | `010_2` (`2`) |
| String 2 | `x = "10"` | `cnt = 1` (`'1'` at index `0`) -> `mask \|= 1 << 1` | `010_2` (`2`) |
| Search `i = 0` | `(2 >> 0 & 1)` | Evaluates to `0 == 0` (`true`!) | Returns `"1".repeat(0) + "0".repeat(2)` = `"00"` |

`"00"` has length `2` and does not appear in `["01", "10"]` (as confirmed by Example 1's explanation).

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Counting `'1'`s across `n` strings of length `n` takes `O(n^2)` character comparisons, scanning `mask` takes at most `n + 1` bit checks, and building the output string takes `O(n)`.
- **Space Complexity:** `O(1)` auxiliary space (`O(n)` for the returned `String` of length `n`) — All presence tracking is packed into a single 32-bit `int mask`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1980find-unique-binary-string.java](./1980find-unique-binary-string.java) |

---

## Key Learnings

- The **Pigeonhole Principle** (`n` items into `n + 1` buckets -> at least one empty bucket) turns a search over `2^n` strings into checking `n + 1` Hamming-weight buckets!
- For `n <= 30`, a single `int` bitmask (`mask |= 1 << cnt` and `(mask >> i) & 1`) replaces a `boolean[]` or `HashSet` with zero heap allocations.
- (Alternative classic note: Cantor's Diagonalization—flipping `nums[i].charAt(i)` for each `0 <= i < n`—solves this problem in `O(n)` time!)
