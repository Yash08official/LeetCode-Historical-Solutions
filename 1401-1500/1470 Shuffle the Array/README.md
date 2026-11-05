---
comments: true
difficulty: Easy
tags:
  - Array
---

# 1470. Shuffle the Array

**[View Problem on LeetCode](https://leetcode.com/problems/shuffle-the-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1470` (`1470`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `nums` of length `2n` arranged in two contiguous halves:
- First half (`0` to `n - 1`): `[x_1, x_2, ..., x_n]`
- Second half (`n` to `2n - 1`): `[y_1, y_2, ..., y_n]`

Interleave the two halves and return the shuffled array `[x_1, y_1, x_2, y_2, ..., x_n, y_n]`.

---

## Examples

### Example 1

```text
Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7]
Explanation: Since x_1=2, x_2=5, x_3=1, y_1=3, y_2=4, y_3=7 then the answer is [2,3,5,4,1,7].
```

### Example 2

```text
Input: nums = [1,2,3,4,4,3,2,1], n = 4
Output: [1,4,2,3,3,2,4,1]
```

### Example 3

```text
Input: nums = [1,1,2,2], n = 2
Output: [1,2,1,2]
```

---

## Constraints

- `1 <= n <= 500`

- `nums.length == 2n`

- `1 <= nums[i] <= 10^3`

---

## Problem Understanding

Examining the 0-based indices of `nums`:
- For each group index `i` from `0` to `n - 1`, `x_{i+1}` sits at `nums[i]` and its corresponding partner `y_{i+1}` sits exactly `n` positions ahead at `nums[i + n]`.
- Appending `nums[i]` followed immediately by `nums[i + n]` for `i = 0, 1, ..., n - 1` builds the exact interleaved order.

---

## Approach

### Brute Force Approach

Splitting `nums` into two separate subarray copies `x = nums.slice(0, n)` and `y = nums.slice(n)` or repeatedly splicing elements into the middle of `nums` (`O(n^2)` due to shifting elements) wastes memory or time compared to direct index offsetting.

### Optimized Approach

The solution uses a **single two-offset linear pass**:
- Create an empty output array `result`.
- Loop `i` from `0` to `n - 1`, pushing `nums[i]` and then `nums[i + n]` on each iteration.
- Return `result`.

### Step-by-Step Thinking Process

1. Allocate `result = []` to hold the interleaved elements.
2. Observe that `x_{i+1}` is at index `i` and `y_{i+1}` is at index `i + n`.
3. Loop `i` from `0` to `n - 1`, pushing `nums[i]` and `nums[i + n]` back-to-back into `result`.
4. Return `result` once all `n` pairs have been appended.

### Algorithm / Intuition

In `shuffle(nums, n)`, `i` acts as a dual pointer: `nums[i]` reads from the first half `[0, n - 1]` while `nums[i + n]` simultaneously reads from the second half `[n, 2n - 1]`. Pushing them in pairs places `nums[i]` at even index `2 * i` and `nums[i + n]` at odd index `2 * i + 1` in `result`.

---

## Dry Run

Trace on **Example 1**: `nums = [2, 5, 1, 3, 4, 7]`, `n = 3`

- **`i = 0`**: push `nums[0]` (`2`), push `nums[3]` (`3`) -> `result = [2, 3]`
- **`i = 1`**: push `nums[1]` (`5`), push `nums[4]` (`4`) -> `result = [2, 3, 5, 4]`
- **`i = 2`**: push `nums[2]` (`1`), push `nums[5]` (`7`) -> `result = [2, 3, 5, 4, 1, 7]`

Returns `[2, 3, 5, 4, 1, 7]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The loop executes `n` iterations, performing two `O(1)` array reads and two `O(1)` pushes per iteration (`2n` elements total).
- **Space Complexity:** `O(n)` — `result` stores `2n` elements (`O(1)` extra working space if the returned output array is excluded).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1470shuffle-the-array.js](./1470shuffle-the-array.js) |

---

## Key Learnings

- Constant stride offsets (`i` and `i + n`) let a single loop index drive two synchronized pointers cleanly.
- Because `1 <= nums[i] <= 1000` fits in 10 bits, an advanced follow-up trick packs `(x_i, y_i)` pairs into the upper/lower bits of `nums` to shuffle strictly in-place with `O(1)` total space, though allocating `result` is cleaner in production code.
