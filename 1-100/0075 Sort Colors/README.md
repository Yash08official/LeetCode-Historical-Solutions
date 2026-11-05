---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Sorting
  - Quicksort
  - Bubble Sort
---

# 75. Sort Colors

**[View Problem on LeetCode](https://leetcode.com/problems/sort-colors/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0075` (`75`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Sorting`, `Quicksort`, `Bubble Sort` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums` of length `n` containing only `0`s (red), `1`s (white), and `2`s (blue), sort the array **in-place** so that all `0`s come first, followed by all `1`s, followed by all `2`s.

You may not use any built-in library sort method, and you should modify `nums` directly without returning a new array.

---

## Examples

### Example 1

**Input:** `nums = [2,0,2,1,1,0]`

**Output:** `[0,0,1,1,2,2]`

**Explanation:**

The array has two 0s, two 1s, and two 2s. Sorting them in-place places all 0s first, then all 1s, then all 2s.

### Example 2

**Input:** `nums = [2,0,1]`

**Output:** `[0,1,2]`

**Explanation:**

The array has one each of 0, 1, and 2, arranged in-place in the order 0, 1, 2.

---

## Constraints

- `n == nums.length`

- `1 <= n <= 300`

- `nums[i]` is either 0, 1, or 2.

---

## Follow-up Questions

Could you come up with a one-pass algorithm using only constant extra space?

The implemented three-pointer Dutch National Flag algorithm directly satisfies the follow-up requirement: it inspects each element in a **single pass** (`k < j` decreases `j - k` by `1` every step) while using only **constant `O(1)` extra space** (`i`, `j`, `k`, and `t`).

---

## Problem Understanding

- Every element belongs to one of exactly three buckets: `0`, `1`, or `2`.
- Standard comparison sorting takes `O(n log n)` time, which ignores the tiny fixed value domain `{0, 1, 2}`.
- Partitioning the array into four regions in a single pass — confirmed `0`s, confirmed `1`s, uninspected elements, and confirmed `2`s — solves the problem in one pass and `O(1)` space (Edsger Dijkstra's **Dutch National Flag** algorithm).

---

## Approach

### Brute Force Approach

A naive approach either runs a hand-written comparison sort like Bubble/Insertion Sort in `O(n^2)` time, or performs a two-pass Counting Sort (first counting how many `0`s, `1`s, and `2`s appear, then overwriting `nums` in a second pass). While two-pass counting is `O(n)` time and `O(1)` space, it traverses the array twice instead of sorting in a single pass.

### Optimized Approach

Use Dijkstra's three-pointer **Dutch National Flag** partitioning (`i`, `k`, `j`) to group `0`s on the left, `1`s in the middle, and `2`s on the right in a single `O(n)` pass with `O(1)` extra memory.

### Step-by-Step Thinking Process

1. Maintain three pointers: `i` (index of the last placed `0`, initialized to `-1`), `j` (index of the first placed `2`, initialized to `nums.length`), and `k` (current scanner, initialized to `0`).
2. Preserve the loop invariant across every step: `nums[0 .. i]` are all `0`s, `nums[i + 1 .. k - 1]` are all `1`s, `nums[k .. j - 1]` are unexamined, and `nums[j .. n - 1]` are all `2`s.
3. When `nums[k] === 0`, increment `i` and swap `nums[i]` with `nums[k]`. Because `nums[i]` was either `k` itself or a confirmed `1`, we can safely advance `k` (`k++`).
4. When `nums[k] === 2`, decrement `j` and swap `nums[j]` with `nums[k]`. Do **not** increment `k`, because the value swapped in from `nums[j]` came from the unexamined region and must be inspected next.
5. When `nums[k] === 1`, it already belongs in the middle section, so simply increment `k` (`++k`). Stop as soon as `k == j`.

### Algorithm / Intuition

In `sortColors(nums)`, `i = -1`, `j = nums.length`, and `k = 0`. The `while (k < j)` loop shrinks the unknown zone `[k, j - 1]` by one element per iteration:
- `if (nums[k] === 0)`: calls `swap(nums, ++i, k++)`, expanding the `0`-zone `[0..i]` and advancing `k`.
- `else if (nums[k] === 2)`: calls `swap(nums, --j, k)`, expanding the `2`-zone `[j..n-1]` leftward while keeping `k` stationary so the newly arrived element at `nums[k]` is checked on the next iteration.
- `else`: `nums[k]` is `1`, so `++k` expands the `1`-zone `[i+1..k-1]`.

Once `k` meets `j`, the unexamined region `[k, j - 1]` is empty and `nums` is completely sorted in-place.

---

## Dry Run

Tracing Example 1 with `nums = [2, 0, 2, 1, 1, 0]` (`i = -1, j = 6, k = 0`):

| Step | `i` | `k` | `j` | `nums[k]` | Action | Array `nums` after step |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `-1` | `0` | `6` | `2` | `swap(nums, --j=5, k=0)` | `[0, 0, 2, 1, 1, 2]` |
| 2 | `-1` | `0` | `5` | `0` | `swap(nums, ++i=0, k++=0)` | `[0, 0, 2, 1, 1, 2]` |
| 3 | `0` | `1` | `5` | `0` | `swap(nums, ++i=1, k++=1)` | `[0, 0, 2, 1, 1, 2]` |
| 4 | `1` | `2` | `5` | `2` | `swap(nums, --j=4, k=2)` | `[0, 0, 1, 1, 2, 2]` |
| 5 | `1` | `2` | `4` | `1` | `++k` (`k = 3`) | `[0, 0, 1, 1, 2, 2]` |
| 6 | `1` | `3` | `4` | `1` | `++k` (`k = 4`) | `[0, 0, 1, 1, 2, 2]` |

Now `k == j` (`4 == 4`), loop terminates with `nums = [0, 0, 1, 1, 2, 2]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — In every iteration of `while (k < j)`, either `k` increments or `j` decrements, so the loop runs at most `n` times with `O(1)` work per step.
- **Space Complexity:** `O(1)` — Sorting happens strictly in-place using only three pointer variables (`i`, `j`, `k`) and a temporary swap variable `t`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [75sort-colors.js](./75sort-colors.js) |

---

## Key Learnings

- Dijkstra's 3-way Dutch National Flag partition is the foundation not only for 3-bucket sorting, but also for 3-way Quicksort when arrays contain many duplicate keys.
- The asymmetric pointer update (`k++` when swapping with `++i`, vs keeping `k` unchanged when swapping with `--j`) is critical: `nums[i]` was already scanned, whereas `nums[j]` was not.
- Explicitly writing out region invariants (`[0..i]`, `[i+1..k-1]`, `[k..j-1]`, `[j..n-1]`) eliminates off-by-one bugs in multi-pointer array algorithms.
