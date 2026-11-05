---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Sorting
---

# 2300. Successful Pairs of Spells and Potions

**[View Problem on LeetCode](https://leetcode.com/problems/successful-pairs-of-spells-and-potions/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2300` (`2300`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given two positive integer arrays `spells` and `potions`, of length `n` and `m` respectively, where `spells[i]` represents the strength of the `i`-th spell and `potions[j]` represents the strength of the `j`-th potion.

You are also given an integer `success`. A spell and potion pair is considered successful if the product of their strengths is at least `success` (i.e. `spells[i] * potions[j] >= success`).

Return an integer array `pairs` of length `n` where `pairs[i]` is the number of potions that will form a successful pair with the `i`-th spell.

---

## Examples

### Example 1

```text
Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:
- 0^th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
- 1^st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
- 2^nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
Thus, [4,0,3] is returned.
```

### Example 2

```text
Input: spells = [3,1,2], potions = [8,5,8], success = 16
Output: [2,0,2]
Explanation:
- 0^th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
- 1^st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful.
- 2^nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful.
Thus, [2,0,2] is returned.
```

---

## Constraints

- `n == spells.length`

- `m == potions.length`

- `1 <= n, m <= 10^5`

- `1 <= spells[i], potions[i] <= 10^5`

- `1 <= success <= 10^10`

---

## Problem Understanding

Key observations and constraints:
- `n == spells.length`, `m == potions.length`, with `1 <= n, m <= 10^5`.
- `1 <= spells[i], potions[i] <= 10^5`, and `1 <= success <= 10^10`.
- Because `spells[i] * potions[j]` can reach `10^{10}`, products exceed 32-bit integer limits. In JavaScript, standard Numbers are double-precision floats that safely represent integers up to `2^{53} - 1 ~ 9 * 10^{15}`, so standard arithmetic does not overflow.
- For a given spell strength `s`, the condition `s * p >= success` is equivalent to `p >= ceil(success / s)`. Since the potions array is the same for all spells, sorting `potions` allows us to use binary search for each spell to find the first potion satisfying the condition in `O(log m)` time.

---

## Approach

### Brute Force Approach

A brute-force solution uses nested loops: for each spell `i`, iterate through every potion `j` and check if `spells[i] * potions[j] >= success`. This takes `O(n * m)` time. For `n, m = 10^5`, `n * m = 10^{10}` operations, causing Time Limit Exceeded.

### Optimized Approach

Sort `potions` in non-decreasing order in `O(m log m)` time. For each spell `spells[i]`, perform binary search (lower bound) over `potions` to find the smallest index `left` such that `spells[i] * potions[left] >= success`. Because `potions` is sorted, all potions from index `left` to `m - 1` also satisfy the condition. The count of successful potions for spell `i` is thus `m - left`. Total time is `O((m + n) log m)`.

### Step-by-Step Thinking Process

1. We need to count how many elements in `potions` satisfy `potion >= success / spell`.
2. Sorting `potions` enables binary search for the cutoff value for each spell.
3. Sort `potions` once in `O(m log m)`.
4. For each of the `n` spells, use binary search in range `[0, m]` to locate the lower bound index where `spells[i] * potions[mid] >= success`.
5. If `spells[i] * potions[mid] >= success`, set `right = mid`; otherwise set `left = mid + 1`.
6. The count of qualifying potions is `m - left`. Store in `ans[i]`.

### Algorithm / Intuition

In `successfulPairs`, `potions.sort((a, b) => a - b)` sorts the potion strengths in ascending order. An array `ans` of length `n` is allocated to store the results.

For each index `i` in `spells`, we initialize binary search pointers `left = 0` and `right = m`. In the `while (left < right)` loop, we compute `mid = Math.floor((left + right) / 2)`. If `spells[i] * potions[mid] >= success`, the condition is met, so we pull `right` down to `mid` to check if an earlier index also qualifies. Otherwise, the potion is too weak, so we advance `left = mid + 1`. When `left === right`, `left` points to the first potion that achieves success with `spells[i]`. The number of such potions is `m - left`, which is stored in `ans[i]`.

---

## Dry Run

Consider `spells = [5, 1, 3]`, `potions = [1, 2, 3, 4, 5]`, `success = 7`:
- Sorted `potions = [1, 2, 3, 4, 5]`, `m = 5`.
- For `spells[0] = 5`:
  - `left = 0, right = 5`.
  - `mid = 2`: `potions[2] = 3`. `5 * 3 = 15 >= 7` -> `right = 2`.
  - `mid = 1`: `potions[1] = 2`. `5 * 2 = 10 >= 7` -> `right = 1`.
  - `mid = 0`: `potions[0] = 1`. `5 * 1 = 5 < 7` -> `left = 1`.
  - Loop terminates with `left = 1`. Result: `ans[0] = 5 - 1 = 4`.
- For `spells[1] = 1`:
  - Even for largest potion `potions[4] = 5`, `1 * 5 = 5 < 7`. `left` advances all the way to `5`.
  - Result: `ans[1] = 5 - 5 = 0`.
- For `spells[2] = 3`:
  - `left = 0, right = 5`.
  - `mid = 2`: `potions[2] = 3`. `3 * 3 = 9 >= 7` -> `right = 2`.
  - `mid = 1`: `potions[1] = 2`. `3 * 2 = 6 < 7` -> `left = 2`.
  - Loop terminates with `left = 2`. Result: `ans[2] = 5 - 2 = 3`.
- Return `ans = [4, 0, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O((m + n) log m)` — Sorting `potions` takes `O(m log m)`. Performing binary search for each of the `n` spells takes `O(n log m)`. Summing gives `O((m + n) log m)`.
- **Space Complexity:** `O(n)` — Required to store the output array `ans` of size `n` (plus `O(log m)` auxiliary sorting space used by V8's Timsort).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2300successful-pairs-of-spells-and-potions.js](./2300successful-pairs-of-spells-and-potions.js) |

---

## Key Learnings

- Whenever multiple queries evaluate against a static collection, sorting the collection enables logarithmic binary search per query.
- Lower-bound binary search (`right = mid` on match, `left = mid + 1` otherwise) accurately finds the first satisfying index in range `[0, m]`.
- In JavaScript, standard numeric calculations up to `10^{10}` fit safely within `Number.MAX_SAFE_INTEGER` (`9 * 10^{15}`).
