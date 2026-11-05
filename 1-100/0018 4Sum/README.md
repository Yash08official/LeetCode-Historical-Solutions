---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Sorting
---

# 18. 4Sum

**[View Problem on LeetCode](https://leetcode.com/problems/4sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0018` (`18`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` of length `n` and an integer `target`, return all **unique** quadruplets `[nums[a], nums[b], nums[c], nums[d]]` at four pairwise distinct indices (`a, b, c, d`) such that `nums[a] + nums[b] + nums[c] + nums[d] == target`.

Quadruplets may be returned in any order and must not contain duplicate value combinations.

---

## Examples

### Example 1

```text
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

### Example 2

```text
Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
```

---

## Constraints

- `1 <= nums.length <= 200`

- `-10^9 <= nums[i] <= 10^9`

- `-10^9 <= target <= 10^9`

---

## Problem Understanding

- **32-bit integer overflow trap:** Unlike `3Sum` (`|nums[i]| <= 10^5`), here `|nums[i]| <= 10^9`! Adding four values near `10^9` reaches `4 * 10^9`, overflowing Java's signed 32-bit `int` (`max ~2.14 * 10^9`). Casting to `long` before addition is mandatory.
- **Why `nums[i] <= target` pruning does NOT apply blindly:** Unlike `3Sum` where `target == 0`, `target` here can be negative (e.g., `nums = [-4, -3, -2, -1]`, `target = -10`: `-4 > -10`, yet `-4 + (-3) + (-2) + (-1) == -10`!).
- **Short arrays:** `n` can be `< 4` (`1 <= n <= 200`), requiring an immediate empty return.

---

## Approach

### Brute Force Approach

Test all `O(n^4)` index quadruplets `(a, b, c, d)` and deduplicate sorted quadruplets with a `HashSet`. Even for `n = 200`, `200^4 / 24 ≈ 6.6 * 10^7` iterations plus boxing/hashing overhead makes `O(n^4)` sluggish.

### Optimized Approach

Sort `nums`, fix the first two elements via nested loops `i` and `j` (skipping duplicates at each level), and run a two-pointer scan (`k = j + 1`, `l = n - 1`) using 64-bit `long` arithmetic.

### Step-by-Step Thinking Process

1. Return an empty list immediately if `n < 4`; otherwise sort `nums` ascending.
2. Outer loop `i` from `0` to `n - 4`, skipping duplicates when `i > 0 && nums[i] == nums[i - 1]`.
3. Second loop `j` from `i + 1` to `n - 3`, skipping duplicates when `j > i + 1 && nums[j] == nums[j - 1]`.
4. Two-pointer scan with `k = j + 1` and `l = n - 1`: compute `long x = (long) nums[i] + nums[j] + nums[k] + nums[l]`.
5. Adjust `++k` if `x < target`, `--l` if `x > target`, or record `List.of(nums[i], nums[j], nums[k++], nums[l--])` and advance `k` and `l` past duplicates.

### Algorithm / Intuition

In `184sum.java`, notice two subtle correctness details:
1. `(long) nums[i] + nums[j] + nums[k] + nums[l]` casts the **first** operand `nums[i]` to `long`, promoting all three subsequent `+` operations to 64-bit `long` arithmetic (`(long) (nums[i] + ...)` would cast too late!).
2. In the second loop, the duplicate guard is `j > i + 1` (not `j > 0`!), allowing `nums[j]` to equal `nums[i]` on its very first step `j = i + 1` (needed for inputs like `[2, 2, 2, 2]`, `target = 8`) while skipping repeated `nums[j]` values thereafter.

---

## Dry Run

**Input:** `nums = [1, 0, -1, 0, -2, 2]`, `target = 0`

1. Sort `nums` -> `[-2, -1, 0, 0, 1, 2]` (`n = 6`).
2. **`i = 0` (`-2`):**
   - `j = 1` (`-1`): `k = 2` (`0`), `l = 5` (`2`) -> `x = -1 < 0` (`++k`); `k = 4` (`1`), `l = 5` (`2`) -> `x = 0` -> add **`[-2, -1, 1, 2]`**.
   - `j = 2` (`0`): `k = 3` (`0`), `l = 5` (`2`) -> `x = 0` -> add **`[-2, 0, 0, 2]`**.
   - `j = 3` (`0`): `j > 1 && nums[3] == nums[2]` -> **skipped**.
3. **`i = 1` (`-1`):**
   - `j = 2` (`0`): `k = 3` (`0`), `l = 5` (`2`) -> `x = 1 > 0` (`--l`); `k = 3` (`0`), `l = 4` (`1`) -> `x = 0` -> add **`[-1, 0, 0, 1]`**.
   - `j = 3` (`0`): **skipped**.
4. **`i = 2` (`0`):** `j = 3` (`0`), `k = 4` (`1`), `l = 5` (`2`) -> `x = 3 > 0`, no matches.

**Output:** `[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]`

---

## Complexity Analysis

- **Time Complexity:** `O(n^3)` — Sorting takes `O(n log n)`, and two nested loops (`i`, `j`) driving an `O(n)` two-pointer scan (`k`, `l`) take `O(n^3)` time.
- **Space Complexity:** `O(log n)` auxiliary space — Used by `Arrays.sort` on `int[]` (excluding the output list `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [184sum.java](./184sum.java) |

---

## Key Learnings

- Always check value bounds before summing multiple `int`s: `4 * 10^9` overflows 32-bit `int`, so cast the **first** term `(long) nums[i]` before adding.
- Generalizing `kSum` reduces `k` nested loops to `k - 2` anchor loops plus an `O(n)` two-pointer base case (`O(n^(k - 1))`).
- Duplicate-skip guards in nested loops must check `index > startIndex` (`i > 0`, `j > i + 1`) so legitimate equal elements across distinct positions aren't dropped.
