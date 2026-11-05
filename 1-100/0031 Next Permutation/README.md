---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
---

# 31. Next Permutation

**[View Problem on LeetCode](https://leetcode.com/problems/next-permutation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0031` (`31`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, rearrange its elements **in-place** into the **next lexicographically greater permutation** using only `O(1)` extra space.

If `nums` is already the largest possible permutation (sorted in non-increasing order from left to right), rearrange it into the smallest possible permutation (sorted in ascending order).

---

## Examples

### Example 1

```text
Input: nums = [1,2,3]
Output: [1,3,2]
```

### Example 2

```text
Input: nums = [3,2,1]
Output: [1,2,3]
```

### Example 3

```text
Input: nums = [1,1,5]
Output: [1,5,1]
```

---

## Constraints

- `1 <= nums.length <= 100`

- `0 <= nums[i] <= 100`

---

## Problem Understanding

- **Lexicographical increment intuition:** To make `nums` larger by the smallest possible amount, we must keep as long a prefix unchanged as possible—meaning we want to modify the **rightmost** position `i` that has a strictly larger value somewhere to its right.
- **Descending suffix property:** Any suffix where `nums[k] >= nums[k + 1]` is already maximized and cannot be made larger on its own. The first index `i` from the right where `nums[i] < nums[i + 1]` is our pivot.
- **Wrap-around case:** If no such `i` exists (`i == -1`), the entire array is non-increasing, so reversing the whole array transforms it into ascending order.

---

## Approach

### Brute Force Approach

Generating all `n!` unique permutations, sorting them lexicographically, and picking the element after `nums` takes `O(n! * n)` time and space, which explodes exponentially even for `n = 15` (while `nums.length` here reaches `100`).

### Optimized Approach

The implemented Java solution uses the classic **three-step in-place pivot-swap-reverse algorithm**: (1) scan right-to-left from `n - 2` to find the rightmost ascent pivot `i` (`nums[i] < nums[i + 1]`); (2) if `i >= 0`, scan right-to-left from `n - 1` to find the first element `nums[j] > nums[i]` and `swap(nums, i, j)`; (3) reverse the suffix `nums[i + 1 .. n - 1]` using two pointers `j` and `k`.

### Step-by-Step Thinking Process

1. Scan backward starting at `i = n - 2` until finding the first index where `nums[i] < nums[i + 1]`. Everything in `nums[i + 1 .. n - 1]` is guaranteed to be in non-increasing order.
2. If `i >= 0`, we need the smallest value in `nums[i + 1 .. n - 1]` that is strictly greater than `nums[i]`. Because that suffix is non-increasing, scanning `j` backward from `n - 1` finds this successor on the very first `nums[j] > nums[i]`.
3. Swap `nums[i]` and `nums[j]`. Notice that `nums[i + 1 .. n - 1]` STILL remains in non-increasing order after the swap!
4. To make the suffix after index `i` as lexicographically small as possible, reverse `nums[i + 1 .. n - 1]` in-place (which also handles `i == -1` by reversing `nums[0 .. n - 1]`).

### Algorithm / Intuition

Why does `nums[i + 1 .. n - 1]` remain non-increasing after `swap(nums, i, j)`? Because `j` was the rightmost index with `nums[j] > nums[i]`, every element to the right of `j` satisfies `<= nums[i]`, and every element to the left of `j` (inside the suffix) satisfies `>= nums[j] > nums[i]`. Placing `nums[i]` at slot `j` preserves `nums[j - 1] > nums[i] >= nums[j + 1]`, so a simple `O(n)` reversal (`swap(nums, j, k)`) turns the suffix into ascending order without needing `Arrays.sort`.

---

## Dry Run

Tracing Example 1 (`nums = [1, 2, 3]`) and Example 2 (`nums = [3, 2, 1]`):

**Example 1: `nums = [1, 2, 3]` (`n = 3`)**
1. **Find pivot `i`:** Start `i = 1`. Check `nums[1] < nums[2]` (`2 < 3`) -> `true`! Break with `i = 1`.
2. **Find successor `j` (`i >= 0`):** Start `j = 2`. Check `nums[2] > nums[1]` (`3 > 2`) -> `true`! `swap(nums, 1, 2)` -> `nums = [1, 3, 2]`.
3. **Reverse suffix `nums[2 .. 2]`:** `j = 2, k = 2` (`j < k` is `false`). Final `nums = [1, 3, 2]`.

**Example 2: `nums = [3, 2, 1]` (`n = 3`)**
1. **Find pivot `i`:** `i = 1` (`2 < 1` false), `i = 0` (`3 < 2` false) -> loop ends with `i = -1`.
2. **Skip swap (`i < 0`).**
3. **Reverse suffix `nums[0 .. 2]`:** `j = 0, k = 2` -> `swap(nums, 0, 2)` -> `nums = [1, 2, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Performs at most two backward scans and one two-pointer suffix reversal over `nums`.
- **Space Complexity:** `O(1)` — Rearranges `nums` in-place using only scalar loop indices (`n`, `i`, `j`, `k`, `t`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [31next-permutation.java](./31next-permutation.java) |

---

## Key Learnings

- Strict inequalities (`nums[i] < nums[i + 1]` and `nums[j] > nums[i]`) are essential when `nums` contains duplicates like `[1, 5, 1]` so equal elements are never swapped pointlessly.
- Initializing `i = n - 2` and letting `i` fall through to `-1` allows the final reversal `j = i + 1` to seamlessly handle the largest-to-smallest wrap-around without an extra `if` branch.
