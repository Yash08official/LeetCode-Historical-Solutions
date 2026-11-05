---
comments: true
difficulty: Medium
tags:
  - Array
  - Stack
  - Greedy
  - Sorting
  - Monotonic Stack
---

# 769. Max Chunks To Make Sorted

**[View Problem on LeetCode](https://leetcode.com/problems/max-chunks-to-make-sorted/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0769` (`769`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Stack`, `Greedy`, `Sorting`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `arr` of length `n` containing a permutation of all integers from `0` to `n - 1`.

You want to partition `arr` into as many contiguous non-empty **chunks** (subarrays) as possible so that sorting each chunk independently and concatenating the sorted chunks reproduces the fully sorted array `[0, 1, ..., n - 1]`. Return the maximum number of chunks you can form.

---

## Examples

### Example 1

```text
Input: arr = [4,3,2,1,0]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2], which isn't sorted.
```

### Example 2

```text
Input: arr = [1,0,2,3,4]
Output: 4
Explanation:
We can split into two chunks, such as [1, 0], [2, 3, 4].
However, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.
```

---

## Constraints

- `n == arr.length`

- `1 <= n <= 10`

- `0 <= arr[i] < n`

- All the elements of `arr` are **unique**.

---

## Problem Understanding

- In the final sorted array, index `i` must hold the exact integer `i`.
- Because `arr` is a permutation of `0 .. n - 1` (all distinct integers `>= 0`), a prefix `arr[0 .. i]` contains the exact set of elements `{0, 1, ..., i}` **if and only if** the maximum element in `arr[0 .. i]` equals `i`!
- Whenever `max(arr[0 .. i]) == i`, no element `<= i` can appear after index `i`, and no element `> i` appeared at or before `i` — meaning we can safely make a chunk boundary right after index `i`.

---

## Approach

### Brute Force Approach

Since `n <= 10`, a brute-force backtracking approach could try all `2^(n - 1)` subsets of split positions, copy and sort each chunk, and check whether the concatenated array equals `[0, 1, ..., n - 1]`. That takes `O(2^n * n log n)` time, whereas exploiting the permutation property solves it in linear time for any `n`.

### Optimized Approach

Scan `arr` from left to right while maintaining the prefix maximum `mx = Math.max(mx, arr[i])`; increment the chunk counter `ans` every time `i == mx`.

### Step-by-Step Thinking Process

1. Ask: when is it valid to place a cut immediately after index `i`?
2. A cut after index `i` is valid if and only if sorting `arr[0 .. i]` produces `[0, 1, ..., i]` and sorting `arr[i + 1 .. n - 1]` produces `[i + 1, ..., n - 1]`.
3. Since all elements in `arr` are distinct integers in `[0, n - 1]`, a prefix of `i + 1` elements equals the set `{0, 1, ..., i}` if and only if its largest value `mx` is `i`.
4. Greedily cutting at **every** index `i` where `mx == i` maximizes the total number of chunks without restricting any future cuts.

### Algorithm / Intuition

In `maxChunksToSorted(int[] arr)`:
- `mx` tracks `max(arr[0 .. i])` as `i` advances from `0` to `arr.length - 1`.
- Whenever `mx > i`, at least one value larger than `i` has already appeared in the current chunk, forcing the chunk to extend at least to index `mx` so that large value can reach its sorted position.
- The moment `i` catches up to `mx` (`i == mx`), every element seen since the previous cut belongs strictly inside this range, so `++ans` closes a valid minimal chunk.

---

## Dry Run

Trace on **Example 1**: `arr = [4, 3, 2, 1, 0]`.

| `i` | `arr[i]` | `mx = Math.max(mx, arr[i])` | `i == mx`? | `ans` |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `4` | `4` | False (`0 != 4`) | `0` |
| `1` | `3` | `4` | False (`1 != 4`) | `0` |
| `2` | `2` | `4` | False (`2 != 4`) | `0` |
| `3` | `1` | `4` | False (`3 != 4`) | `0` |
| `4` | `0` | `4` | **True** (`4 == 4`) | `1` |

Returns `1` (the entire array must be sorted as a single chunk).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates through `arr` once, doing `O(1)` work per element.
- **Space Complexity:** `O(1)` — Uses only two integer variables (`ans` and `mx`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [769max-chunks-to-make-sorted.java](./769max-chunks-to-make-sorted.java) |

---

## Key Learnings

- For permutations of `0 .. n - 1`, checking whether `arr[0 .. i]` is a permutation of `0 .. i` reduces to a single check: `prefixMax == i`.
- Greedy partition cutting works whenever every valid prefix cut leaves an independent subproblem on the remaining suffix.
