---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
  - Bit Manipulation
  - Enumeration
---

# 2044. Count Number of Maximum Bitwise-OR Subsets

**[View Problem on LeetCode](https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2044` (`2044`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking`, `Bit Manipulation`, `Enumeration` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a **0-indexed** integer array `nums`, first determine the **maximum bitwise OR** achievable by any subset of `nums`, and then return the **number of distinct non-empty subsets** (distinguished by chosen indices) whose bitwise OR equals that maximum.

---

## Examples

### Example 1

```text
Input: nums = [3,1]
Output: 2
Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
- [3]
- [3,1]
```

### Example 2

```text
Input: nums = [2,2,2]
Output: 7
Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 2^3 - 1 = 7 total subsets.
```

### Example 3

```text
Input: nums = [3,2,1,5]
Output: 6
Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
- [3,5]
- [3,1,5]
- [3,2,5]
- [3,2,1,5]
- [2,5]
- [2,1,5]
```

---

## Constraints

- `1 <= nums.length <= 16`

- `1 <= nums[i] <= 10^5`

---

## Problem Understanding

- **Key Bitwise Property:** Bitwise OR (`|`) is monotonically non-decreasing in bits—OR-ing an extra number can turn `0` bits into `1` bits, and **never** turns a `1` bit back into `0`! Therefore, the **maximum possible bitwise OR** across all subsets is simply the bitwise OR of the **entire array `nums`**!
- Look at the constraint: `1 <= nums.length <= 16`. With at most `16` elements, there are at most `2^16 = 65,536` subsets in total, so exploring every subset via recursion runs in well under a millisecond!
- Because `nums[i] >= 1`, `maxOr >= 1`, whereas the empty subset has `currentOr = 0`, so `currentOr === maxOr` automatically excludes the empty subset!

---

## Approach

### Brute Force Approach

Without realizing `maxOr` equals the OR of the entire array, a two-phase brute force might generate all `2^n - 1` subset arrays explicitly in memory, compute each array's OR from scratch (`O(n * 2^n)` time and space), find the max, and scan them again to count matches.

### Optimized Approach

First compute `maxOr` in one `O(n)` loop by OR-ing all elements of `nums`. Then run a recursive backtracking function `solve(index, currentOr)` that branches on **including** (`currentOr | nums[index]`) vs **excluding** (`currentOr`) each element, returning `1` at the leaf (`index === nums.length`) whenever `currentOr === maxOr`.

### Step-by-Step Thinking Process

1. Compute `maxOr` upfront by folding `maxOr |= num` across every `num` in `nums`.
2. Define recursive helper `solve(index, currentOr)` representing how many subsets of `nums[index .. n-1]`, combined with accumulated OR `currentOr`, reach `maxOr`.
3. Base case: when `index === nums.length`, return `1` if `currentOr === maxOr`, else `0`.
4. Recursive step: compute `include = solve(index + 1, currentOr | nums[index])` and `exclude = solve(index + 1, currentOr)`, and return `include + exclude`.
5. Invoke `solve(0, 0)`.

### Algorithm / Intuition

In `countMaxOrSubsets`, passing `currentOr` down the recursion tree maintains the bitwise OR incrementally in `O(1)` per recursive call rather than materializing subset arrays. Each index `0 .. n-1` creates a binary decision (`include` vs `exclude`), visiting all `2^n` leaves. Because `1 <= nums[i]`, `maxOr` is strictly positive, so the single all-exclude path ending with `currentOr = 0` evaluates `0 === maxOr` as `false` (`0`), ensuring only non-empty subsets are counted.

---

## Dry Run

Tracing Example 1: `nums = [3, 1]`:

- **Step 1:** `maxOr = 0 | 3 | 1 = 3`.
- **Step 2:** Recursion tree from `solve(0, 0)`:
  - `solve(0, 0)` at `nums[0] = 3`:
    - **Include `3`:** `solve(1, 0 | 3)` = `solve(1, 3)` at `nums[1] = 1`:
      - **Include `1`:** `solve(2, 3 | 1)` = `solve(2, 3)` -> leaf (`index === 2`), `3 === 3` -> returns **`1`** (subset `[3, 1]`).
      - **Exclude `1`:** `solve(2, 3)` -> leaf (`index === 2`), `3 === 3` -> returns **`1`** (subset `[3]`).
      - `solve(1, 3)` returns `1 + 1 = 2`.
    - **Exclude `3`:** `solve(1, 0)` at `nums[1] = 1`:
      - **Include `1`:** `solve(2, 0 | 1)` = `solve(2, 1)` -> leaf, `1 === 3` (`false`) -> returns `0` (subset `[1]`).
      - **Exclude `1`:** `solve(2, 0)` -> leaf, `0 === 3` (`false`) -> returns `0` (empty subset `[]`).
      - `solve(1, 0)` returns `0 + 0 = 0`.
  - `solve(0, 0)` returns `2 + 0 = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(2^n)` — Computes `maxOr` in `O(n)` and visits `2^(n + 1) - 1` recursive states with `O(1)` bitwise work per call (`2^16 = 65,536` leaves for `n <= 16`).
- **Space Complexity:** `O(n)` — The recursion call stack reaches depth `n <= 16` with no heap-allocated subset arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2044count-number-of-maximum-bitwise-or-subsets.js](./2044count-number-of-maximum-bitwise-or-subsets.js) |

---

## Key Learnings

- Check input constraints first: `n <= 16` is a classic signal that `O(2^n)` subset enumeration (`65,536` states) is completely fast.
- Monotone operations like bitwise OR (`|`) and GCD reach their global extremum across **all** elements (`OR` of whole array = max OR; `GCD` of whole array = min GCD).
- (Bonus pruning tip: if `currentOr === maxOr` at `index`, all `2^(n - index)` completions in that subtree will also have `maxOr`, allowing early return `1 << (nums.length - index)`!)
