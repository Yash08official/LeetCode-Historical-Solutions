---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Sorting
---

# 15. 3Sum

**[View Problem on LeetCode](https://leetcode.com/problems/3sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0015` (`15`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, find all **unique** triplets `[nums[i], nums[j], nums[k]]` at pairwise distinct indices (`i != j`, `i != k`, `j != k`) such that `nums[i] + nums[j] + nums[k] == 0`.

The returned list must not contain duplicate value triplets, though triplets and their elements may appear in any order.

---

## Examples

### Example 1

```text
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
```

### Example 2

```text
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

### Example 3

```text
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

---

## Constraints

- `3 <= nums.length <= 3000`

- `-10^5 <= nums[i] <= 10^5`

---

## Problem Understanding

- **Uniqueness constraint:** Input arrays like `[-1, 0, 1, 2, -1, -4]` contain two `-1`s, which could form `[-1, 0, 1]` twice using different index combinations; the output must deduplicate value triplets.
- **Positive anchor pruning:** Once `nums` is sorted in non-decreasing order, if `nums[i] > 0`, then `nums[k] >= nums[j] >= nums[i] > 0`, so their sum can **never** equal `0` — we can stop the outer loop immediately!
- **Scale:** `3 <= n <= 3000`, making `O(n^2)` ideal while `O(n^3)` times out.

---

## Approach

### Brute Force Approach

Check all `O(n^3)` index triplets `(i, j, k)` (`0 <= i < j < k < n`), sort each valid triplet of values, and insert a serialized key into a `Set` to filter duplicates. With `n = 3000`, `n^3 / 6 ≈ 4.5 * 10^9` iterations easily exceed time limits.

### Optimized Approach

Sort `nums` numerically, fix the smallest triplet element `nums[i]` (stopping early once `nums[i] > 0`), and sweep two pointers `j = i + 1` and `k = n - 1` inward while skipping duplicate values at all three positions.

### Step-by-Step Thinking Process

1. Sort `nums` in ascending numeric order via `nums.sort((a, b) => a - b)` (mandatory in JS since `.sort()` defaults to lexicographical string sorting!).
2. Iterate `i` from `0` while `i < n - 2 && nums[i] <= 0`.
3. Skip duplicate anchors: if `i > 0 && nums[i] === nums[i - 1]`, `continue`.
4. Set `j = i + 1` and `k = n - 1`. Compute `x = nums[i] + nums[j] + nums[k]`. If `x < 0`, increment `++j`; if `x > 0`, decrement `--k`.
5. When `x === 0`, record `[nums[i], nums[j++], nums[k--]]` and advance `j` past identical values (`nums[j] === nums[j - 1]`) and `k` past identical values (`nums[k] === nums[k + 1]`).

### Algorithm / Intuition

In `153sum.js`, sorting serves two purposes simultaneously: it enables monotonic two-pointer sum adjustments (`++j` raises `x`, `--k` lowers `x`) **and** groups equal numbers adjacently so duplicate triplets are eliminated in `O(1)` without a hash set. Notice why `if (i > 0 && nums[i] === nums[i - 1])` compares `i` backward against `i - 1` rather than `i + 1`: comparing against `i + 1` would wrongly skip valid triplets like `[-1, -1, 2]` where `nums[i]` and `nums[j]` legitimately share the value `-1`!

---

## Dry Run

**Input:** `nums = [-1, 0, 1, 2, -1, -4]`

1. Sort `nums` -> `[-4, -1, -1, 0, 1, 2]` (`n = 6`).
2. **`i = 0` (`nums[0] = -4`):** `j = 1..4, k = 5`: sums `-4 + (-1) + 2 = -3 < 0`, ..., `-4 + 1 + 2 = -1 < 0` -> no matches.
3. **`i = 1` (`nums[1] = -1`):**
   - `j = 2` (`-1`), `k = 5` (`2`): `x = -1 + (-1) + 2 = 0` -> push `[-1, -1, 2]`, `j` becomes `3`, `k` becomes `4`.
   - `j = 3` (`0`), `k = 4` (`1`): `x = -1 + 0 + 1 = 0` -> push `[-1, 0, 1]`, `j` becomes `4`, `k` becomes `3` (loop ends).
4. **`i = 2` (`nums[2] = -1`):** `nums[2] === nums[1]` -> **skipped**.
5. **`i = 3` (`nums[3] = 0`):** `j = 4` (`1`), `k = 5` (`2`): `x = 0 + 1 + 2 = 3 > 0` -> `--k` (`4`), loop ends.
6. **`i = 4`:** `i < n - 2` (`4 < 4`) is `false` -> outer loop ends.

**Output:** `[[-1, -1, 2], [-1, 0, 1]]`

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Sorting takes `O(n log n)`, and for each of the `O(n)` anchor indices `i`, the inner `j`/`k` pointers scan at most `n` elements in linear time.
- **Space Complexity:** `O(log n)` to `O(n)` auxiliary sorting space (excluding the output array `ans`), depending on the JavaScript engine's Timsort implementation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [153sum.js](./153sum.js) |

---

## Key Learnings

- In JavaScript, always pass `(a, b) => a - b` to `Array.prototype.sort` when sorting numbers; default `.sort()` orders `-4` before `-1` as `"-1" < "-4"`!
- Pruning the outer loop with `nums[i] <= 0` avoids wasted scans once all remaining numbers are positive.
- Deduplicating `i` against `i - 1` (after the first occurrence is explored) preserves triplets containing repeated values like `[-1, -1, 2]`.
