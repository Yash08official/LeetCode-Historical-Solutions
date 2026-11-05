---
comments: true
difficulty: Easy
tags:
  - Array
  - Simulation
---

# 1929. Concatenation of Array

**[View Problem on LeetCode](https://leetcode.com/problems/concatenation-of-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1929` (`1929`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a **0-indexed** integer array `nums` of length `n`, construct and return a new array `ans` of length `2n` formed by placing two copies of `nums` back-to-back.

Formally, for every index `i` in `0 <= i < n`, the output array must satisfy both `ans[i] == nums[i]` and `ans[i + n] == nums[i]`.

---

## Examples

### Example 1

```text
Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]
```

### Example 2

```text
Input: nums = [1,3,2,1]
Output: [1,3,2,1,1,3,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]
```

---

## Constraints

- `n == nums.length`

- `1 <= n <= 1000`

- `1 <= nums[i] <= 1000`

---

## Problem Understanding

- Every element at index `i` in `nums` maps to **two** exact positions in `ans`: index `i` (first half) and index `i + n` (second half).
- With `1 <= n <= 1000`, pre-allocating an array of exact length `2n` avoids dynamic resizing overhead.

---

## Approach

### Brute Force Approach

A straightforward baseline is to create an empty list and run two separate loops from `0` to `n - 1`, pushing `nums[i]` onto the end of `ans` during the first pass and repeating the same loop a second time (or calling `nums.concat(nums)`). While still `O(n)`, dynamically growing an array without pre-sizing can trigger internal buffer reallocations and traverses `nums` twice.

### Optimized Approach

Pre-allocate `ans` with exact capacity `2 * nums.length` and populate both `ans[i]` and `ans[j + i]` (where `j = nums.length`) simultaneously inside a single `O(n)` loop.

### Step-by-Step Thinking Process

1. Store `j = nums.length` so we have the offset for the second copy of `nums`.
2. Pre-allocate `ans = new Array(2 * nums.length)` to hold all `2n` elements directly.
3. Iterate `i` from `0` to `j - 1` once, reading `nums[i]` and writing it to both `ans[i]` and `ans[j + i]`.
4. Return the populated `ans` array.

### Algorithm / Intuition

In `getConcatenation`, `j` caches `nums.length` and `ans` is allocated upfront with length `2 * nums.length`. During each iteration `i` (`0 <= i < j`), the element `nums[i]` is copied into its first-half slot `ans[i]` and its mirrored second-half slot `ans[j + i]`. Because `[0..j-1]` and `[j..2j-1]` partition `[0..2j-1]` cleanly without overlap, a single pass fills the entire array.

---

## Dry Run

Tracing `nums = [1, 2, 1]` (`j = 3`, `ans` allocated with length `6`):

| `i` | `nums[i]` | Assignments | `ans` State |
| :--- | :--- | :--- | :--- |
| Init | — | `ans = new Array(6)`, `j = 3` | `[empty x 6]` |
| `0` | `1` | `ans[0] = 1`, `ans[3] = 1` | `[1, _, _, 1, _, _]` |
| `1` | `2` | `ans[1] = 2`, `ans[4] = 2` | `[1, 2, _, 1, 2, _]` |
| `2` | `1` | `ans[2] = 1`, `ans[5] = 1` | `[1, 2, 1, 1, 2, 1]` |

Returns `[1, 2, 1, 1, 2, 1]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate through the `n` elements of `nums` once, performing two `O(1)` indexed writes per iteration.
- **Space Complexity:** `O(1)` auxiliary space (`O(n)` total space to hold the required output array `ans` of length `2n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1929concatenation-of-array.js](./1929concatenation-of-array.js) |

---

## Key Learnings

- Pre-allocating fixed-length output arrays (`new Array(2 * n)`) and indexing with an offset (`j + i`) avoids dynamic array resizing and cuts loop iterations in half.
- Symmetric output patterns (`ans[i]` and `ans[i + n]`) allow a single read of `nums[i]` to serve multiple destination writes.
