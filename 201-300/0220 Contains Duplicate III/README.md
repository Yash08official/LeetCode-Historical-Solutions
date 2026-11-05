---
comments: true
difficulty: Hard
tags:
  - Array
  - Sliding Window
  - Sorting
  - Bucket Sort
  - Ordered Set
---

# 220. Contains Duplicate III

**[View Problem on LeetCode](https://leetcode.com/problems/contains-duplicate-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0220` (`220`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Sliding Window`, `Sorting`, `Bucket Sort`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` along with two non-negative integers `indexDiff` and `valueDiff`.

Determine whether there exists a pair of distinct indices `(i, j)` satisfying all three conditions:

- `i != j`
- `abs(i - j) <= indexDiff`
- `abs(nums[i] - nums[j]) <= valueDiff`

Return `true` if at least one valid pair exists, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
Output: true
Explanation: We can choose (i, j) = (0, 3).
We satisfy the three conditions:
i != j --> 0 != 3
abs(i - j) <= indexDiff --> abs(0 - 3) <= 3
abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) <= 0
```

### Example 2

```text
Input: nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3
Output: false
Explanation: After trying all the possible pairs (i, j), we cannot satisfy the three conditions, so we return false.
```

---

## Constraints

- `2 <= nums.length <= 10^5`

- `-10^9 <= nums[i] <= 10^9`

- `1 <= indexDiff <= nums.length`

- `0 <= valueDiff <= 10^9`

---

## Problem Understanding

As we scan `nums` from left to right at index `i`, we only care about previous elements `nums[j]` within the sliding index window `[i - indexDiff, i - 1]`. For any such `nums[j]`, the condition `abs(nums[i] - nums[j]) <= valueDiff` rearranges into a range query:

`nums[i] - valueDiff <= nums[j] <= nums[i] + valueDiff`

Watch out for 32-bit integer overflow! Since `-10^9 <= nums[i] <= 10^9` and `0 <= valueDiff <= 10^9`, subtracting `valueDiff` from `-10^9` reaches `-2 * 10^9` (safe in signed 32-bit, right near `-2.14 * 10^9`, though general arithmetic differences easily risk overflow), so widening values to `long` (`Long`) keeps range bounds completely overflow-free.

---

## Approach

### Brute Force Approach

For every index `i`, loop backward through `j` from `Math.max(0, i - indexDiff)` to `i - 1` and check if `Math.abs((long) nums[i] - nums[j]) <= valueDiff`. When `indexDiff` is close to `nums.length` (`10^5`), this nested scan inspects up to `O(n * indexDiff) = O(n^2)` pairs (`~5 * 10^9` comparisons) and times out.

### Optimized Approach

Maintain a sliding window of at most `indexDiff` preceding elements inside a balanced binary search tree (`TreeSet<Long> ts`) and answer each range check `[nums[i] - valueDiff, nums[i] + valueDiff]` in `O(log(min(n, indexDiff)))` time using `ts.ceiling(...)`.

### Step-by-Step Thinking Process

1. Keep a `TreeSet<Long> ts` holding the values of the most recent `<= indexDiff` elements before index `i`.
2. Cast `nums[i]` and `valueDiff` to `long` so `nums[i] - valueDiff` and `nums[i] + valueDiff` never overflow.
3. Query `Long x = ts.ceiling((long) nums[i] - (long) valueDiff)` to find the smallest value currently in the window that is `>= nums[i] - valueDiff`.
4. If `x != null && x <= (long) nums[i] + (long) valueDiff`, then `x` falls inside `[nums[i] - valueDiff, nums[i] + valueDiff]`, so return `true` immediately.
5. Insert `(long) nums[i]` into `ts`, and if `i >= indexDiff`, evict `(long) nums[i - indexDiff]` so the window retains at most `indexDiff` elements for index `i + 1`.

### Algorithm / Intuition

Two subtle points make this `TreeSet` sliding window rock-solid:
1. **Why a single `ceiling` lookup suffices for a two-sided range:** `x = ts.ceiling(L)` returns the **smallest** element in `ts` that is `>= L`. If any element in `ts` lies inside `[L, R]`, then the smallest element `>= L` must also be `<= R`! Conversely, if even the smallest element `>= L` exceeds `R` (or is `null`), no element in `ts` can lie in `[L, R]`.
2. **Why `TreeSet` (which ignores duplicates) never loses valid data:** Suppose `ts` already contained a value equal to `nums[i]`. Since `valueDiff >= 0`, `ts.ceiling(nums[i] - valueDiff)` would find that existing value (`<= nums[i] + valueDiff`) and return `true` **before** `ts.add((long) nums[i])` is ever reached! Thus `ts` never contains duplicate values while scanning.

---

## Dry Run

Tracing Example 1: `nums = [1, 2, 3, 1]`, `indexDiff = 3`, `valueDiff = 0`:

| `i` | `nums[i]` | `ts` Before Query | Query `ts.ceiling(nums[i] - 0)` | `x <= nums[i] + 0`? | `ts` After Update / Eviction |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `1` | `{}` | `ts.ceiling(1)` -> `null` | False | `{1}` (`i < 3`, no eviction) |
| `1` | `2` | `{1}` | `ts.ceiling(2)` -> `null` | False | `{1, 2}` (`i < 3`, no eviction) |
| `2` | `3` | `{1, 2}` | `ts.ceiling(3)` -> `null` | False | `{1, 2, 3}` (`i < 3`, no eviction) |
| `3` | `1` | `{1, 2, 3}` | `ts.ceiling(1)` -> `1` | **`1 <= 1` (True!)** | Returns **`true`** immediately |

Output: `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log(min(n, indexDiff)))` — For each of the `n` elements, `ceiling`, `add`, and `remove` on `TreeSet` run in `O(log k)` where `k = min(n, indexDiff)` is the maximum window size.
- **Space Complexity:** `O(min(n, indexDiff))` — The `TreeSet` `ts` holds at most `indexDiff + 1` `Long` elements at any point during execution.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [220contains-duplicate-iii.java](./220contains-duplicate-iii.java) |

---

## Key Learnings

- A 1D range-existence query `[L, R]` on an ordered set reduces to a single `set.ceiling(L) <= R` check.
- Because duplicate elements within `indexDiff` trigger an immediate `true` return (`valueDiff >= 0`), `TreeSet` stays strictly duplicate-free without needing a multiset.
- Always widen signed 32-bit integers to `long` before computing `nums[i] +- valueDiff` when inputs approach `+-10^9`.
