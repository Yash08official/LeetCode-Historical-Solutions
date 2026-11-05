---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Math
  - Counting
---

# 1512. Number of Good Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-good-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1512` (`1512`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Counting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, count and return the number of **good pairs**.

A pair of indices `(i, j)` is **good** if `0 <= i < j < nums.length` and `nums[i] == nums[j]`.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
```

### Example 2

```text
Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.
```

### Example 3

```text
Input: nums = [1,2,3]
Output: 0
```

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 100`

---

## Problem Understanding

Suppose a value `v` appears `c` times in `nums`:
- Every new occurrence of `v` at index `j` forms a valid good pair `(i, j)` with **each** of the previous occurrences `i < j` of `v` seen so far.
- Specifically, the 1st occurrence adds `0` pairs, the 2nd adds `1`, the 3rd adds `2`, ..., and the `c`-th adds `c - 1`, summing to `0 + 1 + 2 + ... + (c - 1) = c * (c - 1) / 2` (combinations of 2).

---

## Approach

### Brute Force Approach

Using nested loops over `0 <= i < len` and `i + 1 <= j < len` to test `nums[i] === nums[j]` checks all `n * (n - 1) / 2` index pairs in `O(n^2)` time.

### Optimized Approach

The solution uses a **hash map (`eachNumCount` object)** to track `[count, pairCombinations]` per distinct number in linear time:
- On the first occurrence of `nums[i]`, initialize `eachNumCount[nums[i]] = [1, 0]` (`1` seen, `0` pairs).
- On each subsequent occurrence, add the current seen count `eachNumCount[nums[i]][0]` to `eachNumCount[nums[i]][1]`, then increment `eachNumCount[nums[i]][0]`.
- Sum `eachNumCount[num][1]` across all keys in `eachNumCount` into `goodPairs`.

### Step-by-Step Thinking Process

1. Create an object `eachNumCount = {}` mapping each distinct number to `[seenCount, goodPairsForThisNum]`.
2. Scan `nums` left-to-right from `i = 0` to `len - 1`.
3. If `nums[i]` has not been seen (`undefined`), record `[1, 0]`.
4. If `nums[i]` already exists in `eachNumCount`, it pairs with all `eachNumCount[nums[i]][0]` earlier copies, so add `eachNumCount[nums[i]][0]` to `eachNumCount[nums[i]][1]` and then increment `eachNumCount[nums[i]][0]` by `1`.
5. Iterate through `eachNumCount` and accumulate `eachNumCount[num][1]` into `goodPairs`.

### Algorithm / Intuition

Notice the line marked `//Magic Happens Here`: when the `(k + 1)`-th copy of a number arrives, `eachNumCount[nums[i]][0]` currently holds `k`. Adding `k` to `eachNumCount[nums[i]][1]` computes the triangular sum `1 + 2 + ... + (c - 1) = c * (c - 1) / 2` incrementally without multiplication or division, and without revisiting earlier array indices.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 2, 3, 1, 1, 3]`

| `i` | `nums[i]` | Action on `eachNumCount[nums[i]]` | Updated `[count, pairs]` |
| :--- | :--- | :--- | :--- |
| `0` | `1` | Initialize | `1: [1, 0]` |
| `1` | `2` | Initialize | `2: [1, 0]` |
| `2` | `3` | Initialize | `3: [1, 0]` |
| `3` | `1` | `pairs += 1`, `count += 1` | `1: [2, 1]` |
| `4` | `1` | `pairs += 2`, `count += 1` | `1: [3, 3]` |
| `5` | `3` | `pairs += 1`, `count += 1` | `3: [2, 1]` |

Summing `eachNumCount[num][1]` over keys `1`, `2`, `3`: `3 + 0 + 1 = 4`. Returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Scanning `nums` takes `O(n)` time, and summing over the `u <= n` distinct keys in `eachNumCount` takes `O(u)` time.
- **Space Complexity:** `O(u)` — Where `u <= min(n, 100)` is the number of distinct elements stored in `eachNumCount` (`O(n)` in general).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1512number-of-good-pairs.js](./1512number-of-good-pairs.js) |

---

## Key Learnings

- Counting pairs `(i, j)` with `i < j` and `nums[i] == nums[j]` can be maintained online by adding the frequency seen so far before incrementing the frequency.
- You can also accumulate `goodPairs += count[x]` directly during the first loop, needing only a single scalar count per key.
