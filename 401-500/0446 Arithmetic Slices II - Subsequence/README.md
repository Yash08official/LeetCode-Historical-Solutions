---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
---

# 446. Arithmetic Slices II - Subsequence

**[View Problem on LeetCode](https://leetcode.com/problems/arithmetic-slices-ii-subsequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0446` (`446`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, compute the total number of **arithmetic subsequences** contained in `nums`.

A subsequence (formed by deleting zero or more elements without changing the relative order of the remaining elements) is **arithmetic** if:
1. It contains **at least 3 elements**, and
2. Every pair of consecutive elements in the subsequence shares the exact same difference.

Subsequences formed from different index combinations count separately even if their element values are identical. The result is guaranteed to fit in a signed 32-bit integer.

---

## Examples

### Example 1

```text
Input: nums = [2,4,6,8,10]
Output: 7
Explanation: All arithmetic subsequence slices are:
[2,4,6]
[4,6,8]
[6,8,10]
[2,4,6,8]
[4,6,8,10]
[2,4,6,8,10]
[2,6,10]
```

### Example 2

```text
Input: nums = [7,7,7,7,7]
Output: 16
Explanation: Any subsequence of this array is arithmetic.
```

---

## Constraints

- `1 <= nums.length <= 1000`

- `-2^31 <= nums[i] <= 2^31 - 1`

---

## Problem Understanding

- **Length threshold (`>= 3`):** Two elements always have a single difference between them, so pairs of length `2` are *not* yet valid arithmetic subsequences—however, they serve as "weak" arithmetic subsequences that become valid (`>= 3`) as soon as a third matching element is appended.
- **Wide value range & sparse differences:** Because `-2^31 <= nums[i] <= 2^31 - 1`, the difference `nums[i] - nums[j]` can exceed 32-bit integer bounds (requiring `long`) and cannot be indexed in a dense array.
- **Small `n` (`n <= 1000`):** An `O(n^2)` dynamic programming approach over all index pairs `(j, i)` with `j < i` fits comfortably within time limits.

---

## Approach

### Brute Force Approach

A naive backtracking or bitmask enumeration generates all `2^n` subsequences of `nums` and checks whether each subsequence of length at least `3` has a constant step difference.

This takes `O(n * 2^n)` time, which is completely infeasible for `n = 1000`.

### Optimized Approach

Use **Dynamic Programming with an Array of Hash Maps** (`Map<Long, Integer>[] f`), where `f[i].get(d)` stores the number of weak arithmetic subsequences (of length `>= 2`) ending at index `i` with common difference `d`.

### Step-by-Step Thinking Process

1. To extend an arithmetic subsequence at index `i`, we need to know both the previous index `j < i` and the common difference `d = (long) nums[i] - nums[j]`.
2. Define `f[i]` as a `HashMap<Long, Integer>` mapping each difference `d` to the count of arithmetic progressions of **length at least 2** ending at index `i` with step `d`.
3. When considering the pair `(j, i)` with difference `d`, let `cnt = f[j].getOrDefault(d, 0)` be the count of length `>= 2` progressions ending at `j` with step `d`.
4. Appending `nums[i]` to any of those `cnt` progressions produces a subsequence of length `>= 3`, so we immediately add `cnt` to our answer `ans`.
5. At the same time, those `cnt` extended progressions plus the fresh 2-element pair `(nums[j], nums[i])` all end at `i` with difference `d`, so we add `cnt + 1` into `f[i]` for key `d`.

### Algorithm / Intuition

In `numberOfArithmeticSlices(int[] nums)`:
- `f` is an array of `n` hash maps initialized via `Arrays.setAll(f, k -> new HashMap<>())`.
- For each index `i` from `0` to `n - 1` and every earlier index `j < i`, `Long d = 1L * nums[i] - nums[j]` computes the exact 64-bit difference without 32-bit overflow.
- `int cnt = f[j].getOrDefault(d, 0)` fetches how many subsequences of length `>= 2` end at `j` with difference `d`. Adding `nums[i]` turns all `cnt` of them into valid subsequences of length `>= 3`, so `ans += cnt`.
- `f[i].merge(d, cnt + 1, Integer::sum)` updates `f[i]` for difference `d` (accumulating via `Integer::sum` in case earlier indices `j'` before `j` had the exact same value `nums[j'] == nums[j]`).

---

## Dry Run

Tracing **Example 1** with `nums = [2, 4, 6, 8, 10]`:

- **`i = 0` (`2`):** No `j < 0`. `f[0] = {}`, `ans = 0`.
- **`i = 1` (`4`):**
  - `j = 0` (`2`): `d = 2`, `cnt = f[0].get(2) = 0`, `ans += 0` -> `0`, `f[1].merge(2, 1)` -> `f[1] = {2: 1}`.
- **`i = 2` (`6`):**
  - `j = 0` (`2`): `d = 4`, `cnt = 0`, `f[2]` gets `{4: 1}`.
  - `j = 1` (`4`): `d = 2`, `cnt = f[1].get(2) = 1`, `ans += 1` -> `1` (`[2,4,6]`), `f[2]` gets `{4: 1, 2: 2}`.
- **`i = 3` (`8`):**
  - `j = 0` (`2`): `d = 6`, `cnt = 0`, `f[3]` gets `6: 1`.
  - `j = 1` (`4`): `d = 4`, `cnt = 0`, `f[3]` gets `4: 1`.
  - `j = 2` (`6`): `d = 2`, `cnt = f[2].get(2) = 2`, `ans += 2` -> `3` (`[4,6,8]`, `[2,4,6,8]`), `f[3]` gets `2: 3`.
- **`i = 4` (`10`):**
  - `j = 0` (`2`): `d = 8`, `cnt = 0`, `f[4]` gets `8: 1`.
  - `j = 1` (`4`): `d = 6`, `cnt = 0`, `f[4]` gets `6: 1`.
  - `j = 2` (`6`): `d = 4`, `cnt = f[2].get(4) = 1`, `ans += 1` -> `4` (`[2,6,10]`), `f[4]` gets `4: 2`.
  - `j = 3` (`8`): `d = 2`, `cnt = f[3].get(2) = 3`, `ans += 3` -> `7` (`[6,8,10]`, `[4,6,8,10]`, `[2,4,6,8,10]`), `f[4]` gets `2: 4`.

Final result: `ans = 7`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Two nested loops evaluate `n * (n - 1) / 2` pairs `(j, i)`, performing `O(1)` average-time `HashMap` lookups and merges per pair.
- **Space Complexity:** `O(n^2)` — The array `f` of `n` hash maps stores at most `i` distinct difference entries at index `i`, totaling `O(n^2)` entries across the array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [446arithmetic-slices-ii-subsequence.java](./446arithmetic-slices-ii-subsequence.java) |

---

## Key Learnings

- Tracking "weak" subsequences of length `>= 2` in the DP state while only crediting `cnt` (extensions to length `>= 3`) to `ans` cleanly enforces minimum-length constraints.
- Using `Map.merge(key, delta, Integer::sum)` handles duplicate values in `nums` seamlessly when multiple indices `j < i` yield the same difference `d`.
- Always promote subtraction of arbitrary 32-bit signed integers (`1L * nums[i] - nums[j]`) to `long` to prevent wrap-around overflow.
