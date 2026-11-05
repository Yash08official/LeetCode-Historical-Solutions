---
comments: true
difficulty: Medium
tags:
  - Math
  - Backtracking
---

# 2698. Find the Punishment Number of an Integer

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-punishment-number-of-an-integer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2698` (`2698`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

We are given a positive integer `n`. We need to calculate the **punishment number** of `n`.

The punishment number is defined as the sum of `i * i` for all integers `i` in the range `1 <= i <= n` that satisfy a specific condition: the decimal string representation of the square `i * i` can be partitioned into contiguous substrings such that the sum of the integer values of those substrings equals `i`.

If no valid partition of `i * i` exists that adds up to `i`, that square is not included in the sum. We must check every integer from `1` to `n` and return the total sum of all qualifying squares.

---

## Examples

### Example 1

```text
Input: n = 10
Output: 182
Explanation: There are exactly 3 integers i in the range [1, 10] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 and 1 with a sum equal to 8 + 1 == 9.
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 and 0 with a sum equal to 10 + 0 == 10.
Hence, the punishment number of 10 is 1 + 81 + 100 = 182
```

### Example 2

```text
Input: n = 37
Output: 1478
Explanation: There are exactly 4 integers i in the range [1, 37] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1.
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 + 1.
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 + 0.
- 36 since 36 * 36 = 1296 and 1296 can be partitioned into 1 + 29 + 6.
Hence, the punishment number of 37 is 1 + 81 + 100 + 1296 = 1478
```

---

## Constraints

- `1 <= n <= 1000`

---

## Problem Understanding

Key observations and constraints:
- The input range is `1 <= n <= 1000`. Thus, `i * i` is at most `1000 * 1000 = 1,000,000`, which has at most 7 decimal digits.
- A partition divides the digit string into consecutive contiguous segments without skipping or reordering characters.
- Each segment is interpreted as a standard base-10 integer (leading zeros are evaluated normally, e.g., '0' is 0).
- Because the string length is very small (at most 7 digits), there are at most $2^{m-1} \le 2^6 = 64$ possible partitions for any square, making recursive backtracking extremely fast.
- Pruning is possible: if the running segment or accumulated sum exceeds the target `i`, that branch can be terminated early.

---

## Approach

### Brute Force Approach

A naive brute-force approach iterates through every integer `i` from `1` to `n`. For each integer, it computes `x = i * i`, converts it to a string, and explores all possible ways to insert partition boundaries using recursion. Without early pruning, evaluating all $2^{m-1}$ partitions for each `i` up to `1000` takes $O(n \cdot 2^m)$ operations. While $2^6$ is small, unpruned generation of all combinations can perform unnecessary recursive calls when segment values already exceed `i`.

### Optimized Approach

The implemented solution iterates `i` from `1` to `n` and tests each square `x = i * i` using a backtracking helper `check(s, i, x)`. The helper iterates through possible cut points `j` starting at index `i`, accumulating digits into integer `y`. If `y > x`, it immediately breaks the loop because further digits will only make `y` larger. Otherwise, it recursively checks if the remainder of the string can sum to `x - y`. When a valid partition is found, `x` is added to the running total `ans`.

### Step-by-Step Thinking Process

1. Recognize that the upper bound `n = 1000` means `i * i` has between 1 and 7 digits.
2. Formulate the validation as a subset-partitioning problem on the string representation of `i * i` with target sum `i`.
3. Design a recursive backtracking helper `check(String s, int i, int x)` where `s` is the square string, `i` is the current character index, and `x` is the remaining target sum.
4. In `check`, if `i >= s.length()`, check if `x == 0`. Otherwise, loop `j` from `i` to `s.length() - 1`, forming the number `y` incrementally.
5. Prune branches where `y > x` with a `break` statement since appending more digits will only strictly increase `y`.
6. Accumulate `x = i * i` into `ans` whenever `check` returns `true`, and return `ans` after testing all `i` from 1 to `n`.

### Algorithm / Intuition

In `punishmentNumber(n)`, we maintain an accumulator `ans = 0`. For each integer `i` from `1` to `n`, we compute `x = i * i` and invoke `check(x + "", 0, i)`. The helper `check(s, i, x)` tracks the current character offset `i` and remaining required sum `x`.

Inside `check`, base case: if `i >= m` (where `m = s.length()`), we have consumed all digits, so we return `x == 0`. Otherwise, we iterate `j` from `i` to `m - 1` and update `y = y * 10 + (s.charAt(j) - '0')`. Crucially, if `y > x`, any further digits appended to `y` will also exceed `x`, so we immediately `break`. If `check(s, j + 1, x - y)` evaluates to `true`, the current partition is valid and we return `true` immediately up the call stack.

---

## Dry Run

We trace Example 1 with `n = 10`:

- `i = 1`: `x = 1`, `s = "1"`. `check("1", 0, 1)`: `j = 0`, `y = 1`, `check("1", 1, 0)` returns `true` (`x == 0`). `ans += 1` -> `ans = 1`.
- `i = 2`: `x = 4`, `s = "4"`. `check("4", 0, 2)`: `y = 4 > 2`, breaks. Returns `false`.
- `i = 3` to `8`: None satisfy partition condition (e.g., `i = 9`: `x = 81`, `s = "81"`).
- `i = 9`: `x = 81`, `s = "81"`. `check("81", 0, 9)`:
  - `j = 0`: `y = 8`. Calls `check("81", 1, 9 - 8 = 1)`.
  - In subcall `i = 1`: `j = 1`, `y = 1`. Calls `check("81", 2, 1 - 1 = 0)`.
  - Base case reached: `i = 2 >= 2`, `x == 0` is `true`. `ans += 81` -> `ans = 82`.
- `i = 10`: `x = 100`, `s = "100"`. `check("100", 0, 10)`:
  - `j = 0`: `y = 1`. Calls `check("100", 1, 9)` -> no valid partition from "00".
  - `j = 1`: `y = 10`. Calls `check("100", 2, 0)`.
  - In subcall `i = 2`: `j = 2`, `y = 0`. Calls `check("100", 3, 0)` -> returns `true`.
  - Valid partition `10 + 0 = 10`. `ans += 100` -> `ans = 182`.
- Loop terminates at `i = 10`. Return `ans = 182`.

---

## Complexity Analysis

- **Time Complexity:** `O(n \cdot 2^m)` where `n <= 1000` and `m` is the number of digits in `n^2` (at most 7 digits). For each `i`, the string length `m <= 7` yields at most $2^{m-1} \le 64$ partitions, pruned aggressively by `y > x`. In practice, checking all 1000 numbers requires fewer than $10^5$ operations total, executing in a few milliseconds.
- **Space Complexity:** `O(m)` auxiliary space, where `m <= 7` is the maximum recursion call stack depth of `check` and the temporary string length.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2698find-the-punishment-number-of-an-integer.java](./2698find-the-punishment-number-of-an-integer.java) |

---

## Key Learnings

- Recognize when constraints on input magnitude drastically bound the length of representations (7 digits max for $1000^2$).
- Backtracking with early pruning (`y > x` -> `break`) avoids exploring dead search branches in number partitioning.
- Integer conversion on the fly via `y = y * 10 + digit` avoids repeated substring allocations during recursion.
