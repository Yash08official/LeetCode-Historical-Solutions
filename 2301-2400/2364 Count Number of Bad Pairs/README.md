---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Math
  - Counting
---

# 2364. Count Number of Bad Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/count-number-of-bad-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2364` (`2364`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed integer array `nums`. A pair of indices `(i, j)` is defined as a bad pair if `i < j` and `j - i != nums[j] - nums[i]`.

Return the total number of bad pairs in `nums`.

---

## Examples

### Example 1

```text
Input: nums = [4,1,3,3]
Output: 5
Explanation: The pair (0, 1) is a bad pair since 1 - 0 != 1 - 4.
The pair (0, 2) is a bad pair since 2 - 0 != 3 - 4, 2 != -1.
The pair (0, 3) is a bad pair since 3 - 0 != 3 - 4, 3 != -1.
The pair (1, 2) is a bad pair since 2 - 1 != 3 - 1, 1 != 2.
The pair (2, 3) is a bad pair since 3 - 2 != 3 - 3, 1 != 0.
There are a total of 5 bad pairs, so we return 5.
```

### Example 2

```text
Input: nums = [1,2,3,4,5]
Output: 0
Explanation: There are no bad pairs.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

---

## Problem Understanding

Key observations and constraints:
- `1 <= nums.length <= 10^5` and `1 <= nums[i] <= 10^9`.
- The total number of index pairs `(i, j)` with `i < j` is `n * (n - 1) / 2`. For `n = 10^5`, this is `~5 * 10^9`, which exceeds 32-bit signed integer limits and requires a 64-bit integer (`long` in Java).
- The condition for a bad pair is `j - i != nums[j] - nums[i]`. Rearranging terms algebraically gives:
  `nums[i] - i != nums[j] - j` (or equivalently `i - nums[i] != j - nums[j]`).
- This means two indices `i` and `j` form a GOOD pair if and only if `i - nums[i] == j - nums[j]`. Otherwise, they form a BAD pair.
- For each index `i`, there are `i` preceding elements (indices `0` to `i - 1`). The number of good pairs formed with index `i` is the count of previous indices `k` that have `k - nums[k] == i - nums[i]`. All remaining `i - count` preceding elements form bad pairs with `i`.

---

## Approach

### Brute Force Approach

A brute-force solution checks all pairs `(i, j)` with `0 <= i < j < n` and evaluates `j - i != nums[j] - nums[i]`. This requires `O(n^2)` time. With `n = 10^5`, `5 * 10^9` operations will result in Time Limit Exceeded.

### Optimized Approach

Transform the equation: let `x = i - nums[i]`. Maintain a hash map `cnt` storing the frequency of transformed values seen so far. As we iterate `i` from `0` to `n - 1`:
1. Compute `x = i - nums[i]`.
2. The number of good pairs with index `i` is `cnt.getOrDefault(x, 0)`.
3. The number of bad pairs with index `i` is `i - cnt.getOrDefault(x, 0)`. Add this to 64-bit accumulator `ans`.
4. Update the frequency of `x` in the map: `cnt.merge(x, 1, Integer::sum)`.
This runs in `O(n)` time and `O(n)` space.

### Step-by-Step Thinking Process

1. Rewrite the inequality: `j - i != nums[j] - nums[i]` is equivalent to `i - nums[i] != j - nums[j]`.
2. Define key `x = i - nums[i]`.
3. Indices with equal `x` form good pairs; indices with different `x` form bad pairs.
4. As we scan index `i`, all `i` previously seen elements can pair with `i`.
5. The number of bad pairs formed with index `i` is `i - count_of_previous_elements_with_same_x`.
6. Track frequencies using a hash map and accumulate the answer into a 64-bit integer (`long`).

### Algorithm / Intuition

In `Solution.countBadPairs`, a hash map `Map<Integer, Integer> cnt` maps each transformed value `x` to its observed frequency, and `long ans = 0` accumulates the bad pair count.

For each index `i` from `0` to `nums.length - 1`, we compute `int x = i - nums[i]`. The total number of valid previous indices that can pair with `i` is exactly `i`. Among these, `cnt.getOrDefault(x, 0)` have the exact same transformed value, forming good pairs. The difference `i - cnt.getOrDefault(x, 0)` represents the bad pairs ending at index `i`. We add this difference to `ans`, then increment the frequency of `x` using `cnt.merge(x, 1, Integer::sum)`. Finally, `ans` is returned.

---

## Dry Run

Consider `nums = [4, 1, 3, 3]` with `n = 4`:
- `cnt = {}`, `ans = 0`.
- `i = 0`: `nums[0] = 4`. `x = 0 - 4 = -4`. Good pairs = `cnt[-4] = 0`. Bad pairs added = `0 - 0 = 0` (`ans = 0`). `cnt = {-4: 1}`.
- `i = 1`: `nums[1] = 1`. `x = 1 - 1 = 0`. Good pairs = `cnt[0] = 0`. Bad pairs added = `1 - 0 = 1` (`ans = 1`). `cnt = {-4: 1, 0: 1}`.
- `i = 2`: `nums[2] = 3`. `x = 2 - 3 = -1`. Good pairs = `cnt[-1] = 0`. Bad pairs added = `2 - 0 = 2` (`ans = 3`). `cnt = {-4: 1, 0: 1, -1: 1}`.
- `i = 3`: `nums[3] = 3`. `x = 3 - 3 = 0`. Good pairs = `cnt[0] = 1`. Bad pairs added = `3 - 1 = 2` (`ans = 5`). `cnt = {-4: 1, 0: 2, -1: 1}`.
- Output: `5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single pass through the array of length `n`, with `O(1)` average time per hash map lookup and insertion.
- **Space Complexity:** `O(n)` — The hash map `cnt` stores at most `n` distinct transformation values `i - nums[i]`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2364count-number-of-bad-pairs.java](./2364count-number-of-bad-pairs.java) |

---

## Key Learnings

- Algebraic rearrangement: rearranging $j - i = nums[j] - nums[i]$ into $i - nums[i] = j - nums[j]$ eliminates the cross-index dependency.
- Complementary counting: bad pairs ending at index $i$ can be calculated directly as $i - \text{good\_pairs}$.
- Pair count scaling: the sum of $i$ across $n$ indices can reach $5 \times 10^9$, requiring 64-bit integer (`long`) storage.
