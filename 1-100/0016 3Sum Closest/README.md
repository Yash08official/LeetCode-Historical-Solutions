---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Sorting
---

# 16. 3Sum Closest

**[View Problem on LeetCode](https://leetcode.com/problems/3sum-closest/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0016` (`16`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` of length `n` and an integer `target`, choose three elements at **distinct indices** in `nums` whose sum is as close as possible to `target` (minimizing `|sum - target|`), and return **that three-element sum**.

Each input is guaranteed to have a single unique closest sum.

---

## Examples

### Example 1

```text
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

### Example 2

```text
Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
```

---

## Constraints

- `3 <= nums.length <= 500`

- `-1000 <= nums[i] <= 1000`

- `-10^4 <= target <= 10^4`

---

## Problem Understanding

- **Return value:** Return the **sum** `t = nums[i] + nums[j] + nums[k]` itself, not the indices or triplet elements.
- **Early exit on exact hit:** Distance `|t - target|` cannot be smaller than `0`, so if `t == target` we can return `t` immediately.
- **Sentinel choice:** Because `-1000 <= nums[i] <= 1000` and `-10^4 <= target <= 10^4`, any real triplet sum lies in `[-3000, 3000]` (distance at most `13000`). Initializing `ans = 1 << 30` (`1,073,741,824`) guarantees the very first real triplet beats `Math.abs(ans - target)` without overflowing 32-bit `int` subtraction!

---

## Approach

### Brute Force Approach

Evaluate `nums[i] + nums[j] + nums[k]` over all `O(n^3)` index triples using three nested loops and track the sum minimizing `Math.abs(sum - target)`. For `n = 500`, `500^3 / 6 ≈ 2.08 * 10^7` operations — borderline slow compared to sorting + two pointers.

### Optimized Approach

Sort `nums` in ascending order, fix `i`, and sweep two pointers `j = i + 1` and `k = n - 1` inward, updating `ans` whenever `Math.abs(t - target) < Math.abs(ans - target)` and returning early if `t == target`.

### Step-by-Step Thinking Process

1. Sort `nums` via `Arrays.sort(nums)`.
2. Initialize `ans = 1 << 30` as a large sentinel sum.
3. Loop `i` from `0` to `n - 1`, setting `j = i + 1` and `k = n - 1`.
4. Compute `t = nums[i] + nums[j] + nums[k]`. If `t == target`, return `t` immediately.
5. If `Math.abs(t - target) < Math.abs(ans - target)`, update `ans = t`.
6. If `t > target`, move `--k` to reduce the sum; otherwise (`t < target`), move `++j` to increase the sum.

### Algorithm / Intuition

In `163sum-closest.java`, notice why `1 << 30` is chosen instead of `Integer.MAX_VALUE`: if `target` were `-10000` and `ans` were `Integer.MAX_VALUE`, `ans - target` would overflow 32-bit `int` into a negative number (`Math.abs(Integer.MIN_VALUE)` Trap)! By contrast, `1 << 30` is `~1.07 * 10^9`, so `(1 << 30) - (-10000)` stays comfortably below `2.14 * 10^9` (`Integer.MAX_VALUE`) while remaining far larger than any valid triplet distance.

---

## Dry Run

**Input:** `nums = [-1, 2, 1, -4]`, `target = 1`

1. `Arrays.sort(nums)` -> `[-4, -1, 1, 2]`, `ans = 1073741824`.
2. **`i = 0` (`nums[0] = -4`):**
   - `j = 1` (`-1`), `k = 3` (`2`): `t = -4 + (-1) + 2 = -3`. `|-3 - 1| = 4 < |ans - 1|` -> `ans = -3`. `-3 < 1` -> `++j` (`2`).
   - `j = 2` (`1`), `k = 3` (`2`): `t = -4 + 1 + 2 = -1`. `|-1 - 1| = 2 < |-3 - 1| (4)` -> `ans = -1`. `-1 < 1` -> `++j` (`3`, loop ends).
3. **`i = 1` (`nums[1] = -1`):**
   - `j = 2` (`1`), `k = 3` (`2`): `t = -1 + 1 + 2 = 2`. `|2 - 1| = 1 < |-1 - 1| (2)` -> `ans = 2`. `2 > 1` -> `--k` (`2`, loop ends).
4. **`i = 2`, `i = 3`:** `j < k` is `false` immediately.

**Output:** `2`

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — `Arrays.sort` takes `O(n log n)`, and the outer loop (`n` steps) paired with the inner two-pointer scan (`O(n)` steps) performs `O(n^2)` work.
- **Space Complexity:** `O(log n)` — Auxiliary stack space used by Java's Dual-Pivot Quicksort on primitive `int[]`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [163sum-closest.java](./163sum-closest.java) |

---

## Key Learnings

- Be careful with `Integer.MAX_VALUE` sentinels in distance formulas `Math.abs(ans - target)` when `target` can be negative — `1 << 30` (or initializing `ans = nums[0] + nums[1] + nums[2]`) prevents signed overflow.
- Sorting transforms a 3-variable closest-sum search into `n` linear two-pointer scans.
- Early termination on `t == target` short-circuits to `O(n log n)` whenever an exact match exists early.
